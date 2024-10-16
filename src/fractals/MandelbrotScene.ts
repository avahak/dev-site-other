import * as THREE from 'three';
import vsMandelbrot from './shaders/vsMandelbrot.glsl?raw';
import fsMandelbrot from './shaders/fsMandelbrot.glsl?raw';
import vsAccumulator from './shaders/vsAccumulator.glsl?raw';
import fsAccumulator from './shaders/fsAccumulator.glsl?raw';
import { WorkOrder, WorkProgress } from './types';

class MandelbrotScene {
    container: HTMLDivElement;
    camera!: THREE.Camera;

    fbosMandelbrot: THREE.WebGLRenderTarget[] = [];
    fbosAccumulator: THREE.WebGLRenderTarget[] = [];
    currentFboIndexMandelbrot: number = 0;    // latest computed fbo index
    currentFboIndexAccumulator: number = 0;    // latest computed fbo index
    disposeFbos: () => void;

    sceneMandelbrot!: THREE.Scene;
    sceneAccumulator!: THREE.Scene;
    shaderMandelbrot!: THREE.ShaderMaterial;
    shaderAccumulator!: THREE.ShaderMaterial;

    workProgress: WorkProgress|null = null;

    constructor(container: HTMLDivElement) {
        this.container = container;

        this.setupMandelbrotScene();
        this.setupAccumulatorScene();
        this.setupCamera();
        
        this.disposeFbos = () => {
            this.fbosMandelbrot.forEach((fbo) => fbo.dispose());
            this.fbosAccumulator.forEach((fbo) => fbo.dispose());
        };

        this.resize();
    }

    resize() {
        const { clientWidth, clientHeight } = this.container;
        const aspect = clientWidth / clientHeight;
        if (this.camera instanceof THREE.OrthographicCamera) {
            this.camera.top = 1;
            this.camera.bottom = -1;
            this.camera.left = -aspect;
            this.camera.right = aspect;
            this.camera.updateProjectionMatrix();
        }
        this.setupFbos();
        this.shaderMandelbrot.uniforms.resolution.value = this.getResolution();
        this.shaderAccumulator.uniforms.resolution.value = this.getResolution();
        this.setViewBoxUniforms();
    }

    setupFbos() {
        this.disposeFbos();
        this.currentFboIndexMandelbrot = 0;
        this.currentFboIndexAccumulator = 0;
        for (let k = 0; k < 2; k++)
            this.fbosMandelbrot.push(this.createRenderTarget());
        for (let k = 0; k < 2; k++)
            this.fbosAccumulator.push(this.createRenderTarget());
    }

    createRenderTarget() {
        const { clientWidth, clientHeight } = this.container;
        const renderTarget = new THREE.WebGLRenderTarget(clientWidth, clientHeight, {
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
            wrapS: THREE.RepeatWrapping,
            wrapT: THREE.RepeatWrapping,
            format: THREE.RGBAFormat,
            type: THREE.FloatType
        });
        return renderTarget;
    }

    setupMandelbrotScene() {
        this.sceneMandelbrot = new THREE.Scene();

        this.shaderMandelbrot = new THREE.ShaderMaterial({
            uniforms: {
                box: { value: null },
                subpixelOffset: { value: null },
                mandelMap: { value: null },         // texture for iteration state
                resolution: { value: null },
                restart: { value: 1 },
            },
            vertexShader: vsMandelbrot,
            fragmentShader: fsMandelbrot,
        });
        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, this.shaderMandelbrot);
        this.sceneMandelbrot.add(mesh);
    }

    setupAccumulatorScene() {
        this.sceneAccumulator = new THREE.Scene();

        this.shaderAccumulator = new THREE.ShaderMaterial({
            uniforms: {
                mandelMap: { value: null },
                accumulatorMap: { value: null },
                resolution: { value: null },
                restart: { value: 1 },
            },
            vertexShader: vsAccumulator,
            fragmentShader: fsAccumulator,
        });
        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, this.shaderAccumulator);
        this.sceneAccumulator.add(mesh);
    }

    setupCamera() {
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        this.camera.position.set(0, 0, 1);
        this.camera.lookAt(0, 0, 0);
    }

    getResolution() {
        const { clientWidth, clientHeight } = this.container;
        return new THREE.Vector2(clientWidth, clientHeight);
    }

    private setViewBoxUniforms() {
        if (!this.workProgress)
            return;

        const { clientWidth, clientHeight } = this.container;
        const aspect = clientWidth/clientHeight;

        this.shaderMandelbrot.uniforms.box.value = [
            this.workProgress.zoomCenter[0]-aspect*this.workProgress.zoomScale, 
            this.workProgress.zoomCenter[1]-this.workProgress.zoomScale,
            this.workProgress.zoomCenter[0]+aspect*this.workProgress.zoomScale, 
            this.workProgress.zoomCenter[1]+this.workProgress.zoomScale];
    }

    assignWork(workOrder: WorkOrder) {
        this.workProgress = { 
            ...workOrder, 
            currentIteration: 0, 
            currentSample: 0, 
            isComplete: false 
        };
        this.setViewBoxUniforms();
    }

    getCurrentMandelbrotFboTexture() {
        return this.fbosMandelbrot[this.currentFboIndexMandelbrot].texture;
    }

    getCurrentAccumulatorFboTexture() {
        return this.fbosAccumulator[this.currentFboIndexAccumulator].texture;
    }

    getSubpixelOffset(sample: number, samplesPerAxis: number): [number, number] {
        const x = (sample%samplesPerAxis) / samplesPerAxis;
        const y = Math.floor(sample/samplesPerAxis) / samplesPerAxis;
        return [x+0.5/samplesPerAxis, y+0.5/samplesPerAxis];
    }

    iterateMandelbrot(renderer: THREE.WebGLRenderer, restart: boolean, subpixelOffset: [number, number]) {
        const [i0, i1] = [this.currentFboIndexMandelbrot, (this.currentFboIndexMandelbrot+1)%2];

        this.shaderMandelbrot.uniforms.mandelMap.value = this.fbosMandelbrot[i0].texture;
        this.shaderMandelbrot.uniforms.subpixelOffset.value = subpixelOffset;
        this.shaderMandelbrot.uniforms.restart.value = restart ? 1 : 0;

        renderer.setRenderTarget(this.fbosMandelbrot[i1]);
        renderer.render(this.sceneMandelbrot, this.camera);
        renderer.setRenderTarget(null);

        this.currentFboIndexMandelbrot = i1;
    }

    accumulateSample(renderer: THREE.WebGLRenderer, restart: boolean) {
        const [i0, i1] = [this.currentFboIndexAccumulator, (this.currentFboIndexAccumulator+1)%2];

        this.shaderAccumulator.uniforms.mandelMap.value = this.getCurrentMandelbrotFboTexture();
        this.shaderAccumulator.uniforms.accumulatorMap.value = this.fbosAccumulator[i0].texture;
        this.shaderAccumulator.uniforms.restart.value = restart ? 1 : 0;

        renderer.setRenderTarget(this.fbosAccumulator[i1]);
        renderer.render(this.sceneAccumulator, this.camera);
        renderer.setRenderTarget(null);

        this.currentFboIndexAccumulator = i1;
    }

    /**
     * Returns true when work finishes.
     */
    step(renderer: THREE.WebGLRenderer): boolean {
        if (!this.workProgress || this.workProgress.isComplete)
            return false;

        const offset = this.getSubpixelOffset(this.workProgress.currentSample, this.workProgress.samplesPerAxis);
        this.iterateMandelbrot(renderer, this.workProgress.currentIteration === 0, offset);
        this.workProgress.currentIteration++;

        if (this.workProgress.currentIteration >= this.workProgress.iterations) {
            this.accumulateSample(renderer, this.workProgress.currentSample === 0);
            this.workProgress.currentIteration = 0;
            this.workProgress.currentSample++;
        }
        if (this.workProgress.currentSample >= this.workProgress.samplesPerAxis*this.workProgress.samplesPerAxis) {
            this.workProgress.isComplete = true;
            return true;
        }
        return false;
    }
}

export { MandelbrotScene };
var J=Object.defineProperty;var T=(a,e,t)=>e in a?J(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var s=(a,e,t)=>T(a,typeof e!="symbol"?e+"":e,t);import{r as P,j as D}from"./index-DV1Zfrpd.js";import{O as u,u as A,N as v,R as b,q as C,r as F,l as m,s as d,t as p,f,i as y,y as U,z as E,W as K}from"./three.module-CyiO67I9.js";const g=`precision highp float;\r
\r
varying vec4 vPosition;\r
varying vec2 vUv;\r
\r
void main() {\r
    vPosition = vec4(position.xy, 0.0, 1.);\r
    vUv = uv;\r
    gl_Position = vPosition;\r
}`,O=`precision highp float;\r
\r
uniform sampler2D accumulatorMap1;\r
uniform sampler2D accumulatorMap2;\r
uniform vec2 resolution;\r
uniform int showMandelbrot;\r
uniform int showJulia;\r
varying vec4 vPosition;\r
varying vec2 vUv;\r
\r
#define PI 3.14159265359\r
\r
void main() {\r
    vec4 color1 = texture2D(accumulatorMap1, vUv);\r
    vec4 color2 = texture2D(accumulatorMap2, vUv);\r
    if (showMandelbrot != 1 || showJulia != 1) {\r
        gl_FragColor = vec4(float(showMandelbrot)*color1.rgb + float(showJulia)*color2.rrr, 1.0);\r
        return;\r
    }\r
    gl_FragColor = vec4(color1.rgb*(0.3-0.25*color2.b), 1.0) + vec4(color2.rrr, color2.b);\r
}`,j=`precision highp float;\r
\r
uniform sampler2D mandelMap;\r
uniform vec4 box;\r
uniform vec2 resolution;\r
uniform vec2 subpixelOffset;    // [-0.5,0.5]x[-0.5,0.5]\r
uniform int restart;            // 1: restart from zero\r
varying vec4 vPosition;\r
varying vec2 vUv;\r
\r
#define PI 3.14159265359\r
\r
void main() {\r
    vec4 tex = (restart == 1) ? vec4(0.0, 0.0, 0.0, 1.0) : texture2D(mandelMap, vUv);\r
\r
    vec2 cSubpixelOffset = subpixelOffset / resolution * vec2(box.z-box.x, box.w-box.y);\r
    vec2 c = vec2(mix(box.x, box.z, vUv.x), mix(box.y, box.w, vUv.y)) + cSubpixelOffset;\r
    vec2 z = tex.xy;\r
    float iter = tex.z;\r
\r
    int k;\r
    for (k = 0; (k < 1000) && (z.x*z.x + z.y*z.y < 100.0); k++) {\r
        float temp = 2.0*z.x*z.y + c.y;\r
        z.x = z.x*z.x - z.y*z.y + c.x;\r
        z.y = temp;\r
    }\r
    iter = iter + float(k);\r
\r
    gl_FragColor = vec4(z, iter, 1.0);\r
}\r
`,W=`precision highp float;\r
\r
uniform sampler2D mandelMap;\r
uniform sampler2D accumulatorMap;\r
uniform vec2 resolution;\r
uniform int restart;            // 1: restart from zero\r
varying vec4 vPosition;\r
varying vec2 vUv;\r
\r
#define PI 3.14159265359\r
\r
vec3 hsv2rgb(vec3 c) {\r
    // Source: https://stackoverflow.com/questions/15095909/from-rgb-to-hsv-in-opengl-glsl\r
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\r
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\r
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\r
}\r
\r
vec4 getColor(vec2 uv) {\r
    vec4 tex = texture2D(mandelMap, uv);\r
    vec2 z = tex.xy;\r
    float iter = tex.z;\r
\r
    float r2 = z.x*z.x + z.y*z.y;\r
    iter = iter - log(log(r2)/log(100.0))/log(2.0);\r
\r
    if (r2 < 4.0)\r
        return vec4(0.0, 0.0, 0.0, 1.0);\r
\r
    return vec4(hsv2rgb(vec3(fract(0.5*log(1.0+iter)), 0.9, 0.7)), 1.0);\r
}\r
\r
void main() {\r
    vec4 accOld = restart == 1 ? vec4(0.0) : texture2D(accumulatorMap, vUv);\r
    float iter = accOld.a;\r
    vec4 color = getColor(vUv);\r
    vec3 accNewColor = (accOld.rgb*iter+color.rgb) / (iter+1.0);\r
    gl_FragColor = vec4(accNewColor, iter+1.0);\r
}`;class L{constructor(e){s(this,"container");s(this,"camera");s(this,"fbosMandelbrot",[]);s(this,"fbosAccumulator",[]);s(this,"currentFboIndexMandelbrot",0);s(this,"currentFboIndexAccumulator",0);s(this,"disposeFbos");s(this,"sceneMandelbrot");s(this,"sceneAccumulator");s(this,"shaderMandelbrot");s(this,"shaderAccumulator");s(this,"workProgress",null);this.container=e,this.setupMandelbrotScene(),this.setupAccumulatorScene(),this.setupCamera(),this.disposeFbos=()=>{this.fbosMandelbrot.forEach(t=>t.dispose()),this.fbosAccumulator.forEach(t=>t.dispose())},this.resize()}resize(){const{clientWidth:e,clientHeight:t}=this.container,r=e/t,[n,o]=[r>1?r:1,r>1?1:1/r];this.camera instanceof u&&(this.camera.top=o,this.camera.bottom=-o,this.camera.left=-n,this.camera.right=n,this.camera.updateProjectionMatrix()),this.setupFbos(),this.shaderMandelbrot.uniforms.resolution.value=this.getResolution(),this.shaderAccumulator.uniforms.resolution.value=this.getResolution(),this.setViewBoxUniforms()}setupFbos(){this.disposeFbos(),this.currentFboIndexMandelbrot=0,this.currentFboIndexAccumulator=0;for(let e=0;e<2;e++)this.fbosMandelbrot.push(this.createRenderTarget());for(let e=0;e<2;e++)this.fbosAccumulator.push(this.createRenderTarget())}createRenderTarget(){const{clientWidth:e,clientHeight:t}=this.container;return new A(e,t,{minFilter:v,magFilter:v,wrapS:b,wrapT:b,format:C,type:F})}setupMandelbrotScene(){this.sceneMandelbrot=new m,this.shaderMandelbrot=new d({uniforms:{box:{value:null},subpixelOffset:{value:null},mandelMap:{value:null},resolution:{value:null},restart:{value:1}},vertexShader:g,fragmentShader:j});const e=new p(2,2),t=new f(e,this.shaderMandelbrot);this.sceneMandelbrot.add(t)}setupAccumulatorScene(){this.sceneAccumulator=new m,this.shaderAccumulator=new d({uniforms:{mandelMap:{value:null},accumulatorMap:{value:null},resolution:{value:null},scale:{value:null},restart:{value:1}},vertexShader:g,fragmentShader:W});const e=new p(2,2),t=new f(e,this.shaderAccumulator);this.sceneAccumulator.add(t)}setupCamera(){this.camera=new u(-1,1,1,-1,.1,10),this.camera.position.set(0,0,1),this.camera.lookAt(0,0,0)}getResolution(){const{clientWidth:e,clientHeight:t}=this.container;return new y(e,t)}setViewBoxUniforms(){if(!this.workProgress)return;const{clientWidth:e,clientHeight:t}=this.container,r=e/t,[n,o]=[r>1?r:1,r>1?1:1/r];this.shaderMandelbrot.uniforms.box.value=[this.workProgress.zoomCenter[0]-n*this.workProgress.zoomScale,this.workProgress.zoomCenter[1]-o*this.workProgress.zoomScale,this.workProgress.zoomCenter[0]+n*this.workProgress.zoomScale,this.workProgress.zoomCenter[1]+o*this.workProgress.zoomScale]}assignWork(e){this.workProgress={...e,currentIteration:0,currentSample:0,isComplete:!1},this.setViewBoxUniforms()}getCurrentMandelbrotFboTexture(){return this.fbosMandelbrot[this.currentFboIndexMandelbrot].texture}getCurrentAccumulatorFboTexture(){return this.fbosAccumulator[this.currentFboIndexAccumulator].texture}getSubpixelOffset(e,t){const n=Math.floor(t/2)*(t+1),o=(e*1579+n)%(t*t),i=o%t/t,c=Math.floor(o/t)/t;return[i+.5/t,c+.5/t]}iterateMandelbrot(e,t,r){const[n,o]=[this.currentFboIndexMandelbrot,(this.currentFboIndexMandelbrot+1)%2];this.shaderMandelbrot.uniforms.mandelMap.value=this.fbosMandelbrot[n].texture,this.shaderMandelbrot.uniforms.subpixelOffset.value=r,this.shaderMandelbrot.uniforms.restart.value=t?1:0,e.setRenderTarget(this.fbosMandelbrot[o]),e.render(this.sceneMandelbrot,this.camera),e.setRenderTarget(null),this.currentFboIndexMandelbrot=o}accumulateSample(e,t){var o;const[r,n]=[this.currentFboIndexAccumulator,(this.currentFboIndexAccumulator+1)%2];this.shaderAccumulator.uniforms.mandelMap.value=this.getCurrentMandelbrotFboTexture(),this.shaderAccumulator.uniforms.accumulatorMap.value=this.fbosAccumulator[r].texture,this.shaderAccumulator.uniforms.restart.value=t?1:0,this.shaderAccumulator.uniforms.scale.value=(o=this.workProgress)==null?void 0:o.zoomScale,e.setRenderTarget(this.fbosAccumulator[n]),e.render(this.sceneAccumulator,this.camera),e.setRenderTarget(null),this.currentFboIndexAccumulator=n}step(e){if(!this.workProgress||this.workProgress.isComplete)return!1;const t=this.getSubpixelOffset(this.workProgress.currentSample,this.workProgress.samplesPerAxis);return this.iterateMandelbrot(e,this.workProgress.currentIteration===0,t),this.workProgress.currentIteration++,this.workProgress.currentIteration>=this.workProgress.iterations&&(this.accumulateSample(e,this.workProgress.currentSample===0),this.workProgress.currentIteration=0,this.workProgress.currentSample++),this.workProgress.currentSample>=this.workProgress.samplesPerAxis*this.workProgress.samplesPerAxis?(this.workProgress.isComplete=!0,!0):!1}}const _=`precision highp float;\r
\r
uniform sampler2D juliaMap;\r
uniform vec4 box;\r
uniform vec2 resolution;\r
uniform vec2 subpixelOffset;    // [-0.5,0.5]x[-0.5,0.5]\r
uniform vec2 c;\r
uniform int restart;            // 1: restart from zero\r
varying vec4 vPosition;\r
varying vec2 vUv;\r
\r
#define PI 3.14159265359\r
\r
void main() {\r
    vec2 cSubpixelOffset = subpixelOffset / resolution * vec2(box.z-box.x, box.w-box.y);\r
    vec2 z0 = vec2(mix(box.x, box.z, vUv.x), mix(box.y, box.w, vUv.y)) + cSubpixelOffset;\r
    \r
    vec4 tex = (restart == 1) ? vec4(z0, 1.0, 0.0) : texture2D(juliaMap, vUv);\r
\r
    vec2 z = tex.xy;\r
    vec2 w = tex.zw;\r
\r
    int k;\r
    float temp;\r
    for (k = 0; (k < 2000) && (z.x*z.x + z.y*z.y < 1.0e3); k++) {\r
\r
        if (w.x*w.x + w.y*w.y < 1.0e20) {\r
            temp = 2.0*z.x*w.y + 2.0*z.y*w.x;\r
            w.x = 2.0*z.x*w.x - 2.0*z.y*w.y;\r
            w.y = temp;\r
        }\r
\r
        temp = 2.0*z.x*z.y + c.y;\r
        z.x = z.x*z.x - z.y*z.y + c.x;\r
        z.y = temp;\r
    }\r
\r
    gl_FragColor = vec4(z, w);\r
}\r
`,X=`precision highp float;\r
\r
uniform sampler2D juliaMap;\r
uniform sampler2D accumulatorMap;\r
uniform vec2 resolution;\r
uniform int restart;            // 1: restart from zero\r
varying vec4 vPosition;\r
varying vec2 vUv;\r
\r
#define PI 3.14159265359\r
\r
vec4 getColor(vec2 uv) {\r
    vec4 tex = texture2D(juliaMap, uv);\r
    vec2 z = tex.xy;\r
    vec2 w = tex.zw;\r
\r
    float rz2 = z.x*z.x + z.y*z.y;\r
    float rw2 = w.x*w.x + w.y*w.y;\r
\r
    if (rz2 < 1.0e3)\r
        return vec4(0.0, 0.0, 1.0, 1.0);        // 0\r
    if (rw2 > 1.0e20)\r
        return vec4(1.0, 0.0, 1.0, 1.0);        // -1\r
\r
    float d = sqrt(rz2/rw2)*log(rz2);\r
\r
    float b = 0.5;\r
\r
    float s = log(d/b);\r
\r
    if (d > b)\r
        return vec4(0.0, 0.0, 0.0, 1.0);\r
\r
    if (d > 0.1*b) {\r
        float t = smoothstep(0.1*b, b, d);\r
        return vec4(mix(vec3(0.1, 0.1, 0.1), vec3(0.0, 0.0, 0.0), t), 1.0);\r
    }\r
\r
    if (d > 0.01*b) {\r
        float t = smoothstep(0.01*b, 0.1*b, d);\r
        return vec4(mix(vec3(0.2, 0.2, 0.2), vec3(0.1, 0.1, 0.1), t), 1.0);\r
    }\r
\r
    if (d > 0.001*b) {\r
        float t = smoothstep(0.001*b, 0.01*b, d);\r
        return vec4(mix(vec3(0.4, 0.4, 0.4), vec3(0.2, 0.2, 0.2), t), 1.0);\r
    }\r
\r
    float t = smoothstep(0.0, 0.001*b, d);\r
    return vec4(mix(vec3(1.0, 1.0, 1.0), vec3(0.4, 0.4, 0.4), t), 1.0);\r
}\r
\r
void main() {\r
    vec4 accOld = restart == 1 ? vec4(0.0) : texture2D(accumulatorMap, vUv);\r
    float iter = accOld.a;\r
    vec4 color = getColor(vUv);\r
    vec3 accNewColor = (accOld.rgb*iter+color.rgb) / (iter+1.0);\r
    gl_FragColor = vec4(accNewColor, iter+1.0);\r
}`;class Y{constructor(e){s(this,"container");s(this,"camera");s(this,"fbosJulia",[]);s(this,"fbosAccumulator",[]);s(this,"currentFboIndexJulia",0);s(this,"currentFboIndexAccumulator",0);s(this,"disposeFbos");s(this,"sceneJulia");s(this,"sceneAccumulator");s(this,"shaderJulia");s(this,"shaderAccumulator");s(this,"workProgress",null);this.container=e,this.setupJuliaScene(),this.setupAccumulatorScene(),this.setupCamera(),this.disposeFbos=()=>{this.fbosJulia.forEach(t=>t.dispose()),this.fbosAccumulator.forEach(t=>t.dispose())},this.resize()}resize(){const{clientWidth:e,clientHeight:t}=this.container,r=e/t,[n,o]=[r>1?r:1,r>1?1:1/r];this.camera instanceof u&&(this.camera.top=o,this.camera.bottom=-o,this.camera.left=-n,this.camera.right=n,this.camera.updateProjectionMatrix()),this.setupFbos(),this.shaderJulia.uniforms.resolution.value=this.getResolution(),this.shaderAccumulator.uniforms.resolution.value=this.getResolution(),this.setViewBoxUniforms()}setupFbos(){this.disposeFbos(),this.currentFboIndexJulia=0,this.currentFboIndexAccumulator=0;for(let e=0;e<2;e++)this.fbosJulia.push(this.createRenderTarget());for(let e=0;e<2;e++)this.fbosAccumulator.push(this.createRenderTarget())}createRenderTarget(e=4){const{clientWidth:t,clientHeight:r}=this.container;return new A(t,r,{minFilter:v,magFilter:v,wrapS:b,wrapT:b,format:[U,E,C][e],type:F})}setupJuliaScene(){this.sceneJulia=new m,this.shaderJulia=new d({uniforms:{box:{value:null},c:{value:null},subpixelOffset:{value:null},juliaMap:{value:null},resolution:{value:null},restart:{value:1}},vertexShader:g,fragmentShader:_});const e=new p(2,2),t=new f(e,this.shaderJulia);this.sceneJulia.add(t)}setupAccumulatorScene(){this.sceneAccumulator=new m,this.shaderAccumulator=new d({uniforms:{juliaMap:{value:null},accumulatorMap:{value:null},resolution:{value:null},restart:{value:1}},vertexShader:g,fragmentShader:X});const e=new p(2,2),t=new f(e,this.shaderAccumulator);this.sceneAccumulator.add(t)}setupCamera(){this.camera=new u(-1,1,1,-1,.1,10),this.camera.position.set(0,0,1),this.camera.lookAt(0,0,0)}getResolution(){const{clientWidth:e,clientHeight:t}=this.container;return new y(e,t)}setViewBoxUniforms(){if(!this.workProgress)return;const{clientWidth:e,clientHeight:t}=this.container,r=e/t,[n,o]=[r>1?r:1,r>1?1:1/r];this.shaderJulia.uniforms.box.value=[-n,-o,n,o]}assignWork(e){this.workProgress={...e,currentIteration:0,currentSample:0,isComplete:!1},this.setViewBoxUniforms()}getCurrentJuliaFboTexture(){return this.fbosJulia[this.currentFboIndexJulia].texture}getCurrentAccumulatorFboTexture(){return this.fbosAccumulator[this.currentFboIndexAccumulator].texture}getSubpixelOffset(e,t){const n=Math.floor(t/2)*(t+1),o=(e*1579+n)%(t*t),i=o%t/t,c=Math.floor(o/t)/t;return[i+.5/t,c+.5/t]}iterateJulia(e,t,r){var i;const[n,o]=[this.currentFboIndexJulia,(this.currentFboIndexJulia+1)%2];this.shaderJulia.uniforms.juliaMap.value=this.fbosJulia[n].texture,this.shaderJulia.uniforms.subpixelOffset.value=r,this.shaderJulia.uniforms.restart.value=t?1:0,this.shaderJulia.uniforms.c.value=(i=this.workProgress)==null?void 0:i.c,e.setRenderTarget(this.fbosJulia[o]),e.render(this.sceneJulia,this.camera),e.setRenderTarget(null),this.currentFboIndexJulia=o}accumulateSample(e,t){const[r,n]=[this.currentFboIndexAccumulator,(this.currentFboIndexAccumulator+1)%2];this.shaderAccumulator.uniforms.juliaMap.value=this.getCurrentJuliaFboTexture(),this.shaderAccumulator.uniforms.accumulatorMap.value=this.fbosAccumulator[r].texture,this.shaderAccumulator.uniforms.restart.value=t?1:0,e.setRenderTarget(this.fbosAccumulator[n]),e.render(this.sceneAccumulator,this.camera),e.setRenderTarget(null),this.currentFboIndexAccumulator=n}step(e){if(!this.workProgress||this.workProgress.isComplete)return!1;const t=this.getSubpixelOffset(this.workProgress.currentSample,this.workProgress.samplesPerAxis);return this.iterateJulia(e,this.workProgress.currentIteration===0,t),this.workProgress.currentIteration++,this.workProgress.currentIteration>=this.workProgress.iterations&&(this.accumulateSample(e,this.workProgress.currentSample===0),this.workProgress.currentIteration=0,this.workProgress.currentSample++),this.workProgress.currentSample>=this.workProgress.samplesPerAxis*this.workProgress.samplesPerAxis?(this.workProgress.isComplete=!0,!0):!1}}const B=5e-5;class H{constructor(e){s(this,"container");s(this,"scene");s(this,"camera");s(this,"renderer");s(this,"cleanUpTasks");s(this,"animationRequestID",null);s(this,"lastTime",null);s(this,"isStopped",!1);s(this,"mandelbrotScene");s(this,"mandelbrotStage");s(this,"juliaScene");s(this,"juliaStage");s(this,"showJulia",!0);s(this,"showMandelbrot",!0);s(this,"shader",null);s(this,"z0",[-.5,0]);s(this,"zoomCenter",[-.5,0]);s(this,"zoomScale",1);this.container=e,this.cleanUpTasks=[],this.renderer=new K({antialias:!0,alpha:!0}),this.renderer.setClearColor(0,0),e.appendChild(this.renderer.domElement),this.renderer.getContext().getExtension("EXT_float_blend"),this.scene=this.setupScene(),this.camera=this.setupCamera(),this.mandelbrotScene=new L(e),this.resetMandelbrotStage(),this.juliaScene=new Y(e),this.resetJuliaStage(),this.setupResizeRenderer(),this.resizeRenderer(),this.cleanUpTasks.push(()=>{this.animationRequestID&&cancelAnimationFrame(this.animationRequestID)}),this.animate=this.animate.bind(this),this.animate()}resizeRenderer(){var i;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));const{clientWidth:e,clientHeight:t}=this.container;this.renderer.setSize(e,t),console.log(`Resize! (${e}, ${t})`);const r=e/t,[n,o]=[r>1?r:1,r>1?1:1/r];this.camera instanceof u&&(this.camera.top=o,this.camera.bottom=-o,this.camera.left=-n,this.camera.right=n,this.camera.updateProjectionMatrix()),this.shader.uniforms.resolution.value=this.getResolution(),(i=this.mandelbrotScene)==null||i.resize(),this.resetMandelbrotStage()}setupResizeRenderer(){const e=new ResizeObserver(()=>{this.resizeRenderer()});e.observe(this.container),this.cleanUpTasks.push(()=>e.unobserve(this.container)),this.resizeRenderer()}cleanUp(){this.container.removeChild(this.renderer.domElement);for(const e of this.cleanUpTasks)e();this.renderer.dispose()}setupScene(){const e=new m;this.shader=new d({uniforms:{accumulatorMap1:{value:null},accumulatorMap2:{value:null},resolution:{value:null},showJulia:{value:null},showMandelbrot:{value:null},time:{value:0}},vertexShader:g,fragmentShader:O});const t=new p(2,2),r=new f(t,this.shader);return e.add(r),e}setupCamera(){const e=new u(-1,1,1,-1,.1,10);return e.position.set(0,0,1),e.lookAt(0,0,0),e}getResolution(){const{clientWidth:e,clientHeight:t}=this.container;return new y(e,t)}saveAsImage(e){const r=this.renderer.domElement.toDataURL("image/png"),n=document.createElement("a");n.href=r,n.download=e+".png",document.body.appendChild(n),n.click(),document.body.removeChild(n)}resetMandelbrotStage(){this.mandelbrotStage=0,this.progressMandelbrotStage()}resetJuliaStage(){this.juliaStage=0,this.progressJuliaStage()}progressMandelbrotStage(){if(this.mandelbrotStage>=2)return;const e={zoomCenter:this.zoomCenter,zoomScale:this.zoomScale,iterations:[1,32][this.mandelbrotStage],samplesPerAxis:[1,5][this.mandelbrotStage]};this.mandelbrotScene.assignWork(e),this.mandelbrotStage++}progressJuliaStage(){if(this.juliaStage>=2)return;const e={c:this.z0,zoomScale:this.zoomScale,iterations:[1,32][this.juliaStage],samplesPerAxis:[1,5][this.juliaStage]};this.juliaScene.assignWork(e),this.juliaStage++}pointerInput(e,t,r,n){const o=this.getResolution(),i=o.x/o.y,[c,l]=[i>1?i:1,i>1?1:1/i];this.zoomCenter=[this.zoomCenter[0]-this.zoomScale*2*c*e/o.x,this.zoomCenter[1]+this.zoomScale*2*l*t/o.y],this.zoomScale=Math.max(this.zoomScale*r,B),this.resetMandelbrotStage()}pointerMove(e,t){const r=this.getResolution(),n=r.x/r.y,[o,i]=[n>1?n:1,n>1?1:1/n],c=[o*(e/r.x-.5),i*t/r.y-.5];this.z0=[this.zoomCenter[0]+2*this.zoomScale*c[0],this.zoomCenter[1]-2*this.zoomScale*c[1]],this.resetJuliaStage()}animate(){this.animationRequestID=requestAnimationFrame(this.animate),this.animateStep(this.isStopped)}animateStep(e){const t=(this.lastTime??0)+(e?0:.01);this.lastTime=t,this.showMandelbrot&&this.mandelbrotScene.step(this.renderer)&&this.progressMandelbrotStage(),this.showJulia&&this.juliaScene.step(this.renderer)&&this.progressJuliaStage(),this.shader.uniforms.accumulatorMap1.value=this.mandelbrotScene.getCurrentAccumulatorFboTexture(),this.shader.uniforms.accumulatorMap2.value=this.juliaScene.getCurrentAccumulatorFboTexture(),this.shader.uniforms.showJulia.value=this.showJulia?1:0,this.shader.uniforms.showMandelbrot.value=this.showMandelbrot?1:0,this.renderer.render(this.scene,this.camera)}}function q(a,e,t){return e>=a.left&&e<=a.right&&t>=a.top&&t<=a.bottom}class N{constructor(e,t){s(this,"container");s(this,"mapper");s(this,"pointers",new Map);s(this,"lastDistance",null);s(this,"lastAngle",null);s(this,"lastMidpoint",null);s(this,"onPointerDown",e=>{var r,n;const t=this.container.getBoundingClientRect();if(this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY}),e.pointerType==="mouse"&&((r=this.mapper.mouse)!=null&&r.down)?this.mapper.mouse.down(e.clientX-t.left,e.clientY-t.top,e.button):e.pointerType==="touch"&&this.pointers.size===1&&((n=this.mapper.touch)!=null&&n.start)&&this.mapper.touch.start(e.clientX-t.left,e.clientY-t.top),this.pointers.size===2&&e.pointerType==="touch"){const[o,i]=Array.from(this.pointers.values());this.lastDistance=this.getDistance(o,i),this.lastAngle=this.getAngle(o,i),this.lastMidpoint=this.getMidpoint(o,i)}});s(this,"onPointerMove",e=>{var i,c,l,M;const t=this.container.getBoundingClientRect();e.pointerType==="mouse"&&(i=this.mapper.mouse)!=null&&i.move&&this.mapper.mouse.move(e.clientX-t.left,e.clientY-t.top,q(t,e.clientX,e.clientY));const r=this.pointers.get(e.pointerId);if(!r)return;const n=e.clientX-r.x,o=e.clientY-r.y;if(e.pointerType==="mouse")(c=this.mapper.mouse)!=null&&c.drag&&this.mapper.mouse.drag(e.clientX-t.left,e.clientY-t.top,n,o,e.buttons);else if(e.pointerType==="touch"){if(this.pointers.size===1&&((l=this.mapper.touch)!=null&&l.dragSingle))this.mapper.touch.dragSingle(e.clientX-t.left,e.clientY-t.top,n,o);else if(this.pointers.size===2){const[x,w]=Array.from(this.pointers.values()),S=this.getDistance(x,w),z=this.getAngle(x,w),h=this.getMidpoint(x,w);if(this.lastDistance&&this.lastAngle&&this.lastMidpoint){const I=this.lastDistance/S,R=z-this.lastAngle,k={x:h.x-this.lastMidpoint.x,y:h.y-this.lastMidpoint.y};(M=this.mapper.touch)!=null&&M.dragPair&&this.mapper.touch.dragPair(h.x,h.y,k.x,k.y,I,R),this.lastDistance=S,this.lastAngle=z,this.lastMidpoint=h}}}this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY})});s(this,"onPointerUp",e=>{var r,n;const t=this.container.getBoundingClientRect();this.pointers.delete(e.pointerId),e.pointerType==="mouse"&&((r=this.mapper.mouse)!=null&&r.up)?this.mapper.mouse.up(e.clientX-t.left,e.clientY-t.top,e.button):e.pointerType==="touch"&&this.pointers.size===0&&((n=this.mapper.touch)!=null&&n.end)&&this.mapper.touch.end(e.clientX-t.left,e.clientY-t.top),this.pointers.size<2&&(this.lastDistance=null,this.lastAngle=null,this.lastMidpoint=null)});s(this,"onWheel",e=>{var r;const t=this.container.getBoundingClientRect();if((r=this.mapper.mouse)!=null&&r.wheel){const n=e.deltaY<0?.8333333333333334:1.2;this.mapper.mouse.wheel(e.clientX-t.left,e.clientY-t.top,n)}});s(this,"onKeydown",e=>{var t;(t=this.mapper.keyboard)!=null&&t.keydown&&this.mapper.keyboard.keydown({key:e.key,code:e.code,shiftKey:e.shiftKey,ctrlKey:e.ctrlKey,altKey:e.altKey,metaKey:e.metaKey})});s(this,"onKeyup",e=>{var t;(t=this.mapper.keyboard)!=null&&t.keyup&&this.mapper.keyboard.keyup({key:e.key,code:e.code,shiftKey:e.shiftKey,ctrlKey:e.ctrlKey,altKey:e.altKey,metaKey:e.metaKey})});this.container=e,this.mapper=t,this.container.style.touchAction="none",this.container.addEventListener("pointerdown",this.onPointerDown),window.addEventListener("pointermove",this.onPointerMove),this.container.addEventListener("pointerup",this.onPointerUp),this.container.addEventListener("pointercancel",this.onPointerUp),this.container.addEventListener("wheel",this.onWheel),document.addEventListener("keydown",this.onKeydown),document.addEventListener("keyup",this.onKeyup)}getDistance(e,t){const r=t.x-e.x,n=t.y-e.y;return Math.sqrt(r*r+n*n)}getAngle(e,t){return Math.atan2(t.y-e.y,t.x-e.x)}getMidpoint(e,t){return{x:(e.x+t.x)/2,y:(e.y+t.y)/2}}cleanup(){this.container.removeEventListener("pointerdown",this.onPointerDown),window.removeEventListener("pointermove",this.onPointerMove),this.container.removeEventListener("pointerup",this.onPointerUp),this.container.removeEventListener("pointercancel",this.onPointerUp),this.container.removeEventListener("wheel",this.onWheel),document.removeEventListener("keydown",this.onKeydown),document.removeEventListener("keyup",this.onKeyup)}}const Q=()=>{const a=P.useRef(null);return P.useEffect(()=>{console.log("useEffect: ",a.current);const e=new H(a.current),t=new N(a.current,{mouse:{drag:(r,n,o,i,c)=>(c&1)===1&&e.pointerInput(o,i,1,0),wheel:(r,n,o)=>e.pointerInput(0,0,o,0),down:(r,n,o)=>o===0&&e.pointerMove(r,n),move:(r,n,o)=>e.pointerMove(r,n)},touch:{start:(r,n)=>e.pointerMove(r,n),dragSingle:(r,n,o,i)=>e.pointerMove(r,n),dragPair:(r,n,o,i,c,l)=>e.pointerInput(o,i,c,l)},keyboard:{keydown:r=>{r.code==="KeyJ"&&(e.showJulia=!e.showJulia),r.code==="KeyM"&&(e.showMandelbrot=!e.showMandelbrot)}}});return()=>{e.cleanUp(),t.cleanup()}},[]),D.jsx("div",{ref:a,style:{width:"100%",height:"100%"}})};export{Q as default};

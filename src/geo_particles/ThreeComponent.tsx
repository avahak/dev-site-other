import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { BaseScene } from './baseScene';
import { PreloadData } from './types';
// import scandinaviaJson from '../../public/geo/scandinavia?raw';

const SceneComponent: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<PreloadData>();

    const preload = async () => {
        console.log("preload()");
        try {
            const responses = await Promise.all([
                fetch(`/dev-site-misc/geo/scandinavia.json`),
                fetch(`/dev-site-misc/socials/app_atlas.png`),
                fetch(`/dev-site-misc/socials/reaction_atlas.png`),
            ]);
            for (const response of responses) {
                if (!response.ok)
                    throw new Error('File fetch failed');
            }
            const data0 = await responses[0].json();
            const blob1 = await responses[1].blob();
            const img1 = await createImageBitmap(blob1);
            const tex1 = new THREE.Texture(img1);
            tex1.needsUpdate = true;
            const blob2 = await responses[2].blob();
            const img2 = await createImageBitmap(blob2);
            const tex2 = new THREE.Texture(img2);
            tex2.needsUpdate = true;
            setData({ scandinavia: data0, appAtlas: tex1, reactionAtlas: tex2 });
        } catch (error) {
            console.error('Error loading JSON:', error);
        }
    };

    useEffect(() => {
        if (!data) {
            preload();
            return;
        }
        console.log("useEffect: ", containerRef.current);
        const scene = new BaseScene(containerRef.current!, data);
        return () => {
            scene.cleanUp();
        };
    }, [data]);

    return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default SceneComponent;
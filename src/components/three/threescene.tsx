import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {LightingOptions} from "@/components/types/lighting";
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

interface ThreeSceneProps {
    model: any;
    pose: any;
    background: any;
    lightingOptions: LightingOptions;
}

export default function ThreeScene(props: ThreeSceneProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const loader = new OBJLoader(THREE.DefaultLoadingManager);
    const mtlLoader = new MTLLoader(THREE.DefaultLoadingManager);

    useEffect(() => {

        let objModel: THREE.Object3D | null = null;

        if (typeof window !== 'undefined') {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);
            containerRef.current?.appendChild(renderer.domElement);
            camera.position.z = 5;

            const ambientLight = new THREE.AmbientLight(0x404040);
            scene.add(ambientLight);

            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshStandardMaterial({ color: 0x00ff00, metalness: 0.5, roughness: 0.5 });
            const cube = new THREE.Mesh(geometry, material);
            // scene.add(cube);

            let lightingOptions = props.lightingOptions;

            const light = new THREE.DirectionalLight(lightingOptions.color, lightingOptions.intensity);
            light.position.set(lightingOptions.position.x, lightingOptions.position.y, lightingOptions.position.z);
            if (lightingOptions.angle) {
                light.angle = lightingOptions.angle;
            }
            scene.add(light);

            loader.setMaterials()

            loader.load(
                // props.model,
                '/models/Hydrant.obj',
                function (object) {
                    object.position.set(0, -2, 0);
                    object.scale.set(0.1,0.1,0.1);
                    scene.add(object);
                    objModel = object
                },
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                function (error) {
                    console.log('An error happened');
                }
            )

            const renderScene = () => {
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;

                if (objModel) {
                    objModel.children.forEach(child => {
                        child.rotation.y += 0.01;
                    });
                }

                renderer.render(scene, camera);
                requestAnimationFrame(renderScene);
            };

            renderScene();


        }

    }, []);

    return <div ref={containerRef} />;
};
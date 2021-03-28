import { Plane } from "@react-three/drei";
import { useFrame, useLoader } from "react-three-fiber";
import * as THREE from "three";
import frag from "shaders/wave/frag.glsl";
import vert from "shaders/wave/vert.glsl";
import { useRef } from "react";
import { useControls } from "leva";

function Controls({ material }) {
    const { bigWaveElevation, bigWaveFrequency } = useControls({
        bigWaveElevation: { value: 0.2, min: 0.01, max: 0.5, step: 0.01 },
        bigWaveFrequency: { value: [1, 1], x: { min: 0.1, max: 10 }, y: { min: 0.1, max: 10 } },
    });

    if (material.current) {
        material.current.uniforms.uBigWavesElevation.value = bigWaveElevation;
        material.current.uniforms.uBigWavesFrequency.value.x = bigWaveFrequency[0];
        material.current.uniforms.uBigWavesFrequency.value.y = bigWaveFrequency[1];
    }
    return null;
}

function WavePlane({ uniforms }) {
    const mat = useRef();
    useFrame(({ clock }, dt) => {
        if (!mat.current) return;
        mat.current.uniforms.uTime.value += dt;
    });

    return (
        <mesh rotation={[Math.PI, 0, 0]}>
            <planeBufferGeometry args={[4, 4, 128, 128]} />
            <shaderMaterial
                side={THREE.DoubleSide}
                ref={mat}
                wireframe
                uniforms={uniforms}
                fragmentShader={frag}
                vertexShader={vert}
            />
            <Controls material={mat} />
        </mesh>
    );
}

export default function Scene() {
    const texture = useLoader(THREE.TextureLoader, "/textures/noise.png");
    texture.generateMipmaps = false;

    const uniforms = {
        sampleTex: { value: texture },
        uTime: { value: 0.0 },
        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
    };

    return <WavePlane uniforms={uniforms} />;
}

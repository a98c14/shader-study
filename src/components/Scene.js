import { Plane } from "@react-three/drei";
import { useFrame, useLoader } from "react-three-fiber";
import * as THREE from "three";
import frag from "shaders/wave/frag.glsl";
import vert from "shaders/wave/vert.glsl";
import { useRef } from "react";
import { useControls } from "leva";

function Controls({ material }) {
    const {
        bigWaveElevation,
        bigWaveFrequency,
        bigWaveSpeed,
        surfaceColor,
        depthColor,
        colorOffset,
        colorMultiplier,
        smallWaveElevation,
        smallWaveFrequency,
        smallWaveSpeed,
        smallWaveCount,
    } = useControls({
        bigWaveElevation: { value: 0.81, min: 0.01, max: 2, step: 0.01 },
        bigWaveFrequency: { value: [0.4, 0.8], x: { min: 0.1, max: 10 }, y: { min: 0.1, max: 10 } },
        bigWaveSpeed: { value: 1.14, min: 0.01, max: 10, step: 0.01 },
        surfaceColor: { value: "#9bd8ff", label: "Surface Color" },
        depthColor: "#186691",
        colorOffset: { value: -0.38, min: -1.0, max: 1.0 },
        colorMultiplier: { value: 2.5, min: 0.1, max: 10.0 },
        smallWaveElevation: { value: 0.49, min: 0.01, max: 2, step: 0.01 },
        smallWaveFrequency: { value: 1.12, min: 0.01, max: 2, step: 0.01 },
        smallWaveSpeed: { value: 0.69, min: 0.01, max: 10, step: 0.01 },
        smallWaveCount: { value: 5.0, min: 1.0, max: 10.0, step: 1.0 },
    });

    if (material.current) {
        console.log(surfaceColor);
        material.current.uniforms.uBigWavesElevation.value = bigWaveElevation;
        material.current.uniforms.uBigWavesFrequency.value.x = bigWaveFrequency[0];
        material.current.uniforms.uBigWavesFrequency.value.y = bigWaveFrequency[1];
        material.current.uniforms.uBigWavesSpeed.value = bigWaveSpeed;
        material.current.uniforms.uDepthColor.value.set(depthColor);
        material.current.uniforms.uSurfaceColor.value.set(surfaceColor);
        material.current.uniforms.uColorOffset.value = colorOffset;
        material.current.uniforms.uColorMultiplier.value = colorMultiplier;
        material.current.uniforms.uSmallWavesElevation.value = smallWaveElevation;
        material.current.uniforms.uSmallWavesFrequency.value = smallWaveFrequency;
        material.current.uniforms.uSmallWavesSpeed.value = smallWaveSpeed;
        material.current.uniforms.uSmallWaveCount.value = smallWaveCount;
    }

    return <></>;
}

function WavePlane({ uniforms }) {
    const mat = useRef();
    useFrame(({ clock }, dt) => {
        if (!mat.current) return;
        mat.current.uniforms.uTime.value += dt;
    });

    return (
        <mesh scale={[4, 4, 4]} rotation={[0, 0, 0]}>
            <planeBufferGeometry args={[8, 8, 512, 512]} />
            <shaderMaterial ref={mat} uniforms={uniforms} fragmentShader={frag} vertexShader={vert} />
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
        uBigWavesElevation: { value: 0.81 },
        uBigWavesFrequency: { value: new THREE.Vector2(0.4, 0.8) },
        uBigWavesSpeed: { value: 1.14 },
        uSmallWavesElevation: { value: 0.49 },
        uSmallWavesFrequency: { value: 1.12 },
        uSmallWavesSpeed: { value: 0.69 },
        uDepthColor: { value: new THREE.Color("#186691") },
        uSurfaceColor: { value: new THREE.Color("#9bd8ff") },
        uColorOffset: { value: -0.38 },
        uColorMultiplier: { value: 2.5 },
        uSmallWaveCount: { value: 5.0 },
    };

    return <WavePlane uniforms={uniforms} />;
}

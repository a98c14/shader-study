import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import { Scene } from "./components";
import { Suspense } from "react";

function App() {
    return (
        <div className="App" style={{ width: "100vw", height: "100vh" }}>
            <Canvas
                camera={{ position: [0, 0, 10], fov: 40, near: 0.5, far: 50 }}
                gl={{
                    powerPreference: "high-performance",
                    antialias: true,
                    stencil: false,
                    alpha: true,
                    depth: false,
                }}
            >
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
                <OrbitControls />
            </Canvas>
        </div>
    );
}

export default App;

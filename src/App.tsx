// import "./App.css";

import { useState, useRef } from "react";

import { Mesh } from "three";
import { Canvas, Object3DNode, extend, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { LumaSplatsThree } from "@lumaai/luma-web";
import { LumaSplatsSemantics } from "@lumaai/luma-web";

// Make LumaSplatsThree available to R3F
extend({ LumaSplats: LumaSplatsThree });

// For typeScript support:
declare module "@react-three/fiber" {
  interface ThreeElements {
    lumaSplats: Object3DNode<LumaSplatsThree, typeof LumaSplatsThree>;
  }
}

function Scene({ src, speed }: { src: string; speed: number }) {
  const cubeRef = useRef<Mesh>(null);
  useFrame(() => {
    const cube = cubeRef.current;
    if (!cube) return;
    cube.rotation.x += speed;
    cube.rotation.y += speed;
  });
  return (
    <lumaSplats
      semanticsMask={LumaSplatsSemantics.FOREGROUND}
      source={src}
      position={[-1, 0, 0]}
      scale={0.5}
      ref={cubeRef}
    />
  );
}

function App() {
  const src =
    "https://lumalabs.ai/capture/56b68556-2226-4d24-95c1-9e641d6110d7";
  const [speed, setSpeed] = useState(0.01);
  const changelineLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changeValue: number = Number(e.target.value);
    setSpeed(changeValue / 100);
  };
  return (
    <div style={{ width: "90vw", height: "90vh" }}>
      <input
        type="range"
        name="range"
        min="0"
        max="100"
        defaultValue={speed * 100}
        onChange={changelineLength}
      />
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [0, 0, 10],
        }}
      >
        <ambientLight args={[0xffffff]} intensity={0.2} />
        <OrbitControls />
        <Scene src={src} speed={speed} />
      </Canvas>
    </div>
  );
}

export default App;

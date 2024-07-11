// src/components/ThreeYellowSphere.tsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";

const ThreeYellowSphere: React.FC = () => {
  return (
    <Canvas className="max-h-40">
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="yellow" />
      </Sphere>
    </Canvas>
  );
};

export default ThreeYellowSphere;

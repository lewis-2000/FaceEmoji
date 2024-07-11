// src/components/ThreeEmojiMesh.tsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { AnnotatedPrediction } from "@tensorflow-models/facemesh";

interface ThreeEmojiMeshProps {
  faces: AnnotatedPrediction[]; //  face data type
}

const ThreeEmojiMesh: React.FC<ThreeEmojiMeshProps> = ({ faces }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    // Your animation or mesh manipulation logic based on face data
    if (meshRef.current) {
      const scaleFactor = 0.5; // Example scale factor
      meshRef.current.scale.set(
        faces.length * scaleFactor,
        faces.length * scaleFactor,
        1
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <circleGeometry args={[1, 32]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
};

export default ThreeEmojiMesh;

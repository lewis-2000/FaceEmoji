// src/components/EmojiEditor.tsx
import React, { useState } from "react";
import CameraView from "./CameraView";
import EmojiPreview from "./EmojiPreview";
import FacialControls from "./FacialControls";
import EmojiControls from "./EmojiControls";
import * as facemesh from "@tensorflow-models/facemesh";
// import ThreeEmojiMesh from "./ThreeEmojiMesh";
// import FaceMeshSphere from "./FaceMesh";

const EmojiEditor: React.FC = () => {
  const [faces, setFaces] = useState<facemesh.AnnotatedPrediction[]>([]);

  const handleFaceDetected = (
    detectedFaces: facemesh.AnnotatedPrediction[]
  ) => {
    setFaces(detectedFaces);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Emoji Editor</h1>
        <div className="flex flex-col md:flex-row md:space-x-4">
          {/* Left Column: Camera View and Emoji Preview */}
          <div className="md:w-1/2 flex flex-col items-center space-y-4">
            <CameraView onFaceDetected={handleFaceDetected} />
            <EmojiPreview faces={faces} />
            {/* <ThreeEmojiMesh faces={faces} /> */}
          </div>

          {/* Right Column: Facial Controls and Emoji Customization */}
          <div className="md:w-1/2 flex flex-col items-center space-y-4">
            <FacialControls />
            <EmojiControls />
          </div>
          {/* <FaceMeshSphere /> */}
        </div>
      </div>
    </div>
  );
};

export default EmojiEditor;

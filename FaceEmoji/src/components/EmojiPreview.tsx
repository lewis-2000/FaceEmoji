// src/components/EmojiPreview.tsx
import React, { useEffect, useRef } from "react";
import * as facemesh from "@tensorflow-models/facemesh";

interface EmojiPreviewProps {
  faces: facemesh.AnnotatedPrediction[];
}

const EmojiPreview: React.FC<EmojiPreviewProps> = ({ faces }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        faces.forEach((face) => {
          const keypoints = face.scaledMesh as [number, number, number][];
          keypoints.forEach((point) => {
            const [x, y] = point;
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
          });
        });
      }
    }
  }, [faces]);

  return (
    <canvas
      ref={canvasRef}
      width="640"
      height="480"
      className="w-full h-full border border-gray-300 bg-black"
    />
  );
};

export default EmojiPreview;

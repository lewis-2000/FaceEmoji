// src/components/CameraView.tsx
import React, { useRef, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";

interface CameraViewProps {
  onFaceDetected: (faces: facemesh.AnnotatedPrediction[]) => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onFaceDetected }) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const runFacemesh = useCallback(async () => {
    await tf.setBackend("webgl");
    const net = await facemesh.load({ maxFaces: 1 });

    const detect = async () => {
      if (
        webcamRef.current &&
        webcamRef.current.video &&
        webcamRef.current.video.readyState === 4 &&
        canvasRef.current
      ) {
        const video = webcamRef.current.video as HTMLVideoElement;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;

        // Set video width and height
        video.width = videoWidth;
        video.height = videoHeight;

        // Set canvas width and height
        const canvas = canvasRef.current as HTMLCanvasElement;
        canvas.width = videoWidth;
        canvas.height = videoHeight;

        // Pass the video element directly to estimateFaces
        const face = await net.estimateFaces(video);

        // Pass face data to the parent component
        onFaceDetected(face);

        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        if (ctx) {
          ctx.clearRect(0, 0, videoWidth, videoHeight);

          face.forEach((prediction) => {
            const keypoints = prediction.scaledMesh as [
              number,
              number,
              number
            ][];
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
      requestAnimationFrame(detect);
    };

    detect();
  }, [onFaceDetected]);

  useEffect(() => {
    runFacemesh();
  }, [runFacemesh]);

  return (
    <div className="relative w-full max-w-md">
      <Webcam
        ref={webcamRef}
        className="w-full rounded-lg shadow-lg"
        audio={false}
        mirrored
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};

export default CameraView;

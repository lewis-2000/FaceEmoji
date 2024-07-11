// src/components/FacialControls.tsx
import React from "react";

const FacialControls: React.FC = () => {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4 space-y-4">
      <h2 className="text-xl font-bold mb-2">Facial Controls</h2>
      {/* Add sliders, buttons, or other controls here */}
      <div className="flex items-center">
        <label className="mr-2">Eyes Size:</label>
        <input
          type="range"
          min="0"
          max="100"
          defaultValue="50"
          className="w-full"
        />
      </div>
      <div className="flex items-center">
        <label className="mr-2">Mouth Size:</label>
        <input
          type="range"
          min="0"
          max="100"
          defaultValue="50"
          className="w-full"
        />
      </div>
      {/* Add more controls as needed */}
    </div>
  );
};

export default FacialControls;

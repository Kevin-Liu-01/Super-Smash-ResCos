// src/components/MapEditor.tsx
import React, { useState } from "react";

const MapEditor: React.FC = () => {
  const [platforms, setPlatforms] = useState<{ x: number; y: number }[]>([]);

  const addPlatform = (x: number, y: number) => {
    setPlatforms((prev) => [...prev, { x, y }]);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "lightblue",
      }}
      onClick={(e) => addPlatform(e.clientX, e.clientY)}
    >
      {platforms.map((platform, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: platform.x,
            top: platform.y,
            width: "100px",
            height: "20px",
            backgroundColor: "brown",
          }}
        />
      ))}
    </div>
  );
};

export default MapEditor;

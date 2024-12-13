// src/components/Player.tsx// src/components/Player.tsx
import React, { useEffect } from "react";
import {
  applyGravity,
  applyMovement,
  checkBounds,
  findGround,
} from "../utils/physics";

type PlayerProps = {
  data: {
    position: { x: number; y: number };
    velocity: { vx: number; vy: number };
    health: number;
    isShielding: boolean;
  };
  controls: {
    left: string;
    right: string;
    up: string;
    attack: string;
    shield: string;
  };
  color: string;
  platforms: { x: number; y: number; width: number; height: number }[];
  onAttack: () => void;
  setPlayerData: Function;
};

const Player: React.FC<PlayerProps> = ({
  data,
  controls,
  color,
  platforms,
  onAttack,
  setPlayerData,
}) => {
  const { position, velocity, health, isShielding } = data;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === controls.left)
        setPlayerData((prev: any) => ({
          ...prev,
          velocity: { ...prev.velocity, vx: -5 },
        }));
      if (e.key === controls.right)
        setPlayerData((prev: any) => ({
          ...prev,
          velocity: { ...prev.velocity, vx: 5 },
        }));
      if (e.key === controls.up) {
        // Find the ground Y position to check if the player is on the ground
        const groundY = findGround(platforms, position);
        if (position.y + 50 >= groundY) {
          setPlayerData((prev: any) => ({
            ...prev,
            velocity: { ...prev.velocity, vy: -15 }, // Jumping upwards with a negative vertical velocity
          }));
        }
      }
      if (e.key === controls.attack) onAttack();
      if (e.key === controls.shield)
        setPlayerData((prev: any) => ({ ...prev, isShielding: true }));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === controls.left || e.key === controls.right)
        setPlayerData((prev: any) => ({
          ...prev,
          velocity: { ...prev.velocity, vx: 0 },
        }));
      if (e.key === controls.shield)
        setPlayerData((prev: any) => ({ ...prev, isShielding: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [controls, position, platforms, onAttack, setPlayerData]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      const groundY = findGround(platforms, position);
      applyGravity(position, velocity, groundY); // Apply gravity
      applyMovement(position, velocity); // Apply movement (horizontal + vertical)
      checkBounds(position, window.innerWidth, window.innerHeight); // Check bounds for walls

      setPlayerData((prev: any) => ({
        ...prev,
        position: { ...position },
        velocity: { ...velocity },
      }));
    }, 16); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [position, velocity, platforms, setPlayerData]);

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: "50px",
        height: "50px",
        backgroundColor: color,
        border: isShielding ? "5px solid blue" : "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontWeight: "bold",
      }}
    >
      {health}
    </div>
  );
};

export default Player;

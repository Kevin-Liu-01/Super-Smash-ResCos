"use client";
// src/components/Game.tsx
import React, { useState } from "react";
import Player from "../components/player";
import { applyKnockback, isInRange } from "../utils/physics";

const Game: React.FC = () => {
  const [player1, setPlayer1] = useState({
    position: { x: 100, y: 400 },
    velocity: { vx: 0, vy: 0 },
    health: 100,
    isShielding: false,
  });

  const [player2, setPlayer2] = useState({
    position: { x: 600, y: 400 },
    velocity: { vx: 0, vy: 0 },
    health: 100,
    isShielding: false,
  });

  const platforms = [
    { x: 200, y: 300, width: 200, height: 10 },
    { x: 500, y: 200, width: 150, height: 10 },
  ];

  const handleAttack = (
    attacker: any,
    defender: any,
    setDefender: Function,
  ) => {
    if (isInRange(attacker.position, defender.position, 60)) {
      console.log("Hit!");
      const direction = attacker.position.x < defender.position.x ? 1 : -1;
      applyKnockback(defender, direction);
      setDefender((prev: any) => ({
        ...prev,
        health: Math.max(0, prev.health - (defender.isShielding ? 5 : 10)), // Damage is reduced if shielding
      }));
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "lightblue",
        overflow: "hidden",
      }}
    >
      {platforms.map((platform, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: platform.x,
            top: platform.y,
            width: platform.width,
            height: platform.height,
            backgroundColor: "gray",
          }}
        />
      ))}
      <Player
        data={player1}
        controls={{ left: "a", right: "d", up: "w", attack: "f", shield: "g" }}
        color="red"
        platforms={platforms}
        onAttack={() => handleAttack(player1, player2, setPlayer2)}
        setPlayerData={setPlayer1}
      />
      <Player
        data={player2}
        controls={{
          left: "ArrowLeft",
          right: "ArrowRight",
          up: "ArrowUp",
          attack: "/",
          shield: ".",
        }}
        color="blue"
        platforms={platforms}
        onAttack={() => handleAttack(player2, player1, setPlayer1)}
        setPlayerData={setPlayer2}
      />
    </div>
  );
};

export default Game;

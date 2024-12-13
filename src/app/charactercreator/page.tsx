// src/components/CharacterCreator.tsx
import React, { useState } from "react";

const CharacterCreator: React.FC = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#ff0000");
  const [damage, setDamage] = useState(10);

  const saveCharacter = () => {
    console.log({ name, color, damage });
  };

  return (
    <div>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <input
        type="number"
        placeholder="Damage"
        value={damage}
        onChange={(e) => setDamage(Number(e.target.value))}
      />
      <button onClick={saveCharacter}>Save Character</button>
    </div>
  );
};

export default CharacterCreator;

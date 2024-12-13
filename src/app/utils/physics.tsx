// src/utils/physics.ts
export const applyGravity = (position: any, velocity: any, groundY: number) => {
  if (position.y + 50 < groundY) {
    velocity.vy += 1; // Gravity acceleration
  } else {
    velocity.vy = 0;
    position.y = groundY - 50; // Set player on top of the ground
  }
};

export const applyMovement = (position: any, velocity: any) => {
  position.x += velocity.vx;
  position.y += velocity.vy;
};

export const checkBounds = (position: any, width: number, height: number) => {
  position.x = Math.max(0, Math.min(width - 50, position.x)); // Horizontal bounds
  position.y = Math.min(height - 50, position.y); // Bottom bound
};

export const isInRange = (pos1: any, pos2: any, range: number) => {
  const dx = pos2.x - pos1.x;
  const dy = pos2.y - pos1.y;
  return Math.sqrt(dx * dx + dy * dy) <= range;
};

export const applyKnockback = (player: any, direction: number) => {
  player.velocity.vx = 10 * direction; // Knockback in the horizontal direction
  player.velocity.vy = -10; // Slight upward knockback
};

export const findGround = (platforms: any[], position: any) => {
  const platform = platforms.find(
    (p) =>
      position.x + 50 > p.x &&
      position.x < p.x + p.width &&
      position.y + 50 <= p.y &&
      position.y + 50 + 10 >= p.y,
  );
  return platform ? platform.y : 450; // Default ground level
};

// components/PhysicsWalls.js
import React from 'react';
import { CuboidCollider } from '@react-three/rapier';
import { useThree } from '@react-three/fiber';

export default function PhysicsWalls() {
  const { viewport } = useThree(); // Gets the size of the R3F viewport

  // Calculate wall dimensions based on viewport
  const wallThickness = 0.1;
  const width = viewport.width;
  const height = viewport.height;

  return (
    <>
      {/* Floor */}
      <CuboidCollider position={[0, -height / 2 - wallThickness / 2, 0]} args={[width / 2, wallThickness / 2, 5]} />
      {/* Ceiling */}
      <CuboidCollider position={[0, height / 2 + wallThickness / 2, 0]} args={[width / 2, wallThickness / 2, 5]} />
      {/* Left Wall */}
      <CuboidCollider position={[-width / 2 - wallThickness / 2, 0, 0]} args={[wallThickness / 2, height / 2, 5]} />
      {/* Right Wall */}
      <CuboidCollider position={[width / 2 + wallThickness / 2, 0, 0]} args={[wallThickness / 2, height / 2, 5]} />
      {/* Back Wall (optional, depending on Z-depth) */}
      <CuboidCollider position={[0, 0, -5]} args={[width / 2, height / 2, wallThickness / 2]} />
    </>
  );
}
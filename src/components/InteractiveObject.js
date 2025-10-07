// components/InteractiveObject.js
'use client'; // Mark this as a client component in Next.js App Router

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { OrbitControls } from '@react-three/drei'; // For basic rotation to start

// We will create these components in the next steps
import YourObject from './YourObject';
import PhysicsWalls from './PhysicsWalls';

export default function InteractiveObjectScene() {
  return (
    <div style={{
      position: 'fixed', // Or 'absolute' depending on your layout
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 9999, // Ensure it's on top
      pointerEvents: 'none', // Allow clicks 'through' initially
    }}>
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow />

          <Physics gravity={[0, 0, 0]}> {/* Start with no gravity, or add some! */}
            <YourObject />
            <PhysicsWalls />
          </Physics>

          {/* Optional: Add OrbitControls for easy rotation testing */}
          {/* <OrbitControls enablePan={false} enableZoom={false} /> */}

        </Suspense>
      </Canvas>
    </div>
  );
}
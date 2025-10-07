// components/InteractiveObjectScene.js
'use client';

import React, { Suspense, useEffect, useState, useRef } from 'react'; // Added useRef
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import YourObject from './YourObject';
import PhysicsWalls from './PhysicsWalls';

export default function InteractiveObjectScene() {
  const [gravity, setGravity] = useState([0, 0, 0]);
  const canvasContainerRef = useRef(); // Ref for the main container

  useEffect(() => {
    // ... (Your existing useEffect for orientation) ...
    const handleOrientation = (event) => {
        const { beta, gamma } = event;
        const sensitivity = 0.1;
        const gx = (gamma || 0) * sensitivity;
        const gy = (beta || 0) * -sensitivity;
        setGravity([gx, gy, 0]);
    };
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', handleOrientation);
    }
    return () => {
        if (window.DeviceOrientationEvent) {
            window.removeEventListener('deviceorientation', handleOrientation);
        }
    };
  }, []);

  // Handler for clicks that miss any 3D object
  const handlePointerMissed = (event) => {
    console.log("Pointer Missed Fired!", event.clientX, event.clientY); 
    const canvasEl = canvasContainerRef.current;
    if (!canvasEl) return;

    // Get the click coordinates
    const { clientX, clientY } = event;

    // IMPORTANT: Hide the canvas from pointer events *briefly*
    canvasEl.style.pointerEvents = 'none';

    // Find the element underneath at these coordinates
    const elementBelow = document.elementFromPoint(clientX, clientY);

    // IMPORTANT: Restore pointer events immediately
    canvasEl.style.pointerEvents = 'auto'; // Or 'inherit', or its original value

    // If an element was found, simulate a click on it
    if (elementBelow) {
      console.log("Clicking through to:", elementBelow);
      elementBelow.click();
    }
  };

  return (
    <div
      ref={canvasContainerRef} // Assign the ref
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'auto', // <-- CRITICAL: Must be 'auto' to receive events
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
      }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 50 }}
        onPointerMissed={handlePointerMissed} // <-- Add the miss handler
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow />
          <Physics gravity={gravity}>
            <YourObject />
            <PhysicsWalls />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
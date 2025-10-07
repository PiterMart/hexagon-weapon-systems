// components/YourObject.js
import React, { useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import { MeshDistortMaterial } from '@react-three/drei';
import { useDrag } from '@use-gesture/react';
import * as THREE from 'three';

export default function YourObject() {
  // A ref to access the RigidBody's API (like applyImpulse, wakeUp)
  const objectRef = useRef();

  // Define the 3D mesh for our object.
  // We don't need `style={{ pointerEvents: 'auto' }}` here.
  // R3F determines interactivity based on whether event handlers
  // (like onClick or those from useDrag) are attached.
  const mesh = (
    <mesh castShadow receiveShadow>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <MeshDistortMaterial color="#8A2BE2" speed={2} distort={0.3} />
    </mesh>
  );

  // Setup the drag interaction using @use-gesture/react
  const bind = useDrag(({ active, movement: [mx, my], timeStamp, event }) => {
    // Check if the ref is connected to the RigidBody
    if (objectRef.current) {
      // If the object is currently being dragged (mouse button is down)
      if (active) {
        // Stop R3F/DOM events from bubbling further if needed during drag
        event.stopPropagation();

        // Calculate a force vector based on mouse/touch movement.
        // The division by 50 acts as a sensitivity control - adjust as needed!
        const force = new THREE.Vector3(mx / 50, -my / 50, 0);

        // Apply the force as an impulse to the physics body.
        // 'true' means it applies to the center of mass.
        objectRef.current.applyImpulse(force, true);

        // Ensure the physics body isn't "sleeping" while we interact with it.
        objectRef.current.wakeUp();
      }
      // When 'active' becomes false (drag ends), we do nothing here,
      // allowing the object to continue moving based on physics.
    }
    // Return timeStamp (required by use-gesture for some configurations)
    return timeStamp;
  }, {
      // Configuration for use-gesture:
      // Capture pointer events for this gesture.
      pointer: { capture: true },
  });

  // Define a handler for click events (separate from drag)
  const handleClick = (event) => {
    // IMPORTANT: Stop the event from bubbling up to the Canvas.
    // If we don't do this, clicking the object might *also* trigger
    // the 'onPointerMissed' handler and cause a click-through.
    event.stopPropagation();

    console.log("3D Object Clicked!");

    // Example: Give it a little jump on click
    if(objectRef.current) {
        objectRef.current.applyImpulse({ x: 0, y: 5, z: 0 }, true);
        objectRef.current.wakeUp();
    }
  };

  // Return the JSX for the component
  return (
    // RigidBody is the core physics component from @react-three/rapier
    <RigidBody
      ref={objectRef}         // Connect the ref
      colliders="cuboid"      // Use a simple box shape for physics calculation
      restitution={0.7}       // Bounciness (0-1+)
      friction={0.1}          // How much it resists sliding
      linearDamping={0.2}     // Simulates air resistance/drag for linear movement
      angularDamping={0.2}    // Simulates air resistance/drag for rotation
      // canSleep={true}      // Recommended for performance: allows object to stop calculating when still
      {...bind()}             // Spread the drag event handlers onto this component
      onClick={handleClick}   // Add the click event handler
    >
      {/* Render the visual mesh inside the physics body */}
      {mesh}
    </RigidBody>
  );
}
import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

interface IKeyPressed {
  [key: string]:  boolean; // Example: keys are strings, values can be string, number, or boolean
}

export default function CameraMovement() {
    const { camera } = useThree();
    const keyPressed = useRef<IKeyPressed>({});

  useEffect(() => {
        const handleKeyDown = (e:KeyboardEvent) => {
            keyPressed.current[e.key] = true;
            e.preventDefault()
        };
        const handleKeyUp = (e:KeyboardEvent) => {
            delete keyPressed.current[e.key];
        };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    const speed = 5 * delta; // Adjust speed as needed

    if (keyPressed.current['w']) camera.position.z -= speed;
    if (keyPressed.current['s']) camera.position.z += speed;
    if (keyPressed.current['a']) camera.position.x -= speed;
    if (keyPressed.current['d']) camera.position.x += speed;
    if (keyPressed.current[' ']) camera.position.y += speed; // Spacebar for up
    if (keyPressed.current['Shift']) camera.position.y -= speed; // Shift for down
  });

  return null; 
}
import React, { useEffect, useRef, useState, RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import IKeyPressed from '@/app/interfaces/KeyPressed'
import IPosition from '@/app/interfaces/Position'
import { RapierRigidBody } from '@react-three/rapier'; // For Rapier
import useKeyboard from './useKeyboard';

export default function usePlayerMovement(
    ref: RefObject<RapierRigidBody>,
) : IPosition {

    const keyPressed = useKeyboard();
    const [position, setPosition] = useState<IPosition>({
        x: 0, y: 0, z: 0
    })

    useFrame((_, delta) => {
        const speed = 5 * delta; // Adjust speed as needed

        if (ref.current) {
        let { x, y ,z } = ref.current.translation()
        if (keyPressed.current['w']) z -= speed;
        if (keyPressed.current['s']) z += speed;
        if (keyPressed.current['a']) x -= speed;
        if (keyPressed.current['d']) x += speed;
        if (keyPressed.current[' ']) y += speed; // Spacebar for up
        if (keyPressed.current['Shift']) y -= speed; // Shift for down
    
        setPosition({
            x,y,z
        })
        } 
    });

    return position;
}



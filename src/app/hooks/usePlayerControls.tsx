import React, { useEffect, useRef, useState, RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import IKeyPressed from '@/app/interfaces/KeyPressed'
import useKeyboard from './useKeyboard';

interface IPlayerControls {
    isTurning: boolean
}

export default function usePlayerControls(): IPlayerControls {
    const keyPressed = useKeyboard();
    const [playerControls, setPlayerControls] = useState<IPlayerControls>({
        isTurning: false
    })

    useFrame((_, delta) => {
        if (playerControls.isTurning) {
            if (keyPressed.current['q']) setPlayerControls({isTurning: false})
        } else {
            if (keyPressed.current['q']) setPlayerControls({isTurning: true})
        }
    });

    return playerControls;
}
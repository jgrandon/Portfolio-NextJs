import React, { useEffect, useRef, RefObject } from 'react';
import IKeyPressed from '@/app/interfaces/KeyPressed'


export default function useKeyboard() : RefObject<IKeyPressed> {
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

    return keyPressed;
}



'use client'
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls } from "@react-three/drei";

import Floor from '@/app/components/World/Floor'
import Heaven from '@/app/components/World/Heaven'
import { Physics } from '@react-three/rapier'
import { Quest } from '@/app/components/Quest'
import { GameProvider } from '../context/game'
import { Camera } from '@/app/components/Camera/'

export function ThreeTest() {
    const keyboardMap = [
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "left", keys: ["ArrowLeft", "KeyA"] },
        { name: "right", keys: ["ArrowRight", "KeyD"] },
        { name: "run", keys: ["Shift"] },
    ];
    return (
    <KeyboardControls map={keyboardMap}>
        <Canvas>
            <Suspense>
                <Physics
                debug
                gravity={[0, -9.8, 0]}
                colliders="cuboid">
                    <Heaven/>
                    <Floor />

                    <ambientLight intensity={Math.PI / 2} />
                    <spotLight position={[10, 10, 10]} angle={0.15}
                        penumbra={1} decay={0} intensity={Math.PI} />
                    <pointLight position={[-10, -10, -10]}
                        decay={0} intensity={Math.PI} />
                    
                    <GameProvider>
                        <Camera />
                        <Quest />
                    </GameProvider>
                    {/**
                     * agregar murallas
                     * 
                     */}
                </Physics>
                {/* <OrbitControls /> */}
            </Suspense>
        </Canvas>
    </KeyboardControls>)
}

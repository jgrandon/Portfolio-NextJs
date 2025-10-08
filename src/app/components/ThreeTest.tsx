'use client'
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import {Box} from '@/app/components/Box'
//import CameraMovement from '@/app/components/CameraMovement'
import Floor from '@/app/components/Floor'
import Heaven from '@/app/components/Heaven'
import Player from '@/app/components/Player'
import { Physics } from '@react-three/rapier'

export function ThreeTest() {
    return (
        <Canvas>
            <Suspense>
                <Physics
                gravity={[0, -9.8, 0]}
                colliders="cuboid">
                    <Heaven/>
                    {/*
                    <CameraMovement />
                    */}
                    <ambientLight intensity={Math.PI / 2} />
                    <spotLight position={[10, 10, 10]} angle={0.15}
                        penumbra={1} decay={0} intensity={Math.PI} />
                    <pointLight position={[-10, -10, -10]}
                        decay={0} intensity={Math.PI} />

                    <Box position={[-1.2, 0, 0]} />
                    <Box position={[1.2, 0, 0]} />
                    <Box position={[1.2, 0, 3]} />
                    <Player />

                    <Floor />
                </Physics>
                <OrbitControls />
            </Suspense>
            {/**
             * agregar murallas
             * agregar logica de colisiones
             * 
             */}
        </Canvas>
    )
}

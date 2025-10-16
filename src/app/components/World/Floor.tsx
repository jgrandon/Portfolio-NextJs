'use client'
import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier';

export default function Floor () {
    const color = new THREE.Color('#63541a')//.setRGB(0.5, 0.5, 0.5)
    
    return (
    <RigidBody
    colliders="cuboid"
    type="fixed">
        <mesh position={[0, -5, 0]}>
            <boxGeometry args={[10000, 0.1, 10000]} />
            <meshStandardMaterial color={color} />
        </mesh>
    </RigidBody>
    )
}
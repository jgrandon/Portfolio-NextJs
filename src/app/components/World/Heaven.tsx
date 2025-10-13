'use client'
import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'

export default function Heaven () {
    const color = new THREE.Color().setRGB(0, 0.1, 0.7)
    return (
        <mesh position={[0, 20, 0]}>
            <boxGeometry args={[1000, 0.1, 1000]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}
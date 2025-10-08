'use client'
import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'
import usePlayerMovement from '../hooks/usePlayerMovement'
import IPosition from '@/app/interfaces/Position'
import { useForwardRaycast } from '../hooks/useForwardRaycast'
import { RigidBody, RapierRigidBody } from '@react-three/rapier'; // For Rapier
import usePlayerControls from '../hooks/usePlayerControls'

export default function Player(props: ThreeElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>(null!)
    const bodyRef = useRef<RapierRigidBody>(null!)
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    
    const playerPosition = usePlayerMovement(bodyRef)
    const playerControls = usePlayerControls()
    const defaultColor = new THREE.Color().setRGB(0.2, 0, 0) 
    const activeColor = new THREE.Color().setRGB(0.3, 0, 0) 

    const raycast = useForwardRaycast(meshRef)

    useFrame((state, delta) => {

        //meshRef.current.rotation.x += delta
        //meshRef.current.rotation.y += 1 * delta
        const intersections = raycast()
        if (intersections.length > 1) {
            console.log('intersection', intersections)
        }

        if (playerControls.isTurning) {
            meshRef.current.rotation.y += 1 * delta
        }
    })

    return (
    <RigidBody
    ref={bodyRef}
    colliders="cuboid"
    position={[
        playerPosition.x,
        playerPosition.y,
        playerPosition.z
    ]}>
        <mesh
        {...props}
        ref={meshRef}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? activeColor : defaultColor} />
        </mesh>
    </RigidBody>
    )
}
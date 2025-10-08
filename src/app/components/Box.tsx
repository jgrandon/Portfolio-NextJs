'use client'
import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier';

interface IProps {
    position: [number, number, number]
    color?: string
    stick?: boolean
}

/*props: ThreeElements['mesh']*/
export function Box(props: IProps) {
    const { position, color = 'green', stick = false } = props
    const meshRef = useRef<THREE.Mesh>(null!)
    //const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    /*
    useFrame((state, delta) => 
        (meshRef.current.rotation.x += delta/5)
    )
    */
    return (
        stick 
        ? <mesh
            position={position}
            ref={meshRef}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
        </mesh>
        : <RigidBody position={position}>
            <mesh
                ref={meshRef}
                scale={active ? 1.5 : 1}
                onClick={(event) => setActive(!active)}
                >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </RigidBody>  
    )
}
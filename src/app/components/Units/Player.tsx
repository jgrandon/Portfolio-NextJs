'use client'
import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'
import usePlayerMovement from '../../hooks/usePlayerMovement'
import { useForwardRaycast } from '../../hooks/useForwardRaycast'
import { RigidBody, RapierRigidBody, CapsuleCollider, CylinderCollider } from '@react-three/rapier'; // For Rapier

import usePlayerControls from '../../hooks/usePlayerControls'
import { useGame } from '@/app/context/game'



export default function Player(props: ThreeElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>(null!)
    const bodyRef = useRef<RapierRigidBody>(null!)
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    const playerPosition = usePlayerMovement(bodyRef)
    const playerControls = usePlayerControls()
    const defaultColor = new THREE.Color().setRGB(0.2, 0, 0) 
    const activeColor = new THREE.Color().setRGB(0.3, 0, 0) 
    const { 
        unitsContext: { addUnit },
        cameraContext : { followObject }
    } = useGame()
    //const raycast = useForwardRaycast(meshRef)

    useEffect(() => {
        addUnit('player', bodyRef)
    },[])

    useFrame((state, delta) => {
        //meshRef.current.rotation.x += delta
        //meshRef.current.rotation.y += 1 * delta
        //const intersections = raycast()
        /*
        if (intersections.length > 0) {
            //console.log('player => intersection', intersections)
        }
        */

        if (playerControls.isTurning) {
            meshRef.current.rotation.y += 1 * delta
        }
    })

    return (
            <RigidBody
            ref={bodyRef}
            colliders={false}
            type="dynamic"
            mass={5}
            /*
            position={[
                playerPosition.x,
                playerPosition.y,
                playerPosition.z
            ]}
                */
            >
                <mesh
                position={[
                    0,0,0
                ]}
                {...props}
                ref={meshRef}
                scale={active ? 5 : 1}
                onClick={
                    (event) => followObject(bodyRef) /*setActive(!active)*/
                }
                onPointerOver={(event) => setHover(true)}
                onPointerOut={(event) => setHover(false)}
                >
                    {/*
                    <boxGeometry args={[2, 2, 2]} />
                    */}
                    <sphereGeometry args={[2, 50, 50]} />
                    <meshStandardMaterial color={hovered ? activeColor : defaultColor} />
                </mesh>
                {/*
                <CapsuleCollider args={[0.08, 0.15]}  mass={10}/>                <CapsuleCollider args={[0.08, 0.15]}  mass={10}/>
                */}
                <CylinderCollider args={[0.16, 1]}  mass={10}/>
            </RigidBody>
    )
}
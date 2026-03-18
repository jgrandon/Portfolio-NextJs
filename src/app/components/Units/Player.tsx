'use client'
import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'
import usePlayerMovement from '../../hooks/usePlayerMovement'
import { useForwardRaycast } from '../../hooks/useForwardRaycast'
import { RigidBody, RapierRigidBody, CapsuleCollider, CylinderCollider, BallCollider } from '@react-three/rapier'; // For Rapier

import usePlayerControls from '../../hooks/usePlayerControls'
import { useGame } from '@/app/context/game'
import { GUI } from 'lil-gui'
import { Qahiri } from 'next/font/google'


export default function Player(gui , props: ThreeElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>(null!)
    const bodyRef = useRef<RapierRigidBody>(null!)
    const [hovered, setHover] = useState(false)
    const [scale, setScale] = useState(1)




    const playerPosition = usePlayerMovement(bodyRef)
    const playerControls = usePlayerControls()
    const defaultColor = new THREE.Color().setRGB(0.2, 0, 0) 
    const activeColor = new THREE.Color().setRGB(0.3, 0, 0) 
    const { units,getUnitById } = useGame().unitsContext

    const { 
        unitsContext: { addUnit },
        cameraContext : { followObject }
    } = useGame()
    //const raycast = useForwardRaycast(meshRef)

    useEffect(() => {
        addUnit('player', bodyRef)
        const player = getUnitById('player')

        const gui = new GUI()
        gui.add((player?.stats.size || 0), 'number')
        return () => {
            gui.destroy()
        }
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
        const player = getUnitById('player')
        if (player?.stats.size != scale) {
            setScale(player?.stats.size ?? 1)
        }

        //console.log('updating player', player.stats)
        if (playerControls.isTurning) {
            meshRef.current.rotation.y += 1 * delta
        }
    })

    return (
            <RigidBody
            ref={bodyRef}
            colliders={false}
            type="dynamic"
            mass={2}
            >
                <mesh
                position={[
                    0,0,0
                ]}
                {...props}
                ref={meshRef}
                scale={scale}
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
                <CylinderCollider args={[0.16, 1]}  mass={10}/>
                */}
                <BallCollider args={[2]}  mass={10}
                scale={scale}/>
                

            </RigidBody>
    )
}
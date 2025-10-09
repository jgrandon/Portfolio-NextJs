'use client'
import * as THREE from 'three'
import React, { useRef, useState, RefObject } from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'
import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { IntersectionEnterPayload } from '@react-three/rapier'; // For Rapier

interface IProps {
    position: [number, number, number]
    color?: string
    stick?: boolean
    ref?: RefObject<RapierRigidBody>
    onIntersectionEnter?: { (payload: IntersectionEnterPayload): void }
}

/*props: ThreeElements['mesh']*/
export function Box(props: IProps) {
    const { position,
        color = 'green',
        stick = false,
        ref = null,
        //onIntersectionEnter = () => {}
    } = props
    const rigidBodyRef = useRef<RapierRigidBody>(null!)
    //const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    

    
    useFrame((state, delta) =>  {
        //(meshRef.current.rotation.x += delta/5)
        if (rigidBodyRef.current) {
            console.log('box rigidBodyRef', rigidBodyRef.current)
        }
    }
    )
    



    const onIntersectionEnter = (payload: IntersectionEnterPayload): void => 
    {
        console.log('Box => onIntersectionEnter' )
    }
    return (
        <RigidBody
        ref={ref}
        onIntersectionEnter={onIntersectionEnter}
        position={position}>
            <mesh
                position={position}
                //ref={ref}
                scale={active ? 1.5 : 1}
                onClick={(event) => setActive(!active)}
                >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </RigidBody>  
    )
}
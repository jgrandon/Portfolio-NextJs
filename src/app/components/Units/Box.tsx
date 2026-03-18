'use client'
import * as THREE from 'three'
import React, { useRef, useState, RefObject } from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'
import { RigidBody, RapierRigidBody, CylinderCollider, CuboidCollider } from '@react-three/rapier';
import { IntersectionEnterPayload } from '@react-three/rapier'; // For Rapier
import { getRandomInt, rollDice } from '@/app/utils/math'

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
    const [frameCount, setFrameCount] = useState(0)
    //const rigidBodyRef = useRef<RapierRigidBody>(null!)
    //const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    
    useFrame((state, delta) =>  {
        //Sconsole.log('frameCount', frameCount)
        //(meshRef.current.rotation.x += delta/5)
        if (ref?.current) {
            //console.log('box rigidBodyRef', ref.current)
            if (frameCount%30==0) {
                console.log('frameCount', frameCount)
                if (rollDice(5) == 5) {
                    const [x, z] = [getRandomInt(-8, 8) , getRandomInt(-8, 8)]
                    console.log('frameCount', {x,z})
    
                    const moveVector = new THREE.Vector3(x, 0, z);
                    console.log('vector', moveVector)
                    ref.current.applyImpulse(moveVector, true)
                }
    
                   //const offset = new THREE.Vector3(10, 5, 10);
            } 
        }


        setFrameCount(prev => prev + 1)
    })


    const onIntersectionEnter = (payload: IntersectionEnterPayload): void => 
    {
        console.log('Box => onIntersectionEnter' )
    }
    return (
        <RigidBody
        //type="dynamic"
        mass={1}
        ref={ref}
        colliders={false}
        onIntersectionEnter={onIntersectionEnter}
        //position={position}
        >
            <mesh
                position={position}
                //ref={ref}
                scale={active ? 1.5 : 1}
                onClick={(event) => setActive(!active)}
                >
                <boxGeometry args={[ 2, 2, 2]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <CuboidCollider
                            position={position}
            args={[8, 1, 8]}
            mass={1}
            />
        </RigidBody>  
    )
}
'use client'
import * as THREE from 'three'
import React, { useRef, useState, RefObject } from 'react'
import { RapierRigidBody, RigidBody, CylinderCollider, IntersectionEnterPayload } from '@react-three/rapier'

interface IProps {
    position: [number, number, number]
    color?: string
    ref?: RefObject<THREE.Mesh>,
    onIntersection: (payload: IntersectionEnterPayload) => void
}

export function GoalField(props: IProps) {
    const rbRef = useRef<RapierRigidBody>(null)
    const { position, color = 'purple', ref, onIntersection } = props
    const [active, setActive] = useState(false)

    return <RigidBody
        ref={rbRef}
        type="fixed"
        colliders={false}
    >
        <mesh
            ref={ref}
            position={position}
            onClick={(event) => setActive(!active)}
        >
            <cylinderGeometry args={[6, 6, 30 ,15]} />
            <meshStandardMaterial
            color={color}
            transparent
            opacity={0.3}/>
        </mesh>
        <CylinderCollider
            position={position}
            args={[15, 4]}
            mass={1}
            sensor
            onIntersectionEnter={onIntersection}
            />
    </RigidBody>
}
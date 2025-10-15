'use client'
import * as THREE from 'three'
import React, { useRef, useState, RefObject } from 'react'

interface IProps {
    position: [number, number, number]
    color?: string
    ref?: RefObject<THREE.Mesh>
}

/*props: ThreeElements['mesh']*/
export function GoalField(props: IProps) {
    const { position, color = 'purple', ref } = props
    const [active, setActive] = useState(false)

    return <mesh
        ref={ref}
        position={position}
        //scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
    >
        <cylinderGeometry args={[6, 6, 30 ,15]} />
        <meshStandardMaterial color={color} transparent opacity={0.3}/>
    </mesh>
}
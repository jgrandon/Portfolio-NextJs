import * as THREE from 'three'
import { useFrame, ThreeElements } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import IPosition from '@/app/interfaces/Position'
import { useForwardRaycast } from '../../hooks/useForwardRaycast'
import useIntersection from '@/app/hooks/useIntersection'

const Circle = (props: {
    position: [number, number, number]
    color: string
    onIntersection: () => void
})  => {
    const meshRef = useRef<THREE.Mesh>(null!)
    const raycast = useForwardRaycast(meshRef)
    const intersections = useIntersection(meshRef)

    useFrame((state, delta) => {
        //meshRef.current.rotation.x += delta
        //meshRef.current.rotation.y += 1 * delta
        /*
        const intersections = raycast()
        console.log('intersections', intersections)
        */
        if (intersections.current.length > 0) {
            console.log('Buff => intersection', intersections)
            props.onIntersection()
        }
    })



    return (
    <mesh
        ref={meshRef}
        position={props.position}
        //scale={active ? 5 : 1}
        //onClick={(event) => setActive(!active)}
        //onPointerOver={(event) => setHover(true)}
        //onPointerOut={(event) => setHover(false)}
    >
        <sphereGeometry args={[1, 30, 30]} />
        <meshStandardMaterial color={props.color} />
    </mesh>
    )
}

export function SpeedBuff (props : {
    position: [number, number, number]
}) {
    const [consumed, setConsumed] = useState<boolean>()
    //const {} = useGame()
    const consumeSpeedBuff = () => {
        if (!consumed) {
            console.log('ahora activo los poderes')
        } 
        setConsumed(true)
    }

    return <Circle
        position={props.position}
        color={consumed ? 'green' : 'white'}
        onIntersection={() => consumeSpeedBuff()}
    />
}
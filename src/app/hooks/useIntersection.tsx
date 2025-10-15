import { RefObject, useRef } from "react"
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useGame } from '@/app/context/game'
import { RapierRigidBody } from "@react-three/rapier"
import { IUnit } from "@/app/interfaces/Units"

export default function useIntersection(currentRef: RefObject<THREE.Mesh>) {
    const { units } = useGame().unitsContext
    const intersections = useRef<IUnit[]>([])
    useFrame((state, delta) => {
        //console.log('useIntersection' ,units)
        const intersectedUnits = units.filter(u => (
            areIntersecting(currentRef, u.ref, u.id=='box1')
        ))
        intersections.current = intersectedUnits
    })
    return intersections
}

const areIntersecting = (
    a: RefObject<THREE.Mesh>,
    b: RefObject<RapierRigidBody>,
    verbose: boolean
)  => {
    if (!a.current || !b.current!) return false 
    const aPosition = a.current.position
    const bPosition = b.current.translation()
    a.current.geometry.computeBoundingBox()
    const aBounds = a.current.geometry.boundingBox as THREE.Box3
    //const bBounds = b.current?.collider()?.shape?.halfExtents
    const bBounds={x:0.5, z:0.5}
    
    //if (verbose) console.log('areIntersecting', aPosition, aBounds, bPosition)

    const xValidation =
        aPosition.x  + aBounds.min.x < bPosition.x// - bBounds.x
        && aPosition.x + aBounds.max.x > bPosition.x// + bBounds.x
    const zValidation = 
        aPosition.z + aBounds.min.z < bPosition.z// - bBounds.z
        && aPosition.z + aBounds.max.z > bPosition.z// + bBounds.z

    return xValidation && zValidation
}
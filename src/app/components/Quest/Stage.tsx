'use client'
import * as THREE from 'three'
import { useFrame, ThreeElements } from '@react-three/fiber'
import { StaticCopyUsage } from "three"
import { useState, useRef, useEffect, RefObject } from 'react'
import { GoalField } from "../GoalField"
import {Box} from '@/app/components/Box'
import { IntersectionEnterPayload, RapierRigidBody } from '@react-three/rapier'; // For Rapier

import { useForwardRaycast } from '@/app/hooks/useForwardRaycast'
import usePlayerControls from '@/app/hooks/usePlayerControls'

import { useTooltips } from '@/app/context/tooltip'
import { Tooltip } from '@/app/components/HUD/Tooltip'


export function QuestStage (
) {
    const box1 = useRef<RapierRigidBody>(null!)
    const box2 = useRef<RapierRigidBody>(null!)
    const box3 = useRef<RapierRigidBody>(null!)
    const field = useRef<THREE.Mesh>(null!)
    const [completed, setCompleted] = useState(false)
    const { showTooltip, hideTooltip } = useTooltips();
    const [color1, setColor1] = useState('purple')
    const [color2, setColor2] = useState('purple')
    const [color3, setColor3] = useState('purple')

    useEffect(() => {
        console.log('Stage => useEffect', {
            a: field.current,
            b: box1.current
        })
            console.log('Stage => intersecting', box1, box2)
        const a = field.current.geometry.boundingBox
        const b = box1.current.translation()
        console.log('Stage => useEffect', {a,b})
        const tooltipId = 'mission started'
        const newTooltip = (<Tooltip closeTooltip={tooltipId}>
            Wena comparito. Esto se trata de meter los cubos en la zona naranja. re izy
        </Tooltip>) as React.ReactNode
        showTooltip(tooltipId, newTooltip, false)
    }, [box1, box2, box3, field])


    useFrame((state, delta) => {
        if (!completed) {
            checkIfCompleted()
        }
    })

    const checkIfCompleted = () => {
        const a = areIntersecting(field, box1)
        const b = areIntersecting(field, box2)
        const c = areIntersecting(field, box3)
        if (a) setColor1('green')
        if (b) setColor2('green')
        if (c) setColor3('green')
        if (a && b && c) { 
            console.log('Stage => intersecting', box1, box2)
            const newTooltip = (<Tooltip>
                Enhorabuena... Mision completada
            </Tooltip>) as React.ReactNode
            hideTooltip('mission started')
            showTooltip('mission complete', newTooltip, 15000)
            setCompleted(true)
        }
    }

    const areIntersecting = (
        a: RefObject<THREE.Mesh>,
        b: RefObject<RapierRigidBody>
    )  => {
        if (!a.current || !b.current!) return false 
        const aPosition = a.current.position
        const bPosition = b.current.translation()
        a.current.geometry.computeBoundingBox()
        const aBounds = a.current.geometry.boundingBox as THREE.Box3
        //const bBounds = b.current?.collider()?.shape?.halfExtents
        const bBounds={x:0.5, z:0.5}
        const xValidation =
            aPosition.x + aBounds.min.x < bPosition.x - bBounds.x
            && aPosition.x + aBounds.max.x > bPosition.x + bBounds.x
        const zValidation = 
            aPosition.z + aBounds.min.z < bPosition.z - bBounds.z
            && aPosition.z + aBounds.max.z > bPosition.z + bBounds.z

        return xValidation && zValidation
    }
 
    return <>
    {
        completed ? null : (
            <>
            <Box ref={box1} position={[3, 0, 4]} 
            color={color1}
            />
            <Box ref={box2} position={[7, 0, 0]} 
            color={color2}
            />
            <Box ref={box3} position={[7, 0, 3]}
            color={color3}
            />
            </>
        )
    }
        <GoalField 
            ref={field}
            position={[15,0,15]}
            color={completed ? 'green' : 'orange'}
        />
    </>
}
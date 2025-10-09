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
    const { showTooltip } = useTooltips();

    useEffect(() => {
        console.log('Stage => useEffect', {
            a: field.current,
            b: box1.current
        })

        const a = field.current.geometry.boundingBox
        const b = box1.current.translation()
        console.log('Stage => useEffect', {a,b})
        const newTooltip = (<Tooltip>
            Wena comparito. Esto se trata de meter los cubos en la zona naranja. re izy
        </Tooltip>) as React.ReactNode
        showTooltip('mission started', newTooltip)
    }, [box1, box2, box3, field])


    useFrame((state, delta) => {
        const a = areIntersecting(field, box1)
        const b = areIntersecting(field, box2)
        const c = areIntersecting(field, box3)
        if (a && b && c) { 
            console.log('Stage => intersecting')
        const newTooltip = (<Tooltip>
            Enhorabuena... Mision completada
        </Tooltip>) as React.ReactNode
        showTooltip('mission complete', newTooltip)
        }
    })

    const areIntersecting = (
        a: RefObject<THREE.Mesh>,
        b: RefObject<RapierRigidBody>
    )  => {
        const aPosition = a.current.position
        const bPosition = b.current.translation()
        a.current.geometry.computeBoundingBox()
        const aBounds = a.current.geometry.boundingBox as THREE.Box3

        const xValidation =
            aPosition.x + aBounds.min.x < bPosition.x
            && aPosition.x + aBounds.max.x > bPosition.x
        const yValidation = 
            aPosition.y + aBounds.min.y < bPosition.y
            && aPosition.y + aBounds.max.y > bPosition.y

        return xValidation && yValidation
    }

    const verify = (payload: IntersectionEnterPayload) => {
        console.log('Stage => box1 Intersecting...', payload)
    }
        
    return <>
        <Box onIntersectionEnter={verify} ref={box1} position={[-1.2, 0, 0]} />
        <Box ref={box2} position={[1.2, 0, 0]} />
        <Box ref={box3} position={[1.2, 0, 3]} />
        <GoalField ref={field} position={[5,5,0]} color='orange'/>
    </>
}
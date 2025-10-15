'use client'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useState, useRef, useEffect, RefObject } from 'react'
import { GoalField } from "@/app/components/GoalField"
import {Box} from '@/app/components/Units/Box'
import { RapierRigidBody } from '@react-three/rapier'
import { useTooltips } from '@/app/context/tooltip'
import { Tooltip } from '@/app/components/HUD/Tooltip'
import { useGame } from '@/app/context/game'
import { SpeedBuff } from '../Units/Buffs'
import useIntersection from '@/app/hooks/useIntersection'

/*
import { useForwardRaycast } from '@/app/hooks/useForwardRaycast'
import usePlayerControls from '@/app/hooks/usePlayerControls'
*/

export function QuestStage (
) {
    const box1 = useRef<RapierRigidBody>(null!)
    const box2 = useRef<RapierRigidBody>(null!)
    const box3 = useRef<RapierRigidBody>(null!)
    const field = useRef<THREE.Mesh>(null!)
    const [completed, setCompleted] = useState(false)
    const { showTooltip, hideTooltip } = useTooltips();
    const [color1, setColor1] = useState('gray')
    const [color2, setColor2] = useState('gray')
    const [color3, setColor3] = useState('gray')
    const { addUnit, removeUnit } = useGame().unitsContext
    const intersections = useIntersection(field)

    useEffect(() => {
        addUnit('box1', box1)
        addUnit('box2', box2)
        addUnit('box3', box3)
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
        const a = intersections.current.find(i => i.id == 'box1')
        const b = intersections.current.find(i => i.id == 'box2')
        const c = intersections.current.find(i => i.id == 'box3')
        //const b = areIntersecting(field, box2)
        //const c = areIntersecting(field, box3)
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
            removeUnit('box1')
            removeUnit('box2')
            removeUnit('box3')
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
            <Box ref={box1} position={[8, 0, 7]} 
            color={color1}
            />
            <Box ref={box2} position={[8, 0, 5]} 
            color={color2}
            />
            <Box ref={box3} position={[15, 0, 10]}
            color={color3}
            />
            </>
        )
    }
        <SpeedBuff position={[35,-3.9,15]}/>
        <GoalField 
            ref={field}
            position={[15, 0, 15]}
            color={completed ? 'green' : 'orange'}
        />
    </>
}
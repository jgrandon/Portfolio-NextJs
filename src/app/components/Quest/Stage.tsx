'use client'
import * as THREE from 'three'
import { useState, useRef, useEffect } from 'react'
import { GoalField } from "@/app/components/GoalField"
import {Box} from '@/app/components/Units/Box'
import { IntersectionEnterPayload, RapierRigidBody } from '@react-three/rapier'
import { useTooltips } from '@/app/context/tooltip'
import { Tooltip } from '@/app/components/HUD/Tooltip'
import { useGame } from '@/app/context/game'
import { SpeedBuff } from '../Units/Buffs'
import delay from '@/app/utils/delay'
export function QuestStage (
) {
    const box1 = useRef<RapierRigidBody>(null!)
    const box2 = useRef<RapierRigidBody>(null!)
    const box3 = useRef<RapierRigidBody>(null!)
    const field = useRef<THREE.Mesh>(null!)

    const [completed, setCompleted] = useState(false)
    const [boxesCompleted, setBoxesCompleted] = useState([false,false,false])
    const { showTooltip, hideTooltip } = useTooltips();
    const { addUnit, removeUnit } = useGame().unitsContext

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

    const validateGoal = async (payload: IntersectionEnterPayload) => {
        console.log('validateGoal => intersection' , payload)
        let [a, b, c] = boxesCompleted

        if (payload.rigidBody == box1.current) a = true
        if (payload.rigidBody == box2.current) b = true
        if (payload.rigidBody == box3.current) c = true

        setBoxesCompleted([a,b,c])

        await delay(300)
        
        if (a&&b&&c) {
            const newTooltip = (<Tooltip>
                Enhorabuena... Mision completada
            </Tooltip>) as React.ReactNode
            hideTooltip('mission started')
            showTooltip('mission complete', newTooltip, 15000)

            removeUnit('box1')
            removeUnit('box2')
            removeUnit('box3')
            setCompleted(true)
        }
    }
 
    return <>
    {
        completed ? null : (
            <>
            <Box ref={box1} position={[8, 0, 7]} 
            color={boxesCompleted[0] ? 'green': 'gray'}
            />
            <Box ref={box2} position={[8, 0, 5]} 
            color={boxesCompleted[1] ? 'green': 'gray'}
            />
            <Box ref={box3} position={[15, 0, 10]}
            color={boxesCompleted[2] ? 'green': 'gray'}
            />
            </>
        )
    }
        <SpeedBuff position={[35,-3.9,15]}/>
        <GoalField
            onIntersection={validateGoal}
            ref={field}
            position={[15, 0, 15]}
            color={completed ? 'green' : 'orange'}
        />
    </>
}
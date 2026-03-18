import * as THREE from 'three'
import React, { RefObject, useRef, useState } from 'react'
import { BallCollider, IntersectionEnterPayload, RigidBody, RapierRigidBody } from '@react-three/rapier'
import { useGame } from '@/app/context/game'
import { useTooltips } from '@/app/context/tooltip'
import { BuffHUD } from '../HUD/BuffHUD'
import { useFrame } from '@react-three/fiber'
import { getRandomInt } from '@/app/utils/math'

const Circle = (props: {
    position: [number, number, number]
    color: string
    onIntersection: (payload: IntersectionEnterPayload) => void
    ref: RefObject<RapierRigidBody>
})  => {
    const meshRef = useRef<THREE.Mesh>(null!)
    return (
        <RigidBody
        ref={props.ref}
        colliders={false}
        type="fixed"
            >
            <mesh
                ref={meshRef}
                position={props.position}
            >
                <sphereGeometry args={[1, 30, 30]} />
                <meshStandardMaterial color={props.color} />
            </mesh>
            <BallCollider 
                position={props.position}
                args={[1]}
                mass={1}
                sensor
                onIntersectionEnter={props.onIntersection}
            /> 
        </RigidBody>
    )
}

export function SpeedBuff (props : {
    position: [number, number, number]
}) {
    const rbRef = useRef<RapierRigidBody>({} as RapierRigidBody)
    const [consumed, setConsumed] = useState<boolean>()
    const { units } = useGame().unitsContext
    const { showTooltip, hideTooltip } = useTooltips()

    const consumeSpeedBuff = (payload: IntersectionEnterPayload) => {
        if (!consumed) {
            let unitToBuff = units.current.find(u => u.ref.current == payload.rigidBody)
            if (unitToBuff) {
                const oldSpeed = unitToBuff.stats.speed
                unitToBuff.stats.speed = oldSpeed * 5
                const hud = <BuffHUD message={'Jalao'}/>
                showTooltip('speedBuff', hud )
                setTimeout(() => {
                    hideTooltip('speedBuff')
                    unitToBuff.stats.speed = oldSpeed
                    setConsumed(false)
                }, 10000)
            }
            setConsumed(true)
        }
    }

    return consumed ? null : <Circle
        ref={rbRef}
        position={props.position}
        color={consumed ? 'blue' : 'white'}
        onIntersection={consumeSpeedBuff}
    />
}

export function SizeBuff (props : {
    position: [number, number, number]
}) {
    const rbRef = useRef<RapierRigidBody>({} as RapierRigidBody)
    const consumed = useRef<boolean>(false)
    const { getUnitById } = useGame().unitsContext
    const { showTooltip, hideTooltip } = useTooltips()

    const consumeSizeBuff = (payload: IntersectionEnterPayload) => {
        if (!consumed.current) {
            let unitToBuff = getUnitById('player')
            console.log('consumeSizeBuff', unitToBuff)
            if (unitToBuff) {
                const oldSize = unitToBuff.stats.size
                unitToBuff.stats.size = oldSize * 5
                const hud = <BuffHUD message={'Pecho inflao'}/>
                showTooltip('sizeBuff', hud )
                setTimeout(() => {
                    hideTooltip('sizeBuff')
                    unitToBuff.stats.size = oldSize
                    consumed.current = false
                }, 10000)
            }
            consumed.current = true
            const [x, z] = [getRandomInt(-30, 30) , getRandomInt(-30, 30)]
            const moveVector = new THREE.Vector3(x, 0, z);
            
            rbRef?.current?.applyImpulse(moveVector, true)
        }
    }

    return consumed.current ? null : <Circle
        ref={rbRef}
        position={props.position}
        color={consumed.current ? 'blue' : 'green'}
        onIntersection={consumeSizeBuff}
    />
}
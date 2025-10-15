import { useFrame } from '@react-three/fiber'
import { useMemo, useState, useRef  } from 'react'
import { Object3D, Raycaster, Vector3 } from 'three'
import useKeyboard from './useKeyboard';
import { IUnit, IUnitRef } from '../interfaces/Units';
import { RapierRigidBody } from '@react-three/rapier';
import { useGame } from '@/app/context/game/index'

export const useFollowCamera = () => {
    const {
        isFollowCameraEnabled,
        toggleFollowCamera,
        followObject,
        getFollowCameraTarget
    } = useGame().cameraContext
    const keyPressed = useKeyboard();
    const target = useRef<RapierRigidBody>(null)
    const [isEnabled , setEnabled] = useState(false)

    useFrame((_, delta) => {
        if (keyPressed.current['v']) {
            //if (isEnabled) target.current = null
            console.log('v pressed => isEnabled', isEnabled)
            console.log('v pressed => target', target)
            toggleFollowCamera()
            
        }
    });


    return null
}

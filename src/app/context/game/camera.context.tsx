import { useState, useRef, RefObject  } from 'react'
import { IUnitRef, IUnitStats } from '@/app/interfaces/Units';
import { RapierRigidBody } from '@react-three/rapier';

export interface ICameraContext {
  isFollowCameraEnabled: boolean
  getFollowCameraTarget: () => IUnitRef
  followObject: (newTarget: IUnitRef) => void
  toggleFollowCamera: () => void
}

export const DEFAULT_CAMERA_CONTEXT = {
    isFollowCameraEnabled: false,
    getFollowCameraTarget: () =>  ({} as IUnitRef),
    followObject: (newTarget: IUnitRef, ) => {},
    toggleFollowCamera: () => {},
}

export const getCameraContext = () => {

    const target = useRef<RapierRigidBody>(null)
    const [isEnabled , setEnabled] = useState(false)

    const followObject = (newTarget: IUnitRef) => {
        console.log('followObject', newTarget.current)
        
        target.current = newTarget.current
    }

    const getFollowCameraTarget = (): IUnitRef => {
        return target
    }

    const toggleFollowCamera = () => {
        setEnabled(prev => !prev)
    }

    return {
        isFollowCameraEnabled: isEnabled,
        toggleFollowCamera,
        getFollowCameraTarget,
        followObject
    }
}

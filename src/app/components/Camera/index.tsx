'use client'
import React from 'react'
import { useFrame } from '@react-three/fiber';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { FollowCamera } from '@/app/components/Camera/FollowCamera'
import Player from '../Units/Player'
import useKeyboard from '@/app/hooks/useKeyboard';
import { useGame } from '@/app/context/game'


export function Camera() {
    //const { cameraContext } = useGame()
    //const { isFollowCameraEnabled, toggleFollowCamera, getFollowCameraTarget } = cameraContext
    const {
        isFollowCameraEnabled,
        toggleFollowCamera,
        getFollowCameraTarget
    } = useGame().cameraContext

    const keyPressed = useKeyboard();
    useFrame((_) => {
        //console.log('toggleFollowCamera', toggleFollowCamera)
        //const { toggleFollowCamera } = useGame().cameraContext
        if (keyPressed.current['v']) {
            const target = getFollowCameraTarget()
            //if (isEnabled) target.current = null
            console.log('v pressed => isEnabled', isFollowCameraEnabled)
            console.log('v pressed => target', target)
            toggleFollowCamera()
        }
    })

    return <>

    {/*
        <PerspectiveCamera>
        </PerspectiveCamera>
        */}
        <FollowCamera/>
        <Player />
        { isFollowCameraEnabled ? null : <OrbitControls /> }
         
    </>
}

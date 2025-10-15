'use client'
import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { IUnitRef } from '@/app/interfaces/Units';
import { useFollowCamera } from '@/app/hooks/useFollowCamera';
import { useGame } from '@/app/context/game'
import useKeyboard from '@/app/hooks/useKeyboard';

export function FollowCamera() {
    const { camera } = useThree();
     const {
        isFollowCameraEnabled,
        getFollowCameraTarget
    } = useGame().cameraContext
    
    const offset = new THREE.Vector3(10, 5, 10);

    useFrame((_) => {
        //console.log('FollowCamera')
        
        const target = getFollowCameraTarget()
        if (target.current && isFollowCameraEnabled) {
            //console.log('target', target.current)
            let position = target.current.translation()
            //console.log('target position', position)

            const unitPosition = new THREE.Vector3().copy(position)
            const desiredPosition = new THREE.Vector3()
                .copy(position)
                .add(offset);
            
            camera.position.x = desiredPosition.x;
            camera.position.y = desiredPosition.y;
            camera.position.z = desiredPosition.z;
            camera.lookAt(unitPosition);
        }   
    });

    return null;
}
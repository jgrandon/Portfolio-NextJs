import React, { useEffect, useRef, useState, RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import IKeyPressed from '@/app/interfaces/KeyPressed'
import IPosition from '@/app/interfaces/Position'
import { RapierRigidBody } from '@react-three/rapier'; // For Rapier
import useKeyboard from './useKeyboard';
import { useGame } from '../context/game';
import { useKeyboardControls } from "@react-three/drei";

export default function usePlayerMovement(
    ref: RefObject<RapierRigidBody>,
) : IPosition {

    const keyPressed = useKeyboard();
    const { unitsContext: {units} } = useGame()
    const [position, setPosition] = useState({
        x: 0, y: 0, z: 0
    })
    const [lastKeyboard, setLastKeyboard] = useState({})
    const characterRotationTarget = useRef(0);
    const rotationTarget = useRef(0);

    const [, get] = useKeyboardControls();

    const WALK_SPEED = 8
    const ROTATION_SPEED = 0
    const RUN_SPEED = 15
/*
    useFrame((_, delta) => {
        const speed = 5 * delta; // Adjust speed as needed

        if (ref.current) {
        //let { x, y ,z } = ref.current.translation()
        let [x, y, z] = [0,0,0]
        if (keyPressed.current['w']) z -= speed;
        if (keyPressed.current['s']) z += speed;
        if (keyPressed.current['a']) x -= speed;
        if (keyPressed.current['d']) x += speed;
        if (keyPressed.current[' ']) y += speed; // Spacebar for up
        if (keyPressed.current['Shift']) y -= speed; // Shift for down
        
        ref.current.applyImpulse({x,y,z}, true)

        if (keyPressed.current['w']
            || keyPressed.current['a']
            || keyPressed.current['s']
            || keyPressed.current['d']
        ) console.log('usePlayerMovement' ,{ x, y ,z },units)
        setPosition({
            x,y,z
        })
        } 
    });
    */

    useFrame(({ camera, mouse }) => {
        if (ref.current) {
        const vel = ref.current.linvel();

        const movement = {
            x: 0,
            z: 0,
        };
        // console.log('noKeyIsBeingPressed',get())

        const keyboard = get()
        if (Object.keys(keyboard).filter((value,key) => !value).length==0) {
            //no key is being pressed
            vel.x = 0
            vel.z = 0
            ref.current.setLinvel(vel, true);
            //setLastKeyboard(keyboard)
        }

        if (get().forward) {
            movement.z = 1;
        }
        if (get().backward) {
            movement.z = -1;
        }

        const player = units.current.find(u => u.ref.current == ref.current)
        let speed = (get().run ? RUN_SPEED : WALK_SPEED) * (player?.stats.speed ?? 1);
    /*
        if (isClicking.current) {
            console.log("clicking", mouse.x, mouse.y);
            if (Math.abs(mouse.x) > 0.1) {
            movement.x = -mouse.x;
            }
            movement.z = mouse.y + 0.4;
            if (Math.abs(movement.x) > 0.5 || Math.abs(movement.z) > 0.5) {
            speed = RUN_SPEED;
            }
        }
            */

        if (get().left) {
            movement.x = 1;
        }
        if (get().right) {
            movement.x = -1;
        }

        if (movement.x !== 0) {
            rotationTarget.current += ROTATION_SPEED * movement.x;
        }

        if (movement.x !== 0 || movement.z !== 0) {
            characterRotationTarget.current = Math.atan2(movement.x, movement.z);
            vel.x =
            Math.sin(rotationTarget.current + characterRotationTarget.current) *
            speed;
            vel.z =
            Math.cos(rotationTarget.current + characterRotationTarget.current) *
            speed;
            /*
            if (speed === RUN_SPEED) {
            setAnimation("run");
            } else {
            setAnimation("walk");
            }
            */
        } 
        /*else {
            setAnimation("idle");
        }
            */
        /*
        character.current.rotation.y = lerpAngle(
            character.current.rotation.y,
            characterRotationTarget.current,
            0.1
        );
        */
        //setLastKeyboard(keyboard)
        ref.current.setLinvel(vel, true);
    }
/*
    // CAMERA
    container.current.rotation.y = MathUtils.lerp(
      container.current.rotation.y,
      rotationTarget.current,
      0.1
    );

    cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, 0.1);

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);

      camera.lookAt(cameraLookAt.current);
    }
      */
  });

    return position;
}



import React, { useEffect, useRef, useState, RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import IKeyPressed from '@/app/interfaces/KeyPressed'
import useKeyboard from './useKeyboard';
import { useGame } from '@/app/context/game'
import { IUnit } from '@/app/interfaces/Units'

interface IPlayerControls {
    isTurning: boolean
}

export default function useAttack(player: IUnit) {
    const keyPressed = useKeyboard();
    const [playerControls, setPlayerControls] = useState<IPlayerControls>({
        isTurning: false
    })
    const [needsCoolDown, setNeedsCoolDown] = useState(false)

    const { units, removeUnit } = useGame ().unitsContext

    

    useFrame((_, delta) => {
        if (keyPressed.current['t']) {
            if (!needsCoolDown) {
                setNeedsCoolDown(true)
                const defenders = searchForDefenders()
                defenders.forEach(
                    d => attackUnit(d)
                )
            }
        }

            setPlayerControls({isTurning: false})
    });
/*
    TODO:
    - validar que todas las unidades esten recibiendo daño
    - eliminar el elemento de escena cuando se elimine del registro de unidades
    - determinar la zona en la que buscar unidades recibiendo daño
    - agregar efectos visuales al ataque
*/


    const searchForDefenders = () : IUnit[] => {
        const position = player.ref.current
        return units
    }

    const attackUnit = (reciever: IUnit) => {
        const { attack : damage } = player.stats
        reciever.stats.currentLp =- damage
        if (reciever.stats.currentLp <= 0) {
            reciever.stats.currentLp = 0
            removeUnit(reciever.id)
        }
    }

    return {attackUnit};
}
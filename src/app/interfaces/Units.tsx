import * as THREE from 'three'
import { RefObject } from 'react'
import { RapierRigidBody } from '@react-three/rapier';
import { NumberController } from 'three/examples/jsm/libs/lil-gui.module.min.js';

export type IUnitRef = RefObject<THREE.Mesh | RapierRigidBody>

export interface IUnit {
    id: string
    ref: IUnitRef
    stats: IUnitStats
}

export interface IUnitStats {
    maxLp: number
    currentLp: number
    attack: number
    deffense: number
}
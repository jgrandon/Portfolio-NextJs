import React, { useState } from 'react';
import {IUnit , IUnitRef, IUnitStats } from '@/app/interfaces/Units'
import { Return } from 'three/src/nodes/TSL.js';

const _DEFAULT_UNIT_STATS = {
    maxLp: 2,
    currentLp: 2,
    deffense: 0,
    attack: 1,
} as IUnitStats

export interface IUnitsContext {
  units: IUnit[]
  addUnit: (
    id: string,
    content: IUnitRef,
    stats?: IUnitStats
    ) => void
  removeUnit: (id: string) => void
}

export const DEFAULT_UNITS_CONTEXT = {
    units: [] as IUnit[],
    addUnit: (id: string, content: IUnitRef, stats?: IUnitStats) => {},
    removeUnit: (id: string) => {},
}

export const getUnitsContext = () => {
    const [units, setUnits] = useState<IUnit[]>([]);

    const addUnit = (
        id: string,
        ref: IUnitRef,
        stats?: IUnitStats
    ) : void  => {
      if (!units.find(u => u.id == id)) {
        setUnits(prev => [
          ...prev.filter(p => p.id != id),
          { id, ref, stats: stats ?? _DEFAULT_UNIT_STATS }
        ])
      }
    }

    const removeUnit = (id: string) => {
      setUnits(prev => [...prev.filter(u => u.id != id)])
    }
    return { units , addUnit, removeUnit }
};
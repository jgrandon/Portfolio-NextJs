import React, { useState, createContext, useContext, RefObject } from 'react';
import { RapierRigidBody } from '@react-three/rapier'; // For Rapier
import * as THREE from 'three'
import {IUnit , IUnitRef, IUnitStats } from '@/app/interfaces/Units'
import { Return } from 'three/src/nodes/TSL.js';

const _DEFAULT_UNIT_STATS = {
  maxLp: 2,
  currentLp: 2,
  deffense: 0,
  attack: 1,
} as IUnitStats
const UnitsContext = createContext({
  units: [] as IUnit[],
  addUnit: (id: string, content: IUnitRef, stats?: IUnitStats) => {},
  removeUnit: (id: string) => {}
});

export const UnitsProvider = (props: { children: React.ReactNode }) => {
  const [units, setUnits] = useState<IUnit[]>([]);

    const addUnit = (id: string, ref: IUnitRef, stats?: IUnitStats) : void  => {
      if (units.find(u => u.id == id)) Return
      setUnits(prev => [
        ...prev,
        { id, ref, stats: stats ?? _DEFAULT_UNIT_STATS }
      ])
    }

    const removeUnit = (id: string) => {
      setUnits(prev => [...prev.filter(u => u.id != id)])
    }

  return (
    <UnitsContext.Provider value={{ units , addUnit, removeUnit }}>
      {props.children}
    </UnitsContext.Provider>
  );
};

export const useUnits = ()  => useContext(UnitsContext);
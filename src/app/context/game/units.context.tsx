import React, { RefObject, useRef } from 'react';
import {IUnit , IUnitRef, IUnitStats } from '@/app/interfaces/Units'

const _DEFAULT_UNIT_STATS = {
    maxLp: 2,
    currentLp: 2,
    deffense: 0,
    attack: 1,
    speed: 1,
    size: 1
} as IUnitStats

export interface IUnitsContext {
  units: RefObject<IUnit[]>
  addUnit: (
    id: string,
    content: IUnitRef,
    stats?: IUnitStats
    ) => void
  removeUnit: (id: string) => void
  getUnitById: (id:string) => IUnit | undefined
  getUnitByRef: (ref:IUnitRef) => IUnit | undefined
}

export const DEFAULT_UNITS_CONTEXT = {
    units: [] as IUnit[],
    addUnit: (id: string, content: IUnitRef, stats?: IUnitStats) => {},
    removeUnit: (id: string) => {},
    getUnitById: (id:string) => ({} as IUnit),
    getUnitByRef: (ref:IUnitRef) => ({} as IUnit)
}

export const getUnitsContext = () => {
    const units = useRef<IUnit[]>([]);

    const addUnit = (
        id: string,
        ref: IUnitRef,
        stats?: IUnitStats
    ) : void  => {
      if (!units.current.find(u => u.id == id)) {
        units.current = [
          ...units.current,
          { id, ref, stats: stats ?? _DEFAULT_UNIT_STATS }
        ]
        /*
        setUnits(prev => [
          ...prev.filter(p => p.id != id),
          { id, ref, stats: stats ?? _DEFAULT_UNIT_STATS }
        ])
          */
      }
    }
    const getUnitById = (id:string) => units.current.find(u => u.id == id)
    const getUnitByRef = (ref:IUnitRef) => units.current.find(
      u => u.ref.current == ref.current
    )
    const removeUnit = (id: string) => {
      units.current = units.current.filter(u => u.id != id)
      //SsetUnits(prev => [...prev.filter(u => u.id != id)])
    }
    return { units , addUnit, removeUnit, getUnitById, getUnitByRef }
};
import React, { createContext, useContext } from 'react';
import {IUnit , IUnitRef, IUnitStats } from '@/app/interfaces/Units'
import { getUnitsContext, IUnitsContext } from '@/app/context/game/units.context'
import { getCameraContext, ICameraContext } from '@/app/context/game/camera.context'

const GameContext = createContext({
  unitsContext: {} as IUnitsContext,
  cameraContext: {} as ICameraContext
});

export const GameProvider = (props: { children: React.ReactNode }) => {
    const unitsContext = getUnitsContext()
    const cameraContext = getCameraContext()
  return (
    <GameContext.Provider value={{
      unitsContext,
      cameraContext
    }}>
      {props.children}
    </GameContext.Provider>
  );
};

export const useGame = ()  => useContext(GameContext);
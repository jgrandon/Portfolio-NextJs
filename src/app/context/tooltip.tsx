import React, { useState, createContext, useContext } from 'react';

interface iTooltip {
    id: string
    content: React.ReactNode
    //date: number

    //placement
    //delay 
}

const TooltipContext = createContext({
  activeTooltips: [] as iTooltip[],
  showTooltip: (id: string, content: React.ReactNode) => {},
  hideTooltip: (id: string) => {}
});

interface TooltipProviderProps {
    children: React.ReactNode 
}

interface useTooltipsReturn {
  activeTooltips: iTooltip[]
  showTooltip: (id: string, content: React.ReactNode) => void
  hideTooltip: (id: string) => void
}

export const TooltipProvider = ({ children }: TooltipProviderProps) => {
  const [activeTooltips, setActiveTooltips] = useState<iTooltip[]>([]); // Array of tooltip IDs
    const tooltips = activeTooltips as React.ReactNode


  const showTooltip = (id: string, content: React.ReactNode) => {
    setActiveTooltips(
      prev => prev.find(p => p.id === id) 
      ? [...prev]
      : [...prev, { id, content /*, date: Date.now()*/}]
    );
    setTimeout(() => {
      hideTooltip(id)
    }, 5000)
  };

  const hideTooltip = (id:string) => {
    setActiveTooltips(prev => prev.filter(tooltip => tooltip.id !== id));
  };


  return (
    <TooltipContext.Provider value={{ activeTooltips , showTooltip, hideTooltip }}>
      {children}
    </TooltipContext.Provider>
  );
};

export const useTooltips = () : useTooltipsReturn => useContext(TooltipContext);
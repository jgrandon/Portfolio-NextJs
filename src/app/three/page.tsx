'use client'
import { ThreeTest } from '@/app/components/ThreeTest';
import styles from '@/app/three/page.module.css'
import { Hud } from '@/app/components/HUD/HUD'

import { TooltipProvider } from '@/app/context/tooltip'

export default function Three() {
  return (
    <div className={styles.main}>
      <TooltipProvider>
        <Hud/>
        <ThreeTest />
      </TooltipProvider>
    </div>
  );
}
import styles from '@/app/components/HUD/HUD.module.css'
import { Canvas } from '@react-three/fiber'
import { useTooltips } from '@/app/context/tooltip'

interface HudProps {
  children: React.ReactNode;
}
export function Hud () {
  const {activeTooltips} = useTooltips()
  
    return <div className={styles.HUD}>
      {...activeTooltips.map(tooltip => tooltip.content)}
    </div>
}
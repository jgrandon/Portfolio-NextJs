import styles from '@/app/components/Menu/Menu.module.css'
import { Canvas } from '@react-three/fiber'

interface MenuProps {
  children: React.ReactNode;
  showBackdrop: boolean
}
export function Menu (props: MenuProps) {
    const {showBackdrop = true} = props
    return <div className={styles.main}>
        {showBackdrop
        ? <div className={styles.backdrop} />
        : null}
        
        <div className={styles.Menu}>
          <div className={styles.playerHeader}>
            Bienvenido Anastacio
          </div>
          {props.children}
        </div>
    </div>
}
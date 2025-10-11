'use client'
import React from 'react'
import styles from '@/app/components/HUD/Tooltip/Tooltip.module.css'
import { useTooltips } from '@/app/context/tooltip'

export function Tooltip (props: {
    closeTooltip?: string | null
    children: React.ReactNode
}) {
    const { hideTooltip } = useTooltips();
    const { closeTooltip = null } = props

    return (<div className={styles.tooltip}>
        {closeTooltip
            ? (<button className={styles.button}
            onClick={() => hideTooltip(closeTooltip)}
            > x </button>)
            : null}

        {props.children}
    </div>)
}
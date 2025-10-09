'use client'
import React from 'react'
import styles from '@/app/components/HUD/Tooltip/Tooltip.module.css'

export function Tooltip (props: {children: React.ReactNode}) {
    return (<div className={styles.tooltip}>
        {props.children}
    </div>)
}
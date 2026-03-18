'use client'
import React from 'react'
import styles from '@/app/components/HUD/BuffHUD/buffHUD.module.css'

export function BuffHUD (props: {
    message: string 
}) {
    return (<div className={styles.buffHUD}>
    {props.message}
    </div>)
}
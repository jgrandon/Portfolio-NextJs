import { extend } from '@react-three/fiber'
import { StaticCopyUsage } from "three"
import { useState, useRef } from 'react'
import { QuestStage } from '@/app/components/Quest/Stage'
//Simport { HUD } from '@/app/components/HUD'
//Sextend({ HUD })
type QuestStatus = 'pengind' | 'doing' | 'done'
/*
interface QuestStage {

}
*/
export function Quest (
    /* stages: QuestStage[] */
) {
    const [status, setStatus] = useState<QuestStatus>()
    //const currentStage = useRef<QuestStage>(undefined)

    return <QuestStage />
}
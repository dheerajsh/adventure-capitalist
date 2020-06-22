
import * as React from 'react'

export interface ITimerProps {
    readonly minutes?: number
    readonly seconds?: number
}


export const Timer = (props: ITimerProps) => {
    const { minutes, seconds } = props
    return (
        <div>
            {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    )
}

import React from 'react'
import {useStyle} from './hooks'
import withContext from './withContext'

interface BBLUProps {
    w : number, 
    h : number,
    scale : number, 
    onClick : Function 
}
const ButtonBiLineUp = (props : BBLUProps) => {
    const {w, h, scale, onClick} = props 
    const {lineStyle, parentStyle, squareStyle} = useStyle(w, h, scale)
    return (
        <React.Fragment>
            <div style = {parentStyle()}>
                {[0, 1].map((i : number) => (<div style = {lineStyle(i)}></div>))}
                <div style = {squareStyle()} onClick = {() => onClick()}></div>
            </div>
        </React.Fragment>
    )
}

export default withContext(ButtonBiLineUp)
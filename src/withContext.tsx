import React, { useState } from 'react'
import {useAnimatedScale, useDimension} from './hooks'

const withContext = (MC : React.FC<any>) : React.FC<any> => {
    return () => {
        const {w, h} = useDimension()
        const {scale, start : onClick} = useAnimatedScale()
        const props = { 
            scale, 
            w, 
            h, 
            onClick 
        }
        return (
            <MC {...props}></MC>
        )
    }
}

export default withContext 
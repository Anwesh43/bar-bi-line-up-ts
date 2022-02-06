import {CSSProperties, useEffect, useState} from 'react'

const scGap : number = 0.01 
const delay : number = 20 

export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((scale : number) => {
                        if (scale > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0 
                        }
                        return scale + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    })
    return {
        w, 
        h
    }
}

const maxScale = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)
const divideScale = (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 


export const useStyle = (w : number, h : number, scale : number) => {
    const position = 'absolute'
    const sc1 : number = divideScale(scale, 0, 2)
    const sc2 : number = divideScale(scale, 1, 2)
    const size : number = Math.min(w, h) / 10 
    const background = 'indigo'
    return {
        parentStyle() : CSSProperties {
            const left = `${w / 2}px`
            const top = `${h / 2 - (h / 2 - size / 2) * sc2}px`
            return {
                left, 
                top, 
                position 
            }
        },
        lineStyle(i : number) : CSSProperties {
            const left = `${-size / 2 + size * i}px`
            const top = `${size / 2}px`
            const width = `${Math.min(w, h) / 90}px`
            const height = `${size * sc1}px`
            return {
                position, 
                left, 
                width, 
                height, 
                top, 
                background 
            }
        },
        squareStyle() : CSSProperties {
            const left = `${-size / 2}px`
            const top = `${-size / 8}px`
            const width = `${size}px`
            const height = `${size / 4}px`
            return {
                position, 
                left, 
                top, 
                width, 
                height 
            }
        }
    }
}
import { CSSProperties } from 'react';
import randomColor from 'randomcolor';

export function randomEdgeStyle (): CSSProperties {
    return {
        stroke: randomColor(),
        fill: 'none'
    }
}

export function randomNodeStyle (): CSSProperties {
    return {
        stroke: randomColor(),
        fill: randomColor()
    };
}
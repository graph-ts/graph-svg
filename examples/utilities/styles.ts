import { CSSProperties } from 'react';
import randomColor from 'randomcolor';
import { pickRandom } from './random';

export function randomEdgeStyle (): CSSProperties {
    return {
        stroke: randomColor(),
        fill: 'none'
    }
}

export function randomLabelStyle (): CSSProperties {
    return {
        fill: randomColor(),
        fontWeight: pickRandom(['normal', 'bold']),
        fontStyle: pickRandom(['normal', 'italic']),
        cursor: 'pointer',
        textAnchor: 'middle',
        userSelect: 'none'
    }
}

export function randomNodeStyle (): CSSProperties {
    return {
        stroke: randomColor(),
        fill: randomColor()
    };
}
import { Vector2 } from '@graph-ts/vector2';
import { CSSProperties, FC } from 'react';
import { newGraph } from '@graph-ts/graph-lib';
import { ShapeDef } from '../src/components/types';
import GraphSVGDiv from '../src/GraphSVGDiv';

export const Example4: FC = () => {

    const g = newGraph<Vector2, {}>([
        { id: 'a', x: 100 * Math.cos(2 * Math.PI / 3), y: 100 * Math.sin(2 * Math.PI / 3) },
        { id: 'b', x: 100 * Math.cos(4 * Math.PI / 3), y: 100 * Math.sin(4 * Math.PI / 3) },
        { id: 'c', x: 100 * Math.cos(6 * Math.PI / 3), y: 100 * Math.sin(6 * Math.PI / 3) }
    ], [
        { id: 'ab', source: 'a', target: 'b' },
        { id: 'bc', source: 'b', target: 'c' },
        { id: 'ca', source: 'c', target: 'a' }
    ]);

    const defaultShape: ShapeDef = {
        shape: 'circle',
        radius: 10
    };

    const defaultStyle: CSSProperties = {
        stroke: 'none',
        fill: '#333'
    }

    return <GraphSVGDiv
        graph={g}
        defaultShape={defaultShape}
        defaultNodeStyle={defaultStyle}/>

}
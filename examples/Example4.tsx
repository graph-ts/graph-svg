import { Vector2 } from '@graph-ts/vector2';
import { CSSProperties, FC, useState } from 'react';
import { newGraph } from '@graph-ts/graph-lib';
import { Dict, LabelDef, ShapeDef } from '../src/components/types';
import GraphSVGDiv from '../src/GraphSVGDiv';
import { Button, ButtonBar } from './ui/ButtonBar';
import { randomEdgeLabels } from './utilities/labels';
import { randomNodeStyle } from './utilities/styles';

export const Example4: FC = () => {

    const [defaultStyle, setDefaultStyle] = useState<CSSProperties>(randomNodeStyle());
    const [edgeLabels, setEdgeLabels] = useState<Dict<LabelDef[]>>({});

    const g = newGraph<Vector2, {}>([
        { id: 'a', x: 100 * Math.cos(2 * Math.PI / 3), y: 100 * Math.sin(2 * Math.PI / 3) },
        { id: 'b', x: 100 * Math.cos(4 * Math.PI / 3), y: 100 * Math.sin(4 * Math.PI / 3) },
        { id: 'c', x: 100 * Math.cos(6 * Math.PI / 3), y: 100 * Math.sin(6 * Math.PI / 3) }
    ], [
        { id: 'ab', source: 'a', target: 'b' },
        { id: 'bc', source: 'b', target: 'c' },
        { id: 'ca', source: 'c', target: 'a' }
    ]);

    const randomDefaultStyle = () => {
        setDefaultStyle(randomNodeStyle());
    };

    const newRandomEdgeLabels = () => {
        setEdgeLabels(randomEdgeLabels(g, 3));
    }

    const defaultShape: ShapeDef = {
        shape: 'circle',
        radius: 10
    };

    return <>
        <ButtonBar>
            <Button onClick={randomDefaultStyle}>Random Default Style</Button>
            <Button onClick={newRandomEdgeLabels}>Random Edge Labels</Button>
        </ButtonBar>
        <GraphSVGDiv
            graph={g}
            defaultShape={defaultShape}
            defaultNodeStyle={defaultStyle}
            edgeLabels={edgeLabels}/>
    </>

}


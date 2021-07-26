import { CSSProperties, FC, useCallback, useState } from 'react';
import { addNode, Edge, newGraph, PositionedNode } from '@graph-ts/graph-lib';
import GraphSVGDiv from '../src/GraphSVGDiv';
import { Button, ButtonBar, ButtonBarContainer, Separator } from './ui/ButtonBar';

let id = 0;

function nextID () {
    return id++;
}

export const Example6: FC = () => {

    const [g, setGraph] = useState(newGraph<PositionedNode, Edge>());
    const [nodeStyles, setNodeStyles] = useState<{[key: string]: CSSProperties}>({});

    const noop = () => {
    };

    const onAddBlueCircle = useCallback(() => {
        const id = `${nextID()}`;
        setGraph(addNode(g, {
            id: id,
            x: 0,
            y: 0
        }));
        setNodeStyles({
            ...nodeStyles,
            [id]: {
                stroke: 'none',
                fill: 'steelblue'
            }
        })
    }, [g, setGraph, setNodeStyles, nodeStyles]);

    const onGraphDidUpdate = useCallback(graph => {
        setGraph(graph);
    }, [setGraph]);

    return <ButtonBarContainer vertical>
        <ButtonBar vertical>
            <Button onClick={onAddBlueCircle}>Add Blue Circle</Button>
            <Button onClick={noop}>Add Green Circle</Button>
            <Separator/>
            <Button onClick={noop}>Add Connections</Button>
            <Button onClick={noop}>Delete Connections</Button>
        </ButtonBar>
        <GraphSVGDiv
            graph={g}
            interactions={true}
            nodeStyles={nodeStyles}
            onGraphDidUpdate={onGraphDidUpdate}
        />
    </ButtonBarContainer>
}
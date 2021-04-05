import { addEdge, addNode, getEdges, getNodes, Graph, newGraph, offsetNodes, someEdge } from '@graph-ts/graph-lib';
import { Vector2 } from '@graph-ts/vector2';
import { CSSProperties, FC, useState } from 'react';
import { identity, Matrix } from 'transformation-matrix';
import { Dict } from '../src/components/types';
import GraphSVGDiv from '../src/GraphSVGDiv';
import { Button, ButtonBar, Separator } from './ui/ButtonBar';
import { randomEdgeStyle, randomNodeStyle } from './utilities/styles';

type PositionedGraph = Graph<Vector2>

export const Example3: FC = () => {

    const [g, setGraph] = useState<PositionedGraph>(newGraph());
    const [nextID, setNextID] = useState<string>('0');
    const [canAddEdge, setCanAddEdge] = useState<boolean>(false);

    const [nodeStyles, setNodeStyles] = useState<Dict<CSSProperties>>({});
    const [edgeStyles, setEdgeStyles] = useState<Dict<CSSProperties>>({});
    const [spread, setSpread] = useState<Matrix>();
    const [zoom, setZoom] = useState<Matrix>();
    const [interactions, setInteractions] = useState<boolean>(true);

    const addRandomNode = () => {
        setNextID(`${+nextID+1}`);
        setGraph(addNode(g, {
            id: nextID,
            x: -400 + Math.random() * 800,
            y: -400 + Math.random() * 800
        }));
        if (getNodes(g).length > 0)
            setCanAddEdge(true);
    }

    const addRandomEdge = () => {
        const nodes = getNodes(g);
        const edges = getEdges(g);
        const nn = nodes.length;
        const ne = edges.length;
        const maxEdges = nn * (nn - 1);
        if (nn > 1 && ne < maxEdges) {
            let attempt = 0, maxAttempts = 1000;
            while (attempt++ < maxAttempts) {
                const [first, second] = differentIndices(nodes.length);
                const source = nodes[first];
                const target = nodes[second];
                if (!someEdge(g, source.id, target.id)) {
                    setNextID(`${+nextID + 1}`);
                    setGraph(addEdge(g, {
                        id: nextID,
                        source: source.id,
                        target: target.id
                    }));
                    if (ne === maxEdges - 1)
                        setCanAddEdge(false);
                    break;
                }
            }
        }
    }

    const randomNodeStyles = () => {
        const styles: Dict<CSSProperties> = {};
        getNodes(g).forEach(node => {
            styles[node.id] = randomNodeStyle()
        });
        setNodeStyles(styles);
    }

    const randomEdgeStyles = () => {
        const styles: Dict<CSSProperties> = {};
        getEdges(g).forEach(edge => {
            styles[edge.id] = randomEdgeStyle()
        });
        setEdgeStyles(styles);
    }

    const resetSpread = () => {
        setSpread(identity());
    }

    const resetZoom = () => {
        setZoom(identity());
    }

    const onSelectionDidMove = (nodeIDs: string[], offset: Vector2) => {
        setGraph(offsetNodes(g, nodeIDs, offset));
    }

    const toggleInteraction = () => {
        setInteractions(!interactions);
    }

    return <>
        <ButtonBar>
            <Button onClick={addRandomNode}>Add Random Node</Button>
            <Button onClick={addRandomEdge} disabled={!canAddEdge}>Add Random Edge</Button>
            <Separator/>
            <Button onClick={randomNodeStyles}>Random Node Styles</Button>
            <Button onClick={randomEdgeStyles}>Random Edge Styles</Button>
            <Separator/>
            <Button onClick={resetSpread}>Reset Spread</Button>
            <Button onClick={resetZoom}>Reset Zoom</Button>
            <Button onClick={toggleInteraction}>{`${interactions ? 'Disable' : 'Enable'} Interaction`}</Button>
        </ButtonBar>
        <GraphSVGDiv
            graph={g}
            nodeStyles={nodeStyles}
            edgeStyles={edgeStyles}
            interactions={interactions}
            onSelectionDidMove={onSelectionDidMove}
            targetSpread={spread}
            targetZoom={zoom}/>
    </>

}

function differentIndices (n: number): [number, number] {
    if (n > 1) {
        const first = Math.floor(n * Math.random());
        let attempt = 0, maxAttempts = 1000, second = first;
        while (attempt++ < maxAttempts && second === first) {
            second = Math.floor(n * Math.random());
        }
        return [first, second];
    } else {
        throw Error('Not enough indices');
    }
}
import { Edge, getEdges, getNodes, Graph, newGraph, Node } from '@graph-ts/graph-lib';
import { Vector2 } from '@graph-ts/vector2';
import { FC } from 'react';
import { PositionedNode } from '../src';
import GraphSVGDiv from '../src/GraphSVGDiv';
import { basicLabels } from './utilities/labels';
import { rightCurves } from './utilities/paths';
// import { basicRectangles } from './utilities/shapes';

export const Example2: FC = () => {

    const g = makegraph();
    const nodes = getNodes(g);
    const edges = getEdges(g);

    // const nodeShapes = basicRectangles(nodes)
    const nodeLabels = basicLabels(nodes);
    const edgePaths = rightCurves(g, edges);
    const edgeLabels = basicLabels(edges);

    edgePaths['AB'].sourcePort = 'right';
    edgePaths['AB'].targetPort = 'left';
    edgePaths['BA'].sourcePort = 'left';
    edgePaths['BA'].targetPort = 'right';

    return <GraphSVGDiv
        graph={g}
        // nodeShapes={nodeShapes}
        interactions={true}
        nodeLabels={nodeLabels}
        edgePaths={edgePaths}
        edgeLabels={edgeLabels}
    />;

}

function makegraph (): Graph<PositionedNode> {
    const nodes: Node<Vector2>[] = [
        { id: 'A', x: -200, y: 0 },
        { id: 'B', x:  200, y: 0 }
    ];
    const edges: Edge[] = [
        { id: 'AB', source: 'A', target: 'B' },
        { id: 'BA', source: 'B', target: 'A' }
    ];
    return newGraph(nodes, edges);
}



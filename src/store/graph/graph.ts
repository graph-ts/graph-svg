import { Graph, newGraph } from '@graph-ts/graph-lib';
import { Vector2 } from '@graph-ts/vector2';
import { defaultTo, keys } from 'lodash-es';
import { identity, Matrix } from 'transformation-matrix';

export type GraphState = {

    graph: Graph<Vector2>

    nodeIDs: string[]
    edgeIDs: string[]

    spreadMatrix: Matrix
}

export const createGraphState = (graph?: Graph<Vector2>, selectedNodeIDs?: string[], selectedEdgeIDs?: string[]): GraphState => {

    const g = defaultTo(graph, newGraph());

    return {
        graph: g,
        nodeIDs: keys(g.nodes),
        edgeIDs: keys(g.edges),
        spreadMatrix: identity()
    }

}

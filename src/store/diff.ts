import { Edge, getEdges, getNodes, Graph, hasEdge, hasNode, Node } from '@graph-ts/graph-lib';

interface Diff<T> {
    add: { [key: string]: T }
    remove: string[]
}

interface GraphDiff {
    nodes: Diff<Node>
    edges: Diff<Edge>
}

export function calculateGraphDiff (previous: Graph, next: Graph): GraphDiff {

    return {
        nodes: calculateItemDiff<Node>(previous, next, getNodes, hasNode),
        edges: calculateItemDiff<Edge>(previous, next, getEdges, hasEdge)
    };

}

function calculateItemDiff<T extends (Node | Edge)> (
    previous: Graph, next: Graph,
    accessor: (graph: Graph) => T[],
    has: (graph: Graph, id: string) => boolean): Diff<T> {

    const diff: Diff<T> = {
        add: {},
        remove: []
    };

    accessor(next).forEach(item => {
        if (!has(previous, item.id))
            diff.add[item.id] = item;
    });

    accessor(previous).forEach(item => {
        if (!has(next, item.id))
            diff.remove.push(item.id);
    });

    return diff;

}
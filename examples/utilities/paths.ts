import { Edge, getNode, Graph } from '@graph-ts/graph-lib';
import { add, length, multiplyScalar, normal, perpendicular, subtract, Vector2 } from '@graph-ts/vector2';
import { compact, defaultTo } from 'lodash-es';
import { Dict, PathDef } from '../../src/components/types';

type PositionedGraph = Graph<Vector2>;

export function straightPaths (edges: Edge[]): Dict<PathDef> {

    // Create empty dictionary
    const pathDefs: Dict<PathDef> = {};

    // Create straight line def
    const lineDef: PathDef = {
        type: 'line'
    };

    // Loop through each edge and assign line def
    edges.forEach(edge => {
        pathDefs[edge.id] = lineDef;
    });

    // Return the dictionary of path defs
    return pathDefs;

}

export function rightCurves (graph: PositionedGraph, edges: Edge[], offset?: number): Dict<PathDef> {

    // Create empty dictionary
    const pathDefs: Dict<PathDef> = {};

    // Create function that calculated waypoint
    const waypoint = (edge: Edge): Vector2 | null => {

        // Get the source and target points
        const source = getNode(graph, edge.source);
        const target = getNode(graph, edge.target);

        // If both exist, calculate waypoints, otherwise return null
        if (source && target) {

            const diff = subtract(target, source);
            const dist = length(diff);
            const norm = normal(diff);
            const half = add(source, multiplyScalar(norm, 0.5 * dist));
            const perp = perpendicular(norm);
            return add(half, multiplyScalar(perp, defaultTo(offset, 75)));

        }
        return null;
    }

    edges.forEach(edge => {
        pathDefs[edge.id] = {
            type: 'bundle',
            waypoints: compact([waypoint(edge)])
        }
    });

    return pathDefs;

}
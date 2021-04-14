import { Edge, getEdges, getNode, Graph, Node } from '@graph-ts/graph-lib';
import {
    add,
    angle,
    distance,
    length,
    multiplyScalar,
    normal,
    perpendicular, rotate,
    subtract, translate,
    Vector2
} from '@graph-ts/vector2';
import { compact, defaultTo } from 'lodash-es';
import { Dict, PathDef } from '../../src/components/types';
import { pickRandom, randomNumber, randomPathType } from './random';

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

export function randomEdgePath (edge: Edge, source: Node<Vector2>, target: Node<Vector2>, maxWaypoints: number, maxDistFromCenter: number): PathDef {

    const waypoints: Vector2[] = [];
    const numWaypoints = Math.round(randomNumber(-0.5, maxWaypoints+0.5));
    const dd = 1 / (numWaypoints + 1);
    const ng = angle(subtract(target, source));
    const dist = distance(source, target);

    for (let n=0; n<numWaypoints; ++n) {
        const wp = translate(source, ng, (n+1)*dd*dist);
        const fuzz = translate(wp, ng, Math.random()*maxDistFromCenter);
        waypoints.push(rotate(fuzz, wp, pickRandom([-1, 1]) * Math.PI / 2));
    }

    return {
        type: randomPathType(),
        waypoints: waypoints
    }
}

export function randomEdgePaths (graph: Graph<Vector2, {}>, maxWaypoints: number, maxDistFromCenter: number): Dict<PathDef> {

    const pathDefs: Dict<PathDef> = {};

    getEdges(graph).forEach(edge => {
        const source = getNode(graph, edge.source);
        const target = getNode(graph, edge.target);
        if (source && target)
            pathDefs[edge.id] = randomEdgePath(edge, source, target, maxWaypoints, maxDistFromCenter)
    })

    return pathDefs;

}
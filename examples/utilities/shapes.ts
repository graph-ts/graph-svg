import { getNodes, Graph, Node } from '@graph-ts/graph-lib';
import { defaultTo } from 'lodash-es';
import { Dict, RectangleDef, ShapeDef } from '../../src/components/types';
import { pickRandom, randomNumber } from './random';

export function basicRectangles (nodes: Node[], width?: number, height?: number): Dict<ShapeDef> {

    // Initialize the dictionary
    const shapeDefs: Dict<ShapeDef> = {};

    // Create the rectangle definition
    const rect: RectangleDef = {
        shape: 'rectangle',
        width: defaultTo(width, 125),
        height: defaultTo(height, 75)
    };

    // Loop through each node and assign the rectangle
    nodes.forEach(node => {
        shapeDefs[node.id] = rect;
    });

    // Return the dictionary of shape defs
    return shapeDefs;

}

export function randomNodeShape (minsize: number, maxsize: number): ShapeDef {

    const shape = pickRandom(['circle', 'rectangle']);

    if (shape === 'circle') {
        return {
            shape,
            radius: randomNumber(minsize, maxsize)
        }
    }

    else {
        return {
            shape: 'rectangle',
            width: randomNumber(minsize, maxsize),
            height: randomNumber(minsize, maxsize)
        }
    }

}

export function randomNodeShapes (graph: Graph, minsize: number, maxsize: number): Dict<ShapeDef> {

    const shapeDefs: Dict<ShapeDef> = {};

    getNodes(graph).forEach(node => {
        shapeDefs[node.id] = randomNodeShape(minsize, maxsize)
    });

    return shapeDefs;

}
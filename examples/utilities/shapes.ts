import { Node } from '@graph-ts/graph-lib';
import { defaultTo } from 'lodash-es';
import { Dict, RectangleDef, ShapeDef } from '../../src/components/types';

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
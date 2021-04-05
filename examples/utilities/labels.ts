import { Edge, Node } from '@graph-ts/graph-lib';
import { CSSProperties } from 'react';
import { defaultTo } from 'lodash-es';
import { Dict, LabelDef } from '../../src/components/types';

/**
 * Create labels for every item in the provided list and return a dictionary
 * that can be passed as nodeLabels or edgeLabels to a Graph SVG component.
 * @param items The nodes or edges to create labels for.
 * @param labelStyle The style all labels will share. If omitted, a basic style will be used.
 */
export function basicLabels (items: (Node | Edge)[], labelStyle?: CSSProperties): Dict<LabelDef[]> {

    // Initialize the dictionary
    const labelDefs: Dict<LabelDef[]> = {};

    // Create the basic label style
    labelStyle = defaultTo(labelStyle, {
        fill: '#333',
        textAnchor: 'middle',
        userSelect: 'none',
        cursor: 'pointer'
    });

    // Create the basic label props
    const labelProps: React.SVGProps<SVGTextElement> = {
        dy: '0.33em'
    }

    // Loop through each node and create the basic label
    items.forEach(item => {
        labelDefs[item.id] = [{
            text: item.id,
            style: labelStyle,
            props: labelProps
        }];
    });

    // Return the dictionary of labels
    return labelDefs;

}
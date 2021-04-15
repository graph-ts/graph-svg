import { Edge, getEdges, Graph, Node } from '@graph-ts/graph-lib';
import { CSSProperties } from 'react';
import { defaultTo } from 'lodash-es';
import { Dict, EdgeLabelDef, EdgeLabelPosition, LabelDef } from '../../src/components/types';
import { pickRandom, randomNumber, randomString } from './random';
import { randomLabelStyle } from './styles';

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

export function randomEdgeLabel (edge: Edge, maxLines: number): EdgeLabelDef[] {

    const labelDefs: EdgeLabelDef[] = [];

    let line = Math.ceil(Math.random() * maxLines);
    while (line-- > 0) {
        labelDefs.push({
            text: randomString(5),
            style: randomLabelStyle(),
            position: randomEdgeLabelPosition()
        });
    }

    distributeLabels(labelDefs);

    return labelDefs;

}

export function randomEdgeLabels (graph: Graph, maxLines: number): Dict<EdgeLabelDef[]> {

    const labelDefs: Dict<LabelDef[]> = {};

    getEdges(graph).forEach(edge => {
        labelDefs[edge.id] = randomEdgeLabel(edge, maxLines);
    });

    return labelDefs

}

export function randomEdgeLabelPosition (): number | EdgeLabelPosition {
    const choice = pickRandom([0, 1]);
    if (choice === 0) return randomNumber(0, 1);
    return {
        from: pickRandom(['source', 'target']),
        distance: randomNumber(0, 100)
    }
}

function distributeLabels (labels: LabelDef[]) {

    const start = 0.33 - (labels.length-1) / 2;
    labels.forEach((label, i) => {
        if (!label.props) label.props = {};
        label.props.dy = `${start + i}em`
    });

}
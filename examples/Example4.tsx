import { Edge, newGraph, PositionedNode } from '@graph-ts/graph-lib';
import { CSSProperties, FC, useState } from 'react';
import { Dict, DynamicStyles, LabelDef, PathDef, ShapeDef } from '../src/components/types';
import { HoverUpdateCallback, SelectionUpdateCallback } from '../src/GraphGroupProps';
import GraphSVGDiv from '../src/GraphSVGDiv';
import { Button, ButtonBar, ButtonBarContainer, Separator } from './ui/ButtonBar';
import { randomEdgeLabels } from './utilities/labels';
import { randomEdgePaths } from './utilities/paths';
import { randomString } from './utilities/random';
import { randomNodeShapes } from './utilities/shapes';
import { randomNodeStyle } from './utilities/styles';

export const Example4: FC = () => {

    const [defaultStyle, setDefaultStyle] = useState<CSSProperties>(randomNodeStyle());
    const [edgeLabels, setEdgeLabels] = useState<Dict<LabelDef[]>>({});
    const [edgePaths, setEdgePaths] = useState<Dict<PathDef>>({});
    const [nodeShapes, setNodeShapes] = useState<Dict<ShapeDef>>({});
    const [waypointStyle, setWaypointStyle] = useState<DynamicStyles>({style: {}, hovered: {}, selected: {}});

    const [nodeHoverCallback, setNodeHoverCallback] = useState<HoverUpdateCallback>(() => {});
    const [edgeHoverCallback, setEdgeHoverCallback] = useState<HoverUpdateCallback>(() => {});
    const [selectionUpdateCallback, setSelectionUpdateCallback] = useState<SelectionUpdateCallback>(() => {});

    const d = 200;
    const g = newGraph<PositionedNode, Edge>([
        { id: 'a', x: d * Math.cos(2 * Math.PI / 3), y: d * Math.sin(2 * Math.PI / 3) },
        { id: 'b', x: d * Math.cos(4 * Math.PI / 3), y: d * Math.sin(4 * Math.PI / 3) },
        { id: 'c', x: d * Math.cos(6 * Math.PI / 3), y: d * Math.sin(6 * Math.PI / 3) }
    ], [
        { id: 'ab', source: 'a', target: 'b' },
        { id: 'bc', source: 'b', target: 'c' },
        { id: 'ca', source: 'c', target: 'a' }
    ]);

    const randomDefaultStyle = () => {
        setDefaultStyle(randomNodeStyle());
    };

    const newRandomEdgeLabels = () => {
        setEdgeLabels(randomEdgeLabels(g, 3));
    }

    const newRandomEdgePaths = () => {
        setEdgePaths(randomEdgePaths(g, 5, 50));
    }

    const newRandomNodeShapes = () => {
        setNodeShapes(randomNodeShapes(g, 25, 50));
    }

    const newRandomWaypointStyle = () => {
        setWaypointStyle({
            style: randomNodeStyle(),
            hovered: randomNodeStyle(),
            selected: randomNodeStyle()
        });
    }

    const newNodeHoverCallback = () => {
        const str = randomString(10);
        const cb = () => console.log(str);
        setNodeHoverCallback(() => cb);
    }

    const newEdgeHoverCallback = () => {
        const str = randomString(10);
        const cb = () => console.log(str);
        setEdgeHoverCallback(() => cb);
    }

    const newSelectionUpdateCallback = () => {
        const str = randomString(10);
        const cb = () => console.log(str);
        setSelectionUpdateCallback(() => cb);
    }

    const defaultShape: ShapeDef = {
        shape: 'circle',
        radius: 10
    };

    return <ButtonBarContainer vertical>
        <ButtonBar vertical>
            <Button onClick={randomDefaultStyle}>Random Default Style</Button>
            <Button onClick={newRandomEdgeLabels}>Random Edge Labels</Button>
            <Button onClick={newRandomEdgePaths}>Random Edge Paths</Button>
            <Button onClick={newRandomNodeShapes}>Random Node Shapes</Button>
            <Button onClick={newRandomWaypointStyle}>Random Waypoint Style</Button>
            <Separator/>
            <Button onClick={newNodeHoverCallback}>Random Node Hover CB</Button>
            <Button onClick={newEdgeHoverCallback}>Random Edge Hover CB</Button>
            <Button onClick={newSelectionUpdateCallback}>Random Selection Update CB</Button>
        </ButtonBar>
        <GraphSVGDiv
            graph={g}
            interactions={true}
            defaultShape={defaultShape}
            defaultNodeStyle={defaultStyle}
            edgeLabels={edgeLabels}
            edgePaths={edgePaths}
            nodeShapes={nodeShapes}
            waypointStyle={waypointStyle.style}
            waypointStyleHovered={waypointStyle.hovered}
            waypointStyleSelected={waypointStyle.selected}
            onEdgeHovered={edgeHoverCallback}
            onNodeHovered={nodeHoverCallback}
            onSelectionDidUpdate={selectionUpdateCallback}
        />
    </ButtonBarContainer>

}


import { Graph } from '@graph-ts/graph-lib';
import { Vector2 } from '@graph-ts/vector2';
import { CSSProperties } from 'react';
import { Matrix } from 'transformation-matrix';
import { Dict, EdgeLabelDef, LabelDef, PathDef, ShapeDef } from './components/types';

export interface GraphUpdateCallback {
    (graph: Graph<Vector2>): void
}

export interface HoverUpdateCallback {
    (id: string | null): void
}

export interface SelectionUpdateCallback {
    (nodeIDs: string[], edgeIDs: string[]): void
}

export interface GraphGroupProps {
    graph: Graph<Vector2>
    svg: SVGSVGElement
    defaultEdgeStyle?: CSSProperties
    defaultEdgeStyleHovered?: CSSProperties
    defaultEdgeStyleSelected?: CSSProperties
    defaultNodeStyle?: CSSProperties
    defaultNodeStyleHovered?: CSSProperties
    defaultNodeStyleSelected?: CSSProperties
    defaultPath?: PathDef
    defaultShape?: ShapeDef
    edgeLabels?: Dict<EdgeLabelDef[]>
    edgePaths?: Dict<PathDef>
    edgeStyles?: Dict<CSSProperties>
    edgeStylesHovered?: Dict<CSSProperties>
    edgeStylesSelected?: Dict<CSSProperties>
    interactions?: boolean
    nodeLabels?: Dict<LabelDef[]>
    nodeShapes?: Dict<ShapeDef>
    nodeStyles?: Dict<CSSProperties>
    nodeStylesHovered?: Dict<CSSProperties>
    nodeStylesSelected?: Dict<CSSProperties>
    onEdgeHovered?: HoverUpdateCallback
    onGraphDidUpdate?: GraphUpdateCallback
    onNodeHovered?: HoverUpdateCallback
    onSelectionDidUpdate?: SelectionUpdateCallback
    targetSpread?: Matrix
    targetZoom?: Matrix
    waypointStyle?: CSSProperties
    waypointStyleHovered?: CSSProperties
    waypointStyleSelected?: CSSProperties
    zoomScaleFactor?: number
}


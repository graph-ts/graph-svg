import { Graph } from '@graph-ts/graph-lib';
import { Vector2 } from '@graph-ts/vector2';
import { CSSProperties } from 'react';
import { Matrix } from 'transformation-matrix';
import { Dict, LabelDef, PathDef, ShapeDef } from './components/types';

export interface SelectionOffsetCallback {
    (nodeIDs: string[], offset: Vector2): void
}

export interface SelectionStatus {
    edgeIDs: string[]
    nodeIDs: string[]
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
    edgeLabels?: Dict<LabelDef[]>
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
    onEdgeHovered?: (edgeID: string | null) => void
    onNodeHovered?: (nodeID: string | null) => void
    onSelectionDidMove?: SelectionOffsetCallback
    onSelectionDidUpdate?: (selection: SelectionStatus) => void
    targetSpread?: Matrix
    targetZoom?: Matrix
    waypointStyle?: CSSProperties
    waypointStyleHovered?: CSSProperties
    waypointStyleSelected?: CSSProperties
}


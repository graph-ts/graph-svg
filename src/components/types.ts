import { Vector2 } from '@graph-ts/vector2';
import React, { CSSProperties } from 'react';

// General
export interface Dict<T> { [key: string]: T }


// Nodes
export interface BoundNodeID { nodeID: string }
export interface BoundNodeIDs { nodeIDs: string[] }


// Edges
export interface BoundEdgeID { edgeID: string }
export interface BoundEdgeIDs { edgeIDs: string[] }


// Waypoints
export interface BoundWaypointID { waypointID: string }


// Ports
export type PortDef = Vector2 & { id: string }
export type PortSet = Dict<PortDef>;


// Shapes
export type CircleDef = {
    shape: 'circle',
    radius: number | string
}
export type RectangleDef = {
    shape: 'rectangle',
    width: number | string
    height: number | string
};
export type ShapeDef = (CircleDef | RectangleDef) & {
    ports?: PortSet
};


// Paths
type BSplineDef =    { type: 'bspline' }
type BundleDef =     { type: 'bundle', beta?: number }
type CardinalDef =   { type: 'cardinal', tension?: number }
type CatmullRomDef = { type: 'catmullrom', alpha?: number }
type LineDef =       { type: 'line' }
type MonotoneXDef =  { type: 'monotonex' }
type MonotoneYDef =  { type: 'monotoney' }
type NaturalDef =    { type: 'natural' }
type StepDef =       { type: 'step' }
type StepAfterDef =  { type: 'stepafter' }
type StepBeforeDef = { type: 'stepbefore' }
type CurveDef =
    BSplineDef | BundleDef | CardinalDef |
    CatmullRomDef | LineDef | MonotoneXDef |
    MonotoneYDef | NaturalDef | StepDef |
    StepAfterDef | StepBeforeDef;
export type PathDef = CurveDef & {
    sourcePort?: string
    targetPort?: string
    waypoints?: Vector2[]
};
export type PathDefResolved = CurveDef & {
    points: Vector2[]
}


// Labels
export type LabelDef = {
    text: string
    props?: React.SVGProps<SVGTextElement>
    style?: CSSProperties
};


// Styles
export interface Styled { style: CSSProperties }
export interface DynamicStyles {
    style: CSSProperties
    hovered: CSSProperties
    selected: CSSProperties
}


// Mouse Events
export type BoundMouseEvent = { event: MouseEvent };
export type NodeMouseEvent = BoundNodeID & BoundMouseEvent;
export type EdgeMouseEvent = BoundEdgeID & BoundMouseEvent;
export type WaypointMouseEvent = BoundWaypointID & BoundMouseEvent;
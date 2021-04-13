import { Graph } from '@graph-ts/graph-lib';
import { Vector2 } from '@graph-ts/vector2';
import { GraphState } from './graph';

export const getGraph = (state: GraphState): Graph<Vector2> =>
    state.graph;

export const getEdge = (state: GraphState, edgeID: string) =>
    state.graph.edges[edgeID];
export const getEdgeIDs = (state: GraphState) =>
    state.edgeIDs;
export const getNode = (state: GraphState, nodeID: string) =>
    state.graph.nodes[nodeID];
export const getNodeIDs = (state: GraphState) =>
    state.nodeIDs;
export const getSpreadMatrix = (state: GraphState) =>
    state.spreadMatrix;

export const getEdgeSourceID = (state: GraphState, edgeID: string) =>
    getEdge(state, edgeID).source;
export const getEdgeTargetID = (state: GraphState, edgeID: string) =>
    getEdge(state, edgeID).target;
export const getEdgeSource = (state: GraphState, edgeID: string) =>
    getNode(state, getEdgeSourceID(state, edgeID));
export const getEdgeTarget = (state: GraphState, edgeID: string) =>
    getNode(state, getEdgeTargetID(state, edgeID));
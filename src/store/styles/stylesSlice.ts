import { getEdges, getNodes, Graph } from '@graph-ts/graph-lib';
import { Vector2 } from '@graph-ts/vector2';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultTo, keys } from 'lodash-es';
import * as defaults from '../../components/defaults';
import { DynamicStyles } from '../../components/types';
import { graphChanged } from '../graph/graphSlice';
import { SelectionUpdate } from '../selection/selection';
import {
    getHoveredEdgeID,
    getHoveredNodeID,
    getSelectedEdgeIDs,
    getSelectedNodeIDs
} from '../selection/selectionSelectors';
import { selectionChanged } from '../selection/selectionSlice';
import {
    createStylesState,
    DefaultStyleDefUpdate,
    resolveEdgeStyle,
    resolveNodeStyle,
    StyleDefUpdate,
    StylesState
} from './styles';

const initialState: StylesState = createStylesState();

const stylesSlice = createSlice({
    name: 'styles',
    initialState,
    reducers: {
        edgeStyleDefaultsChanged (state, action: PayloadAction<DefaultStyleDefUpdate>) {

            const { style, hovered, selected, selectionState } = action.payload;
            const edgeIDs = keys(state.edgeStyles);
            const hoveredEdgeID = getHoveredEdgeID(selectionState);
            const selectedEdgeIDs = new Set(getSelectedEdgeIDs(selectionState));

            state.edgeDefault.style = defaultTo(style, defaults.EDGE_STYLE);
            state.edgeDefault.hovered = defaultTo(hovered, defaults.EDGE_HOVER_STYLE);
            state.edgeDefault.selected = defaultTo(selected, defaults.EDGE_SELECTED_STYLE);
            edgeIDs.forEach(edgeID => {
                const selected = selectedEdgeIDs.has(edgeID);
                const hovered = edgeID === hoveredEdgeID;
                state.edgeStyles[edgeID] = resolveEdgeStyle(state, edgeID, hovered, selected);
            });

        },
        edgeStyleDefsChanged (state, action: PayloadAction<StyleDefUpdate>) {

            const { style, hovered, selected, selectionState } = action.payload;
            const edgeIDs = keys(state.edgeStyles);
            const hoveredEdgeID = getHoveredEdgeID(selectionState);
            const selectedEdgeIDs = new Set(getSelectedEdgeIDs(selectionState));

            state.edgeDefs.style = style;
            state.edgeDefs.hovered = hovered;
            state.edgeDefs.selected = selected;
            edgeIDs.forEach(edgeID => {
                const selected = selectedEdgeIDs.has(edgeID);
                const hovered = edgeID === hoveredEdgeID;
                state.edgeStyles[edgeID] = resolveEdgeStyle(state, edgeID, hovered, selected);
            });

        },
        nodeStyleDefaultsChanged (state, action: PayloadAction<DefaultStyleDefUpdate>) {

            const { style, hovered, selected, selectionState } = action.payload;
            const nodeIDs = keys(state.nodeStyles);
            const hoveredNodeID = getHoveredNodeID(selectionState);
            const selectedNodeIDs = new Set(getSelectedNodeIDs(selectionState));

            state.nodeDefault.style = defaultTo(style, defaults.NODE_STYLE);
            state.nodeDefault.hovered = defaultTo(hovered, defaults.NODE_HOVER_STYLE);
            state.nodeDefault.selected = defaultTo(selected, defaults.NODE_SELECTED_STYLE);
            nodeIDs.forEach(nodeID => {
                const selected = selectedNodeIDs.has(nodeID);
                const hovered = nodeID === hoveredNodeID;
                state.nodeStyles[nodeID] = resolveNodeStyle(state, nodeID, hovered, selected);
            });

        },
        nodeStyleDefsChanged (state, action: PayloadAction<StyleDefUpdate>) {

            const { style, hovered, selected, selectionState } = action.payload;
            const nodeIDs = keys(state.nodeStyles);
            const hoveredNodeID = getHoveredNodeID(selectionState);
            const selectedNodeIDs = new Set(getSelectedNodeIDs(selectionState));

            state.nodeDefs.style = style;
            state.nodeDefs.hovered = hovered;
            state.nodeDefs.selected = selected;
            nodeIDs.forEach(nodeID => {
                const selected = selectedNodeIDs.has(nodeID);
                const hovered = nodeID === hoveredNodeID;
                state.nodeStyles[nodeID] = resolveNodeStyle(state, nodeID, hovered, selected);
            });

        },
        waypointStyleChanged (state, action: PayloadAction<DynamicStyles>) {
            state.waypoint = action.payload;
        }
    },
    extraReducers: builder => {

        builder.addCase(graphChanged, (state: StylesState, action: PayloadAction<Graph<Vector2>>) => {

            const nodes = getNodes(action.payload);
            const edges = getEdges(action.payload);

            nodes.forEach(node => {
                if (!(node.id in state.nodeStyles))
                    state.nodeStyles[node.id] = resolveNodeStyle(state, node.id, false, false)
            });

            edges.forEach(edge => {
                if (!(edge.id in state.edgeStyles))
                    state.edgeStyles[edge.id] = resolveEdgeStyle(state, edge.id, false, false);
            });

        });

        builder.addCase(selectionChanged, (state: StylesState, action: PayloadAction<SelectionUpdate>) => {

            const { nodes, edges } = action.payload;

            if (nodes) {
                nodes.updatedIDs.forEach((nodeID, i) => {
                    const hovered = nodes.updatedHoverStates[i];
                    const selected = nodes.updatedSelectionStates[i];
                    state.nodeStyles[nodeID] = resolveNodeStyle(state, nodeID, hovered, selected);
                });
            }

            if (edges) {
                edges.updatedIDs.forEach((edgeID, i) => {
                    const hovered = edges.updatedHoverStates[i];
                    const selected = edges.updatedSelectionStates[i];
                    state.edgeStyles[edgeID] = resolveEdgeStyle(state, edgeID, hovered, selected);
                });
            }

        });

    }
});

export const {
    edgeStyleDefaultsChanged,
    edgeStyleDefsChanged,
    nodeStyleDefaultsChanged,
    nodeStyleDefsChanged,
    waypointStyleChanged
} = stylesSlice.actions;
export default stylesSlice.reducer;
import { Graph, offsetNodes } from '@graph-ts/graph-lib';
import { Vector2 } from '@graph-ts/vector2';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { keys } from 'lodash-es';
import { Matrix } from 'transformation-matrix';
import { createGraphState, GraphState } from './graph';

export type NodePositionUpdate = {
    nodeIDs: string[]
    offset: Vector2
}

const initialState: GraphState = createGraphState();

const graphSlice = createSlice({
    name: 'graph',
    initialState,
    reducers: {

        graphChanged (state, action: PayloadAction<Graph<Vector2>>) {
            state.graph = action.payload;
            state.nodeIDs = keys(state.graph.nodes);
            state.edgeIDs = keys(state.graph.edges);
        },

        nodesOffset (state, action: PayloadAction<NodePositionUpdate>) {
            const { nodeIDs, offset } = action.payload;
            state.graph = offsetNodes(state.graph, nodeIDs, offset);
        },

        spreadMatrixChanged (state, action: PayloadAction<Matrix>) {
            state.spreadMatrix = action.payload;
        }

    }

});

export const {
    graphChanged,
    nodesOffset,
    spreadMatrixChanged
} = graphSlice.actions;
export default graphSlice.reducer;

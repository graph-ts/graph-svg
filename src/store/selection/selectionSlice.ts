import { Vector2 } from '@graph-ts/vector2';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelectionState, SelectionState, SelectionUpdate } from './selection';

const initialState: SelectionState = createSelectionState();

const selectionSlice = createSlice({
    name: 'selection',
    initialState,
    reducers: {
        dragOffsetChanged (state, action: PayloadAction<Vector2>) {
            state.dragOffset = action.payload;
        },
        selectionChanged (state, action: PayloadAction<SelectionUpdate>) {
            const { nodes, edges, waypoints } = action.payload;
            if (nodes) {
                state.nodeIDs = nodes.selection;
                state.hoveredNodeID = nodes.hover;
            }
            if (edges) {
                state.edgeIDs = edges.selection;
                state.hoveredEdgeID = edges.hover;
            }
            if (waypoints) {
                state.waypointIDs = waypoints.selection;
                state.hoveredWaypointID = waypoints.hover;
            }
        }
    }
});

export const {
    dragOffsetChanged,
    selectionChanged
} = selectionSlice.actions;
export default selectionSlice.reducer;
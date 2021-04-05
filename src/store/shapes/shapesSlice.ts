import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShapeDef } from '../../components/types';
import { createShapesState, ShapesState } from './shapes';
import { defaultTo } from 'lodash-es';
import { NODE_SHAPE } from '../../components/defaults';

export interface ShapesUpdate {
    [nodeID: string]: ShapeDef
}

const initialState: ShapesState = createShapesState();

const shapesSlice = createSlice({
    name: 'shapes',
    initialState,
    reducers: {
        defaultShapeChanged (state, action: PayloadAction<ShapeDef | undefined>) {
            state.defaultShape = defaultTo(action.payload, NODE_SHAPE);
        }
    },
    extraReducers: builder => {

        // builder.addCase(propsUpdated, (state: ShapesState, action: PayloadAction<PropsDiff>) => {
        //
        //     const graphDiff = action.payload.graph;
        //
        //     // Assign the default shape to any node that doesn't have a shape
        //     keys(graphDiff.nodes.enter).forEach(nodeID => {
        //         state[nodeID] = defaults.NODE_SHAPE;
        //     })
        //
        // });

    }
});

export const {
    defaultShapeChanged
} = shapesSlice.actions;
export default shapesSlice.reducer;
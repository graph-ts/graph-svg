import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dict, ShapeDef } from '../../components/types';
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
        },
        shapesChanged (state, action: PayloadAction<Dict<ShapeDef>>) {
            state.byID = action.payload;
        }
    }
});

export const {
    defaultShapeChanged,
    shapesChanged
} = shapesSlice.actions;
export default shapesSlice.reducer;
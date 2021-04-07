import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { castDraft } from 'immer';
import { Dict, LabelDef } from '../../components/types';
import { createLabelsState, LabelsState } from './labels';

const initialState: LabelsState = createLabelsState();

const labelsSlice = createSlice({
    name: 'labels',
    initialState,
    reducers: {
        nodeLabelsChanged (state, action: PayloadAction<Dict<LabelDef[]>>) {
            state.nodeLabels = castDraft(action.payload);
        }
    }
});

export const {
    nodeLabelsChanged
} = labelsSlice.actions;
export default labelsSlice.reducer;
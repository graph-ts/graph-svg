import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { castDraft } from 'immer';
import { Dict, EdgeLabelDef, LabelDef } from '../../components/types';
import { createLabelsState, LabelsState } from './labels';

const initialState: LabelsState = createLabelsState();

const labelsSlice = createSlice({
    name: 'labels',
    initialState,
    reducers: {
        edgeLabelsChanged (state, action: PayloadAction<Dict<EdgeLabelDef[]>>) {
            state.edgeLabels = castDraft(action.payload);
        },
        nodeLabelsChanged (state, action: PayloadAction<Dict<LabelDef[]>>) {
            state.nodeLabels = castDraft(action.payload);
        }
    }
});

export const {
    edgeLabelsChanged,
    nodeLabelsChanged
} = labelsSlice.actions;
export default labelsSlice.reducer;
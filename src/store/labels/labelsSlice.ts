import { createSlice } from '@reduxjs/toolkit';
import { createLabelsState, LabelsState } from './labels';

const initialState: LabelsState = createLabelsState();

const labelsSlice = createSlice({
    name: 'labels',
    initialState,
    reducers: {}
});

export const {} = labelsSlice.actions;
export default labelsSlice.reducer;
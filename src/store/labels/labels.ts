import { defaultTo } from 'lodash-es';
import { Dict, LabelDef } from '../../components/types';

export interface LabelsState {
    nodeLabels: Dict<LabelDef[]>
    edgeLabels: Dict<LabelDef[]>
}

export const createLabelsState = (
    nodeLabels?: Dict<LabelDef[]>,
    edgeLabels?: Dict<LabelDef[]>
): LabelsState => {
    return {
        nodeLabels: defaultTo(nodeLabels, {}),
        edgeLabels: defaultTo(edgeLabels, {})
    };
}
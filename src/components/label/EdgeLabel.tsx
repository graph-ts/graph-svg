import { average } from '@graph-ts/vector2';
import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { getEdgeSourcePortResolved } from '../../selectors/getEdgeSourcePortResolved';
import { getEdgeTargetPortResolved } from '../../selectors/getEdgeTargetPortResolved';
import { getEdgeLabel, RootState } from '../../store/store';
import { BoundEdgeID } from '../types';
import Label from './Label';

const EdgeLabel: FC<BoundEdgeID> = props => {

    const { edgeID } = props;

    // Get the label definition
    const labelDefs = useSelector((state: RootState) => getEdgeLabel(state, edgeID));

    // Get the source and target ports
    const source = useSelector((state: RootState) => getEdgeSourcePortResolved(state, edgeID));
    const target = useSelector((state: RootState) => getEdgeTargetPortResolved(state, edgeID));

    // Render nothing if there's no label
    if (!labelDefs) return null;

    // For now we'll just render right in the middle of the path
    const position = average(source, target);

    return <>{
        labelDefs.map((def, i) =>
            <Label
                key={i}
                x={position.x}
                y={position.y}
                {...def}/>
        )
    }</>

}

export default memo(EdgeLabel);
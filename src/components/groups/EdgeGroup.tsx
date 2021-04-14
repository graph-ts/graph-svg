import classNames from 'classnames';
import React, { FC, memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mouseDownedEdge, mouseEnteredEdge, mouseLeftEdge } from '../../middleware/mouse/middleware';
import { getHoveredEdgeID, RootState } from '../../store/store';
import Path from '../path/Path';
import { BoundEdgeID } from '../types';
import WaypointsGroup from './WaypointsGroup';

export type EdgeGroupProps = BoundEdgeID;

const EdgeGroup: FC<EdgeGroupProps> = props => {

    /**
     * Ideas:
     *   * In here, create the function that calculates the label positions and
     *     pass that to the Path. Then in Path call the function from inside
     *     useLayoutEffect(). Inside that function is a call to setState for
     *     a variable here. That variable passed to labels as resolved positions.
     */

    const { edgeID } = props;

    const dispatch = useDispatch();

    const hovered = useSelector((state: RootState) => getHoveredEdgeID(state) === edgeID);

    const onMouseDown = useCallback((event: React.MouseEvent) => {
        dispatch(mouseDownedEdge({
            edgeID: edgeID,
            event: event.nativeEvent
        }));
    }, []);

    const onMouseEnter = useCallback((event: React.MouseEvent) => {
        dispatch(mouseEnteredEdge({
            edgeID: edgeID,
            event: event.nativeEvent
        }));
    }, []);

    const onMouseLeave = useCallback((event: React.MouseEvent) => {
        dispatch(mouseLeftEdge({
            edgeID: edgeID,
            event: event.nativeEvent
        }));
    }, []);

    const className = useMemo(() => classNames('edge', { hovered }), [hovered]);

    return <g id={edgeID}
              className={className}
              onMouseDown={onMouseDown}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}>
        <Path edgeID={edgeID}/>
        { hovered && <WaypointsGroup edgeID={edgeID}/> }
    </g>

}

export default memo(EdgeGroup);
import classNames from 'classnames';
import React, { FC, memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mouseDownedEdge, mouseEnteredEdge, mouseLeftEdge } from '../../middleware/mouse/middleware';
import { getHoveredEdgeID, RootState } from '../../store/store';
import EdgeLabel from '../label/EdgeLabel';
import Path from '../path/Path';
import { BoundEdgeID } from '../types';
import WaypointsGroup from './WaypointsGroup';

export type EdgeGroupProps = BoundEdgeID;

const EdgeGroup: FC<EdgeGroupProps> = props => {

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
        <WaypointsGroup edgeID={edgeID}/>
        <EdgeLabel edgeID={edgeID}/>
    </g>

}

export default memo(EdgeGroup);
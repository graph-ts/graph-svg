import { SelectionOffsetCallback } from '../../../GraphGroupProps';
import { nodesOffset } from '../../../store/graph/graphSlice';
import { waypointsOffset } from '../../../store/paths/pathsSlice';
import { dragOffsetChanged } from '../../../store/selection/selectionSlice';
import { AppDispatch, getSelectedNodeIDs, getSelectedWaypointIDs, RootState } from '../../../store/store';
import { DragDispatcher } from '../drag';
import { Gesture } from '../gesture';

/**
 * A mouse button has been released. Cancel any pending drag dispatches.
 */
const onMouseUppedHandler = (
    gesture: Gesture,
    dragDispatch: DragDispatcher,
    onSelectionDidMove?: SelectionOffsetCallback) => {

    let _onSelectionDidMove: SelectionOffsetCallback | undefined = onSelectionDidMove;
    const handler = (state: RootState, next: AppDispatch, event: MouseEvent) => {

        // Cancel any pending drag dispatches
        dragDispatch.cancel();

        if (gesture.isDragging()) {

            // End the drag
            const offset = gesture.dragEnd(event);

            // Reset the drag offset
            next(dragOffsetChanged({
                x: 0,
                y: 0
            }));

            // If managed, we let the user know what happened, otherwise we commit the drag offset
            if (_onSelectionDidMove) {

                const nodes = getSelectedNodeIDs(state);
                if (nodes.length && (offset.x !== 0 || offset.y !== 0))
                    _onSelectionDidMove(nodes, offset)

            } else {

                // Apply the drag offset to the selection
                next(nodesOffset({
                    nodeIDs: getSelectedNodeIDs(state),
                    offset: offset
                }));
                next(waypointsOffset({
                    waypointIDs: getSelectedWaypointIDs(state),
                    offset: offset
                }));

            }

        }

    };

    return Object.assign(
        handler,
        {
            setOnSelectionDidMove: (onSelectionDidMove?: SelectionOffsetCallback) => {
                _onSelectionDidMove = onSelectionDidMove;
            }
        }
    );

};

export default onMouseUppedHandler;
import { spreadMatrixChanged } from '../../../store/graph/graphSlice';
import { AppDispatch, RootState } from '../../../store/store';
import { Gesture } from '../gesture';
import { ZoomTransformSetter } from '../middleware';

/**
 * The mouse wheel has been wheeled. Check for zoom or spread.
 */
const onMouseWheeledHandler = (gesture: Gesture, setZoomTransform: ZoomTransformSetter) => {
    return (state: RootState, next: AppDispatch, event: WheelEvent) => {

        if (event.shiftKey) {

            // The spread matrix has to go to the store because it need to be applied to
            // nodes individually. So we update the spread matrix and dispatch an action.
            next(spreadMatrixChanged(gesture.spread(event)));

        } else {

            // The zoom matrix is applied to a single element (typically the top level
            // svg group) and so it's not sent to the store. Instead, we apply it
            // directly to an SVG element that has been explicitly supplied to the
            // mouse middleware.
            setZoomTransform(gesture.zoom(event));

        }

    }
};

export default onMouseWheeledHandler;
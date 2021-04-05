import { add, Vector2 } from '@graph-ts/vector2';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PathDef } from '../../components/types';
import { parseWaypointID } from '../../components/waypoint/waypointUtils';
import { createPathsState, PathsState } from './paths';
import { getWaypoints } from './pathsSelectors';
import { defaultTo } from 'lodash-es';
import { EDGE_PATH } from '../../components/defaults';

export type WaypointPositionUpdate = {
    waypointIDs: string[]
    offset: Vector2
}

const initialState: PathsState = createPathsState();

const pathsSlice = createSlice({
    name: 'paths',
    initialState,
    reducers: {

        defaultPathChanged (state, action: PayloadAction<PathDef | undefined>) {
            state.defaultPath = defaultTo(action.payload, EDGE_PATH);
        },

        waypointsOffset (state, action: PayloadAction<WaypointPositionUpdate>) {

            const { waypointIDs, offset } = action.payload;

            waypointIDs.forEach(waypointID => {
                const [edgeID, index] = parseWaypointID(waypointID);
                const waypoints = getWaypoints(state, edgeID);
                if (waypoints) {
                    const waypoint: Vector2 = waypoints[index];
                    if (waypoint) {
                        waypoints[index] = add(waypoint, offset);
                    }
                }
            })

        }

    }
});

export const {
    defaultPathChanged,
    waypointsOffset
} = pathsSlice.actions;
export default pathsSlice.reducer;
import { defaultTo, omit } from 'lodash-es';
import { FC, memo, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getResolvedPathPoints } from '../../selectors/getResolvedPathPoints';
import { getEdgeStyle, getPath, RootState } from '../../store/store';
import { arrowheadID } from '../defs/arrowheads/utilities';
import EdgeLabel from '../label/EdgeLabel';
import { BoundEdgeID } from '../types';
import { buildPathGenerator } from './pathUtils';

type PathProps = BoundEdgeID;

const Path: FC<PathProps> = props => {

    const { edgeID } = props;

    const [center, setCenter] = useState<DOMPoint>();

    const pathDef = useSelector((state: RootState) => getPath(state, edgeID));
    const style = useSelector((state: RootState) => getEdgeStyle(state, edgeID));
    const points = useSelector((state: RootState) => getResolvedPathPoints(state, edgeID));

    const hoverRef = useRef<SVGPathElement>(null);
    const renderRef = useRef<SVGPathElement>(null);

    const hoverStyle = useMemo(() => omit(style, 'stroke', 'strokeWidth'), [style]);
    const pathGenerator = useMemo(() => buildPathGenerator(pathDef), [pathDef]);
    const path = useMemo(() => defaultTo(pathGenerator(points), ''), [pathGenerator, points]);

    /**
     * There are two things that depend on the SVG Path API, specifically
     * the path.getPointAtLength() method:
     *   * The point along the path where rendering should *actually* stop to leave room for the arrowhead
     *   * The position of the label along the path
     */
    useLayoutEffect(() => {
        const hover = hoverRef.current;
        const render = renderRef.current;
        if (hover && render) {
            const length = hover.getTotalLength();
            const pt = hover.getPointAtLength(length - 10);
            render.setAttribute('d', defaultTo(
                pathGenerator([...points.slice(0, -1), pt]),
                ''
            ));

            const half = hover.getPointAtLength(length / 2);
            if (!center || (center.x !== half.x || center.y !== half.y)) {
                setCenter(half);
            }
        }
    })

    return <>
        <path
            ref={renderRef}
            style={style}
            markerEnd={`url(#${arrowheadID(style)})`}/>
        <path
            ref={hoverRef}
            d={path}
            style={hoverStyle}
            stroke={'transparent'}
            strokeWidth={11}/>
        <EdgeLabel center={center} edgeID={edgeID}/>
    </>

}

export default memo(Path);
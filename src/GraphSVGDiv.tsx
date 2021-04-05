import { FC, memo, useMemo, useRef } from 'react';
import GraphGroup from './GraphGroup';
import { GraphGroupProps } from './GraphGroupProps';
import useDimensions from './hooks/useDimensions';

export type GraphSVGDivProps = Omit<GraphGroupProps, 'svg'>;

const GraphSVGDiv: FC<GraphSVGDivProps> = props => {

    const divRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const dimensions = useDimensions(divRef);
    const width = useMemo(() => dimensions?.width, [dimensions]);
    const height = useMemo(() => dimensions?.height, [dimensions]);
    const viewBox = useMemo(() => {
        return width && height
            ? `${-width / 2} ${-height / 2} ${width} ${height}`
            : undefined;
    }, [width, height])

    return <div ref={divRef}
                style={{width: '100%', height: '100%'}}>
        <svg ref={svgRef}
             viewBox={viewBox}
             preserveAspectRatio={'xMidYMid slice'}>
            {
                svgRef.current && width && height &&
                    <GraphGroup
                        svg={svgRef.current}
                        {...props}/>
            }
        </svg>
    </div>

}

export default memo(GraphSVGDiv);
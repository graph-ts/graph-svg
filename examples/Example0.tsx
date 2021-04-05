import { Edge, getNodes, Graph, newGraph, Node } from '@graph-ts/graph-lib';
import { Vector2 } from '@graph-ts/vector2';
import React from 'react';
import { Dict, LabelDef } from '../src/components/types';
import GraphGroup from '../src/GraphGroup';

type PositionedGraph = Graph<Vector2>;

interface Example0State {
    graph: PositionedGraph
    nodeLabels: Dict<LabelDef[]>
    width: number
    height: number
}

class Example0 extends React.Component<any, Example0State> {

    private readonly ref: React.RefObject<SVGSVGElement>;

    constructor (props: any) {

        super(props);

        const graph: PositionedGraph = circleGraph(300, 10);
        const nodeLabels: Dict<LabelDef[]> = {};

        getNodes(graph).forEach(node => {
            nodeLabels[node.id] = [{ text: node.id }]
        });

        this.ref = React.createRef();

        this.state = {
            graph: graph,
            nodeLabels: nodeLabels,
            width: 0,
            height: 0
        }
    }

    componentDidMount () {

        this._resize();

    }

    render () {

        const graph = this.state.graph;
        const nodeLabels = this.state.nodeLabels;
        const w = this.state.width;
        const h = this.state.height;
        const ref = this.ref;

        return (
            <svg
                viewBox={`${-w / 2} ${-h / 2} ${w} ${h}`}
                preserveAspectRatio={'xMidYMid slice'}
                ref={ref}>
                {
                    ref.current &&
                    <GraphGroup
                        graph={graph}
                        svg={ref.current}
                        nodeLabels={nodeLabels}
                        interactions={true}
                        // nodeShape={nodeShape}
                        // shapeStyle={this._nodeStyle}
                        // edgePath={edgePath}
                        // onNodeHovered={(nodeID: string | null, styleUpdates) => {
                        //     this._hoveredNode = nodeID;
                        //     styleUpdates(getNodes(g).map(n => n.id));
                        // }}
                        // onSelectionDidMove={this._onSelectionDidMove}
                    />
                }
            </svg>
        )


    }

    private _resize = () => {

        const svg = this.ref.current;

        if (svg) {
            const style = getComputedStyle(svg);
            const width = parseInt(style.getPropertyValue('width'));
            const height = parseInt(style.getPropertyValue('height'));

            if (this.state.width !== width || this.state.height !== height) {
                this.setState({width, height});
            }

        }

    }

}

export { Example0 };

function circleGraph (radius: number, count: number): PositionedGraph {
    const nodes: Node<Vector2>[] = [{ id: '0', x: 0, y: 0}];
    const edges: Edge[] = [];
    let i = 0;
    while (i++ < count) {
        nodes.push({
            id: `${i}`,
            x: radius * Math.cos(i * 2 * Math.PI / count),
            y: radius * Math.sin(i * 2 * Math.PI / count)
        });
        edges.push({
            id: `0:${i}`,
            source: '0',
            target: `${i}`
        });
        if (i-1 > 0) {
            edges.push({
                id: `${i-1}:${i}`,
                source: `${i-1}`,
                target: `${i}`
            });
        }
        if (i === count) {
            edges.push({
                id: `${i}:1`,
                source: `${i}`,
                target: `1`
            });
        }
    }
    return newGraph(nodes, edges);
}
import { Edge, getEdges, getNodes, Graph, newGraph, Node } from '@graph-ts/graph-lib';
import { Vector2 } from '@graph-ts/vector2';
import React, { CSSProperties } from 'react';
import { Dict, LabelDef, PathDef } from '../src/components/types';
import GraphGroup from '../src/GraphGroup';

type AlloyGraph = Graph<AlloyNode, AlloyEdge>;
type AlloyNode = Node<Vector2 & { sig: string, label: string }>
type AlloyEdge = Edge<{ rel: string }>;

interface Example1State {
    graph: AlloyGraph
    width: number
    height: number
    edgeLabels: Dict<LabelDef[]>
    edgePaths: Dict<PathDef>
    nodeLabels: Dict<LabelDef[]>
    nodeStyles: Dict<CSSProperties>
    nodeStylesHovered: Dict<CSSProperties>
    nodeStylesSelected: Dict<CSSProperties>
}

export class Example1 extends React.Component<any, Example1State> {

    private readonly ref: React.RefObject<SVGSVGElement>;

    constructor (props: any) {

        super(props);

        this.ref = React.createRef();

        const g = fakeAlloyGraph();

        const edgeLabels: Dict<LabelDef[]> = {};
        const edgePaths: Dict<PathDef> = {};
        const nodeLabels: Dict<LabelDef[]> = {};
        const nodeStyles: Dict<CSSProperties> = {};
        const nodeStylesHovered: Dict<CSSProperties> = {};
        const nodeStylesSelected: Dict<CSSProperties> = {};

        const nodes = getNodes(g);
        const edges = getEdges(g);
        nodes.forEach(node => {
            nodeLabels[node.id] = [{
                text: node.label,
                style: {
                    fill: 'white',
                    fontFamily: 'monospace',
                    textAnchor: 'middle',
                    userSelect: 'none',
                    cursor: 'pointer'
                },
                props: {
                    dy: '-0.17em'
                }
            }, {
                text: `(${node.sig})`,
                style: {
                    fill: '#ddd',
                    fontFamily: 'monospace',
                    textAnchor: 'middle',
                    userSelect: 'none',
                    cursor: 'pointer',
                },
                props: {
                    dy: '0.83em'
                }
            }];
            nodeStyles[node.id] = {
                fill: node.label === 'Green' ? 'mediumseagreen' : 'steelblue'
            };
            nodeStylesHovered[node.id] = {
                stroke: 'lightsteelblue',
                strokeWidth: 3,
                cursor: 'pointer'
            };
            nodeStylesSelected[node.id] = {
                stroke: '#333',
                strokeWidth: 6
            }
        });
        edges.forEach(edge => {
            edgeLabels[edge.id] = [{
                text: edge.rel,
                style: {
                    fill: '#333',
                    fontFamily: 'monospace',
                    textAnchor: 'middle',
                    userSelect: 'none',
                    cursor: 'pointer'
                },
                props: {
                    dy: '0.33em'
                }
            }];
        });

        edgePaths['Ship->GreenTransponder'] = {
            type: 'natural',
            waypoints: [{x: -100, y: 0}]
        };

        this.state = {
            graph: fakeAlloyGraph(),
            width: 0,
            height: 0,
            edgeLabels: edgeLabels,
            edgePaths: edgePaths,
            nodeLabels: nodeLabels,
            nodeStyles: nodeStyles,
            nodeStylesHovered: nodeStylesHovered,
            nodeStylesSelected: nodeStylesSelected
        }
    }

    componentDidMount () {
        this._resize();
    }

    render () {
        const { graph, width, height } = this.state;
        const ref = this.ref;
        return (
            <svg
                viewBox={`${-width/2} ${-height/2} ${width} ${height}`}
                preserveAspectRatio={'xMidYMid slice'}
                style={{ userSelect: 'none' }}
                ref={ref}>
                {
                    ref.current &&
                    <GraphGroup
                        graph={graph}
                        svg={ref.current}
                        interactions={true}
                        edgeLabels={this.state.edgeLabels}
                        edgePaths={this.state.edgePaths}
                        nodeLabels={this.state.nodeLabels}
                        nodeStyles={this.state.nodeStyles}
                        nodeStylesHovered={this.state.nodeStylesHovered}
                        nodeStylesSelected={this.state.nodeStylesSelected}
                        onNodeHovered={this._onNodeHovered}
                        onEdgeHovered={this._onEdgeHovered}/>
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

    private _onNodeHovered = (nodeID: string | null) => {
        // console.log(nodeID);
        // const nodeStyles: { [id: string]: CSSProperties } = {};
        // getNodes(this.state.graph).forEach(node => {
        //     nodeStyles[node.id] = {
        //         fill: nodeID ? 'green' : 'steelblue'
        //     }
        // })
        // this.setState({
        //     nodeStyles
        // });
    }

    private _onEdgeHovered = (edgeID: string | null) => {
        // console.log(edgeID);
    }

}

function fakeAlloyGraph (): Graph<AlloyNode, AlloyEdge> {
    const nodes: AlloyNode[] = [
        { id: 'Ship', x: 0, y: -150, sig: 'Ship', label: 'Ship' },
        { id: 'GreenTransponder', x: -300, y: 150, sig: 'Transponder', label: 'Green' },
        { id: 'BlueTransponder', x: 0, y: 150, sig: 'Transponder', label: 'Blue' },
        { id: 'BlueStation', x: 300, y: 150, sig: 'Station', label: 'Blue' }
    ];
    const edges: AlloyEdge[] = [
        { id: 'Ship->GreenTransponder', source: 'Ship', target: 'GreenTransponder', rel: 'transponders' },
        { id: 'Ship->BlueTransponder', source: 'Ship', target: 'BlueTransponder', rel: 'transponders' },
        { id: 'Ship->BlueStation', source: 'Ship', target: 'BlueStation', rel: 'location' }
    ];
    return newGraph(nodes, edges);
}
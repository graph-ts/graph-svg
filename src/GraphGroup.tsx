import { configureStore, EnhancedStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Component, memo } from 'react';
import { Provider } from 'react-redux';
import { Defs } from './components/defs/Defs';
import EdgesGroup from './components/groups/EdgesGroup';
import NodesGroup from './components/groups/NodesGroup';
import { GraphGroupProps } from './GraphGroupProps';
import { Gesture } from './middleware/mouse/gesture';
import {
    mouseDowned,
    MouseMiddleware,
    mouseMiddleware,
    mouseMoved,
    mouseUpped,
    mouseWheeled,
    spreadTargetSet
} from './middleware/mouse/middleware';
import { createGraphState } from './store/graph/graph';
import graphReducer, { graphChanged } from './store/graph/graphSlice';
import { createLabelsState } from './store/labels/labels';
import labelsReducer from './store/labels/labelsSlice';
import { createPathsState } from './store/paths/paths';
import pathsReducer, { defaultPathChanged } from './store/paths/pathsSlice';
import { createSelectionState } from './store/selection/selection';
import selectionReducer from './store/selection/selectionSlice';
import { createShapesState } from './store/shapes/shapes';
import shapesReducer, { defaultShapeChanged } from './store/shapes/shapesSlice';
import { RootState } from './store/store';
import { createStylesState } from './store/styles/styles';
import stylesReducer, {
    edgeStyleDefaultsChanged,
    edgeStyleDefsChanged,
    nodeStyleDefaultsChanged,
    nodeStyleDefsChanged
} from './store/styles/stylesSlice';

class GraphGroup extends Component<GraphGroupProps> {

    private readonly store: EnhancedStore<RootState>;
    private readonly gesture: Gesture;
    private readonly mouse: MouseMiddleware;

    constructor (props: GraphGroupProps) {

        super(props);

        // @ts-ignore
        const isDev = process.env.NODE_ENV === 'development';

        this.gesture = new Gesture(props.svg, 1.035);
        this.mouse = mouseMiddleware(props, this.gesture);

        this.store = configureStore({
            reducer: {
                graph: graphReducer,
                labels: labelsReducer,
                paths: pathsReducer,
                selection: selectionReducer,
                shapes: shapesReducer,
                styles: stylesReducer
            },
            preloadedState: this._initializePreloadedState(props),
            middleware: [...getDefaultMiddleware({
                immutableCheck: isDev,
                serializableCheck: isDev
            }).prepend(this.mouse)],
            devTools: isDev
        });

    }

    componentDidMount () {

        this.props.svg.addEventListener('mousedown', this._onMouseDown);
        this.props.svg.addEventListener('mousemove', this._onMouseMove);
        this.props.svg.addEventListener('mouseup', this._onMouseUp);
        this.props.svg.addEventListener('wheel', this._onMouseWheel);

    }

    componentDidUpdate (prevProps: Readonly<GraphGroupProps>) {

        const prev = prevProps;
        const props = this.props;
        const state = this.store.getState();

        this._updateGraph(prev, props);

        this._updateCallbacks(prev, props);
        this._updateDefaultPath(prev, props);
        this._updateDefaultShape(prev, props);
        this._updateDefaultStyles(prev, props);
        this._updateEdgeStyles(prev, props, state);
        this._updateInteractionDisabled(prev, props);
        this._updateNodeStyles(prev, props, state);
        this._updateZoom(prev, props);

    }

    componentWillUnmount () {

        this.props.svg.removeEventListener('mousedown', this._onMouseDown);
        this.props.svg.removeEventListener('mousemove', this._onMouseMove);
        this.props.svg.removeEventListener('mouseup', this._onMouseUp);
        this.props.svg.removeEventListener('wheel', this._onMouseWheel);

    }

    render () {

        return <Provider store={this.store}>
            <g ref={this._setRef}>
                <Defs/>
                <EdgesGroup/>
                <NodesGroup/>
            </g>
        </Provider>

    }

    private _initializePreloadedState = (props: GraphGroupProps) => {
        const graph = createGraphState(props.graph);
        const labels = createLabelsState(props.nodeLabels, props.edgeLabels);
        const paths = createPathsState(props.edgePaths, props.defaultPath);
        const selection = createSelectionState();
        const shapes = createShapesState(props.nodeShapes, props.defaultShape);
        const styles = createStylesState(
            props.graph,
            props.nodeStyles,
            props.nodeStylesHovered,
            props.nodeStylesSelected,
            props.edgeStyles,
            props.edgeStylesHovered,
            props.edgeStylesSelected,
            {
                style: props.defaultNodeStyle,
                hovered: props.defaultNodeStyleHovered,
                selected: props.defaultNodeStyleSelected
            },
            {
                style: props.defaultEdgeStyle,
                hovered: props.defaultEdgeStyleHovered,
                selected: props.defaultEdgeStyleSelected
            }
        );
        return { graph, labels, paths, selection, shapes, styles };
    }

    private _onMouseDown = (event: MouseEvent) => {
        if (event.target === this.props.svg)
            this.store.dispatch(mouseDowned(event))
    }

    private _onMouseMove = (event: MouseEvent) => {
        this.store.dispatch(mouseMoved(event));
    }

    private _onMouseUp = (event: MouseEvent) => {
        this.store.dispatch(mouseUpped(event));
    }

    private _onMouseWheel = (event: WheelEvent) => {
        this.store.dispatch(mouseWheeled(event));
    }

    private _setRef = (element: SVGGElement) => {
        this.mouse.setZoomElement(element);
    }

    private _updateCallbacks = (prev: Readonly<GraphGroupProps>, props: GraphGroupProps) => {
        if (prev.onSelectionDidMove !== props.onSelectionDidMove)
            this.mouse.setOnSelectionDidMove(props.onSelectionDidMove);
    }

    private _updateDefaultPath = (prev: Readonly<GraphGroupProps>, props: GraphGroupProps) => {
        if (prev.defaultPath !== props.defaultPath)
            this.store.dispatch(defaultPathChanged(props.defaultPath));
    }

    private _updateDefaultShape = (prev: Readonly<GraphGroupProps>, props: GraphGroupProps) => {
        if (prev.defaultShape !== props.defaultShape)
            this.store.dispatch(defaultShapeChanged(props.defaultShape));
    }

    private _updateDefaultStyles = (prev: Readonly<GraphGroupProps>, props: GraphGroupProps) => {
        const node = prev.defaultNodeStyle !== props.defaultNodeStyle;
        const nodeHovered = prev.defaultNodeStyleHovered !== props.defaultNodeStyleHovered;
        const nodeSelected = prev.defaultNodeStyleSelected !== props.defaultNodeStyleSelected;
        const edge = prev.defaultEdgeStyle !== props.defaultEdgeStyle;
        const edgeHovered = prev.defaultEdgeStyleHovered !== props.defaultEdgeStyleHovered;
        const edgeSelected = prev.defaultEdgeStyleSelected !== props.defaultEdgeStyleSelected;
        if (node || nodeHovered || nodeSelected)
            this.store.dispatch(nodeStyleDefaultsChanged({
                style: props.defaultNodeStyleSelected,
                hovered: props.defaultNodeStyleHovered,
                selected: props.defaultNodeStyleSelected
            }));
        if (edge || edgeHovered || edgeSelected)
            this.store.dispatch(edgeStyleDefaultsChanged({
                style: props.defaultEdgeStyle,
                hovered: props.defaultEdgeStyleHovered,
                selected: props.defaultEdgeStyleSelected
            }));
    }

    private _updateEdgeStyles = (prev: Readonly<GraphGroupProps>, props: GraphGroupProps, state: RootState) => {

        // Determine if any of the three styling defs have changed
        const styles = prev.edgeStyles !== props.edgeStyles;
        const hovered = prev.edgeStylesHovered !== props.edgeStylesHovered;
        const selected = prev.edgeStylesSelected !== props.edgeStylesSelected;

        // If so, dispatch an event that will update edge styles
        if (styles || hovered || selected) {
            this.store.dispatch(edgeStyleDefsChanged({
                style: props.edgeStyles || {},
                hovered: props.edgeStylesHovered || {},
                selected: props.edgeStylesSelected || {},
                selectionState: state.selection
            }));
        }

    }

    private _updateInteractionDisabled = (prev: Readonly<GraphGroupProps>, props: GraphGroupProps) => {
        if (prev.interactions !== props.interactions)
            this.mouse.setInteractions(!!props.interactions);
    }

    private _updateGraph = (prev: Readonly<GraphGroupProps>, props: GraphGroupProps) => {
        if (prev.graph !== props.graph)
            this.store.dispatch(graphChanged(props.graph));
    }

    private _updateNodeStyles = (prev: Readonly<GraphGroupProps>, props: GraphGroupProps, state: RootState) => {

        // Determine if any of the three styling defs have changed
        const styles = prev.nodeStyles !== props.nodeStyles;
        const hovered = prev.nodeStylesHovered !== props.nodeStylesHovered;
        const selected = prev.nodeStylesSelected !== props.nodeStylesSelected;

        // If so, dispatch an event that will update node styles
        if (styles || hovered || selected) {
            this.store.dispatch(nodeStyleDefsChanged({
                style: props.nodeStyles || {},
                hovered: props.nodeStylesHovered || {},
                selected: props.nodeStylesSelected || {},
                selectionState: state.selection
            }));
        }

    }

    private _updateZoom = (prev: Readonly<GraphGroupProps>, props: GraphGroupProps) => {

        if (prev.targetZoom !== props.targetZoom)
            if (props.targetZoom) this.mouse.setZoom(props.targetZoom);
        if (prev.targetSpread !== props.targetSpread)
            if (props.targetSpread) this.store.dispatch(spreadTargetSet(props.targetSpread));

    }

}

export default memo(GraphGroup);
import { CSSProperties, FC, useCallback, useState } from 'react';
import { Edge, Graph, newGraph, PositionedNode, removeEdges } from '@graph-ts/graph-lib';
import GraphSVGDiv from '../src/GraphSVGDiv';

const style: CSSProperties = {
    width: '100%',
    height: '100%'
}

export const Example5: FC = () => {

    const [g, setGraph] = useState(initializeGraph());
    const [undoStack, setUndoStack] = useState<Graph<PositionedNode>[]>([]);
    const [redoStack, setRedoStack] = useState<Graph<PositionedNode>[]>([]);
    const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

    const onSelectionUpdate = useCallback((nodeIDs: string[], edgeIDs: string[]) => {
        if (edgeIDs.length) {
            const newgraph = removeEdges(g, edgeIDs);
            setUndoStack([...undoStack, g]);
            setRedoStack([]);
            setGraph(newgraph);
        } else {
            setSelectedNodes(nodeIDs);
        }
    }, [g, setGraph, undoStack, setUndoStack, redoStack, setRedoStack, setSelectedNodes, selectedNodes]);

    const undo = useCallback(() => {
        const newgraph = undoStack.pop();
        if (newgraph) {
            setRedoStack([...redoStack, g]);
            setUndoStack(undoStack);
            setGraph(newgraph);
        }
    }, [undoStack, setUndoStack, redoStack, setRedoStack, g, setGraph]);

    const redo = useCallback(() => {
        const newgraph = redoStack.pop();
        if (newgraph) {
            setUndoStack([...undoStack, g]);
            setRedoStack(redoStack);
            setGraph(newgraph);
        }
    }, [undoStack, setUndoStack, redoStack, setRedoStack, g, setGraph])

    return <div style={style}
                tabIndex={0}
                onKeyDown={event => {
                    if (event.ctrlKey && event.key === 'z') undo();
                    if (event.ctrlKey && event.key === 'y') redo();
                }}
    >
        <GraphSVGDiv
            graph={g}
            interactions={true}
            onGraphDidUpdate={setGraph}
            onSelectionDidUpdate={onSelectionUpdate}
        />
    </div>

}

function initializeGraph (): Graph<PositionedNode, Edge> {
    const d = 300;
    return newGraph<PositionedNode, Edge>([
        { id: 'a', x: d * Math.cos(2 * Math.PI / 3), y: d * Math.sin(2 * Math.PI / 3) },
        { id: 'b', x: d * Math.cos(4 * Math.PI / 3), y: d * Math.sin(4 * Math.PI / 3) },
        { id: 'c', x: d * Math.cos(6 * Math.PI / 3), y: d * Math.sin(6 * Math.PI / 3) }
    ], [
        { id: 'ab', source: 'a', target: 'b' },
        { id: 'bc', source: 'b', target: 'c' },
        { id: 'ca', source: 'c', target: 'a' }
    ]);
}
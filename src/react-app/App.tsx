import { useState, useCallback } from 'react';
import { 
	ReactFlow, 
	Background,
	Controls,
  Panel,
	applyNodeChanges, 
	applyEdgeChanges, 
	addEdge,
	// type Node,
	type Edge,
	type OnNodesChange,
	type OnEdgesChange,
	type OnConnect,
  type DefaultEdgeOptions,
 } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import ProteinNode, { type AppNode } from './ProteinNode';

const nodeTypes = {
  protein: ProteinNode,
};

// const NODE_COLORS = [
//   '#ee6055', // Vibrant Coral
//   '#60d394', // Emerald
//   '#aaf683', // Light Green
//   '#ffd97d', // Jasmine
//   '#ff9b85', // Salmon
// ]


const NODE_COLORS = [
  '#90f1ef', // Soft Cyan
  '#ffd6e0', // Petal Frost
  '#ffef9f', // Vanilla Custard
  '#c1fba4', // Light Green
  '#7bf1a8', // Light Green
]

let colIdx= 1;

const getRandomColor = () => {
  colIdx = (colIdx + 1) % NODE_COLORS.length;
  return NODE_COLORS[colIdx];
}

const initialNodes: AppNode[] = [
  { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Click to edit', onLabelChange: () => {}, color: getRandomColor() }, type: 'protein'},
  { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Species 2', onLabelChange: () => {}, color: getRandomColor() }, type: 'protein'},
];

let nextId= 2;

const initialEdges: Edge[] = [{ id: 'n1-n2', source: 'n1', target: 'n2' , animated: true}];
 
const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

export default function App() {
  const [nodes, setNodes] = useState<AppNode[]>(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
 
  const onNodesChange: OnNodesChange<AppNode> = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges<AppNode>(changes, nodesSnapshot)),
    [setNodes],
  );
  
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [setEdges],
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edgesSnapshot) => addEdge(connection, edgesSnapshot)),
    [setEdges],
  );

  const onLabelChange = useCallback(
    (id: string, value: string) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id
            ? {
                ...node,
                data: {
                  ...node.data,
                  label: value,
                }
            } : node
        )
      )
    },
    [setNodes]
  );

  const nodesWithCallbacks: AppNode[] = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onLabelChange,
    }
  }));

  const addNode = useCallback(() => {
    const newNode: AppNode = {
      id: String(nextId++),
      position: {
        x: Math.random() * 300,
        y: Math.random() * 300,
      },
      data: { label: 'Species ' + String(nextId), onLabelChange: () => {}, color: getRandomColor() },
      type: 'protein',
    };

    setNodes((currentNodes) => [...currentNodes, newNode]);
  }, [setNodes]);
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
		<ReactFlow<AppNode, Edge>
        nodes={nodesWithCallbacks}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        defaultEdgeOptions={defaultEdgeOptions}>
			<Background />
			<Controls />
			<Panel position="top-left"> 
        <button onClick={addNode}>Add New Node</button>
      </Panel>

      <Panel position="top-right"> 
        <button className="action-button">
          Simulate!
        </button>
      </Panel>

		</ReactFlow>
    </div>
  );
}
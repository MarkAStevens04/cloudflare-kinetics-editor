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
 
const initialNodes: AppNode[] = [
  { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Protein 1', number: 2 }, type: 'protein'},
  { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Protein 2'}, type: 'default'},
];
const initialEdges: Edge[] = [{ id: 'n1-n2', source: 'n1', target: 'n2' , animated: true}];
 
const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

let nextId= 3;

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
 
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
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

  const addNode = useCallback(() => {
    const newNode: AppNode = {
      id: String(nextId++),
      position: {
        x: Math.random() * 300,
        y: Math.random() * 300,
      },
      data: { label: `Node ${nextId - 1}`, number: 3},
      type: 'protein',
    };

    setNodes((currentNodes) => [...currentNodes, newNode]);
  }, [setNodes]);
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
		<ReactFlow
        nodes={nodes}
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
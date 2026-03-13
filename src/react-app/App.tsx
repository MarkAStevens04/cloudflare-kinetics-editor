import { useState, useCallback } from 'react';
import { 
	ReactFlow, 
	Background,
	Controls,
  Panel,
	applyNodeChanges, 
	applyEdgeChanges, 
	addEdge,
	type Node,
	type Edge,
	type OnNodesChange,
	type OnEdgesChange,
	type OnConnect,
  type DefaultEdgeOptions,
 } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import ProteinNode, { type ProteinNodeType } from 'ProteinNode';

const nodeTypes = {
  protein: ProteinNode,
};
 
const initialNodes: Node[] = [
  { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Protein 1' }, type: 'protein' },
  { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Protein 2' } },
];
const initialEdges: Edge[] = [{ id: 'n1-n2', source: 'n1', target: 'n2' , animated: true}];
 
const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

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
        <button>Add New Node</button>
        
      </Panel>

		</ReactFlow>
    </div>
  );
}
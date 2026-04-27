import { 
	ReactFlow, 
	Background,
	Controls,
  type DefaultEdgeOptions,
 } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Analytics
import { init as initFullStory } from '@fullstory/browser';
initFullStory({ orgId: 'o-24H0HZ-na1' });
import { FullStory } from '@fullstory/browser';
FullStory('trackEvent', {
  name: 'My Event',
  properties: {
    product: 'Sprockets',
    quantity: 1,
  },
})

// Initialize Protein and Reaction types
import ProteinNode, { type AppNode } from './ProteinNode';
import RxnEdge, { type AppEdge } from './RxnEdge';
import RxnDrawer from './Drawer';
import SimulationDrawer from './SimulationDrawer';
import FeedbackDrawer from './FeedbackDrawer';

// Stringify TODO: Move this to Drawer instead
// import { convertLatexToAsciiMath } from "mathlive";

import useStore from './store';
import { useShallow } from 'zustand/react/shallow';



const nodeTypes = {
  protein: ProteinNode,
};

const edgeTypes = {
  reaction: RxnEdge,
};


// Initialize set of possible colors for species nodes
// const NODE_COLORS = [
//   '#90f1ef', // Soft Cyan
//   '#ffd6e0', // Petal Frost
//   '#ffef9f', // Vanilla Custard
//   '#c1fba4', // Light Green
//   '#7bf1a8', // Light Green
// ]

// muted vibes
// const NODE_COLORS = [
//   '#d8e2dc',
//   '#ffe5d9', 
//   '#ffcad4',
// ]

// const NODE_COLORS = [
//   '#c1121f',
//   '#fdf0d5', 
//   '#003049', 
//   '#669bbc', 
//   '#780000', 
// ]

// const NODE_COLORS = [
//   '#ef476f', 
//   '#ffd166', 
//   '#06d6a0', 
//   '#118ab2',
// ]

// const NODE_COLORS = [
//   '#ffbe0b',
//   '#fb5607',
//   '#ff006e',
//   '#8338ec',
//   '#3a86ff',
// ]


// const NODE_COLORS = [
//   '#edede9',
//   '#d6ccc2',
//   '#f5ebe0',
//   '#e3d5ca',
//   '#d5bdaf',
// ]


// const NODE_COLORS = [
//   '#335C67',
//   '#FFF3B0',
//   '#E09F3E',
//   '#9E2A2B',
//   '#540B0E',
// ]


const NODE_COLORS = [
  '#4ECDC4',
  '#FF6B6B',
  '#FFE66D',
]



// Where we are in the color cycle
let colIdx= 1;

// Function to get the next color in the cycle when generating new node
const getRandomColor = () => {
  colIdx = (colIdx + 1) % NODE_COLORS.length;
  return NODE_COLORS[colIdx];
}

// ID for the next node to be added
let nextId= 3;


const defaultEdgeOptions: DefaultEdgeOptions = {
  type: 'reaction',
};


const selector = (state: ReturnType<typeof useStore.getState>) => ({
  visualNodes: state.visualNodes,
  visualEdges: state.visualEdges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});


export default function App() {

  const { visualNodes, visualEdges, onNodesChange, onEdgesChange, onConnect } = useStore(
    useShallow(selector),
  );

  // Convert number into letters for NodeIDs 
  const numberToLetters = (num: number) => {
    return String(num).split('').map((digit) => String.fromCharCode(97 + Number(digit))).join('');
  };

  // Function to add a Node (uses Zustand store)
  const addNode = useStore((store) => store.addNode);


  return (
    <div style={{ width: '100vw', height: '100vh' }} className="app">
        <>
        <ReactFlow<AppNode, AppEdge>
            nodes={visualNodes}
            edges={visualEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            // connectionMode={ConnectionMode.Loose}
            fitView
            defaultEdgeOptions={defaultEdgeOptions}>
          <Background />
          <Controls />
        </ReactFlow>
        </>

        <button 
          onClick={() => {
            const id = 'N' + numberToLetters(nextId++);
            const label = 'Species ' + String(nextId - 1);
            const color = getRandomColor();
            addNode(id, label, color, 'protein');
          }}
          style={{
            position: 'fixed', 
            top: 10, 
            left: 10
          }}>
            Add New Node
          </button>


        <FeedbackDrawer />

        <RxnDrawer />
        <SimulationDrawer />
        
      
    </div>
  );
}
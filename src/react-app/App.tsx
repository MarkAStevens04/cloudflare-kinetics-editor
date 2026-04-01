import { useState, useCallback } from 'react';
import { 
	ReactFlow, 
	Background,
	Controls,
  Panel,
	applyNodeChanges, 
	applyEdgeChanges, 
	addEdge,
  MarkerType,
	// type Node,
  // ConnectionMode,
	type OnNodesChange,
	type OnEdgesChange,
	type OnConnect,
  type DefaultEdgeOptions,
 } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
// import fakeGraph from './assets/fake_graph.png';

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

// Initialize Protein and Reacction types
import ProteinNode, { type AppNode } from './ProteinNode';
import RxnEdge, { type AppEdge } from './RxnEdge';
import RxnDrawer from './Drawer';

// Stringify
import { convertLatexToAsciiMath } from "mathlive";

const nodeTypes = {
  protein: ProteinNode,
};

const edgeTypes = {
  reaction: RxnEdge,
};

// Initialize set of possible colors for species nodes
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
  // { id: 'n0', position: { x: -500, y: -500 }, data: { label: 'DEFAULT NODE (ERROR)', onLabelChange: () => {}, color: '#ddd', initial: '' }, type: 'protein'},
  { id: 'Na', position: { x: 0, y: -0 }, data: { label: 'Click to edit', onLabelChange: () => {}, color: getRandomColor(), initial: '' }, type: 'protein'},
  { id: 'Nb', position: { x: 500, y: 100 }, data: { label: 'Species 2', onLabelChange: () => {}, color: getRandomColor(), initial: '' }, type: 'protein'},
];

let nextId= 3;

const initialEdges: AppEdge[] = [{ id: 'Na_Nb', source: 'Na', target: 'Nb' , markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, animated: true, type: 'reaction', data: { label: 'test2', toggleDrawer: () => {}, rate_law: ''}, }];
 
const defaultEdgeOptions: DefaultEdgeOptions = {
  type: 'reaction',
};


function cleanAsciiConversion(ascii: string) {
  // Reactions replaces all " with empty character! Quotes are added when Latex 'Text' is converted to a command, but we do NOT want this!
  // Reactions replaces all ^ with ** for exponentiation.
  
  console.log('Before cleaning: ', ascii);

  return ascii.replace(/"/g, '').replace(/\^/g, '**');
}


export default function App() {
  const [nodes, setNodes] = useState<AppNode[]>(initialNodes);
  const [edges, setEdges] = useState<AppEdge[]>(initialEdges);
  const [drawerToggle, setDrawerToggle] = useState(false);

  const [selectedRxnID, setSelectedRxnID] = useState<string>(initialEdges[0].id);

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const onNodesChange: OnNodesChange<AppNode> = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges<AppNode>(changes, nodesSnapshot)),
    [setNodes],
  );
  
  const onEdgesChange: OnEdgesChange<AppEdge> = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges<AppEdge>(changes, edgesSnapshot)),
    [setEdges],
  );
  // const onConnect: OnConnect = useCallback(
  //   (connection) => setEdges((edgesSnapshot) => addEdge(connection, edgesSnapshot)),
  //   [setEdges],
  // );

  const onDrawerToggle = useCallback((id: string) => {

    setSelectedRxnID(id);

    setDrawerToggle(!drawerToggle);

  }, [drawerToggle]);

  const selectedRxn = edges.find((edge) => edge.id === selectedRxnID) || edges[0];

  const onConnect: OnConnect = useCallback(
    (params) => 
      setEdges((eds) => 
        addEdge(
          {
            ...params,
            id: `${params.source}_${params.target}`,
            type: 'reaction',
            animated: true,
            markerEnd: { 
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20
             },
            data: { label: 't2', toggleDrawer: () => {}, rate_law: ''},
            
          },
          eds,
        ),
      ),
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


  const onRateLawChange = useCallback(
    (EID: string, rateLaw: string) => {

      setEdges((eds) =>
        eds.map((edge) => {

          // Make sure edge has data
          if (edge.id != EID) return edge;
          if (!edge.data) return edge;

          return {
                ...edge,
                data: {
                  ...edge.data,
                  rate_law: rateLaw
                }
            }
        })
      );


    },
    [setEdges]
  );

  const onInitialChange = useCallback(
    (currNode: AppNode, speciesInit: string, ) => {

      const rID = currNode.id;

      setNodes((nds) =>
        nds.map((node) =>
          node.id === rID
            ? {
                ...node,
                data: {
                  ...node.data,
                  initial: speciesInit,
                }
            } : node
        )
      );
    },
    [setNodes]
  );

  // update all nodes to have the correct callback
  const nodesWithCallbacks: AppNode[] = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onLabelChange: onLabelChange,
    }
  }));


  // update all edges to have the correct callback
  const edgesWithCallbacks: AppEdge[] = edges.map((edge) => {

    // Make sure edge has data
    if (!edge.data) return edge;

    return {
      ...edge,
      data: {
        ...edge.data,
        toggleDrawer: () => onDrawerToggle(edge.id)
      }
    }
  });


  const numberToLetters = (num: number) => {
    return String(num).split('').map((digit) => String.fromCharCode(97 + Number(digit))).join('');
  }



  const addNode = useCallback(() => {
    const newNode: AppNode = {
      id: 'N' + numberToLetters(nextId++),
      position: {
        x: Math.random() * 300,
        y: Math.random() * 300,
      },
      data: { label: 'Species ' + String(nextId - 1), onLabelChange: () => {}, color: getRandomColor(), initial: '' },
      type: 'protein',
    };

    setNodes((currentNodes) => [...currentNodes, newNode]);
  }, [setNodes]);


  const callSimulation = useCallback(async () => {

    const payload = {
      "Species": nodesWithCallbacks.map(({ id, data}) => ({'id': id, 'initial': Number(data.initial)})),
      "Reactions": edgesWithCallbacks.map(({ id, source, target, data}) => ({'id': id, 'Reactants': [source], 'Products': [target], 'rate_law': cleanAsciiConversion(convertLatexToAsciiMath(data?.rate_law || '')), 'Parameters': {'test1': 0.0}})),
      "Simulation": {"t_end": 300, "dt": 1, "method": "Euler"},
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    };

    console.log('Simulation started! Payload: ', payload);
    

    // fetch('https://kinetics-editor.vercel.app/api/simulate', requestOptions).then(response => response.json()).then(data => console.log('Simulation results: ', data));
  
    const response = await fetch('https://kinetics-editor.vercel.app/api/simulate', requestOptions);

    const blob = await response.blob();

    const imageUrl = URL.createObjectURL(blob);

    setImageSrc(imageUrl);

    console.log('Simulation Complete!');
    
  }, [nodesWithCallbacks, edgesWithCallbacks]);
 


  return (
    <div style={{ width: '100vw', height: '100vh' }} className="app">
        <>
        <ReactFlow<AppNode, AppEdge>
            nodes={nodesWithCallbacks}
            edges={edgesWithCallbacks}
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

          <Panel position="top-right"> 
            
          </Panel>
          

        </ReactFlow>
        
        
        </>

        <button onClick={addNode} style={{position: 'fixed', top: 10, left: 10}}>Add New Node</button>
        <RxnDrawer 
          edge={selectedRxn} 
          nodes={nodesWithCallbacks}

          open={drawerToggle} 
          // POSSIBLE ERROR!! When we store onDrawerToggle(selectedRxnId) if selectedRxnId changes, we'll save our rate law to the NEW reaction id!
          onToggle={() => onDrawerToggle(selectedRxnID)} 
          onRateLawChange={onRateLawChange}
          onInitialChange={onInitialChange}
        />
        
        {imageSrc && <img src={imageSrc} style={{position: 'fixed', bottom: 10, right: 10}} />}
        


        
        <button onClick={callSimulation} className="action-button" style={{position: 'fixed', top: 10, right: 10}}>SIMULATE</button>
        
      
    </div>
  );
}
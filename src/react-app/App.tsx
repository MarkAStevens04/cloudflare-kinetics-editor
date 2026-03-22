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
  { id: 'n1', position: { x: 0, y: -0 }, data: { label: 'Click to edit', onLabelChange: () => {}, color: getRandomColor(), initial: '' }, type: 'protein'},
  { id: 'n2', position: { x: 500, y: 100 }, data: { label: 'Species 2', onLabelChange: () => {}, color: getRandomColor(), initial: '' }, type: 'protein'},
];

let nextId= 3;

const initialEdges: AppEdge[] = [{ id: 'n1_n2', source: 'n1', target: 'n2' , markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, animated: true, type: 'reaction', data: { label: 'test2', toggleDrawer: () => {}, rate_law: '0'}, }];
 
const defaultEdgeOptions: DefaultEdgeOptions = {
  type: 'reaction',
};

export default function App() {
  const [nodes, setNodes] = useState<AppNode[]>(initialNodes);
  const [edges, setEdges] = useState<AppEdge[]>(initialEdges);
  const [drawerToggle, setDrawerToggle] = useState(false);

  const [selectedRxnId, setSelectedRxnId] = useState('none');
  const [currRateLaw, setCurrRateLaw] = useState('none');

  const [currReactantInit, setCurrReactantInit] = useState('');
  const [currProductInit, setCurrProductInit] = useState('');

  const [currReactantLabel, setCurrReactantLabel] = useState('');
  const [currProductLabel, setCurrProductLabel] = useState('');

  const [currReactantID, setCurrReactantID] = useState('');
  const [currProductID, setCurrProductID] = useState('');

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
    setSelectedRxnId(id);
    setCurrRateLaw(edges.find((edge) => edge.id === id)?.data?.rate_law || 'none');

    const currReactID = edges.find((edge) => edge.id === id)?.source || 'none';
    const currProductID = edges.find((edge) => edge.id === id)?.target || 'none';

    setCurrReactantInit(nodes.find((node) => node.id === currReactID)?.data.initial || '');
    setCurrProductInit(nodes.find((node) => node.id === currProductID)?.data.initial || '');

    setCurrReactantLabel(nodes.find((node) => node.id === currReactID)?.data.label || '');
    setCurrProductLabel(nodes.find((node) => node.id === currProductID)?.data.label || '');

    setCurrReactantID(currReactID);
    setCurrProductID(currProductID);

    setDrawerToggle(!drawerToggle);
  }, [drawerToggle, edges, nodes]);

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
            data: { label: 't2', toggleDrawer: () => {}, rate_law: '0'},
            
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
    (EID: string, rateLaw: string, reactantInit: string, productInit: string) => {
      setCurrRateLaw(rateLaw);

      setEdges((eds) =>
        eds.map((edge) => {

          // Make sure edge has data
          if (edge.id != EID) return edge;
          if (!edge.data) return edge;

          return {
                ...edge,
                data: {
                  ...edge.data,
                  rate_law: rateLaw,
                  reactantInit: reactantInit,
                  productInit: productInit,
                }
            }
        })
      );

    },
    [setEdges]
  );

  const onReactantChange = useCallback(
    (RID: string, reactantInit: string, ) => {
      setCurrReactantInit(reactantInit);

      setNodes((nds) =>
        nds.map((node) =>
          node.id === RID
            ? {
                ...node,
                data: {
                  ...node.data,
                  initial: reactantInit,
                }
            } : node
        )
      );
    },
    [setNodes]
  );


  const onProductChange = useCallback(
    (PID: string, productInit: string, ) => {
      setCurrProductInit(productInit);

      setNodes((nds) =>
        nds.map((node) =>
          node.id === PID
            ? {
                ...node,
                data: {
                  ...node.data,
                  initial: productInit,
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

  const addNode = useCallback(() => {
    const newNode: AppNode = {
      id: 'n' + String(nextId++),
      position: {
        x: Math.random() * 300,
        y: Math.random() * 300,
      },
      data: { label: 'Species ' + String(nextId - 1), onLabelChange: () => {}, color: getRandomColor(), initial: '' },
      type: 'protein',
    };

    setNodes((currentNodes) => [...currentNodes, newNode]);
  }, [setNodes]);


  const callSimulation = useCallback(() => {
    const payload = {
      "Species": nodesWithCallbacks.map(({ id, data}) => ({'id': id, 'initial': data.initial})),
      "Reactions": edgesWithCallbacks.map(({ id, source, target, data}) => ({'id': id, 'Reactants': [source], 'Products': [target], 'rate_law': data?.rate_law, })),
      "Simulation": {"t_end": 300, "dt": 1, "method": "Euler"},
    };
    console.log('Simulation started! Payload: ', payload);
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
        {drawerToggle && 
          <RxnDrawer 
          RxnID={selectedRxnId} 
          ReaID={currReactantID}
          ProID={currProductID}

          rateLaw={currRateLaw}
          reactantInit={currReactantInit}
          productInit={currProductInit}
          
          reactantLabel={currReactantLabel}
          productLabel={currProductLabel}

          open={drawerToggle} 
          // POSSIBLE ERROR!! When we store onDrawerToggle(selectedRxnId) if selectedRxnId changes, we'll save our rate law to the NEW reaction id!
          onClose={() => onDrawerToggle(selectedRxnId)} 
          onRateLawChange={onRateLawChange}
          onReactantChange={onReactantChange}
          onProductChange={onProductChange}
        />
        
        }
        
        


        <button onClick={addNode} style={{position: 'fixed', top: 10, left: 10}}>Add New Node</button>
        <button onClick={callSimulation} className="action-button" style={{position: 'fixed', top: 10, right: 10}}>SIMULATE</button>
        
      
    </div>
  );
}
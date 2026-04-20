import { create } from 'zustand';

import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  
} from '@xyflow/react';

import { convertLatexToAsciiMath } from "mathlive";

import { type AppNode } from './ProteinNode';
import { type AppEdge } from './RxnEdge';


type species = {
  id: string;
  label: string;
  initial: string;
  color: string;
}

type reactions = {
  id: string;
  label: string;
  sources: string[];
  targets: string[];
  rate_law: string;
}

const initialSpecies: species[] = [
  { id: 'Na', label: 'Click to edit', initial: '', color: '#90f1ef' },
  { id: 'Nb', label: 'Species 2', initial: '0', color: '#ffd6e0' },
];

const initialReactions: reactions[] = [
  { id: 'Na_Nb', label: 'test2', sources: ['Na'], targets: ['Nb'], rate_law: '' },
];

const initialNodes: AppNode[] = [
  { id: 'Na', position: { x: 0, y: -0 }, data: { label: 'Click to edit', color: '#90f1ef', initial: '' }, type: 'protein'},
  { id: 'Nb', position: { x: 500, y: 100 }, data: { label: 'Species 2', color: '#ffd6e0', initial: '' }, type: 'protein'},
];

const initialEdges: AppEdge[] = [{ id: 'Na_Nb', source: 'Na', target: 'Nb' , markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, animated: true, type: 'reaction', data: { label: 'test2', rate_law: ''}, }];



type AppState = {

  species: species[];
  reactions: reactions[];

  visualNodes: AppNode[];
  visualEdges: AppEdge[];

  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange<AppEdge>;
  onConnect: OnConnect;
  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: AppEdge[]) => void;

  addNode: (id: string, label: string, color: string) => void;

  selectedEdge: string | null;
  setSelectedEdge: (edgeId: string | null) => void;

  rxnDrawerOpen: boolean;
  setRxnDrawerOpen: (open: boolean) => void;

  simulationStatus: number; // 0 = not started, 1 = running, 2 = complete
  simulationData: Array<Record<string, number>>;
  fetchSimulationData: () => void;

  simDrawerOpen: boolean;
  setSimDrawerOpen: (open: boolean) => void;


  updateSpeciesLabel: (id: string, newLabel: string) => void;
  updateRateLaw: (id: string, newRateLaw: string) => void;
  updateInitialConcentration: (id: string, newInitial: string) => void;

  feedbackOpen: boolean;
  setFeedbackOpen: (open: boolean) => void;
  
};




const useStore = create<AppState>((set, get) => ({
    species: initialSpecies,
    reactions: initialReactions,

    visualNodes: initialNodes,
    visualEdges: initialEdges,

    // Default ReactFlow functions to update visualNode and visualEdge attributes
    onNodesChange: (changes) => {
      set({
        visualNodes: applyNodeChanges(changes, get().visualNodes),
      });
    },

    onEdgesChange: (changes) => {
      set({
        visualEdges: applyEdgeChanges(changes, get().visualEdges),
      });
    },

    setNodes: (nodes) => set({ visualNodes: nodes }),
    setEdges: (edges) => set({ visualEdges: edges }),


    // Function to add a new Node to both visualNodes AND to species!
    addNode: (id, label, color) => set((store) => ({
        species: [...store.species, { id: id, label: label, initial: '', color: color }],

        visualNodes: [...store.visualNodes, 
        {
          id: id, 
          position: { x: Math.random() * 300, y: Math.random() * 300 }, 
          data: { label: label, color: color, initial: ''}, 
          type: 'protein',
        }
      ],

    })),

    // Function to add a new Edge to both visualEdges AND to reactions!
    onConnect: (params) => {
      set((store) => ({
        
        reactions: [...store.reactions, { id: `${params.source}_${params.target}`, label: 't2', sources: [params.source], targets: [params.target], rate_law: '' }],

        visualEdges: addEdge(
          {...params, 
            id: `${params.source}_${params.target}`,
            type: 'reaction',
            animated: true,
            markerEnd: { 
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20
             },
            data: { label: 't2', rate_law: ''},
          },
          store.visualEdges
        ),

      }));
    },

    // Track which edge is currently selected (for opening the drawer)
    selectedEdge: null,
    setSelectedEdge: (edgeId) => set({ selectedEdge: edgeId }),

    rxnDrawerOpen: false,
    setRxnDrawerOpen: (open) => set({ rxnDrawerOpen: open }),

    updateSpeciesLabel: (id, newLabel) => set((store) => ({
      species: store.species.map((s) => s.id === id ? { ...s, label: newLabel } : s),

      visualNodes: store.visualNodes.map((n) => n.id === id ? { 
        ...n, 
        data: { 
          ...n.data, 
          label: newLabel, 
          color: n.data.color,
          initial: n.data.initial,
         } 
        } : n),

     })),

    updateRateLaw: (id, newRateLaw) => set((store) => ({
      reactions: store.reactions.map((r) => r.id === id ? { ...r, rate_law: newRateLaw } : r),

      visualEdges: store.visualEdges.map((e) => {

        if (e.id !== id) return e;
        if (!e.data) return e;

        return {
          ...e, 
          data: { 
            ...e.data, 
            rate_law: newRateLaw,
          }
        }
      }),

    })),

    updateInitialConcentration: (id, newInitial) => set((store) => ({
      species: store.species.map((s) => s.id === id ? { ...s, initial: newInitial } : s),

      visualNodes: store.visualNodes.map((n) => n.id === id ? { 
        ...n, 
        data: { 
          ...n.data, 
          label: n.data.label, 
          color: n.data.color,
          initial: newInitial,
         } 
        } : n),

     })),

     simDrawerOpen: false,
     setSimDrawerOpen: (open) => set({ simDrawerOpen: open }),

    simulationStatus: 0,
    simulationData: [],
    fetchSimulationData: async () => {

      set({simulationStatus: 1}); // Set status to "running"

      const payload = {
        "Species": get().species.map(({ id, initial}) => ({'id': id, 'initial': Number(initial)})),
        "Reactions": get().reactions.map(({ id, sources, targets, rate_law}) => ({'id': id, 'Reactants': sources, 'Products': targets, 'rate_law': cleanAsciiConversion(convertLatexToAsciiMath(rate_law || '')), 'Parameters': {'test1': 0.0}})),
        "Simulation": {"t_end": 300, "dt": 1, "method": "Euler"},
      };    

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      };

      console.log('Simulation started! Payload: ', payload);

      const response = await fetch('https://kinetics-editor.vercel.app/api/simulate/v02', requestOptions);

      const responseJson = await response.json();
      const payload_data = responseJson['data'];

      set({simulationStatus: 2}); // Set status to "complete"
      set({simulationData: payload_data}); // Store sim data

      console.log('Simulation results: ', payload_data);
      console.log('Simulation Complete!');
    },

    feedbackOpen: false,
    setFeedbackOpen: (open) => set({ feedbackOpen: open }),


}));


export default useStore;

function cleanAsciiConversion(ascii: string) {
  // Reactions replaces all " with empty character! Quotes are added when Latex 'Text' is converted to a command, but we do NOT want this!
  // Reactions replaces all ^ with ** for exponentiation.
  
  console.log('Before cleaning: ', ascii);

  return ascii.replace(/"/g, '').replace(/\^/g, '**');
}

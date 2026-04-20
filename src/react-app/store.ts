import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';

import { type AppNode } from './ProteinNode';
import { type AppEdge } from './RxnEdge';

import {
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  MarkerType,
} from '@xyflow/react';


type species = {
  id: string;
  label: string;
  initial: number;
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
  { id: 'Na', label: 'Click to edit', initial: 10, color: '#90f1ef' },
  { id: 'Nb', label: 'Species 2', initial: 0, color: '#ffd6e0' },
];

const initialReactions: reactions[] = [
  { id: 'Na_Nb', label: 'Reaction 1', sources: ['Na'], targets: ['Nb'], rate_law: '' },
];

const initialNodes: AppNode[] = [
  { id: 'Na', position: { x: 0, y: -0 }, data: { label: 'Click to edit', onLabelChange: () => {}, color: '#90f1ef', initial: '' }, type: 'protein'},
  { id: 'Nb', position: { x: 500, y: 100 }, data: { label: 'Species 2', onLabelChange: () => {}, color: '#ffd6e0', initial: '' }, type: 'protein'},
];

const initialEdges: AppEdge[] = [{ id: 'Na_Nb', source: 'Na', target: 'Nb' , markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, animated: true, type: 'reaction', data: { label: 'test2', toggleDrawer: () => {}, rate_law: ''}, }];



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

  updateSpeciesLabel: (id: string, newLabel: string) => void;
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
        species: [...store.species, { id: id, label: label, initial: 0, color: color }],

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

}));


  // const onLabelChange = useCallback(
  //   (id: string, value: string) => {
  //     setNodes((nds) =>
  //       nds.map((node) =>
  //         node.id === id
  //           ? {
  //               ...node,
  //               data: {
  //                 ...node.data,
  //                 label: value,
  //               }
  //           } : node
  //       )
  //     )
  //   },
  //   [setNodes]
  // );


export default useStore;


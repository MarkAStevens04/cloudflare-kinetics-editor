import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';

import { type AppNode } from './ProteinNode';
import { type AppEdge } from './RxnEdge';

import {
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from '@xyflow/react';


type species = {
  id: string;
  name: string;
  initial: number;
}

type reactions = {
  id: string;
  name: string;
  from: string[];
  to: string[];
}

const initialNodes: AppNode[] = [
  { id: 'Na', position: { x: 0, y: -0 }, data: { label: 'Click to edit', onLabelChange: () => {}, color: '#90f1ef', initial: '' }, type: 'protein'},
  { id: 'Nb', position: { x: 500, y: 100 }, data: { label: 'Species 2', onLabelChange: () => {}, color: '#ffd6e0', initial: '' }, type: 'protein'},
];

const initialEdges: AppEdge[] = [{ id: 'Na_Nb', source: 'Na', target: 'Nb' , animated: true, type: 'reaction', data: { label: 'test2', toggleDrawer: () => {}, rate_law: ''}, }];

const initialSpecies: species[] = [
  { id: 'Na', name: 'Click to edit', initial: 10 },
  { id: 'Nb', name: 'Species 2', initial: 0 },
];

const initialReactions: reactions[] = [
  { id: 'Na_Nb', name: 'Reaction 1', from: ['Na'], to: ['Nb'] },
];

type AppState = {
  visualNodes: AppNode[];
  visualEdges: AppEdge[];

  species: species[];
  reactions: reactions[];

  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange<AppEdge>;
  onConnect: OnConnect;
  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: AppEdge[]) => void;
};

const useStore = create<AppState>((set, get) => ({
    visualNodes: initialNodes,
    visualEdges: initialEdges,
    species: initialSpecies,
    reactions: initialReactions,

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

    onConnect: (connection) => {
      set({
        visualEdges: addEdge(connection, get().visualEdges),
      });
    },

    setNodes: (nodes) => set({ visualNodes: nodes }),
    setEdges: (edges) => set({ visualEdges: edges }),

    // addNode: (node) => set((state) => ({ visualNodes: [...state.visualNodes, node], logicalNodes: [...state.logicalNodes, node] })),
    // addEdge: (edge) => set((state) => ({ visualEdges: [...state.visualEdges, edge], logicalEdges: [...state.logicalEdges, edge] })),
}));

export default useStore;


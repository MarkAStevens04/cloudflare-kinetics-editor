import { create } from 'zustand';

import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type OnConnectEnd,
  type OnEdgesDelete,
  type OnNodesDelete,
  
} from '@xyflow/react';

import { convertLatexToAsciiMath } from "mathlive";

import { type AppNode } from '../components/ProteinNode';
// import { type AppEdge } from './RxnEdge';
import { 
  // MichaelisMentenEdge, 
  // ReversibleMassActionEdge, 
  // MassActionEdge,
  initializeMichaelisEdge,
  // type MichaelisEdgeType,
  // type RevMAEdgeType,
  // type MAEdgeType,
  type AppEdge,
} from '../components/edges'


type species = {
  id: string;
  label: string;
  initial: string;
  color: string;
  speciesType: string; // types: enzyme, molecule, custom, (future: DNA, RNA, DNA-Binding Protein, Complex, etc.)
}

// type reactions = {
//   id: string;
//   label: string;
//   sources: string[];
//   targets: string[];
//   rate_law: string;
//   rate_type: string; // types: mass_action
//   enzymeID: string;
//   associated_params: string[]; // List of param IDs which are associated with this reaction
// }

type reactions = {
  id: string;
  label: string;
  rate_law: string;
  rate_type: string; // types: mass_action, michaelis_menten, hill_equation, etc.
  associated_params: string[]; // List of param IDs which are associated with this reaction

  participants: {
    id: string;
    role: string; // 'reactant' | 'product' | 'catalyst'
    coefficient: number;
  }[];

}

type errorMSG = {
  message: string;
  full_detail?: string;
  linked_nodes?: string[];
  linked_edges?: string[];
}


type params = {
  id: string;
  display: string;
  val: string;
}

const initialSpecies: species[] = [
  { id: 'Na', label: 'Click to edit', initial: '1', color: '#4ECDC4', speciesType: 'molecule' },
  { id: 'Nb', label: 'Species 2', initial: '0', color: '#8280FF', speciesType: 'molecule' },
];

const initialReactions: reactions[] = [
  { id: 'Na_Nb', label: 'Change me!', rate_law: '(\\objNa{\\text{Na}})\\cdot0.1', rate_type: 'mass_action', associated_params: [], participants: [{ id: 'Na', role: 'reactant', coefficient: 1 }, { id: 'Nb', role: 'product', coefficient: 1 }] }
];

const initialSimParams: params[] = [
  {
    id: 'Pa',
    display: 'firstP',
    val: '100',
  }
];

const initialNodes: AppNode[] = [
  { id: 'Na', position: { x: 0, y: -0 }, data: { label: 'Click to edit', color: '#4ECDC4', initial: '1', speciesType: 'molecule' }, type: 'protein'},
  { id: 'Nb', position: { x: 500, y: 100 }, data: { label: 'Species 2', color: '#8280FF', initial: '', speciesType: 'molecule' }, type: 'protein'},
];

const initialEdges: AppEdge[] = [{ id: 'Na_Nb', source: 'Na', target: 'Nb' , markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, animated: true, type: 'mass_action', data: { label: 'Change me!', rate_law: '(\\objNa{\\text{Na}})\\cdot0.1', rate_type: 'mass_action'}, }];



type AppState = {

  species: species[];
  reactions: reactions[];
  simParams: params[];

  nextPID: number; // the next parameter id

  visualNodes: AppNode[];
  visualEdges: AppEdge[];

  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange<AppEdge>;
  onConnect: OnConnect;
  onConnectEnd: OnConnectEnd;
  onEdgesDelete: OnEdgesDelete;
  onNodesDelete: OnNodesDelete;

  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: AppEdge[]) => void;

  addNode: (id: string, label: string, color: string, speciesType: string, position: { x: number, y: number }) => void;

  selectedEdge: string | null;
  setSelectedEdge: (edgeId: string | null) => void;

  rxnDrawerOpen: boolean;
  setRxnDrawerOpen: (open: boolean) => void;

  showCsvDownloadButton: boolean;
  setShowCsvDownloadButton: (open: boolean) => void;

  simulationStatus: number; // 0 = not started, 1 = running, 2 = complete, 3 = error
  simulationData: Array<Record<string, number>>;
  fetchSimulationData: () => void;

  simDrawerOpen: boolean;
  setSimDrawerOpen: (open: boolean) => void;

  updateSpeciesLabel: (id: string, newLabel: string) => void;
  updateRateLaw: (id: string, newRateLaw: string) => void;
  updateEdgeType: (id: string, newEdgeType: string) => void;
  updateInitialConcentration: (id: string, newInitial: string) => void;
  updateColor: (id: string, newColor: string) => void;
  updateRateName: (id: string, newName: string) => void;
  addSimParam: (paramName: string, paramVal: string) => string;
  associateParam: (paramID: string, rxnID: string) => void;
  updateParamValue: (paramID: string, newValue: string) => void;

  getCoefficient: (reactantID: string, reactionID: string) => number;
  changeCoefficient: (reactantID: string, newCoefficient: number, reactionID: string) => void;

  tempParamName: string; // For storring parameter name and value when creating a new parameter in drawer.
  tempParamValue: string;
  setTempParamName: (name: string) => void;
  setTempParamValue: (value: string) => void;

  feedbackOpen: boolean;
  setFeedbackOpen: (open: boolean) => void;

  edgeHovering: boolean; // Whether we're currently hovering over an edge or not
  edgeHoverID: string; // id of edge we're hoving over (if any)
  setEdgeHovering: (open: boolean) => void;
  setEdgeHoverID: (id: string) => void;

  errorOpen: boolean;
  errorDuration: number;
  setErrorOpen: (open: boolean) => void;
  errorReasons: errorMSG[];
  addErrorReason: (message: string, fullDetail?: string, linkedNodes?: string[], linkedEdges?: string[]) => void;
  clearErrorReasons: () => void; // Remove all error reasons

  focusedTarget: {id: string, type: 'node' | 'edge'} | null; // Currently focused target. Really only used when fixing invalid rxns.
  setFocusedTarget: (target: {id: string, type: 'node' | 'edge'} | null) => void; 
  focusEdge: (edgeID: string) => void; // Focuses on a given edge!
  focusNode: (nodeID: string) => void; // Focuses on a given node!

};






const useStore = create<AppState>((set, get) => ({

    // Add Initial Variables
    tempParamName: '', 
    tempParamValue: '',

    focusedTarget: null,
    setFocusedTarget: (target) => set({ focusedTarget: target }),

    species: initialSpecies,
    reactions: initialReactions,

    visualNodes: initialNodes,
    visualEdges: initialEdges,

    simParams: initialSimParams,
    nextPID: initialSimParams.length,
    
    errorOpen: false,
    errorDuration: 5000, // 5 seconds
    setErrorOpen: (open) => {
      if (!open) get().clearErrorReasons();
      set({ errorOpen: open });
    },
    errorReasons: [],
    clearErrorReasons: () => set({ errorReasons: [], errorDuration: 5000, }),

    addErrorReason: (message: string, fullDetail?: string, linkedNodes?: string[], linkedEdges?: string[]) => set((store) => {
      // Add another second to the error duration on each reason we add.
      return { errorReasons: [...store.errorReasons, { message, full_detail: fullDetail, linked_nodes: linkedNodes, linked_edges: linkedEdges }], errorDuration: store.errorDuration + 1000, };
    }),

    
    

    // Default ReactFlow functions to update visualNode and visualEdge attributes
    onNodesChange: (changes) => {
  set({
    visualNodes: applyNodeChanges(changes, get().visualNodes),
    // Mark as stale if simulation already completed
    simulationStatus: get().simulationStatus === 2 ? 4 : get().simulationStatus,
  });
},

onEdgesChange: (changes) => {
  set({
    visualEdges: applyEdgeChanges(changes, get().visualEdges),
    // Mark as stale if simulation already completed
    simulationStatus: get().simulationStatus === 2 ? 4 : get().simulationStatus,
  });
},

    setNodes: (nodes) => set({ visualNodes: nodes }),

    setEdges: (edges) => set({ visualEdges: edges }),


    // Function to add a new Node to both visualNodes AND to species!
    // Position isn't required, will assume 0, 0 as center position if not given.
    addNode: (id: string, label: string, color: string, speciesType: string, position?: { x: number, y: number }) => set((store) => ({
        species: [...store.species, { id: id, label: label, initial: '', color: color, speciesType: speciesType }],

        visualNodes: [...store.visualNodes, 
        {
          id: id, 
          position: { x: (position?.x || 0) + Math.random() * 10, y: (position?.y || 0) + Math.random() * 10 }, // Add a little bit of randomness to prevent 100% overlap on adding nodes without moving
          data: { label: label, color: color, initial: '', speciesType: speciesType }, 
          type: 'protein',
        }
      ],

    })),

    // Function to add a new Edge to both visualEdges AND to reactions!
    onConnect: (params) => {

      // Example LaTeX we want: \objNa{\text{Na}}\cdot\objNb{\text{Nb}}\\cdot0.1
      const defRateLaw = '(\\obj' + params.source + '{\\text{' + params.source + '}})\\cdot0.1';

      const newRxn = { 
        id: `${params.source}_${params.target}`, 
        label: 't2', 
        rate_law: defRateLaw, 
        rate_type: '',
        associated_params: [],

        participants: [
          { id: params.source, role: "reactant", coefficient: 1 },
          { id: params.target, role: "product", coefficient: 1 },
        ]
        };

      const rateType = predictRxnType(newRxn, get().species);

      newRxn.rate_type = rateType;

      get().updateEdgeType(newRxn.id, rateType); // Update the rate law type

      set((store) => ({
        
        reactions: [...store.reactions, newRxn],

        visualEdges: addEdge(
          {...params, 
            id: `${params.source}_${params.target}`,
            type: rateType,
            animated: true,
            markerEnd: { 
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20
             },
            data: { 
              label: 'reaction', 
              rate_law: defRateLaw,
              rate_type: rateType,
            },
          },
          store.visualEdges
        ),

      }));
    },


    // Handle connections which may not be to another node (when connecting from node to edge)
    onConnectEnd: (_event, connectionState) => {
      // connectionState has attributes: isValid, from, fromHandle, fromPosition, fromNode, to, toHandle, toPosition, toNode, pointer

      // When a connection is dropped on the pane it's not valid
      if (!connectionState.isValid && get().edgeHovering && connectionState.fromNode && connectionState.fromHandle) {
        const targetRxnID = get().edgeHoverID;
        const nodeToAdd = connectionState.fromNode.id

        const targetRxn = get().reactions.find(item => item.id === targetRxnID);
        if (!targetRxn) { return; } // Should always find target reaction, but end early if we don't find it.

        // ToDo: Have some interaction when this returns false. Like make the edge red or something to let the user node this couldn't be added as a source.


        // Handles differently depending on whether our connection originated from a source handle or a target handle...
        if (connectionState.fromHandle.type === 'source') {
          addSource(nodeToAdd, targetRxn);

        } else if (connectionState.fromHandle.type === 'target') {
          addTarget(nodeToAdd, targetRxn);

        } else {
          // Default to adding it as a source...
          // POSSIBLE ERROR! This is failing gracefully, but really we should be doing something if our target is an unknown handle type.
          addSource(nodeToAdd, targetRxn);
          console.log('ERROR!! Unknown Handle type, whether source or sink.');
          console.log('When connecting from a species to a reaction edge, we gotta figure out whether we are starting from a source handle or a target handle. Right now, we dont know which it is.');
          console.log(connectionState.fromHandle.type);

        }

        // Update connection type based on new connection
        const rateType = predictRxnType(targetRxn, get().species);
        get().updateEdgeType(targetRxnID, rateType); // Update the rate law type


      }
    },

    
    // When edges are deleted, update internal representation as well
    onEdgesDelete: (edges) => {
      const edgeIDsToDelete = edges.map(e => e.id);
      set((store) => ({
        reactions: store.reactions.filter(r => !edgeIDsToDelete.includes(r.id)),
        visualEdges: store.visualEdges.filter(e => !edgeIDsToDelete.includes(e.id)),
      }));
    },

    // When nodes are deleted, update internal representations and re-calculate involved reactions & rate laws.
    onNodesDelete: (nodes) => {
      const nodeIDsToDelete = nodes.map(n => n.id);
      const updatedReactions: { id: string; rateType: string }[] = [];

      // Remove this node from the species and visualNodes
      // For all reactions that use this node, re-infer the reaction type!
      set((store) => ({
        species: store.species.filter(s => !nodeIDsToDelete.includes(s.id)),
        visualNodes: store.visualNodes.filter(n => !nodeIDsToDelete.includes(n.id)),

        reactions: store.reactions.map(r => {
          // If the reaction doesn't even involve this node, make no changes.
          if (!r.participants.some(p => nodeIDsToDelete.includes(p.id))) return r;

          // Remove deleted nodes from this reaction
          const newRxn = {
            ...r,
            participants: r.participants.filter(p => !nodeIDsToDelete.includes(p.id)),
          };

          // Predict the reaction type for this.
          const rateType = predictRxnType(newRxn, get().species);

          // Store the new reaction type, don't yet re-calculate, as we're sending our updated reaction right now!
          updatedReactions.push({'id': newRxn.id, 'rateType': rateType}); 

          return newRxn;
        }),

      }));

      // Go through our list of updated reactions and fix their rate types and rate laws!
      updatedReactions.forEach((r) => {
        get().updateEdgeType(r.id, r.rateType); // Update the rate law type
      });

      // Re-evaluate data structures.
    },



    // Track which edge is currently selected (for opening the drawer)
    selectedEdge: null,
    setSelectedEdge: (edgeId) => set({ selectedEdge: edgeId }),

    // Open the Reaction Editor Drawer
    rxnDrawerOpen: false,
    setRxnDrawerOpen: (open) => set({ rxnDrawerOpen: open }),

    // Display the CSV download button in the simulation drawer
    showCsvDownloadButton: false,
    setShowCsvDownloadButton: (open) => set({ showCsvDownloadButton: open }),

    // Update the label of a given species in both species and visualNodes
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
     
    // Update the rate law of a given reaction in both reactions and visualEdges
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
        } as AppEdge;
      }),

    })),


    // Update the rate law type of a given reaction in both reactions and visualEdges
    // TODO: When setting Edge Type to mass action, set all the participants to either reactant or product, NO CATALYST!
    updateEdgeType: (id, newEdgeType) => set((store) => {

      let newEdge = {} as reactions; // Kinda sketchy but idk how else to do this without changing a lot of code. This is just a placeholder variable we can use to hold the updated reaction with new edge type, which we can then use to update visualEdges correctly. This is mainly for handling the MichaelisMenten case where we need to add enzymeID and associated params when we change to that type.

      return {
      reactions: store.reactions.map((r) => {
        if (r.id !== id) return r;

    
        if (newEdgeType !== 'michaelis_menten') {
          const newRateLaw = getDefaultRateLaw(r);
          newEdge = { ...r, rate_type: newEdgeType, rate_law: newRateLaw };

        } else {
          newEdge = initializeMichaelisEdge(r)
        }

        return newEdge;
        
    }),

      visualEdges: store.visualEdges.map((e) => {

        if (e.id !== id) return e;
        if (!e.data) return e;
        

        if (newEdgeType !== 'michaelis_menten') {
            return {
            ...e,
            type: newEdgeType,
            animated: true,
            data: { 
              ...e.data, 
              rate_type: newEdgeType,
            }
          } as AppEdge;
        } else {
          
          const currentEnzymeID = newEdge.participants.find(p => p.role === 'catalyst')?.id || '';

          return {
            ...e,
            type: newEdgeType,
            animated: false,
            data: { 
              ...e.data, 
              rate_type: newEdgeType,
              enzymeID: currentEnzymeID, // Lowkey kinda sketchy to create new attribute and send it like this. Should really have a different way for MichaelisMenten edge to find catalystID.
            }
          } as AppEdge;

        }

        
      }),

    }}),


    // Adds a simulation parameter! Always with a unique ID. Returns the ID of the added parameter.
    addSimParam: (paramName: string, paramVal: string) => {
      const paramID = 'P' + numberToLetters(get().nextPID++);
      set((store) => ({ simParams: [...store.simParams, { id: paramID, display: paramName, val: paramVal }] }));
      return paramID;
    },

    // Associate a parameter with a reaction.
    associateParam: (paramID: string, rxnID: string) => set((store) => ({
      reactions: store.reactions.map((r) => 
        // Make sure we have the right rxn AND prevent duplicates
        r.id === rxnID && !r.associated_params.includes(paramID)
          ? { ...r, associated_params: [...r.associated_params, paramID] } 
          : r
      ),
    })),

    // Update a parameters value
    updateParamValue: (paramID: string, newValue: string) => set((store) => ({
      simParams: store.simParams.map((p) => p.id === paramID ? { ...p, val: newValue } : p),
    })),

    
    
    // Update the initial concentration of a given species in both species and visualNodes
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
     
     // Update the initial concentration of a given species in both species and visualNodes
    updateColor: (id, newColor) => set((store) => ({
      species: store.species.map((s) => s.id === id ? { ...s, color: newColor } : s),

      visualNodes: store.visualNodes.map((n) => n.id === id ? { 
        ...n, 
        data: { 
          ...n.data, 
          label: n.data.label, 
          color: newColor,
          initial: n.data.initial,
         } 
        } : n),

     })),

     // Updates the label for a reaction
     updateRateName: (id, newRateName) => set((store) => ({
      reactions: store.reactions.map((r) => r.id === id ? { ...r, label: newRateName } : r),

      visualEdges: store.visualEdges.map((e) => {

        if (e.id !== id) return e;
        if (!e.data) return e;

        return {
          ...e, 
          data: { 
            ...e.data, 
            label: newRateName,
          }
        } as AppEdge;
      }),

    })),


    // Get the coefficient of a reactant in some reaction.
    getCoefficient: (reactantID: string, reactionID: string) => {
      const reaction = get().reactions.find(r => r.id === reactionID);
      if (!reaction) {
        return 0; // Reaction not found
      }
      console.log('Reaction found: ' + JSON.stringify(reaction));

      const coeff = reaction.participants.find(p => p.id === reactantID)?.coefficient ?? 0;

      console.log('Coefficient: ' + coeff);

      return coeff;
    },


    // I really don't love this code. This will change once we change data structure of reactants and products.
    changeCoefficient: (reactantID: string, newCoefficient: number, reactionID: string) => {
      // const prevCoefficient = get().getCoefficient(reactantID, reactionID);
      const reaction = get().reactions.find(r => r.id === reactionID);

      // const participant = reaction?.participants.find(p => p.id === reactantID);

      // const newParticipant = {
      //   id: reactantID,
      //   role: participant?.role,
      //   coefficient: newCoefficient,
      // };

      const participants = reaction?.participants.map(p => p.id === reactantID ? { ...p, coefficient: newCoefficient } : p) || [];



      // const newParticipants = reaction?.participants.map(p => p.id === reactantID ? newParticipant : p) || [];
      // console.log('sending updated reaction' + JSON.stringify(reaction));
      // Now we set the updated reaction back in the reactions list to trigger a re-render.
      // set((store) => ({
      //   'reactions': store.reactions.map((r) => r.id === reactionID ? { ...reaction, participants: newParticipants } : r),
      // }));

      if (reaction) {
        set((store) => ({
          'reactions': store.reactions.map((r) => r.id === reactionID ? { ...reaction, participants: participants } : r),
        }));
      }

      console.log('new reactions list: ' + JSON.stringify(get().reactions));

    },




    // Open / close simulation drawer
    simDrawerOpen: false,
    setSimDrawerOpen: (open) => set({ simDrawerOpen: open }),

    // Simulation Information (status, data, fetching function)
    simulationStatus: 0,
    simulationData: [],
    fetchSimulationData: async () => {

      set({simulationStatus: 1}); // Set status to "running"

      try {

        // Building a cute little map for O(1) lookups instead of scanning for every paramID
        const paramLookup = new Map(get().simParams.map(p => [p.id, p.val]));
        
        const payload = {
          "Species": get().species.map(({ id, initial}) => { 
            if (isNaN(Number(initial))) {
              const reactantName = get().species.find(s => s.id === id)?.label || id;
              get().addErrorReason(`Invalid initial concentration for species ${reactantName}: "${initial}". Please enter a valid number.`, undefined, [id], []);
            }

            return {'id': id, 'initial': Number(initial)}; 
          }),

          "Reactions": get().reactions.map(({ id, rate_law, associated_params, participants}) => ({
              'id': id, 
              'Reactants': participants.filter(p => p.role === 'reactant').flatMap(({ id, coefficient }) => Array(coefficient).fill(id)), // Repeat the reactant id according to its coefficient. So A with coeff 2 becomes [A, A]
              'Products': participants.filter(p => p.role === 'product').flatMap(({ id, coefficient }) => Array(coefficient).fill(id)), // Repeat the product id according to its coefficient. So A with coeff 2 becomes [A, A]
              'rate_law': cleanAsciiConversion(convertLatexToAsciiMath(rate_law || '')), 

              // Lowkey this is bad code. Instead of putting parameters with the reactions, we should have parameters be their own object. Requires refactoring simulation engine.
              'Parameters': Object.fromEntries(associated_params.map(PID => [PID, paramLookup.get(PID)] )),
          })),
          
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

        console.log('Raw response: ', responseJson);

        console.log('Is response ok? ', response.ok);

        if (!response.ok) {
          
          // Different errors get thrown depending on who's throwing them.
          // Errors thrown by FastAPI interpreter (like for improper initial concentrations) will have different shape than errors thrown inside the simulation (like when parsing the rate laws)
          if (Array.isArray(responseJson.detail) && responseJson.detail[0].msg === "Input should be a valid number") {
            throw new Error(`FastAPI doesn't like the initial concentration: ${responseJson.detail[0]}`);

          } else {
            const errMsg = responseJson.detail?.message;
            
            // The message we're sending to the user
            const msgToUser = `Simulation failed: ${response.status} - ${responseJson.detail.message}`;
            const fullErrMsg = JSON.stringify(responseJson, null, 2);

            // Try to extract any objects mentioned at beginning of error message
            const i = errMsg.indexOf(' ');
            const potential_obj = errMsg.slice(0, i);
            const rest = errMsg.slice(i + 1); // Store everything AFTER the object. Only send THIS if there is actually an object!

            // Check if object we might have found is actually an object.
            // If so, add to the relevant position!
            if (get().reactions.find(r => r.id === potential_obj)) {
              get().addErrorReason(rest, fullErrMsg, [], [potential_obj]);
            } else if (get().species.find(s => s.id === potential_obj)) {
              get().addErrorReason(rest, fullErrMsg, [potential_obj], []);
            } else {
              get().addErrorReason(msgToUser, fullErrMsg);
            }
            
            throw new Error(`Server error: ${response.status} - ${response.statusText}`);
          }
        }

        set({simulationStatus: 2}); // Set status to "complete"
        set({simulationData: payload_data}); // Store sim data

        console.log('Simulation results: ', payload_data);
        console.log('Simulation Complete!'); 

      } catch (error) {
        get().setErrorOpen(true);
        console.error('Error occurred while fetching simulation data:', error);
        set({simulationStatus: 3}); // Reset status to "error"
      }
    },

    // Open / close feedback form drawer
    feedbackOpen: false,
    setFeedbackOpen: (open) => set({ feedbackOpen: open }),

    // Changes our temporary parameter name and value, which will be used wwhen creating a parameter.
    setTempParamName: (name) => set({ tempParamName: name }),
    setTempParamValue: (value) => set({ tempParamValue: value }),

    // Update what edge we're hovering over (if any)
    edgeHovering: false,
    edgeHoverID: 'default',
    setEdgeHovering: (open) => set({ edgeHovering: open }),
    setEdgeHoverID: (id: string) => set({ edgeHoverID: id }),

    focusEdge: (edgeID: string) => {
      get().setSelectedEdge(edgeID); // Set state for focused edge, tells drawer what edge to go to
      get().setRxnDrawerOpen(true); // Open the drawer
      get().onEdgesChange([{ id: edgeID, type: 'select', selected: true }]); // Select the edge in the visualizer
      get().setFocusedTarget({id: edgeID, type: 'edge'}); // Set the focused target to this edge
    },

    focusNode: (nodeID: string) => {
      get().setRxnDrawerOpen(false);
      get().onNodesChange([{ id: nodeID, type: 'select', selected: true }]); // Select the node in the visualizer
      get().setFocusedTarget({id: nodeID, type: 'node'});
    }
}));


export default useStore;
export type { reactions };

// ===================================================================================================================

function cleanAsciiConversion(ascii: string) {
  // Reactions replaces all " with empty character! Quotes are added when Latex 'Text' is converted to a command, but we do NOT want this!
  // Reactions replaces all ^ with ** for exponentiation.
  
  console.log('Before cleaning: ', ascii);

  // NOTE: We're assuming that objects NEVER have spaces INSIDE them!! Our internal ID representation should never generate spaces inside anyways.
  const withMul = ascii
  .replace(/"\s*"/g, '"*"')      // object * object     Replace `" + any number of spaces + "` with `"*"` g makes it ALL occurences.
  .replace(/(\d)\s*"/g, '$1*"')  // number * object     Replace `number + any number of spaces + "` with `number*"`."
  .replace(/"\s*(\d)/g, '"*$1')  // object * number     Replace `" + any number of spaces + number` with `"*number`.
  .replace(/"\s*\(/g, '"*(')     // object *   ( 
  .replace(/\)\s*"/g, ')*"')     //    )   * object
  .replace(/(\d)\s*\(/g, '$1*(') // number *   (
  .replace(/\)\s*(\d)/g, ')*$1') //    )   * number
  .replace(/\)\s*\(/g, ')*(');   //    )   *   (



  return withMul.replace(/"/g, '').replace(/\^/g, '**');
}

// ===================================================================================================================
// Return true on success, false on failure
// Adds a source node (assuming valid ID in source) to the reaction (array)
function addSource(source: string, reaction: reactions) {

  // Check for duplicate sources
  if (reaction.participants.find((p) => p.id === source)) {
    return false;
  }

  // Add source node to the reaction's list of sources
  reaction.participants = [...reaction.participants, { id: source, role: 'reactant', coefficient: 1 }];

  // return a success
  return true;
}



// Return true on success, false on failure
// Adds a target node (assuming valid ID in target) to the reaction (array)
function addTarget(target: string, reaction: reactions) {

  // Check for duplicate sources
  if (reaction.participants.find((p) => p.id === target)) {
    return false;
  }

  // Add source node to the reaction's list of sources
  reaction.participants = [...reaction.participants, { id: target, role: 'product', coefficient: 1 }];

  // return a success
  return true;
}


// Predicts the reaction type based on the sourcees & targets of the reaction.
// Returns a string corresponding to the name of type of rate law.
function predictRxnType(reaction: reactions, species: species[]) {


  // Do NOT update if we already have a rate type given
  // if (reaction.rate_type && reaction.rate_type !== '') {
  //   return reaction.rate_type;
  // }
  
  const sources = reaction.participants.filter(p => p.role === 'reactant' || p.role === 'catalyst').map(p => p.id) || [];
  const targets = reaction.participants.filter(p => p.role === 'product').map(p => p.id) || [];


  // ===========
  // Create list of source types
  const sTypes = sources.map((item) => {
    const match = species.find((specie) => specie.id === item);
    return match?.speciesType;
  });

  // Repeat above for targets
  const tTypes = targets.map((item) => {
    const match = species.find((specie) => specie.id === item);
    return match?.speciesType;
  });


  // Translate this list into a dictionary with count of each species type.
  // {'molecule': 3, 'enzyme': 1}
  const sTypeCounts = sTypes.reduce((counts: Record<string, number>, specieType) => {
    if (!specieType) return counts;
    counts[specieType] = (counts[specieType] || 0) + 1;
    return counts;
  }, {});

  // Repeat above for targets
  // {'molecule': 3, 'enzyme': 1}
  const tTypeCounts = tTypes.reduce((counts: Record<string, number>, specieType) => {
    if (!specieType) return counts;
    counts[specieType] = (counts[specieType] || 0) + 1;
    return counts;
  }, {});

  // ==============================================================
  // INFER RATE TYPE!

  // Logic to guess reaction type!
  if (((sTypeCounts['molecule'] || 0) === 1) && ((sTypeCounts['enzyme'] || 0) === 1) && ((tTypeCounts['molecule'] || 0) >= 1) && ((tTypeCounts['enzyme'] || 0) === 0)) {
    // one input + one enzyme -> at least 1 molecule 
    // Classic michaelis-menten
    return 'michaelis_menten';
  } else if (((sTypeCounts['molecule'] || 0) >= 1) && ((sTypeCounts['enzyme'] || 0) === 0) && ((tTypeCounts['molecule'] || 0) >= 1) && ((tTypeCounts['enzyme'] || 0) === 0)) {
    // at least 1 molecule -> at least 1 molecule
    // reversible mass action

    // changed because not yet implemented
    // return 'rev_mass_action';
    return 'mass_action'
  } else if (((sTypeCounts['molecule'] || 0) === 1) && ((sTypeCounts['enzyme'] || 0) === 1) && ((tTypeCounts['molecule'] || 0) >= 0) && ((tTypeCounts['enzyme'] || 0) === 1)) {
    // one input + one enzyme -> one enzyme + any number of molecules
    // Hill function, ligands binding to macromolecules
    // Could also be for gene production

    // changed because not yet implemented
    // return 'hill_equation';
    return 'mass_action';
  }

  // Default is mass action
  return 'mass_action';

}

// Options: mass_action, rev_mass_action, michaelis_menten, reversible_michaelis_menten, hill_equation


// Gets the default rate law for a given rate law type!
function getDefaultRateLaw(reaction: reactions) {
  // Default is mass_action (reactant1 * reactant2 * ... * 0.1)
  const terms = reaction.participants.filter((p) => p.role === 'reactant').map((s) => {
    const base = `(\\obj${s.id}{\\text{${s.id}}})`;
    return s.coefficient === 1 ? base : `${base}^{${s.coefficient}}`;
  });

  const newRateLaw = [...terms, '0.1'].join(' \\cdot ');

  return newRateLaw
}

// Converts a number to letters (used for getting string of paramID)
function numberToLetters(num: number) {
    return String(num).split('').map((digit) => String.fromCharCode(97 + Number(digit))).join('');
}

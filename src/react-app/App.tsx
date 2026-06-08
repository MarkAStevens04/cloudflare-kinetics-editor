import { 
	ReactFlow, 
	Background,
	Controls,
  useReactFlow,
  type DefaultEdgeOptions,
 } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import './index.css';
import './radix.css';
import './styles/Banner.css';

import { Toast, Tooltip } from "radix-ui";
import { GitHubLogoIcon, DiscordLogoIcon, VideoIcon, ChevronRightIcon, Cross1Icon } from "@radix-ui/react-icons";

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
import RxnDrawer from './Drawer';
import SimulationDrawer from './SimulationDrawer';
import FeedbackDrawer from './FeedbackDrawer';

import { 
  edgeTypes,
  type AppEdge,
} from './edges'

import {
     TooltipRoot, 
     TooltipContent, 
     TooltipTrigger 
} from './Tooltips'

// Stringify TODO: Move this to Drawer instead
// import { convertLatexToAsciiMath } from "mathlive";

import useStore from './store';
import useThemeStore from './ThemeStore';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';



const nodeTypes = {
  protein: ProteinNode,
};

// const edgeTypes = {
//   mass_action: MassActionEdge,
//   rev_mass_action: ReversibleMassActionEdge,
//   michaelismenten: MichaelisMentenEdge,

// };


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
  '#FFE66D',
  '#FF6B6B',
  '#3a86ff',

]

// ID for the next node to be added
let nextId= 3;


const defaultEdgeOptions: DefaultEdgeOptions = {
  type: 'mass-action',
};


const selector = (state: ReturnType<typeof useStore.getState>) => ({
  visualNodes: state.visualNodes,
  visualEdges: state.visualEdges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onConnectEnd: state.onConnectEnd,
  onEdgesDelete: state.onEdgesDelete,
  onNodesDelete: state.onNodesDelete,
});


export default function App() {

  const { visualNodes, visualEdges, onNodesChange, onEdgesChange, onConnect, onConnectEnd, onEdgesDelete, onNodesDelete } = useStore(
    useShallow(selector),
  );

  // Convert number into letters for NodeIDs 
  const numberToLetters = (num: number) => {
    return String(num).split('').map((digit) => String.fromCharCode(97 + Number(digit))).join('');
  };

  // Function to add a Node (uses Zustand store)
  const addNode = useStore((store) => store.addNode);

  // For handling dark mode
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <div style={{ width: '100vw', height: '100vh' }} className="app">
        <>
        <ReactFlow<AppNode, AppEdge>
            nodes={visualNodes}
            edges={visualEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onConnectEnd={onConnectEnd}
            onEdgesDelete={onEdgesDelete}
            onNodesDelete={onNodesDelete}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            // connectionMode={ConnectionMode.Loose}
            fitView
            defaultEdgeOptions={defaultEdgeOptions}
            colorMode={prefersDark ? 'dark' : 'light'}
            
            >
          <Background />
          <Controls />
          <FocusController />
        </ReactFlow>
        </>


        {/* Drawer on left to add species */}
        <div className="action-container"
        > 

          <button 
            className="action-button"

            onClick={() => {
              const id = 'N' + numberToLetters(nextId++);
              const label = 'Species ' + String(nextId - 1);
              const color = NODE_COLORS[0];
              addNode(id, label, color, 'molecule');
            }}

            style={{
              backgroundColor: NODE_COLORS[0]
            }}
          >
            Add <div className="action-button-strong-text">Molecule</div>
          </button>


          <button 
            className="action-button"

            onClick={() => {
              const id = 'N' + numberToLetters(nextId++);
              const label = 'Species ' + String(nextId - 1);
              const color = NODE_COLORS[1];
              addNode(id, label, color, 'enzyme');
            }}

            style={{
              backgroundColor: NODE_COLORS[1]
            }}

          >
            Add <div className="action-button-strong-text">Enzyme</div>
          </button>


        </div>


        


        <FeedbackDrawer />
        <Banner />
        <ToastError />

        <TutorialPopup />

        <RxnDrawer />
        <SimulationDrawer />
        
      
    </div>
  );
}


// Lets use a Nav menu at the top of our project as a banner! https://www.radix-ui.com/primitives/docs/components/navigation-menu
// This is banner with the "BioBuilder" logo, alongside links to GitHub, Discord, and Youtube.
function Banner() {

  // REMINDER: Cute color palette: #f00, #0ff, #0077b6. Not required to use, but helpful if wanting to come back later lol.
  const tutorialPhase = useThemeStore((state) => state.tutorialPhase);
  const setTutorialPhase = useThemeStore((state) => state.setTutorialPhase);

  return (
  <div className="Banner">

    {/* Title */}
    <div className="BannerSection" >
          <div className="BannerTitle">BIOBUILDER</div> 
          <div className="BannerSubtitle">LIGHT</div>
    </div>

    {/* Calls to action */}
    <div className="BannerSection" style={{justifyContent: 'center', alignItems: 'center'}}>
      <GitHubLogoIcon className="BannerLogo" onClick={() => window.open('https://github.com/MarkAStevens04/cloudflare-kinetics-editor', '_blank')} />
                
      <DiscordLogoIcon className="BannerLogo" onClick={() => window.open('https://discord.gg/GmsKryYDGN', '_blank')} />

      <TooltipRoot open={tutorialPhase === 1} onOpenChange={() => setTutorialPhase(2)}>
      {/* <TooltipRoot defaultOpen={tutorialPhase === 1} > */}
        <TooltipTrigger>
        <VideoIcon className="BannerLogo" onClick={() => window.open('https://youtu.be/Lmgdc56ldk8', '_blank')} />
      </TooltipTrigger>

      <TooltipContent side="bottom" sideOffset={10}>
        Re-watch the walkthrough video here!
        <Tooltip.Arrow className="TooltipArrow" />
      </TooltipContent>
      </TooltipRoot>

    </div>


    {/* Last section */}
    <div className="BannerSection" />
  
  </div>
  );
}

// function ToastError(reasons: string[]) {
function ToastError() {

  const open = useStore((state) => state.errorOpen);
  const setOpen = useStore((state) => state.setErrorOpen);
  const errorReasons = useStore((state) => state.errorReasons);
  const errorDuration = useStore((state) => state.errorDuration);

  const focusEdge = useStore((state) => state.focusEdge);
  const focusNode = useStore((state) => state.focusNode);

  const onFixEdge = (edgeId: string) => {
    focusEdge(edgeId);
  }

  const onFixNode = (nodeId: string) => {
    focusNode(nodeId);
  }


  // const addErrorReason = useStore((state) => state.addErrorReason);

  // if (errorReasons.length === 0) {
  //   addErrorReason('An unknown error occurred with this simulation.');
  // }


  return (
    <>
    <Toast.Provider swipeDirection="right" duration={errorDuration} >

      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        <Toast.Title className="ToastTitle">ERROR: Invalid Reaction</Toast.Title>
        <Toast.Description className="ToastDescription">
          {/* {errorReasons.map((reason, idx) => (
            <div className="ToastItems" key={idx}>{reason.message + (reason.full_detail ? ` (${reason.full_detail})` : '')}</div>
          ))} */}

          {errorReasons.map((reason, idx) => (
            <TooltipRoot>
                  <TooltipTrigger>
                      <div className="ToastItems" key={idx}>
                        <div >{reason.message}</div>
                        {reason.linked_edges && reason.linked_edges.map((edgeID) => (
                          <button
                            className="ToastActionButton"
                            onClick={() => onFixEdge(edgeID)}
                          > 
                            <div>Fix</div>
                            <ChevronRightIcon /> 
                          </button>
                        ))}

                        {reason.linked_nodes && reason.linked_nodes.map((nodeID) => (
                          <button
                            className="ToastActionButton"
                            onClick={() => onFixNode(nodeID)}
                          > 
                            <div>Fix</div>
                            <ChevronRightIcon /> 
                          </button>
                        ))}
                      </div>
                      
                  </TooltipTrigger>
                  
                  <TooltipContent side="left" sideOffset={20} style={{maxWidth: '500px'}}>
                      {reason.full_detail}
                      <Tooltip.Arrow className="TooltipArrow" />
                  </TooltipContent>

            </TooltipRoot>
        ))}

        </Toast.Description>
      </Toast.Root>

      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
    </>
  );
}

function FocusController() {
  console.log('focusing...');
  const { fitView } = useReactFlow();
  const focusedTarget = useStore((state) => state.focusedTarget);
  const setFocusedTarget = useStore((state) => state.setFocusedTarget); // Will use this to clear selected edge afterwards

  useEffect(() => {
    if (!focusedTarget) return;

    let nodes: { id: string }[]; // Initialize as empty array of node IDs
    if (focusedTarget.type === 'node') {
      nodes = [{id: focusedTarget.id}];
    } else {
      // For edges, we want to focus on source and target nodes
      const edge = useStore.getState().visualEdges.find((edge) => edge.id === focusedTarget.id);
      if (!edge) return; // Edge not found, exit early. This should never happen, but for making type safety happy.
      nodes = [{ id: edge?.source }, { id: edge?.target }];
    }
    
    fitView({ nodes: nodes, duration: 800, padding: 0.2 });  
    setFocusedTarget(null); // Clear focused target after focusing
  }, [focusedTarget, fitView, setFocusedTarget]);

  return null;
}


// This is a little popup when the user opens BioBuilder for the very first time!
// CSS style stored in Banner.css, but can move if we want
function TutorialPopup() {
  const tutorialPhase = useThemeStore((state) => state.tutorialPhase);
  const setTutorialPhase = useThemeStore((state) => state.setTutorialPhase);

  // if (tutorialPhase !== 0) {setTutorialPhase(0);} // Meant for debugging, force popup to always be open.

  const pointerEvents = tutorialPhase === 0 ? 'auto' : 'none';

  const clickToClose = () => {
    if (tutorialPhase === 0) {
      setTutorialPhase(1);
    }
  }

  return tutorialPhase === 0 && (
    <>
      <div 
        className="drawer-dimmer"
        onClick={clickToClose}
        style={{
            pointerEvents: pointerEvents,
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.1)',
            opacity: 1,
        }}
    />

      <div className="TutorialPopup">
        <Cross1Icon className="TutorialCloseButton" onClick={clickToClose} />
        
        <div className="TutorialTitle">Hey! Looks like you're new here.</div>
        <div className="TutorialText">Please watch this quick video explaining how to use the software! I promise, it'll make your life a lot easier.</div>
      
        <div className="TutorialVideoContainer">
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/Lmgdc56ldk8?si=urfDWERmmVXdtRYi" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{display: 'block'}}
          >
          </iframe>
        </div>
      </div>
    </>
  );

}
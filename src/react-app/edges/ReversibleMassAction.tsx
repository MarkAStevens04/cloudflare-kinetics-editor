import { 
    BaseEdge, 
    EdgeLabelRenderer,
    getBezierPath,
    // useReactFlow,
    type Edge,
    type EdgeProps,
} from '@xyflow/react';

import '../index.css';
import useStore from '../store';


import { type AppNode } from '../ProteinNode';
import { accordionActionsClasses } from '@mui/material/AccordionActions';

export type RevMAEdgeType = Edge<{ 
    label: string; 
    // toggleDrawer: (id: string) => void;
    rate_law: string;
    rate_type: string; 
}, 'rev_mass_action'>;



export default function ReversibleMassActionEdge({ 
    id, 
    sourceX, 
    sourceY, 
    targetX, 
    targetY, 
    sourcePosition, 
    targetPosition,
    selected,
    markerEnd,
    data,
}: EdgeProps<RxnEdgeType>) {

    // const reactantIDs = useStore(store => store.reactions.find(r => r.id === id)?.participants.filter(p => p.role === 'reactant').map(p => p.id)) ?? [];
    const reactantIDs = useStore(store => store.reactions.find(r => r.id === id)?.participants)?.filter(p => p.role === 'reactant').map(p => p.id) ?? [];
    const productIDs = useStore(store => store.reactions.find(r => r.id === id)?.participants)?.filter(p => p.role === 'product').map(p => p.id) ?? [];
    
    const getInternalNode = useStore(store => store.getInternalNode);

    // const reactantNodes = useStore(store => store.visualNodes).filter(n => reactantIDs.includes(n.id));
    // const productNodes = useStore(store => store.visualNodes).filter(n => productIDs.includes(n.id));

    const reactantNodes = reactantIDs.map(id => getInternalNode(id));
    const productNodes = productIDs.map(id => getInternalNode(id));

    // const reactantNodes = useStore(s => s.nodeLookup.get(reactantIDs[0]).internals.handleBounds);

    // console.log('Reactant Nodes: ', JSON.stringify(reactantNodes[0].internals.handleBounds.source[0]));
    // console.log('First reactant handle: ', Object.keys(productNodes));

    // TODO: Change this to instead be based on handle position
    // Should really change this to be a parent edge with many child sub-edges, that way handles will update more efficiently!
    // const avgX = [...reactantNodes, ...productNodes].reduce((acc, node) => { return acc + node.position.x; }, 0) / (reactantNodes.length + productNodes.length);
    // const avgY = [...reactantNodes, ...productNodes].reduce((acc, node) => { return acc + node.position.y; }, 0) / (reactantNodes.length + productNodes.length);

    const avgX = reactantNodes.reduce((acc, node) => { return acc + node.internals.handleBounds.target[0].x + 0.5 * node.internals.handleBounds.target[0].width; }, 0) / reactantNodes.length;
    const avgY = reactantNodes.reduce((acc, node) => { return acc + node.internals.handleBounds.target[0].y + 0.5 * node.internals.handleBounds.target[0].height; }, 0) / reactantNodes.length;


    const forwardPaths = reactantNodes.map(reactant => getBezierPath({ 
        sourceX: reactant.position.x + 100, 
        sourceY: reactant.position.y + 30,
        sourcePosition: sourcePosition,
        targetX: avgX, 
        targetY: avgY, 
        targetPosition: targetPosition,
    }));

    const [edgePath, labelX, labelY] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

    const edgeColorOp = selected ? '#747bff' : '#ccc';
    const textColorOp = selected ? '#fff' : '#000';

    const activeMarkerEnd = selected ? 'url(#selected-marker)' : markerEnd;

    const setEdgeSelection = useStore((store) => store.setSelectedEdge);
    const setRxnDrawerOpen = useStore((store) => store.setRxnDrawerOpen);

    const setEdgeHovering = useStore((store) => store.setEdgeHovering);
    const setEdgeHoverID = useStore((store) => store.setEdgeHoverID);


    // const onToggle = () => {
    //     data?.toggleDrawer(id);
    // }

    const onToggle = () => {
        setEdgeSelection(id);
        setRxnDrawerOpen(true);
    };


    // Possible error here. May get weird IDs when two edges are hovering over each other, and the mouse goes directly from one edge to another.
    // With preliminary testing, this wasn't a problem, but it's something to be aware of.
    const onHover = () => {
        setEdgeHovering(true);
        setEdgeHoverID(id);
    };

    const onLeave = () => {
        setEdgeHovering(false);
        setEdgeHoverID('');
    }

    return (
        <>
        
        <svg style={{ position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <marker
            className="react-flow__arrowhead"
            id="selected-marker"
            markerWidth="20"
            markerHeight="20"
            viewBox="-10 -10 20 20"
            markerUnits="userSpaceOnUse"
            orient="auto-start-reverse"
            refX="0"
            refY="0"
          >
            <polyline
              className="arrowclosed"
              style={{
                strokeWidth: '2px',
                stroke: '#747bff',
                fill: '#747bff',
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
              points="-5,-4 0,0 -5,4 -5,-4"
            />
          </marker>
        </defs>
      </svg>


            // Render all forward paths
            {
                forwardPaths.map((path, index) => (
                    <BaseEdge 
                        key={index}
                        id={id + '_sub_' + index}
                        path={path}
                        // markerEnd={activeMarkerEnd}
                        // markerEnd={null}
                        // animated={true}
                        style={{
                            stroke: edgeColorOp,
                            strokeWidth: '2px',
                        }}
                    />
                ))
            }


            <BaseEdge 
            id={id} 
            path={edgePath} 
            markerEnd={activeMarkerEnd}
            style={{
                stroke: edgeColorOp,
                strokeWidth: '2px',
            }}
            />
            <EdgeLabelRenderer>
                <button 
                onClick={onToggle}
                style={{
                    // transform: `translate(-50%, -50%) translate(${avgX}px, ${avgY}px)`,
                    transform: `translate(${avgX}px, ${avgY}px)`,
                    // borderColor: edgeColorOp, // Makes it so edge is highlighted when selected, but overrides natural highlighting on hover 
                    backgroundColor: edgeColorOp,
                    color: textColorOp,
                    outline: '0px',
                }}
                className="edge-box nodrag nopan"

                onMouseEnter={() => onHover()}
                onMouseLeave={() => onLeave()}
                > {data?.label ?? 'Default Label'} </button>
            </EdgeLabelRenderer>

        </>


        

    );
}


export function ReversibleMassActionDrawerInfo() {
    return (
        <>
        
        <p> REVERSIBLE MASS ACTION TEST </p>

        </>
    );
}
import { 
    BaseEdge, 
    EdgeLabelRenderer,
    getBezierPath,
    getStraightPath,
    // useReactFlow, 
    type Edge,
    type EdgeProps,
} from '@xyflow/react';

import '../index.css';
import useStore from '../store';

import { type AppNode } from '../ProteinNode';


export type MichaelisEdgeType = Edge<{ 
    label: string; 
    rate_law: string;
    rate_type: string; 
    enzymeID: string;
}, 'michaelis_menten'>;



export default function MichaelisMentenEdge({ 
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
    // const { deleteElements } = useReactFlow();
    

    const edgeColorOp = selected ? '#747bff' : '#ccc';
    const textColorOp = selected ? '#fff' : '#000';

    const activeMarkerEnd = selected ? 'url(#selected-marker)' : markerEnd;

    const setEdgeSelection = useStore((store) => store.setSelectedEdge);
    const setRxnDrawerOpen = useStore((store) => store.setRxnDrawerOpen);

    const setEdgeHovering = useStore((store) => store.setEdgeHovering);
    const setEdgeHoverID = useStore((store) => store.setEdgeHoverID);

    const currentEnzymeNode = useStore(store => store.visualNodes.find(item => item.id === data.enzymeID)) as AppNode;

    // To print properties of the current enzyme in the console, do: console.log('current enzyme node: ' + Object.keys(currentEnzymeNode));
    

    const enzymeX = currentEnzymeNode.position.x;
    const enzymeY = currentEnzymeNode.position.y;
    const enzymePosition = currentEnzymeNode.position;
    
    console.log('current enzyme x: ' + enzymeX);
    console.log('current enzyme y: ' + enzymeY);
    console.log('current enzyme id: ' + currentEnzymeNode.id)
    console.log('current enzyme node: ' + Object.keys(currentEnzymeNode));



    const [edgePath, labelX, labelY] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
    const [edgePathTwo, labelXTwo, labelYTwo, offsetX, offsetY ] = getStraightPath({
        sourceX,
        sourceY,
        targetX: enzymeX,
        targetY: enzymeY,
    });

    const edgePathThree = "M " + enzymeX + " " + enzymeY + " Q " + labelX + " " + labelY + " " + targetX + " " + targetY;

    console.log('current edgePathTwo: ' + edgePathTwo);
    console.log('current edgePathThree: ' + edgePathThree);

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


            <BaseEdge 
                id={id + '_sub_1'} 
                path={edgePathThree} 
                // markerEnd={activeMarkerEnd}
                style={{
                    stroke: 'black',
                    strokeWidth: '2px',
                }}
        
            />



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
                    transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
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
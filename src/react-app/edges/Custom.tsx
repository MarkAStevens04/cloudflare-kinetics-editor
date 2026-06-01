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

export type CustomEdgeType = Edge<{ 
    label: string; 
    // toggleDrawer: (id: string) => void;
    rate_law: string;
    rate_type: string; 
}, 'custom'>;

export default function CustomEdge({ 
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
    const reactantIDs = useStore(store => store.reactions.find(r => r.id === id)?.participants)?.filter(p => p.role === 'reactant').map(p => p.id) ?? [];
    const productIDs = useStore(store => store.reactions.find(r => r.id === id)?.participants)?.filter(p => p.role === 'product').map(p => p.id) ?? [];
    
    const reactantNodes = useStore(store => store.visualNodes).filter(n => reactantIDs.includes(n.id));
    const productNodes = useStore(store => store.visualNodes).filter(n => productIDs.includes(n.id));

    const reactantAvgX = reactantNodes.reduce((acc, node) => { return acc + node.position.x + 0.5 * (node.measured?.width ?? 100); }, 0) / reactantNodes.length;
    const reactantAvgY = reactantNodes.reduce((acc, node) => { return acc + node.position.y + 0.5 * (node.measured?.height ?? 40); }, 0) / reactantNodes.length;

    const productAvgX = productNodes.reduce((acc, node) => { return acc + node.position.x + 0.5 * (node.measured?.width ?? 100); }, 0) / productNodes.length;
    const productAvgY = productNodes.reduce((acc, node) => { return acc + node.position.y + 0.5 * (node.measured?.height ?? 40); }, 0) / productNodes.length;

    const avgX = (reactantAvgX + productAvgX) / 2;
    const avgY = (reactantAvgY + productAvgY) / 2;

    const forwardPaths = reactantNodes.map(reactant => {

        const measured_height = reactant?.measured?.height || 40;
        const measured_width = reactant?.measured?.width || 100;

        const reactantX = reactant.position.x + measured_width;
        const reactantY = reactant.position.y + measured_height / 2;

        return getBezierPath({ 
            sourceX: reactantX, 
            sourceY: reactantY,
            sourcePosition: sourcePosition,
            targetX: avgX, 
            targetY: avgY, 
            targetPosition: targetPosition,
        });
    });

    const reversePaths = productNodes.map(product => {

        const measured_height = product?.measured?.height || 40;

        const productX = product.position.x - 10;
        const productY = product.position.y + measured_height / 2;

        return getBezierPath({ 
            sourceX: avgX, 
            sourceY: avgY,
            sourcePosition: sourcePosition,
            targetX: productX, 
            targetY: productY, 
            targetPosition: targetPosition,
        });
    });

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
                strokeWidth: 1,
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




            {/* Render all forward paths */}
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

            {/* Render all reverse paths */}
            {
                reversePaths.map((path, index) => (
                    <BaseEdge 
                        key={index}
                        id={id + '_sub_' + index}
                        path={path}
                        markerEnd={activeMarkerEnd}
                        // markerEnd={null}
                        // animated={true}
                        style={{
                            stroke: edgeColorOp,
                            strokeWidth: '2px',
                        }}
                    />
                ))
            }

            <EdgeLabelRenderer>
                <button 
                onClick={onToggle}
                style={{
                    transform: `translate(-50%, -50%) translate(${avgX}px, ${avgY}px)`,
                    // transform: `translate(${avgX}px, ${avgY}px)`,
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


export function CustomDrawerInfo({edgeID}: {edgeID: string;}) {
    return (
        <>
        
        {/* <p> CUSTOM TEST {edgeID} </p> */}

        </>
    );
}
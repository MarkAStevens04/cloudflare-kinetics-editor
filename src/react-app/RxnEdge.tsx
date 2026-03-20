import { 
    BaseEdge, 
    EdgeLabelRenderer,
    getBezierPath,
    // useReactFlow, 
    type Edge,
    type EdgeProps,
} from '@xyflow/react';

import './index.css';
import React, { useState } from 'react';
import { animated, useTransition } from '@react-spring/web';

type RxnEdgeType = Edge<{ 
    label: string; 
    color: string;
}, 'reaction'>;

type DrawerProps = {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
};


export type AppEdge = RxnEdgeType;



export default function RxnEdge({ 
    id, 
    sourceX, 
    sourceY, 
    targetX, 
    targetY, 
    sourcePosition, 
    targetPosition,
    selected,
    markerEnd, 
}: EdgeProps<RxnEdgeType>) {

    const [drawerToggle, setDrawerToggle] = useState(false);

    // const { deleteElements } = useReactFlow();
    const [edgePath, labelX, labelY] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

    const edgeColorOp = selected ? '#747bff' : '#ccc';

    const activeMarkerEnd = selected ? 'url(#selected-marker)' : markerEnd;

    function toggleDrawer() {
        setDrawerToggle(!drawerToggle);
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




            <BaseEdge 
            id={id} 
            path={edgePath} 
            markerEnd={activeMarkerEnd}
            style={{
                stroke: edgeColorOp,
                strokeWidth: '1px',
            }}
            />
            <EdgeLabelRenderer>
                <button 
                onClick={toggleDrawer}
                style={{
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                    pointerEvents: 'all',
                }}
                className="nodrag nopan"
                > delete </button>
                <RxnDrawer open={drawerToggle} onClose={toggleDrawer} />
            </EdgeLabelRenderer>
        </>

    );
}




 // Arrow function () => handleClick(0) kind of stores a function call!
  // It says "Hey, I know you're expecting a function here. I have the function
  // that I want you to call, and I can run it myself. So just let me know when you want
  // to run that function, and I'll do it for you." The parent board is taking over this
  // child's job because the parent knows the right parameters to give it, wheras the
  // child wouldn't be able to provide ANY parameters to the function.


function RxnDrawer({open, onClose}: DrawerProps) {
    const transitions = useTransition(open ? [true] : [],  {
        from: { x: -240, opacity: 0 },
        enter: { x: 0, opacity: 1},
        leave: { x: -240, opacity: 0 },
        config: { tension: 220, friction: 24 },

    });

    return transitions((style, item) =>
        item ? (
            <>
                

                <animated.div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: 240,
                        height: '100vh',
                        background: 'white',
                        borderRight: "1px solid #ddd",
                        boxShadow: "0 0 20px rgba(0, 0, 0, 0.12)",
                        padding: 20,
                        transform: style.x.to((x) => `translate3d(${x}px, 0, 0)`),
                        opacity: style.opacity
                    }}
                > 
                <p>Inside me!</p>
                <button onClick={onClose}>Close</button>             

                </animated.div>
            </>
        ) : null
    );

}
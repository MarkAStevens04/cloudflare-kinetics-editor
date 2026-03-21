import { 
    BaseEdge, 
    EdgeLabelRenderer,
    getBezierPath,
    // useReactFlow, 
    type Edge,
    type EdgeProps,
} from '@xyflow/react';

import './index.css';

type RxnEdgeType = Edge<{ 
    label: string; 
    toggleDrawer: () => void;
    onRateLawChange: (id: string, rateLaw: string) => void;
    rate_law: string;
}, 'reaction'>;

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
    data,
}: EdgeProps<RxnEdgeType>) {
    // const { deleteElements } = useReactFlow();
    const [edgePath, labelX, labelY] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

    const edgeColorOp = selected ? '#747bff' : '#ccc';

    const activeMarkerEnd = selected ? 'url(#selected-marker)' : markerEnd;

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
                onClick={data?.toggleDrawer}
                style={{
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                    pointerEvents: 'all',
                }}
                className="nodrag nopan"
                > {data?.label ?? 'Default Label'} </button>
            </EdgeLabelRenderer>
        </>

    );
}




 
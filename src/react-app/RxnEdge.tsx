import { 
    BaseEdge, 
    EdgeLabelRenderer,
    getBezierPath,
    useReactFlow, 
    MarkerType,
    type Edge,
    type EdgeProps 
} from '@xyflow/react';

import './index.css';

type RxnEdgeType = Edge<{ 
    label: string; 
    color: string;
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
}: EdgeProps<RxnEdgeType>) {

    const { deleteElements } = useReactFlow();
    const [edgePath, labelX, labelY] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

    const edgeColorOp = selected ? '#747bff' : '#ccc';

    return (
        <>
    




            <BaseEdge 
            id={id} 
            path={edgePath} 
            markerEnd={markerEnd}
            style={{
                stroke: edgeColorOp,
                strokeWidth: '1px',
            }}
            />
            <EdgeLabelRenderer>
                <button 
                onClick={() => deleteElements({ edges: [{ id }] })}
                style={{
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                    pointerEvents: 'all',
                }}
                className="nodrag nopan"
                > delete </button>
            </EdgeLabelRenderer>
        </>

    // <div className="custom-edge">
        
    //     {/* Option where you have to double click */}
    //     {selected ? <input 
    //         className="nodrag"
    //         value={data.label}
    //         onChange={onChange}
    //         placeholder="Type a label..."
    //         style={{fontSize: 24,
    //             border: '2px solid rgba(0, 0, 0, 0.1)',
    //             backgroundColor: data.color,
    //             borderRadius: '4px',
    //             fieldSizing: 'content',
    //             minWidth: '50px',
    //             fontFamily: 'Helios_Extended', 
    //             padding: '0px 0px',
    //             outline: '0px',
    //         }}
    //         /> : <div style={{ fontSize: 24, color: '#000' }}>{data.label}</div>
    //     }


    //     {/* Option where you can single click */}
    //     {/* <input 
    //         className="nodrag"
    //         value={data.label}
    //         onChange={onChange}
    //         placeholder="-"
    //         font-family="Helios_Extended"
    //         style={{
    //             fontSize: 24,
    //             borderWidth: 0,
    //             backgroundColor: data.color,
    //             fieldSizing: 'content',
    //             minWidth: '50px',
    //             fontFamily: 'Helios_Extended',
    //             padding: '0px 0px',
    //             outline: '0px',
    //         }}
    //         /> */}

    //     <Handle type="target" position={Position.Left}> </Handle>
    //     <Handle type="source" position={Position.Right}> </Handle>

    // </div>


    );
}
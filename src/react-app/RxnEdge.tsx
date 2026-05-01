import { 
    BaseEdge, 
    EdgeLabelRenderer,
    getBezierPath,
    // useReactFlow, 
    type Edge,
    type EdgeProps,
} from '@xyflow/react';

// import MichaelisMentenEdge from './edges/MichaelisMenten';
// import ReversibleMassActionEdge from './edges/ReversibleMassAction';
// import MassActionEdge from './edges/MassAction';

import { MichaelisMentenEdge, ReversibleMassActionEdge, MassActionEdge } from './edges'

import './index.css';
import useStore from './store';

type RxnEdgeType = Edge<{ 
    label: string; 
    // toggleDrawer: (id: string) => void;
    rate_law: string;
    rate_type: string;
}, 'reaction'>;

export type AppEdge = RxnEdgeType;


// ===================================================================================================================

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
    
    if (data.rate_type === 'mass_action') {
        return (
        <MassActionEdge 
        id={id}
        sourceX={sourceX}
        sourceY={sourceY}
        targetX={targetX}
        targetY={targetY}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
        selected={selected}
        markerEnd={markerEnd}
        data={data}
        />
        );
    } else if (data.rate_type === 'reversible_mass_action') {
        return (
        <ReversibleMassActionEdge 
        id={id}
        sourceX={sourceX}
        sourceY={sourceY}
        targetX={targetX}
        targetY={targetY}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
        selected={selected}
        markerEnd={markerEnd}
        data={data}
        />
        );
    } else if (data.rate_type === 'michaelis_menten') { 
        return (
        <MichaelisMentenEdge
        id={id}
        sourceX={sourceX}
        sourceY={sourceY}
        targetX={targetX}
        targetY={targetY}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
        selected={selected}
        markerEnd={markerEnd}
        data={data}
        />
        );
        
    
    } else {
        return (
        <MassActionEdge 
        id={id}
        sourceX={sourceX}
        sourceY={sourceY}
        targetX={targetX}
        targetY={targetY}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
        selected={selected}
        markerEnd={markerEnd}
        data={data}
        />
        );
    }

    

}


// ===================================================================================================================





// ===================================================================================================================





// ===================================================================================================================



 
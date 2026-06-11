// This is the "Base Edge Component". It tells our app what edge it should actually render.

import { 
    // useReactFlow, 
    type EdgeProps,
} from '@xyflow/react';

// import MichaelisMentenEdge from './edges/MichaelisMenten';
// import ReversibleMassActionEdge from './edges/ReversibleMassAction';
// import MassActionEdge from './edges/MassAction';

import { 
  MichaelisMentenEdge, 
  ReversibleMassActionEdge, 
  MassActionEdge,
//   type MichaelisEdgeType,
//   type RevMAEdgeType,
//   type MAEdgeType,
  type AppEdge,
} from './Edges'

import './index.css';


// ===================================================================================================================

export default function RxnEdge({ 
    id, 
    source,
    target,
    sourceX, 
    sourceY, 
    targetX, 
    targetY, 
    sourcePosition, 
    targetPosition,
    selected,
    markerEnd,
    data,
}: EdgeProps<AppEdge>) {
    
    if (data?.rate_type === 'mass_action') {
        return (
        <MassActionEdge 
        id={id}
        source={source}
        target={target}
        sourceX={sourceX}
        sourceY={sourceY}
        targetX={targetX}
        targetY={targetY}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
        selected={selected}
        markerEnd={markerEnd}
        data={{...data, rate_type: 'mass_action' }}
        />
        );
    } else if (data?.rate_type === 'reversible_mass_action') {
        return (
        <ReversibleMassActionEdge 
        id={id}
        source={source}
        target={target}
        sourceX={sourceX}
        sourceY={sourceY}
        targetX={targetX}
        targetY={targetY}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
        selected={selected}
        markerEnd={markerEnd}
        data={{...data, rate_type: 'reversible_mass_action' }}
        />
        );
    } else if (data?.rate_type === 'michaelis_menten') { 
        return (
        <MichaelisMentenEdge
        id={id}
        source={source}
        target={target}
        sourceX={sourceX}
        sourceY={sourceY}
        targetX={targetX}
        targetY={targetY}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
        selected={selected}
        markerEnd={markerEnd}
        data={{...data, rate_type: 'michaelis_menten', enzymeID: '' }}
        />
        );
        
    
    } else {
        return (
        <MassActionEdge 
        id={id}
        source={source}
        target={target}
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

 
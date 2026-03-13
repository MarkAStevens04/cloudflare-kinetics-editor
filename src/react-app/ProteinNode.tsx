import { Handle, Position, type Node, type NodeProps, type BuiltInNode } from '@xyflow/react';
import { ChangeEvent } from 'react';

type ProteinNodeType = Node<{ 
    label: string; 
    onLabelChange: (id: string, value: string) => void;
}, 'protein'>;

export type AppNode = BuiltInNode | ProteinNodeType;



export default function ProteinNode({ id, data, selected }: NodeProps<ProteinNodeType>) {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        data.onLabelChange(id, event.target.value);
    }

    return (

    <div className="custom-node">
        {selected ? <input 
            className="nodrag"
            value={data.label}
            onChange={onChange}
            placeholder="Type a label..."
            font-family="Inter"
            /> : <div className="nodrag" style={{ fontSize: 24, color: '#000' }}>{data.label}</div>}

        <Handle type="target" position={Position.Left}> </Handle>
        <Handle type="source" position={Position.Right}> </Handle>

    </div>


    );
}
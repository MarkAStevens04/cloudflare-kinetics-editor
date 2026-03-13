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
    <div
        className="custom-node"
        style={{
            border: selected ? '2px solid #2563eb' : '1px solid #999'
        }}
    >
        <div style={{ fontWeight: 600, marginBottom: 8}}>Editable Node</div>
    
        <input 
            className="nodrag"
            value={data.label}
            onChange={onChange}
            placeholder="Type a label..."
            style={{
                width: '100%',
                padding: 8,
                borderRadius: 8,
                border: '1px solid #ccc'
            }}
        />

        <div style={{ marginTop: 8, fontSize: 12, color: '#555' }}>
            Current label: {data.label}
        </div>

        <Handle type="target" position={Position.Left}> </Handle>
        <Handle type="source" position={Position.Right}> </Handle>

    </div>
    );
}
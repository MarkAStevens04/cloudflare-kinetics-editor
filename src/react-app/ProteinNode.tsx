import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';

type ProteinNodeType = Node<{ 
    number: number,
    label: string; 
}, 'protein'>;

type DefaultNodeType = Node<
    {
        label: string;
    },
    'default'
>;

export type AppNode = DefaultNodeType | ProteinNodeType;



export default function ProteinNode({ data }: NodeProps<ProteinNodeType>) {
    return (
    <div
        className="custom-node"

    >
        A special protein id: {data.number} 
         with label {data.label}
        <Handle type="target" position={Position.Left}> </Handle>
        <Handle type="source" position={Position.Right}> </Handle>

    </div>
    );
}
import type { Node, NodeProps } from '@xyflow/react';

type ProteinNode = Node<{ 
    number: number,
    label: string; 
}, 'protein'>;

export default function ProteinNode({ data }: NodeProps<ProteinNode>) {
    return <div>A special protein id: {data.number}, with label {data.label}</div>;
}
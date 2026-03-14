import { Handle, Position, type Node, type NodeProps, type BuiltInNode } from '@xyflow/react';
import { ChangeEvent } from 'react';
import './index.css';

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
        
        {/* Option where you have to double click */}
        {selected ? <input 
            className="nodrag"
            value={data.label}
            onChange={onChange}
            placeholder="Type a label..."
            font-family="Inter"
            style={{fontSize: 24,
                border: '2px solid #000',
                borderRadius: '4px',
                fieldSizing: 'content',
                minWidth: '50px',
                fontFamily: 'Helios_Extended', 
                padding: '0px 0px',
            }}
            /> : <div style={{ fontSize: 24, color: '#000' }}>{data.label}</div>}


        {/* Option where you can single click */}
        {/* <input 
            className="nodrag"
            value={data.label}
            onChange={onChange}
            placeholder="-"
            font-family="Helios_Extended"
            style={{
                fontSize: 24,
                borderWidth: 0,
                fieldSizing: 'content',
                minWidth: '50px',
                fontFamily: 'Helios_Extended',
                padding: '0px 0px',
            }}
            /> */}

        <Handle type="target" position={Position.Left}> </Handle>
        <Handle type="source" position={Position.Right}> </Handle>

    </div>


    );
}
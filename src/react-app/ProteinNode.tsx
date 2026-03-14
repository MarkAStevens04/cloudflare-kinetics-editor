// import type BuiltInNod from '@xyflow/react';
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import { ChangeEvent } from 'react';
import './index.css';

type ProteinNodeType = Node<{ 
    label: string; 
    onLabelChange: (id: string, value: string) => void;
    color: string;
}, 'protein'>;

export type AppNode = ProteinNodeType;



export default function ProteinNode({ id, data, selected }: NodeProps<ProteinNodeType>) {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        data.onLabelChange(id, event.target.value);

    }

    const borderColorOp = selected ? '#747bff' : "#ccc";
    const borderSizeOp = selected ? '2px' : '0px';

    return (

    <div className="custom-node" style={{borderColor : borderColorOp, backgroundColor: data.color, borderWidth: borderSizeOp }}>
        
        {/* Option where you have to double click */}
        {selected ? <input 
            className="nodrag"
            value={data.label}
            onChange={onChange}
            placeholder="Type a label..."
            style={{fontSize: 24,
                border: '2px solid rgba(0, 0, 0, 0.1)',
                backgroundColor: data.color,
                borderRadius: '4px',
                fieldSizing: 'content',
                minWidth: '50px',
                fontFamily: 'Helios_Extended', 
                padding: '0px 0px',
                outline: '0px',
            }}
            /> : <div style={{ fontSize: 24, color: '#000' }}>{data.label}</div>
        }


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
                backgroundColor: data.color,
                fieldSizing: 'content',
                minWidth: '50px',
                fontFamily: 'Helios_Extended',
                padding: '0px 0px',
                outline: '0px',
            }}
            /> */}

        <Handle type="target" position={Position.Left}> </Handle>
        <Handle type="source" position={Position.Right}> </Handle>

    </div>


    );
}
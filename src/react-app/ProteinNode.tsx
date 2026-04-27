// import type BuiltInNod from '@xyflow/react';
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import { ChangeEvent } from 'react';
import './index.css';
import './nodeStyles.css'
import useStore from './store';

type ProteinNodeType = Node<{ 
    label: string; 
    color: string;
    initial: string;
    speciesType: string; // Types stored in store.ts
}, 'protein'>;

export type AppNode = ProteinNodeType;



export default function ProteinNode({ id, data, selected }: NodeProps<ProteinNodeType>) {


    const updateLabel = useStore((store) => store.updateSpeciesLabel);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        // data.onLabelChange(id, event.target.value);
        updateLabel(id, event.target.value);

    }

    const borderColorOp = selected ? '#747bff' : "#ccc";
    const borderSizeOp = selected ? '2px' : '0px';
    const selectPadding = selected ? '12px 9px' : '12px 12px';

    const borderRadius = data.speciesType === 'molecule' ? '24px' : '0px'; // Previous was 4px

    // const handleColor = '#e63946';
    const handleColor = data.color;
    


    return (

    <div className="custom-node" style={{
        borderColor : borderColorOp, 
        backgroundColor: data.color, 
        borderWidth: borderSizeOp,
        padding: selectPadding,
        borderRadius: borderRadius,
        
        }}>
        
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
                transition: 'border-color 0.5s',
            }}
            /> : <div style={{ fontSize: 24, color: '#000'}}>{data.label}</div>
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

        <Handle 
            type="target" 
            position={Position.Left} 
            // style={{ 
            //     ...DIAMOND_STYLE,
            //     pointerEvents: 'all',
            // }} 
            style={{
                background: 'none',
                width: '1.5em',
                height: '1.5em',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                border: 'none',
            }}
            className="handle"

        >

        {/* Depending on species type, render different handle shapes */}
        {data.speciesType === 'molecule' ? 
            <div className="handle-circle" style={{borderColor: handleColor, background: 'white'}} />
        : data.speciesType === 'protein' ?
            <div className="handle-diamond" style={{borderColor: handleColor, background: 'white'}} />
        :
            <TriangleWithBorder sColor={handleColor} bColor={'white'} />
        }
            
            {/* <div className="handle-diamond" style={{borderColor: handleColor, background: 'white'}} /> */}
            {/* <div className="handle-circle" style={{borderColor: handleColor, background: 'white'}} /> */}
            {/* <TriangleWithBorder sColor={handleColor} bColor={'white'} /> */}

            <div 
                className="handle-hitbox" 
                style={{
                    transform: 'translate(-15%, -35%)',
                }}
            />

        </Handle>



        <Handle 
            type="source" 
            position={Position.Right} 
            style={{
                background: 'none',
                width: '1.5em',
                height: '1.5em',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                border: 'none',
            }}
        > 

            


        {data.speciesType === 'molecule' ? 
            <div className="handle-circle" style={{borderColor: 'rgba(255, 255, 255, 1)', background: handleColor}} />
        : data.speciesType === 'protein' ?
            <div className="handle-diamond" style={{borderColor: 'rgba(255, 255, 255, 1)', background: handleColor}} />
        :
            <TriangleWithBorder sColor={'rgba(255, 255, 255, 1)'} bColor={handleColor} />
        }


            <div 
                className="handle-hitbox" 
                style={{
                    transform: 'translate(-15%, -35%)',
                }}
            />
            
        </Handle>

    </div>


    );
}



function TriangleWithBorder({sColor, bColor}) {
    return (
        <svg width="44" height="44" viewBox="0 0 44 44">
            <polygon
                points="22,4 4,38 40,38"
                fill={bColor}
                stroke={sColor}
                strokeWidth="6"
                strokeLinejoin="round"
            />
        </svg>
    );
}
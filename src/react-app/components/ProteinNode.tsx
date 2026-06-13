// This is each square / oval "node" on the ReactFlow canvas.
// This is mostly for styling the nodes, logic is handled on the store.

import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import { ChangeEvent } from 'react';
import '../styles/index.css';
import '../styles/Nodes.css'
import '../styles/radix.css';
import useStore from '../stores/store';

import { ScrollArea } from 'radix-ui'; // Scroll Area for UniProt search results.
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { animated, useSpring } from '@react-spring/web';


import { TextTooltip } from './Tooltips'
import { Collapsible } from './Collapsible';


type ProteinNodeType = Node<{ 
    label: string; 
    color: string;
    initial: string;
    speciesType: string; // Types stored in store.ts
    uniprotID?: string; // Optional UniProt ID associated with this node, which can be set through the UniProt search interface.
}, 'protein'>;


type UniprotResultType = {
    id: string;
    alias: string;
    organism: string;
    score: number; // 0-1, Indicates quality of match. Correct organism, # metabolic links, # RELEVANT metabolic links

    onClick: (id: string) => void; // Optional onClick handler for when a search result is clicked, which will set the uniprot ID of the node to the selected result's ID.
}

export type AppNode = ProteinNodeType;



export default function ProteinNode({ id, data, selected }: NodeProps<ProteinNodeType>) {


    const updateLabel = useStore((store) => store.updateSpeciesLabel);
    const updateInitialConcentration = useStore((store) => store.updateInitialConcentration);
    const updateColor = useStore((store) => store.updateColor);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        // data.onLabelChange(id, event.target.value);
        updateLabel(id, event.target.value);

    }

    const onInitChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateInitialConcentration(id, event.target.value);
    }

    const onColorChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateColor(id, event.target.value);
    }

    const borderColorOp = selected ? '#747bff' : "#ccc";
    const borderSizeOp = selected ? '2px' : '0px';
    const selectPadding = selected ? '12px 9px 6px 9px' : '12px 12px';

    const borderRadius = data.speciesType === 'molecule' ? '24px' : '0px'; // Previous was 4px

    // const handleColor = '#e63946';
    const handleColor = data.color;
    

    return (
        <div 
            className="Node" 
            style={{
                borderColor : borderColorOp, 
                backgroundColor: data.color, 
                borderWidth: borderSizeOp,
                padding: selectPadding,
                borderRadius: borderRadius,
                // height: selected ? '6em' : '3em',
            }}

        >
        
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
                color: 'rgba(0, 0, 0, 1)',
            }}
            /> : <div style={{ fontSize: 24, color: '#000'}}>{data.label}</div>
        }


        {/* Change node settings when node is open! */}
        { selected && 
            <div className="NodeEditor">
                <div className="NodeRow">
                    Initial Value: 
                    <input
                        className="item species-param-input NodeRowItem"
                        placeholder={`0`}
                        value={data.initial}
                        onChange={(e) => onInitChange(e)}
                        style={{fontSize: '0.8em', borderRadius: '4px', borderWidth: '2px'}}
                    />
                </div>

                <div className="NodeRow">
                    Color:
                    <input
                        className="item species-param-input NodeRowItem"
                        type="color"
                        defaultValue={data.color}
                        onChange={(e) => onColorChange(e)}
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            padding: '0px',
                        }}
                    />
                
                
                </div>

                <hr />
                <UniprotSelector NodeID={id} currentUniProtID={data.uniprotID} />
            </div>
        }
        





        <Handle 
            type="target" 
            position={Position.Left} 
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
        : data.speciesType === 'enzyme' ?
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
        : data.speciesType === 'enzyme' ?
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



function TriangleWithBorder({ sColor, bColor }: { sColor: string; bColor: string }) {
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


// function UniprotSelector({ NodeID, currentUniProtID }: { NodeID: string; currentUniProtID?: string }) {

//     const currentQuery = useStore((state) => state.uniProtQuery);
//     const updateQuery = useStore((state) => state.setUniProtQuery);

//     const searchResults = useStore((state) => state.uniProtResults);
//     const searchUniprot = useStore((state) => state.searchUniprot);
//     const loading = useStore((state) => state.uniProtLoading);
//     const uniProtDrawerOpen = useStore((state) => state.uniProtDrawerOpen);
//     const setUniProtDrawerOpen = useStore((state) => state.setUniProtDrawerOpen);

//     // Animation styling we'll use on opening and closing of the UniProt Search Drawer
//     const [springs, api] = useSpring(() => ({
//         from: { height: 0 },
//     }));

//     // Animation styling we'll use for rotating the arrow
//     const [rotateSpring, rotateApi] = useSpring(() => ({
//             from: { rotate: 0 },
//         }));

//     const handleDrawerToggle = () => {
//         setUniProtDrawerOpen(!uniProtDrawerOpen);

//         // Do animation
//         api.start({
//             from: { height: 0 },
//             to: { height: 200 },
//             reverse: uniProtDrawerOpen,
//         });

//         // Do rotation animation
//         rotateApi.start({
//             from: { rotate: 0 },
//             to: { rotate: 180 },
//             reverse: uniProtDrawerOpen,
//         });
//     }

//     const updateUniProtID = useStore((state) => state.setUniProtID);

//     const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
//         updateQuery(event.target.value);
//         searchUniprot(event.target.value);
//     }

//     const onUpdateUniProtID = (id: string) => {
//         updateUniProtID(NodeID, id);
//     }


//     return (
//         <>

//         <div className="NodeRow">
//             <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '200px'}}>
//                 <div>UniProt ID:</div>
//                 <a
//                     className="NodeRowLink"
//                     href={`https://www.uniprot.org/uniprotkb/${currentUniProtID}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     onClick={(e) => e.stopPropagation()}
//                 >
//                     {currentUniProtID ? currentUniProtID : "None"}
//                 </a>
//             </div>
//             <animated.div style={{...rotateSpring}}>
//                 <TriangleDownIcon onClick={handleDrawerToggle} />
//             </animated.div>
            
            
//         </div>

//             <animated.div style={{margin: '0px 0px 5px 0px', overflow: 'hidden', ...springs}} >
//                     <ScrollArea.Root className="nodrag nopan nowheel ScrollAreaRoot">
//                         <input
//                             // className="item species-param-input NodeRowItem"
//                             className="ScrollSearchBar"
//                             placeholder={`Enter UniProt ID, Name, Organism, etc.`}
//                             value={currentQuery}
//                             onChange={(e) => onSearch(e)}
//                         />

//                         <ScrollArea.Viewport className="ScrollAreaViewport">
//                             <div className=" UniprotSearchContainer" >
//                                 {/* {searchResults.length === 0 ? (
//                                     <div className="UniprotSearchEmpty">
//                                         Try entering a search term above!
//                                     </div>
                                    
//                                 ) : (
//                                     searchResults.map((result) => (
//                                         <UniprotSearchChip key={result.id} id={result.id} alias={result.alias} organism={result.organism} score={result.score} />
//                                     ))
//                                 )} */}

//                                 {loading
//                                     ? Array.from({ length: 4}).map((_, i) => <UniprotSearchSkeleton key={i} />)
//                                     : searchResults.length === 0
//                                         ? <div className="UniprotSearchEmpty"> No results found. <br /> Try another search! </div>
//                                     : searchResults.map((result) => (
//                                         <UniprotSearchChip key={result.id} id={result.id} alias={result.alias} organism={result.organism} score={result.score} onClick={(id) => onUpdateUniProtID(id)} />
//                                     ))
//                                 }

//                             </div>
//                         </ScrollArea.Viewport>
//                         <ScrollArea.Scrollbar
//                             className="ScrollAreaScrollbar"
//                             orientation="vertical"
//                         >
//                             {/* "Thumb" is the little dark gray part on the scrollbar! */}
//                             <ScrollArea.Thumb className="ScrollAreaThumb" />
//                         </ScrollArea.Scrollbar>
//                         <ScrollArea.Corner className="ScrollAreaCorner" />
//                     </ScrollArea.Root>
//             </animated.div>
//         </>
//     )
// }


function UniprotSelector({ NodeID, currentUniProtID }: { NodeID: string; currentUniProtID?: string }) {

    const currentQuery = useStore((state) => state.uniProtQuery);
    const updateQuery = useStore((state) => state.setUniProtQuery);

    const searchResults = useStore((state) => state.uniProtResults);
    const searchUniprot = useStore((state) => state.searchUniprot);
    const loading = useStore((state) => state.uniProtLoading);
    const uniProtDrawerOpen = useStore((state) => state.uniProtDrawerOpen);
    const setUniProtDrawerOpen = useStore((state) => state.setUniProtDrawerOpen);

    // Animation styling we'll use on opening and closing of the UniProt Search Drawer
    const [springs, api] = useSpring(() => ({
        from: { height: 0 },
    }));

    // Animation styling we'll use for rotating the arrow
    const [rotateSpring, rotateApi] = useSpring(() => ({
            from: { rotate: 0 },
        }));

    const handleDrawerToggle = () => {
        setUniProtDrawerOpen(!uniProtDrawerOpen);

        // Do animation
        api.start({
            from: { height: 0 },
            to: { height: 200 },
            reverse: uniProtDrawerOpen,
        });

        // Do rotation animation
        rotateApi.start({
            from: { rotate: 0 },
            to: { rotate: 180 },
            reverse: uniProtDrawerOpen,
        });
    }

    const updateUniProtID = useStore((state) => state.setUniProtID);

    const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
        updateQuery(event.target.value);
        searchUniprot(event.target.value);
    }

    const onUpdateUniProtID = (id: string) => {
        updateUniProtID(NodeID, id);
    }


    return (
        <>

        <div className="NodeRow">
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '200px'}}>
                <div>UniProt ID:</div>
                <a
                    className="NodeRowLink"
                    href={`https://www.uniprot.org/uniprotkb/${currentUniProtID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                >
                    {currentUniProtID ? currentUniProtID : "None"}
                </a>
            </div>
            <animated.div style={{...rotateSpring}}>
                <TriangleDownIcon onClick={handleDrawerToggle} />
            </animated.div>
            
            
        </div>

            <animated.div style={{margin: '0px 0px 5px 0px', overflow: 'hidden', ...springs}} >
                    <ScrollArea.Root className="nodrag nopan nowheel ScrollAreaRoot">
                        <input
                            // className="item species-param-input NodeRowItem"
                            className="ScrollSearchBar"
                            placeholder={`Enter UniProt ID, Name, Organism, etc.`}
                            value={currentQuery}
                            onChange={(e) => onSearch(e)}
                        />

                        <ScrollArea.Viewport className="ScrollAreaViewport">
                            <div className=" UniprotSearchContainer" >
                                {/* {searchResults.length === 0 ? (
                                    <div className="UniprotSearchEmpty">
                                        Try entering a search term above!
                                    </div>
                                    
                                ) : (
                                    searchResults.map((result) => (
                                        <UniprotSearchChip key={result.id} id={result.id} alias={result.alias} organism={result.organism} score={result.score} />
                                    ))
                                )} */}

                                {loading
                                    ? Array.from({ length: 4}).map((_, i) => <UniprotSearchSkeleton key={i} />)
                                    : searchResults.length === 0
                                        ? <div className="UniprotSearchEmpty"> No results found. <br /> Try another search! </div>
                                    : searchResults.map((result) => (
                                        <UniprotSearchChip key={result.id} id={result.id} alias={result.alias} organism={result.organism} score={result.score} onClick={(id) => onUpdateUniProtID(id)} />
                                    ))
                                }

                            </div>
                        </ScrollArea.Viewport>
                        <ScrollArea.Scrollbar
                            className="ScrollAreaScrollbar"
                            orientation="vertical"
                        >
                            {/* "Thumb" is the little dark gray part on the scrollbar! */}
                            <ScrollArea.Thumb className="ScrollAreaThumb" />
                        </ScrollArea.Scrollbar>
                        <ScrollArea.Corner className="ScrollAreaCorner" />
                    </ScrollArea.Root>
            </animated.div>

            <Collapsible LeftText="More Info" RightText="" open={uniProtDrawerOpen} setOpen={setUniProtDrawerOpen} > <p> Hello world! </p> </Collapsible>
        </>
    )
}



// Each "chip" inside the UniProt search results.
function UniprotSearchChip({ id, alias, organism, score, onClick }: UniprotResultType) {
   
    let ringColor = 'rgba(0, 0, 0, 1)';
    let confidenceText = '';
    if (score > 0.7) {
        ringColor = '#00DA2C'; // Green for high confidence
        confidenceText = "This node has PLENTY of connections, and matches your organism. We predict this is a GREAT match for your model.";
    } else if (score > 0.4) {
        ringColor = '#ffa500'; // Orange for medium confidence
        confidenceText = "This node has some connections, but may not match your organism perfectly. We predict this is a MODERATE match for your model.";
    } else if (score > 0) {
        ringColor = '#e0463e'; // Red for low confidence
        confidenceText = "This node has few connections, and may not match your organism. We predict this is a POOR match for your model.";
    } else {
        ringColor = 'rgba(0, 0, 0, 1)'; // Red for low confidence
        confidenceText = "The relevance of this node is UNKNOWN. We're working on improving this relevance metric!";
    }

    return (
        <div className="UniprotSearchChip" tabIndex={0} onClick={() => onClick(id)} >
            

            <div className="UniprotChipTop" >
                <div className="UniprotChipName">{alias}</div>

                <TextTooltip text={`${confidenceText}`} side="right" >
                    <div className="UniprotRing" style={{borderColor: ringColor}} />
                </TextTooltip>

            </div>
            <div className="UniprotChipBottom" >
                <a
                    className="UniprotChipId"
                    href={`https://www.uniprot.org/uniprotkb/${id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                >
                    {id}
                </a>
                <span className="UniprotChipOrganism">{organism}</span>
            </div>
        </div>
    );
}

function UniprotSearchSkeleton() {

    const x = "Fake text";
    return (
        <>
            <div className="UniprotSearchChip" >
                <div className="UniprotChipTop" >
                    <div className="UniprotChipName UniprotSkeleton"> {x} </div>
                    <div className="UniprotRing UniprotSkeleton" style={{borderColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '50%',}} />
                </div>
                <div className="UniprotChipBottom" >
                    <div className="UniprotChipId UniprotSkeleton"> {x.substring(0, 6)} </div> 
                    <div className="UniprotChipOrganism UniprotSkeleton"> {x} </div>
                </div>
            </div>
        
        </>
    )
}
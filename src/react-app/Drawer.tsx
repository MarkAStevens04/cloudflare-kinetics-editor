// Arrow function () => handleClick(0) kind of stores a function call!
  // It says "Hey, I know you're expecting a function here. I have the function
  // that I want you to call, and I can run it myself. So just let me know when you want
  // to run that function, and I'll do it for you." The parent board is taking over this
  // child's job because the parent knows the right parameters to give it, wheras the
  // child wouldn't be able to provide ANY parameters to the function.
// import React from 'react';
import { ChangeEvent, useRef, useEffect, useMemo } from 'react';
import { animated, useTransition } from '@react-spring/web';

import './index.css';
import './radix.css';
import './styles/Drawer.css';

// For math live input
import "mathlive";
import { MathfieldElement } from 'mathlive';
import useStore from './store';

// import * as React from "react";
import { 
    Select,
    Tooltip,
    Separator,
 } from 'radix-ui';

import { 
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    InfoCircledIcon,

} from "@radix-ui/react-icons";




import { 
  MichaelisMentenDrawerInfo, 
  MassActionDrawerInfo,
  ReversibleMassActionDrawerInfo,
} from './edges'


type rateEditorProps = {
    currentRateLaw?: string;
    onRateChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

type reactantEditorProps = {
    sourceIDs: string[];
    targetIDs: string[];
    rxnID: string;
}


export default function RxnDrawer() {

    const edge = useStore((store) => store.reactions.find((e) => e.id === store.selectedEdge)) || { id: '', label: '', sources: [''], targets: [''], rate_law: '', rate_type: ''};
    const nodes = useStore((store) => store.species);

    const rate_type = useStore((store) => store.reactions.find((e) => e.id === edge.id)?.rate_type) || 'mass_action';
    const associated_params = useStore(store => store.reactions.find(e => e.id === edge.id)?.associated_params) || [];
    

    // const open = useStore((store) => store.rxnDrawerOpen, (prev, next) => {return false;});
    const open = useStore((store) => store.rxnDrawerOpen);
    const setRxnDrawerOpen = useStore((store) => store.setRxnDrawerOpen);

    const updateRateLaw = useStore((store) => store.updateRateLaw);
    const updateInitialConcentration = useStore((store) => store.updateInitialConcentration);
    const updateRateName = useStore((store) => store.updateRateName);

    const updateEdgeType = useStore((store) => store.updateEdgeType);

    const sourceNode = nodes.find((node) => node.id === edge.sources[0]) || nodes[0];
    const targetNode = nodes.find((node) => node.id === edge.targets[0]) || nodes[0];

    const RxnID = edge.id;
    const rateLaw = edge.rate_law;

    const reactantInit = sourceNode.initial || '';
    const productInit = targetNode.initial || '';

    const reactantLabel = sourceNode.label;
    const productLabel = targetNode.label;

    const reactantColor = sourceNode.color;
    const productColor = targetNode.color;

    const reactionTypes = [
        {
            'id': 'michaelis_menten',
            'label': 'Michaelis-Menten',
            'desc': 'When you want to simulate an enzyme catalyzing some reaction. \n \n ASSUMPTIONS: Substrate is in excess, enzyme is very small.'
        },
        {
            'id': 'mass_action',
            'label': 'Mass Action',
            'desc': 'When you want to simulate a simple reaction, of some reactant(s) becoming some product(s).'
        },
        {
            'id': 'rev_mass_action',
            'label': 'Reversible Mass Action',
            'desc': 'When you want to simulate a simple, reversible reaction, of some reactant(s) becoming some product(s) and vice versa.'
        },
        {
            'id': 'hill_equation',
            'label': 'Hill Equation',
            'desc': 'When you want to simulate a ligand binding to a molecule with multiple binding sites, like oxygen binding to hemoglobin.'
        },
        {
            'id': 'custom',
            'label': 'Custom',
            'desc': 'When you want to define a custom rate law using your own equations.'
        },
    ];
    

    const onRNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateRateName(RxnID, event.target.value);
    }
    
    const onRateChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateRateLaw(RxnID, event.target.value);
    }

    const onRChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateInitialConcentration(sourceNode.id, event.target.value);
    }

    const onPChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateInitialConcentration(targetNode.id, event.target.value);
    }
    

    const transitions = useTransition(open ? [true] : [],  {
        from: { x: -240, opacity: 0 },
        enter: { x: 0, opacity: 1},
        leave: { x: -240, opacity: 0 },
        config: { tension: 220, friction: 24 },
    });

    // Allows user to start moving screen immediately after closing drawer.
    const pointerEvents = open ? 'auto' : 'none';

    return transitions((style, item) =>
        item ? (
            <>
                {/* Closes when you click out of the drawer, but prevents moving around the screen. */}
                <animated.div 
                    className="drawer-dimmer"
                    onClick={() => setRxnDrawerOpen(false)}
                    style={{
                        pointerEvents: pointerEvents,
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.1)',
                        opacity: style.opacity,
                    }}
                />
                

                <animated.div
                    className="drawer"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: 400,
                        height: '100vh',
                        background: 'white',
                        borderRight: "1px solid #ddd",
                        boxShadow: "0 0 20px rgba(0, 0, 0, 0.12)",
                        transform: style.x.to((x) => `translate3d(${x}px, 0, 0)`),
                        opacity: style.opacity
                    }}
                > 
                <br /> <br />

                {/* Edit reaction name */}
                <div className="species-text" style={{padding: '0.2em 0px', top: '20px'}}>
                    <input 
                        className="drawer-name-input"
                        placeholder="Reaction Name"
                        value={edge.label}
                        onChange={onRNameChange}
                        
                    />
                </div>

                <br />
                <div className="drawer-reaction-diagram">

                    {/* Reactant Parameters */}
                    <div className="species-container" style={{
                        backgroundColor: reactantColor,
                    }}>
                        <div className="species-container-header"> {reactantLabel} </div>
                        <hr style={{
                            border: 'none',
                            height: '1px',
                            backgroundColor: 'rgba(0, 0, 0, 0.15)',
                            margin: '0px 0',
                            padding: 0,
                        }} />
                        <div className="species-params">     
                            Initial: 
                            <input 
                                className="item species-param-input"
                                placeholder={`0`} 
                                value={reactantInit === '' ? '' : reactantInit}
                                onChange={onRChange}
                            />
                        </div>    

                    </div>


                    {/* Arrow connecting reactants to products */}
                    <p style={{
                        fontSize: '24px',
                    }}>→</p>
                    


                    {/* Product Parameters */}
                    <div className="species-container" style={{
                        backgroundColor: productColor,
                    }}>
                        <div className="species-container-header"> {productLabel} </div>
                        <hr style={{
                            border: 'none',
                            height: '1px',
                            backgroundColor: 'rgba(0, 0, 0, 0.15)',
                            margin: '0px 0',
                            padding: 0,
                        }} />
                        <div className="species-params">     
                            Initial: 
                            <input 
                                className="item species-param-input"
                                placeholder={`0`} 
                                value={productInit === '' ? '' : productInit}
                                onChange={onPChange}
                            />
                        </div>    

                    </div>
                </div>
                <br />


                <hr />

                <ReactantEditor sourceIDs={edge.sources} targetIDs={edge.targets} rxnID={edge.id} />


                <hr />
                {/* <p> Rate Law: {rateLaw} </p> */}

                {/* Dropdown to select reaction type (Michaelis-Menten, Mass Action, etc.) */}
                <div className="DrawerSection">
                    <p>Reaction type: </p>

                    <Select.Root
                        onValueChange={(value) => updateEdgeType(edge.id, value)}
                        defaultValue={rate_type}
                    >
                        <Select.Trigger className="SelectTrigger" aria-label="ReactionType">
                            <Select.Value placeholder="Select Reaction Type" />
                            <Select.Icon className="SelectIcon">
                                <ChevronDownIcon />
                            </Select.Icon>
                        </Select.Trigger>

                        <Select.Portal>
                            <Select.Content className="SelectContent" position="popper" sideOffset={4}>
                                <Select.ScrollUpButton className="SelectScrollButton">
                                    <ChevronUpIcon />
                                </Select.ScrollUpButton>

                                <Select.Viewport className="SelectViewport">
                                    <Select.Group>
                                        {/* <Select.Label className="SelectLabel">Reaction Type</Select.Label> */}

                                        {reactionTypes.map((type) => (

                                            <Select.Item className="SelectItem" value={type.id}>
                                                <Select.ItemText> {type.label} </Select.ItemText>
                                                <Select.ItemIndicator className="SelectItemIndicator">
                                                    <CheckIcon />
                                                </Select.ItemIndicator>

                                                <Tooltip.Provider>
                                                    <Tooltip.Root delayDuration={200}>
                                                        <Tooltip.Trigger asChild>
                                                            <button className="InfoIcon">
                                                                <InfoCircledIcon />
                                                            </button>
                                                        </Tooltip.Trigger>
                                                        
                                                        <Tooltip.Portal>
                                                            <Tooltip.Content className="TooltipContent" sideOffset={5} side="right">
                                                                {type.desc}
                                                                <Tooltip.Arrow className="TooltipArrow" />
                                                            </Tooltip.Content>
                                                        </Tooltip.Portal>

                                                    </Tooltip.Root>
                                                </Tooltip.Provider>
                                            </Select.Item>
                                        ))}
                                        
                                    </Select.Group>
                                </Select.Viewport>
                                <Select.ScrollDownButton className="SelectScrollButton">
                                    <ChevronDownIcon />
                                </Select.ScrollDownButton>

                            </Select.Content>

                        </Select.Portal>
                    </Select.Root>
                </div>



                <hr />
                
                {/* List all of our parameter inputs */}
                <div >
                    <p className="DrawerSection">Tunable Parameters: </p>
                    {
                        associated_params.map(PID => (
                            <ParameterInput paramID={PID} />
                        ))
                    }
                </div>


                <hr />

                {/* Edit Rate Laws */}
                <RateEditor currentRateLaw={rateLaw} onRateChange={onRateChange} />

                <hr />




                {/* Include rate type specific options */}
                {
                    edge.rate_type === 'mass_action' ? 
                        <MassActionDrawerInfo edgeID={edge.id} />
                    : edge.rate_type === 'rev_mass_action' ?
                        <ReversibleMassActionDrawerInfo />  
                    : edge.rate_type === 'michaelis_menten' ?
                        <MichaelisMentenDrawerInfo edgeID={edge.id} />
                    :
                        <p> { edge.rate_type } </p>
                }

                

                

                
                
                


                </animated.div>
            </>
        ) : null
    );

}

function ReactantEditor({
    sourceIDs,
    targetIDs,
    rxnID,
}: reactantEditorProps) {

    const reactants = useStore((store) => store.species).filter(r => sourceIDs.includes(r.id)); 
    const products = useStore((store) => store.species).filter(r => targetIDs.includes(r.id));

    const getCoefficient = useStore((store) => store.getCoefficient);
    const changeCoefficient = useStore((store) => store.changeCoefficient);

    // TODO: Fix this so that we only change coefficient after the input loses focus. Don't continuously update this. 
    const updateCoefficient = (reactantID: string, newCoefficient: number) => {
        changeCoefficient(reactantID, newCoefficient, rxnID);
    }

    if (! sourceIDs || !targetIDs || sourceIDs.length === 0 || targetIDs.length === 0) {
        return null;
    }

    // console.log('reactant IDs: ' + JSON.stringify(reactants));


    return (
    <>
    <p> Edit Coefficients </p>
    <div className="DrawerRow">
        

        <div className="DrawerHalf" >
            <p> Reactants: </p>

            {reactants.map((reactant) => (
                <div style={{display: 'flex', padding: '5px 0px'}}>
                <input
                    className="item species-param-input"
                    placeholder={`0`}
                    value={getCoefficient(reactant.id, rxnID).toString()}
                    onChange={(e) => updateCoefficient(reactant.id, parseInt(e.target.value) || 0)}
                    style={{
                        minWidth: '10px',
                        margin: '0px 0px'
                    }}
                />

                <p className='autofill-species-box' 
                key={reactant.id} 
                style={{backgroundColor: reactant.color}}
                // onClick={() => onButton(reactant.id)}
                >

                    {reactant.label}

                </p>
                </div>))
            }
            
            

        </div>

        <Separator.Root
            className="SeparatorRoot"
            decorative
            orientation="vertical"
            style={{ 
                margin: "0 0px",
                }}
        />
        


        <div className="DrawerHalf" >
            <p> Products: </p>

            {products.map((product) => (
                <div style={{display: 'flex', padding: '5px 0px'}}>
                <input
                    className="item species-param-input"
                    placeholder={`0`}
                    value={(-1 * getCoefficient(product.id, rxnID)).toString()}
                    onChange={(e) => updateCoefficient(product.id, -1 * parseInt(e.target.value) || 0)}
                    style={{
                        minWidth: '10px',
                        margin: '0px 0px'
                    }}
                />

                <p className='autofill-species-box' 
                key={product.id} 
                style={{backgroundColor: product.color}}
                // onClick={() => onButton(product.id)}
                >

                    {product.label}

                </p>
                </div>))
            }

        </div>
    </div>
    </>
    );


}



function RateEditor({
    currentRateLaw,
    onRateChange,

}: rateEditorProps) {
    const nodes = useStore((store) => store.species);
    const params = useStore((store) => store.simParams);

    const mfRef = useRef<MathfieldElement>(null); 


    // When our input is changed
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        onRateChange(event);
    }

    // When a variable button is clicked
    const onButton = (buttonID: string) => {
        mfRef.current?.insert('\\obj'+ buttonID + '{\\text{' + buttonID + '}}', {
            // focus: true,
            insertionMode: "replaceSelection",
            selectionMode: "item",
        });
        console.log('Macros: ' + mfRef.current?.macros);

        // mfRef.current?.applyStyle({
        //     color: buttonColor,
        // });
    }

    const macros = useMemo(() => {
        return Object.fromEntries([
            // Very strange code here. We have args: 1 so that the parameter we add (\text{buttonID}) stays in the latex
            // We render our text as node.data.label, and in the backend, keep our latex as \objNXXX{\text{nXXX}}
            ...nodes.map((node) => ['obj' + node.id, {args: 1, def: '\\text{' + node.label + '}'}]),

            // Do similar for params
            ...params.map((param) => ['obj' + param.id, {args: 1, def: '\\text{' + param.display + '}'}])
        ]);

    }, [nodes, params]);


    useEffect(() => {
        const mf = mfRef.current;
        if (!mf) return;

        // Teach mathlive about our custom macros
        mf.macros = {
            ...mf.macros,
            ...macros,
        };

        mf.smartFence = false;
    }, [macros]);




    return (
    <div >   
        <p className='DrawerSection'>Customize Rate Law:</p>
        <br />
        <br />

        <math-field
                id="formula"
                ref={mfRef}
                onInput={onChange}
                className="MathInput"
            >
                {currentRateLaw}
            </math-field>


        <p className='DrawerSection'>Add species to rate law:</p>

        {/* Add Reactant Handles */}
        <div className="species-param-input" 
        style={{
                backgroundColor: 'rgba(255, 255, 255, 1)',
                color: 'rgba(0, 0, 0, 0.8)',
                width: '95%',
                margin: '0px 0px',
                minWidth: '0px',
                display: 'flex',
                flexWrap: 'wrap',
                padding: '5px 5px',
                gap: '5px',
            }}
        >

            {/* Populate our rate law buttons */}
            {nodes.map((node) => (
                <div>
                <p className='autofill-species-box' 
                key={node.id} 
                style={{backgroundColor: node.color}}
                onClick={() => onButton(node.id)}
                >

                    {node.label}

                </p>
                </div>))
            }
        </div>

    </div>
    );

}


function ParameterInput({ paramID }: { paramID: string} ) {

    const paramVal = useStore((store) => store.simParams.find(p => p.id === paramID)?.val);
    const paramDisp = useStore((store) => store.simParams.find(p => p.id === paramID)?.display);
    
    const updateParam = useStore((store) => store.updateParamValue);

    const onParamUpdate = (event: ChangeEvent<HTMLInputElement>) => {
        updateParam(paramID, event.target.value);
    }

    return (
        <>
            <div className="DrawerSection">
                {paramDisp} 
                <input
                    className="item species-param-input"
                    placeholder={`0`}
                    value={paramVal}
                    onChange={onParamUpdate}
                    style={{
                        minWidth: '80%',
                    }}
                />
            </div>


        </>
    );
}


// Radix UI, helpful components: Separator, Radio Group, Accordian, Collapsible, Select, Scroll Area, 
// Extra also helpful: Popover, Slider,
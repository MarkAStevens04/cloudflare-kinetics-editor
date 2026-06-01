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
    Separator,
    Popover,
    Tooltip,
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
  CustomDrawerInfo,
} from './edges'

import {
     TooltipRoot, 
     TooltipContent, 
     TooltipTrigger 
} from './Tooltips'


type rateEditorProps = {
    currentRateLaw?: string;
    onRateChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onParamButton: (buttonID: string) => void;
}

type reactantEditorProps = {
    participants: {id: string, role: string, coefficient: number}[];
    rxnID: string;
}


export default function RxnDrawer() {

    const edge = useStore((store) => store.reactions.find((e) => e.id === store.selectedEdge)) || { id: '', label: '', rate_law: '', rate_type: '', participants: []};
    const nodes = useStore((store) => store.species);

    const rate_type = useStore((store) => store.reactions.find((e) => e.id === edge.id)?.rate_type) || 'mass_action';
    const associated_params = useStore(store => store.reactions.find(e => e.id === edge.id)?.associated_params) || [];
    

    // const open = useStore((store) => store.rxnDrawerOpen, (prev, next) => {return false;});
    const open = useStore((store) => store.rxnDrawerOpen);
    const setRxnDrawerOpen = useStore((store) => store.setRxnDrawerOpen);

    const updateRateLaw = useStore((store) => store.updateRateLaw);
    const updateInitialConcentration = useStore((store) => store.updateInitialConcentration);
    const updateRateName = useStore((store) => store.updateRateName);
    const associateParam = useStore((store) => store.associateParam);

    const updateEdgeType = useStore((store) => store.updateEdgeType);

    const sourceNode = nodes.find((node) => node.id === edge.participants.find((p) => p.role === 'reactant')?.id) || nodes[0];
    const targetNode = nodes.find((node) => node.id === edge.participants.find((p) => p.role === 'product')?.id) || nodes[0];

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
            'desc': 'An enzyme catalyzing some reaction. \n \n ASSUMPTIONS: Substrate is in excess, enzyme is very small.',
            'implemented': true,
        },
        {
            'id': 'mass_action',
            'label': 'Mass Action',
            'desc': 'The default. Simple reaction, some reactant(s) becoming some product(s).',
            'implemented': true,
        },
        {
            'id': 'rev_mass_action',
            'label': 'Reversible Mass Action',
            'desc': 'When you want to simulate a simple, reversible reaction, of some reactant(s) becoming some product(s) and vice versa.',
            // Needs to have two parameters, one for forward rxn and one for reverse rxn, alongside creating separate rate laws for forward & reverse rxn, alongside backwards arrows in path!
            'implemented': false,
        },
        {
            'id': 'hill_equation',
            'label': 'Hill Equation',
            'desc': 'When you want to simulate a ligand binding to a molecule with multiple binding sites, like oxygen binding to hemoglobin.',
            'implemented': false,
        },
        {
            'id': 'custom',
            'label': 'Custom',
            'desc': 'Define your own custom rate law!',
            'implemented': true,
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

    const onParamButton = (buttonID: string) => {
        associateParam(buttonID, RxnID);
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
                <ReactantEditor participants={edge.participants} rxnID={edge.id} />


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

                                            <Select.Item className="SelectItem" value={type.id} disabled={!type.implemented} >
                                                <Select.ItemText> {type.implemented ? `${type.label}` : `${type.label} (COMING SOON)`} </Select.ItemText>
                                                <Select.ItemIndicator className="SelectItemIndicator">
                                                    <CheckIcon />
                                                </Select.ItemIndicator>

                                                {/* <Tooltip.Provider>
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
                                                </Tooltip.Provider> */}


                                                <TooltipRoot>
                                                        <TooltipTrigger>
                                                            <button className="InfoIcon">
                                                                <InfoCircledIcon />
                                                            </button>
                                                        </TooltipTrigger>
                                                        
                                                        <TooltipContent side='right'>
                                                                {type.desc}
                                                        </TooltipContent>
                                                </TooltipRoot>


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
                <RateEditor currentRateLaw={rateLaw} onRateChange={onRateChange} onParamButton={onParamButton} />

                <hr />




                {/* Include rate type specific options */}
                {
                    edge.rate_type === 'mass_action' ? 
                        <MassActionDrawerInfo edgeID={edge.id} />
                    : edge.rate_type === 'rev_mass_action' ?
                        <ReversibleMassActionDrawerInfo />  
                    : edge.rate_type === 'michaelis_menten' ?
                        <MichaelisMentenDrawerInfo edgeID={edge.id} />
                    : edge.rate_type === 'custom' ?
                        <CustomDrawerInfo edgeID={edge.id} />
                    :
                        <p> { edge.rate_type } </p>
                }

                

                

                
                
                


                </animated.div>
            </>
        ) : null
    );

}

function ReactantEditor({
    participants,
    rxnID,
}: reactantEditorProps) {

    const reactants = useStore((store) => store.species).filter(r => participants.filter(p => p.role === 'reactant').map(p => p.id).includes(r.id));
    const products = useStore((store) => store.species).filter(r => participants.filter(p => p.role === 'product').map(p => p.id).includes(r.id));

    const getCoefficient = useStore((store) => store.getCoefficient);
    const changeCoefficient = useStore((store) => store.changeCoefficient);

    // TODO: Fix this so that we only change coefficient after the input loses focus. Don't continuously update this. 
    const updateCoefficient = (reactantID: string, newCoefficient: number) => {
        changeCoefficient(reactantID, newCoefficient, rxnID);
    }

    if (! participants || participants.length === 0) {
        return null;
    }

    // console.log('reactant IDs: ' + JSON.stringify(reactants));


    return (
    <>

    {/* // Header with little info about editing coefficients */}
    <TooltipRoot>
        <TooltipTrigger>
            <p className="DrawerSection"> Edit Coefficients: </p>
        </TooltipTrigger>

        <TooltipContent>
            Edit the coefficients of your reaction! Coefficients represent how many molecules of each reactant are needed to produce how many molecules of each product. For example, in the reaction 2A + B → 3C, the coefficient for A would be 2, the coefficient for B would be 1, and the coefficient for C would be 3.
        </TooltipContent>
    </TooltipRoot>

    <div className="DrawerRow">
        

        <div className="DrawerHalf" >
            <p> Reactants: </p>

            {reactants.map((reactant) => (
                <div style={{display: 'flex', padding: '5px 0px'}}>
                <input
                    className="item species-param-input"
                    placeholder={`0`}
                    value={getCoefficient(reactant.id, rxnID) === 0 ? '' : getCoefficient(reactant.id, rxnID).toString()}
                    onChange={(e) => updateCoefficient(reactant.id, parseInt(e.target.value) || 0)}
                    style={{
                        minWidth: '10px',
                        margin: '0px 0px',
                        padding: '0px 1em 0px 0.2em',
                    }}
                />


                <p className='autofill-species-box' 
                key={reactant.id} 
                style={{backgroundColor: reactant.color, borderColor: reactant.color, cursor: 'default', transform: 'translateX(-1em)'}}
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
                    value={getCoefficient(product.id, rxnID) === 0 ? '' : getCoefficient(product.id, rxnID).toString()}
                    onChange={(e) => updateCoefficient(product.id, parseInt(e.target.value) || 0)}
                    style={{
                        minWidth: '10px',
                        margin: '0px 0px',
                        padding: '0px 1em 0px 0.2em',
                    }}
                />

                <p className='autofill-species-box' 
                key={product.id} 
                style={{backgroundColor: product.color, borderColor: product.color, cursor: 'default', transform: 'translateX(-1em)'}}
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
    onParamButton,

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

    const onParamButtonSelect = (buttonID: string) => {
        onParamButton(buttonID);
        onButton(buttonID);
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

    const headerToolContent = 'Define your rate law here! How quickly your reactants become products. Supports most math functions, similar to Desmos! If you get stuck, reset the reaction type to Mass Action for an example.  \n\n NOTE: You cannot type the name of species or parameters, you must click the corresponding button! \n\n NOTE: You cannot use square or curly brackets, only parentheses (otherwise Python thinks it is a list or set).';
 


    return (
    <div > 

        {/* Title for customizing the rate law, plus info on hover! */}
        <TooltipRoot>
            <TooltipTrigger>
            <p className='DrawerSection'>Customize Rate Law:</p>
            </TooltipTrigger>

            <TooltipContent>
                {headerToolContent}
            </TooltipContent>
        </TooltipRoot>  
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

        {/* Add Reactant Chips */}
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

            {/* Populate our rate law chips */}
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



         <p className='DrawerSection'>Add parameter to rate law:</p>

        {/* Add Parameter Chips */}
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

            <CreateParameter />

            {/* Populate our parameter chips */}
            {params.map((param) => (
                <div>
                <p className='autofill-species-box' 
                key={param.id} 
                style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}
                onClick={() => onParamButtonSelect(param.id)}
                >

                    {param.display}

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
                <p style={{padding: '0px', margin: '0px', fontWeight: '500', color: 'rgba(0, 0, 0, 0.5)' }}>{paramDisp} </p>
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

function CreateParameter({}) {
    const addSimParam = useStore.getState().addSimParam; 
    const paramTempName = useStore((store) => store.tempParamName);
    const paramTempValue = useStore((store) => store.tempParamValue);

    const associateParamToRxn = useStore((store) => store.associateParamToRxn);

    const setTempParamName = useStore((store) => store.setTempParamName);
    const setTempParamValue = useStore((store) => store.setTempParamValue);

    const onTempParamNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTempParamName(event.target.value);
    }
    
    const onTempParamValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTempParamValue(event.target.value);
    }

    const onCreate = () => {
        const tVal = paramTempValue;
        const tName = paramTempName;
        setTempParamValue('');
        setTempParamName('');
        addSimParam(tName, tVal);
    }


    return (
    <>
    <Popover.Root>
    <Popover.Trigger asChild>
        <button 
            className='autofill-species-box' 
            style={{backgroundColor:'#fff', fontWeight: 'bold', color: '#fff', width: '2.5em', height: '2.5em', justifyContent: 'center', alignItems: 'center', display: 'flex', borderRadius: '50%', cursor: 'pointer', borderColor: 'rgba(0, 0, 0, 0.2)', borderStyle: 'solid', borderWidth: '3px'}} 
            // onClick={() => addSimParam()}
        >
            <p style={{fontSize: '2em', color: 'rgba(0, 0, 0, 0.5)'}}>+</p>
        </button>
    </Popover.Trigger>

    <Popover.Content className='PopoverContent' sideOffset={5} collisionPadding={30} >
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px', width: '200px'}} >
            {/* <h3 style={{margin: '0px'}}>Create Parameter!</h3> */}
            <div className='DrawerSection' >
                Param Name:
                <input
                    className="item species-param-input"
                    placeholder={`name`}
                    value={paramTempName}
                    onChange={onTempParamNameChange}
                />
            </div>

            <div className='DrawerSection' >
                Param Value:
                <input
                    className="item species-param-input"
                    placeholder={`0`}
                    value={paramTempValue}
                    onChange={onTempParamValueChange}
                />
            </div>

            <button
                style={{
                    backgroundColor: '#646cff',
                    color: '#fff'
                }}
                onClick={onCreate}
            >
                Create Parameter!
            </button>
        </div>
        
        {/* <p>Create Parameter</p> */}

    </Popover.Content>
    </Popover.Root>
    </>
    );
}

// Radix UI, helpful components: Separator, Radio Group, Accordian, Collapsible, Select, Scroll Area, 
// Extra also helpful: Popover, Slider,
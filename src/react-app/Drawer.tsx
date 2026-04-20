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

// For math live input
import "mathlive";
import { MathfieldElement } from 'mathlive';
import useStore from './store';


type rateEditorProps = {
    currentRateLaw?: string;
    onRateChange: (event: ChangeEvent<HTMLInputElement>) => void;
}


export default function RxnDrawer() {

    const edge = useStore((store) => store.reactions.find((e) => e.id === store.selectedEdge)) || { id: '', label: '', sources: [''], targets: [''], rate_law: '' };
    const nodes = useStore((store) => store.species);

    // const open = useStore((store) => store.rxnDrawerOpen, (prev, next) => {return false;});
    const open = useStore((store) => store.rxnDrawerOpen);
    const setRxnDrawerOpen = useStore((store) => store.setRxnDrawerOpen);

    const updateRateLaw = useStore((store) => store.updateRateLaw);
    const updateInitialConcentration = useStore((store) => store.updateInitialConcentration);
    const updateRateName = useStore((store) => store.updateRateName);

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
                {/* <button onClick={onClose} className="nodrag nopan action-button">Close</button> */}

                {/* Edit reaction name */}
                <div className="species-text" style={{padding: '0.2em 0px', top: '20px'}}>
                    <input 
                        className="drawer-name-input"
                        placeholder="Reaction Name"
                        value={edge.label}
                        onChange={onRNameChange}
                        
                    />
                </div>
                {/* <p className="species-text" > Reaction Name </p> */}

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

                {/* Edit Rate Laws */}

                <RateEditor currentRateLaw={rateLaw} onRateChange={onRateChange} />

                       

                </animated.div>
            </>
        ) : null
    );

}



function RateEditor({
    currentRateLaw,
    onRateChange,

}: rateEditorProps) {
    const nodes = useStore((store) => store.species);

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
        return Object.fromEntries(
            // Very strange code here. We have args: 1 so that the parameter we add (\text{buttonID}) stays in the latex
            // We render our text as node.data.label, and in the backend, keep our latex as \objNXXX{\text{nXXX}}
            nodes.map((node) => ['obj' + node.id, {args: 1, def: '\\text{' + node.label + '}'}])
        );

    }, [nodes]);


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
    <div className='rate-editor'>   
        <p className='drawer-text'>Rate Law</p>

        <math-field
                id="formula"
                ref={mfRef}
                onInput={onChange}
                style={{
                    display: 'block',
                }}
            >
                {currentRateLaw}
            </math-field>


        <br />
        <p className='drawer-text' style={{fontSize: '0.8em', margin: '10px 0px',}}>Add species to rate law</p>

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
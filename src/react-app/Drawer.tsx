// Arrow function () => handleClick(0) kind of stores a function call!
  // It says "Hey, I know you're expecting a function here. I have the function
  // that I want you to call, and I can run it myself. So just let me know when you want
  // to run that function, and I'll do it for you." The parent board is taking over this
  // child's job because the parent knows the right parameters to give it, wheras the
  // child wouldn't be able to provide ANY parameters to the function.
// import React from 'react';
import { ChangeEvent } from 'react';
import { animated, useTransition } from '@react-spring/web';

import { type AppNode } from './ProteinNode';
import { type AppEdge } from './RxnEdge';


import './index.css';


export type RxnDrawerProps = {
    edge: AppEdge;
    nodes: AppNode[];
    open: boolean;
    onToggle: () => void;
    onRateLawChange: (id: string, rateLaw: string) => void;
    onInitialChange: (currNode: AppNode, reactantInit: string) => void;
    // children?: React.ReactNode;
};



export default function RxnDrawer({
    edge, 
    nodes,
    open,
    onToggle, 
    onRateLawChange,
    onInitialChange,
}: RxnDrawerProps) {

    const sourceNode = nodes.find((node) => node.id === edge.source) || nodes[0];
    const targetNode = nodes.find((node) => node.id === edge.target) || nodes[0];

    const RxnID = edge.id;
    const rateLaw = edge.data?.rate_law;

    const reactantInit = sourceNode.data.initial || '';
    const productInit = targetNode.data.initial || '';

    const reactantLabel = sourceNode.data.label;
    const productLabel = targetNode.data.label;

    const reactantColor = sourceNode.data.color;
    const productColor = targetNode.data.color;

    const onRateChange = (event: ChangeEvent<HTMLInputElement>) => {
        onRateLawChange(RxnID, event.target.value);
    }

    const onRChange = (event: ChangeEvent<HTMLInputElement>) => {
        onInitialChange(sourceNode, event.target.value);
    }

    const onPChange = (event: ChangeEvent<HTMLInputElement>) => {
        onInitialChange(targetNode, event.target.value);
    }

    const transitions = useTransition(open ? [true] : [],  {
        from: { x: -240, opacity: 0 },
        enter: { x: 0, opacity: 1},
        leave: { x: -240, opacity: 0 },
        config: { tension: 220, friction: 24 },
    });

    // const interactiveBG = open ? 'block' : 'none';
    const pointerEvents = open ? 'auto' : 'none';

    return transitions((style, item) =>
        item ? (
            <>
                {/* Closes when you click out of the drawer, but prevents moving around the screen. */}
                <animated.div 
                    className="drawer-dimmer"
                    onClick={onToggle}
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
                        width: 340,
                        height: '100vh',
                        background: 'white',
                        borderRight: "1px solid #ddd",
                        boxShadow: "0 0 20px rgba(0, 0, 0, 0.12)",
                        padding: 20,
                        transform: style.x.to((x) => `translate3d(${x}px, 0, 0)`),
                        opacity: style.opacity
                    }}
                > 
                <br /> <br />
                {/* <button onClick={onClose} className="nodrag nopan action-button">Close</button> */}

                <p className="species-text" > Reaction Name </p>

                {/* Reactant Parameters */}
                <div className="species-container" style={{
                    backgroundColor: reactantColor,
                    position: 'absolute',
                    top: '100px',

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
                
                <br />
                {/* Product Parameters */}
                <div className="species-container" style={{
                    backgroundColor: productColor,
                    position: 'absolute',
                    bottom: '100px',
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

                <div className="arrow-container">
                    <svg className="down-arrow" viewBox="0 4 20 82" preserveAspectRatio="none">
                        <path
                            d="M10 5 L10 85 M4 79 L10 85 L16 79"
                            stroke="rgba(0, 0, 0, 0.5)"
                            strokeWidth="0.5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                </div>
            


                <div className="rate-law-container">
                    <input 
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            color: 'rgba(0, 0, 0, 0.8)',
                        }}
                        className="species-param-input"
                        placeholder="Rate Law" 
                        value={rateLaw === '0' ? '' : rateLaw}
                        onChange={onRateChange}
                    />   
                </div>
                
                       

                </animated.div>
            </>
        ) : null
    );

}
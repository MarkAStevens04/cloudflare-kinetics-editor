// Arrow function () => handleClick(0) kind of stores a function call!
  // It says "Hey, I know you're expecting a function here. I have the function
  // that I want you to call, and I can run it myself. So just let me know when you want
  // to run that function, and I'll do it for you." The parent board is taking over this
  // child's job because the parent knows the right parameters to give it, wheras the
  // child wouldn't be able to provide ANY parameters to the function.
// import React from 'react';
import { ChangeEvent } from 'react';
import { animated, useTransition } from '@react-spring/web';


import './index.css';


export type RxnDrawerProps = {
    RxnID: string;
    ReaID: string;
    ProID: string;
    rateLaw: string;
    reactantInit: string;
    productInit: string;
    reactantLabel: string;
    productLabel: string;
    open: boolean;
    onClose: () => void;
    onRateLawChange: (id: string, rateLaw: string, reactantInit: string, productInit: string) => void;
    onReactantChange: (id: string, reactantInit: string) => void;
    onProductChange: (id: string, productInit: string) => void;
    // children?: React.ReactNode;
};



export default function RxnDrawer({
    RxnID, 
    ReaID,
    ProID,
    rateLaw, 
    reactantInit, 
    productInit, 
    reactantLabel, 
    productLabel, 
    open,
    onClose, 
    onRateLawChange,
    onReactantChange,
    onProductChange,
}: RxnDrawerProps) {

    console.log('Drawer has id: ', RxnID);

    const onRateChange = (event: ChangeEvent<HTMLInputElement>) => {
        onRateLawChange(RxnID, event.target.value, reactantInit, productInit);
    }

    const onRChange = (event: ChangeEvent<HTMLInputElement>) => {
        onReactantChange(ReaID, event.target.value);
    }

    const onPChange = (event: ChangeEvent<HTMLInputElement>) => {
        onProductChange(ProID, event.target.value);
    }

    // const onDrawerClick = () => {
    //     onClose(RxnID);
    // }

    const transitions = useTransition(open ? [true] : [],  {
        from: { x: -240, opacity: 0 },
        enter: { x: 0, opacity: 1},
        leave: { x: -240, opacity: 0 },
        config: { tension: 220, friction: 24 },
    });

    const interactiveBG = open ? 'block' : 'none';
    const currOpacity = open ? 1 : 0;

    return transitions((style, item) =>
        item ? (
            <>
                {/* Closes when you click out of the drawer, but prevents moving around the screen. */}
                <div 
                    className="drawer-dimmer"
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.1)',
                        display: interactiveBG,
                        opacity: currOpacity,
                    }}
                />
                

                <animated.div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: 240,
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
                <p>From {reactantLabel} - {productLabel}</p>

                <input 
                    placeholder="Rate Law" 
                    value={rateLaw === '0' ? '' : rateLaw}
                    onChange={onRateChange}
                />   
                
                <input 
                    placeholder={`${reactantLabel} Initial Concentration`} 
                    value={reactantInit === '' ? '' : reactantInit}
                    onChange={onRChange}
                />      

                <input 
                    placeholder={`${productLabel} Initial Concentration`} 
                    value={productInit === '' ? '' : productInit}
                    onChange={onPChange}
                />              

                </animated.div>
            </>
        ) : null
    );

}
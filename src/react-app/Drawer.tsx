// Arrow function () => handleClick(0) kind of stores a function call!
  // It says "Hey, I know you're expecting a function here. I have the function
  // that I want you to call, and I can run it myself. So just let me know when you want
  // to run that function, and I'll do it for you." The parent board is taking over this
  // child's job because the parent knows the right parameters to give it, wheras the
  // child wouldn't be able to provide ANY parameters to the function.
import React from 'react';
import { animated, useTransition } from '@react-spring/web';


import './index.css';


export type DrawerProps = {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
};



export default function RxnDrawer({open, onClose}: DrawerProps) {

    const transitions = useTransition(open ? [true] : [],  {
        from: { x: -240, opacity: 0 },
        enter: { x: 0, opacity: 1},
        leave: { x: -240, opacity: 0 },
        config: { tension: 220, friction: 24 },
    });

    return transitions((style, item) =>
        item ? (
            <>
                {/* Closes when you click out of the drawer, but prevents moving around the screen. */}
                {open && <div 
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0)',
                    }}
                />
                }
                
                


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
                <p>From REACTANT_1 - REACTANT_2</p>

                <input placeholder="Rate Law" />           

                <input placeholder="Initial concentration: REACTANT 1" /> 
                <input placeholder="Initial concentration: REACTANT 2" /> 

                </animated.div>
            </>
        ) : null
    );

}
// import { 
//     animated, 
//     useSpring, 
// } from '@react-spring/web';

import { useEffect, useRef } from 'react';


// Create type for our simulation drawer
export type FeedbackDrawerProps = {
    open: boolean;
    onToggle: () => void;
}


// Create SimulationDrawer as an object
export default function SimulationDrawer({
    open,
    onToggle,

}:  FeedbackDrawerProps
) {

    const initialized = useRef(false);


    useEffect(() => {
        const win = window as any;

        if (initialized.current) return;
        initialized.current = true;

        // Create the queueing stub from their snippet
        if (typeof win.Featurebase !== "function") {
            win.Featurebase = function() {
                // eslint-disable-next-line prefer-rest-params
                (win.Featurebase.q = win.Featurebase.q || []).push(arguments);
            };
        }

        // Load the SDK once
        if (!document.getElementById("featurebase-sdk")) {
            const script = document.createElement("script");
            script.id = "featurebase-sdk";
            script.src = "https://do.featurebase.app/js/sdk.js";
            document.head.appendChild(script);
        }


        win.Featurebase("initialize_feedback_widget", {
            organization: "biobuilder",
            theme: "light",
            placement: "left",
            local: "en",
            metadata: {
                app_version: "1.0.0",
            },
        });
    }, []);



    return null;



    // // Animation styling we'll use on opening and closing of the drawer
    // const [springs, api] = useSpring(() => ({
    //     from: {height: 300, width: 50},
    // }));


    // // When the outer drawer is clicked, spring open / closed
    // const handleClick = () => {

    //     // Do animation
    //     api.start({
    //         from: {height: 300, width: 50},
    //         to: {height: 300, width: 200},
    //         reverse: open,
    //     });

    //     // Perform toggle
    //     onToggle();
    // }


    // return (
    // <div>
    //     <animated.div
    //         className='feedback-box'
    //         style={{
    //             position: 'fixed',
    //             left: 0,
    //             bottom: 200,
    //             // background: '#000000',
    //             borderRadius: 8,
    //             overflow: 'hidden',
    //             ...springs,
    //         }}
    //         onClick={handleClick}
    //     >

    //     <p style={{
    //          color: 'black' 
    //     }}>
    //     FEEDBACK
    //     </p>

    //     </animated.div>   

        

    // </div>

    // )

}
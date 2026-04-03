import { 
    animated, 
    useSpring, 
} from '@react-spring/web';

import { useEffect } from 'react';

declare global {
    interface Window {
        Tally?: {
            loadEmbeds: () => void;
        }
    }
}


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

    const formId = 'VLYDpa';

    // Script for feedback form
    useEffect(() => {

        const widgetScriptSrc = 'https://tally.so/widgets/embed.js';

        const loadEmbeds = () => {
            if (window.Tally) {
                window.Tally.loadEmbeds();
                return;
            }

            // Fallback from Tally docs
            document
                .querySelectorAll<HTMLIFrameElement>('iframe[data-tally-src]:not([src])')
                .forEach((iframe) => {
                    const dataSrc = iframe.dataset.tallySrc;
                    if (dataSrc) {
                        iframe.src = dataSrc;
                    }
                });
        };

        // If sscript already loaded, just load embeds
        if (window.Tally) {
            loadEmbeds();
            return;
        }

        // Avoid adding the script more than once
        const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${widgetScriptSrc}"]`);

        if (existingScript) {
            loadEmbeds();
            return;
        }

        const script = document.createElement('script');
        script.src = widgetScriptSrc;
        script.async = true;
        script.onload = loadEmbeds;
        script.onerror = loadEmbeds;
        document.body.appendChild(script);

    }, []);

    const tallySrc = `https://tally.so/embed/${formId}?alignLeft=1&dynamicHeight=1`;




    // Animation styling we'll use on opening and closing of the drawer
    const [springs, api] = useSpring(() => ({
        from: {height: 150, width: 34, bottom: 400},
    }));


    // When the outer drawer is clicked, spring open / closed
    const handleClick = () => {

        // Do animation
        api.start({
            from: {height: 150, width: 34, bottom: 400},
            to: {height: 350, width: 300, bottom: 300},
            reverse: open,
        });

        // Perform toggle
        onToggle();
    }


    return (
    <div>
        <animated.div
            className='feedback-box'
            style={{
                position: 'fixed',
                left: 0,
                // background: '#000000',
                borderRadius: 8,
                overflow: 'hidden',
                ...springs,
            }}
            onClick={handleClick}
        >
        

        {/* Text before button is opened */}
        <div 
        className='feedback-button'
        style={{
            padding: '0px 5px', 
            // backgroundColor: 'rgba(0, 0, 0, 0.3)', 
            width: '24px',
            writingMode: 'sideways-lr',
            textOrientation: 'mixed',

            // Disable selection
            userSelect: 'none',
        }}>
            FEEDBACK
        </div>

        {/* Actual Survey */}
        <div>
            <iframe
            data-tally-src={tallySrc}
            loading="lazy"
            width="281"
            height={400}
            frameBorder={0}
            marginHeight={0}
            marginWidth={0}
            title={'Tally form'}
            style={{ border: 'none', padding: '0px 0px', }}
            />
        </div>


        </animated.div>   
    </div>
    );
}
import { 
    animated, 
    useSpring, 
} from '@react-spring/web';

import { useEffect } from 'react';
import useStore from '../stores/store';

import '../styles/Feedback.css';

import { 
    ChevronLeftIcon,
} from "@radix-ui/react-icons";

declare global {
    interface Window {
        Tally?: {
            loadEmbeds: () => void;
        }
    }
}


// Create FeedbackDrawer as an object
export default function FeedbackDrawer() {

    const open = useStore((store) => store.feedbackOpen);
    const setFeedbackOpen = useStore((store) => store.setFeedbackOpen);

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

    const tallySrc = `https://tally.so/embed/${formId}?alignLeft=1&height=350`;


    // Animation styling we'll use on opening and closing of the drawer
    const [springs, api] = useSpring(() => ({
        from: {height: 150, width: 34, bottom: 200},
    }));


    // When the outer drawer is clicked, spring open / closed
    const handleClick = () => {

        // Do animation
        api.start({
            from: {height: 150, width: 34, bottom: 200},
            to: {height: 350, width: 300, bottom: 100},
            reverse: open,
        });

        // Perform toggle
        setFeedbackOpen(!open);
    }


    return (
    <div>
        {/* Outer box holding our feedback button and survey. This is the one that springs open and closed. */}
        <animated.div
            className='FeedbackBox'
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
        className='FeedbackButton'
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
            height={350}
            title={'Tally form'}
            style={{ border: 'none', padding: '0px 0px', }}
            />
        </div>

        {/* Close button to collapse drawer. Hidden until feedback drawer opened. */}
        <button 
            className="FeedbackCloseButton"
            onClick={handleClick} 
            style={{transform: open ? 'none' : 'translateX(40px)'}}
        > 
            <ChevronLeftIcon className="FeedbackChevron" />     
        </button>


        </animated.div>   
    </div>
    );
}
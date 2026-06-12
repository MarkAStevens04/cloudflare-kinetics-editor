// This is the "SIMULATE" button, and the little popup when you click the sides of the button.
// It uses MUI for LineCharts.

import { 
    animated, 
    useSpring, 
} from '@react-spring/web';

import React from 'react';

import { LineChart } from '@mui/x-charts/LineChart';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useStore from '../stores/store';

import { 
    ChevronDownIcon
} from "@radix-ui/react-icons";

import '../styles/index.css';
import '../styles/Simulation.css';


function SimulationDrawer() {

    const open = useStore((store) => store.simDrawerOpen);
    const simStatus = useStore((store) => store.simulationStatus);
    const data = useStore((store) => store.simulationData);
    const speciesInfo = useStore((store) => store.visualNodes);

    const setSimDrawerOpen = useStore((store) => store.setSimDrawerOpen);
    const onSimulate = useStore((store) => store.fetchSimulationData);

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const chartTheme = createTheme({ palette: { mode: prefersDark ? 'dark' : 'light' } });

    const [springs, api] = useSpring(() => ({
        from: { height: 90, width: 300 },
    }));

    const [rotateSpring, rotateApi] = useSpring(() => ({
        from: { rotate: 0, y: '0px' },
    }));

    const handleClick = () => {
        api.start({
            from: { height: 90, width: 300 },
            to: { height: 500, width: 500 },
            reverse: open,
        });

        rotateApi.start({
            from: { rotate: 0, y: '0px' },
            to: { rotate: 180, y: '2px' },
            reverse: open,
        });

        setSimDrawerOpen(!open);
    }

    const handleSimulate = (event: React.MouseEvent<HTMLButtonElement>) => { 
        event.stopPropagation();
        if (!open) {
            handleClick();
        }
        onSimulate();
    }

    const keyToLabel: { [key: string]: string } = speciesInfo.reduce(
        (acc, node) => ({ ...acc, [node.id]: node.data.label }), {}
    );

    const colors: { [key: string]: string } = speciesInfo.reduce(
        (acc, node) => ({ ...acc, [node.id]: node.data.color }), {}
    );

    // Border colors per state:
    // 0 = idle (gray), 1 = running (CSS animation handles color cycling),
    // 2 = complete (green), 3 = error (red), 4 = stale (gray, same as idle)
    const borderColor = (() => {
        if (simStatus === 1) {
            // Base color when running — CSS @keyframes animation overrides this
            return prefersDark ? 'rgba(192, 132, 252, 0.8)' : 'rgba(168, 85, 247, 0.8)';
        }
        if (simStatus === 2) {
            return prefersDark ? 'rgba(16, 235, 78, 0.7)' : 'rgba(16, 235, 78, 0.5)';
        }
        if (simStatus === 3) {
            return prefersDark ? 'rgba(255, 44, 44, 0.9)' : 'rgba(255, 44, 44, 0.7)';
        }
        // Idle (0) or stale (4): gray
        return prefersDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    })();

    // Add the --running modifier class so CSS can animate the border
    const drawerClass = `SimulationDrawer${simStatus === 1 ? ' SimulationDrawer--running' : ''}`;

    const buttonLabel = simStatus === 1 ? 'SIMULATING...' : 'SIMULATE';

    return (
    <div>
        <animated.div
            className={drawerClass}
            style={{
                position: 'fixed',
                top: 10,
                right: 10,
                borderRadius: 8,
                // When running, omit inline borderColor so CSS animation is free to cycle it
                borderColor: simStatus !== 1 ? borderColor : undefined,
                ...springs,
            }}
            onClick={handleClick}
        >
            <div>
            <button onClick={handleSimulate} className="SimulateButton">{buttonLabel}</button>
        
            <br />
            <br />
            <br />

            {open ? <ThemeProvider theme={chartTheme}> 
            <LineChart
                dataset={data}
                xAxis={[
                    { dataKey: 'time',
                        valueFormatter: (value: number) => value.toString(),
                        label: 'time',
                    },
                ]}
                yAxis={[{ width: 50, label: 'concentration' }]}
                series={Object.keys(keyToLabel).map((key) => ({
                    dataKey: key,
                    label: keyToLabel[key],
                    color: colors[key],
                    showMark: false,
                }))}
                height={300}
                width={500}
            />
            </ThemeProvider> : null}

            </div>
            <button 
                className="SimulationCloseButton" 
                onClick={handleClick} 
                style={{ borderColor: borderColor }} 
            > 
                <animated.div 
                    className="SimulationChevron" 
                    style={{ outline: '0px', ...rotateSpring }}
                > 
                    <ChevronDownIcon className="SimulationChevron" /> 
                </animated.div> 
            </button>

        </animated.div>   
    </div>
    );
}

export default React.memo(SimulationDrawer);
// function SimulationProgression({ steps = ['Double-Checking Values', 'Generating ODEs', 'Optimizing equations for speed'], open }: { steps?: string[]; open: boolean }) {

//     console.log('open: ', open);
//     const transitions = useTransition(open ? steps : [], {
//         from: { opacity: 0, x: '-50px' },
//         enter: { opacity: 1, x: '0px' },
//         leave: {opacity: 0, x: '50px' },
//         config: config.default,
//         trail: open ? 1000 / steps.length : 50 / steps.length,
//     });

//     return transitions((style, item) => 
//     item ? (
//         <animated.div style={style}>{item}</animated.div>
//     ) : null
// )


// }
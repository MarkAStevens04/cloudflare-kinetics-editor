// This is the "SIMULATE" button, and the little popup when you click the sides of the button.
// It uses MUI for LineCharts.

import { 
    animated, 
    useSpring, 
} from '@react-spring/web';

import React, { useState } from 'react';

import { LineChart } from '@mui/x-charts/LineChart';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useStore from '../stores/store';

import { 
    ChevronDownIcon,
    DownloadIcon
} from "@radix-ui/react-icons";

import '../styles/index.css';
import '../styles/Simulation.css';
import { TooltipContent, TooltipRoot, TooltipTrigger } from './Tooltips';


function SimulationDrawer() {

    const open = useStore((store) => store.simDrawerOpen);
    const simStatus = useStore((store) => store.simulationStatus);
    const data = useStore((store) => store.simulationData);
    const speciesInfo = useStore((store) => store.visualNodes);

    const setSimDrawerOpen = useStore((store) => store.setSimDrawerOpen);
    const onSimulate = useStore((store) => store.fetchSimulationData);

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const chartTheme = createTheme({ palette: { mode: prefersDark ? 'dark' : 'light' } });

    // Animation styling we'll use on opening and closing of the drawer
    const [springs, api] = useSpring(() => ({
        from: { height: 90, width: 300 },
    }));

    // Animation styling we'll use on rotating the chevron icon
    const [rotateSpring, rotateApi] = useSpring(() => ({
        from: { rotate: 0, y: '0px' },
    }));

    const [showCsvDownloadButton, setShowCsvDownloadButton] = useState(false);

    // When the outer drawer is clicked, spring open / closed
    const handleClick = () => {
        if (open) {
            setShowCsvDownloadButton(false);
        }

        // Do animation
        api.start({
            from: { height: 90, width: 300 },
            to: { height: 500, width: 500 },
            reverse: open,
            onRest: () => {
                if (!open) {
                    setShowCsvDownloadButton(true);
                }
            }
        });

        rotateApi.start({
            from: { rotate: 0, y: '0px' },
            to: { rotate: 180, y: '2px' },
            reverse: open,
        });

        setSimDrawerOpen(!open);
    }

    // What happens when we click the inner "Simulate" button
    const handleSimulate = (event: React.MouseEvent<HTMLButtonElement>) => { 
        event.stopPropagation(); // Prevent the click event from bubbling up to the parent div
        if (!open) {
            handleClick(); // Open the drawer if it's not already open
        }
        onSimulate(); // Outer call to run simulation
    }

    const handleCSVDownload = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        const headers = Object.keys(data[0]).map(key => keyToLabel[key] || key);
        const values = data.map(d => {
            return [...Object.keys(data[0]).map(key => String(d[key]))];
        });

        const concatArray = [headers].concat(values);
        const csv = concatArray.map(a => a.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        link.href = url;
        link.download = `simulate-data-${timestamp}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // Construct legend for line chart!
    // Tracks how we should display each reactant on the line chart
    const keyToLabel: { [key: string]: string } = speciesInfo.reduce(
        (acc, node) => ({ ...acc, [node.id]: node.data.label }), {}
    );

    // Tracks the colors we use on the line chart
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
    const drawerClass = `SimulationDrawer ${simStatus === 1 ? 'SimulationDrawer--running' : ''}`;
    const closeButtonClass = `SimulationCloseButton ${simStatus === 1 ? ' SimulationCloseButton--running' : ''}`;

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
            
                {/* Big SIMULATE button */}
                <button onClick={handleSimulate} className="SimulateButton">{buttonLabel}</button>
            
                <br />
                <br />
                <br />

                {/* Our line chart */}
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
                    </ThemeProvider> : null
                }
            </div>

            {/* CSV Download button */}
            {showCsvDownloadButton ? 
                <TooltipRoot>
                    <TooltipTrigger>
                        <button
                            style={{
                                position: "absolute",
                                right: "8px",
                                bottom: "8px",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                padding: "4px 8px",
                                ...(simStatus === 2
                                    ? { backgroundColor: "green" }
                                    : { backgroundColor: "#cccccc", color: "#888888"}
                                )
                            }}
                            disabled={ simStatus === 2 ? false : true }
                            onClick={handleCSVDownload}
                        >
                            <DownloadIcon />Download CSV
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        { simStatus === 2 
                            ? "Download the simulation data in CSV format!"
                            : "No data to download yet!"
                        }
                    </TooltipContent>
                </TooltipRoot>
                : null
            }

            {/* Close button to collapse drawer. */}
            <button 
                className={closeButtonClass}
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

import { 
    animated, 
    useSpring, 
} from '@react-spring/web';

// import {type AppNode } from './ProteinNode';

import React from 'react';

import { LineChart } from '@mui/x-charts/LineChart';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useStore from './store';

import { 
    ChevronDownIcon

} from "@radix-ui/react-icons";

import './index.css';
import './styles/Simulation.css';
// Could use visx or Chart.js (https://www.chartjs.org/docs/latest/getting-started/usage.html)
// Instead using MUI's LineCharts! https://mui.com/x/react-charts/line-demo/#BiaxialLineChart


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
        from: {height: 90, width: 300},
    }));

    // Animation styling we'll use on opening and closing of the drawer
    const [rotateSpring, rotateApi] = useSpring(() => ({
        from: {rotate: 0, y: '0px'},
    }));


    // When the outer drawer is clicked, spring open / closed
    const handleClick = () => {

        // Do animation
        api.start({
            from: {height: 90, width: 300},
            to: {height: 500, width: 500},
            reverse: open,
        });

        rotateApi.start({
            from: {rotate: 0, y: '0px'},
            to: {rotate: 180, y: '2px'},
            reverse: open,
        });

        // Perform toggle
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

    // Construct legend for line chart!
    // Tracks how we should display each reactant on the line chart
    const keyToLabel: { [key: string]: string } = speciesInfo.reduce(
        (acc, node) => ({ ...acc, [node.id]: node.data.label }), {}
    );

    // Tracks the colors we use on the line chart
    const colors: { [key: string]: string } = speciesInfo.reduce(
        (acc, node) => ({ ...acc, [node.id]: node.data.color }), {}
    );

    const lightBorderColor = simStatus === 0 ? 'rgba(0, 0, 0, 0.1)' : simStatus === 1 ? 'rgba(255, 0, 221, 0.3)' : simStatus === 2 ? 'rgba(16, 235, 78, 0.5)' : 'rgba(255, 44, 44, 0.7)';
    const darkBorderColor = simStatus === 0 ? 'rgba(255, 255, 255, 0.1)' : simStatus === 1 ? 'rgba(255, 0, 221, 0.3)' : simStatus === 2 ? 'rgba(16, 235, 78, 0.5)' : 'rgba(255, 44, 44, 0.7)';

    const borderColor = prefersDark ? darkBorderColor : lightBorderColor;

    return (
    <div>
        <animated.div
            className='SimulationDrawer'
            style={{
                position: 'fixed',
                top: 10,
                right: 10,
                // background: '#000000',
                borderRadius: 8,
                borderColor: borderColor,
                // overflow: 'hidden',
                ...springs,
            }}
            onClick={handleClick}
        >
            <div>
            <button onClick={handleSimulate} className="simulate-button" >{simStatus === 0 ? 'SIMULATE' : simStatus === 1 ? 'SIMULATING...' : 'SIMULATE'}</button>
        
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
                yAxis={[{ width: 50, label: 'concentration', }]}
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

            

            {/* <div className="SimulationProgression" >
                <SimulationProgression open={open} />
            </div> */}

        </div>
        <button className="SimulationCloseButton" onClick={handleClick} style={{ borderColor: borderColor }} > <animated.div className="SimulationChevron" style={{ outline: '0px', ...rotateSpring}}> <ChevronDownIcon className="SimulationChevron" /> </animated.div> </button>

        </animated.div>   

        

    </div>

    )

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
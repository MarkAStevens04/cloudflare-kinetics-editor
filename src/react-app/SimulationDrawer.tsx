import { 
    animated, 
    useSpring, 
    useTransition,
    config,
} from '@react-spring/web';

import {type AppNode } from './ProteinNode';

import React from 'react';

import { LineChart } from '@mui/x-charts/LineChart';
// Could use visx or Chart.js (https://www.chartjs.org/docs/latest/getting-started/usage.html)
// Instead using MUI's LineCharts! https://mui.com/x/react-charts/line-demo/#BiaxialLineChart


// Create type for our simulation drawer
export type SimulationDrawerProps = {
    open: boolean;
    onToggle: () => void;
    onSimulate: () => void;
    data: Array<Record<string, number>>;
    speciesInfo: Array<AppNode>;
}


// Create SimulationDrawer as an object
function SimulationDrawer({
    open,
    onToggle,
    onSimulate,
    data,
    speciesInfo,
}:  SimulationDrawerProps
) {

    // Animation styling we'll use on opening and closing of the drawer
    const [springs, api] = useSpring(() => ({
        from: {height: 90, width: 300},
    }));


    // When the outer drawer is clicked, spring open / closed
    const handleClick = () => {

        // Do animation
        api.start({
            from: {height: 90, width: 300},
            to: {height: 500, width: 500},
            reverse: open,
        });

        // Perform toggle
        onToggle();
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

    console.log('Drawer re-render!');

    return (
    <div>
        <animated.div
            className='sim-box'
            style={{
                position: 'fixed',
                top: 10,
                right: 10,
                // background: '#000000',
                borderRadius: 8,
                overflow: 'hidden',
                ...springs,
            }}
            onClick={handleClick}
        >

            <button onClick={handleSimulate} className="action-button" >SIMULATE</button>
        
            <br />
            <br />
            <br />


            {open ? <LineChart
            dataset={data}
            xAxis={[
                { dataKey: 'time',
                    valueFormatter: (value: number) => value.toString()
                },
            ]}
            yAxis={[{ width: 50 }]}
            series={Object.keys(keyToLabel).map((key) => ({
                dataKey: key,
                label: keyToLabel[key],
                color: colors[key],
                showMark: false,
            }))}

            height={300}
            width={500}
            // skipAnimation
            // slotProps={{tooltip: {trigger: 'item'}}}
            // axisHighlight={{x: 'none', y: 'none'}}
            /> : null}

            <div className="sim-progression" >
                <SimulationProgression open={open} />
            </div>

        </animated.div>   

        

    </div>

    )

}


export default React.memo(SimulationDrawer);



function SimulationProgression({ steps = ['Double-Checking Values', 'Generating ODEs', 'Optimizing equations for speed'], open }: { steps?: string[]; open: boolean }) {

    console.log('open: ', open);
    const transitions = useTransition(open ? steps : [], {
        from: { opacity: 0, x: '-50px' },
        enter: { opacity: 1, x: '0px' },
        leave: {opacity: 0, x: '50px' },
        config: config.default,
        trail: open ? 1000 / steps.length : 50 / steps.length,
    });

    return transitions((style, item) => 
    item ? (
        <animated.div style={style}>{item}</animated.div>
    ) : null
)


}
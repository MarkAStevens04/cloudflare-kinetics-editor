import { 
    animated, 
    useSpring, 
    useTransition,
    config,
} from '@react-spring/web';

import React from 'react';

import { useMemo } from 'react';

import { LineChart } from '@mui/x-charts/LineChart';
// Could use visx or Chart.js (https://www.chartjs.org/docs/latest/getting-started/usage.html)
// Instead using MUI's LineCharts! https://mui.com/x/react-charts/line-demo/#BiaxialLineChart

export type SimulationDrawerProps = {
    open: boolean;
    onToggle: () => void;
    onSimulate: () => void;
    data: Array<Record<string, number>>;
}


function SimulationDrawer({
    open,
    onToggle,
    onSimulate,
    data,
}:  SimulationDrawerProps
) {

    const [springs, api] = useSpring(() => ({
        from: {height: 100, width: 300},
    }));

    const handleClick = () => {
        api.start({
            from: {height: 100, width: 300},
            to: {height: 500, width: 500},
            reverse: open,
        });

        onToggle();
    }

    const handleSimulate = (event: React.MouseEvent<HTMLButtonElement>) => { 
        event.stopPropagation(); // Prevent the click event from bubbling up to the parent div
        onSimulate();
    }

    // Grab our data in a format that LineChart likes
    // const updated_data = useMemo(() => {
    //     console.log('re-render!');
        
    //     return Object.entries(data)
    //     .filter(([key]) => key !== 'times')
    //     .map(([label, values]) => ({
    //         id: label,
    //         label: label,
    //         data: values,
    //     }));
        
    // }, [data]);

    // const timestamps = useMemo(() => data.times ?? [], [data]);

    // Extract timestamps
    // const timestamps = data['times'] || [];
    // console.log('updated data: ', updated_data);
    // console.log('timestamps: ', timestamps);

    console.log('big re-render!');

    const keyToLabel: { [key: string]: string } = {
        Invertase: 'Invertase',
        Sucrose: 'Sucrose',
        Invertase_Sucrose_Complex: 'Invertase_Sucrose_Complex',
        Glucose: 'Glucose',
        Fructose: 'Fructose',
    };




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
            {/* <p className='action-button'>SIMULATE</p> */}

            <button onClick={handleSimulate} className="action-button" >SIMULATE</button>

            <div className="sim-progression" style={{color: 'rgba(0, 0, 0, 0.6)', padding: 20, fontSize: 18}}>
                <SimulationProgression open={open} />
            </div>



            <LineChart
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
                showMark: true,
            }))}

            height={500}
            width={500}
            // skipAnimation
            // slotProps={{tooltip: {trigger: 'item'}}}
            // axisHighlight={{x: 'none', y: 'none'}}
        />

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
        trail: open ? 400 / steps.length : 50 / steps.length,
    });

    return transitions((style, item) => 
    item ? (
        <animated.div style={style}>{item}</animated.div>
    ) : null
)


}
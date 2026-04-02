import { 
    animated, 
    useSpring, 
    useTransition,
    config,
} from '@react-spring/web';
import { RxnDrawerProps } from './Drawer';

export type SimulationDrawerProps = {
    open: boolean;
    onToggle: () => void;
}


export default function SimulationDrawer({
    open,
    onToggle,
}:  SimulationDrawerProps
) {

    const [springs, api] = useSpring(() => ({
        from: {height: 100},
    }));

    const handleClick = () => {
        api.start({
            from: {height: 100},
            to: {height: 1000},
            reverse: open,
        });

        onToggle();
    }


// style={{position: 'fixed', top: 10, right: 10}}

    return (
        <animated.div
            className='sim-box'
            style={{
                position: 'fixed',
                top: 10,
                right: 10,
                width: 300,
                // background: '#000000',
                borderRadius: 8,
                overflow: 'hidden',
                ...springs,
            }}
            onClick={handleClick}
        >
            <p className='action-button'>SIMULATE</p>

            <div className="sim-progression" style={{color: 'rgba(0, 0, 0, 0.6)', padding: 20, fontSize: 18}}>
                <SimulationProgression open={open} />
            </div>

        </animated.div>   


    )

}




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

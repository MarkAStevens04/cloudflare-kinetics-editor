// Arrow function () => handleClick(0) kind of stores a function call!
  // It says "Hey, I know you're expecting a function here. I have the function
  // that I want you to call, and I can run it myself. So just let me know when you want
  // to run that function, and I'll do it for you." The parent board is taking over this
  // child's job because the parent knows the right parameters to give it, wheras the
  // child wouldn't be able to provide ANY parameters to the function.
import { ChangeEvent, useRef, useEffect, useMemo, ReactNode } from 'react';
import { animated, useTransition } from '@react-spring/web';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import './index.css';

// For math live input
import "mathlive";
import { MathfieldElement } from 'mathlive';
import useStore from './store';

type rateEditorProps = {
    currentRateLaw?: string;
    onRateChange: (event: ChangeEvent<HTMLInputElement>) => void;
    sources: string[];
    targets: string[];
}
function ScrollArea({ children, orientation = 'vertical', className = '', style = {} }: {
  children: ReactNode;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <ScrollAreaPrimitive.Root className={`scroll-area-root ${className}`} style={style}>
      <ScrollAreaPrimitive.Viewport className="scroll-area-viewport">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar className="scroll-area-scrollbar" orientation={orientation}>
        <ScrollAreaPrimitive.Thumb className="scroll-area-thumb" />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Corner className="scroll-area-corner" />
    </ScrollAreaPrimitive.Root>
  );
}

export default function RxnDrawer() {

    const edge = useStore((store) => store.reactions.find((e) => e.id === store.selectedEdge)) || { id: '', label: '', sources: [''], targets: [''], rate_law: '' };
    const nodes = useStore((store) => store.species);

    const open = useStore((store) => store.rxnDrawerOpen);
    const setRxnDrawerOpen = useStore((store) => store.setRxnDrawerOpen);

    const updateRateLaw = useStore((store) => store.updateRateLaw);
    const updateInitialConcentration = useStore((store) => store.updateInitialConcentration);
    const updateRateName = useStore((store) => store.updateRateName);

    const RxnID = edge.id;
    const rateLaw = edge.rate_law;

    const onRNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateRateName(RxnID, event.target.value);
    }
    
    const onRateChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateRateLaw(RxnID, event.target.value);
    }

    const reactantNodes = useMemo(() => {
        return (edge.sources || [])
            .map((srcId) => nodes.find((node) => node.id === srcId))
            .filter((node): node is Exclude<typeof node, undefined> => !!node);
    }, [edge.sources, nodes]);

    const productNodes = useMemo(() => {
        return (edge.targets || [])
            .map((tgtId) => nodes.find((node) => node.id === tgtId))
            .filter((node): node is Exclude<typeof node, undefined> => !!node);
    }, [edge.targets, nodes]);

    const transitions = useTransition(open ? [true] : [],  {
        from: { x: -240, opacity: 0 },
        enter: { x: 0, opacity: 1},
        leave: { x: -240, opacity: 0 },
        config: { tension: 220, friction: 24 },
    });

    // Allows user to start moving screen immediately after closing drawer.
    const pointerEvents = open ? 'auto' : 'none';

    return transitions((style, item) =>
        item ? (
            <>
                {/* Closes when you click out of the drawer, but prevents moving around the screen. */}
                <animated.div 
                    className="drawer-dimmer"
                    onClick={() => setRxnDrawerOpen(false)}
                    style={{
                        pointerEvents: pointerEvents,
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.1)',
                        opacity: style.opacity,
                    }}
                />
                

                <animated.div
                    className="drawer"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: 400,
                        height: '100vh',
                        background: 'white',
                        borderRight: "1px solid #ddd",
                        boxShadow: "0 0 20px rgba(0, 0, 0, 0.12)",
                        transform: style.x.to((x) => `translate3d(${x}px, 0, 0)`),
                        opacity: style.opacity,
                        overflowY: 'auto'
                    }}
                > 
                <br /> <br />

                {/* Edit reaction name */}
                <div className="species-text" style={{padding: '0.2em 0px', top: '20px'}}>
                    <input 
                        className="drawer-name-input"
                        placeholder="Reaction Name"
                        value={edge.label}
                        onChange={onRNameChange}
                    />
                </div>

                <br />
                <div className="drawer-reaction-diagram" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>

                    {/* Reactants List */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                        <p style={{ margin: '0 0 8px 0', fontSize: '0.8em', fontWeight: 600, color: 'rgba(0,0,0,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Reactants</p>
                        <ScrollArea style={{ maxHeight: '180px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
                                {reactantNodes.map((sNode) => (
                                    <div key={sNode.id} className="species-container" style={{ backgroundColor: sNode.color }}>
                                        <div className="species-container-header" style={{ fontSize: '1.1em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={sNode.label}>
                                            {sNode.label}
                                        </div>
                                        <hr style={{
                                            border: 'none',
                                            height: '1px',
                                            backgroundColor: 'rgba(0, 0, 0, 0.15)',
                                            margin: '0px 0',
                                            padding: 0,
                                        }} />
                                        <div className="species-params" style={{ fontSize: '0.85em', display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '4px 0' }}>     
                                            <span>Initial:</span>
                                            <input 
                                                className="item species-param-input"
                                                placeholder="0" 
                                                value={sNode.initial === '' ? '' : sNode.initial}
                                                onChange={(e) => updateInitialConcentration(sNode.id, e.target.value)}
                                                style={{ width: '50px', margin: 0, padding: '2px 4px' }}
                                            />
                                        </div>    
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                    {/* Arrow connecting reactants to products */}
                    <p style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        margin: '0 4px',
                        alignSelf: 'center',
                        color: 'rgba(0,0,0,0.4)',
                    }}>→</p>

                    {/* Products List */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                        <p style={{ margin: '0 0 8px 0', fontSize: '0.8em', fontWeight: 600, color: 'rgba(0,0,0,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Products</p>
                        <ScrollArea style={{ maxHeight: '180px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
                                {productNodes.map((tNode) => (
                                    <div key={tNode.id} className="species-container" style={{ backgroundColor: tNode.color }}>
                                        <div className="species-container-header" style={{ fontSize: '1.1em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={tNode.label}>
                                            {tNode.label}
                                        </div>
                                        <hr style={{
                                            border: 'none',
                                            height: '1px',
                                            backgroundColor: 'rgba(0, 0, 0, 0.15)',
                                            margin: '0px 0',
                                            padding: 0,
                                        }} />
                                        <div className="species-params" style={{ fontSize: '0.85em', display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '4px 0' }}>     
                                            <span>Initial:</span>
                                            <input 
                                                className="item species-param-input"
                                                placeholder="0" 
                                                value={tNode.initial === '' ? '' : tNode.initial}
                                                onChange={(e) => updateInitialConcentration(tNode.id, e.target.value)}
                                                style={{ width: '50px', margin: 0, padding: '2px 4px' }}
                                            />
                                        </div>    
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                </div>
                <br />
                <hr />

                {/* Edit Rate Laws */}
                <RateEditor 
                    currentRateLaw={rateLaw} 
                    onRateChange={onRateChange} 
                    sources={edge.sources} 
                    targets={edge.targets} 
                />

                </animated.div>
            </>
        ) : null
    );

}

function RateEditor({
    currentRateLaw,
    onRateChange,
    sources,
    targets,
}: rateEditorProps) {
    const nodes = useStore((store) => store.species);

    const mfRef = useRef<MathfieldElement>(null); 

    // When our input is changed
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        onRateChange(event);
    }

    // When a variable button is clicked
    const onButton = (buttonID: string) => {
        mfRef.current?.insert('\\obj'+ buttonID + '{\\text{' + buttonID + '}}', {
            insertionMode: "replaceSelection",
            selectionMode: "item",
            focus: true,
        });
        console.log('Macros: ' + mfRef.current?.macros);
    }

    // When a parameter button is clicked
    const onParameter = (paramName: string) => {
        mfRef.current?.insert(paramName, {
            insertionMode: "replaceSelection",
            focus: true,
        });
    }

    // Prioritize species involved in the reaction (reactants or products)
    const sortedNodes = useMemo(() => {
        const involvedIds = new Set([...sources, ...targets]);
        const involved = nodes.filter(node => involvedIds.has(node.id));
        const others = nodes.filter(node => !involvedIds.has(node.id));
        return [...involved, ...others];
    }, [nodes, sources, targets]);

    const macros = useMemo(() => {
        return Object.fromEntries(
            // Very strange code here. We have args: 1 so that the parameter we add (\text{buttonID}) stays in the latex
            // We render our text as node.data.label, and in the backend, keep our latex as \objNXXX{\text{nXXX}}
            nodes.map((node) => ['obj' + node.id, {args: 1, def: '\\text{' + node.label + '}'}])
        );

    }, [nodes]);

    useEffect(() => {
        const mf = mfRef.current;
        if (!mf) return;

        // Teach mathlive about our custom macros
        mf.macros = {
            ...mf.macros,
            ...macros,
        };

        mf.smartFence = false;
    }, [macros]);

    return (
    <div className='rate-editor'>   
        <p className='drawer-text'>Rate Law</p>

        <math-field
                id="formula"
                ref={mfRef}
                onInput={onChange}
                style={{
                    display: 'block',
                }}
            >
                {currentRateLaw}
            </math-field>


        <br />
        <p className='drawer-text' style={{fontSize: '0.8em', margin: '10px 0px',}}>Add species to rate law</p>

        {/* Add Reactant Handles (Horizontal Scrollable) */}
        <ScrollArea orientation="horizontal" style={{ width: '95%', margin: '0px 0px' }}>
            <div style={{ display: 'flex', gap: '6px', paddingBottom: '6px' }}>
                {sortedNodes.map((node) => (
                    <div key={node.id}>
                        <p className='autofill-species-box' 
                        style={{backgroundColor: node.color, whiteSpace: 'nowrap'}}
                        onClick={() => onButton(node.id)}
                        >
                            {node.label}
                        </p>
                    </div>
                ))}
            </div>
        </ScrollArea>

        <br />
        <p className='drawer-text' style={{fontSize: '0.8em', margin: '10px 0px',}}>Add parameter to rate law</p>

        {/* Add Parameter Handles (Horizontal Scrollable) */}
        <ScrollArea orientation="horizontal" style={{ width: '95%', margin: '0px 0px' }}>
            <div style={{ display: 'flex', gap: '6px', paddingBottom: '6px' }}>
                {['k', 'k_f', 'k_r', 'V_{max}', 'K_m'].map((param) => (
                    <div key={param}>
                        <p className='autofill-species-box' 
                        style={{backgroundColor: '#e2e8f0', whiteSpace: 'nowrap'}}
                        onClick={() => onParameter(param)}
                        >
                            {param.replace('_{max}', 'max').replace('_', '')}
                        </p>
                    </div>
                ))}
            </div>
        </ScrollArea>

    </div>
    );

}
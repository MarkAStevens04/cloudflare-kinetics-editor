// Wrappers for dropdown areas! 
// LeftItem: Any item you'd like! This will be on the left side.
// RightItem: Any item you'd like! This will be on the right side.
// open: Whether the collapsible item is currently open
// setOpen: Function we call to change the state of open. Normally just hook this up to something in useState like updateOpen.
// finishAnimation: *Optional* function that will be called when the open/close animation is finished. Can be used to delay rendering of items until after animation is done, to avoid lag.

import * as React from "react";
// import classnames from "classnames";
import { animated, useSpring } from '@react-spring/web';
import { TriangleDownIcon } from "@radix-ui/react-icons";

// type TooltipRootProps = React.PropsWithChildren<{ className?: string } & React.ComponentPropsWithoutRef<typeof Tooltip.Root>>;
type CollapsibleProps = {LeftItem: React.ReactNode; RightItem: React.ReactNode; open: boolean; setOpen: (open: boolean) => void; finishAnimation?: () => void } & React.PropsWithChildren<{ className?: string } & React.ComponentPropsWithoutRef<'div'>>;


const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(

    ({ LeftItem, RightItem, open, setOpen, finishAnimation, children, ...props }) => {

         // Animation styling we'll use on opening and closing of the UniProt Search Drawer
        const [springs, api] = useSpring(() => ({
            from: { height: 0 },
        }));

        // Animation styling we'll use for rotating the arrow
        const [rotateSpring, rotateApi] = useSpring(() => ({
                from: { rotate: 0 },
            }));

        
        const performOpen = () => {
            setOpen(!open);

            // Do animation
            api.start({
                from: { height: 0 },
                to: { height: 200 },
                reverse: open,
                onRest: () => {
                    finishAnimation?.();
                }
            });

            // Do rotation animation
            rotateApi.start({
                from: { rotate: 0 },
                to: { rotate: 180 },
                reverse: open,
            });
        }

        return (
            <div {...props}>
                <div style={{display: 'flex', padding: '2px 0px', justifyContent: 'space-between'}}>

                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                        <div>{LeftItem}</div>
                        <div style={{margin: '0px'}}>{RightItem}</div>
                    </div>

                    <animated.div style={{...rotateSpring}}>
                        <TriangleDownIcon onClick={performOpen} />
                    </animated.div>
                </div>

                <animated.div style={{...springs, overflow: 'hidden'}}>
                    {children}
                </animated.div>
            </div>
        );
    },
);

export { Collapsible };
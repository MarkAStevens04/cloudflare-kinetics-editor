// Wrappers for dropdown areas! See ProteinNode.tsx with the UniProt Search Drawer for example implementation.

import * as React from "react";
// import classnames from "classnames";
import { animated, useSpring } from '@react-spring/web';
import { TriangleDownIcon } from "@radix-ui/react-icons";

// type TooltipRootProps = React.PropsWithChildren<{ className?: string } & React.ComponentPropsWithoutRef<typeof Tooltip.Root>>;
type CollapsibleProps = {LeftText: React.ReactNode; RightText: React.ReactNode; open: boolean; setOpen: (open: boolean) => void } & React.PropsWithChildren<{ className?: string } & React.ComponentPropsWithoutRef<'div'>>;


const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(

    ({ LeftText, RightText, open, setOpen, children, ...props }) => {

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

                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '200px'}}>
                        <div>{LeftText}</div>
                        <div>{RightText}</div>
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
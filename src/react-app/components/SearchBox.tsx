// Generic search box component
import { ScrollArea } from 'radix-ui'; // Scroll Area for UniProt search results.


import * as React from "react";
import { Tooltip } from "radix-ui";
import classnames from "classnames";

type SearchBoxRootProps = React.PropsWithChildren<{ className?: string } & React.ComponentPropsWithoutRef<typeof Tooltip.Root>>;
type SearchBoxContentProps = React.PropsWithChildren<{ className?: string } & React.ComponentPropsWithoutRef<typeof Tooltip.Content>>;
type SearchBoxTriggerProps = React.PropsWithChildren<{ className?: string } & React.ComponentPropsWithoutRef<typeof Tooltip.Trigger>>;

const SearchBoxRoot = React.forwardRef<HTMLDivElement, SearchBoxRootProps>(
    ({ children, ...props }) => {
        return (
            <Tooltip.Provider>
                <Tooltip.Root
                delayDuration={200}
                {...props}
                >
                {children}
                    
                </Tooltip.Root>
            </Tooltip.Provider>
        );
    },
);

 
const SearchBoxContent = React.forwardRef<HTMLDivElement, SearchBoxContentProps>(
    ({ children, className, ...props }, forwardedRef) => {
        return (
            <Tooltip.Portal>
                <Tooltip.Content 
                    sideOffset={5} 
                    className={classnames("TooltipContent", className)}
                    {...props}
                    ref={forwardedRef}
                >
                    <div className="TooltipTitle">Info:</div>
                    {children}
                    <Tooltip.Arrow className="TooltipArrow" />
                </Tooltip.Content>
            </Tooltip.Portal>
        );
    },
);

const SearchBoxTrigger = React.forwardRef<HTMLDivElement, SearchBoxTriggerProps>(
    ({ children, className, ...props }) => {
        return (
            <Tooltip.Trigger asChild
                {...props}
                style={{...props.style, cursor: 'pointer'}}
                className={classnames("TooltipTrigger", className)}
            >
                {children}
            </Tooltip.Trigger>
        );
    },
);

export { SearchBoxRoot, SearchBoxContent, SearchBoxTrigger };
// Wrappers for tooltips to make them a little cleaner and nicer to use!

import * as React from "react";
import { Tooltip } from "radix-ui";
import classnames from "classnames";

type TooltipRootProps = React.PropsWithChildren<{ className?: string } & React.ComponentPropsWithoutRef<typeof Tooltip.Root>>;
type TooltipContentProps = React.PropsWithChildren<{ className?: string } & React.ComponentPropsWithoutRef<typeof Tooltip.Content>>;
type TooltipTriggerProps = React.PropsWithChildren<{ className?: string } & React.ComponentPropsWithoutRef<typeof Tooltip.Trigger>>;

const TooltipRoot = React.forwardRef<HTMLDivElement, TooltipRootProps>(
// const TooltipRoot = React.forwardRef(
	({ children, className, ...props }, forwardedRef) => {
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

 
const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
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

const TooltipTrigger = React.forwardRef<HTMLDivElement, TooltipTriggerProps>(
	({ children, className, ...props }, forwardedRef) => {
		return (
			<Tooltip.Trigger asChild
				{...props}
				ref={forwardedRef}
                style={{...props.style, cursor: 'pointer'}}
			>
				{children}
			</Tooltip.Trigger>
		);
	},
);

export { TooltipRoot, TooltipContent, TooltipTrigger };
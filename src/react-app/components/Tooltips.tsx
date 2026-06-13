// Wrappers for tooltips to make them a little cleaner and nicer to use!

import * as React from "react";
import { Tooltip } from "radix-ui";
import classnames from "classnames";

type TooltipRootProps = React.PropsWithChildren<{ className?: string } & React.ComponentPropsWithoutRef<typeof Tooltip.Root>>;
type TooltipContentProps = React.PropsWithChildren<{ className?: string } & React.ComponentPropsWithoutRef<typeof Tooltip.Content>>;
type TooltipTriggerProps = React.PropsWithChildren<{ className?: string } & React.ComponentPropsWithoutRef<typeof Tooltip.Trigger>>;
type TextTooltipProps = {display: React.ReactNode; side: 'top' | 'right' | 'bottom' | 'left'} & React.ComponentPropsWithoutRef<typeof Tooltip.Root>;


const TooltipRoot = React.forwardRef<HTMLDivElement, TooltipRootProps>(
// const TooltipRoot = React.forwardRef(
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

const TextTooltip = React.forwardRef<HTMLDivElement, TextTooltipProps>(
	({ display, side = 'top', children, ...props }) => {
		return (
			<TooltipRoot {...props} >
				<TooltipTrigger>{children}</TooltipTrigger>
				<TooltipContent side={side}>{display}</TooltipContent>
			</TooltipRoot>
		);
	},
); 

export { TooltipRoot, TooltipContent, TooltipTrigger, TextTooltip };
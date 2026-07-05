// Generic search box component
import { ScrollArea } from 'radix-ui'; // Scroll Area for UniProt search results.


import * as React from "react";
import { TextTooltip } from "./Tooltips";
import classnames from "classnames";

import '../styles/SearchBox.css'; // Import relevant CSS styles
import '../styles/radix.css'; // Import relevant CSS styles



type SearchBoxProps = {
    items: T[]; // Results to render. Will be passed as properties to renderItem.
    renderItem: (item: T | undefined, index: number) => React.ReactNode; // Renders one row. Receives 'undefined' while loading.

    skeletonCount?: number; // Number of skeletons to render while loading. Default is 4.

    maxItems?: number; // Maximum number of items to render. Default is Infinity.

    searchPlaceholder: string; // The text in the searchbar before a user has input anything
    searchValue: string; // The text currently in the searchbar
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Callback for when the search input changes
    render: boolean; 
    loading: boolean; // Whether the search is currently loading or not

    // SkeletonResult?: React.ReactNode; // Custom skeleton display result 
} & React.PropsWithChildren<{ className?: string } & React.ComponentPropsWithoutRef<'div'>>;

const SearchBox = React.forwardRef<HTMLDivElement, SearchBoxProps>(
    ({ 
        items,
        renderItem,
        skeletonCount = 4,
        maxItems = Infinity,

        searchPlaceholder, 
        searchValue, 
        onSearchChange, 
        render, 
        loading,
        // SearchResults,
        // SkeletonResult,
        children, 
        ...props 
    }) => {

        const visible = maxItems === Infinity ? items : items.slice(0, maxItems); // Return slice of item array that's up to the max number of items. 

        let body: React.ReactNode;

        if (loading || !render) {
            body = Array.from({ length: skeletonCount }, (_, i) => (
                <React.Fragment key = {`sk-${i}`} >
                    {renderItem(undefined, i)}
                </React.Fragment>
            ));
        } else  if (visible.length > 0) {
            body = visible.map((item, i) => (
                <React.Fragment key={`${i}`}>{renderItem(item, i)}</React.Fragment>
            ))
        } else {
            body = <div className="SearchBoxEmptyText"> No results found. <br /> Try another query! </div>;
        }

        return (
            <ScrollArea.Root className="nodrag nopan nowheel ScrollAreaRoot">
                <input
                    // className="item species-param-input NodeRowItem"
                    className="SearchBoxInput"
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={(e) => onSearchChange(e)}
                />

                <ScrollArea.Viewport className="ScrollAreaViewport">

                    {/* Skeleton context to show the shimmer effect when search is loading */}
                    <SkeletonCtx.Provider value={loading || !render}> 
                        <div className="SearchContentContainer" >
                            {body}
                        </div>
                    </SkeletonCtx.Provider>

                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                    className="ScrollAreaScrollbar"
                    orientation="vertical"
                >
                    {/* "Thumb" is the little dark gray part on the scrollbar! */}
                    <ScrollArea.Thumb className="ScrollAreaThumb" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner className="ScrollAreaCorner" />
            </ScrollArea.Root>
        );
    },
);


// Skeleton context so components can track whether we should be shimmering or not.
const SkeletonCtx = React.createContext(false);

// Wrapper that turns a div into a shimmer effect.
function Shimmer({ 
    children,
    className,
    width = '6em', // Fake text to fill the shimmer with. Makes shimmer same size as text that will eventually fill it.
    ...props
}: {
    children?: React.ReactNode;
    className?: string;
    width?: string;
} & React.ComponentPropsWithoutRef<'div'>) {
    const loading = React.useContext(SkeletonCtx);

    // Shimmer when the box is loading OR when this field has no data yet.
    if (loading || children === null || children === '') {
        return (
            <span 
                className={classnames("Shimmer", className)}
                aria-hidden
                style={{ width, ...props.style }} // width optional; falls back to CSS default
                {...props}
            >
                {/* Keeps line height good even with nothing inside. */}
                &nbsp;
                
                <TextTooltip display="Loading..." />
                {children}
            </span>
        );
    }
    return <span className={className} {...props}>{children}</span>;
}

export { SearchBox, Shimmer };
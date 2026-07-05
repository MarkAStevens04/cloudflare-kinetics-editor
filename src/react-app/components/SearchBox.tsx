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
                    className="ScrollSearchBar"
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={(e) => onSearchChange(e)}
                />

                <ScrollArea.Viewport className="ScrollAreaViewport">
                    <SkeletonCtx.Provider value={loading}>
                    {/* {<div className=" SearchBoxContainer" >
                        {loading || !render
                            ? Array.from({ length: 4}).map((_, i) => SkeletonResult || <DefaultSkeletonChip key={i} />)
                            : !SearchResults || SearchResults.length === 0
                                ? <div className="SearchBoxEmptyText"> No results found. <br /> Try another query! </div>
                            : SearchResults?.map((result, index) => (
                                <div key={index} className="SearchBoxResult">
                                    {result}
                                </div>
                            ))
                        }

                    </div>} */}
                    <div className="SearchBoxContainer" >
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


function DefaultSkeletonChip() {

    const x = "Fake text";
    return (
        <>
            <div className="SearchChip" >
                <div className="SearchChipTop" >
                    <div className="SearchChipName SearchSkeleton"> {x} </div>
                    <div className="SearchRing SearchSkeleton" style={{borderColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '50%',}} />
                </div>
                <div className="SearchChipBottom" >
                    <div className="SearchChipId SearchSkeleton"> {x.substring(0, 6)} </div> 
                    <div className="SearchChipOrganism SearchSkeleton"> {x} </div>
                </div>
            </div>
        
        </>
    )
}

const SkeletonCtx = React.createContext(false);

function Shimmer({ 
    children,
    className,
    ...props
}: {
    children?: React.ReactNode;
    className?: string;
} & React.ComponentPropsWithoutRef<'div'>) {
    const loading = React.useContext(SkeletonCtx);
    if (loading) {
        console.log('we do be shimmering!');
    }

    // Shimmer when the box is loading OR when this field has no data yet.
    if (loading || children === null || children === '') {
        return (
            <span 
                className={classnames("Shimmer", className)}
                aria-hidden
                {...props}
            >
                <TextTooltip display="Loading..." />
                {children}
            </span>
        );
    }
    return <span className={className} {...props}>{children}</span>;
}

export { SearchBox, Shimmer };
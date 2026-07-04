// Generic search box component
import { ScrollArea } from 'radix-ui'; // Scroll Area for UniProt search results.


import * as React from "react";
import { Tooltip } from "radix-ui";
import classnames from "classnames";

import '../styles/SearchBox.css'; // Import relevant CSS styles

type SearchBoxContentProps = React.PropsWithChildren<{ className?: string } & React.ComponentPropsWithoutRef<typeof Tooltip.Content>>;
type SearchBoxTriggerProps = React.PropsWithChildren<{ className?: string } & React.ComponentPropsWithoutRef<typeof Tooltip.Trigger>>;

type SearchBoxProps = {
    searchPlaceholder: string; // The text in the searchbar before a user has input anything
    searchValue: string; // The text currently in the searchbar
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Callback for when the search input changes
    render: boolean; 
    loading: boolean; // Whether the search is currently loading or not
    setOpen: (open: boolean) => void; 
    finishAnimation?: () => void;
    SearchResults?: Array<React.ReactNode>; // Array of search results to display 
    SkeletonResult?: React.ReactNode; // Custom skeleton display result 
} & React.PropsWithChildren<{ className?: string } & React.ComponentPropsWithoutRef<'div'>>;

const SearchBox = React.forwardRef<HTMLDivElement, SearchBoxProps>(
    ({ 
        searchPlaceholder, 
        searchValue, 
        onSearchChange, 
        render, 
        loading,
        SearchResults,
        SkeletonResult,
        children, 
        ...props 
    }) => {
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
                    <div className=" SearchBoxContainer" >
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

                    </div>
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

export { SearchBox };
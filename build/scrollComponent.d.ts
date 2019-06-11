import { Component } from "react";
/**
 * A class that sends offset events when the user scrolls
 */
export declare class ScrollComponent extends Component<{
    children: (scroll: number, offset: number) => any;
    [prop: string]: any;
    elementScroll?: boolean;
}, {
    offset: number;
    scroll: number;
}> {
    state: {
        offset: number;
        scroll: number;
    };
    /**
     * Adds the scroll listener to the element
     * @param element The element to add the listener to
     */
    addScrollListener(element: HTMLElement): void;
    /**
     * Update the offset whenever a scroll occurs
     */
    handleScroll: (event: any) => void;
    /**
     * Add a scroll listener to the body if not using element scroll
     */
    componentWillMount(): void;
    /**
     * Remove a scroll listener to the body if not using element scroll
     */
    componentWillUnmount(): void;
    /**
     * Renders the chiildren with the scroll callback
     */
    render(): JSX.Element;
}

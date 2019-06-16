import React, {Component} from "react";

/**
 * A class that sends offset events when the user scrolls
 */
export class ScrollComponent extends Component<
    {
        children: (scroll: number, offset: number) => any;
        [prop: string]: any;
        elementScroll?: boolean;
    },
    {offset: number; scroll: number}
> {
    // Set the initial state
    state = {offset: 0, scroll: 0};

    /**
     * Adds the scroll listener to the element
     * @param element The element to add the listener to
     */
    addScrollListener(element: HTMLElement) {
        if (element && element.onscroll != this.handleScroll) {
            element.onscroll = this.handleScroll;

            // Set the initial state
            this.setState({
                offset: element.getBoundingClientRect().top,
                scroll: element.scrollTop,
            });
        }
    }

    /**
     * Update the offset whenever a scroll occurs
     */
    handleScroll = event => {
        this.setState(() => ({
            scroll: event.srcElement.body
                ? event.srcElement.body.scrollTop
                : event.srcElement.scrollTop,
        }));
    };

    /**
     * Add a scroll listener to the body if not using element scroll
     */
    componentWillMount() {
        if (!this.props.elementScroll)
            document.addEventListener("scroll", this.handleScroll, {passive: false});
    }

    /**
     * Remove a scroll listener to the body if not using element scroll
     */
    componentWillUnmount() {
        if (!this.props.elementScroll)
            document.removeEventListener("scroll", this.handleScroll);
    }

    /**
     * Renders the chiildren with the scroll callback
     */
    render(): JSX.Element {
        const {children, elementScroll, ...rest} = this.props;

        // If element scroll is set to true, define a custom element for the scrolling
        if (elementScroll) {
            return (
                <div
                    {...rest}
                    style={{height: "100%", overflow: "auto", position: "relative"}}
                    ref={element => this.addScrollListener(element)}>
                    {children(this.state.scroll, this.state.offset)}
                </div>
            );
        } else {
            // Otherwise use the body element
            return children(this.state.scroll, this.state.offset);
        }
    }
}

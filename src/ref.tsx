import React, {Component} from "react";

// The reference element itself
type Ref = ((props: {children?: any; [key: string]: any}) => JSX.Element) & {
    element: Element;
    y: number;
    x: number;
    height: number;
    width: number;
    shape: {width: number; height: number};
    update: () => void; // Updates the variables
    refresh: () => void; // Refreshes elements dependent on variables
};

// Updates the reference's data
const updateData = (ref: Ref, element: Element): void => {
    ref.element = element;
    const rect = element.getBoundingClientRect();
    // Assign the useful properties to the Reference, and rerender the elements
    ref.x = rect.left;
    ref.y = rect.top;
    ref.width = rect.width;
    ref.height = rect.height;
    ref.shape = {width: ref.width, height: ref.height};
};

// Function for creating a reference that calls update when it's data is changed
export const createRef = refresh => {
    const self = (({children, ...rest}) => (
        <div
            {...rest}
            style={{display: "inline-block", ...rest.style}}
            ref={element => {
                if (!self.element) {
                    updateData(self, element);
                    self.refresh();
                }
            }}>
            {children instanceof Function ? children(refresh) : children}
        </div>
    )) as Ref;
    self.x = 0;
    self.y = 0;
    self.width = 0;
    self.height = 0;
    self.shape = {width: 0, height: 0};
    self.update = () => self.element && updateData(self, self.element);
    self.refresh = refresh;
    return self;
};

// Element for maintaing a state with references
export class RefCreator extends Component<
    {children: (refs: Ref[]) => JSX.Element; count?: number},
    {refs: Ref[]}
> {
    constructor(props) {
        super(props);

        // Create the references
        const refs = [];

        // Specify the refresh method that should be called when ref data changes
        const refresh = () => this.setState({refs: refs.map(ref => ref)});

        // Create the actual refs
        for (let i = 0; i < (props.count || 1); i++) {
            refs.push(createRef(refresh));
        }
        this.state = {refs};
    }

    render() {
        const {children} = this.props;
        let {refs} = this.state;

        // Update the sizes on a redraw
        refs.forEach(Ref => {
            Ref.update();
        });

        // Provide refs to child elements
        return children(refs);
    }
}

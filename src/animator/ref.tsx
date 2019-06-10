import React, {useState} from "react";

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
export const RefCreator = ({
    children,
    count = 1,
}: {
    children: (refs: Ref[]) => JSX.Element;
    count?: number;
}) => {
    let [refs, setRefs] = useState([]);

    // Create the references if required
    if (refs.length != count) {
        refs = [];
        // Specify the refresh method that should be called when ref data changes
        const refresh = () => setRefs(refs.map(ref => ref));

        // Create the actual refs
        for (let i = 0; i < count; i++) {
            refs.push(createRef(refresh));
        }
        setRefs(refs);
    } else {
        // Update the refresh references and attributes
        const refresh = () => setRefs(refs.map(ref => ref));
        refs.forEach(Ref => {
            Ref.refresh = refresh;
            Ref.update();
        });
    }

    // Provide refs to child elements
    return children(refs);
};

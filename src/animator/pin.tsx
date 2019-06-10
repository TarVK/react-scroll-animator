import React from "react";
import {AnimationContext, NormalizedSection} from "./animator";

// A element to pin data onto the page at certain sectins, or move the data at the specified sections
export const Pin = ({
    sections,
    children,
    ...rest
}: {
    sections: {[propName: string]: number};
    children: any;
    [prop: string]: any;
}): JSX.Element => (
    <AnimationContext.Consumer>
        {c => {
            // Retrieve the last started prop, or if there is no such prop, the first unstarted
            const data = Object.keys(sections).reduce(
                (best, propName) => {
                    const section = c.getSection(propName);
                    const per = sections[propName];
                    if (
                        best.per != 0 && per != 0
                            ? section.index > best.section.index
                            : section.index < best.section.index
                    ) {
                        return {
                            section,
                            per,
                        };
                    }
                    return best;
                },
                {section: {index: Infinity} as NormalizedSection, per: 0}
            );

            // Extract the data
            const section = data.section;
            const per = data.per;

            // Determine the possible locations
            const scroll = section.range.start + section.offset;
            const start = section.range.start + c.pageOffset;
            const end = section.range.end + c.pageOffset;

            // Apply styling for location based on percentage
            return (
                <div
                    {...rest}
                    style={
                        per < 1 && per > 0
                            ? {
                                  position: "absolute",
                                  top: scroll,
                                  ...rest.style,
                              }
                            : {
                                  position: "fixed",
                                  top: per == 0 ? start : end,
                                  ...rest.style,
                              }
                    }>
                    {children}
                </div>
            );
        }}
    </AnimationContext.Consumer>
);

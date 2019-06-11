import React from "react";
import {Component, createContext} from "react";
import {ScrollComponent} from "./scrollComponent";

// A contect for the animator, which pins can use to get data of a section
export const AnimationContext = createContext({
    getSection: (() => undefined) as (name: string) => NormalizedSection,
    pageOffset: 0,
});

// Define some types that will be used by the animator
type Range = number | [number, number?];
type Section =
    | {
          offset?: number;
          [name: string]: Range;
      }
    | {[index: number]: Section[]};
export type NormalizedSection = {
    name: string;
    range: {
        start: number;
        end: number;
        delta: number;
    };
    offset: number;
    index: number;
};

type SectionValues<S extends Section[]> = S extends {[st: string]: Range}[]
    ? {[P in Exclude<keyof S[any], "offset">]: number}
    : {[section: string]: number};

// The main animator class that will just sequence your variables
export class Animator<S extends Section[]> extends Component<
    {
        sections: S;
        progress?: number;
        elementScroll?: boolean; //Whether to use a scrollbar of a custom element
        children: (
            // The actual section variables
            sections: SectionValues<S>,

            // The sections such that their value only increments and never decrements
            sectionsOnce: SectionValues<S>,

            // The total progress
            totalProgress: number
        ) => JSX.Element;
    },
    {}
> {
    // Stores the normalized version of the sections
    protected normalizedSections: NormalizedSection[];

    // The range of the animation; The number of pixels that can be scrolled from start to finish
    protected range: number;

    // The offset the element has from the top of the page
    protected pageOffset: number;

    // Stores the biggest vallue that any of the sections have had so far
    protected largestSectionValues: SectionValues<S> = {} as any;

    /**
     * Get the peroperty data corresponding to a property name
     * @param name The name of the property
     * @returns The property defined under the given name
     */
    getSection = (name: string) => {
        return this.normalizedSections.find(prop => prop.name == name);
    };

    /**
     * Normalizes a single section
     * @param section THe section to be normalized
     * @param offset The offset of the section
     * @param index THe index of the section
     * @returns The normalized section
     */
    normalizeSection(
        section: Section,
        offset: number,
        index: number
    ): {section: NormalizedSection; offset: number} {
        // If the argument is a normal section, get its name and data
        const sectionName = Object.keys(section)[0];
        const data = section[sectionName];

        // Normalize the data, based on range type
        const start =
            typeof data[0] == "number"
                ? data[0]
                : typeof data == "number"
                ? data
                : document.body.clientHeight;
        const end = data[1] || 0;
        const delta = start - end;

        // Determine the offset of this section
        if ("offset" in section) offset += section.offset;

        // Create the section
        return {
            section: {
                name: sectionName,
                index: index,
                offset: offset,
                range: {
                    start,
                    end,
                    delta,
                },
            },
            offset: offset + delta,
        };
    }

    /**
     * Normalizes parallel sections (an array of section arrays) into a flat array of normalized sections
     * @param sections The parallel sections to normalize
     * @param offset The initial offset of the sections being considered
     * @param index The initial index of the sections being considered
     * @returns THe normalized flattened sections
     */
    normalizeParallelSections(
        sections: Section[][],
        offset: number,
        index: number
    ): {sections: NormalizedSection[]; range: number} {
        // Go through each of the parallel section lists
        const normSubSections = sections.reduce(
            (normSubSections, section) => {
                // Compute the normal sections of the sub sections
                const subSections = this.normalizeSections(section, offset);

                // Compute the range to be the maximum of the ranges
                const range = Math.max(subSections.range, normSubSections.range);

                // Go through each of the sub sections and insert them into the sections
                const sections = normSubSections.sections;
                subSections.sections.forEach(subSection => {
                    // Insert the section into the correct location to be ordered by  offset
                    for (let i = 0; i < sections.length; i++) {
                        if (subSection.offset < sections[i].offset) {
                            sections.splice(i, 0, subSection);
                            return;
                        }
                    }
                    sections.push(subSection);
                });

                return {
                    sections: sections,
                    range: range,
                };
            },
            {sections: [], range: 0} as {
                sections: NormalizedSection[];
                range: number;
            }
        );

        // Correct the indices
        normSubSections.sections.forEach((section, i) => {
            section.index = i + index;
        });

        // Return the data
        return normSubSections;
    }

    /**
     * Creates a normalized version of the props, considering simple sections and parallel sections
     * @param sections The sections to normalize
     * @param offset The initial offset of the sections being considered
     * @returns The normalized sections
     */
    normalizeSections(
        sections: Section[],
        offset: number = 0
    ): {sections: NormalizedSection[]; range: number} {
        return sections.reduce(
            (
                normSections: {
                    sections: NormalizedSection[];
                    range: number;
                },
                section
            ) => {
                // Check whether this is a nested section sequence
                if (section instanceof Array) {
                    // Return sections augmented by sub sections
                    const normSubSections = this.normalizeParallelSections(
                        section,
                        normSections.range,
                        normSections.sections.length
                    );

                    // Augment the current data and return it
                    return {
                        sections: normSections.sections.concat(normSubSections.sections),
                        range: normSubSections.range,
                    };
                } else {
                    const normSection = this.normalizeSection(
                        section,
                        normSections.range,
                        normSections.sections.length
                    );

                    // Augment the sections list with the new section
                    normSections.sections.push(normSection.section);

                    // Return the new data
                    return {
                        sections: normSections.sections,
                        range: normSection.offset,
                    };
                }
            },
            {sections: [], range: offset}
        ) as any;
    }

    /**
     * Retrieves the actual section values given some pprogress
     * @param progress The progress between 0 and the range
     * @returns The scetions with their values
     */
    getSectionValues(progress: number): SectionValues<S> {
        // Compute the values for each of the sections
        const sections = {};
        this.normalizedSections.forEach(
            section =>
                (sections[section.name] = Math.min(
                    1,
                    Math.max(0, progress - section.offset) / section.range.delta
                ))
        );

        // Update the largest section values
        const values = this.largestSectionValues as any;
        Object.keys(sections).forEach(section => {
            values[section] = Math.max(values[section] || 0, sections[section]);
        });

        // Return the sections
        return sections as any;
    }

    /**
     * Renders the animations content
     * @param progress The progress (between 0 and total range)
     * @returns The rendered jsx element
     */
    renderContent(progress: number) {
        const sections = this.getSectionValues(progress);

        return (
            <AnimationContext.Provider
                value={{getSection: this.getSection, pageOffset: this.pageOffset}}>
                <div
                    style={{
                        height: this.range + document.body.clientHeight,
                        width: "100%",
                        display: "inline-block",
                    }}>
                    {this.props.children(
                        sections as any,
                        this.largestSectionValues,
                        progress / this.range
                    )}
                </div>
            </AnimationContext.Provider>
        );
    }

    /**
     * Renders the entirety of the animation contents
     */
    render() {
        const {sections, range} = this.normalizeSections(this.props.sections);
        this.normalizedSections = sections;
        this.range = range;

        if (this.props.progress == undefined) {
            // Render the content with the progress based on the scroll position
            return (
                <ScrollComponent elementScroll={this.props.elementScroll}>
                    {(progress, offset) => {
                        this.pageOffset = offset;
                        return this.renderContent(progress);
                    }}
                </ScrollComponent>
            );
        } else {
            // Render the the content based on progress pased as a prop
            return this.renderContent(this.props.progress * this.range || 0);
        }
    }
}

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
    endIndex: number;
};

type SectionValues<S extends Section[]> = S extends {[st: string]: Range}[]
    ? {[P in Exclude<keyof S[any], "offset">]: number}
    : {[section: string]: number};

type AnimatorProps<S extends Section[]> = {
    sections: S;
    progress?: number;
    elementScroll?: boolean; //Whether to use a scrollbar of a custom element
    children: (
        // The actual section variables
        sections: SectionValues<S>,

        // The sections such that their value only increments and never decrements
        sectionsOnce: SectionValues<S>,

        // The offsets of all the sections
        offsets: {[section: string]: number},

        // The total progress
        totalProgress: number
    ) => JSX.Element;
};
type AnimatorState<S extends Section[]> = {};

// The main animator class that will just sequence your variables
export class Animator<S extends Section[]> extends Component<
    AnimatorProps<S>,
    AnimatorState<S>
> {
    // Stores the normalized version of the sections
    protected normalizedSections: NormalizedSection[];

    // Stores the normalized version of the sections, in order of the scroll pos that they end
    protected normalizedSectionsSortedEnd: NormalizedSection[];

    // Stores an object with all the offsets of the sections
    protected offsets: {[section: string]: number};

    // The range of the animation; The number of pixels that can be scrolled from start to finish
    protected range: number;

    // The offset the element has from the top of the page
    protected pageOffset: number;

    // Stores the biggest vallue that any of the sections have had so far
    protected largestSectionValues: SectionValues<S> = {} as any;

    // Cache the current section values
    protected sectionValues: SectionValues<S> = {} as any;

    // The index of the section(s) that is currently changed between 0 and 1
    protected changingIndex: number[] = [0];

    /**
     * Get the peroperty data corresponding to a property name
     * @param name The name of the property
     * @returns The property defined under the given name
     */
    getSection = (name: string) => {
        return this.normalizedSections.find(prop => prop.name == name);
    };

    /**
     * Creates an animator component
     * @param props The peroperties of thie element
     */
    constructor(props: AnimatorProps<S>) {
        super(props);

        // Calculate the normmalized sections
        this.updateSections(props.sections);

        // Store the initial section values
        this.sectionValues = this.getInitialSectionValues();
        this.largestSectionValues = this.getInitialSectionValues();
    }

    /**
     * Updates the section variables of the component
     * @param inpSections The sections that were passed
     */
    updateSections(inpSections: S) {
        const {sections, sectionsEnd, range} = this.normalizeSections(inpSections);
        this.normalizedSections = sections;
        this.normalizedSectionsSortedEnd = sectionsEnd;
        this.range = range;

        // Update the offsets
        this.offsets = {} as any;
        this.normalizedSections.forEach(section => {
            (this.offsets as any)[section.name + "Offset"] = section.offset;
        });
    }

    /**
     * Updates the normalized sections if the scetions changed
     * @param nextProps The new props that will be received
     * @param nextState The new state that will be set
     */
    shouldComponentUpdate(
        nextProps: AnimatorProps<S>,
        nextState: AnimatorState<S>
    ): boolean {
        if (nextProps.sections != this.props.sections) {
            this.updateSections(nextProps.sections);
        }
        return true;
    }

    /**
     * Inserts the section into the sections array, keeping the array sorted
     * @param sections The sorted array to insert the section into
     * @param sectionsEnd The sorted array based on the end to insert the section into
     * @param section The section to add into the array
     */
    insertSorted(
        sections: NormalizedSection[],
        sectionsEnd: NormalizedSection[],
        section: NormalizedSection
    ): void {
        insert: {
            // Insert the section into the correct location to be ordered by offset
            for (let i = 0; i < sections.length; i++) {
                if (section.offset < sections[i].offset) {
                    sections.splice(i, 0, section);
                    break insert;
                }
            }
            sections.push(section);
        }
        insertEnd: {
            // Insert the section into the correct location to be ordered by offset + range
            for (let i = 0; i < sectionsEnd.length; i++) {
                if (
                    section.offset + section.range.delta <
                    sectionsEnd[i].offset + sectionsEnd[i].range.delta
                ) {
                    sectionsEnd.splice(i, 0, section);
                    break insertEnd;
                }
            }
            sectionsEnd.push(section);
        }
    }

    /**
     * Normalizes a single section
     * @param section THe section to be normalized
     * @param offset The offset of the section
     * @returns The normalized section
     */
    normalizeSection(
        section: Section,
        offset: number
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
                index: 0,
                endIndex: 0,
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
     * @param normSections The normalized sections to insert to
     * @param normSectionsEnd The normalized sections sorted on the end to insert to
     * @param offset The initial offset of the sections being considered
     * @returns THe normalized flattened sections
     */
    normalizeParallelSections(
        sections: Section[][],
        normSections: NormalizedSection[],
        normSectionsEnd: NormalizedSection[],
        offset: number
    ): {sections: NormalizedSection[]; sectionsEnd: NormalizedSection[]; range: number} {
        // Go through each of the parallel section lists
        const normSubSections = sections.reduce(
            (normSubSections, section) => {
                // Compute the normal sections of the sub sections
                const subSections = this.normalizeSections(section, offset);

                // Compute the range to be the maximum of the ranges
                const range = Math.max(subSections.range, normSubSections.range);

                // Go through each of the sub sections and insert them into the sections
                const sections = normSubSections.sections;
                const sectionsEnd = normSubSections.sectionsEnd;
                subSections.sections.forEach(subSection => {
                    this.insertSorted(sections, sectionsEnd, subSection);
                });

                return {
                    sections,
                    sectionsEnd,
                    range,
                };
            },
            {sections: normSections, sectionsEnd: normSectionsEnd, range: 0} as {
                sections: NormalizedSection[];
                sectionsEnd: NormalizedSection[];
                range: number;
            }
        );

        // Return the data
        return normSubSections as any;
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
    ): {sections: NormalizedSection[]; sectionsEnd: NormalizedSection[]; range: number} {
        const normSections = sections.reduce(
            (
                normSections: {
                    sections: NormalizedSection[];
                    sectionsEnd: NormalizedSection[];
                    range: number;
                },
                section
            ) => {
                // Check whether this is a nested section sequence
                if (section instanceof Array) {
                    // Return sections augmented by sub sections
                    const normSubSections = this.normalizeParallelSections(
                        section,
                        normSections.sections,
                        normSections.sectionsEnd,
                        normSections.range
                    );

                    // Augment the current data and return it
                    return normSubSections;
                } else {
                    const normSection = this.normalizeSection(
                        section,
                        normSections.range
                    );

                    // Augment the sections list with the new section
                    this.insertSorted(
                        normSections.sections,
                        normSections.sectionsEnd,
                        normSection.section
                    );

                    // Return the new data
                    return {
                        sections: normSections.sections,
                        sectionsEnd: normSections.sectionsEnd,
                        range: normSection.offset,
                    };
                }
            },
            {sections: [], sectionsEnd: [], range: offset}
        ) as any;

        // Update the indices of the sections
        normSections.sections.forEach((section, index) => {
            section.index = index;
        });
        normSections.sectionsEnd.forEach((section, index) => {
            section.endIndex = index;
        });

        return normSections;
    }

    /**
     * Retyrives the section values which are all initialized to 0
     * @returns The sections with value 0
     */
    getInitialSectionValues(): SectionValues<S> {
        const sections = {};
        this.normalizedSections.forEach(section => {
            sections[section.name] = 0;
        });
        return sections as any;
    }

    /**
     * Retrieves the actual section values given some pprogress
     * @param progress The progress between 0 and the range
     * @returns The sections with their values
     */
    updateSectionValues(progress: number): SectionValues<S> {
        // Compute the values for each of the sections
        for (let i = 0; i < this.changingIndex.length; i++) {
            const index = this.changingIndex[i];
            const section = this.normalizedSections[index];
            const sd = progress - section.offset;
            const delta = section.range.delta;
            const value = Math.min(1, Math.max(0, sd) / delta);

            // Update the value
            (this.sectionValues as any)[section.name] = value;

            // Store the maximum in max values
            if (value > this.largestSectionValues[section.name])
                (this.largestSectionValues as any)[section.name] = value;

            // Check if the previous animation should start
            let sec;
            const endIndex = section.endIndex;
            if (
                (sec = this.normalizedSectionsSortedEnd[endIndex - 1]) &&
                sec.offset + sec.range.delta > progress &&
                this.changingIndex.indexOf(sec.index) == -1
            )
                this.changingIndex.push(sec.index);

            // Check if the next animation should start
            if (
                (sec = this.normalizedSections[index + 1]) &&
                sec.offset < progress &&
                this.changingIndex.indexOf(index + 1) == -1
            )
                this.changingIndex.push(index + 1);

            // If the value hit the minimum, remove it if there are any other animations going
            if (sd < 0 && this.changingIndex.length > 1)
                this.changingIndex.splice(i--, 1);

            // If the value hit the maximum, remove it if there are any other animations going
            if (sd > delta && this.changingIndex.length > 1)
                this.changingIndex.splice(i--, 1);
        }

        // Return the sections
        return this.sectionValues;
    }

    /**
     * Renders the animations content
     * @param progress The progress (between 0 and total range)
     * @returns The rendered jsx element
     */
    renderContent(progress: number) {
        const sections = this.updateSectionValues(progress);

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
                        this.offsets,
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

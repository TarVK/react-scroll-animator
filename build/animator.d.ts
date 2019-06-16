import React from "react";
import { Component } from "react";
export declare const AnimationContext: React.Context<{
    getSection: (name: string) => NormalizedSection;
    pageOffset: number;
}>;
declare type Range = number | [number, number?];
declare type Section = {
    offset?: number;
    [name: string]: Range;
} | {
    [index: number]: Section[];
};
export declare type NormalizedSection = {
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
declare type SectionValues<S extends Section[]> = S extends {
    [st: string]: Range;
}[] ? {
    [P in Exclude<keyof S[any], "offset">]: number;
} : {
    [section: string]: number;
};
declare type AnimatorProps<S extends Section[]> = {
    sections: S;
    progress?: number;
    elementScroll?: boolean;
    children: (sections: SectionValues<S>, sectionsOnce: SectionValues<S>, offsets: {
        [section: string]: number;
    }, totalProgress: number) => JSX.Element;
};
declare type AnimatorState<S extends Section[]> = {};
export declare class Animator<S extends Section[]> extends Component<AnimatorProps<S>, AnimatorState<S>> {
    protected normalizedSections: NormalizedSection[];
    protected normalizedSectionsSortedEnd: NormalizedSection[];
    protected offsets: {
        [section: string]: number;
    };
    protected range: number;
    protected pageOffset: number;
    protected largestSectionValues: SectionValues<S>;
    protected sectionValues: SectionValues<S>;
    protected changingIndex: number[];
    /**
     * Get the peroperty data corresponding to a property name
     * @param name The name of the property
     * @returns The property defined under the given name
     */
    getSection: (name: string) => NormalizedSection;
    /**
     * Creates an animator component
     * @param props The peroperties of thie element
     */
    constructor(props: AnimatorProps<S>);
    /**
     * Updates the section variables of the component
     * @param inpSections The sections that were passed
     */
    updateSections(inpSections: S): void;
    /**
     * Updates the normalized sections if the scetions changed
     * @param nextProps The new props that will be received
     * @param nextState The new state that will be set
     */
    shouldComponentUpdate(nextProps: AnimatorProps<S>, nextState: AnimatorState<S>): boolean;
    /**
     * Inserts the section into the sections array, keeping the array sorted
     * @param sections The sorted array to insert the section into
     * @param sectionsEnd The sorted array based on the end to insert the section into
     * @param section The section to add into the array
     */
    insertSorted(sections: NormalizedSection[], sectionsEnd: NormalizedSection[], section: NormalizedSection): void;
    /**
     * Normalizes a single section
     * @param section THe section to be normalized
     * @param offset The offset of the section
     * @returns The normalized section
     */
    normalizeSection(section: Section, offset: number): {
        section: NormalizedSection;
        offset: number;
    };
    /**
     * Normalizes parallel sections (an array of section arrays) into a flat array of normalized sections
     * @param sections The parallel sections to normalize
     * @param normSections The normalized sections to insert to
     * @param normSectionsEnd The normalized sections sorted on the end to insert to
     * @param offset The initial offset of the sections being considered
     * @returns THe normalized flattened sections
     */
    normalizeParallelSections(sections: Section[][], normSections: NormalizedSection[], normSectionsEnd: NormalizedSection[], offset: number): {
        sections: NormalizedSection[];
        sectionsEnd: NormalizedSection[];
        range: number;
    };
    /**
     * Creates a normalized version of the props, considering simple sections and parallel sections
     * @param sections The sections to normalize
     * @param offset The initial offset of the sections being considered
     * @returns The normalized sections
     */
    normalizeSections(sections: Section[], offset?: number): {
        sections: NormalizedSection[];
        sectionsEnd: NormalizedSection[];
        range: number;
    };
    /**
     * Retyrives the section values which are all initialized to 0
     * @returns The sections with value 0
     */
    getInitialSectionValues(): SectionValues<S>;
    /**
     * Retrieves the actual section values given some pprogress
     * @param progress The progress between 0 and the range
     * @returns The sections with their values
     */
    updateSectionValues(progress: number): SectionValues<S>;
    /**
     * Renders the animations content
     * @param progress The progress (between 0 and total range)
     * @returns The rendered jsx element
     */
    renderContent(progress: number): JSX.Element;
    /**
     * Renders the entirety of the animation contents
     */
    render(): JSX.Element;
}
export {};

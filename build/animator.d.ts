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
};
declare type SectionValues<S extends Section[]> = S extends {
    [st: string]: Range;
}[] ? {
    [P in Exclude<keyof S[any], "offset">]: number;
} : {
    [section: string]: number;
};
export declare class Animator<S extends Section[]> extends Component<{
    sections: S;
    progress?: number;
    elementScroll?: boolean;
    children: (sections: SectionValues<S>, sectionsOnce: SectionValues<S>, totalProgress: number) => JSX.Element;
}, {}> {
    protected normalizedSections: NormalizedSection[];
    protected range: number;
    protected pageOffset: number;
    protected largestSectionValues: SectionValues<S>;
    /**
     * Get the peroperty data corresponding to a property name
     * @param name The name of the property
     * @returns The property defined under the given name
     */
    getSection: (name: string) => NormalizedSection;
    /**
     * Normalizes a single section
     * @param section THe section to be normalized
     * @param offset The offset of the section
     * @param index THe index of the section
     * @returns The normalized section
     */
    normalizeSection(section: Section, offset: number, index: number): {
        section: NormalizedSection;
        offset: number;
    };
    /**
     * Normalizes parallel sections (an array of section arrays) into a flat array of normalized sections
     * @param sections The parallel sections to normalize
     * @param offset The initial offset of the sections being considered
     * @param index The initial index of the sections being considered
     * @returns THe normalized flattened sections
     */
    normalizeParallelSections(sections: Section[][], offset: number, index: number): {
        sections: NormalizedSection[];
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
        range: number;
    };
    /**
     * Retrieves the actual section values given some pprogress
     * @param progress The progress between 0 and the range
     * @returns The scetions with their values
     */
    getSectionValues(progress: number): SectionValues<S>;
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

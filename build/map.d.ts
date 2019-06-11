import { EasingFunctions } from "./easing";
declare type Options = {
    digits?: number;
    easing?: keyof typeof EasingFunctions;
};
/**
 * Maps the per variable into a range
 * @param per THe fraction of the mapping
 * @param end The end value, start is assumed to be 0
 * @param options The options like easing and rounding
 * @returns The mapped value
 */
export declare function map(per: number, end: number, options?: Options): number;
/**
 * Maps the per variable into a range
 * @param per THe fraction of the mapping
 * @param start The start value
 * @param end The end value
 * @param options The options like easing and rounding
 * @returns The mapped value
 */
export declare function map(per: number, start: number, end: number, options?: Options): number;
export {};

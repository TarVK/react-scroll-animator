import {EasingFunctions} from "./easing";

type Options = {digits?: number; easing?: keyof typeof EasingFunctions};
/**
 * Maps the per variable into a range
 * @param per THe fraction of the mapping
 * @param end The end value, start is assumed to be 0
 * @param options The options like easing and rounding
 * @returns The mapped value
 */
export function map(per: number, end: number, options?: Options): number;
/**
 * Maps the per variable into a range
 * @param per THe fraction of the mapping
 * @param start The start value
 * @param end The end value
 * @param options The options like easing and rounding
 * @returns The mapped value
 */
export function map(per: number, start: number, end: number, options?: Options): number;
export function map(
    per: number,
    start: number,
    end?: number | Options,
    options?: Options
): number {
    // Normalize the arguments
    if (typeof end != "number") {
        options = end;
        end = start;
        start = 0;
    }
    if (!options) options = {};

    // Apply easing if specified
    if (options.easing) per = EasingFunctions[options.easing](per);

    // Calculate the value
    const delta = end - start;
    let val = per * delta + start;

    // Apply rounding if specified
    if (options.digits !== undefined) {
        const n = Math.pow(10, options.digits);
        val = Math.round(val * n) / n;
    }

    // return the value
    return val;
}

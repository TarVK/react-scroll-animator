/**
 * Picks the last value coming from a fraction that is not 1 yet
 * @param sections The progress values
 * @param values The possibly mapped progress values
 * @returns The latest value
 */
export declare function latest<S extends number[]>(sections: S, values: S): number;

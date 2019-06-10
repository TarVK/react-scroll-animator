/**
 * Picks the last value coming from a fraction that is not 1 yet
 * @param sections The progress values
 * @param values The possibly mapped progress values
 * @returns The latest value
 */
export function latest<S extends number[]>(sections: S, values: S): number {
    let index = sections.reduce((v, section) => v + (section == 1 ? 1 : 0), 0);
    if (index == sections.length) index--;

    // return the value
    return values[index];
}

/**
 * Picks the last value coming from a fraction that is not 1 yet
 * @param sections The progress values
 * @param values The possibly mapped progress values
 * @returns The latest value
 */
export function latest(sections, values) {
    var index = sections.reduce(function (v, section) { return v + (section == 1 ? 1 : 0); }, 0);
    if (index == sections.length)
        index--;
    // return the value
    return values[index];
}
//# sourceMappingURL=latest.js.map
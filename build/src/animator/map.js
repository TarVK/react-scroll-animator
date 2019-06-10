import { EasingFunctions } from "./easing";
export function map(per, start, end, options) {
    // Normalize the arguments
    if (typeof end != "number") {
        options = end;
        end = start;
        start = 0;
    }
    if (!options)
        options = {};
    // Apply easing if specified
    if (options.easing)
        per = EasingFunctions[options.easing](per);
    // Calculate the value
    var delta = end - start;
    var val = per * delta + start;
    // Apply rounding if specified
    if (options.digits !== undefined) {
        var n = Math.pow(10, options.digits);
        val = Math.round(val * n) / n;
    }
    // return the value
    return val;
}
//# sourceMappingURL=map.js.map
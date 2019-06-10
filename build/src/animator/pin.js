var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import { AnimationContext } from "./animator";
// A element to pin data onto the page at certain sectins, or move the data at the specified sections
export var Pin = function (_a) {
    var sections = _a.sections, children = _a.children, rest = __rest(_a, ["sections", "children"]);
    return (React.createElement(AnimationContext.Consumer, null, function (c) {
        // Retrieve the last started prop, or if there is no such prop, the first unstarted
        var data = Object.keys(sections).reduce(function (best, propName) {
            var section = c.getSection(propName);
            var per = sections[propName];
            if (best.per != 0 && per != 0
                ? section.index > best.section.index
                : section.index < best.section.index) {
                return {
                    section: section,
                    per: per,
                };
            }
            return best;
        }, { section: { index: Infinity }, per: 0 });
        // Extract the data
        var section = data.section;
        var per = data.per;
        // Determine the possible locations
        var scroll = section.range.start + section.offset;
        var start = section.range.start;
        var end = section.range.end;
        // Apply styling for location based on percentage
        return (React.createElement("div", __assign({}, rest, { style: per < 1 && per > 0
                ? __assign({ position: "absolute", top: scroll }, rest.style) : __assign({ position: "fixed", top: per == 0 ? start : end }, rest.style) }), children));
    }));
};
//# sourceMappingURL=pin.js.map
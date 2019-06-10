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
import React, { useState } from "react";
export var createRef = function (update) {
    var self = (function (_a) {
        var children = _a.children, rest = __rest(_a, ["children"]);
        return (React.createElement("div", __assign({}, rest, { style: __assign({ display: "inline-block" }, rest.style), ref: function (element) {
                if (!self.element) {
                    self.element = element;
                    var rect = element.getBoundingClientRect();
                    // Assign the useful properties to the Reference, and rerender the elements
                    self.x = rect.left;
                    self.y = rect.top;
                    self.width = rect.width;
                    self.height = rect.height;
                    self.update();
                }
            } }), children instanceof Function ? children(update) : children));
    });
    self.update = update;
    return self;
};
// Function for maintaing a state with references
export var RefCreator = function (_a) {
    var children = _a.children, _b = _a.count, count = _b === void 0 ? 1 : _b;
    var _c = useState([]), refs = _c[0], setRefs = _c[1];
    // Create the references if required
    if (refs.length != count) {
        refs = [];
        // Specify the update method that should be called when ref data changes
        var update = function () { return setRefs(refs.map(function (ref) { return ref; })); };
        // Create the actual refs
        for (var i = 0; i < count; i++) {
            refs.push(createRef(update));
        }
        setRefs(refs);
    }
    else {
        // Update the update references
        var update_1 = function () { return setRefs(refs.map(function (ref) { return ref; })); };
        refs.forEach(function (Ref) { return (Ref.update = update_1); });
    }
    // Provide refs to child elements
    return children(refs);
};
//# sourceMappingURL=ref.js.map
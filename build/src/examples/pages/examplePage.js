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
import React from "react";
import { Animator } from "../../animator/animator";
import { RefCreator, Pin } from "../../animator";
var centerStyle = {
    position: "relative",
    left: "50%",
    top: "50vh",
    transform: "translate(-50%, -50%)",
    display: "inline-block",
    opacity: 0,
};
var boxStyle = {
    width: 200,
    height: 500,
    display: "inline-block",
    backgroundColor: "cyan",
};
export var ExamplePage = function () { return (React.createElement("div", null,
    React.createElement(RefCreator, { count: 2 }, function (_a) {
        var RefLeft = _a[0], RefRight = _a[1];
        return console.log(RefLeft.y) || (React.createElement(Animator, { sections: [
                { $box1in: [, RefLeft.y] },
                { $box2in: [, RefRight.y] },
                { $test: 300 },
            ] }, function (_a) {
            var $box1in = _a.$box1in, $box2in = _a.$box2in;
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { style: centerStyle },
                    React.createElement(RefLeft, { style: { margin: 20 } },
                        React.createElement("div", { style: boxStyle })),
                    React.createElement(RefRight, { style: { margin: 20 } },
                        React.createElement("div", { style: boxStyle }))),
                React.createElement(Pin, { sections: { $box1in: $box1in } },
                    React.createElement("div", { style: __assign({}, boxStyle, { marginLeft: RefLeft.x }) })),
                React.createElement(Pin, { sections: { $box2in: $box2in } },
                    React.createElement("div", { style: __assign({}, boxStyle, { marginLeft: RefRight.x }) }))));
        }));
    }))); };
//# sourceMappingURL=examplePage.js.map
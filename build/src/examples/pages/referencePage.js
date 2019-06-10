import React from "react";
import { RefCreator } from "../../animator/ref";
export var ReferencePage = function () { return (React.createElement("div", null,
    React.createElement(RefCreator, null, function (_a) {
        var Ref = _a[0];
        return (React.createElement("div", null,
            React.createElement("div", { style: {
                    width: Ref.width,
                    height: Ref.height,
                    verticalAlign: "top",
                    display: "inline-block",
                    backgroundColor: "orange",
                } }, "Yes"),
            React.createElement(Ref, null,
                React.createElement("div", { style: {
                        display: "inline-block",
                        backgroundColor: "cyan",
                    } },
                    "Hello text",
                    React.createElement("br", null),
                    " test"))));
    }),
    React.createElement("div", { style: { marginTop: 100, paddingTop: 30, borderTop: "1px solid black" } },
        React.createElement(RefCreator, { count: 2 }, function (_a) {
            var Ref1 = _a[0], Ref2 = _a[1];
            return (React.createElement("div", null,
                React.createElement("div", { style: {
                        position: "absolute",
                        top: Ref2.y,
                        left: 100,
                        width: Ref1.width,
                        height: Ref1.height,
                        backgroundColor: "orange",
                    } }, "Yes"),
                React.createElement(Ref1, null,
                    React.createElement("div", { style: {
                            display: "inline-block",
                            backgroundColor: "cyan",
                        } },
                        "Hello",
                        React.createElement("br", null),
                        " test")),
                React.createElement(Ref2, { style: { display: "block" } },
                    React.createElement("div", { style: {
                            display: "inline-block",
                            backgroundColor: "pink",
                        } }, "Hello2"))));
        })))); };
//# sourceMappingURL=referencePage.js.map
import React from "react";
import { Animator } from "../../animator/animator";
import { Pin } from "../../animator/pin";
import { map } from "../../animator/map";
var text = "hello this is some super cool text that will appear";
export var PinPage = function () { return (React.createElement("div", null,
    React.createElement(Animator, { sections: [
            { $scrollIn: [document.body.clientHeight, document.body.clientHeight / 2] },
            { $text: 300 },
            { $scrollOut: [document.body.clientHeight / 2, -30] },
        ] }, function (_a) {
        var $scrollIn = _a.$scrollIn, $text = _a.$text, $scrollOut = _a.$scrollOut;
        return (React.createElement(React.Fragment, null,
            React.createElement(Pin, { sections: { $scrollIn: $scrollIn, $scrollOut: $scrollOut } },
                React.createElement("div", { style: { height: 20, backgroundColor: "orange", width: 400 } }, text.substring(0, map($text, text.length, { digits: 0 })))),
            React.createElement("div", { style: {
                    backgroundColor: "purple",
                    marginTop: document.body.clientHeight,
                    height: 20,
                } })));
    }))); };
//# sourceMappingURL=pinPage.js.map
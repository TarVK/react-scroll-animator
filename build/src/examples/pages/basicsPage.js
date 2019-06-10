import React from "react";
import { Animator } from "../../animator/animator";
import { map } from "../../animator/map";
var text = "hello this is some super cool text that will appear";
export var BasicsPage = function () { return (React.createElement("div", null,
    React.createElement(Animator, { sections: [{ $margin: 300 }, { $text: 200 }] }, function (_a) {
        var $margin = _a.$margin, $text = _a.$text;
        return (
        // Create the content to show, uusing the passed section variables whose values range from 0 to 1
        React.createElement("div", { style: {
                backgroundColor: "orange",
                position: "relative",
                top: 800,
                height: 20,
                // Use map to map the values from 0-200 and apply easing (argument 0 may be left out)
                marginLeft: map($margin, 0, 200, { easing: "easeInOutSin" }),
            } }, text.substring(0, map($text, text.length, { digits: 0 }))));
    }))); };
//# sourceMappingURL=basicsPage.js.map
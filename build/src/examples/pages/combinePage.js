import React from "react";
import { Animator } from "../../animator/animator";
import { map } from "../../animator/map";
import { latest } from "../../animator/latest";
var text = "hello this is some super cool text that will appear";
export var CombinePage = function () { return (React.createElement("div", null,
    React.createElement(Animator, { sections: [{ $left1: 400 }, { $text: 200 }, { $left2: 300 }] }, function (_a) {
        var $left1 = _a.$left1, $text = _a.$text, $left2 = _a.$left2;
        return (
        // Create the content to show, uusing the passed section variables whose values range from 0 to 1
        React.createElement("div", { style: {
                backgroundColor: "orange",
                position: "relative",
                top: 900,
                height: 20,
                // Use latest to pick the last section that's not 1 yet
                marginLeft: latest([$left1, $left2], [
                    map($left1, 200, { easing: "easeInElastic" }),
                    map($left2, 200, 400),
                ]),
            } }, text.substring(0, map($text, text.length, { digits: 0 }))));
    }))); };
//# sourceMappingURL=combinePage.js.map
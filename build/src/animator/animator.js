var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from "react";
import { Component, createContext } from "react";
import { Controller, Scene } from "react-scrollmagic";
// A contect for the animator, which pins can use to get data of a section
export var AnimationContext = createContext({
    getSection: (function () { return undefined; }),
});
// The main animator class that will just sequence your variables
var Animator = /** @class */ (function (_super) {
    __extends(Animator, _super);
    function Animator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Get the peroperty data corresponding to a property name
         * @param name The name of the property
         * @returns The property defined under the given name
         */
        _this.getSection = function (name) {
            return _this.normalizedSections.find(function (prop) { return prop.name == name; });
        };
        return _this;
    }
    /**
     * Creates a normalized vesion of the props, making use of registered targets
     */
    Animator.prototype.normalizeSections = function () {
        var sections = this.props.sections;
        var offset = 0;
        var index = 0;
        return sections.map(function (section) {
            var sectionName = Object.keys(section)[0];
            var data = section[sectionName];
            // Normalize the data, based on range type
            var start = typeof data[0] == "number"
                ? data[0]
                : typeof data == "number"
                    ? data
                    : document.body.clientHeight;
            var end = data[1] || 0;
            var delta = start - end;
            var oldOffset = offset;
            offset += delta;
            // Create the section
            return {
                name: sectionName,
                index: index++,
                offset: oldOffset,
                range: {
                    start: start,
                    end: end,
                    delta: delta,
                },
            };
        });
    };
    /**
     * Retrieves the total range of the given properties
     * @param props The normalized properties to base the range on
     * @returns The cumulative range of the properties
     */
    Animator.prototype.getRange = function (props) {
        return props.reduce(function (a, b) { return a + b.range.delta; }, 0);
    };
    /**
     * Renders the animations content
     * @param progress The progress (between 0 and total range)
     * @returns The rendered jsx element
     */
    Animator.prototype.renderContent = function (progress) {
        var props = {};
        this.normalizedSections.forEach(function (prop) {
            return (props[prop.name] = Math.min(1, Math.max(0, progress - prop.offset) / prop.range.delta));
        });
        return (React.createElement(AnimationContext.Provider, { value: { getSection: this.getSection } },
            React.createElement("div", { style: {
                    height: this.range + document.body.clientHeight,
                    width: "100%",
                    display: "inline-block",
                } }, this.props.children(props))));
    };
    /**
     * Renders the entirety of the animation contents
     */
    Animator.prototype.render = function () {
        var _this = this;
        this.normalizedSections = this.normalizeSections();
        this.range = this.getRange(this.normalizedSections);
        if (this.range != 0 && this.props.progress == undefined) {
            // Render the content with the progress based on the scroll position
            return (React.createElement(Controller, null,
                React.createElement(Scene, { duration: this.range }, function (progress) {
                    return _this.renderContent(progress * _this.range);
                })));
        }
        else {
            // Render the the cibtebt without the scroll animation as long as the range is 0
            return this.renderContent(this.props.progress || 0);
        }
    };
    return Animator;
}(Component));
export { Animator };
//# sourceMappingURL=animator.js.map
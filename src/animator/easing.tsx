/**
 * Src: https://gist.github.com/gre/1650294,
 *  https://gist.github.com/gre/1650294#gistcomment-1892122,
 *  https://gist.github.com/gre/1650294#gistcomment-1924831
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
export const EasingFunctions = {
    // no easing, no acceleration
    linear: function(t) {
        return t;
    },
    // accelerating from zero velocity
    easeInQuad: function(t) {
        return t * t;
    },
    // decelerating to zero velocity
    easeOutQuad: function(t) {
        return t * (2 - t);
    },
    // acceleration until halfway, then deceleration
    easeInOutQuad: function(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    // accelerating from zero velocity
    easeInCubic: function(t) {
        return t * t * t;
    },
    // decelerating to zero velocity
    easeOutCubic: function(t) {
        return --t * t * t + 1;
    },
    // acceleration until halfway, then deceleration
    easeInOutCubic: function(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    // accelerating from zero velocity
    easeInQuart: function(t) {
        return t * t * t * t;
    },
    // decelerating to zero velocity
    easeOutQuart: function(t) {
        return 1 - --t * t * t * t;
    },
    // acceleration until halfway, then deceleration
    easeInOutQuart: function(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    // accelerating from zero velocity
    easeInQuint: function(t) {
        return t * t * t * t * t;
    },
    // decelerating to zero velocity
    easeOutQuint: function(t) {
        return 1 + --t * t * t * t * t;
    },
    // acceleration until halfway, then deceleration
    easeInOutQuint: function(t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    },
    // elastic bounce effect at the beginning
    easeInElastic: function(t) {
        return t == 0 ? 0 : (0.04 - 0.04 / t) * Math.sin(25 * t) + 1;
    },
    // elastic bounce effect at the end
    easeOutElastic: function(t) {
        return t == 1 ? 1 : ((0.04 * t) / --t) * Math.sin(25 * t);
    },
    // elastic bounce effect at the beginning and end
    easeInOutElastic: function(t) {
        return t == 0
            ? 0
            : t == 1
            ? 1
            : (t -= 0.5) < 0
            ? (0.02 + 0.01 / t) * Math.sin(50 * t)
            : (0.02 - 0.01 / t) * Math.sin(50 * t) + 1;
    },
    easeInSin: function(t) {
        return 1 + Math.sin((Math.PI / 2) * t - Math.PI / 2);
    },
    easeOutSin: function(t) {
        return Math.sin((Math.PI / 2) * t);
    },
    easeInOutSin: function(t) {
        return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
    },
};

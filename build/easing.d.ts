/**
 * Src: https://gist.github.com/gre/1650294,
 *  https://gist.github.com/gre/1650294#gistcomment-1892122,
 *  https://gist.github.com/gre/1650294#gistcomment-1924831
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
export declare const EasingFunctions: {
    linear: (t: any) => any;
    easeInQuad: (t: any) => number;
    easeOutQuad: (t: any) => number;
    easeInOutQuad: (t: any) => number;
    easeInCubic: (t: any) => number;
    easeOutCubic: (t: any) => number;
    easeInOutCubic: (t: any) => number;
    easeInQuart: (t: any) => number;
    easeOutQuart: (t: any) => number;
    easeInOutQuart: (t: any) => number;
    easeInQuint: (t: any) => number;
    easeOutQuint: (t: any) => number;
    easeInOutQuint: (t: any) => number;
    easeInElastic: (t: any) => number;
    easeOutElastic: (t: any) => number;
    easeInOutElastic: (t: any) => number;
    easeInSin: (t: any) => number;
    easeOutSin: (t: any) => number;
    easeInOutSin: (t: any) => number;
};

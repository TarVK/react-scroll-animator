import { Component } from "react";
declare type Ref = ((props: {
    children?: any;
    [key: string]: any;
}) => JSX.Element) & {
    element: Element;
    y: number;
    x: number;
    height: number;
    width: number;
    shape: {
        width: number;
        height: number;
    };
    update: () => void;
    refresh: () => void;
};
export declare const createRef: (refresh: any) => Ref;
export declare class RefCreator extends Component<{
    children: (refs: Ref[]) => JSX.Element;
    count?: number;
}, {
    refs: Ref[];
}> {
    constructor(props: any);
    render(): JSX.Element;
}
export {};

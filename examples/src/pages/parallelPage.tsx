import React from "react";
import {Animator, map, latest} from "react-scroll-animator";

const boxStyle = {
    marginTop: 50,
    width: 120,
    height: 120,
    backgroundColor: "cyan",
    position: "relative",
} as any;
const boxInnerStyle = {
    margin: 10,
    height: 20,
    display: "inline-block",
    backgroundColor: "purple",
} as any;

export const ParallelPage = () => (
    <div>
        {/* Use an array of arrays to indicate these two sequences of sections should be executed in parallel.
            These parallel sequences may contain parallel sequences themselves; they may be nested indefinitely*/}
        <Animator
            sections={[
                {$start: 300},
                [
                    [{$1s1: 150}, {$2s1: 100}, {$3s1: 100}],
                    [{$1s2: 100}, {$2s2: 100}, {$3s2: 100}],
                ],
                {$end: 100},
            ]}>
            {({$start, $1s1, $2s1, $3s1, $1s2, $2s2, $3s2, $end}) => (
                // Unfortunately, I couldn't manage to get full TS support for the nested arrays, so incorrect section names won't be detected

                // Move boxes in and out of view
                <div
                    style={{
                        position: "fixed",
                        marginLeft: latest(
                            [$start, $end],
                            [map($start, -200, 200), map($end, 200, -200)]
                        ),
                    }}>
                    {/* Execute animations in the two divs below in parallel, without using the same variables */}
                    <div style={{...boxStyle}}>
                        <div style={{...boxInnerStyle, width: map($1s1, 100)}} />
                        <div style={{...boxInnerStyle, width: map($2s1, 100)}} />
                        <div style={{...boxInnerStyle, width: map($3s1, 100)}} />
                    </div>
                    <div style={{...boxStyle}}>
                        <div style={{...boxInnerStyle, width: map($1s2, 100)}} />
                        <div style={{...boxInnerStyle, width: map($2s2, 100)}} />
                        <div style={{...boxInnerStyle, width: map($3s2, 100)}} />
                    </div>
                </div>
            )}
        </Animator>
    </div>
);

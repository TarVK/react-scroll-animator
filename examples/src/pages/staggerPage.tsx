import React from "react";
import {Animator, map} from "react-scroll-animator";

const boxStyle = {
    marginTop: 50,
    width: 100,
    height: 100,
    backgroundColor: "cyan",
    position: "relative",
} as any;
const boxLongStyle = {
    top: 50,
    width: 100,
    height: 700,
    backgroundColor: "cyan",
    position: "absolute",
} as any;

export const StaggerPage = () => (
    <div>
        {/* Use a negative offset such that the animation starts earlier (Doesn't wait for the previous variable to finish) */}
        <Animator
            sections={[
                {$s1: 300},
                {$s2: 300, offset: -250},
                {$s3: 300, offset: -250},
                {$s4: 300, offset: -250},
                {$s5: 300, offset: -250},
                {$d: 300},
            ]}>
            {({$s1, $s2, $s3, $s4, $s5, $d}) => (
                <div style={{position: "fixed"}}>
                    {/* Move 5 boxes in from the left */}
                    <div
                        style={{
                            ...boxStyle,
                            left: map($s1, -100, 600, {easing: "easeInOutSin"}),
                        }}
                    />
                    <div
                        style={{
                            ...boxStyle,
                            left: map($s2, -100, 600, {easing: "easeInOutSin"}),
                        }}
                    />
                    <div
                        style={{
                            ...boxStyle,
                            left: map($s3, -100, 600, {easing: "easeInOutSin"}),
                        }}
                    />
                    <div
                        style={{
                            ...boxStyle,
                            left: map($s4, -100, 600, {easing: "easeInOutSin"}),
                        }}
                    />
                    <div
                        style={{
                            ...boxStyle,
                            left: map($s5, -100, 600, {easing: "easeInOutSin"}),
                        }}
                    />

                    {/* Move a larger box in at the very end */}
                    <div
                        style={{
                            ...boxLongStyle,
                            left: map($d, -100, 400, {easing: "easeInOutSin"}),
                        }}
                    />
                </div>
            )}
        </Animator>
    </div>
);

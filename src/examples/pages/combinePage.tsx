import React from "react";
import {Animator} from "../../animator/animator";
import {map} from "../../animator/map";
import {latest} from "../../animator/latest";

const text = "hello this is some super cool text that will appear";
export const CombinePage = () => (
    <div>
        {/* Create an animator instance and specify the animation sections and their ranges */}
        <Animator sections={[{$left1: 400}, {$text: 200}, {$left2: 300}]}>
            {({$left1, $text, $left2}) => (
                // Create the content to show, uusing the passed section variables whose values range from 0 to 1
                <div
                    style={{
                        backgroundColor: "orange",
                        position: "relative",
                        top: 900,
                        height: 20,
                        // Use latest to pick the last section that's not 1 yet
                        marginLeft: latest(
                            [$left1, $left2],
                            [
                                map($left1, 200, {easing: "easeInElastic"}),
                                map($left2, 200, 400),
                            ]
                        ),
                    }}>
                    {/* Use the map function to map 0-1 to the integers 0-lengthOfText */}
                    {text.substring(0, map($text, text.length, {digits: 0}))}
                </div>
            )}
        </Animator>
    </div>
);

import React from "react";
import {Animator, map} from "react-scroll-animator";

const text = "hello this is some super cool text that will appear";
export const BasicsPage = () => (
    <div>
        {/* Create an animator instance and specify the animation sections and their ranges */}
        <Animator sections={[{$margin: 300}, {$text: 200}]}>
            {({$margin, $text}) => (
                // Create the content to show, uusing the passed section variables whose values range from 0 to 1
                <div
                    style={{
                        backgroundColor: "orange",
                        position: "relative",
                        top: 800,
                        height: 20,
                        /* Use map to map the values from 0-200 and apply easing (argument 0 may be left out) */
                        marginLeft: map($margin, 0, 200, {easing: "easeInOutSin"}),
                    }}>
                    {/* Use the map function to map 0-1 to the integers 0-lengthOfText */}
                    {text.substring(0, map($text, text.length, {digits: 0}))}
                </div>
            )}
        </Animator>
    </div>
);

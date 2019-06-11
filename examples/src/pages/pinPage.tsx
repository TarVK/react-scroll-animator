import React from "react";
import {Animator, map, Pin} from "react-scroll-animator";

const text = "hello this is some super cool text that will appear";
export const PinPage = () => (
    <div>
        {/* Create an animator instance with 3 sections, the first and the last will be used by the pin
             So we will not just specify the range, but instead a start and end location, from which a range is extracted
             `[document.body.clientHeight, 500]` is equivalent to saying `[, 500]` for ease of use
             */}
        <Animator
            sections={[
                {$scrollIn: [document.body.clientHeight, document.body.clientHeight / 2]},
                {$text: 300},
                {$scrollOut: [document.body.clientHeight / 2, -30]},
            ]}>
            {({$scrollIn, $text, $scrollOut}) => (
                <>
                    {/* Normal element on page for reference */}
                    <div
                        style={{
                            backgroundColor: "purple",
                            marginTop: document.body.clientHeight,
                            height: 20,
                        }}
                    />

                    {/* Specify a pin, where the element is pinned during the sections that are not passed as an argument 
                        Pin uses position attributes, and should thus be used directly in the scroll callback (not a sub element)*/}
                    <Pin sections={{$scrollIn, $scrollOut}}>
                        {/* Animate the text in the middle section */}
                        <div style={{height: 20, backgroundColor: "orange", width: 400}}>
                            {text.substring(0, map($text, text.length, {digits: 0}))}
                        </div>
                    </Pin>
                </>
            )}
        </Animator>
    </div>
);

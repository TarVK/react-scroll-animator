import React from "react";
import {RefCreator} from "../../animator/ref";
export const ReferencePage = () => (
    <div>
        <RefCreator>
            {([Ref]) => (
                <div>
                    {/* Make an element that will have the same size as the reference */}
                    <div
                        style={{
                            width: Ref.width,
                            height: Ref.height,
                            verticalAlign: "top",
                            display: "inline-block",
                            backgroundColor: "orange",
                        }}>
                        Yes
                    </div>

                    {/* Define the reference element, whose size is determined by content */}
                    {/* The reference wont dynamically update, Ref.update() may manually be called to update it */}
                    <Ref>
                        <div
                            style={{
                                display: "inline-block",
                                backgroundColor: "cyan",
                            }}>
                            Hello text
                            <br /> test
                        </div>
                    </Ref>
                </div>
            )}
        </RefCreator>

        {/* Test with two references */}
        <div style={{marginTop: 100, paddingTop: 30, borderTop: "1px solid black"}}>
            <RefCreator count={2}>
                {([Ref1, Ref2]) => (
                    <div>
                        {/* Make an element that will have the same size as the Reference 1, and same y as Reference 2 */}
                        <div
                            style={{
                                position: "absolute",
                                top: Ref2.y,
                                left: 100,
                                width: Ref1.width,
                                height: Ref1.height,
                                backgroundColor: "orange",
                            }}>
                            Yes
                        </div>

                        {/* Define the reference element, whose size is determined by content */}
                        <Ref1>
                            <div
                                style={{
                                    display: "inline-block",
                                    backgroundColor: "cyan",
                                }}>
                                Hello
                                <br /> test
                            </div>
                        </Ref1>

                        {/* Define the reference element, whose y is determined by the element above */}
                        <Ref2 style={{display: "block"}}>
                            <div
                                style={{
                                    display: "inline-block",
                                    backgroundColor: "pink",
                                }}>
                                Hello2
                            </div>
                        </Ref2>
                    </div>
                )}
            </RefCreator>
        </div>
    </div>
);

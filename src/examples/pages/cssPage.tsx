import React from "react";
import {Animator} from "../../animator/animator";

// Using emotion to create the document's css
import styled from "@emotion/styled";
const Container = styled.div`
    position: relative;
    .box1,
    .box2 {
        width: 100px;
        height: 100px;
        display: inline-block;
        position: absolute;
        background-color: purple;
    }
    .box1 {
        margin-top: 600px;
        left: 0;

        /* Define css transitions for when the class is assigned */
        transition: 1s;
        &.active {
            left: calc(100% - 100px);
            background-color: red;
        }
    }
    .box2 {
        margin-top: 800px;
        right: 0;

        /* Define css transitions for when the class is assigned */
        transition: 1s;
        &.active {
            right: calc(100% - 100px);
            background-color: red;
        }
    }
`;

export const CssPage = () => (
    // Adding css styling using emotion for this example
    <Container>
        <Animator sections={[{$box1: 200}, {$box2: 400}]}>
            {({$box1, $box2}) => (
                <div>
                    {/* Add the class when having passed some treshold */}
                    <div className={"box1" + ($box1 == 1 ? " active" : "")} />
                    <div className={"box2" + ($box2 == 1 ? " active" : "")} />
                </div>
            )}
        </Animator>
    </Container>
);

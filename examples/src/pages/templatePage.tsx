import React from "react";
import {Animator, map, RefCreator, Pin} from "react-scroll-animator";
import useWindowSize from "@rehooks/window-size";

// prettoer-ignore
const pageStyle = {
    position: "fixed",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    zIndex: -1,
} as any;
const centerStyle = {
    position: "relative",
    left: "50%",
    top: "50vh",
    transform: "translate(-50%, -50%)",
    display: "inline-block",
} as any;
const boxStyle = {
    width: 200,
    display: "inline-block",
    backgroundColor: "cyan",
};
const innerBoxStyle = {
    position: "relative",
    height: 120,
    margin: 20,
    backgroundColor: "orange",
} as any;
const animateMove = (move, leftBox, rightBox, left) => ({
    left: map(move, leftBox.x, rightBox.x, {easing: "easeInOutQuad"}) - left.x,
    top: map(move, 0, rightBox.y - leftBox.y, {easing: "easeInOutQuad"}),
    ...innerBoxStyle,
});
export const TemplatePage = () => {
    // Reload on window resize
    let windowSize = useWindowSize();
    return (
        <div>
            <RefCreator count={8}>
                {([
                    RefLeft,
                    RefRight,
                    RefBox1Left,
                    RefBox2Left,
                    RefBox3Left,
                    RefBox1Right,
                    RefBox2Right,
                    RefBox3Right,
                ]) => (
                    <Animator
                        sections={[
                            {$box1in: [, RefLeft.y]},
                            {$break1: 100},
                            {$box2in: [, RefRight.y]},
                            {$moveBox1: 300},
                            {$moveBox2: 300},
                            {$moveBox3: 300},
                            {$box1out: [RefLeft.y, -RefLeft.height]},
                            {$break1: 100},
                            {$box2out: [RefRight.y, -RefRight.height]},
                        ]}>
                        {({
                            $box1in,
                            $box2in,
                            $moveBox1,
                            $moveBox2,
                            $moveBox3,
                            $box1out,
                            $box2out,
                        }) => (
                            <>
                                {/* Create a static model of all components, and set their opacity to 0 when done */}
                                <div style={pageStyle}>
                                    <div style={centerStyle}>
                                        <RefLeft style={{margin: 20}}>
                                            <div style={boxStyle}>
                                                <RefBox1Left style={{display: "block"}}>
                                                    <div style={innerBoxStyle} />
                                                </RefBox1Left>
                                                <RefBox2Left style={{display: "block"}}>
                                                    <div style={innerBoxStyle} />
                                                </RefBox2Left>
                                                <RefBox3Left style={{display: "block"}}>
                                                    <div style={innerBoxStyle} />
                                                </RefBox3Left>
                                            </div>
                                        </RefLeft>
                                        <RefRight style={{margin: 20}}>
                                            <div style={boxStyle}>
                                                <RefBox1Right style={{display: "block"}}>
                                                    <div style={innerBoxStyle} />
                                                </RefBox1Right>
                                                <RefBox2Right style={{display: "block"}}>
                                                    <div style={innerBoxStyle} />
                                                </RefBox2Right>
                                                <RefBox3Right style={{display: "block"}}>
                                                    <div style={innerBoxStyle} />
                                                </RefBox3Right>
                                            </div>
                                        </RefRight>
                                    </div>
                                </div>

                                {/* Create the actual visual elements */}
                                {/* Left Box */}
                                <Pin sections={{$box1in, $box1out}}>
                                    <div
                                        style={{
                                            ...boxStyle,
                                            ...RefLeft.shape,
                                            marginLeft: RefLeft.x,
                                        }}
                                    />
                                </Pin>
                                {/* Right box */}
                                <Pin sections={{$box2in, $box2out}}>
                                    <div
                                        style={{
                                            ...boxStyle,
                                            ...RefLeft.shape,
                                            marginLeft: RefRight.x,
                                        }}
                                    />
                                </Pin>
                                {/* Inner boxes */}
                                <Pin sections={{$box1in, $box2out}}>
                                    <div
                                        style={{
                                            ...boxStyle,
                                            ...RefLeft.shape,
                                            marginLeft: RefLeft.x,
                                            backgroundColor: "none",
                                            // To handle the case where left and right are below each other:
                                            position: "relative",
                                            top:
                                                $box2out > 0 ? RefLeft.y - RefRight.y : 0,
                                        }}>
                                        <div
                                            style={{
                                                ...animateMove(
                                                    $moveBox3,
                                                    RefBox3Left,
                                                    RefBox3Right,
                                                    RefLeft
                                                ),
                                            }}
                                        />
                                        <div
                                            style={{
                                                ...animateMove(
                                                    $moveBox2,
                                                    RefBox2Left,
                                                    RefBox2Right,
                                                    RefLeft
                                                ),
                                            }}
                                        />
                                        <div
                                            style={{
                                                ...animateMove(
                                                    $moveBox1,
                                                    RefBox1Left,
                                                    RefBox1Right,
                                                    RefLeft
                                                ),
                                            }}
                                        />
                                    </div>
                                </Pin>
                            </>
                        )}
                    </Animator>
                )}
            </RefCreator>
        </div>
    );
};

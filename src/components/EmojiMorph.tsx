import React, {useMemo, useState} from 'react';
import {useSpring, animated} from "react-spring";
import {interpolate} from "flubber";
import {mouths, leftEyes, rightEyes, rightEyeBrows, leftEyeBrows} from "../emojis";
import useWindowDimensions from "../hooks/WindowDimension";



const EmotionEmojis: ({index}: { index: number }) => JSX.Element = ({index}) => {
    const originalWidth = 36;
    const originalHeight = 36;
    const aspectRatio = (originalWidth / originalHeight) * 0.1;
    const windowDimensions = useWindowDimensions();
    const [activeIndex, setActiveIndex] = useState(0);
    const [interpolators, setInterpolators] = useState({
        mouth: (_: number) => mouths[activeIndex],
        leftEye: (_: number) => leftEyes[activeIndex],
        rightEye: (_: number) => rightEyes[activeIndex],
        leftEyeBrow: (_: number) => leftEyeBrows[activeIndex],
        rightEyeBrow: (_: number) => rightEyeBrows[activeIndex]
    });
    const animationProps = useSpring({
        from: {x: 0},
        to: {
            x: 1,
        },
        config: {
            clamp: true,
            duration: 200
        },
        reset: true
    });

    useMemo(() => {
        setActiveIndex((prevIndex) => {
            setInterpolators({
                mouth: interpolate(mouths[prevIndex], mouths[index], {
                    maxSegmentLength: 0.5
                }),
                rightEye: interpolate(
                    rightEyes[prevIndex],
                    rightEyes[index],
                    {
                        maxSegmentLength: 0.5
                    }
                ),
                leftEye: interpolate(leftEyes[prevIndex], leftEyes[index], {
                    maxSegmentLength: 0.5
                }),
                leftEyeBrow: interpolate(leftEyeBrows[prevIndex], leftEyeBrows[index], {
                    maxSegmentLength: 0.5
                }),
                rightEyeBrow: interpolate(rightEyeBrows[prevIndex], rightEyeBrows[index], {
                    maxSegmentLength: 0.5
                })
            });

            return index;
        });

    }, [index]);

    return (
        <div style={{ width: windowDimensions.width * 0.6, aspectRatio, maxWidth: windowDimensions.width, maxHeight: windowDimensions.height, height: "50vh" }}>
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${originalWidth} ${originalHeight}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                transform={"translate(0, -10)"}

            >
                <animated.path
                    d={animationProps.x.to(interpolators.rightEye)}
                    fill="#664300"
                />
                <animated.path
                    d={animationProps.x.to(interpolators.leftEye)}
                    fill="#664300"
                />
                <animated.path
                    d={animationProps.x.to(interpolators.mouth)}
                    fill="#664300"
                />


                <animated.path
                    d={animationProps.x.to(interpolators.leftEyeBrow)}
                    fill="#664300"
                />
                <animated.path
                    d={animationProps.x.to(interpolators.rightEyeBrow)}
                    fill="#664300"
                />

            </svg>
        </div>
    );
}

export default EmotionEmojis;

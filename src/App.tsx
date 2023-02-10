import React, {useEffect, useState} from 'react';
import "./styles/App.css";

import EmotionEmojis from "./SVGSwitcher";
import {Pace, StyledText, WindupChildren} from "windups";

const App = () => {
    const [index, setIndex] = useState(0);
    const emotions = ["happy", "relaxed", "sad", "angry"];
    const [accuracy, setAccuracy] = useState(0);
    useEffect(() => {
        setAccuracy(Math.random() * 100);
    }, [index]);


    return (
        <div style={{height: '100vh'}}>
            <div style={{
                height: "100vh",
                display: 'flex',
                flexDirection: "column",
                alignItems: 'center',
                justifyContent: 'center',
                background: '#FFCD4C 60%'
            }} onClick={() => setIndex((index + 1) % 4)}>
                <div className={"EmotionName"}>{accuracy.toFixed(2)}%</div>
                <EmotionEmojis index={index}/>
                <WindupChildren>
                    <div
                        key={index}
                        className={"EmotionName"}
                    >
                        <Pace ms={100}>{emotions[index]}</Pace>
                    </div>
                </WindupChildren>
            </div>
        </div>
    );
};

export default App;


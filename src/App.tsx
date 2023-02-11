import React, {useEffect, useState} from 'react';
import "./styles/App.scss";

import EmotionEmojis from "./components/EmojiMorph";
import TextMorph from "./components/TextMorph";
import ConnectionStatus from "./components/ConnectionStatus";

const App = () => {
    const [index, setIndex] = useState(0);
    const emotions = ["happy", "relaxed", "sad", "angry"];
    const [prevAccuracy, setPrevAccuracy] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    useEffect(() => {
        setAccuracy(Math.random() * 100);
    }, [index]);


    return (
        <div className={"Container"} onClick={() => setIndex((index + 1) % 4)}>
            <div className={"StatusRow"}>
                <ConnectionStatus/>
            </div>
            <div className={"Content"}>
                <TextMorph className={"BigText"}>{`${accuracy.toFixed(2)}%`}</TextMorph>
                <EmotionEmojis index={index}/>
                <TextMorph className={"BigText"}>{emotions[index].toUpperCase()}</TextMorph>
            </div>

        </div>
    );
};

export default App;


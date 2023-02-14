import React, {useCallback, useEffect, useRef, useState} from 'react';
import "./styles/App.scss";

import EmotionEmojis from "./components/EmojiMorph";
import TextMorph from "./components/TextMorph";
import ConnectionStatus from "./components/ConnectionStatus";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface receivedData {
    accuracy: number;
    emotion: number;
}

const App = () => {
    const emotions = ["happy", "relaxed", "sad", "angry"];
    const [accuracy, setAccuracy] = useState(0);
    const [emotion, setEmotion] = useState<number>(0);
    const intervalIdRef = useRef<NodeJS.Timer | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const startDisplayEmotion = useCallback(() => {
        console.log("started display emotion")
        intervalIdRef.current = setInterval(() => {
            fetch('http://localhost:5000/api/count')
                .then(response => response.text())
                .then((data: string) => {
                    const receivedData: receivedData = JSON.parse(data);
                    setAccuracy(receivedData.accuracy);
                    setEmotion(receivedData.emotion);
                })
                .catch(error => console.log(error));
        }, 4000);
    },[]);
    const stopDisplayEmotion = useCallback((): void => {
        console.log("stopped display emotion")
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }
        setEmotion(0);
        setAccuracy(0);
    },[]);

    useEffect(() => {
        isConnected ? startDisplayEmotion() : stopDisplayEmotion();
    }, [isConnected]);
    const tryToConnect = (connection: boolean): void => {
        if (connection) {
            console.log("started connection")
            fetch("http://localhost:5000/status")
                .then((response: Response) => {
                    response.ok ? setIsConnected(true) : setIsConnected(false);
                })
                .catch(() => {
                    toast.error('Failed to connect to server!');
                });
        } else {
            console.log("stopped connection");
            setIsConnected(false);
        }
    };

    return (
        <div className={"Container"}>
            <div className={"StatusRow"}>
                <ConnectionStatus isConnected={isConnected} onClick={() => tryToConnect(!isConnected)}/>
            </div>
            <div className={"Content"}>
                <TextMorph className={"BigText"}>{`${accuracy.toFixed(2)}%`}</TextMorph>
                <EmotionEmojis index={emotion}/>
                <TextMorph className={"BigText"}>{emotions[emotion].toUpperCase()}</TextMorph>
            </div>
            <ToastContainer
                theme="colored"
            />

        </div>
    );
};

export default App;
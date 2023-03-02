import React, {useEffect, useState} from 'react';
import "./styles/App.scss";

import EmotionEmojis from "./components/EmojiMorph";
import TextMorph from "./components/TextMorph";
import ConnectionStatus from "./components/ConnectionStatus";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import io, {Socket} from 'socket.io-client';
import {DefaultEventsMap} from "socket.io/dist/typed-events";

interface ReceivedData {
    accuracy: number;
    emotion: number;
}

const App = () => {
    const ip = "192.168.178.45"
    const emotions = ["happy", "relaxed", "sad", "angry"];
    const [accuracy, setAccuracy] = useState(0);
    const [emotion, setEmotion] = useState<number>(0);
    //const [isConnected, setIsConnected] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [isRetrievingData, setIsRetrievingData] = useState(false);
    const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

    useEffect(() => {
        if (socket && isConnected && isRetrievingData) {
            socket.emit('start-retrieving-data');

            socket.on('processed-data', (data) => {
                const transformed_data: ReceivedData = JSON.parse(data);
                console.log(transformed_data)
                setAccuracy(transformed_data.accuracy);
                setEmotion(transformed_data.emotion);

            });
            return () => {
                socket.emit('stop-retrieving-data');
                socket.disconnect();
            };
        }
    }, [socket, isConnected, isRetrievingData]);

    const handleStream = () => {
        if (isRetrievingData) {
            setIsRetrievingData(false);
            toast.success("Stream stopped");
            setIsConnected(false);
            return;

        } else {
            if (!isConnected) {
                setSocket(io('http://localhost:5000'));
                setIsConnected(true);
                toast.success("Connected to server");
            }
            setIsRetrievingData(true);
            toast.success("Stream started");
        }
    };


    return (
        <div className={"Container"}>
            <div className={"StatusRow"}>
                <ConnectionStatus isConnected={isConnected}/>
                <div className={"ButtonContainer"}>
                    <button className={"Button"}
                            onClick={handleStream}>{isRetrievingData ? "Stop Stream" : "Start Stream"}</button>
                </div>
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
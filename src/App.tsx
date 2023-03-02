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
    const emotions = ["happy", "relaxed", "sad", "angry"];
    const [accuracy, setAccuracy] = useState(0);
    const [emotion, setEmotion] = useState<number>(0);
    //const [isConnected, setIsConnected] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [isRetrievingData, setIsRetrievingData] = useState(false);
    const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

    useEffect(() => {
        if (socket && isConnected && isRetrievingData) {
            socket.connected && toast.info("Retrieving data...",)
            socket.emit('start-retrieving-data');
            socket.on('processed-data', (data) => {
                const transformed_data: ReceivedData = JSON.parse(data);
                console.log(transformed_data)
                setAccuracy(transformed_data.accuracy * 100);
                setEmotion(transformed_data.emotion);

            });
            return () => {
                socket.emit('stop-retrieving-data');
                socket.disconnect();
                toast.error("Disconnected from server")
                setSocket(null);
                setIsConnected(false);
                setIsRetrievingData(false);
            };
        }
    }, [socket, isConnected, isRetrievingData]);

    const handleStream = () => {
        if (isRetrievingData) {
            setIsRetrievingData(false);
            toast.error("Stream stopped");
            setIsConnected(false);
            setAccuracy(0);
            setEmotion(0);
            return;
        } else {
            if (!isConnected) {
                const s = io('http://192.168.178.45:5000');
                setSocket(s);

            }
            if (socket) {
                if (socket.connected) {
                    setIsRetrievingData(true);
                    return;
                } else {
                    toast.error("Could not connect to server")
                    return;
                }

            }
        }
    };

    useEffect(() => {
        if (socket && !isConnected) {
            socket.on('connect', () => {
                toast.success('Connected to server.');
                setIsConnected(true);
            });
            socket.on('disconnect', () => {
                toast.error('Disconnected from server.');
                setIsConnected(false);
            });
            return () => {
                socket.off('connect');
                socket.off('disconnect');
            };
        }
    }, [socket, isConnected]);
    const getButtonText = () => {
        if (!isConnected && !isRetrievingData) {
            return "Connect to Server"
        } else if (isConnected && isRetrievingData) {
            return "Stop & Disconnect"
        } else if (isConnected && !isRetrievingData) {
            return "Start Stream"
        }
    }


    return (
        <div className={"Container"}>
            <div className={"StatusRow"}>
                <ConnectionStatus isConnected={isConnected}/>
                <div className={"ButtonContainer"}>
                    <button className={"Button"}
                            onClick={handleStream}>{getButtonText()}</button>
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
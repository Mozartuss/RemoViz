import React, {useState} from 'react';
import "../styles/ConnectionStatus.css";

interface ConnectionStatusProps {
    isConnected: boolean;
    onClick: () => void;
}

const ConnectionStatus = ({isConnected, onClick}: ConnectionStatusProps): JSX.Element => {

    return (
        <div className={"dotContainer"} onClick={onClick}>
            <div className={isConnected ? " dot connected" : " dot disconnected"}/>
            <p className={"statusText SmallText"}>
                {isConnected ? 'Connected' : 'Disconnected'}
            </p>
        </div>
    );
};

export default ConnectionStatus;
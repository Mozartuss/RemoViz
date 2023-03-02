import React, {useState} from 'react';
import "../styles/ConnectionStatus.css";

interface ConnectionStatusProps {
    isConnected: boolean;

}

const ConnectionStatus = ({isConnected}: ConnectionStatusProps): JSX.Element => {

    return (
        <div className={"dotContainer"}>
            <div className={isConnected ? " dot connected" : " dot disconnected"}/>
            <p className={"statusText SmallText"}>
                {isConnected ? 'Connected' : 'Disconnected'}
            </p>
        </div>
    );
};

export default ConnectionStatus;
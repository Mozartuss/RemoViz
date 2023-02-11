import React, { useState } from 'react';
import "../styles/ConnectionStatus.css";

const ConnectionStatus: React.FC = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false);

    return (
        <div className={"dotContainer"}>
            <div className={ isConnected ? " dot connected" : " dot disconnected"} />
            <p className={"statusText SmallText"}>
                {isConnected ? 'Connected' : 'Disconnected'}
            </p>
        </div>
    );
};

export default ConnectionStatus;
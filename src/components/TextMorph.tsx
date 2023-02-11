import React, { useState, useEffect } from 'react';
import "../styles/TextMorph.css";

interface TextMorphProps {
    className?: string;
    children: string;
}

const TextMorph: React.FC<TextMorphProps> = ({ children, className }) => {
    const [text, setText] = useState(children);
    const [isZooming, setIsZooming] = useState(false);

    useEffect(() => {
        if (text !== children) {
            setText(children);
            setIsZooming(true);
            setTimeout(() => {
                setIsZooming(false);
            }, 200);
        }
    }, [children, text]);

    return (
        <div className={`${className}`}>
            <div className={`${isZooming ? 'bounceIn' : ''}`}>{text}</div>
        </div>
    );
};

export default TextMorph;
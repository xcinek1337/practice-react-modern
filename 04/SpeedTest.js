import React, { useEffect, useState } from 'react';
import useRandomItem from './hook';

const SpeedTest = () => {
    const [word, regenerateWord] = useRandomItem(['devmentor.pl', 'abc', 'JavaScript']);
    const [correctWordsCount, setCorrectWordsCount] = useState(0);

    const [intervalId, setIntervalId] = useState(null);
    const [seconds, setSeconds] = useState(0);
    const [milliseconds, setMilliseconds] = useState(0);

    const [inputValue, setInputValue] = useState('');

    const capturing = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
    };

    useEffect(() => {
        regenerateWord();
    }, []);

    const appRunning = () => {
        const id = setInterval(() => {
            setMilliseconds((prevMilliseconds) => (prevMilliseconds + 10) % 100);
            setSeconds((prevTime) => prevTime + 1);
        }, 100);
        setIntervalId(id);
    };
   
    const appStop = () => {
        clearInterval(intervalId);
    };

    const plainSeconds = Math.floor(seconds / 10);

    const processingApp = (e) => {
        if (e.key === 'Enter' && inputValue === word) {
            setCorrectWordsCount((count) => count + 1);
            setInputValue('');
        }
    };

    useEffect(() => {
        if (correctWordsCount === 3) {
            appStop();
        }
    });

    return (
        <div>
            <h1>{word}</h1>
            <input
                onFocus={appRunning}
                value={inputValue}
                onChange={capturing}
                onKeyDown={processingApp}
            />
            <p>
                Czas: {plainSeconds}:{milliseconds}
            </p>
        </div>
    );
};

export default SpeedTest;

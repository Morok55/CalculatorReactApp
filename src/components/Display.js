import React, { useEffect, useState, useRef } from 'react';

function Display({ input, result, wasEqualPressed }) {
    const [inputAnim, setInputAnim] = useState('');
    const [resultAnim, setResultAnim] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (wasEqualPressed) {
            setInputAnim('');
            setResultAnim('');

            requestAnimationFrame(() => {
                setInputAnim('fade-out');
                setResultAnim('lift-up');
            });
        }
    }, [wasEqualPressed]);

    // Сброс классов после окончания анимации input
    useEffect(() => {
        const node = inputRef.current;
        if (!node) return;

        const handleEnd = (e) => {
            if (e.animationName === 'inputFadeOut') {
                setInputAnim('');
                setResultAnim('');
            }
        };

        node.addEventListener('animationend', handleEnd);
        return () => node.removeEventListener('animationend', handleEnd);
    }, [inputAnim]);

    const formatInput = (raw) => {
        const parts = raw.split(/([+\-*/])/).filter(Boolean);
        return parts.map((part, i) => {
            const displayPart = part === '*' ? '×' : part === '/' ? '÷' : part;
            const isOperator = ['+', '-', '*', '/'].includes(part);
            return isOperator ? (
                <span key={i} className="operator">{displayPart}</span>
            ) : (
                <span key={i}>{displayPart}</span>
            );
        });
    };

    return (
        <div className="display">
            <div ref={inputRef} className={`input ${inputAnim}`}>
                {formatInput(input)}
            </div>
            <div className={`result ${resultAnim}`}>
                {result !== '' ? result : <span>&nbsp;</span>}
            </div>
        </div>
    );
}

export default Display;

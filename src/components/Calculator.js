import React, { useState, useEffect } from "react";
import Display from "./Display";
import Keypad from "./Keypad";
import Toolbar from "./Toolbar";
import HistoryPanel from './HistoryPanel';


function Calculator() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [wasEqualPressed, setWasEqualPressed] = useState(false);
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    // ✅ Автоматическое вычисление
    useEffect(() => {
        const expression = input.replace(/,/g, '.');
        const hasOperator = /[+\-*/]/.test(expression);
        const endsWithNumber = /[0-9)]$/.test(expression); // чтобы не вычислять после `+` или `+(`

        if (expression.trim() === '' || !hasOperator || !endsWithNumber) {
            setResult('');
            return;
        }

        try {
            const evalResult = eval(expression);
            setResult(parseFloat(evalResult.toFixed(10)));
        } catch {
            // setResult('Ошибка');
        }
    }, [input]);

    const handleClick = (value) => {
        const lastChar = input.slice(-1);

        if (value === 'C') {
            setInput('');
            setResult('');
        } 
        else if (value === '=') {
            if (result !== 'Ошибка' && result !== '') {
                setWasEqualPressed(true);

                // ⏳ ждём окончания анимации
                setTimeout(() => {
                    setInput(String(result));
                    setResult('');
                    setWasEqualPressed(false);

                    setHistory(prev => [...prev, { expression: input, result }]);
                }, 200);
            }
        } 
        else if (value === '+/-') {
            if (input === '') {
                setInput('-');
                return;
            }

            // const lastChar = input[input.length - 1];
            if (['+', '-', '*', '/'].includes(lastChar)) {
                setInput(input + '-');
                return;
            }

            const match = input.match(/(-?\d+\.?\d*)$/);
            if (match) {
                const number = match[0];
                const toggled = number.startsWith('-')
                    ? number.slice(1)
                    : '-' + number;
                setInput(input.slice(0, -number.length) + toggled);
            }
        } 
        else if (input === '' && ['+', '*', '/', '-'].includes(value)) {
            return;
        } 
        else if (['+', '-', '*', '/', '+/-'].includes(value) && ['+', '-', '*', '/', '(', '+/-'].includes(lastChar)) {
            return;
        } 
        else {
            setInput(prev => prev + value);
        }
    };

    const handleBackspace = () => {
        if (input.length > 0) {
            setInput(prev => prev.slice(0, -1));
        }
    };


    return (
        <div className="calculator">
            <Display input={input} result={result} wasEqualPressed={wasEqualPressed} />
            <Toolbar
                onBackspace={handleBackspace}
                onToggleHistory={() => setShowHistory(prev => !prev)}
                disabled={input.length === 0}
                historyVisible={showHistory}
            />

            {/* Панель журнала — отображается только при showHistory */}
            <div className={`history-container ${showHistory ? 'open' : 'closed'}`}>
                <HistoryPanel
                    history={history}
                    onClear={() => setHistory([])}
                />
            </div>


            <Keypad onButtonClick={handleClick} />
        </div>
    );
}

export default Calculator;
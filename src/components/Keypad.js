import React from "react";
import Button from "./Button";

function Keypad({ onButtonClick }) {
    const buttons = [
        { label: 'C' },
        { label: '(' },
        { label: ')' },
        { label: '÷', value: '/' },

        { label: '7' },
        { label: '8' },
        { label: '9' },
        { label: '×', value: '*' },

        { label: '4' },
        { label: '5' },
        { label: '6' },
        { label: '-' },

        { label: '1' },
        { label: '2' },
        { label: '3' },
        { label: '+' },

        { label: '+/-' },
        { label: '0' },
        { label: ',' },
        { label: '=' },
    ];

    return (
        <div className="buttons">
            {buttons.map((btn, index) => (
                <Button
                    key={index}
                    label={btn.label}
                    value={btn.value || btn.label}
                    onClick={onButtonClick}
                />
            ))}
        </div>
    );
}

export default Keypad;

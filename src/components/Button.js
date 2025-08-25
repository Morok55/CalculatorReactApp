import React from "react";

function Button({ label, value, onClick }) {
    const isOperator = ['+', '-', '*', '/', '%'].includes(value);
    const isClear = value === 'C';
    const isEquals = value === '=';
    const isDark = ['(', ')'].includes(value);

    let className = 'btn';
    if (isOperator) className += ' action';
    if (isClear) className += ' clear';
    if (isEquals) className += ' equals';
    if (isDark) className += ' dark';

    return (
        <button className={className} onClick={() => onClick(value)}>
            {label}
        </button>
    );
}

export default Button;

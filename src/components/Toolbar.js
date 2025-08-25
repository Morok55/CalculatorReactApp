import React from 'react';
import { FaRegClock } from "react-icons/fa";
import { BiCalculator } from "react-icons/bi";
import { IoBackspaceOutline } from "react-icons/io5";

function Toolbar({ onBackspace, disabled, onToggleHistory, historyVisible }) {
    return (
        <div className="toolbar">
            <button className="history-btn" onClick={onToggleHistory}>
                {historyVisible ? <BiCalculator /> : <FaRegClock />}
            </button>
            <button
                className="backspace-btn"
                onClick={onBackspace}
                disabled={disabled}
            >
                <IoBackspaceOutline />
            </button>
        </div>
    );
}

export default Toolbar;

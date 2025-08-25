import React from 'react';

function HistoryPanel({ history, onClear }) {
    return (
        <div className="history-panel">
            <div className="history-list-wrapper">
                <div className="history-list">
                    {history.map((item, i) => (
                        <div key={i} className="history-item">
                            {item.expression}
                            <div className="history-result">={item.result}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="clear-history-wrapper">
                <button className="clear-history" onClick={onClear}>
                    Очистить журнал
                </button>
            </div>
        </div>
    );
}

export default HistoryPanel;

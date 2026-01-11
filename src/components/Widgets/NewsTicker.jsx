import React, { useState, useEffect, useRef } from 'react';

/**
 * NewsTicker - Continuous vertical scrolling news ticker
 */
const NewsTicker = ({ items = [], speed = 40, pauseOnHover = true }) => {
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef(null);
    const trackRef = useRef(null);

    if (!items.length) return null;

    // Clone items multiple times for seamless infinite scroll
    const clonedItems = [...items, ...items, ...items];

    const handleMouseEnter = () => {
        if (pauseOnHover) {
            setIsPaused(true);
        }
    };

    const handleMouseLeave = () => {
        if (pauseOnHover) {
            setIsPaused(false);
        }
    };

    return (
        <div
            ref={containerRef}
            className="news-ticker-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                position: 'relative',
                height: '100%',
                overflow: 'hidden'
            }}
        >
            <div
                ref={trackRef}
                className="news-ticker-track"
                style={{
                    animation: isPaused ? 'none' : `scrollUp ${items.length * speed}s linear infinite`
                }}
            >
                {clonedItems.map((item, idx) => (
                    <div
                        key={idx}
                        className="news-item"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 0',
                            borderBottom: '1px solid rgba(0, 240, 255, 0.1)'
                        }}
                    >
                        <span style={{ fontSize: '12px', color: item.color || 'var(--primary-cyan)', minWidth: '60px' }}>
                            {item.time}
                        </span>
                        <span style={{ fontSize: '12px', textAlign: 'right', flex: 1 }}>{item.content}</span>
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes scrollUp {
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(-33.33%);
                    }
                }
            `}</style>
        </div>
    );
};

export default NewsTicker;

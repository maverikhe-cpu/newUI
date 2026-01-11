import React, { useState, useEffect, useRef } from 'react';

/**
 * NewsTicker - Continuous vertical scrolling news ticker
 * Uses CSS animation for seamless infinite scrolling
 */
const NewsTicker = ({ items = [], speed = 3000, pauseOnHover = true, visibleItems = 3 }) => {
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef(null);
    const itemHeight = 100 / visibleItems;

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

    if (!items.length) return null;

    // Calculate animation duration based on speed (time per item) and total items
    const animationDuration = speed * items.length;

    // Duplicate items multiple times for seamless loop - we need enough for smooth scrolling
    // With CSS animation, we scroll from 0 to -50% (halfway through duplicated items)
    const displayItems = [...items, ...items];

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
                className="news-ticker-track"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    animation: isPaused ? 'none' : `scrollUp ${animationDuration}ms linear infinite`
                }}
            >
                {displayItems.map((item, idx) => (
                    <div
                        key={`${idx}-${item.time}`}
                        className="news-item"
                        style={{
                            height: `${itemHeight}%`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '2px 0',
                            flexShrink: 0
                        }}
                    >
                        <span style={{ fontSize: '12px', color: item.color || 'var(--primary-cyan)', minWidth: '55px' }}>
                            {item.time}
                        </span>
                        <span style={{ fontSize: '12px', flex: 1, textAlign: 'left', paddingLeft: '8px' }}>{item.content}</span>
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes scrollUp {
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(-50%);
                    }
                }
            `}</style>
        </div>
    );
};

export default NewsTicker;

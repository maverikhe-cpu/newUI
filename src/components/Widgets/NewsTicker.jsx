import React, { useState, useEffect, useRef } from 'react';

/**
 * NewsTicker - Vertical scrolling news ticker with smooth animation
 */
const NewsTicker = ({ items = [], speed = 3000, pauseOnHover = true }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (!pauseOnHover || !isPaused) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % items.length);
            }, speed);
        }

        return () => clearInterval(intervalRef.current);
    }, [items.length, speed, isPaused, pauseOnHover]);

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
                    transform: `translateY(-${currentIndex * 100}%)`,
                    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
            >
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className="news-item"
                        style={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '2px 0',
                            borderBottom: idx < items.length - 1 ? 'none' : 'none'
                        }}
                    >
                        <span style={{ fontSize: '12px', color: item.color || 'var(--primary-cyan)' }}>
                            {item.time}
                        </span>
                        <span style={{ fontSize: '12px' }}>{item.content}</span>
                    </div>
                ))}
            </div>

            {/* Progress indicator */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'rgba(0, 240, 255, 0.1)'
            }}>
                <div
                    className="ticker-progress"
                    style={{
                        height: '100%',
                        width: '0%',
                        background: 'linear-gradient(90deg, var(--primary-cyan), var(--secondary-amber))',
                        animation: isPaused ? 'none' : `tickerProgress ${speed}ms linear`
                    }}
                />
            </div>

            <style>{`
                @keyframes tickerProgress {
                    from { width: 0%; }
                    to { width: 100%; }
                }
            `}</style>
        </div>
    );
};

export default NewsTicker;

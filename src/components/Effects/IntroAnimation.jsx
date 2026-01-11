import React, { useState, useEffect } from 'react';
import '../../styles/intro.css';

const IntroAnimation = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [loadingText, setLoadingText] = useState('INITIALIZING CORE SYSTEMS');

    useEffect(() => {
        // Sequence of loading texts
        const texts = [
            { text: 'ESTABLISHING SECURE CONNECTION', time: 500 },
            { text: 'LOADING 3D ASSETS', time: 1200 },
            { text: 'SYNCING REAL-TIME DATA', time: 1800 },
            { text: 'SYSTEM ONLINE', time: 2400 }
        ];

        texts.forEach(({ text, time }) => {
            setTimeout(() => {
                setLoadingText(text);
            }, time);
        });

        // Fade out after animation
        const fadeTimer = setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
        }, 2800); // Slightly longer than the last text update

        return () => clearTimeout(fadeTimer);
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <div className={`intro-overlay ${!isVisible ? 'fade-out' : ''}`}>
            <div className="scan-line"></div>
            <div className="hud-ring"></div>
            <div className="hud-ring-inner"></div>

            <div className="intro-container">
                <div className="glitch-text" data-text="未来筑家">
                    未来筑家
                </div>

                <div className="loader-container">
                    <div className="loader-bar"></div>
                </div>

                <div className="loading-text">
                    {loadingText}
                </div>
            </div>
        </div>
    );
};

export default IntroAnimation;

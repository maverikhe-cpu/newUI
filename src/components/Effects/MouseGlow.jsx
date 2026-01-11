import React, { useEffect, useState } from 'react';

/**
 * MouseGlow - Creates a spotlight effect that follows the mouse cursor
 * Adds CSS variables for panel hover effects to use
 */
const MouseGlow = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isEnabled, setIsEnabled] = useState(true);

    useEffect(() => {
        if (!isEnabled) return;

        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;

            setMousePosition({ x, y });

            // Update CSS variables for global use
            document.documentElement.style.setProperty('--mouse-x', `${x}%`);
            document.documentElement.style.setProperty('--mouse-y', `${y}%`);
            document.documentElement.style.setProperty('--mouse-px', `${e.clientX}px`);
            document.documentElement.style.setProperty('--mouse-py', `${e.clientY}px`);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isEnabled]);

    return (
        <>
            <style>{`
                :root {
                    --mouse-x: 50%;
                    --mouse-y: 50%;
                    --mouse-px: 50vw;
                    --mouse-py: 50vh;
                }

                .mouse-glow-spotlight {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                    background: radial-gradient(
                        circle 300px at var(--mouse-px) var(--mouse-py),
                        rgba(0, 240, 255, 0.03),
                        transparent 70%
                    );
                    will-change: background;
                }

                /* Panel hover effect using mouse position */
                .panel.with-mouse-glow::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    border-radius: 8px;
                    background: radial-gradient(
                        circle 150px at calc(var(--mouse-px) - var(--panel-left, 0px)) calc(var(--mouse-py) - var(--panel-top, 0px)),
                        rgba(0, 240, 255, 0.08),
                        transparent 70%
                    );
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                    z-index: 1;
                }

                .panel.with-mouse-glow:hover::before {
                    opacity: 1;
                }

                /* Edge highlight effect */
                .panel.with-mouse-glow {
                    position: relative;
                    overflow: hidden;
                }

                .panel.with-mouse-glow::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    border-radius: 8px;
                    box-shadow: inset 0 0 20px rgba(0, 240, 255, 0);
                    transition: box-shadow 0.3s ease;
                    pointer-events: none;
                    z-index: 2;
                }

                .panel.with-mouse-glow:hover::after {
                    box-shadow: inset 0 0 20px rgba(0, 240, 255, 0.05);
                }
            `}</style>
            <div className="mouse-glow-spotlight" />
        </>
    );
};

export default MouseGlow;

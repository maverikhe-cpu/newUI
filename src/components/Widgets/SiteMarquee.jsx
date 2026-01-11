import React, { useEffect, useState, useRef } from 'react';

/**
 * SiteMarquee - Horizontal scrolling marquee for construction site images
 */
const SiteMarquee = ({ images = [], height = 120, speed = 30 }) => {
    const [offset, setOffset] = useState(0);
    const containerRef = useRef(null);
    const requestRef = useRef();

    // Clone images to ensure smooth infinite scroll
    const marqueeImages = [...images, ...images, ...images];

    useEffect(() => {
        const animate = () => {
            setOffset(prevOffset => {
                const newOffset = prevOffset + 0.5; // pixel movement per frame

                // If we've scrolled past the first set of images, reset to 0
                // We need to know the width of the first set.
                // For simplicity, let's assume a fixed restart point or calculate it.
                // A better approach for React Marquee is using CSS animations, but let's try JS for control
                // actually CSS animation is smoother and less CPU intensive.
                return newOffset;
            });
            requestRef.current = requestRefAnimationFrame(animate);
        };
        // Changing strategy to CSS animation for better performance and simplicity
    }, []);

    return (
        <div className="site-marquee-container" style={{
            height: height,
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            background: 'rgba(11, 16, 38, 0.8)',
            borderTop: '1px solid rgba(0, 240, 255, 0.2)',
            display: 'flex',
            alignItems: 'center'
        }}>
            <div className="marquee-label" style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '40px',
                background: 'rgba(0, 240, 255, 0.1)',
                borderRight: '1px solid rgba(0, 240, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                writingMode: 'vertical-rl',
                textOrientation: 'upright',
                color: '#00F0FF',
                fontSize: '12px',
                letterSpacing: '4px',
                padding: '0 10px'
            }}>
                工地实况
            </div>

            <div className="marquee-track" style={{
                display: 'flex',
                gap: '16px',
                paddingLeft: '50px', // Compensate for label
                animation: `marqueeScroll ${speed}s linear infinite`,
                width: 'max-content'
            }}>
                {marqueeImages.map((img, idx) => (
                    <div key={idx} className="marquee-item" style={{
                        position: 'relative',
                        width: '160px',
                        height: '100px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        border: '1px solid rgba(0, 240, 255, 0.2)',
                        flexShrink: 0
                    }}>
                        <img src={img.src} alt={img.alt || 'Site View'} style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'sepia(20%) hue-rotate(180deg) saturate(150%)' // Techy filter
                        }} />
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: 'rgba(0,0,0,0.6)',
                            color: '#fff',
                            fontSize: '10px',
                            padding: '2px 4px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            {img.label || `CAM-${String(idx).padStart(2, '0')}`}
                        </div>
                        {/* Scanline overlay */}
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.1) 2px, rgba(0, 240, 255, 0.1) 4px)',
                            pointerEvents: 'none'
                        }}></div>
                    </div>
                ))}
            </div>
            <style>{`
                @keyframes marqueeScroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); } /* Move by 1/3 since we repeated links 3 times */
                }
            `}</style>
        </div>
    );
};

export default SiteMarquee;

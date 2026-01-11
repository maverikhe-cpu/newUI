import React, { useEffect, useState, useRef } from 'react';

/**
 * SiteMarquee - Optimized horizontal scrolling marquee with preloading and skeleton loading
 */
const SiteMarquee = ({ images = [], height = 120, speed = 30 }) => {
    const [loadedImages, setLoadedImages] = useState(new Set());
    const [loadingProgress, setLoadingProgress] = useState(0);
    const containerRef = useRef(null);

    // Clone images for infinite scroll
    const marqueeImages = [...images, ...images, ...images];
    const totalImages = images.length;

    // Preload images on mount
    useEffect(() => {
        let loadedCount = 0;
        const imageObjects = {};

        images.forEach((img, idx) => {
            const imgObj = new Image();
            imgObj.onload = () => {
                loadedCount++;
                setLoadingProgress((loadedCount / totalImages) * 100);
                setLoadedImages(prev => new Set([...prev, idx]));
            };
            imgObj.onerror = () => {
                // Still mark as loaded even on error to show placeholder
                loadedCount++;
                setLoadingProgress((loadedCount / totalImages) * 100);
                setLoadedImages(prev => new Set([...prev, idx]));
            };
            imgObj.src = img.src;
            imageObjects[idx] = imgObj;
        });

        return () => {
            Object.values(imageObjects).forEach(img => img.onload = null);
        };
    }, [images]);

    // Get original image index from cloned array
    const getOriginalIndex = (idx) => idx % totalImages;

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
            {/* Loading Progress Bar */}
            {loadingProgress < 100 && (
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, var(--primary-cyan), var(--secondary-amber))',
                    width: `${loadingProgress}%`,
                    zIndex: 20,
                    transition: 'width 0.3s ease'
                }} />
            )}

            {/* Loading overlay */}
            {loadingProgress < 100 && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'var(--primary-cyan)',
                    fontSize: '11px',
                    zIndex: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid rgba(0, 240, 255, 0.3)'
                }}>
                    <div className="loading-spinner" style={{
                        width: '12px',
                        height: '12px',
                        border: '2px solid rgba(0, 240, 255, 0.3)',
                        borderTopColor: 'var(--primary-cyan)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <span>加载中 {Math.round(loadingProgress)}%</span>
                    <style>{`
                        @keyframes spin {
                            to { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            )}

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
                paddingLeft: '50px',
                animation: loadingProgress >= 100 ? `marqueeScroll ${speed}s linear infinite` : 'none',
                width: 'max-content',
                opacity: loadingProgress >= 100 ? 1 : 0.3,
                transition: 'opacity 0.5s ease'
            }}>
                {marqueeImages.map((img, idx) => {
                    const originalIdx = getOriginalIndex(idx);
                    const isLoaded = loadedImages.has(originalIdx);

                    return (
                        <div key={idx} className="marquee-item" style={{
                            position: 'relative',
                            width: '160px',
                            height: '100px',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            border: '1px solid rgba(0, 240, 255, 0.2)',
                            flexShrink: 0,
                            backgroundColor: isLoaded ? 'transparent' : 'rgba(0, 240, 255, 0.05)'
                        }}>
                            {/* Skeleton placeholder */}
                            {!isLoaded && (
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.1), transparent)',
                                    backgroundSize: '200% 100%',
                                    animation: 'skeletonShimmer 1.5s infinite',
                                    zIndex: 1
                                }}>
                                    <style>{`
                                        @keyframes skeletonShimmer {
                                            0% { background-position: -200% 0; }
                                            100% { background-position: 200% 0; }
                                        }
                                    `}</style>
                                </div>
                            )}

                            {/* Actual image with fade-in */}
                            <img
                                src={img.src}
                                alt={img.alt || 'Site View'}
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    filter: 'sepia(20%) hue-rotate(180deg) saturate(150%)',
                                    opacity: isLoaded ? 1 : 0,
                                    transition: 'opacity 0.4s ease'
                                }}
                            />
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
                                textOverflow: 'ellipsis',
                                zIndex: 2
                            }}>
                                {img.label || `CAM-${String(originalIdx + 1).padStart(2, '0')}`}
                            </div>
                            {/* Scanline overlay */}
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.1) 2px, rgba(0, 240, 255, 0.1) 4px)',
                                pointerEvents: 'none',
                                zIndex: 3
                            }}></div>
                        </div>
                    );
                })}
            </div>
            <style>{`
                @keyframes marqueeScroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
            `}</style>
        </div>
    );
};

export default SiteMarquee;

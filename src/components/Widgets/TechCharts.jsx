import React, { useEffect, useState } from 'react';

// --- Circular Gauge for Percentages ---
export const CircularGauge = ({ value, label, color = '#00F0FF' }) => {
    const radius = 36;
    const stroke = 4;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: radius * 2, height: radius * 2 }}>
                <svg height={radius * 2} width={radius * 2} style={{ transform: 'rotate(-90deg)' }}>
                    <circle
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth={stroke}
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <circle
                        stroke={color}
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-in-out' }}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                </svg>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>{value}%</span>
                </div>
            </div>
            <span style={{ marginTop: '8px', fontSize: '12px', color: '#888' }}>{label}</span>
        </div>
    );
};

// --- Animated Trend Line ---
export const TrendLine = ({ dataPoints, color = '#FFD700', height = 40 }) => {
    const max = Math.max(...dataPoints);
    const min = Math.min(...dataPoints);

    const points = dataPoints.map((val, i) => {
        const x = (i / (dataPoints.length - 1)) * 100;
        const y = 100 - ((val - min) / (max - min)) * 100;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div style={{ width: '100%', height: `${height}px`, position: 'relative', overflow: 'hidden' }}>
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polyline
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    points={points}
                    vectorEffect="non-scaling-stroke"
                    filter="url(#glow)"
                />
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
            </svg>
            {/* Scan line effect over chart */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '10px', height: '100%',
                background: `linear-gradient(90deg, transparent, ${color}33, transparent)`,
                animation: 'scanGraph 2s linear infinite'
            }} />
            <style>{`@keyframes scanGraph { 0% { left: -10%; } 100% { left: 110%; } }`}</style>
        </div>
    );
};

// --- Segmented Progress Bar ---
export const SegmentedBar = ({ value, total = 10, label, color = '#00F0FF' }) => {
    const filled = Math.round((value / 100) * total);

    return (
        <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
                <span style={{ color: '#aaa' }}>{label}</span>
                <span style={{ color: color, fontWeight: 'bold' }}>{value}%</span>
            </div>
            <div style={{ display: 'flex', gap: '2px', height: '8px' }}>
                {Array.from({ length: total }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            flex: 1,
                            backgroundColor: i < filled ? color : 'rgba(255,255,255,0.1)',
                            borderRadius: '1px',
                            boxShadow: i < filled ? `0 0 5px ${color}` : 'none',
                            transition: 'all 0.3s'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

// --- Digital Counter Panel with Scroll Animation ---
export const DigitalCounter = ({ value, label, unit }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const numericValue = typeof value === 'string' ? parseInt(value.replace(/,/g, '')) : value;

    useEffect(() => {
        const duration = 1000;
        const startTime = Date.now();
        const startValue = displayValue;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (numericValue - startValue) * easeOutQuart);

            setDisplayValue(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }, [numericValue]);

    const formattedValue = typeof value === 'string'
        ? displayValue.toLocaleString()
        : displayValue;

    return (
        <div className="digital-counter" style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '4px', borderLeft: '2px solid rgba(255, 255, 255, 0.1)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>{label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span className="counter-value" style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'monospace', color: '#fff', textShadow: '0 0 10px rgba(255,255,255,0.3)', display: 'inline-block' }}>
                    {formattedValue}
                </span>
                <span style={{ fontSize: '12px', color: '#666' }}>{unit}</span>
            </div>
        </div>
    );
};

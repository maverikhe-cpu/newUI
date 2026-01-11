import React, { useState, useEffect } from 'react';
import { CloudSun, CloudRain, Sun, Wind, Droplets, Thermometer } from 'lucide-react';

const WeatherWidget = () => {
    // Simulated weather data
    const [weather, setWeather] = useState({
        temp: 26,
        condition: '多云',
        humidity: 45,
        wind: 3
    });

    useEffect(() => {
        // Simple simulation to slightly vary temp
        const interval = setInterval(() => {
            setWeather(prev => ({
                ...prev,
                temp: 26 + Math.floor(Math.random() * 3) - 1 // 25-27
            }));
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="weather-widget" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginRight: '10px',
            color: 'var(--primary-cyan)',
            fontFamily: "'Courier New', monospace"
        }}>
            {/* Main Weather Icon & Temp */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CloudSun size={20} style={{ filter: 'drop-shadow(0 0 5px rgba(0,240,255,0.5))' }} />
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{weather.temp}°C</span>
                <span style={{ fontSize: '14px', paddingTop: '2px' }}>{weather.condition}</span>
            </div>

            {/* Divider */}
            <div style={{ width: '1px', height: '16px', background: 'rgba(0,240,255,0.3)' }}></div>

            {/* Details (Wind/Humidity) - Hidden on very small screens if needed */}
            <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} title="风力">
                    <Wind size={12} style={{ color: '#00F0FF' }} />
                    <span>{weather.wind}级</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} title="湿度">
                    <Droplets size={12} style={{ color: '#00F0FF' }} />
                    <span>{weather.humidity}%</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;

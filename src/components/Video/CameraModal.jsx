import React from 'react';
import { X, CircleDot, Maximize2 } from 'lucide-react';
import './CameraModal.css';

const CameraModal = ({ site, onClose }) => {
    if (!site) return null;

    return (
        <div className="camera-modal-overlay">
            <div className="camera-window">
                <div className="camera-header">
                    <div className="camera-title">
                        <CircleDot className="recording-icon" color="#FF3366" size={16} />
                        实时监控: {site.name}
                    </div>
                    <button className="close-btn" onClick={onClose} aria-label="Close"><X size={20} /></button>
                </div>
                <div className="camera-content">
                    {/* Placeholder for video stream */}
                    <div className="video-placeholder">
                        <div className="camera-grid"></div>
                        <div className="scan-line"></div>
                        <div className="camera-info-overlay">
                            <div>摄像头-01 [在线]</div>
                            <div style={{ color: '#00F0FF' }}>{new Date().toLocaleTimeString()}</div>
                        </div>

                        {/* Simulated Footage Placeholder */}
                        <div style={{ textAlign: 'center', zIndex: 2 }}>
                            <Maximize2 size={48} style={{ opacity: 0.3, marginBottom: '10px' }} />
                            <div style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '4px' }}>
                                信号中断
                            </div>
                            <div style={{ fontSize: '12px', marginTop: '10px', color: '#666' }}>
                                正在尝试连接远程DVR...
                            </div>
                        </div>
                    </div>
                </div>
                <div className="camera-footer">
                    <div>坐标: {site.lat.toFixed(4)}, {site.lng.toFixed(4)}</div>
                    <div>状态: {site.status === 'alert' ? '异常' : '正常'}</div>
                    <div>码率: 4096 kbps</div>
                </div>
            </div>
        </div>
    );
};

export default CameraModal;

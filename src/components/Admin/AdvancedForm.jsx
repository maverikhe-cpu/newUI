import React from 'react';
import { Settings } from 'lucide-react';
import { useDashboardData } from '../../contexts/DashboardDataContext';

const AdvancedForm = () => {
  const { data, updateData } = useDashboardData();
  const { advanced } = data;

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">
        <Settings size={18} style={{ marginRight: '8px' }} />
        高级配置
      </h2>

      <div className="admin-form-group">
        <div className="admin-array-editor" style={{ border: '1px solid rgba(255, 215, 0, 0.3)' }}>
          <p style={{ color: '#FFD700', marginBottom: '16px', fontSize: '13px' }}>
            ⚠️ 这些配置会影响大屏的视觉效果和性能。请谨慎修改。
          </p>

          <div className="admin-form-row">
            <div>
              <label className="admin-label">粒子数量</label>
              <input
                type="number"
                min="10"
                max="200"
                value={advanced.particleCount}
                onChange={(e) => updateData('advanced.particleCount', Number(e.target.value))}
                className="admin-input"
              />
              <div className="admin-hint">背景粒子数量，建议 30-100</div>
            </div>
            <div>
              <label className="admin-label">神经网络节点数</label>
              <input
                type="number"
                min="4"
                max="20"
                value={advanced.networkNodeCount}
                onChange={(e) => updateData('advanced.networkNodeCount', Number(e.target.value))}
                className="admin-input"
              />
              <div className="admin-hint">神经网络可视化节点数，建议 6-12</div>
            </div>
          </div>

          <div className="admin-form-row">
            <div>
              <label className="admin-label">走马灯滚动速度</label>
              <input
                type="number"
                min="5"
                max="100"
                value={advanced.marqueeSpeed}
                onChange={(e) => updateData('advanced.marqueeSpeed', Number(e.target.value))}
                className="admin-input"
              />
              <div className="admin-hint">工地图片滚动速度，越小越快</div>
            </div>
            <div>
              <label className="admin-label">新闻滚动间隔 (毫秒)</label>
              <input
                type="number"
                min="500"
                max="10000"
                step="500"
                value={advanced.newsSpeed}
                onChange={(e) => updateData('advanced.newsSpeed', Number(e.target.value))}
                className="admin-input"
              />
              <div className="admin-hint">新闻滚动间隔时间</div>
            </div>
          </div>

          <div className="admin-form-row">
            <div>
              <label className="admin-label">新闻可见数量</label>
              <input
                type="number"
                min="1"
                max="6"
                value={advanced.newsVisibleItems}
                onChange={(e) => updateData('advanced.newsVisibleItems', Number(e.target.value))}
                className="admin-input"
              />
              <div className="admin-hint">同时显示的新闻条数</div>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-hint" style={{ marginTop: '20px' }}>
        修改这些配置后，需要刷新大屏页面才能看到效果。
      </div>
    </div>
  );
};

export default AdvancedForm;

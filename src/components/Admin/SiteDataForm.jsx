import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useDashboardData } from '../../contexts/DashboardDataContext';

const SiteDataForm = () => {
  const { data, updateData } = useDashboardData();
  const { sites } = data;

  const handleSiteChange = (index, field, value) => {
    const newArray = [...sites];
    newArray[index] = { ...newArray[index], [field]: value };
    updateData('sites', newArray);
  };

  const addSite = () => {
    updateData('sites', [
      ...sites,
      { src: '/placeholder.png', label: '新工地' }
    ]);
  };

  const removeSite = (index) => {
    const newArray = sites.filter((_, i) => i !== index);
    updateData('sites', newArray);
  };

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">工地实况图片</h2>

      <div className="admin-form-group">
        <div className="admin-array-editor">
          {sites.map((site, index) => (
            <div key={index} className="site-item-editor">
              <input
                type="text"
                value={site.src}
                onChange={(e) => handleSiteChange(index, 'src', e.target.value)}
                className="admin-input"
                placeholder="图片路径"
              />
              <input
                type="text"
                value={site.label}
                onChange={(e) => handleSiteChange(index, 'label', e.target.value)}
                className="admin-input"
                placeholder="标签名称"
              />
              <button
                className="admin-btn admin-btn-icon"
                onClick={() => removeSite(index)}
                title="删除"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button className="admin-btn admin-btn-add" onClick={addSite}>
            <Plus size={14} /> 添加图片
          </button>
        </div>
      </div>

      <div className="admin-hint">
        图片应放置在 public 文件夹中，路径以 / 开头。当前共有 {sites.length} 张图片。
        建议保持 5-8 张图片以实现流畅的滚动效果。
      </div>

      {/* 预览 */}
      <div className="admin-form-group">
        <h3 className="admin-label" style={{ fontSize: '14px', color: '#00F0FF' }}>预览</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {sites.map((site, index) => (
            <div
              key={index}
              style={{
                width: '160px',
                height: '100px',
                background: 'rgba(0, 240, 255, 0.05)',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <img
                src={site.src}
                alt={site.label}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = 'rgba(255, 51, 102, 0.1)';
                  e.target.parentElement.innerHTML = '<span style="color: #FF3366; font-size: 12px; display: flex; align-items: center; justify-content: center; height: 100%;">加载失败</span>';
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'rgba(0,0,0,0.7)',
                color: '#fff',
                fontSize: '10px',
                padding: '2px 4px',
                textAlign: 'center'
              }}>
                {site.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SiteDataForm;
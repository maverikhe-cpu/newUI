import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useDashboardData } from '../../contexts/DashboardDataContext';

const TrendDataForm = () => {
  const { data, updateData } = useDashboardData();
  const { trends } = data;

  const handleArrayChange = (key, index, value) => {
    const newArray = [...trends[key]];
    // Allow empty input - don't convert empty string to 0
    newArray[index] = value === '' ? '' : Number(value);
    updateData(`trends.${key}`, newArray);
  };

  const addArrayItem = (key) => {
    const newArray = [...trends[key], 0];
    updateData(`trends.${key}`, newArray);
  };

  const removeArrayItem = (key, index) => {
    const newArray = trends[key].filter((_, i) => i !== index);
    updateData(`trends.${key}`, newArray);
  };

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">趋势数据</h2>

      {/* 人员活跃度趋势 */}
      <div className="admin-form-group">
        <h3 className="admin-label" style={{ fontSize: '14px', color: '#FFD700' }}>人员活跃度趋势</h3>
        <div className="admin-array-editor">
          {trends.workerActivity.map((value, index) => (
            <div key={index} className="admin-array-item">
              <span className="admin-label" style={{ minWidth: '60px' }}>数据点 {index + 1}</span>
              <input
                type="number"
                value={value}
                onChange={(e) => handleArrayChange('workerActivity', index, e.target.value)}
                className="admin-input"
              />
              <button
                className="admin-btn admin-btn-icon"
                onClick={() => removeArrayItem('workerActivity', index)}
                title="删除"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button className="admin-btn admin-btn-add" onClick={() => addArrayItem('workerActivity')}>
            <Plus size={14} /> 添加数据点
          </button>
        </div>
      </div>

      {/* 本周完成趋势 */}
      <div className="admin-form-group">
        <h3 className="admin-label" style={{ fontSize: '14px', color: '#00F0FF' }}>本周完成趋势</h3>
        <div className="admin-array-editor">
          {trends.weeklyProgress.map((value, index) => (
            <div key={index} className="admin-array-item">
              <span className="admin-label" style={{ minWidth: '60px' }}>数据点 {index + 1}</span>
              <input
                type="number"
                value={value}
                onChange={(e) => handleArrayChange('weeklyProgress', index, e.target.value)}
                className="admin-input"
              />
              <button
                className="admin-btn admin-btn-icon"
                onClick={() => removeArrayItem('weeklyProgress', index)}
                title="删除"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button className="admin-btn admin-btn-add" onClick={() => addArrayItem('weeklyProgress')}>
            <Plus size={14} /> 添加数据点
          </button>
        </div>
      </div>

      {/* 响应时间趋势 */}
      <div className="admin-form-group">
        <h3 className="admin-label" style={{ fontSize: '14px', color: '#00F0FF' }}>本周时效趋势</h3>
        <div className="admin-array-editor">
          {trends.responseTime.map((value, index) => (
            <div key={index} className="admin-array-item">
              <span className="admin-label" style={{ minWidth: '60px' }}>数据点 {index + 1}</span>
              <input
                type="number"
                value={value}
                onChange={(e) => handleArrayChange('responseTime', index, e.target.value)}
                className="admin-input"
              />
              <button
                className="admin-btn admin-btn-icon"
                onClick={() => removeArrayItem('responseTime', index)}
                title="删除"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button className="admin-btn admin-btn-add" onClick={() => addArrayItem('responseTime')}>
            <Plus size={14} /> 添加数据点
          </button>
        </div>
      </div>

      {/* 返工原因分布 */}
      <div className="admin-form-group">
        <h3 className="admin-label" style={{ fontSize: '14px', color: '#FFD700' }}>返工原因分布</h3>
        <div className="admin-array-editor">
          {data.reworkReasons.map((item, index) => (
            <div key={index} className="admin-array-item">
              <input
                type="text"
                value={item.label}
                onChange={(e) => {
                  const newArray = [...data.reworkReasons];
                  newArray[index] = { ...newArray[index], label: e.target.value };
                  updateData('reworkReasons', newArray);
                }}
                className="admin-input"
                placeholder="原因名称"
                style={{ flex: 2 }}
              />
              <input
                type="number"
                value={item.value}
                onChange={(e) => {
                  const newArray = [...data.reworkReasons];
                  // Allow empty input - don't convert empty string to 0
                  const numValue = e.target.value === '' ? '' : Number(e.target.value);
                  newArray[index] = { ...newArray[index], value: numValue };
                  updateData('reworkReasons', newArray);
                }}
                className="admin-input"
                placeholder="值"
              />
              <select
                value={item.color}
                onChange={(e) => {
                  const newArray = [...data.reworkReasons];
                  newArray[index] = { ...newArray[index], color: e.target.value };
                  updateData('reworkReasons', newArray);
                }}
                className="admin-select"
                style={{ width: '120px' }}
              >
                <option value="#FFD700">金色</option>
                <option value="#FF3366">红色</option>
                <option value="#00F0FF">青色</option>
              </select>
              <button
                className="admin-btn admin-btn-icon"
                onClick={() => {
                  const newArray = data.reworkReasons.filter((_, i) => i !== index);
                  updateData('reworkReasons', newArray);
                }}
                title="删除"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button
            className="admin-btn admin-btn-add"
            onClick={() => {
              updateData('reworkReasons', [
                ...data.reworkReasons,
                { label: '新原因', value: 0, color: '#FFD700' }
              ]);
            }}
          >
            <Plus size={14} /> 添加原因
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendDataForm;
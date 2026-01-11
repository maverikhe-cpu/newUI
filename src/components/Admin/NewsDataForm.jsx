import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useDashboardData } from '../../contexts/DashboardDataContext';

const NewsDataForm = () => {
  const { data, updateData } = useDashboardData();
  const { news } = data;

  const handleNewsChange = (index, field, value) => {
    const newArray = [...news];
    newArray[index] = { ...newArray[index], [field]: value };
    updateData('news', newArray);
  };

  const addNews = () => {
    const newId = news.length > 0 ? Math.max(...news.map((_, i) => i)) + 1 : 0;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    updateData('news', [
      ...news,
      { time, content: '新消息', color: 'var(--primary-cyan)' }
    ]);
  };

  const removeNews = (index) => {
    const newArray = news.filter((_, i) => i !== index);
    updateData('news', newArray);
  };

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">新闻动态</h2>

      <div className="admin-form-group">
        <div className="admin-array-editor">
          {news.map((item, index) => (
            <div key={index} className="news-item-editor">
              <input
                type="text"
                value={item.time}
                onChange={(e) => handleNewsChange(index, 'time', e.target.value)}
                className="admin-input"
                placeholder="HH:MM"
              />
              <input
                type="text"
                value={item.content}
                onChange={(e) => handleNewsChange(index, 'content', e.target.value)}
                className="admin-input"
                placeholder="新闻内容"
              />
              <select
                value={item.color}
                onChange={(e) => handleNewsChange(index, 'color', e.target.value)}
                className="admin-select"
              >
                <option value="var(--primary-cyan)">青色</option>
                <option value="var(--secondary-amber)">琥珀色</option>
              </select>
              <button
                className="admin-btn admin-btn-icon"
                onClick={() => removeNews(index)}
                title="删除"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button className="admin-btn admin-btn-add" onClick={addNews}>
            <Plus size={14} /> 添加新闻
          </button>
        </div>
      </div>

      <div className="admin-hint">
        共 {news.length} 条新闻消息。建议保持 20 条左右以实现平滑滚动效果。
      </div>
    </div>
  );
};

export default NewsDataForm;

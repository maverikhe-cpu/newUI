import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Download, Upload, ArrowLeft, Save, RotateCcw, Settings } from 'lucide-react';
import { useDashboardData } from '../contexts/DashboardDataContext';
import BasicDataForm from '../components/Admin/BasicDataForm';
import TrendDataForm from '../components/Admin/TrendDataForm';
import NewsDataForm from '../components/Admin/NewsDataForm';
import SiteDataForm from '../components/Admin/SiteDataForm';
import AdvancedForm from '../components/Admin/AdvancedForm';
import './DataAdmin.css';

const tabs = [
  { id: 'basic', label: '基础数据', icon: '📊' },
  { id: 'trends', label: '趋势数据', icon: '📈' },
  { id: 'news', label: '新闻动态', icon: '📰' },
  { id: 'sites', label: '工地实况', icon: '📷' },
  { id: 'advanced', label: '高级配置', icon: '⚙️' }
];

const DataAdmin = () => {
  const navigate = useNavigate();
  const { data, exportData, importData, resetData } = useDashboardData();
  const [activeTab, setActiveTab] = useState('basic');
  const [saveStatus, setSaveStatus] = useState('saved');
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);

  const handleExport = () => {
    exportData();
    setSaveStatus('exported');
    setTimeout(() => setSaveStatus('saved'), 2000);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      importData(file)
        .then(() => {
          setSaveStatus('imported');
          setTimeout(() => setSaveStatus('saved'), 2000);
        })
        .catch((err) => {
          alert('导入失败: ' + err.message);
        });
    }
  };

  const handleReset = () => {
    resetData();
    setSaveStatus('reset');
    setTimeout(() => setSaveStatus('saved'), 2000);
  };

  const handleTabChange = (tabId) => {
    if (tabId === 'advanced' && !isAdvancedMode) {
      const password = prompt('请输入高级模式密码 (默认: admin)');
      if (password === 'admin') {
        setIsAdvancedMode(true);
        setActiveTab(tabId);
      } else if (password !== null) {
        alert('密码错误');
      }
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-left">
          <Link to="/" className="back-btn">
            <ArrowLeft size={20} />
            返回大屏
          </Link>
          <h1 className="admin-title">数据管理后台</h1>
          <span className="admin-version">v{data.version}</span>
        </div>
        <div className="admin-header-right">
          <span className={`save-status ${saveStatus}`}>
            {saveStatus === 'saved' && '✓ 已保存'}
            {saveStatus === 'exported' && '✓ 已导出'}
            {saveStatus === 'imported' && '✓ 已导入'}
            {saveStatus === 'reset' && '✓ 已重置'}
          </span>
          <button className="admin-btn" onClick={handleExport}>
            <Download size={16} />
            导出
          </button>
          <label className="admin-btn">
            <Upload size={16} />
            导入
            <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
          </label>
          <button className="admin-btn danger" onClick={handleReset}>
            <RotateCcw size={16} />
            重置
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="admin-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
            {tab.id === 'advanced' && !isAdvancedMode && <span className="lock-icon">🔒</span>}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="admin-content">
        {activeTab === 'basic' && <BasicDataForm />}
        {activeTab === 'trends' && <TrendDataForm />}
        {activeTab === 'news' && <NewsDataForm />}
        {activeTab === 'sites' && <SiteDataForm />}
        {activeTab === 'advanced' && isAdvancedMode && <AdvancedForm />}
      </div>

      {/* Footer */}
      <footer className="admin-footer">
        <div className="footer-info">
          最后修改: {new Date(data.lastModified).toLocaleString('zh-CN')}
        </div>
      </footer>
    </div>
  );
};

export default DataAdmin;

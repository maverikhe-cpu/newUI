import React from 'react';
import { useDashboardData } from '../../contexts/DashboardDataContext';

const BasicDataForm = () => {
  const { data, updateData } = useDashboardData();
  const { business } = data;

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">基础业务数据</h2>

      {/* 项目统计 */}
      <div className="admin-form-group">
        <h3 className="admin-label" style={{ fontSize: '14px', color: '#00F0FF' }}>项目统计</h3>
        <div className="admin-form-row">
          <div>
            <label className="admin-label">在建项目总数</label>
            <div className="admin-input-unit">
              <input
                type="number"
                value={business.projectCount}
                onChange={(e) => updateData('business.projectCount', Number(e.target.value))}
                className="admin-input"
              />
              <span>个</span>
            </div>
          </div>
          <div>
            <label className="admin-label">本年度竣工率</label>
            <div className="admin-input-unit">
              <input
                type="number"
                value={business.completionRate}
                onChange={(e) => updateData('business.completionRate', Number(e.target.value))}
                className="admin-input"
              />
              <span>%</span>
            </div>
          </div>
          <div>
            <label className="admin-label">准时交付率</label>
            <div className="admin-input-unit">
              <input
                type="number"
                step="0.1"
                value={business.onTimeDelivery}
                onChange={(e) => updateData('business.onTimeDelivery', Number(e.target.value))}
                className="admin-input"
              />
              <span>%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 人员统计 */}
      <div className="admin-form-group">
        <h3 className="admin-label" style={{ fontSize: '14px', color: '#FFD700' }}>人员统计</h3>
        <div className="admin-form-row">
          <div>
            <label className="admin-label">当前在线工人数</label>
            <input
              type="number"
              value={business.workerCount}
              onChange={(e) => updateData('business.workerCount', Number(e.target.value))}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">活跃班组数</label>
            <input
              type="number"
              value={business.activeTeams}
              onChange={(e) => updateData('business.activeTeams', Number(e.target.value))}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">管理人员数</label>
            <input
              type="number"
              value={business.managers}
              onChange={(e) => updateData('business.managers', Number(e.target.value))}
              className="admin-input"
            />
          </div>
        </div>
      </div>

      {/* 安全与质检 */}
      <div className="admin-form-group">
        <h3 className="admin-label" style={{ fontSize: '14px', color: '#00F0FF' }}>安全与质检</h3>
        <div className="admin-form-row">
          <div>
            <label className="admin-label">安全施工天数</label>
            <div className="admin-input-unit">
              <input
                type="number"
                value={business.safetyDays}
                onChange={(e) => updateData('business.safetyDays', Number(e.target.value))}
                className="admin-input"
              />
              <span>天</span>
            </div>
          </div>
          <div>
            <label className="admin-label">今日预警</label>
            <input
              type="number"
              value={business.todayAlerts}
              onChange={(e) => updateData('business.todayAlerts', Number(e.target.value))}
              className="admin-input"
            />
          </div>
        </div>
      </div>

      {/* 项目进度 */}
      <div className="admin-form-group">
        <h3 className="admin-label" style={{ fontSize: '14px', color: '#00F0FF' }}>项目进度分布</h3>
        <div className="admin-form-row">
          <div>
            <label className="admin-label">正常施工</label>
            <div className="admin-input-unit">
              <input
                type="number"
                value={business.progress.normal}
                onChange={(e) => updateData('business.progress.normal', Number(e.target.value))}
                className="admin-input"
              />
              <span>%</span>
            </div>
          </div>
          <div>
            <label className="admin-label">收尾阶段</label>
            <div className="admin-input-unit">
              <input
                type="number"
                value={business.progress.finishing}
                onChange={(e) => updateData('business.progress.finishing', Number(e.target.value))}
                className="admin-input"
              />
              <span>%</span>
            </div>
          </div>
          <div>
            <label className="admin-label">延期风险</label>
            <div className="admin-input-unit">
              <input
                type="number"
                value={business.progress.risk}
                onChange={(e) => updateData('business.progress.risk', Number(e.target.value))}
                className="admin-input"
              />
              <span>%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 返工率 */}
      <div className="admin-form-group">
        <h3 className="admin-label" style={{ fontSize: '14px', color: '#FFD700' }}>返工率</h3>
        <div className="admin-form-row">
          <div>
            <label className="admin-label">本月返工率</label>
            <div className="admin-input-unit">
              <input
                type="number"
                step="0.1"
                value={business.reworkRate}
                onChange={(e) => updateData('business.reworkRate', Number(e.target.value))}
                className="admin-input"
              />
              <span>%</span>
            </div>
          </div>
          <div>
            <label className="admin-label">较上月变化</label>
            <input
              type="number"
              step="0.1"
              value={business.reworkChange}
              onChange={(e) => updateData('business.reworkChange', Number(e.target.value))}
              className="admin-input"
            />
            <div className="admin-hint">正数表示上升，负数表示下降</div>
          </div>
        </div>
      </div>

      {/* 客诉响应时效 */}
      <div className="admin-form-group">
        <h3 className="admin-label" style={{ fontSize: '14px', color: '#00F0FF' }}>客诉响应时效</h3>
        <div className="admin-form-row">
          <div>
            <label className="admin-label">平均响应时间</label>
            <div className="admin-input-unit">
              <input
                type="number"
                value={business.avgResponseTime}
                onChange={(e) => updateData('business.avgResponseTime', Number(e.target.value))}
                className="admin-input"
              />
              <span>分钟</span>
            </div>
          </div>
          <div>
            <label className="admin-label">平均解决时间</label>
            <div className="admin-input-unit">
              <input
                type="number"
                value={business.avgResolveTime}
                onChange={(e) => updateData('business.avgResolveTime', Number(e.target.value))}
                className="admin-input"
              />
              <span>小时</span>
            </div>
          </div>
        </div>
        <div className="admin-form-row">
          <div>
            <label className="admin-label">即时响应率</label>
            <div className="admin-input-unit">
              <input
                type="number"
                value={business.instantResponseRate}
                onChange={(e) => updateData('business.instantResponseRate', Number(e.target.value))}
                className="admin-input"
              />
              <span>%</span>
            </div>
          </div>
          <div>
            <label className="admin-label">24h解决率</label>
            <div className="admin-input-unit">
              <input
                type="number"
                value={business.resolveWithin24h}
                onChange={(e) => updateData('business.resolveWithin24h', Number(e.target.value))}
                className="admin-input"
              />
              <span>%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDataForm;

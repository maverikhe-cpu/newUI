import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Clock, Video, LayoutDashboard, ShieldCheck, Users, BarChart3, RotateCcw, MessageSquare, Timer, Maximize, Minimize, Settings } from 'lucide-react';
import CityMap from '../components/Map/CityMap';
import CameraModal from '../components/Video/CameraModal';
import { CircularGauge, TrendLine, SegmentedBar, DigitalCounter } from '../components/Widgets/TechCharts';
import MouseGlow from '../components/Effects/MouseGlow';
import ParticleBackground from '../components/Effects/ParticleBackground';
import SiteMarquee from '../components/Widgets/SiteMarquee';
import WeatherWidget from '../components/Widgets/WeatherWidget';
import IntroAnimation from '../components/Effects/IntroAnimation';
import NewsTicker from '../components/Widgets/NewsTicker';
import NeuralNetwork from '../components/Effects/NeuralNetwork';
import { useDashboardData } from '../contexts/DashboardDataContext';

const Dashboard = () => {
  const { data } = useDashboardData();
  const { business, trends, reworkReasons, news, sites, advanced } = data;

  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedSite, setSelectedSite] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      ));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    const element = wrapperRef.current;

    if (!document.fullscreenElement) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  return (
    <div className={`dashboard-wrapper${isFullscreen ? ' is-fullscreen' : ''}`} ref={wrapperRef}>
      <IntroAnimation />
      <MouseGlow />
      <ParticleBackground particleCount={advanced.particleCount} />
      <div className="dashboard-container">
        {/* Header */}
        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="header-title">未来筑家 · 智慧交付大屏</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <WeatherWidget />
            <div className="header-time">
              {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
            </div>
            <Link to="/admin" className="admin-link" title="数据管理">
              <Settings size={20} />
            </Link>
            <button
              className="fullscreen-btn"
              onClick={toggleFullscreen}
              title={isFullscreen ? '退出全屏' : '全屏显示'}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </header>

        {/* Left Panel */}
        <div className="left-column" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="panel with-mouse-glow energy-border" style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <div className="holographic-overlay" />
            <div className="panel-title"><Activity size={18} /> 交付能力总览</div>
            <div className="content-placeholder" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <DigitalCounter value={String(business.projectCount)} label="在建项目总数" unit="个" />
                <div style={{ marginTop: '10px' }}>
                  <SegmentedBar value={business.completionRate} label="本年度竣工" color="#00F0FF" />
                </div>
              </div>
              <CircularGauge value={business.onTimeDelivery} label="准时交付" color="#00F0FF" />
            </div>
          </div>
          <div className="panel with-mouse-glow energy-border" style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <div className="holographic-overlay" />
            <div className="panel-title"><Users size={18} /> 人员实时动态</div>
            <div className="content-placeholder">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--primary-amber)', textShadow: '0 0 10px rgba(255, 215, 0, 0.4)' }}>{business.workerCount}</div>
                <div style={{ fontSize: '12px', color: '#888', paddingBottom: '6px' }}>当前在线工人数</div>
              </div>
              <TrendLine dataPoints={trends.workerActivity} color="#FFD700" height={40} />
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <div style={{ flex: 1, background: 'rgba(255,215,0,0.1)', padding: '5px', borderRadius: '4px', textAlign: 'center' }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#FFD700' }}>{business.activeTeams}</div>
                  <div style={{ fontSize: '10px', color: '#aaa' }}>活跃班组</div>
                </div>
                <div style={{ flex: 1, background: 'rgba(0,240,255,0.1)', padding: '5px', borderRadius: '4px', textAlign: 'center' }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#00F0FF' }}>{business.managers}</div>
                  <div style={{ fontSize: '10px', color: '#aaa' }}>管理人员</div>
                </div>
              </div>
            </div>
          </div>
          <div className="panel with-mouse-glow" style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <div className="holographic-overlay" />
            <div className="panel-title"><ShieldCheck size={18} /> 安全与质检</div>
            <div className="content-placeholder" style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <DigitalCounter value={String(business.safetyDays)} label="安全施工天数" unit="天" />
                <div style={{ fontSize: '12px', color: '#00F0FF', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} /> 系统运行正常
                </div>
              </div>
              <div style={{ width: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 51, 102, 0.1)', borderRadius: '4px', border: '1px solid rgba(255, 51, 102, 0.2)' }}>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF3366' }}>{business.todayAlerts}</span>
                <span style={{ fontSize: '10px', color: '#FF3366' }}>今日预警</span>
              </div>
            </div>
          </div>
          <div className="panel with-mouse-glow" style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <div className="holographic-overlay" />
            <div className="panel-title"><BarChart3 size={18} /> 项目进度概览</div>
            <div className="content-placeholder">
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <div style={{ flex: 1, background: 'rgba(0,240,255,0.1)', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#00F0FF' }}>{business.progress.normal}%</div>
                  <div style={{ fontSize: '10px', color: '#aaa' }}>正常施工</div>
                </div>
                <div style={{ flex: 1, background: 'rgba(255,215,0,0.1)', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#FFD700' }}>{business.progress.finishing}%</div>
                  <div style={{ fontSize: '10px', color: '#aaa' }}>收尾阶段</div>
                </div>
                <div style={{ flex: 1, background: 'rgba(255,51,102,0.1)', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#FF3366' }}>{business.progress.risk}%</div>
                  <div style={{ fontSize: '10px', color: '#aaa' }}>延期风险</div>
                </div>
              </div>
              <div style={{ marginTop: '8px' }}>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>本周完成趋势</div>
                <TrendLine dataPoints={trends.weeklyProgress} color="#00F0FF" height={40} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '10px', color: '#666' }}>
                  <span>周一</span>
                  <span>周日</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Map */}
        <div className="panel center-column" style={{ padding: 0, border: 'none', background: 'transparent', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="map-container" style={{ flex: 1, minHeight: 0 }}>
            <CityMap onSiteSelect={setSelectedSite} sites={data.mapSites} />
          </div>

          <div style={{ flex: '0 0 110px' }}>
            <SiteMarquee height={110} images={sites} speed={advanced.marqueeSpeed} />
          </div>

          {selectedSite && (
            <CameraModal site={selectedSite} onClose={() => setSelectedSite(null)} />
          )}
        </div>

        {/* Right Panel */}
        <div className="right-column" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="panel with-mouse-glow" style={{ flex: 0.8, position: 'relative', overflow: 'hidden', minHeight: '0' }}>
            <div className="holographic-overlay" />
            <div className="panel-title"><Video size={18} /> 工地实时监控</div>
            <div className="content-placeholder" style={{ fontSize: '13px', lineHeight: '1.4', color: '#888' }}>
              {selectedSite ? (
                <div>
                  <div style={{ color: 'var(--primary-cyan)', marginBottom: '4px', fontSize: '16px' }}>{selectedSite.name}</div>
                  <div className="stat-row" style={{ padding: '8px 0' }}><span>状态</span> <span className={selectedSite.status === 'alert' ? 'text-red' : 'text-cyan'}>{selectedSite.status === 'alert' ? '异常' : '施工中'}</span></div>
                  <div className="stat-row" style={{ padding: '8px 0' }}><span>地址</span> <span style={{ fontSize: '12px' }}>{selectedSite.address}</span></div>
                  <div className="stat-row" style={{ padding: '8px 0' }}><span>当前进度</span> <span className="text-amber">{selectedSite.progress}%</span></div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '10px', color: 'var(--text-secondary)' }}>
                  请在地图上点击标记点<br />查看实时监控画面
                </div>
              )}
            </div>
          </div>
          <div className="panel with-mouse-glow" style={{ flex: 0.8, position: 'relative', overflow: 'hidden', minHeight: '0' }}>
            <div className="holographic-overlay" />
            <NeuralNetwork width={280} height={60} nodeCount={advanced.networkNodeCount} style={{ top: 'auto', bottom: 0, opacity: 0.15 }} />
            <div className="panel-title"><Clock size={18} /> 最新动态</div>
            <div className="content-placeholder" style={{ height: 'calc(100% - 40px)', overflow: 'hidden' }}>
              <NewsTicker items={news} speed={advanced.newsSpeed} visibleItems={advanced.newsVisibleItems} pauseOnHover={true} />
            </div>
          </div>
          <div className="panel with-mouse-glow" style={{ flex: 1.1, position: 'relative', overflow: 'hidden', minHeight: '0' }}>
            <div className="holographic-overlay" />
            <div className="panel-title"><RotateCcw size={18} /> 返工率</div>
            <div className="content-placeholder">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginTop: '4px' }}>
                <CircularGauge value={business.reworkRate} label="本月返工" color="#FFD700" />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#00F0FF', textShadow: '0 0 10px rgba(0, 240, 255, 0.5)' }}>
                    {business.reworkChange >= 0 ? '↑' : '↓'}{Math.abs(business.reworkChange)}%
                  </div>
                  <div style={{ fontSize: '10px', color: '#aaa', marginTop: '2px' }}>较上月</div>
                  <div style={{ fontSize: '10px', color: '#00F0FF', marginTop: '4px' }}>目标: &lt;3%</div>
                </div>
              </div>
              <div style={{ marginTop: '8px' }}>
                <div style={{ fontSize: '11px', color: '#888', marginBottom: '4px' }}>返工原因分布</div>
                {reworkReasons.map((reason, index) => (
                  <SegmentedBar
                    key={index}
                    value={reason.value}
                    label={reason.label}
                    color={reason.color}
                    total={8}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="panel with-mouse-glow energy-border" style={{ flex: 1.3, position: 'relative', overflow: 'hidden', minHeight: '0' }}>
            <div className="holographic-overlay" />
            <div className="panel-title"><MessageSquare size={18} /> 客诉响应时效</div>
            <div className="content-placeholder">
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <div style={{ flex: 1, textAlign: 'center', background: 'rgba(0,240,255,0.1)', padding: '8px', borderRadius: '4px' }}>
                  <Timer size={14} style={{ color: '#00F0FF', margin: '0 auto 4px' }} />
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#00F0FF', textShadow: '0 0 10px rgba(0, 240, 255, 0.5)' }}>{business.avgResponseTime}</div>
                  <div style={{ fontSize: '10px', color: '#aaa' }}>平均响应(分)</div>
                </div>
                <div style={{ flex: 1, textAlign: 'center', background: 'rgba(255,215,0,0.1)', padding: '8px', borderRadius: '4px' }}>
                  <Clock size={14} style={{ color: '#FFD700', margin: '0 auto 4px' }} />
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#FFD700', textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>{business.avgResolveTime}</div>
                  <div style={{ fontSize: '10px', color: '#aaa' }}>平均解决(时)</div>
                </div>
              </div>
              <div style={{ marginTop: '8px' }}>
                <div style={{ fontSize: '10px', color: '#888', marginBottom: '4px' }}>本周时效趋势</div>
                <TrendLine dataPoints={trends.responseTime} color="#00F0FF" height={30} />
              </div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                <div style={{ flex: 1, fontSize: '10px', color: '#00F0FF', textAlign: 'center', padding: '3px', background: 'rgba(0,240,255,0.1)', borderRadius: '4px' }}>
                  即时响应 {business.instantResponseRate}%
                </div>
                <div style={{ flex: 1, fontSize: '10px', color: '#FFD700', textAlign: 'center', padding: '3px', background: 'rgba(255,215,0,0.1)', borderRadius: '4px' }}>
                  24h解决 {business.resolveWithin24h}%
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

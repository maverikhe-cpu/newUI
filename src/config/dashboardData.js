/**
 * Default dashboard data configuration
 * All data points that can be modified through the admin interface
 */

export const defaultDashboardData = {
  version: '1.0.0',
  lastModified: new Date().toISOString(),

  // Basic business data (directly editable)
  business: {
    projectCount: 1234,
    completionRate: 68,
    onTimeDelivery: 98.5,
    workerCount: 450,
    activeTeams: 32,
    managers: 12,
    safetyDays: 365,
    todayAlerts: 0,
    progress: {
      normal: 68,
      finishing: 28,
      risk: 4
    },
    reworkRate: 2.8,
    reworkChange: -0.3,
    avgResponseTime: 15,
    avgResolveTime: 24,
    instantResponseRate: 85,
    resolveWithin24h: 94
  },

  // Trend data (arrays for charts)
  trends: {
    workerActivity: [20, 45, 30, 60, 55, 78, 45, 50, 40, 60],
    weeklyProgress: [40, 55, 48, 62, 58, 70, 65],
    responseTime: [35, 28, 22, 18, 20, 15, 12]
  },

  // Rework reasons distribution
  reworkReasons: [
    { label: '工艺问题', value: 35, color: '#FFD700' },
    { label: '材料缺陷', value: 25, color: '#FF3366' },
    { label: '设计变更', value: 20, color: '#00F0FF' }
  ],

  // News ticker data (20 items)
  news: [
    { time: '11:45', content: 'A区-3号楼主体结构封顶完成', color: 'var(--primary-cyan)' },
    { time: '11:30', content: 'B区-水电班组完成布线验收', color: 'var(--primary-cyan)' },
    { time: '11:15', content: 'C区-电梯安装调试通过检测', color: 'var(--primary-cyan)' },
    { time: '11:00', content: 'D区-外墙保温层施工完成80%', color: 'var(--primary-cyan)' },
    { time: '10:45', content: 'E区-园林景观工程开始施工', color: 'var(--primary-cyan)' },
    { time: '10:30', content: 'A区-消防系统通过初步验收', color: 'var(--primary-cyan)' },
    { time: '10:15', content: 'B区-地库环氧地坪开始铺设', color: 'var(--primary-cyan)' },
    { time: '10:00', content: 'C区-铝合金门窗安装完毕', color: 'var(--primary-cyan)' },
    { time: '09:45', content: 'D区-室内精装工程全面展开', color: 'var(--primary-cyan)' },
    { time: '09:30', content: 'E区-室外管网施工完成', color: 'var(--primary-cyan)' },
    { time: '09:15', content: '主材已进场-地板瓷砖3000㎡', color: 'var(--secondary-amber)' },
    { time: '09:00', content: '泥木班组打卡开工-实到32人', color: 'var(--primary-cyan)' },
    { time: '08:45', content: 'A区-弱电智能化系统调试中', color: 'var(--primary-cyan)' },
    { time: '08:30', content: 'B区-空调通风系统安装完毕', color: 'var(--primary-cyan)' },
    { time: '08:15', content: 'C区-厨卫防水施工完成', color: 'var(--primary-cyan)' },
    { time: '08:00', content: 'D区-公共区域装修材料进场', color: 'var(--secondary-amber)' },
    { time: '07:45', content: 'E区-景观绿化苗木开始种植', color: 'var(--primary-cyan)' },
    { time: '07:30', content: '安全巡查-各区域正常无隐患', color: 'var(--primary-cyan)' },
    { time: '07:15', content: '晨会召开-当日工作安排完成', color: 'var(--primary-cyan)' },
    { time: '07:00', content: '班组进场-水电班组到岗28人', color: 'var(--primary-cyan)' }
  ],

  // Construction site images (marquee)
  sites: [
    { src: '/construction_site_1_1768113029656.png', label: 'A区-主体结构施工' },
    { src: '/construction_site_2_1768113046044.png', label: 'B区-现场技术交底' },
    { src: '/construction_site_3_1768113066911.png', label: 'C区-塔吊夜间作业' },
    { src: '/construction_site_4_1768113084947.png', label: 'D区-土方机械作业' },
    { src: '/construction_site_1_1768113029656.png', label: 'E区-材料进场卸货' }
  ],

  // Map site data (40 mock sites)
  mapSites: Array.from({ length: 40 }, (_, i) => ({
    id: i,
    lat: 31.2304 + (Math.random() - 0.5) * 0.15,
    lng: 121.4737 + (Math.random() - 0.5) * 0.15,
    name: `项目 #${String(i + 1).padStart(3, '0')}`,
    address: `浦东新区 科技大道 ${Math.floor(Math.random() * 800) + 1}号`,
    status: Math.random() > 0.95 ? 'alert' : 'active',
    progress: Math.floor(Math.random() * 100)
  })),

  // Advanced configuration (requires advanced mode to edit)
  advanced: {
    particleCount: 60,
    networkNodeCount: 8,
    marqueeSpeed: 25,
    newsSpeed: 2000,
    newsVisibleItems: 3
  }
};

// Helper function to validate data types
export const validateData = (data) => {
  const errors = [];

  // Validate business data
  if (data.business) {
    const numFields = ['projectCount', 'completionRate', 'onTimeDelivery', 'workerCount', 'activeTeams', 'managers', 'safetyDays', 'todayAlerts'];
    numFields.forEach(field => {
      if (data.business[field] !== undefined && typeof data.business[field] !== 'number') {
        errors.push(`business.${field} must be a number`);
      }
    });
  }

  // Validate trends
  if (data.trends) {
    ['workerActivity', 'weeklyProgress', 'responseTime'].forEach(key => {
      if (data.trends[key] && !Array.isArray(data.trends[key])) {
        errors.push(`trends.${key} must be an array`);
      }
    });
  }

  // Validate news
  if (data.news && !Array.isArray(data.news)) {
    errors.push('news must be an array');
  }

  // Validate sites
  if (data.sites && !Array.isArray(data.sites)) {
    errors.push('sites must be an array');
  }

  return errors;
};

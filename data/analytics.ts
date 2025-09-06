import { VenturePerformance, AnalyticsOverview, WebsiteAnalytics } from '@/types/analytics'

export const mockAnalyticsOverview: AnalyticsOverview = {
  totalRevenue: 12500000,
  totalUsers: 45000,
  averageGrowth: 35,
  activeVentures: 9,
  monthlyGrowth: 22,
  yearlyProjection: 50000000
}

export const mockVenturePerformance: VenturePerformance[] = [
  {
    ventureId: '1',
    name: 'VCTRONICS CORP',
    currentRevenue: 3500000,
    monthlyGrowth: 45,
    userCount: 550,
    healthScore: 92,
    trend: 'up'
  },
  {
    ventureId: '2',
    name: 'VeriVox AI',
    currentRevenue: 0,
    monthlyGrowth: 0,
    userCount: 25,
    healthScore: 78,
    trend: 'up'
  },
  {
    ventureId: '3',
    name: 'Perfect Liquid',
    currentRevenue: 2100000,
    monthlyGrowth: 38,
    userCount: 100,
    healthScore: 88,
    trend: 'up'
  },
  {
    ventureId: '4',
    name: 'AtemaBio',
    currentRevenue: 1800000,
    monthlyGrowth: 15,
    userCount: 500,
    healthScore: 85,
    trend: 'stable'
  },
  {
    ventureId: '5',
    name: 'AstroForYou School',
    currentRevenue: 450000,
    monthlyGrowth: 28,
    userCount: 100,
    healthScore: 72,
    trend: 'up'
  },
  {
    ventureId: '6',
    name: 'GenieX Lab',
    currentRevenue: 0,
    monthlyGrowth: 0,
    userCount: 0,
    healthScore: 65,
    trend: 'stable'
  },
  {
    ventureId: '7',
    name: 'Domain Analyser',
    currentRevenue: 1200000,
    monthlyGrowth: 55,
    userCount: 80,
    healthScore: 90,
    trend: 'up'
  },
  {
    ventureId: '8',
    name: 'Facility Unlimited',
    currentRevenue: 2800000,
    monthlyGrowth: 18,
    userCount: 90,
    healthScore: 82,
    trend: 'stable'
  },
  {
    ventureId: '9',
    name: 'MPI Suppliers Group',
    currentRevenue: 650000,
    monthlyGrowth: 12,
    userCount: 15,
    healthScore: 75,
    trend: 'stable'
  }
]

export const mockWebsiteAnalytics: WebsiteAnalytics = {
  pageViews: 28500,
  uniqueVisitors: 8200,
  avgSessionDuration: 245, // seconds
  bounceRate: 42,
  topPages: [
    { path: '/portfolio', views: 8500, avgTime: 180 },
    { path: '/ai-lab', views: 6200, avgTime: 320 },
    { path: '/', views: 5800, avgTime: 120 },
    { path: '/investor', views: 4500, avgTime: 280 },
    { path: '/vision', views: 3500, avgTime: 240 }
  ],
  trafficSources: [
    { source: 'Direct', percentage: 35 },
    { source: 'Organic Search', percentage: 28 },
    { source: 'Social Media', percentage: 22 },
    { source: 'Referral', percentage: 15 }
  ]
}
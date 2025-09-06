export interface VentureMetric {
  id: string
  ventureId: string
  date: string
  revenue: number
  users: number
  growth: number
  engagement: number
}

export interface AnalyticsOverview {
  totalRevenue: number
  totalUsers: number
  averageGrowth: number
  activeVentures: number
  monthlyGrowth: number
  yearlyProjection: number
}

export interface VenturePerformance {
  ventureId: string
  name: string
  currentRevenue: number
  monthlyGrowth: number
  userCount: number
  healthScore: number // 0-100
  trend: 'up' | 'down' | 'stable'
}

export interface WebsiteAnalytics {
  pageViews: number
  uniqueVisitors: number
  avgSessionDuration: number
  bounceRate: number
  topPages: Array<{
    path: string
    views: number
    avgTime: number
  }>
  trafficSources: Array<{
    source: string
    percentage: number
  }>
}
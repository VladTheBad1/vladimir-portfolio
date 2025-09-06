export interface Report {
  id: string
  title: string
  description?: string
  type: 'portfolio-summary' | 'venture-performance' | 'financial-analysis' | 'market-intelligence' | 'team-performance' | 'investor-update' | 'board-deck' | 'custom'
  template: ReportTemplate
  schedule?: ReportSchedule
  recipients: Recipient[]
  status: 'draft' | 'scheduled' | 'generating' | 'completed' | 'failed' | 'cancelled'
  generatedAt?: string
  nextRunAt?: string
  createdBy: string
  createdAt: string
  updatedAt: string
  metrics: ReportMetrics
  sections: ReportSection[]
  exports: ReportExport[]
  analytics: ReportAnalytics
}

export interface ReportTemplate {
  id: string
  name: string
  category: 'executive' | 'financial' | 'operational' | 'marketing' | 'technical'
  description: string
  sections: TemplateSectionConfig[]
  styling: ReportStyling
  isDefault: boolean
  isCustom: boolean
  tags: string[]
}

export interface TemplateSectionConfig {
  id: string
  title: string
  type: 'executive-summary' | 'metrics-overview' | 'financial-performance' | 'venture-highlights' | 'market-analysis' | 'team-updates' | 'risk-analysis' | 'recommendations' | 'appendix' | 'custom'
  required: boolean
  order: number
  config: {
    dataSource: string[]
    chartTypes: ChartType[]
    filters: ReportFilter[]
    customQuery?: string
  }
}

export interface ReportStyling {
  primaryColor: string
  secondaryColor: string
  fontFamily: string
  logoUrl?: string
  headerImage?: string
  pageLayout: 'portrait' | 'landscape'
  includeTableOfContents: boolean
  includeExecutiveSummary: boolean
  includeAppendix: boolean
}

export interface ReportSchedule {
  frequency: 'daily' | 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly' | 'annual' | 'on-demand'
  dayOfWeek?: number // 0-6 (Sunday-Saturday)
  dayOfMonth?: number // 1-31
  time: string // HH:MM format
  timezone: string
  endDate?: string
  isActive: boolean
}

export interface Recipient {
  id: string
  name: string
  email: string
  role: string
  deliveryMethod: 'email' | 'slack' | 'dashboard' | 'api'
  preferences: {
    format: 'pdf' | 'html' | 'excel' | 'powerpoint'
    includeRawData: boolean
    includeCharts: boolean
    customSections?: string[]
  }
}

export interface ReportMetrics {
  totalSections: number
  dataPoints: number
  generationTime: number // seconds
  fileSize: number // bytes
  viewCount: number
  downloadCount: number
  shareCount: number
  lastViewed?: string
}

export interface ReportSection {
  id: string
  title: string
  type: string
  content: SectionContent
  order: number
  isVisible: boolean
  generatedAt: string
  dataSource: string[]
  insights: AIInsight[]
}

export interface SectionContent {
  text: string
  data: any[]
  charts: ChartConfig[]
  tables: TableConfig[]
  recommendations: string[]
  keyMetrics: KeyMetric[]
}

export interface ChartConfig {
  id: string
  type: ChartType
  title: string
  data: any[]
  config: {
    xAxis: string
    yAxis: string
    groupBy?: string
    colors?: string[]
    showLegend: boolean
    showGrid: boolean
  }
}

export interface TableConfig {
  id: string
  title: string
  headers: string[]
  rows: any[][]
  config: {
    sortable: boolean
    filterable: boolean
    exportable: boolean
    highlightRows?: number[]
  }
}

export interface KeyMetric {
  name: string
  value: number | string
  unit?: string
  trend?: 'up' | 'down' | 'stable'
  change?: number
  changeType?: 'percentage' | 'absolute'
  benchmark?: number
  target?: number
  status?: 'good' | 'warning' | 'critical'
}

export interface ReportExport {
  id: string
  format: 'pdf' | 'html' | 'excel' | 'powerpoint' | 'json'
  filePath: string
  fileSize: number
  generatedAt: string
  downloadCount: number
  isPublic: boolean
  expiresAt?: string
}

export interface ReportAnalytics {
  totalViews: number
  uniqueViewers: number
  avgViewTime: number // seconds
  topSections: { section: string; views: number }[]
  deviceBreakdown: { device: string; count: number }[]
  geographicDistribution: { country: string; count: number }[]
  engagementMetrics: {
    bounceRate: number
    timeOnReport: number
    downloadRate: number
    shareRate: number
  }
}

export interface AIInsight {
  id: string
  type: 'trend' | 'anomaly' | 'forecast' | 'recommendation' | 'risk' | 'opportunity'
  title: string
  description: string
  confidence: number // 0-1
  impact: 'low' | 'medium' | 'high'
  actionable: boolean
  metadata: {
    dataPoints: number
    timeframe: string
    algorithm: string
    parameters: Record<string, any>
  }
}

export type ChartType = 
  | 'line' 
  | 'bar' 
  | 'column' 
  | 'area' 
  | 'pie' 
  | 'donut' 
  | 'scatter' 
  | 'heatmap' 
  | 'gauge' 
  | 'funnel' 
  | 'waterfall'

export interface ReportFilter {
  field: string
  operator: 'equals' | 'not-equals' | 'greater-than' | 'less-than' | 'contains' | 'in' | 'between'
  value: any
  label?: string
}

export interface ReportDashboard {
  totalReports: number
  scheduledReports: number
  generatedThisMonth: number
  avgGenerationTime: number
  popularTemplates: { template: string; usage: number }[]
  recentActivity: ReportActivity[]
  systemHealth: ReportSystemHealth
}

export interface ReportActivity {
  id: string
  type: 'generated' | 'scheduled' | 'shared' | 'downloaded' | 'viewed'
  reportTitle: string
  user: string
  timestamp: string
  details?: string
}

export interface ReportSystemHealth {
  status: 'healthy' | 'degraded' | 'critical'
  generationQueue: number
  avgProcessingTime: number
  errorRate: number
  uptime: number
  lastError?: {
    message: string
    timestamp: string
    reportId: string
  }
}

export interface ReportBuilder {
  template: ReportTemplate
  dataConfig: DataSourceConfig[]
  previewData: any
  validationErrors: string[]
  estimatedGenTime: number
  estimatedFileSize: number
}

export interface DataSourceConfig {
  source: 'ventures' | 'financials' | 'team' | 'meetings' | 'documents' | 'market-intelligence' | 'custom-api'
  filters: ReportFilter[]
  aggregations: DataAggregation[]
  timeRange: {
    start: string
    end: string
    period: 'day' | 'week' | 'month' | 'quarter' | 'year'
  }
}

export interface DataAggregation {
  field: string
  operation: 'sum' | 'avg' | 'count' | 'min' | 'max' | 'median' | 'percentile'
  groupBy?: string
  having?: ReportFilter[]
}
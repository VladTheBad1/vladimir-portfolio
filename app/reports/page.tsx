'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  DocumentTextIcon, 
  ClockIcon,
  PlayIcon,
  PauseIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  ShareIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  ChartBarIcon,
  CalendarIcon,
  UsersIcon,
  CogIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon as ScheduleIcon,
  DocumentDuplicateIcon,
  BeakerIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { Report, ReportTemplate, ReportDashboard, ReportActivity, ReportSystemHealth } from '@/types/reporting'

const mockReportTemplates: ReportTemplate[] = [
  {
    id: 'template-1',
    name: 'Executive Portfolio Summary',
    category: 'executive',
    description: 'Comprehensive overview of portfolio performance with key metrics and insights',
    sections: [
      {
        id: 'exec-summary',
        title: 'Executive Summary',
        type: 'executive-summary',
        required: true,
        order: 1,
        config: {
          dataSource: ['ventures', 'financials'],
          chartTypes: ['bar', 'pie'],
          filters: []
        }
      },
      {
        id: 'financial-overview',
        title: 'Financial Performance',
        type: 'financial-performance',
        required: true,
        order: 2,
        config: {
          dataSource: ['financials'],
          chartTypes: ['line', 'bar', 'gauge'],
          filters: []
        }
      }
    ],
    styling: {
      primaryColor: '#2563EB',
      secondaryColor: '#64748B',
      fontFamily: 'Inter',
      pageLayout: 'portrait',
      includeTableOfContents: true,
      includeExecutiveSummary: true,
      includeAppendix: false
    },
    isDefault: true,
    isCustom: false,
    tags: ['executive', 'portfolio', 'monthly']
  },
  {
    id: 'template-2',
    name: 'Venture Deep Dive',
    category: 'operational',
    description: 'Detailed analysis of individual venture performance and metrics',
    sections: [
      {
        id: 'venture-metrics',
        title: 'Venture Metrics',
        type: 'metrics-overview',
        required: true,
        order: 1,
        config: {
          dataSource: ['ventures', 'financials', 'team'],
          chartTypes: ['line', 'bar', 'area'],
          filters: []
        }
      }
    ],
    styling: {
      primaryColor: '#059669',
      secondaryColor: '#6B7280',
      fontFamily: 'Inter',
      pageLayout: 'portrait',
      includeTableOfContents: false,
      includeExecutiveSummary: true,
      includeAppendix: true
    },
    isDefault: false,
    isCustom: false,
    tags: ['venture', 'analysis', 'deep-dive']
  },
  {
    id: 'template-3',
    name: 'Investor Update',
    category: 'financial',
    description: 'Monthly investor communication with portfolio highlights and metrics',
    sections: [],
    styling: {
      primaryColor: '#7C3AED',
      secondaryColor: '#9CA3AF',
      fontFamily: 'Inter',
      pageLayout: 'portrait',
      includeTableOfContents: false,
      includeExecutiveSummary: true,
      includeAppendix: false
    },
    isDefault: false,
    isCustom: false,
    tags: ['investor', 'monthly', 'update']
  }
]

const mockReports: Report[] = [
  {
    id: 'report-1',
    title: 'Q1 2024 Portfolio Performance',
    description: 'Comprehensive quarterly review of all venture performance',
    type: 'portfolio-summary',
    template: mockReportTemplates[0],
    schedule: {
      frequency: 'quarterly',
      time: '09:00',
      timezone: 'America/New_York',
      isActive: true
    },
    recipients: [
      {
        id: 'recipient-1',
        name: 'Board Members',
        email: 'board@vctronics.com',
        role: 'Board',
        deliveryMethod: 'email',
        preferences: {
          format: 'pdf',
          includeRawData: false,
          includeCharts: true
        }
      }
    ],
    status: 'completed',
    generatedAt: '2024-01-15T09:00:00Z',
    nextRunAt: '2024-04-15T09:00:00Z',
    createdBy: 'Vladimir Proskurov',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-15T09:30:00Z',
    metrics: {
      totalSections: 8,
      dataPoints: 247,
      generationTime: 45,
      fileSize: 5200000,
      viewCount: 23,
      downloadCount: 12,
      shareCount: 4,
      lastViewed: '2024-01-20T14:30:00Z'
    },
    sections: [],
    exports: [
      {
        id: 'export-1',
        format: 'pdf',
        filePath: '/reports/q1-2024-portfolio.pdf',
        fileSize: 5200000,
        generatedAt: '2024-01-15T09:00:00Z',
        downloadCount: 12,
        isPublic: false
      }
    ],
    analytics: {
      totalViews: 23,
      uniqueViewers: 8,
      avgViewTime: 420,
      topSections: [
        { section: 'Executive Summary', views: 23 },
        { section: 'Financial Performance', views: 18 },
        { section: 'Venture Highlights', views: 15 }
      ],
      deviceBreakdown: [
        { device: 'Desktop', count: 15 },
        { device: 'Mobile', count: 6 },
        { device: 'Tablet', count: 2 }
      ],
      geographicDistribution: [
        { country: 'United States', count: 18 },
        { country: 'Canada', count: 3 },
        { country: 'United Kingdom', count: 2 }
      ],
      engagementMetrics: {
        bounceRate: 0.12,
        timeOnReport: 420,
        downloadRate: 0.52,
        shareRate: 0.17
      }
    }
  },
  {
    id: 'report-2',
    title: 'VeriVox AI - Monthly Performance',
    description: 'Detailed monthly analysis of VeriVox AI venture metrics',
    type: 'venture-performance',
    template: mockReportTemplates[1],
    schedule: {
      frequency: 'monthly',
      dayOfMonth: 1,
      time: '08:00',
      timezone: 'America/New_York',
      isActive: true
    },
    recipients: [
      {
        id: 'recipient-2',
        name: 'VeriVox Team',
        email: 'team@verivoxai.com',
        role: 'Team Lead',
        deliveryMethod: 'email',
        preferences: {
          format: 'pdf',
          includeRawData: true,
          includeCharts: true
        }
      }
    ],
    status: 'scheduled',
    nextRunAt: '2024-02-01T08:00:00Z',
    createdBy: 'Vladimir Proskurov',
    createdAt: '2024-01-10T15:00:00Z',
    updatedAt: '2024-01-20T10:15:00Z',
    metrics: {
      totalSections: 6,
      dataPoints: 156,
      generationTime: 28,
      fileSize: 3400000,
      viewCount: 15,
      downloadCount: 8,
      shareCount: 2,
      lastViewed: '2024-01-19T11:20:00Z'
    },
    sections: [],
    exports: [],
    analytics: {
      totalViews: 15,
      uniqueViewers: 6,
      avgViewTime: 320,
      topSections: [],
      deviceBreakdown: [],
      geographicDistribution: [],
      engagementMetrics: {
        bounceRate: 0.08,
        timeOnReport: 320,
        downloadRate: 0.53,
        shareRate: 0.13
      }
    }
  },
  {
    id: 'report-3',
    title: 'Weekly Market Intelligence Digest',
    description: 'Automated weekly compilation of market insights and competitive analysis',
    type: 'market-intelligence',
    template: mockReportTemplates[2],
    schedule: {
      frequency: 'weekly',
      dayOfWeek: 1, // Monday
      time: '07:00',
      timezone: 'America/New_York',
      isActive: false
    },
    recipients: [
      {
        id: 'recipient-3',
        name: 'Executive Team',
        email: 'executives@vctronics.com',
        role: 'Executive',
        deliveryMethod: 'email',
        preferences: {
          format: 'html',
          includeRawData: false,
          includeCharts: true
        }
      }
    ],
    status: 'failed',
    generatedAt: '2024-01-22T07:00:00Z',
    createdBy: 'System',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-22T07:05:00Z',
    metrics: {
      totalSections: 4,
      dataPoints: 89,
      generationTime: 0,
      fileSize: 0,
      viewCount: 0,
      downloadCount: 0,
      shareCount: 0
    },
    sections: [],
    exports: [],
    analytics: {
      totalViews: 0,
      uniqueViewers: 0,
      avgViewTime: 0,
      topSections: [],
      deviceBreakdown: [],
      geographicDistribution: [],
      engagementMetrics: {
        bounceRate: 0,
        timeOnReport: 0,
        downloadRate: 0,
        shareRate: 0
      }
    }
  }
]

const mockDashboard: ReportDashboard = {
  totalReports: 24,
  scheduledReports: 8,
  generatedThisMonth: 12,
  avgGenerationTime: 35.2,
  popularTemplates: [
    { template: 'Executive Portfolio Summary', usage: 12 },
    { template: 'Venture Deep Dive', usage: 8 },
    { template: 'Investor Update', usage: 4 }
  ],
  recentActivity: [
    {
      id: 'activity-1',
      type: 'generated',
      reportTitle: 'Q1 2024 Portfolio Performance',
      user: 'System',
      timestamp: '2024-01-15T09:00:00Z',
      details: 'Auto-generated quarterly report'
    },
    {
      id: 'activity-2',
      type: 'downloaded',
      reportTitle: 'VeriVox AI - Monthly Performance',
      user: 'Sarah Johnson',
      timestamp: '2024-01-19T11:20:00Z'
    },
    {
      id: 'activity-3',
      type: 'shared',
      reportTitle: 'Q1 2024 Portfolio Performance',
      user: 'Vladimir Proskurov',
      timestamp: '2024-01-18T15:45:00Z',
      details: 'Shared with board members'
    }
  ],
  systemHealth: {
    status: 'healthy',
    generationQueue: 2,
    avgProcessingTime: 32.5,
    errorRate: 0.04,
    uptime: 99.8
  }
}

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reports' | 'templates' | 'builder'>('dashboard')
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [showBuilder, setShowBuilder] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-700 bg-green-100'
      case 'scheduled': return 'text-blue-700 bg-blue-100'
      case 'generating': return 'text-yellow-700 bg-yellow-100'
      case 'failed': return 'text-red-700 bg-red-100'
      case 'cancelled': return 'text-gray-700 bg-gray-100'
      default: return 'text-gray-700 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircleIcon className="h-4 w-4 text-green-600" />
      case 'scheduled': return <ScheduleIcon className="h-4 w-4 text-blue-600" />
      case 'generating': return <BeakerIcon className="h-4 w-4 text-yellow-600" />
      case 'failed': return <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />
      default: return <ClockIcon className="h-4 w-4 text-gray-600" />
    }
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const renderDashboardTab = () => (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-3xl font-bold text-gray-900">{mockDashboard.totalReports}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <DocumentTextIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled Reports</p>
              <p className="text-3xl font-bold text-gray-900">{mockDashboard.scheduledReports}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Generated This Month</p>
              <p className="text-3xl font-bold text-gray-900">{mockDashboard.generatedThisMonth}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Generation Time</p>
              <p className="text-3xl font-bold text-gray-900">{mockDashboard.avgGenerationTime}s</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  mockDashboard.systemHealth.status === 'healthy' ? 'bg-green-500' :
                  mockDashboard.systemHealth.status === 'degraded' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}></div>
                <span className="font-medium capitalize">{mockDashboard.systemHealth.status}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Generation Queue</span>
              <span className="font-medium">{mockDashboard.systemHealth.generationQueue} reports</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Processing Time</span>
              <span className="font-medium">{mockDashboard.systemHealth.avgProcessingTime}s avg</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Error Rate</span>
              <span className="font-medium">{(mockDashboard.systemHealth.errorRate * 100).toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Uptime</span>
              <span className="font-medium">{mockDashboard.systemHealth.uptime}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Templates</h3>
          <div className="space-y-3">
            {mockDashboard.popularTemplates.map((template, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700">{template.template}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{template.usage}</span>
                  <span className="text-xs text-gray-500">uses</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {mockDashboard.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className={`p-1 rounded-full ${
                  activity.type === 'generated' ? 'bg-blue-100' :
                  activity.type === 'downloaded' ? 'bg-green-100' :
                  activity.type === 'shared' ? 'bg-purple-100' :
                  'bg-gray-100'
                }`}>
                  {activity.type === 'generated' && <DocumentTextIcon className="h-3 w-3 text-blue-600" />}
                  {activity.type === 'downloaded' && <ArrowDownTrayIcon className="h-3 w-3 text-green-600" />}
                  {activity.type === 'shared' && <ShareIcon className="h-3 w-3 text-purple-600" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.reportTitle}</p>
                  <p className="text-xs text-gray-500">
                    {activity.type} by {activity.user}
                    {activity.details && ` • ${activity.details}`}
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(activity.timestamp).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderReportsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Generated Reports</h2>
        <button
          onClick={() => setShowBuilder(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          Create Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockReports.map((report) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedReport(report)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{report.title}</h3>
                {report.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">{report.description}</p>
                )}
              </div>
              <div className="flex items-center gap-1">
                {getStatusIcon(report.status)}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                {report.status}
              </span>
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                {report.template.name}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Type:</span>
                <span className="font-medium capitalize">{report.type.replace('-', ' ')}</span>
              </div>
              {report.generatedAt && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Generated:</span>
                  <span className="font-medium">{new Date(report.generatedAt).toLocaleDateString()}</span>
                </div>
              )}
              {report.schedule && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Schedule:</span>
                  <span className="font-medium capitalize">{report.schedule.frequency}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Views:</span>
                <span className="font-medium">{report.metrics.viewCount}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                {report.exports.length > 0 && (
                  <span>{formatFileSize(report.exports[0].fileSize)}</span>
                )}
                {report.generatedAt && report.exports.length > 0 && <span>•</span>}
                <span>{report.metrics.totalSections} sections</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                  <EyeIcon className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                  <ArrowDownTrayIcon className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors">
                  <ShareIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderTemplatesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Report Templates</h2>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          Create Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockReportTemplates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{template.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
              </div>
              <div className="flex items-center gap-1">
                {template.isDefault && (
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">
                    Default
                  </span>
                )}
                {template.isCustom && (
                  <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full font-medium">
                    Custom
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Category:</span>
                <span className="font-medium capitalize">{template.category}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Sections:</span>
                <span className="font-medium">{template.sections.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Layout:</span>
                <span className="font-medium capitalize">{template.styling.pageLayout}</span>
              </div>
            </div>

            {template.tags.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
              <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Use Template
              </button>
              <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                <PencilSquareIcon className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                <DocumentDuplicateIcon className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderBuilderTab = () => (
    <div className="space-y-8">
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
          <SparklesIcon className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Report Builder</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Create custom reports with our intelligent report builder. Select data sources, 
          customize layouts, and generate insights automatically.
        </p>
        
        <div className="mt-8 flex items-center justify-center gap-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            Start from Template
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <BeakerIcon className="h-5 w-5" />
            Build from Scratch
          </button>
        </div>
      </div>

      {/* Quick Templates */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Start Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockReportTemplates.slice(0, 2).map((template) => (
            <div key={template.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: template.styling.primaryColor + '20' }}>
                  <DocumentTextIcon className="h-4 w-4" style={{ color: template.styling.primaryColor }} />
                </div>
                <h4 className="font-medium text-gray-900">{template.name}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{template.sections.length} sections</span>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  Use Template →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Automated Reporting</h1>
              <p className="text-sm text-gray-600">AI-powered insights and automated report generation</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center gap-2">
                <SparklesIcon className="h-4 w-4" />
                AI Assistant
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-8 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'dashboard'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'reports'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Reports ({mockReports.length})
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'templates'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Templates ({mockReportTemplates.length})
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'builder'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            AI Builder
          </button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && renderDashboardTab()}
          {activeTab === 'reports' && renderReportsTab()}
          {activeTab === 'templates' && renderTemplatesTab()}
          {activeTab === 'builder' && renderBuilderTab()}
        </AnimatePresence>

        {/* Report Detail Modal */}
        <AnimatePresence>
          {selectedReport && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedReport(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedReport.title}</h2>
                      <p className="text-gray-600 mt-1">{selectedReport.description}</p>
                    </div>
                    <button
                      onClick={() => setSelectedReport(null)}
                      className="text-gray-400 hover:text-gray-600 text-xl"
                    >
                      ×
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Report Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{selectedReport.metrics.viewCount}</div>
                      <div className="text-sm text-gray-600">Views</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{selectedReport.metrics.downloadCount}</div>
                      <div className="text-sm text-gray-600">Downloads</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{formatDuration(selectedReport.metrics.generationTime)}</div>
                      <div className="text-sm text-gray-600">Generation Time</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{selectedReport.metrics.totalSections}</div>
                      <div className="text-sm text-gray-600">Sections</div>
                    </div>
                  </div>

                  {/* Report Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Report Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Status:</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedReport.status)}`}>
                            {selectedReport.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Template:</span>
                          <span className="font-medium">{selectedReport.template.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Created by:</span>
                          <span className="font-medium">{selectedReport.createdBy}</span>
                        </div>
                        {selectedReport.generatedAt && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Generated:</span>
                            <span className="font-medium">{new Date(selectedReport.generatedAt).toLocaleString()}</span>
                          </div>
                        )}
                        {selectedReport.schedule && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Schedule:</span>
                            <span className="font-medium">
                              {selectedReport.schedule.frequency} at {selectedReport.schedule.time}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Recipients</h3>
                      <div className="space-y-2">
                        {selectedReport.recipients.map((recipient) => (
                          <div key={recipient.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div>
                              <div className="font-medium text-sm">{recipient.name}</div>
                              <div className="text-xs text-gray-500">{recipient.email}</div>
                            </div>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              {recipient.preferences.format}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <EyeIcon className="h-4 w-4" />
                      View Report
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                      <ArrowDownTrayIcon className="h-4 w-4" />
                      Download
                    </button>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                      <ShareIcon className="h-4 w-4" />
                      Share
                    </button>
                    {selectedReport.schedule && (
                      <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2">
                        <CogIcon className="h-4 w-4" />
                        Edit Schedule
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
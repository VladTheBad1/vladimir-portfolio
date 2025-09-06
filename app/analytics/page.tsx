'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockAnalyticsOverview, mockVenturePerformance, mockWebsiteAnalytics } from '@/data/analytics'
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, Eye, Clock, MousePointer } from 'lucide-react'

export default function AnalyticsPage() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  return (
    <main className="min-h-screen pt-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Analytics Dashboard
          </h1>
          <p className="text-lg text-gray-700">
            Real-time insights into your venture portfolio and website performance
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-primary-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(mockAnalyticsOverview.totalRevenue)}
              </div>
              <p className="text-xs text-gray-700 mt-1">
                <span className="text-green-600 font-medium">+{mockAnalyticsOverview.monthlyGrowth}%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Total Users
              </CardTitle>
              <Users className="h-4 w-4 text-primary-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {formatNumber(mockAnalyticsOverview.totalUsers)}
              </div>
              <p className="text-xs text-gray-700 mt-1">
                Across {mockAnalyticsOverview.activeVentures} active ventures
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Average Growth
              </CardTitle>
              <Activity className="h-4 w-4 text-primary-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {mockAnalyticsOverview.averageGrowth}%
              </div>
              <p className="text-xs text-gray-700 mt-1">
                Portfolio-wide monthly growth
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Yearly Projection
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-primary-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(mockAnalyticsOverview.yearlyProjection)}
              </div>
              <p className="text-xs text-gray-700 mt-1">
                Based on current growth rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Venture Performance */}
        <Card className="bg-white mb-12">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">
              Venture Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Venture</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Revenue</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Growth</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Users</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Health</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {mockVenturePerformance.map((venture) => (
                    <tr key={venture.ventureId} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{venture.name}</span>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {formatCurrency(venture.currentRevenue)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${
                          venture.monthlyGrowth > 30 ? 'text-green-600' :
                          venture.monthlyGrowth > 10 ? 'text-blue-600' :
                          venture.monthlyGrowth > 0 ? 'text-gray-700' :
                          'text-gray-500'
                        }`}>
                          {venture.monthlyGrowth > 0 ? '+' : ''}{venture.monthlyGrowth}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {formatNumber(venture.userCount)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                venture.healthScore >= 80 ? 'bg-green-500' :
                                venture.healthScore >= 60 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${venture.healthScore}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-700">{venture.healthScore}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          {venture.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
                          {venture.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-600" />}
                          {venture.trend === 'stable' && <Activity className="h-4 w-4 text-gray-600" />}
                          <span className={`text-sm font-medium ${
                            venture.trend === 'up' ? 'text-green-600' :
                            venture.trend === 'down' ? 'text-red-600' :
                            'text-gray-600'
                          }`}>
                            {venture.trend.charAt(0).toUpperCase() + venture.trend.slice(1)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Website Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Website Traffic
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-primary-600" />
                    <span className="text-sm text-gray-700">Page Views</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {formatNumber(mockWebsiteAnalytics.pageViews)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary-600" />
                    <span className="text-sm text-gray-700">Unique Visitors</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {formatNumber(mockWebsiteAnalytics.uniqueVisitors)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary-600" />
                    <span className="text-sm text-gray-700">Avg Session</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {Math.floor(mockWebsiteAnalytics.avgSessionDuration / 60)}m {mockWebsiteAnalytics.avgSessionDuration % 60}s
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MousePointer className="h-4 w-4 text-primary-600" />
                    <span className="text-sm text-gray-700">Bounce Rate</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {mockWebsiteAnalytics.bounceRate}%
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Traffic Sources</h4>
                <div className="space-y-2">
                  {mockWebsiteAnalytics.trafficSources.map((source) => (
                    <div key={source.source} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{source.source}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary-600"
                            style={{ width: `${source.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-10 text-right">
                          {source.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Top Pages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockWebsiteAnalytics.topPages.map((page, index) => (
                  <div key={page.path} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-primary-600 w-6">
                        {index + 1}
                      </span>
                      <div>
                        <div className="font-medium text-gray-900">{page.path}</div>
                        <div className="text-sm text-gray-700">
                          {Math.floor(page.avgTime / 60)}m {page.avgTime % 60}s avg time
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        {formatNumber(page.views)}
                      </div>
                      <div className="text-sm text-gray-700">views</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
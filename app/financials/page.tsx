'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CurrencyDollarIcon, 
  TrendingUpIcon,
  TrendingDownIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  BanknotesIcon,
  CreditCardIcon,
  CalculatorIcon,
  PresentationChartLineIcon,
  DocumentChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon
} from '@heroicons/react/24/outline'
import { FinancialMetrics, PortfolioFinancials, FinancialAlert, BenchmarkData } from '@/types/financial'

const mockPortfolioFinancials: PortfolioFinancials = {
  totalValuation: 180000000, // $180M
  totalRevenue: 24600000, // $24.6M ARR
  totalFunding: 45000000, // $45M raised
  averageBurnRate: 850000, // $850K/month
  averageRunway: 18, // 18 months
  profitableVentures: 3,
  totalVentures: 9,
  performanceMetrics: [
    { name: 'Portfolio ROI', value: 245, unit: '%', benchmark: 180, trend: 'up' },
    { name: 'Avg Revenue Growth', value: 127, unit: '%', benchmark: 85, trend: 'up' },
    { name: 'Avg Gross Margin', value: 78, unit: '%', benchmark: 72, trend: 'up' },
    { name: 'Capital Efficiency', value: 3.2, unit: 'x', benchmark: 2.8, trend: 'up' }
  ],
  concentrationRisk: [
    { type: 'venture', name: 'VeriVox AI', percentage: 35, risk: 'medium' },
    { type: 'industry', name: 'AI/ML', percentage: 45, risk: 'medium' },
    { type: 'stage', name: 'Growth Stage', percentage: 60, risk: 'low' }
  ],
  diversification: {
    byStage: [
      { stage: 'Pre-Seed', count: 2, percentage: 22 },
      { stage: 'Seed', count: 3, percentage: 33 },
      { stage: 'Series A', count: 3, percentage: 33 },
      { stage: 'Series B', count: 1, percentage: 12 }
    ],
    byIndustry: [
      { industry: 'AI/ML', count: 4, percentage: 44 },
      { industry: 'Biotech', count: 2, percentage: 22 },
      { industry: 'EdTech', count: 1, percentage: 11 },
      { industry: 'SaaS', count: 2, percentage: 23 }
    ],
    byRevenueStage: [
      { stage: 'Pre-Revenue', count: 2, percentage: 22 },
      { stage: '$0-1M ARR', count: 3, percentage: 33 },
      { stage: '$1-10M ARR', count: 3, percentage: 33 },
      { stage: '$10M+ ARR', count: 1, percentage: 12 }
    ],
    herfindahlIndex: 0.24 // moderate concentration
  }
}

const mockVentureFinancials: FinancialMetrics[] = [
  {
    ventureId: 'verivox-ai',
    ventureName: 'VeriVox AI',
    period: '2024-Q1',
    revenue: {
      total: 8400000,
      recurring: 7800000,
      oneTime: 600000,
      growth: 142,
      segments: [
        { name: 'Enterprise', amount: 6200000, percentage: 74, growth: 156 },
        { name: 'SMB', amount: 1600000, percentage: 19, growth: 98 },
        { name: 'API', amount: 600000, percentage: 7, growth: 234 }
      ],
      monthlyData: [
        { month: 'Jan', value: 2600000, target: 2400000, growth: 15 },
        { month: 'Feb', value: 2800000, target: 2600000, growth: 18 },
        { month: 'Mar', value: 3000000, target: 2800000, growth: 22 }
      ]
    },
    expenses: {
      total: 4200000,
      operational: 800000,
      marketing: 1200000,
      personnel: 1800000,
      technology: 300000,
      legal: 100000,
      other: 0,
      burnRate: 1400000,
      growth: 85,
      categories: [
        { category: 'Personnel', amount: 1800000, percentage: 43, trend: 'increasing' },
        { category: 'Marketing', amount: 1200000, percentage: 29, trend: 'stable' },
        { category: 'Operations', amount: 800000, percentage: 19, trend: 'stable' }
      ]
    },
    profitability: {
      grossProfit: 6400000,
      grossMargin: 76,
      netProfit: 4200000,
      netMargin: 50,
      ebitda: 4800000,
      ebitdaMargin: 57,
      breakEvenDate: '2023-08-15',
      profitabilityTrend: 'improving'
    },
    cashFlow: {
      operating: 4200000,
      investing: -800000,
      financing: 0,
      net: 3400000,
      currentBalance: 18500000,
      runway: 24,
      burnRate: 1400000,
      projectedRunout: '2026-01-15'
    },
    funding: {
      totalRaised: 15000000,
      currentRound: {
        id: 'series-a',
        type: 'series-a',
        amount: 15000000,
        date: '2023-06-15',
        status: 'closed',
        leadInvestor: 'Sequoia Capital',
        preMoneyValuation: 45000000,
        postMoneyValuation: 60000000,
        equityPercentage: 25,
        investors: ['Sequoia Capital', 'A16Z', 'FirstRound'],
        useOfFunds: [
          { category: 'Product Development', amount: 6000000, percentage: 40 },
          { category: 'Sales & Marketing', amount: 4500000, percentage: 30 },
          { category: 'Team Expansion', amount: 3000000, percentage: 20 },
          { category: 'Working Capital', amount: 1500000, percentage: 10 }
        ]
      },
      previousRounds: [],
      investors: [
        {
          id: 'sequoia',
          name: 'Sequoia Capital',
          type: 'vc',
          tier: 'tier-1',
          investmentAmount: 8000000,
          equityPercentage: 13.3,
          investmentDate: '2023-06-15',
          status: 'active',
          boardSeat: true
        }
      ],
      equityDilution: 25,
      postMoneyValuation: 60000000
    },
    valuation: {
      current: 75000000,
      method: 'revenue-multiple',
      lastUpdated: '2024-01-15',
      history: [
        { date: '2023-06-15', valuation: 60000000, method: 'comparable', event: 'Series A' },
        { date: '2024-01-15', valuation: 75000000, method: 'revenue-multiple', event: 'Quarterly Review' }
      ],
      drivers: [
        { metric: 'ARR', value: 8400000, multiple: 8.9, weight: 60 },
        { metric: 'Growth Rate', value: 142, multiple: 1.2, weight: 25 },
        { metric: 'Gross Margin', value: 76, multiple: 1.1, weight: 15 }
      ]
    },
    kpis: [
      { name: 'ARR', value: 8400000, unit: '$', target: 10000000, trend: 'up', period: 'Q1-2024', category: 'revenue' },
      { name: 'MRR Growth', value: 12, unit: '%', target: 15, trend: 'up', period: 'Q1-2024', category: 'growth' },
      { name: 'Gross Margin', value: 76, unit: '%', target: 80, trend: 'up', period: 'Q1-2024', category: 'efficiency' },
      { name: 'CAC Payback', value: 8, unit: 'months', target: 12, trend: 'down', period: 'Q1-2024', category: 'efficiency' }
    ],
    projections: [
      { period: '2024-Q2', revenue: 10200000, expenses: 5100000, netIncome: 5100000, cashFlow: 4800000, confidence: 0.85, scenario: 'base' },
      { period: '2024-Q3', revenue: 12500000, expenses: 6200000, netIncome: 6300000, cashFlow: 5900000, confidence: 0.78, scenario: 'base' },
      { period: '2024-Q4', revenue: 15000000, expenses: 7500000, netIncome: 7500000, cashFlow: 7100000, confidence: 0.72, scenario: 'base' }
    ]
  },
  {
    ventureId: 'perfect-liquid',
    ventureName: 'Perfect Liquid',
    period: '2024-Q1',
    revenue: {
      total: 2800000,
      recurring: 2400000,
      oneTime: 400000,
      growth: 89,
      segments: [
        { name: 'Subscription', amount: 2400000, percentage: 86, growth: 95 },
        { name: 'Professional Services', amount: 400000, percentage: 14, growth: 56 }
      ],
      monthlyData: [
        { month: 'Jan', value: 850000, target: 800000, growth: 12 },
        { month: 'Feb', value: 920000, target: 880000, growth: 15 },
        { month: 'Mar', value: 1030000, target: 960000, growth: 18 }
      ]
    },
    expenses: {
      total: 2100000,
      operational: 400000,
      marketing: 600000,
      personnel: 900000,
      technology: 150000,
      legal: 50000,
      other: 0,
      burnRate: 700000,
      growth: 65,
      categories: [
        { category: 'Personnel', amount: 900000, percentage: 43, trend: 'increasing' },
        { category: 'Marketing', amount: 600000, percentage: 29, trend: 'stable' },
        { category: 'Operations', amount: 400000, percentage: 19, trend: 'stable' }
      ]
    },
    profitability: {
      grossProfit: 2200000,
      grossMargin: 79,
      netProfit: 700000,
      netMargin: 25,
      ebitda: 900000,
      ebitdaMargin: 32,
      breakEvenDate: '2023-11-30',
      profitabilityTrend: 'improving'
    },
    cashFlow: {
      operating: 850000,
      investing: -200000,
      financing: 0,
      net: 650000,
      currentBalance: 4200000,
      runway: 14,
      burnRate: 700000,
      projectedRunout: '2025-03-15'
    },
    funding: {
      totalRaised: 5000000,
      previousRounds: [
        {
          id: 'seed',
          type: 'seed',
          amount: 5000000,
          date: '2022-09-20',
          status: 'closed',
          leadInvestor: 'Accel Partners',
          preMoneyValuation: 15000000,
          postMoneyValuation: 20000000,
          equityPercentage: 25,
          investors: ['Accel Partners', 'Index Ventures'],
          useOfFunds: [
            { category: 'Product Development', amount: 2000000, percentage: 40 },
            { category: 'Marketing', amount: 1500000, percentage: 30 },
            { category: 'Team', amount: 1000000, percentage: 20 },
            { category: 'Operations', amount: 500000, percentage: 10 }
          ]
        }
      ],
      investors: [],
      equityDilution: 25,
      postMoneyValuation: 20000000,
      nextFundingTarget: 12000000,
      nextFundingDate: '2024-09-01'
    },
    valuation: {
      current: 28000000,
      method: 'revenue-multiple',
      lastUpdated: '2024-01-15',
      history: [
        { date: '2022-09-20', valuation: 20000000, method: 'comparable', event: 'Seed Round' },
        { date: '2024-01-15', valuation: 28000000, method: 'revenue-multiple', event: 'Quarterly Review' }
      ],
      drivers: [
        { metric: 'ARR', value: 2800000, multiple: 10, weight: 70 },
        { metric: 'Growth Rate', value: 89, multiple: 1.15, weight: 20 },
        { metric: 'Market Size', value: 50000000000, multiple: 0.8, weight: 10 }
      ]
    },
    kpis: [
      { name: 'ARR', value: 2800000, unit: '$', target: 3500000, trend: 'up', period: 'Q1-2024', category: 'revenue' },
      { name: 'Net Revenue Retention', value: 115, unit: '%', target: 120, trend: 'up', period: 'Q1-2024', category: 'retention' },
      { name: 'Gross Margin', value: 79, unit: '%', target: 82, trend: 'stable', period: 'Q1-2024', category: 'efficiency' }
    ],
    projections: [
      { period: '2024-Q2', revenue: 3400000, expenses: 2550000, netIncome: 850000, cashFlow: 800000, confidence: 0.82, scenario: 'base' },
      { period: '2024-Q3', revenue: 4100000, expenses: 3075000, netIncome: 1025000, cashFlow: 970000, confidence: 0.75, scenario: 'base' }
    ]
  }
]

const mockFinancialAlerts: FinancialAlert[] = [
  {
    id: 'alert-1',
    ventureId: 'atemabio',
    ventureName: 'AtemaBio',
    type: 'runway',
    severity: 'high',
    title: 'Low Cash Runway',
    description: 'Current runway of 8 months is below 12-month threshold',
    recommendation: 'Initiate Series A fundraising or reduce burn rate by 25%',
    dueDate: '2024-03-01',
    resolved: false,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'alert-2',
    ventureId: 'geniex-lab',
    ventureName: 'GenieX Lab',
    type: 'burn-rate',
    severity: 'medium',
    title: 'Increased Burn Rate',
    description: 'Monthly burn has increased 35% over last quarter',
    recommendation: 'Review marketing spend and operational efficiency',
    resolved: false,
    createdAt: '2024-01-18T14:30:00Z'
  },
  {
    id: 'alert-3',
    ventureId: 'perfect-liquid',
    ventureName: 'Perfect Liquid',
    type: 'funding-needed',
    severity: 'medium',
    title: 'Series A Timing',
    description: 'Optimal funding window approaching based on growth metrics',
    recommendation: 'Begin Series A preparation and investor outreach',
    dueDate: '2024-06-01',
    resolved: false,
    createdAt: '2024-01-20T09:15:00Z'
  }
]

const mockBenchmarks: BenchmarkData = {
  industry: 'SaaS',
  stage: 'Series A',
  metrics: {
    revenueGrowth: { median: 95, p75: 150, p90: 220 },
    grossMargin: { median: 72, p75: 78, p90: 85 },
    burnRate: { median: 450000, p75: 650000, p90: 950000 },
    runway: { median: 18, p75: 24, p90: 36 },
    cac: { median: 1200, p75: 850, p90: 600 },
    ltv: { median: 8500, p75: 12000, p90: 18000 },
    ltvCacRatio: { median: 7.1, p75: 14.1, p90: 30 }
  }
}

export default function FinancialsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'ventures' | 'portfolio' | 'alerts'>('overview')
  const [selectedVenture, setSelectedVenture] = useState<FinancialMetrics | null>(null)
  const [timeRange, setTimeRange] = useState('quarterly')

  const formatCurrency = (amount: number, decimals = 0) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(decimals)}M`
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(decimals)}K`
    }
    return `$${amount.toLocaleString()}`
  }

  const formatPercentage = (value: number, decimals = 1) => {
    return `${value.toFixed(decimals)}%`
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUpIcon className="h-4 w-4 text-green-500" />
      case 'down': return <ArrowDownIcon className="h-4 w-4 text-red-500" />
      default: return <MinusIcon className="h-4 w-4 text-gray-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-700 bg-red-100 border-red-200'
      case 'high': return 'text-orange-700 bg-orange-100 border-orange-200'
      case 'medium': return 'text-yellow-700 bg-yellow-100 border-yellow-200'
      case 'low': return 'text-blue-700 bg-blue-100 border-blue-200'
      default: return 'text-gray-700 bg-gray-100 border-gray-200'
    }
  }

  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Portfolio Value</p>
              <p className="text-3xl font-bold">{formatCurrency(mockPortfolioFinancials.totalValuation)}</p>
              <p className="text-blue-100 text-sm mt-1">+24% from last quarter</p>
            </div>
            <div className="p-3 bg-blue-400 bg-opacity-50 rounded-lg">
              <CurrencyDollarIcon className="h-8 w-8 text-blue-100" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total ARR</p>
              <p className="text-3xl font-bold">{formatCurrency(mockPortfolioFinancials.totalRevenue)}</p>
              <p className="text-green-100 text-sm mt-1">+127% YoY growth</p>
            </div>
            <div className="p-3 bg-green-400 bg-opacity-50 rounded-lg">
              <TrendingUpIcon className="h-8 w-8 text-green-100" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Funding Raised</p>
              <p className="text-3xl font-bold">{formatCurrency(mockPortfolioFinancials.totalFunding)}</p>
              <p className="text-purple-100 text-sm mt-1">Across {mockPortfolioFinancials.totalVentures} ventures</p>
            </div>
            <div className="p-3 bg-purple-400 bg-opacity-50 rounded-lg">
              <BanknotesIcon className="h-8 w-8 text-purple-100" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Avg Cash Runway</p>
              <p className="text-3xl font-bold">{mockPortfolioFinancials.averageRunway}mo</p>
              <p className="text-orange-100 text-sm mt-1">{mockPortfolioFinancials.profitableVentures}/{mockPortfolioFinancials.totalVentures} profitable</p>
            </div>
            <div className="p-3 bg-orange-400 bg-opacity-50 rounded-lg">
              <ClockIcon className="h-8 w-8 text-orange-100" />
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Performance</h3>
          <div className="space-y-4">
            {mockPortfolioFinancials.performanceMetrics.map((metric) => (
              <div key={metric.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getTrendIcon(metric.trend)}
                  <span className="text-sm font-medium text-gray-700">{metric.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">
                    {metric.value}{metric.unit}
                  </div>
                  {metric.benchmark && (
                    <div className="text-xs text-gray-500">
                      vs {metric.benchmark}{metric.unit} benchmark
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Diversification</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">By Stage</h4>
              <div className="space-y-2">
                {mockPortfolioFinancials.diversification.byStage.map((item) => (
                  <div key={item.stage} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.stage}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{item.count}</span>
                      <span className="text-xs text-gray-500">({item.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">By Industry</h4>
              <div className="space-y-2">
                {mockPortfolioFinancials.diversification.byIndustry.map((item) => (
                  <div key={item.industry} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.industry}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{item.count}</span>
                      <span className="text-xs text-gray-500">({item.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Ventures Performance */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Ventures</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockVentureFinancials.slice(0, 2).map((venture) => (
            <div 
              key={venture.ventureId} 
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedVenture(venture)}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-gray-900">{venture.ventureName}</h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  venture.profitability.netMargin > 0 ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                }`}>
                  {venture.profitability.netMargin > 0 ? 'Profitable' : 'Growth Stage'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">ARR:</span>
                  <span className="font-semibold text-gray-900 ml-1">
                    {formatCurrency(venture.revenue.total)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Growth:</span>
                  <span className="font-semibold text-green-600 ml-1">
                    +{formatPercentage(venture.revenue.growth)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Runway:</span>
                  <span className="font-semibold text-gray-900 ml-1">
                    {venture.cashFlow.runway}mo
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Valuation:</span>
                  <span className="font-semibold text-gray-900 ml-1">
                    {formatCurrency(venture.valuation.current)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderVenturesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Venture Financial Performance</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {mockVentureFinancials.map((venture) => (
          <motion.div
            key={venture.ventureId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedVenture(venture)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{venture.ventureName}</h3>
              <span className="text-sm text-gray-500">{venture.period}</span>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CurrencyDollarIcon className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Revenue</span>
                </div>
                <div className="text-xl font-bold text-blue-900">
                  {formatCurrency(venture.revenue.total)}
                </div>
                <div className="text-xs text-blue-700">
                  +{formatPercentage(venture.revenue.growth)} growth
                </div>
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUpIcon className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Gross Margin</span>
                </div>
                <div className="text-xl font-bold text-green-900">
                  {formatPercentage(venture.profitability.grossMargin)}
                </div>
                <div className="text-xs text-green-700">
                  {formatCurrency(venture.profitability.grossProfit)} profit
                </div>
              </div>

              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <ClockIcon className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">Cash Runway</span>
                </div>
                <div className="text-xl font-bold text-orange-900">
                  {venture.cashFlow.runway}mo
                </div>
                <div className="text-xs text-orange-700">
                  {formatCurrency(venture.cashFlow.burnRate)}/mo burn
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <ChartBarIcon className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">Valuation</span>
                </div>
                <div className="text-xl font-bold text-purple-900">
                  {formatCurrency(venture.valuation.current)}
                </div>
                <div className="text-xs text-purple-700">
                  {venture.valuation.method}
                </div>
              </div>
            </div>

            {/* Key KPIs */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Key Metrics</h4>
              {venture.kpis.slice(0, 3).map((kpi) => (
                <div key={kpi.name} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    {getTrendIcon(kpi.trend)}
                    <span className="text-sm text-gray-600">{kpi.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold">
                      {typeof kpi.value === 'number' && kpi.unit === '$' ? 
                        formatCurrency(kpi.value) : 
                        `${kpi.value}${kpi.unit}`
                      }
                    </span>
                    {kpi.target && (
                      <div className="text-xs text-gray-500">
                        of {typeof kpi.target === 'number' && kpi.unit === '$' ? 
                          formatCurrency(kpi.target) : 
                          `${kpi.target}${kpi.unit}`
                        } target
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderPortfolioTab = () => (
    <div className="space-y-8">
      {/* Concentration Risk */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Concentration Risk Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockPortfolioFinancials.concentrationRisk.map((risk, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 capitalize">{risk.type}</h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  risk.risk === 'high' ? 'text-red-700 bg-red-100' :
                  risk.risk === 'medium' ? 'text-orange-700 bg-orange-100' :
                  'text-green-700 bg-green-100'
                }`}>
                  {risk.risk} risk
                </span>
              </div>
              <div className="text-lg font-semibold text-gray-900">{risk.name}</div>
              <div className="text-2xl font-bold text-gray-900">{risk.percentage}%</div>
              <div className="text-sm text-gray-500 mt-1">of portfolio</div>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Distribution</h3>
          <div className="space-y-3">
            {mockPortfolioFinancials.diversification.byRevenueStage.map((item) => (
              <div key={item.stage} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">{item.stage}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-900">{item.count} ventures</span>
                  <div className="text-xs text-gray-500">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry Breakdown</h3>
          <div className="space-y-3">
            {mockPortfolioFinancials.diversification.byIndustry.map((item) => (
              <div key={item.industry} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">{item.industry}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-900">{item.count} ventures</span>
                  <div className="text-xs text-gray-500">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benchmark Comparison */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry Benchmarks ({mockBenchmarks.industry} - {mockBenchmarks.stage})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Revenue Growth</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Median:</span>
                <span className="font-semibold">{mockBenchmarks.metrics.revenueGrowth.median}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">75th percentile:</span>
                <span className="font-semibold">{mockBenchmarks.metrics.revenueGrowth.p75}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">90th percentile:</span>
                <span className="font-semibold">{mockBenchmarks.metrics.revenueGrowth.p90}%</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Gross Margin</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Median:</span>
                <span className="font-semibold">{mockBenchmarks.metrics.grossMargin.median}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">75th percentile:</span>
                <span className="font-semibold">{mockBenchmarks.metrics.grossMargin.p75}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">90th percentile:</span>
                <span className="font-semibold">{mockBenchmarks.metrics.grossMargin.p90}%</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Cash Runway</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Median:</span>
                <span className="font-semibold">{mockBenchmarks.metrics.runway.median} months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">75th percentile:</span>
                <span className="font-semibold">{mockBenchmarks.metrics.runway.p75} months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">90th percentile:</span>
                <span className="font-semibold">{mockBenchmarks.metrics.runway.p90} months</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAlertsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Financial Alerts</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{mockFinancialAlerts.filter(a => !a.resolved).length} active alerts</span>
        </div>
      </div>

      <div className="space-y-4">
        {mockFinancialAlerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-4 rounded-lg border-l-4 ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <ExclamationTriangleIcon className="h-5 w-5 text-current" />
                  <h3 className="font-semibold text-current">{alert.title}</h3>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-current bg-opacity-20">
                    {alert.severity}
                  </span>
                </div>
                
                <p className="text-sm text-current mb-2 opacity-90">{alert.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-current opacity-75">
                  <span>{alert.ventureName}</span>
                  <span>•</span>
                  <span>{new Date(alert.createdAt).toLocaleDateString()}</span>
                  {alert.dueDate && (
                    <>
                      <span>•</span>
                      <span>Due: {new Date(alert.dueDate).toLocaleDateString()}</span>
                    </>
                  )}
                </div>
                
                <div className="mt-3 p-3 bg-current bg-opacity-10 rounded-lg">
                  <h4 className="text-sm font-medium text-current mb-1">Recommendation:</h4>
                  <p className="text-sm text-current opacity-90">{alert.recommendation}</p>
                </div>
              </div>
              
              <div className="flex gap-2 ml-4">
                <button className="p-2 text-current hover:bg-current hover:bg-opacity-10 rounded-lg transition-colors">
                  <CheckCircleIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
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
              <h1 className="text-2xl font-bold text-gray-900">Financial Dashboard</h1>
              <p className="text-sm text-gray-600">Portfolio financial performance and insights</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <DocumentChartBarIcon className="h-4 w-4" />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-8 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('ventures')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'ventures'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Ventures ({mockVentureFinancials.length})
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'portfolio'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Portfolio Analysis
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'alerts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Alerts ({mockFinancialAlerts.filter(a => !a.resolved).length})
          </button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'ventures' && renderVenturesTab()}
          {activeTab === 'portfolio' && renderPortfolioTab()}
          {activeTab === 'alerts' && renderAlertsTab()}
        </AnimatePresence>

        {/* Venture Detail Modal */}
        <AnimatePresence>
          {selectedVenture && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedVenture(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedVenture.ventureName}</h2>
                      <p className="text-gray-600 mt-1">Financial Performance - {selectedVenture.period}</p>
                    </div>
                    <button
                      onClick={() => setSelectedVenture(null)}
                      className="text-gray-400 hover:text-gray-600 text-xl"
                    >
                      ×
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-8">
                  {/* Revenue Breakdown */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analysis</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Total Revenue:</span>
                          <span className="text-xl font-bold text-gray-900">
                            {formatCurrency(selectedVenture.revenue.total)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Recurring Revenue:</span>
                          <span className="font-semibold">
                            {formatCurrency(selectedVenture.revenue.recurring)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Growth Rate:</span>
                          <span className="font-semibold text-green-600">
                            +{formatPercentage(selectedVenture.revenue.growth)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Revenue Segments</h4>
                        <div className="space-y-2">
                          {selectedVenture.revenue.segments.map((segment) => (
                            <div key={segment.name} className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">{segment.name}</span>
                              <div className="text-right">
                                <div className="font-semibold text-sm">
                                  {formatCurrency(segment.amount)} ({segment.percentage}%)
                                </div>
                                <div className="text-xs text-green-600">
                                  +{formatPercentage(segment.growth)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profitability Metrics */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Profitability</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-sm font-medium text-green-800">Gross Profit</div>
                        <div className="text-xl font-bold text-green-900">
                          {formatCurrency(selectedVenture.profitability.grossProfit)}
                        </div>
                        <div className="text-sm text-green-700">
                          {formatPercentage(selectedVenture.profitability.grossMargin)} margin
                        </div>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-sm font-medium text-blue-800">Net Profit</div>
                        <div className="text-xl font-bold text-blue-900">
                          {formatCurrency(selectedVenture.profitability.netProfit)}
                        </div>
                        <div className="text-sm text-blue-700">
                          {formatPercentage(selectedVenture.profitability.netMargin)} margin
                        </div>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="text-sm font-medium text-purple-800">EBITDA</div>
                        <div className="text-xl font-bold text-purple-900">
                          {formatCurrency(selectedVenture.profitability.ebitda)}
                        </div>
                        <div className="text-sm text-purple-700">
                          {formatPercentage(selectedVenture.profitability.ebitdaMargin)} margin
                        </div>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="text-sm font-medium text-orange-800">Cash Flow</div>
                        <div className="text-xl font-bold text-orange-900">
                          {formatCurrency(selectedVenture.cashFlow.operating)}
                        </div>
                        <div className="text-sm text-orange-700">Operating</div>
                      </div>
                    </div>
                  </div>

                  {/* KPIs */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedVenture.kpis.map((kpi) => (
                        <div key={kpi.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            {getTrendIcon(kpi.trend)}
                            <span className="font-medium text-gray-900">{kpi.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-gray-900">
                              {typeof kpi.value === 'number' && kpi.unit === '$' ? 
                                formatCurrency(kpi.value) : 
                                `${kpi.value}${kpi.unit}`
                              }
                            </div>
                            {kpi.target && (
                              <div className="text-xs text-gray-500">
                                Target: {typeof kpi.target === 'number' && kpi.unit === '$' ? 
                                  formatCurrency(kpi.target) : 
                                  `${kpi.target}${kpi.unit}`
                                }
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
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
'use client'

import React, { useState } from 'react'
import { Navigation } from '@/components/layout/navigation'
import { H1, Lead, Text, H2 } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  DollarSign,
  TrendingUp,
  FileText,
  Calendar,
  Shield,
  Users,
  Calculator,
  Download,
  Lock,
  ChevronRight,
  ArrowUpRight,
  Building,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Briefcase,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  X,
  type LucideIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface InvestmentOpportunity {
  id: string
  venture: string
  stage: 'seed' | 'series-a' | 'series-b' | 'growth'
  targetRaise: string
  valuation: string
  minimumInvestment: string
  expectedROI: string
  timeline: string
  highlights: string[]
  risks: string[]
  featured?: boolean
}

interface PortfolioMetric {
  label: string
  value: string
  change: number
  icon: LucideIcon
}

const opportunities: InvestmentOpportunity[] = [
  {
    id: '1',
    venture: 'MediCore Solutions',
    stage: 'series-a',
    targetRaise: '$15M',
    valuation: '$75M',
    minimumInvestment: '$100K',
    expectedROI: '8-12x',
    timeline: '3-5 years',
    highlights: [
      'FDA approval in progress',
      '150+ hospitals signed',
      '$12M ARR, 180% YoY growth'
    ],
    risks: [
      'Regulatory approval timeline',
      'Competition from incumbents'
    ],
    featured: true
  },
  {
    id: '2',
    venture: 'NeuralForge AI',
    stage: 'seed',
    targetRaise: '$5M',
    valuation: '$20M',
    minimumInvestment: '$50K',
    expectedROI: '15-20x',
    timeline: '4-6 years',
    highlights: [
      'GPT-4 integration complete',
      '50+ enterprise clients',
      '$5M ARR, 220% YoY growth'
    ],
    risks: [
      'AI market saturation',
      'Technical talent retention'
    ],
    featured: true
  },
  {
    id: '3',
    venture: 'Global Ventures Fund III',
    stage: 'growth',
    targetRaise: '$100M',
    valuation: 'N/A',
    minimumInvestment: '$250K',
    expectedROI: '3-5x',
    timeline: '7-10 years',
    highlights: [
      'Diversified portfolio of 50+ ventures',
      'Access to all portfolio companies',
      'Proven track record from Fund I & II'
    ],
    risks: [
      'Market conditions',
      'Portfolio concentration'
    ]
  }
]

const portfolioMetrics: PortfolioMetric[] = [
  { label: 'Total Portfolio Value', value: '$125M', change: 45, icon: DollarSign },
  { label: 'Active Ventures', value: '42', change: 23, icon: Building },
  { label: 'Average IRR', value: '67%', change: 12, icon: TrendingUp },
  { label: 'Successful Exits', value: '7', change: 40, icon: Target }
]

const documents = [
  { name: 'Executive Summary Q4 2024', type: 'PDF', size: '2.4 MB', icon: FileText },
  { name: 'Financial Projections 2025-2030', type: 'XLSX', size: '1.8 MB', icon: BarChart3 },
  { name: 'Portfolio Performance Report', type: 'PDF', size: '3.2 MB', icon: PieChart },
  { name: 'Legal Structure Overview', type: 'PDF', size: '1.1 MB', icon: Shield }
]

export default function InvestorPage() {
  const [selectedOpportunity, setSelectedOpportunity] = useState<InvestmentOpportunity | null>(null)
  const [roiAmount, setRoiAmount] = useState('100000')
  const [roiYears, setRoiYears] = useState('5')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const calculateROI = () => {
    const amount = parseFloat(roiAmount) || 0
    const years = parseFloat(roiYears) || 1
    const avgReturn = 2.5 // 2.5x average return
    const projectedValue = amount * Math.pow(avgReturn, years / 5)
    const profit = projectedValue - amount
    const roi = ((profit / amount) * 100).toFixed(0)
    
    return {
      invested: amount,
      projected: projectedValue,
      profit: profit,
      roi: roi
    }
  }

  const roiData = calculateROI()

  const getStageColor = (stage: string) => {
    switch(stage) {
      case 'seed': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'series-a': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'series-b': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'growth': return 'bg-primary-500/20 text-primary-400 border-primary-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  // Simulated login (in production, use proper auth)
  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  if (!isAuthenticated) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen pt-24 flex items-center justify-center">
          <div className="section-container">
            <Card variant="default" className="max-w-md mx-auto bg-dark-800/50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl">Investor Portal</CardTitle>
                <CardDescription>
                  Access exclusive investment opportunities and portfolio insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Email</label>
                    <input
                      type="email"
                      placeholder="investor@example.com"
                      className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500"
                    />
                  </div>
                </div>
                
                <Button onClick={handleLogin} className="w-full" size="lg">
                  <Shield className="h-5 w-5 mr-2" />
                  Access Portal
                </Button>
                
                <div className="text-center space-y-2">
                  <Text className="text-sm text-gray-400">
                    Not an accredited investor yet?
                  </Text>
                  <Button variant="outline" size="sm">
                    Request Access
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24">
        {/* Hero Section */}
        <div className="section-container py-12">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="primary" className="mb-4">
              <Shield className="h-3 w-3 mr-1" />
              Accredited Investors Only
            </Badge>
            <H1 gradient className="mb-6">
              Investor Relations
            </H1>
            <Lead className="mb-8">
              Join us in building the future through strategic investments in revolutionary ventures
            </Lead>
          </div>

          {/* Portfolio Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {portfolioMetrics.map((metric) => {
              const Icon = metric.icon
              return (
                <Card key={metric.label} variant="default" className="bg-dark-800/30">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary-500/20 text-primary-400 flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +{metric.change}%
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-gray-100 mb-1">
                      {metric.value}
                    </div>
                    <Text className="text-xs text-gray-400">{metric.label}</Text>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Investment Opportunities */}
        <div className="section-container pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <H2 className="mb-4">Current Opportunities</H2>
              <Lead className="text-base">
                Exclusive access to high-growth ventures in our portfolio
              </Lead>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {opportunities.map((opp) => (
                <Card 
                  key={opp.id}
                  variant="default" 
                  className={cn(
                    "bg-dark-800/30 hover:bg-dark-800/50 transition-all cursor-pointer",
                    opp.featured && "ring-1 ring-primary-500/20"
                  )}
                  onClick={() => setSelectedOpportunity(opp)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        {opp.featured && (
                          <Badge variant="primary" className="mb-2">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        <CardTitle className="text-xl">{opp.venture}</CardTitle>
                      </div>
                      <Badge className={cn("text-xs", getStageColor(opp.stage))}>
                        {opp.stage.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <CardDescription>
                      Raising {opp.targetRaise} at {opp.valuation} valuation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Text className="text-xs text-gray-500">Min Investment</Text>
                        <div className="text-lg font-semibold text-gray-200">{opp.minimumInvestment}</div>
                      </div>
                      <div>
                        <Text className="text-xs text-gray-500">Expected ROI</Text>
                        <div className="text-lg font-semibold text-primary-400">{opp.expectedROI}</div>
                      </div>
                    </div>

                    <div>
                      <Text className="text-xs text-gray-500 mb-2">Key Highlights</Text>
                      <div className="space-y-1">
                        {opp.highlights.slice(0, 2).map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            <Text className="text-xs text-gray-300">{highlight}</Text>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      <ChevronRight className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="section-container pb-20">
          <div className="max-w-4xl mx-auto">
            <Card variant="default" className="bg-dark-800/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/20 text-primary-400 flex items-center justify-center">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle>ROI Calculator</CardTitle>
                    <CardDescription>Project your potential returns</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-400 mb-2 block">
                        Investment Amount ($)
                      </label>
                      <input
                        type="number"
                        value={roiAmount}
                        onChange={(e) => setRoiAmount(e.target.value)}
                        className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-gray-100 focus:outline-none focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400 mb-2 block">
                        Investment Period (Years)
                      </label>
                      <input
                        type="number"
                        value={roiYears}
                        onChange={(e) => setRoiYears(e.target.value)}
                        min="1"
                        max="10"
                        className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-gray-100 focus:outline-none focus:border-primary-500"
                      />
                    </div>
                    <div className="pt-4">
                      <Text className="text-xs text-gray-500 mb-2">Based on historical portfolio performance</Text>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-primary-400" />
                        <Text className="text-sm text-gray-400">Average portfolio return: 2.5x in 5 years</Text>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 p-6 bg-dark-700/30 rounded-lg">
                    <div className="text-center">
                      <Text className="text-sm text-gray-400 mb-2">Projected Value</Text>
                      <div className="text-4xl font-bold text-primary-400">
                        ${roiData.projected.toLocaleString('en-US', {maximumFractionDigits: 0})}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-600">
                      <div>
                        <Text className="text-xs text-gray-500">Total Profit</Text>
                        <div className="text-xl font-semibold text-green-400">
                          +${roiData.profit.toLocaleString('en-US', {maximumFractionDigits: 0})}
                        </div>
                      </div>
                      <div>
                        <Text className="text-xs text-gray-500">ROI %</Text>
                        <div className="text-xl font-semibold text-green-400">
                          {roiData.roi}%
                        </div>
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button className="w-full">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Start Investing
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Document Vault */}
        <div className="section-container pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <H2 className="mb-4">Due Diligence Vault</H2>
              <Lead className="text-base">
                Access confidential documents and reports
              </Lead>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {documents.map((doc) => {
                const Icon = doc.icon
                return (
                  <Card key={doc.name} variant="default" className="bg-dark-800/30 hover:bg-dark-800/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-dark-700 text-gray-400 flex items-center justify-center">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <Text className="font-medium text-gray-200">{doc.name}</Text>
                            <Text className="text-xs text-gray-500">{doc.type} • {doc.size}</Text>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="p-2">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        {/* Meeting Scheduler */}
        <div className="section-container pb-20">
          <Card variant="default" className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 border-primary-500/30">
            <CardContent className="p-12 text-center">
              <Badge variant="primary" className="mb-4">
                <Calendar className="h-3 w-3 mr-1" />
                Schedule a Meeting
              </Badge>
              <H2 className="mb-4">Let&apos;s Discuss Your Investment</H2>
              <Lead className="max-w-2xl mx-auto mb-8 text-base">
                Book a one-on-one call with our investment team to discuss opportunities, 
                portfolio strategy, and answer any questions.
              </Lead>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule Investment Call
                </Button>
                <Button variant="outline" size="lg">
                  <Users className="h-5 w-5 mr-2" />
                  Join Investor Webinar
                </Button>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <Text className="text-sm text-gray-400">Next available: Tomorrow at 2:00 PM EST</Text>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Opportunity Detail Modal */}
        {selectedOpportunity && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm"
            onClick={() => setSelectedOpportunity(null)}
          >
            <Card 
              variant="default" 
              className="bg-dark-800 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className={cn("mb-3", getStageColor(selectedOpportunity.stage))}>
                      {selectedOpportunity.stage.replace('-', ' ').toUpperCase()}
                    </Badge>
                    <CardTitle className="text-2xl mb-2">{selectedOpportunity.venture}</CardTitle>
                    <CardDescription className="text-base">
                      Raising {selectedOpportunity.targetRaise} at {selectedOpportunity.valuation} valuation
                    </CardDescription>
                  </div>
                  <button 
                    onClick={() => setSelectedOpportunity(null)}
                    className="text-gray-400 hover:text-gray-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Investment Terms */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-dark-700/30 rounded-lg p-4">
                    <Text className="text-xs text-gray-400 mb-1">Minimum</Text>
                    <div className="text-lg font-semibold text-gray-100">{selectedOpportunity.minimumInvestment}</div>
                  </div>
                  <div className="bg-dark-700/30 rounded-lg p-4">
                    <Text className="text-xs text-gray-400 mb-1">Expected ROI</Text>
                    <div className="text-lg font-semibold text-primary-400">{selectedOpportunity.expectedROI}</div>
                  </div>
                  <div className="bg-dark-700/30 rounded-lg p-4">
                    <Text className="text-xs text-gray-400 mb-1">Timeline</Text>
                    <div className="text-lg font-semibold text-gray-100">{selectedOpportunity.timeline}</div>
                  </div>
                  <div className="bg-dark-700/30 rounded-lg p-4">
                    <Text className="text-xs text-gray-400 mb-1">Target Raise</Text>
                    <div className="text-lg font-semibold text-gray-100">{selectedOpportunity.targetRaise}</div>
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h3 className="text-sm font-medium text-primary-400 mb-3">Investment Highlights</h3>
                  <div className="space-y-2">
                    {selectedOpportunity.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                        <Text className="text-gray-300">{highlight}</Text>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risk Factors */}
                <div>
                  <h3 className="text-sm font-medium text-primary-400 mb-3">Risk Factors</h3>
                  <div className="space-y-2">
                    {selectedOpportunity.risks.map((risk, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5" />
                        <Text className="text-gray-300">{risk}</Text>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t border-dark-700">
                  <Button className="flex-1">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Invest Now
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Call
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Download Deck
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </>
  )
}
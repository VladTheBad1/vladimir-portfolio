'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Globe,
  TrendingUp,
  AlertCircle,
  Newspaper,
  Target,
  Users,
  DollarSign,
  BarChart3,
  ChevronRight,
  Filter,
  Bell,
  BookOpen,
  Zap,
  Shield,
  Brain,
  Eye
} from 'lucide-react'
import { motion } from 'framer-motion'

interface MarketInsight {
  id: string
  title: string
  source: string
  category: 'competitor' | 'market-trend' | 'technology' | 'regulation' | 'funding' | 'partnership'
  impact: 'high' | 'medium' | 'low'
  relevantVentures: string[]
  summary: string
  url?: string
  date: string
  sentiment: 'positive' | 'neutral' | 'negative'
  actionRequired: boolean
}

interface Competitor {
  id: string
  name: string
  sector: string
  funding: string
  valuation: string
  threat: 'high' | 'medium' | 'low'
  strengths: string[]
  weaknesses: string[]
  recentActivity: string
}

const mockInsights: MarketInsight[] = [
  {
    id: '1',
    title: 'FDA Announces New AI Guidelines for Medical Devices',
    source: 'FDA News',
    category: 'regulation',
    impact: 'high',
    relevantVentures: ['VCTRONICS CORP'],
    summary: 'New regulatory framework streamlines approval for AI-powered diagnostic tools, reducing time to market by 40%.',
    date: '2025-01-18',
    sentiment: 'positive',
    actionRequired: true
  },
  {
    id: '2',
    title: 'Competitor Raises $50M Series B for Legal AI Platform',
    source: 'TechCrunch',
    category: 'competitor',
    impact: 'high',
    relevantVentures: ['VeriVox AI'],
    summary: 'LegalAI Inc. secures major funding to expand legal transcription services, planning aggressive market expansion.',
    date: '2025-01-17',
    sentiment: 'negative',
    actionRequired: true
  },
  {
    id: '3',
    title: 'Nano-coating Market Expected to Reach $15B by 2027',
    source: 'Market Research',
    category: 'market-trend',
    impact: 'medium',
    relevantVentures: ['Perfect Liquid'],
    summary: 'Growing demand in automotive and aerospace sectors driving rapid market expansion.',
    date: '2025-01-16',
    sentiment: 'positive',
    actionRequired: false
  },
  {
    id: '4',
    title: 'OpenAI Releases New Enterprise API Features',
    source: 'OpenAI Blog',
    category: 'technology',
    impact: 'medium',
    relevantVentures: ['VeriVox AI', 'Domain Analyser'],
    summary: 'Enhanced API capabilities could significantly improve transcription accuracy and domain analysis.',
    date: '2025-01-15',
    sentiment: 'positive',
    actionRequired: true
  }
]

const mockCompetitors: Competitor[] = [
  {
    id: '1',
    name: 'MedTech Solutions',
    sector: 'Healthcare AI',
    funding: '$75M',
    valuation: '$500M',
    threat: 'high',
    strengths: ['FDA approved', 'Strong partnerships', 'Market leader'],
    weaknesses: ['High cost', 'Limited flexibility', 'Slow innovation'],
    recentActivity: 'Acquired SmartDiag for $20M'
  },
  {
    id: '2',
    name: 'LegalAI Inc.',
    sector: 'Legal Tech',
    funding: '$50M',
    valuation: '$300M',
    threat: 'high',
    strengths: ['First mover', 'Large customer base', 'Strong brand'],
    weaknesses: ['Legacy technology', 'Poor UX', 'High churn'],
    recentActivity: 'Launched enterprise plan'
  },
  {
    id: '3',
    name: 'NanoShield',
    sector: 'Nano Materials',
    funding: '$30M',
    valuation: '$150M',
    threat: 'medium',
    strengths: ['Patent portfolio', 'R&D capabilities'],
    weaknesses: ['Limited distribution', 'High production cost'],
    recentActivity: 'Partnership with Boeing'
  }
]

const trendData = [
  { category: 'AI/ML Adoption', growth: 45, relevance: 'high' },
  { category: 'Healthcare Tech', growth: 38, relevance: 'high' },
  { category: 'Legal Automation', growth: 32, relevance: 'medium' },
  { category: 'Nano Materials', growth: 28, relevance: 'medium' },
  { category: 'Domain Trading', growth: 15, relevance: 'low' }
]

export default function IntelligencePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedInsight, setSelectedInsight] = useState<MarketInsight | null>(null)
  const [showCompetitors, setShowCompetitors] = useState(false)

  const getCategoryIcon = (category: MarketInsight['category']) => {
    const icons = {
      competitor: Users,
      'market-trend': TrendingUp,
      technology: Brain,
      regulation: Shield,
      funding: DollarSign,
      partnership: Target
    }
    const Icon = icons[category]
    return <Icon className="h-4 w-4" />
  }

  const getCategoryColor = (category: MarketInsight['category']) => {
    const colors = {
      competitor: 'bg-red-100 text-red-800',
      'market-trend': 'bg-blue-100 text-blue-800',
      technology: 'bg-purple-100 text-purple-800',
      regulation: 'bg-yellow-100 text-yellow-800',
      funding: 'bg-green-100 text-green-800',
      partnership: 'bg-pink-100 text-pink-800'
    }
    return colors[category]
  }

  const getImpactColor = (impact: string) => {
    if (impact === 'high') return 'text-red-600'
    if (impact === 'medium') return 'text-yellow-600'
    return 'text-gray-600'
  }

  const filteredInsights = selectedCategory === 'all' 
    ? mockInsights 
    : mockInsights.filter(i => i.category === selectedCategory)

  const actionRequiredCount = mockInsights.filter(i => i.actionRequired).length

  return (
    <main className="min-h-screen pt-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Market Intelligence
          </h1>
          <p className="text-lg text-gray-700">
            Real-time competitive insights and market trends across your ventures
          </p>
        </div>

        {/* Alert Banner */}
        {actionRequiredCount > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <p className="text-sm text-yellow-800">
              <span className="font-semibold">{actionRequiredCount} insights require your attention</span> - 
              Review competitor movements and regulatory changes
            </p>
            <Button variant="outline" size="sm" className="ml-auto">
              Review Now
            </Button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">New Insights</p>
                  <p className="text-2xl font-bold text-gray-900">{mockInsights.length}</p>
                  <p className="text-xs text-gray-500">This week</p>
                </div>
                <Newspaper className="h-8 w-8 text-primary-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Competitors</p>
                  <p className="text-2xl font-bold text-gray-900">{mockCompetitors.length}</p>
                  <p className="text-xs text-gray-500">Tracked</p>
                </div>
                <Eye className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Market Growth</p>
                  <p className="text-2xl font-bold text-gray-900">32%</p>
                  <p className="text-xs text-gray-500">YoY average</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Opportunities</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-xs text-gray-500">Identified</p>
                </div>
                <Zap className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6">
          <Button
            variant={selectedCategory === 'all' ? 'primary' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            size="sm"
          >
            All
          </Button>
          {['competitor', 'market-trend', 'technology', 'regulation', 'funding'].map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'primary' : 'outline'}
              onClick={() => setSelectedCategory(cat)}
              size="sm"
            >
              {cat.replace('-', ' ')}
            </Button>
          ))}
          <Button
            variant={showCompetitors ? 'primary' : 'outline'}
            onClick={() => setShowCompetitors(!showCompetitors)}
            size="sm"
            className="ml-auto"
          >
            <Users className="h-4 w-4 mr-2" />
            Competitors
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Insights Feed */}
          <div className="lg:col-span-2 space-y-4">
            {!showCompetitors ? (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Latest Intelligence</h2>
                {filteredInsights.map((insight, index) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className="bg-white hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedInsight(insight)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(insight.category)}
                            <Badge className={getCategoryColor(insight.category)}>
                              {insight.category.replace('-', ' ')}
                            </Badge>
                            {insight.actionRequired && (
                              <Badge variant="primary">Action Required</Badge>
                            )}
                          </div>
                          <span className={`text-sm font-medium ${getImpactColor(insight.impact)}`}>
                            {insight.impact} impact
                          </span>
                        </div>
                        
                        <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
                        <p className="text-sm text-gray-700 mb-3">{insight.summary}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>{insight.source}</span>
                            <span>•</span>
                            <span>{new Date(insight.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {insight.relevantVentures.map(venture => (
                              <Badge key={venture} variant="outline" className="text-xs">
                                {venture}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Competitor Analysis</h2>
                {mockCompetitors.map(competitor => (
                  <Card key={competitor.id} className="bg-white">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{competitor.name}</h3>
                          <p className="text-sm text-gray-600">{competitor.sector}</p>
                        </div>
                        <Badge variant={
                          competitor.threat === 'high' ? 'primary' :
                          competitor.threat === 'medium' ? 'outline' : 'default'
                        }>
                          {competitor.threat} threat
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-600">Funding</p>
                          <p className="font-semibold">{competitor.funding}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Valuation</p>
                          <p className="font-semibold">{competitor.valuation}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">Strengths</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {competitor.strengths.map(s => (
                              <li key={s}>• {s}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">Weaknesses</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {competitor.weaknesses.map(w => (
                              <li key={w}>• {w}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-600">Recent Activity</p>
                        <p className="text-sm font-medium text-gray-900">{competitor.recentActivity}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Market Trends */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Market Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendData.map(trend => (
                    <div key={trend.category}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700">{trend.category}</span>
                        <span className="text-sm font-medium text-green-600">
                          +{trend.growth}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${
                            trend.relevance === 'high' ? 'bg-green-500' :
                            trend.relevance === 'medium' ? 'bg-blue-500' :
                            'bg-gray-400'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${trend.growth * 2}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Selected Insight Detail */}
            {selectedInsight && (
              <Card className="bg-gradient-to-br from-primary-50 to-white border-primary-200">
                <CardHeader>
                  <CardTitle>Insight Detail</CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {selectedInsight.title}
                  </h4>
                  <p className="text-sm text-gray-700 mb-3">
                    {selectedInsight.summary}
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">Impact:</span>{' '}
                      <span className={`font-medium ${getImpactColor(selectedInsight.impact)}`}>
                        {selectedInsight.impact}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-600">Sentiment:</span>{' '}
                      <span className={`font-medium ${
                        selectedInsight.sentiment === 'positive' ? 'text-green-600' :
                        selectedInsight.sentiment === 'negative' ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {selectedInsight.sentiment}
                      </span>
                    </p>
                  </div>
                  {selectedInsight.actionRequired && (
                    <Button variant="primary" className="w-full mt-4">
                      Take Action
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* AI Insights */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary-600" />
                  AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="font-medium text-yellow-900 mb-1">⚠️ Competitive Threat</p>
                    <p className="text-yellow-800">
                      LegalAI's funding could accelerate market capture. Consider accelerating VeriVox AI launch.
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-900 mb-1">✅ Opportunity</p>
                    <p className="text-green-800">
                      New FDA guidelines create first-mover advantage for VCTRONICS CORP.
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-900 mb-1">💡 Recommendation</p>
                    <p className="text-blue-800">
                      Leverage OpenAI's new features across AI ventures for competitive edge.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
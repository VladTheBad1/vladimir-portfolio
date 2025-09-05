'use client'

import React, { useState } from 'react'
import { Navigation } from '@/components/layout/navigation'
import { H1, Lead, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Globe, 
  TrendingUp, 
  AlertCircle, 
  Activity,
  Target,
  DollarSign,
  ChevronRight,
  MapPin,
  BarChart3,
  Zap,
  Shield,
  Clock,
  ArrowUpRight,
  Minus,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MarketOpportunity {
  id: string
  region: string
  country: string
  sector: string
  opportunity: string
  marketSize: string
  growth: number
  competition: 'low' | 'medium' | 'high'
  entryBarrier: 'low' | 'medium' | 'high'
  timeToMarket: string
  keyPlayers: string[]
  trends: string[]
  risks: string[]
}

const marketOpportunities: MarketOpportunity[] = [
  {
    id: '1',
    region: 'North America',
    country: 'United States',
    sector: 'HealthTech',
    opportunity: 'AI-Powered Preventive Care',
    marketSize: '$45.3B',
    growth: 23.5,
    competition: 'medium',
    entryBarrier: 'medium',
    timeToMarket: '6-12 months',
    keyPlayers: ['Teladoc', 'Amwell', 'MDLive'],
    trends: ['Remote monitoring', 'Predictive diagnostics', 'Personalized medicine'],
    risks: ['Regulatory complexity', 'Data privacy concerns']
  },
  {
    id: '2',
    region: 'Europe',
    country: 'Germany',
    sector: 'CleanTech',
    opportunity: 'Industrial Energy Optimization',
    marketSize: '$28.7B',
    growth: 18.2,
    competition: 'low',
    entryBarrier: 'high',
    timeToMarket: '12-18 months',
    keyPlayers: ['Siemens', 'ABB', 'Schneider'],
    trends: ['Carbon neutrality', 'Smart factories', 'Energy storage'],
    risks: ['High initial investment', 'Long sales cycles']
  },
  {
    id: '3',
    region: 'Asia Pacific',
    country: 'Singapore',
    sector: 'FinTech',
    opportunity: 'Cross-Border Payment Infrastructure',
    marketSize: '$12.4B',
    growth: 31.2,
    competition: 'high',
    entryBarrier: 'medium',
    timeToMarket: '3-6 months',
    keyPlayers: ['Grab', 'Sea Group', 'Nium'],
    trends: ['Digital wallets', 'Blockchain settlements', 'Real-time payments'],
    risks: ['Regulatory changes', 'Currency volatility']
  },
  {
    id: '4',
    region: 'Middle East',
    country: 'UAE',
    sector: 'EdTech',
    opportunity: 'Corporate Training Platforms',
    marketSize: '$6.8B',
    growth: 28.7,
    competition: 'low',
    entryBarrier: 'low',
    timeToMarket: '3-6 months',
    keyPlayers: ['Almentor', 'Baims', 'Coded Minds'],
    trends: ['Microlearning', 'AI tutors', 'Skill verification'],
    risks: ['Cultural adaptation', 'Language barriers']
  },
  {
    id: '5',
    region: 'Africa',
    country: 'Nigeria',
    sector: 'AgriTech',
    opportunity: 'Supply Chain Digitization',
    marketSize: '$9.2B',
    growth: 35.4,
    competition: 'low',
    entryBarrier: 'medium',
    timeToMarket: '6-9 months',
    keyPlayers: ['Farmcrowdy', 'ThriveAgric', 'AgroMall'],
    trends: ['Mobile-first solutions', 'Weather analytics', 'Market linkages'],
    risks: ['Infrastructure challenges', 'Farmer adoption']
  },
  {
    id: '6',
    region: 'Latin America',
    country: 'Brazil',
    sector: 'E-commerce',
    opportunity: 'Social Commerce Platforms',
    marketSize: '$21.5B',
    growth: 26.8,
    competition: 'medium',
    entryBarrier: 'medium',
    timeToMarket: '6-12 months',
    keyPlayers: ['Mercado Libre', 'Magazine Luiza', 'Americanas'],
    trends: ['Live shopping', 'Influencer partnerships', 'Group buying'],
    risks: ['Economic instability', 'Logistics complexity']
  }
]

type RegionFilter = 'all' | 'North America' | 'Europe' | 'Asia Pacific' | 'Middle East' | 'Africa' | 'Latin America'
type SectorFilter = 'all' | 'HealthTech' | 'FinTech' | 'EdTech' | 'CleanTech' | 'AgriTech' | 'E-commerce'

export default function GlobalIntelligencePage() {
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>('all')
  const [selectedSector, setSelectedSector] = useState<SectorFilter>('all')
  const [selectedOpportunity, setSelectedOpportunity] = useState<MarketOpportunity | null>(null)

  const filteredOpportunities = marketOpportunities.filter(opp => {
    if (selectedRegion !== 'all' && opp.region !== selectedRegion) return false
    if (selectedSector !== 'all' && opp.sector !== selectedSector) return false
    return true
  })

  const getCompetitionColor = (level: string) => {
    switch(level) {
      case 'low': return 'text-green-400 bg-green-500/20'
      case 'medium': return 'text-yellow-400 bg-yellow-500/20'
      case 'high': return 'text-red-400 bg-red-500/20'
      default: return 'text-gray-700 bg-gray-500/20'
    }
  }

  const getGrowthIcon = (growth: number) => {
    if (growth > 25) return <ArrowUpRight className="h-4 w-4 text-green-400" />
    if (growth > 15) return <ArrowUpRight className="h-4 w-4 text-yellow-400" />
    if (growth > 0) return <ArrowUpRight className="h-4 w-4 text-gray-700" />
    return <Minus className="h-4 w-4 text-gray-700" />
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24 bg-white">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="primary" className="mb-4">
              <Globe className="h-3 w-3 mr-1" />
              Real-Time Market Intelligence
            </Badge>
            <H1 gradient className="mb-6">
              Global Opportunity Radar
            </H1>
            <Lead className="mb-8">
              Track emerging markets, identify white spaces, and discover your next billion-dollar opportunity
            </Lead>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-12">
              <Card variant="default" hover={false}>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-gray-900 mb-1">195</div>
                  <Text className="text-xs text-gray-600">Countries Tracked</Text>
                </CardContent>
              </Card>
              <Card variant="default" hover={false}>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-gray-900 mb-1">$2.3T</div>
                  <Text className="text-xs text-gray-600">Total Market Size</Text>
                </CardContent>
              </Card>
              <Card variant="default" hover={false}>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-gray-900 mb-1">847</div>
                  <Text className="text-xs text-gray-600">Opportunities</Text>
                </CardContent>
              </Card>
              <Card variant="default" hover={false}>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-gray-900 mb-1">24/7</div>
                  <Text className="text-xs text-gray-600">Live Updates</Text>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Filters and Map */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pb-20">
          <div className="max-w-7xl mx-auto">
            {/* Filters */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Region Filter */}
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Filter by Region</label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value as RegionFilter)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-gray-500"
                  >
                    <option value="all">All Regions</option>
                    <option value="North America">North America</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia Pacific">Asia Pacific</option>
                    <option value="Middle East">Middle East</option>
                    <option value="Africa">Africa</option>
                    <option value="Latin America">Latin America</option>
                  </select>
                </div>

                {/* Sector Filter */}
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Filter by Sector</label>
                  <select
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value as SectorFilter)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-gray-500"
                  >
                    <option value="all">All Sectors</option>
                    <option value="HealthTech">HealthTech</option>
                    <option value="FinTech">FinTech</option>
                    <option value="EdTech">EdTech</option>
                    <option value="CleanTech">CleanTech</option>
                    <option value="AgriTech">AgriTech</option>
                    <option value="E-commerce">E-commerce</option>
                  </select>
                </div>

                {/* Live Status */}
                <div className="flex items-end">
                  <Card variant="default" className="px-4 py-2" hover={false}>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <Text className="text-xs text-gray-600">Live Updates Active</Text>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            {/* Opportunities Grid */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredOpportunities.map((opp) => (
                <Card 
                  key={opp.id}
                  variant="default" 
                  className="hover:bg-white transition-all cursor-pointer"
                  onClick={() => setSelectedOpportunity(opp)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        <MapPin className="h-3 w-3 mr-1" />
                        {opp.country}
                      </Badge>
                      <Badge className={cn("text-xs", getCompetitionColor(opp.competition))}>
                        {opp.competition} competition
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{opp.opportunity}</CardTitle>
                    <CardDescription>{opp.sector} • {opp.region}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Market Size & Growth */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Text className="text-xs text-gray-600 mb-1">Market Size</Text>
                        <div className="text-lg font-semibold text-gray-900">{opp.marketSize}</div>
                      </div>
                      <div>
                        <Text className="text-xs text-gray-600 mb-1">YoY Growth</Text>
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-semibold text-gray-900">{opp.growth}%</span>
                          {getGrowthIcon(opp.growth)}
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-gray-700">
                        <Clock className="h-3 w-3" />
                        <span>{opp.timeToMarket}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-700">
                        <Shield className="h-3 w-3" />
                        <span>{opp.entryBarrier} barrier</span>
                      </div>
                    </div>

                    {/* Top Trends */}
                    <div>
                      <Text className="text-xs text-gray-600 mb-2">Trending</Text>
                      <div className="flex flex-wrap gap-1">
                        {opp.trends.slice(0, 2).map((trend, index) => (
                          <span key={index} className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-700">
                            {trend}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      <ChevronRight className="h-4 w-4 mr-1" />
                      View Analysis
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detailed View Modal */}
            {selectedOpportunity && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm" onClick={() => setSelectedOpportunity(null)}>
                <Card 
                  variant="default" 
                  className="bg-white shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="primary" className="mb-3">
                          <MapPin className="h-3 w-3 mr-1" />
                          {selectedOpportunity.country} • {selectedOpportunity.region}
                        </Badge>
                        <CardTitle className="text-2xl mb-2">{selectedOpportunity.opportunity}</CardTitle>
                        <CardDescription className="text-base">{selectedOpportunity.sector} Sector</CardDescription>
                      </div>
                      <button 
                        onClick={() => setSelectedOpportunity(null)}
                        className="text-gray-700 hover:text-gray-900"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gray-700" />
                          <Text className="text-xs text-gray-600">Market Size</Text>
                        </div>
                        <div className="text-xl font-semibold text-gray-900">{selectedOpportunity.marketSize}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-green-400" />
                          <Text className="text-xs text-gray-600">Growth Rate</Text>
                        </div>
                        <div className="text-xl font-semibold text-gray-900">{selectedOpportunity.growth}%</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="h-4 w-4 text-yellow-400" />
                          <Text className="text-xs text-gray-600">Competition</Text>
                        </div>
                        <div className="text-xl font-semibold text-gray-900 capitalize">{selectedOpportunity.competition}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-blue-400" />
                          <Text className="text-xs text-gray-600">Time to Market</Text>
                        </div>
                        <div className="text-xl font-semibold text-gray-900">{selectedOpportunity.timeToMarket}</div>
                      </div>
                    </div>

                    {/* Key Players */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Key Players</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedOpportunity.keyPlayers.map((player) => (
                          <Badge key={player} variant="outline">{player}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Market Trends */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Market Trends</h3>
                      <div className="space-y-2">
                        {selectedOpportunity.trends.map((trend, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-yellow-400" />
                            <Text className="text-gray-700">{trend}</Text>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Risk Factors */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Risk Factors</h3>
                      <div className="space-y-2">
                        {selectedOpportunity.risks.map((risk, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-400" />
                            <Text className="text-gray-700">{risk}</Text>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4 border-t border-gray-300">
                      <Button className="flex-1">
                        <Target className="h-4 w-4 mr-2" />
                        Create Venture Plan
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Deep Dive Analysis
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
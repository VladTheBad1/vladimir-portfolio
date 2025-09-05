'use client'

import React, { useState } from 'react'
import { Navigation } from '@/components/layout/navigation'
import { H1, Lead, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  Zap, 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign,
  Brain,
  Rocket,
  ChevronRight,
  Timer,
  CheckCircle,
  RefreshCw,
  Lightbulb,
  Search,
  Shield,
  Globe
} from 'lucide-react'
import { cn } from '@/lib/utils'

type GenerationPhase = 'ideation' | 'validation' | 'business-model' | 'mvp-blueprint' | 'complete'

interface GeneratedVenture {
  name: string
  tagline: string
  problem: string
  solution: string
  targetMarket: string
  marketSize: string
  businessModel: string
  competitiveAdvantage: string
  mvpFeatures: string[]
  timeToMarket: string
  estimatedRevenue: string
  teamNeeded: string[]
}

const sampleVentures: GeneratedVenture[] = [
  {
    name: "HealthPulse AI",
    tagline: "Predictive health monitoring for preventive care",
    problem: "70% of chronic diseases are preventable but go undetected until symptoms appear",
    solution: "AI-powered wearable analysis that predicts health issues 6 months before symptoms",
    targetMarket: "Health-conscious professionals aged 35-55",
    marketSize: "$18.5B TAM in preventive healthcare",
    businessModel: "B2C subscription ($29/month) + B2B2C insurance partnerships",
    competitiveAdvantage: "Proprietary ML models trained on 10M+ health records",
    mvpFeatures: [
      "Real-time biometric monitoring",
      "AI health predictions",
      "Doctor consultation booking",
      "Personalized health plans"
    ],
    timeToMarket: "90 days",
    estimatedRevenue: "$5M ARR Year 1",
    teamNeeded: ["ML Engineer", "Health Data Scientist", "Mobile Developer", "Medical Advisor"]
  },
  {
    name: "EcoChain Markets",
    tagline: "Blockchain-verified sustainable supply chains",
    problem: "83% of consumers want transparency in product sustainability but can't verify claims",
    solution: "Blockchain platform that tracks and verifies sustainable practices from source to shelf",
    targetMarket: "Conscious consumers and sustainable brands",
    marketSize: "$125B sustainable products market",
    businessModel: "SaaS for brands ($500-5000/month) + consumer app with premium features",
    competitiveAdvantage: "First-mover in blockchain sustainability verification",
    mvpFeatures: [
      "Supply chain tracking",
      "Sustainability scoring",
      "QR code verification",
      "Brand dashboard"
    ],
    timeToMarket: "120 days",
    estimatedRevenue: "$8M ARR Year 1",
    teamNeeded: ["Blockchain Developer", "Supply Chain Expert", "Sales Lead", "Sustainability Consultant"]
  }
]

export default function AILabPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<GenerationPhase>('ideation')
  const [generatedVenture, setGeneratedVenture] = useState<GeneratedVenture | null>(null)
  const [selectedIndustry, setSelectedIndustry] = useState('')

  const phases = [
    { id: 'ideation', label: 'Ideation', icon: Lightbulb, duration: '5 min' },
    { id: 'validation', label: 'Market Validation', icon: Search, duration: '10 min' },
    { id: 'business-model', label: 'Business Model', icon: DollarSign, duration: '15 min' },
    { id: 'mvp-blueprint', label: 'MVP Blueprint', icon: Rocket, duration: '10 min' },
    { id: 'complete', label: 'Complete', icon: CheckCircle, duration: '40 min total' }
  ]

  const industries = [
    'HealthTech', 'FinTech', 'EdTech', 'SaaS', 
    'E-commerce', 'CleanTech', 'AI/ML', 'Blockchain'
  ]

  const generateVenture = () => {
    setIsGenerating(true)
    setCurrentPhase('ideation')
    
    // Simulate generation phases
    const phaseSequence: GenerationPhase[] = ['ideation', 'validation', 'business-model', 'mvp-blueprint', 'complete']
    
    phaseSequence.forEach((phase, index) => {
      setTimeout(() => {
        setCurrentPhase(phase)
        if (phase === 'complete') {
          setGeneratedVenture(sampleVentures[Math.floor(Math.random() * sampleVentures.length)])
          setIsGenerating(false)
        }
      }, index * 1500)
    })
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24 bg-white">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="primary" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered Innovation
            </Badge>
            <H1 gradient className="mb-6">
              Venture Creation Laboratory
            </H1>
            <Lead className="mb-8">
              Transform ideas into venture-ready companies in under 24 hours
            </Lead>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              <Card variant="default" hover={false}>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">365</div>
                  <Text className="text-sm text-gray-600">Companies Per Year</Text>
                </CardContent>
              </Card>
              <Card variant="default" hover={false}>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">40min</div>
                  <Text className="text-sm text-gray-600">Concept to Blueprint</Text>
                </CardContent>
              </Card>
              <Card variant="default" hover={false}>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">87%</div>
                  <Text className="text-sm text-gray-600">Market Validation Rate</Text>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Generation Interface */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pb-20">
          <div className="max-w-6xl mx-auto">
            {!generatedVenture ? (
              <Card variant="default" hover={false}>
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">Generate Your Next Venture</CardTitle>
                  <CardDescription>
                    Select an industry or let AI surprise you with an innovative concept
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Industry Selection */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Choose Industry (Optional)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {industries.map((industry) => (
                        <button
                          key={industry}
                          onClick={() => setSelectedIndustry(industry === selectedIndustry ? '' : industry)}
                          className={cn(
                            "px-4 py-2 rounded-lg border border-transparent transition-all",
                            selectedIndustry === industry
                              ? "bg-primary-500 text-white border-primary-500"
                              : "bg-gray-100 text-gray-700 hover:border-gray-600"
                          )}
                        >
                          {industry}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Progress Phases */}
                  {isGenerating && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-2">
                        <Text className="text-sm text-gray-600">Generation Progress</Text>
                        <Badge variant="outline" className="text-xs">
                          <Timer className="h-3 w-3 mr-1" />
                          Est. 40 min
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        {phases.map((phase, index) => {
                          const Icon = phase.icon
                          const isActive = phase.id === currentPhase
                          const isComplete = phases.findIndex(p => p.id === currentPhase) > index
                          
                          return (
                            <div
                              key={phase.id}
                              className={cn(
                                "flex items-center gap-4 p-4 rounded-lg border transition-all",
                                isActive ? "bg-gray-50 border-gray-200" : 
                                isComplete ? "bg-gray-50 border-gray-300" :
                                "bg-white/50 border-gray-200"
                              )}
                            >
                              <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center",
                                isActive ? "bg-primary-500 text-white" :
                                isComplete ? "bg-green-500 text-white" :
                                "bg-gray-200 text-gray-600"
                              )}>
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">{phase.label}</div>
                                <div className="text-xs text-gray-600">{phase.duration}</div>
                              </div>
                              {isActive && (
                                <div className="flex items-center gap-2">
                                  <RefreshCw className="h-4 w-4 text-gray-700 animate-spin" />
                                  <span className="text-xs text-gray-700">Processing...</span>
                                </div>
                              )}
                              {isComplete && (
                                <CheckCircle className="h-5 w-5 text-green-400" />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Generate Button */}
                  <div className="text-center pt-4">
                    <Button
                      size="lg"
                      onClick={generateVenture}
                      disabled={isGenerating}
                      className="min-w-[280px] px-8 bg-black text-white hover:bg-gray-800 active:bg-gray-900 font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                          Generating Venture...
                        </>
                      ) : (
                        'Generate Venture'
                      )}
                    </Button>
                    <Text className="text-xs text-gray-600 mt-3">
                      Powered by GPT-4 and proprietary market analysis
                    </Text>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* Generated Venture Display */
              <div className="space-y-8">
                <Card variant="venture">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="primary" className="mb-3">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Generated Successfully
                        </Badge>
                        <CardTitle className="text-3xl mb-2">{generatedVenture.name}</CardTitle>
                        <CardDescription className="text-lg">{generatedVenture.tagline}</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setGeneratedVenture(null)
                          setSelectedIndustry('')
                        }}
                      >
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Generate Another
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Problem & Solution */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Problem
                        </h3>
                        <Text className="text-gray-700">{generatedVenture.problem}</Text>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4" />
                          Solution
                        </h3>
                        <Text className="text-gray-700">{generatedVenture.solution}</Text>
                      </div>
                    </div>

                    {/* Market Info */}
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Target Market</h3>
                        <Text className="text-gray-700">{generatedVenture.targetMarket}</Text>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Market Size</h3>
                        <Text className="text-gray-700">{generatedVenture.marketSize}</Text>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Time to Market</h3>
                        <Text className="text-gray-700">{generatedVenture.timeToMarket}</Text>
                      </div>
                    </div>

                    {/* Business Model */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Business Model
                      </h3>
                      <Text className="text-gray-700">{generatedVenture.businessModel}</Text>
                      <Badge variant="outline" className="mt-2">
                        {generatedVenture.estimatedRevenue}
                      </Badge>
                    </div>

                    {/* Competitive Advantage */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Competitive Advantage
                      </h3>
                      <Text className="text-gray-700">{generatedVenture.competitiveAdvantage}</Text>
                    </div>

                    {/* MVP Features */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <Rocket className="h-4 w-4" />
                        MVP Features
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {generatedVenture.mvpFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-gray-700" />
                            <Text className="text-gray-700">{feature}</Text>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Team Needed */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Team Requirements
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {generatedVenture.teamNeeded.map((role) => (
                          <Badge key={role} variant="outline" className="px-3 py-1">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                      <Button size="lg" className="flex-1">
                        <Rocket className="h-5 w-5 mr-2" />
                        Start Building This Venture
                      </Button>
                      <Button variant="outline" size="lg" className="flex-1">
                        <Brain className="h-5 w-5 mr-2" />
                        Get Detailed Analysis
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Process Overview */}
                <Card variant="default" hover={false}>
                  <CardHeader>
                    <CardTitle className="text-xl">The AI Generation Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4">
                      {[
                        { icon: Brain, title: 'Pattern Recognition', desc: 'Analyze 10,000+ successful ventures' },
                        { icon: Globe, title: 'Market Analysis', desc: 'Real-time market data validation' },
                        { icon: TrendingUp, title: 'Growth Modeling', desc: 'Predictive revenue projections' },
                        { icon: Rocket, title: 'Blueprint Creation', desc: 'Actionable implementation plan' }
                      ].map((step, index) => {
                        const Icon = step.icon
                        return (
                          <div key={index} className="text-center">
                            <div className="w-12 h-12 rounded-full bg-primary-500/20 text-gray-700 flex items-center justify-center mx-auto mb-3">
                              <Icon className="h-6 w-6" />
                            </div>
                            <h4 className="font-medium text-gray-900 mb-1">{step.title}</h4>
                            <Text className="text-xs text-gray-600">{step.desc}</Text>
                          </div>
                        )
                      })}
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
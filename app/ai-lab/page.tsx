'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Sparkles, 
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
  Building,
  Globe,
  Download,
  Save,
  X,
  Plus,
  AlertCircle,
  ArrowRight
} from 'lucide-react'
import { generateVentureIdea, generateBusinessModelCanvas, calculateValidationScore, generateVentureReport } from '@/lib/ai-venture-generator'
import { VentureIdea, BusinessModelCanvas, VenturePrompt, ValidationCriteria, VentureStage } from '@/types/ai-lab'

export default function AILabPage() {
  const [currentStage, setCurrentStage] = useState<VentureStage>('ideation')
  const [isGenerating, setIsGenerating] = useState(false)
  const [ventureIdea, setVentureIdea] = useState<VentureIdea | null>(null)
  const [businessCanvas, setBusinessCanvas] = useState<BusinessModelCanvas | null>(null)
  const [savedVentures, setSavedVentures] = useState<VentureIdea[]>([])
  const [showCanvas, setShowCanvas] = useState(false)
  
  const [prompt, setPrompt] = useState<VenturePrompt>({
    industry: '',
    technology: '',
    problemSpace: '',
    targetAudience: '',
    budget: '',
    timeline: ''
  })

  const [validationCriteria, setValidationCriteria] = useState<ValidationCriteria>({
    marketDemand: 75,
    technicalFeasibility: 80,
    competitiveAdvantage: 70,
    scalability: 85,
    profitability: 75,
    teamCapability: 65
  })

  const industries = [
    'Healthcare', 'Finance', 'Education', 'Retail', 'Real Estate',
    'Transportation', 'Energy', 'Agriculture', 'Entertainment', 'Sustainability'
  ]

  const technologies = [
    'AI/ML', 'Blockchain', 'IoT', 'VR/AR', 'Robotics',
    'Quantum Computing', 'Biotech', 'Nanotech', '5G', 'Edge Computing'
  ]

  const handleGenerateIdea = async () => {
    setIsGenerating(true)
    setCurrentStage('validation')
    
    try {
      const idea = await generateVentureIdea(prompt)
      setVentureIdea(idea)
      
      const canvas = generateBusinessModelCanvas(idea)
      setBusinessCanvas(canvas)
      
      setCurrentStage('planning')
    } catch (error) {
      console.error('Failed to generate venture:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveVenture = () => {
    if (ventureIdea) {
      setSavedVentures([...savedVentures, ventureIdea])
      // Reset for new venture
      setVentureIdea(null)
      setBusinessCanvas(null)
      setCurrentStage('ideation')
      setPrompt({
        industry: '',
        technology: '',
        problemSpace: '',
        targetAudience: '',
        budget: '',
        timeline: ''
      })
    }
  }

  const handleExportReport = () => {
    if (ventureIdea && businessCanvas) {
      const report = generateVentureReport(ventureIdea, businessCanvas)
      const blob = new Blob([report], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${ventureIdea.name.replace(/\s+/g, '-').toLowerCase()}-report.md`
      a.click()
    }
  }

  const getStageIcon = (stage: VentureStage) => {
    const icons = {
      ideation: Lightbulb,
      validation: Target,
      planning: Brain,
      building: Building,
      launching: Rocket
    }
    const Icon = icons[stage]
    return <Icon className="h-5 w-5" />
  }

  return (
    <main className="min-h-screen pt-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-8 w-8 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900">AI Venture Lab</h1>
          </div>
          <p className="text-lg text-gray-700">
            Generate, validate, and launch venture ideas in minutes using AI
          </p>
        </div>

        {/* Progress Stages */}
        <div className="flex items-center justify-between mb-8 p-4 bg-white rounded-lg shadow-sm">
          {(['ideation', 'validation', 'planning', 'building', 'launching'] as VentureStage[]).map((stage, index) => (
            <div key={stage} className="flex items-center">
              <div className={`flex items-center gap-2 ${
                currentStage === stage ? 'text-primary-600' : 
                index < ['ideation', 'validation', 'planning', 'building', 'launching'].indexOf(currentStage) ? 
                'text-green-600' : 'text-gray-400'
              }`}>
                {getStageIcon(stage)}
                <span className="text-sm font-medium capitalize">{stage}</span>
              </div>
              {index < 4 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Input/Generation */}
          <div className="lg:col-span-2 space-y-6">
            {currentStage === 'ideation' && !ventureIdea && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Generate Your Next Venture</CardTitle>
                  <CardDescription>
                    Tell me about your vision and I'll create a comprehensive venture plan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Industry Focus
                      </label>
                      <select
                        value={prompt.industry}
                        onChange={(e) => setPrompt({...prompt, industry: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Select an industry</option>
                        {industries.map(ind => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Core Technology
                      </label>
                      <select
                        value={prompt.technology}
                        onChange={(e) => setPrompt({...prompt, technology: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Select a technology</option>
                        {technologies.map(tech => (
                          <option key={tech} value={tech}>{tech}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Problem to Solve
                    </label>
                    <textarea
                      value={prompt.problemSpace}
                      onChange={(e) => setPrompt({...prompt, problemSpace: e.target.value})}
                      placeholder="Describe the problem you want to solve..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Target Audience
                      </label>
                      <Input
                        value={prompt.targetAudience}
                        onChange={(e) => setPrompt({...prompt, targetAudience: e.target.value})}
                        placeholder="e.g., SMBs, Enterprises, Consumers"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Initial Budget
                      </label>
                      <select
                        value={prompt.budget}
                        onChange={(e) => setPrompt({...prompt, budget: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Select budget range</option>
                        <option value="<$100K">Less than $100K</option>
                        <option value="$100K-$500K">$100K - $500K</option>
                        <option value="$500K-$1M">$500K - $1M</option>
                        <option value="$1M-$5M">$1M - $5M</option>
                        <option value=">$5M">More than $5M</option>
                      </select>
                    </div>
                  </div>

                  <Button 
                    onClick={handleGenerateIdea}
                    disabled={!prompt.industry || !prompt.technology || isGenerating}
                    variant="primary"
                    className="w-full"
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Generating Venture Idea...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Generate Venture Idea
                      </span>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {ventureIdea && (
              <>
                <Card className="bg-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{ventureIdea.name}</CardTitle>
                        <CardDescription className="text-base mt-1">
                          {ventureIdea.tagline}
                        </CardDescription>
                      </div>
                      <Badge variant="primary" className="text-lg px-3 py-1">
                        {ventureIdea.validationScore}/100
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        Problem
                      </h3>
                      <p className="text-gray-700">{ventureIdea.problem}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Solution
                      </h3>
                      <p className="text-gray-700">{ventureIdea.solution}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-primary-600" />
                          <span className="text-sm font-medium text-gray-900">Target Market</span>
                        </div>
                        <p className="text-sm text-gray-700">{ventureIdea.targetMarket}</p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-primary-600" />
                          <span className="text-sm font-medium text-gray-900">Market Size</span>
                        </div>
                        <p className="text-sm text-gray-700">{ventureIdea.marketSize}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Competitive Advantage</h3>
                      <p className="text-gray-700">{ventureIdea.competitiveAdvantage}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Revenue Model</h3>
                      <p className="text-gray-700">{ventureIdea.revenueModel}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">MVP Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {ventureIdea.mvpFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {ventureIdea.techStack.map((tech) => (
                          <Badge key={tech} variant="outline">{tech}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-gray-900">Investment Needed</span>
                        </div>
                        <p className="text-lg font-bold text-green-700">{ventureIdea.investmentNeeded}</p>
                      </div>
                      
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-gray-900">Potential ROI</span>
                        </div>
                        <p className="text-lg font-bold text-blue-700">{ventureIdea.potentialROI}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={() => setShowCanvas(!showCanvas)} variant="outline">
                        {showCanvas ? 'Hide' : 'Show'} Business Canvas
                      </Button>
                      <Button onClick={handleExportReport} variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                      </Button>
                      <Button onClick={handleSaveVenture} variant="primary">
                        <Save className="h-4 w-4 mr-2" />
                        Save Venture
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {showCanvas && businessCanvas && (
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle>Business Model Canvas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-4">
                          <div className="p-3 bg-gray-50 rounded">
                            <h4 className="font-semibold text-sm text-gray-900 mb-2">Key Partners</h4>
                            <ul className="text-xs text-gray-700 space-y-1">
                              {businessCanvas.keyPartners.map((item, i) => (
                                <li key={i}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-3 bg-gray-50 rounded">
                            <h4 className="font-semibold text-sm text-gray-900 mb-2">Key Activities</h4>
                            <ul className="text-xs text-gray-700 space-y-1">
                              {businessCanvas.keyActivities.map((item, i) => (
                                <li key={i}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-3 bg-gray-50 rounded">
                            <h4 className="font-semibold text-sm text-gray-900 mb-2">Key Resources</h4>
                            <ul className="text-xs text-gray-700 space-y-1">
                              {businessCanvas.keyResources.map((item, i) => (
                                <li key={i}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="p-3 bg-primary-50 rounded border border-primary-200">
                            <h4 className="font-semibold text-sm text-gray-900 mb-2">Value Propositions</h4>
                            <ul className="text-xs text-gray-700 space-y-1">
                              {businessCanvas.valuePropositions.map((item, i) => (
                                <li key={i}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-3 bg-gray-50 rounded">
                            <h4 className="font-semibold text-sm text-gray-900 mb-2">Customer Relationships</h4>
                            <ul className="text-xs text-gray-700 space-y-1">
                              {businessCanvas.customerRelationships.map((item, i) => (
                                <li key={i}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-3 bg-gray-50 rounded">
                            <h4 className="font-semibold text-sm text-gray-900 mb-2">Channels</h4>
                            <ul className="text-xs text-gray-700 space-y-1">
                              {businessCanvas.channels.map((item, i) => (
                                <li key={i}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="p-3 bg-gray-50 rounded">
                            <h4 className="font-semibold text-sm text-gray-900 mb-2">Customer Segments</h4>
                            <ul className="text-xs text-gray-700 space-y-1">
                              {businessCanvas.customerSegments.map((item, i) => (
                                <li key={i}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-3 bg-red-50 rounded border border-red-200">
                            <h4 className="font-semibold text-sm text-gray-900 mb-2">Cost Structure</h4>
                            <ul className="text-xs text-gray-700 space-y-1">
                              {businessCanvas.costStructure.map((item, i) => (
                                <li key={i}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-3 bg-green-50 rounded border border-green-200">
                            <h4 className="font-semibold text-sm text-gray-900 mb-2">Revenue Streams</h4>
                            <ul className="text-xs text-gray-700 space-y-1">
                              {businessCanvas.revenueStreams.map((item, i) => (
                                <li key={i}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>

          {/* Right Panel - Saved Ventures & Info */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary-50 to-white border-primary-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary-600" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">1</Badge>
                  <div>
                    <p className="font-medium text-gray-900">Define Parameters</p>
                    <p className="text-gray-700">Select industry, technology, and problem space</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">2</Badge>
                  <div>
                    <p className="font-medium text-gray-900">AI Generation</p>
                    <p className="text-gray-700">Our AI creates a comprehensive venture plan</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">3</Badge>
                  <div>
                    <p className="font-medium text-gray-900">Validation</p>
                    <p className="text-gray-700">Automatic scoring and feasibility analysis</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">4</Badge>
                  <div>
                    <p className="font-medium text-gray-900">Export & Execute</p>
                    <p className="text-gray-700">Download reports and start building</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {savedVentures.length > 0 && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Saved Ventures</CardTitle>
                  <CardDescription>
                    Your generated venture ideas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {savedVentures.map((venture) => (
                    <div key={venture.id} className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-medium text-gray-900">{venture.name}</h4>
                        <Badge variant={venture.validationScore >= 80 ? "primary" : "outline"} className="text-xs">
                          {venture.validationScore}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-700 mb-2">{venture.tagline}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>{venture.investmentNeeded}</span>
                        <span>•</span>
                        <span>{venture.potentialROI}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>AI Capabilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">Market analysis & sizing</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">Competitive landscape</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">Revenue modeling</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">Tech stack recommendations</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">Risk assessment</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
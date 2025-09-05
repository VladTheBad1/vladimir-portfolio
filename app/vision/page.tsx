'use client'

import React, { useState } from 'react'
import { Navigation } from '@/components/layout/navigation'
import { H1, Lead, Text, H2 } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp,
  Target,
  Rocket,
  Globe,
  Brain,
  Heart,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Zap,
  Shield,
  Lightbulb,
  DollarSign,
  Building,
  ChevronRight,
  Calendar,
  Star,
  Activity,
  Trophy,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Milestone {
  year: string
  quarter?: string
  title: string
  description: string
  metrics?: string[]
  status: 'completed' | 'in-progress' | 'upcoming'
  icon: any
}

interface VisionPillar {
  icon: any
  title: string
  description: string
  goals: string[]
  impact: string
}

const visionPillars: VisionPillar[] = [
  {
    icon: Globe,
    title: 'Global Innovation Network',
    description: 'Building a worldwide ecosystem of innovators and ventures',
    goals: [
      '1,000+ ventures by 2030',
      'Presence in 50+ countries',
      '10,000+ jobs created',
      '$10B+ market cap'
    ],
    impact: 'Transforming how companies are built globally'
  },
  {
    icon: Brain,
    title: 'AI-First Everything',
    description: 'Leveraging AI to build ventures 100x faster',
    goals: [
      'Fully automated venture creation',
      'AI co-founders for every venture',
      'Predictive success modeling',
      'Zero-to-MVP in 24 hours'
    ],
    impact: 'Making entrepreneurship accessible to everyone'
  },
  {
    icon: Heart,
    title: 'Human-Centered Impact',
    description: 'Solving real problems that improve billions of lives',
    goals: [
      '1B+ lives improved',
      'Healthcare access for all',
      'Education democratization',
      'Sustainable solutions'
    ],
    impact: 'Creating lasting positive change for humanity'
  },
  {
    icon: Rocket,
    title: 'Exponential Growth Engine',
    description: 'Building self-reinforcing systems that compound success',
    goals: [
      '100x portfolio growth',
      'Cross-venture synergies',
      'Network effects at scale',
      'Autonomous scaling'
    ],
    impact: "Redefining what is possible in venture building"
  }
]

const roadmap: Milestone[] = [
  {
    year: '2024',
    quarter: 'Q4',
    title: 'Foundation Phase',
    description: 'Establishing core infrastructure and first ventures',
    metrics: ['10 ventures launched', '50+ team members', '$5M seed funding'],
    status: 'completed',
    icon: Building
  },
  {
    year: '2025',
    quarter: 'Q1-Q2',
    title: 'AI Laboratory Launch',
    description: 'Deploying AI-powered venture creation at scale',
    metrics: ['100 ventures created', 'AI automation 80%', '500+ co-founders'],
    status: 'in-progress',
    icon: Brain
  },
  {
    year: '2025',
    quarter: 'Q3-Q4',
    title: 'Global Expansion',
    description: 'Launching operations in 10 new markets',
    metrics: ['10 country offices', '200 ventures', '$50M Series A'],
    status: 'upcoming',
    icon: Globe
  },
  {
    year: '2026',
    title: 'Scale & Synergy',
    description: 'Creating network effects across portfolio',
    metrics: ['500 ventures', '5,000 jobs', '$500M portfolio value'],
    status: 'upcoming',
    icon: TrendingUp
  },
  {
    year: '2027',
    title: 'Market Leadership',
    description: 'Becoming the global standard for venture creation',
    metrics: ['1,000 ventures', '25 countries', '$2B valuation'],
    status: 'upcoming',
    icon: Trophy
  },
  {
    year: '2030',
    title: 'Vision Realized',
    description: 'A company a day, changing the world',
    metrics: ['5,000+ ventures', '100,000+ jobs', '$10B+ impact'],
    status: 'upcoming',
    icon: Star
  }
]

const principles = [
  {
    title: 'Speed is Everything',
    description: 'Move fast, iterate faster, learn fastest',
    icon: Zap
  },
  {
    title: 'Think in Systems',
    description: 'Build interconnected ventures that reinforce each other',
    icon: Activity
  },
  {
    title: 'Embrace Chaos',
    description: 'ADHD is our superpower - parallel processing at scale',
    icon: Sparkles
  },
  {
    title: 'People First',
    description: 'Great teams build great companies, not the other way around',
    icon: Users
  },
  {
    title: 'Global from Day One',
    description: 'Every venture built for worldwide impact',
    icon: Globe
  },
  {
    title: 'AI as Co-Founder',
    description: 'Human creativity + AI capability = unstoppable',
    icon: Brain
  }
]

export default function VisionPage() {
  const [selectedPillar, setSelectedPillar] = useState<VisionPillar | null>(null)

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'text-green-400 bg-green-500/20 border-green-500/30'
      case 'in-progress': return 'text-primary-400 bg-primary-500/20 border-primary-500/30'
      case 'upcoming': return 'text-gray-400 bg-gray-500/20 border-gray-500/30'
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30'
    }
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24">
        {/* Hero Section */}
        <div className="section-container py-20">
          <div className="text-center max-w-5xl mx-auto">
            <Badge variant="primary" className="mb-4">
              <TrendingUp className="h-3 w-3 mr-1" />
              2024 → 2030 Vision
            </Badge>
            <H1 gradient className="mb-6">
              Building the Future of Innovation
            </H1>
            <Lead className="mb-8">
              One company a day. One billion lives improved. One unstoppable mission.
            </Lead>
            
            {/* Vision Statement */}
            <Card variant="default" className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 border-primary-500/30 mb-12">
              <CardContent className="p-8">
                <blockquote className="text-xl md:text-2xl text-gray-100 font-medium leading-relaxed">
                  "By 2030, we will have created 5,000+ ventures, employing 100,000+ people, 
                  solving problems for 1 billion+ humans. This is not just a goal—it is an 
                  inevitability when you combine ADHD superpowers with AI capabilities."
                </blockquote>
                <div className="mt-6">
                  <div className="text-primary-400 font-semibold">Vladimir Proskurov</div>
                  <div className="text-sm text-gray-400">Founder & Serial Innovator</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Vision Pillars */}
        <div className="section-container pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <H2 className="mb-4">Four Pillars of Our Vision</H2>
              <Lead className="max-w-3xl mx-auto text-base">
                The foundation of our journey to transform global innovation
              </Lead>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {visionPillars.map((pillar, index) => {
                const Icon = pillar.icon
                return (
                  <Card 
                    key={index}
                    variant="default" 
                    className="bg-dark-800/30 border-dark-700 hover:border-primary-500/30 transition-all cursor-pointer"
                    onClick={() => setSelectedPillar(pillar)}
                  >
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary-500/20 text-primary-400 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{pillar.title}</CardTitle>
                          <CardDescription>{pillar.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Text className="text-xs text-gray-500 mb-2">Key Goals</Text>
                        <div className="space-y-1">
                          {pillar.goals.slice(0, 2).map((goal, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              <Text className="text-sm text-gray-300">{goal}</Text>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-dark-700/50">
                        <Text className="text-xs text-primary-400">{pillar.impact}</Text>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        {/* Strategic Roadmap */}
        <div className="section-container pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <H2 className="mb-4">Strategic Roadmap</H2>
              <Lead className="max-w-3xl mx-auto text-base">
                From vision to reality: Our journey to transform innovation
              </Lead>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400 to-transparent hidden md:block" />
              
              {/* Milestones */}
              <div className="space-y-6">
                {roadmap.map((milestone, index) => {
                  const Icon = milestone.icon
                  return (
                    <div key={index} className="relative flex items-start gap-6">
                      {/* Timeline Dot */}
                      <div className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 border-2",
                        getStatusColor(milestone.status)
                      )}>
                        <Icon className="h-8 w-8" />
                      </div>
                      
                      {/* Content */}
                      <Card variant="default" className="flex-1 bg-dark-800/30 border-dark-700">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {milestone.year} {milestone.quarter && `• ${milestone.quarter}`}
                                </Badge>
                                <Badge className={cn("text-xs", getStatusColor(milestone.status))}>
                                  {milestone.status.replace('-', ' ')}
                                </Badge>
                              </div>
                              <CardTitle className="text-xl">{milestone.title}</CardTitle>
                              <CardDescription className="mt-2">{milestone.description}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        {milestone.metrics && (
                          <CardContent>
                            <div className="flex flex-wrap gap-3">
                              {milestone.metrics.map((metric, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <Target className="h-3 w-3 text-primary-400" />
                                  <Text className="text-sm text-gray-300">{metric}</Text>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Operating Principles */}
        <div className="section-container pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <H2 className="mb-4">Operating Principles</H2>
              <Lead className="max-w-3xl mx-auto text-base">
                The core beliefs that guide every decision we make
              </Lead>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.map((principle, index) => {
                const Icon = principle.icon
                return (
                  <Card key={index} variant="default" className="bg-dark-800/30 border-dark-700">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary-500/20 text-primary-400 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-100 mb-2">{principle.title}</h3>
                          <Text className="text-sm text-gray-400">{principle.description}</Text>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="section-container pb-20">
          <Card variant="default" className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 border-primary-500/30">
            <CardContent className="p-12 text-center">
              <Badge variant="primary" className="mb-4">
                <Rocket className="h-3 w-3 mr-1" />
                Join the Mission
              </Badge>
              <H2 className="mb-4">Be Part of the Future</H2>
              <Lead className="max-w-2xl mx-auto mb-8 text-base">
                Whether you are an investor, entrepreneur, or innovator—there is a place 
                for you in our vision. Let us build the future together.
              </Lead>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  <Users className="h-5 w-5 mr-2" />
                  Become a Co-Founder
                </Button>
                <Button variant="outline" size="lg">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Explore Investment
                </Button>
              </div>
              <div className="mt-8 pt-8 border-t border-primary-500/20">
                <Text className="text-sm text-gray-400">
                  "The best way to predict the future is to invent it." — Alan Kay
                </Text>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pillar Detail Modal */}
        {selectedPillar && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm"
            onClick={() => setSelectedPillar(null)}
          >
            <Card 
              variant="default" 
              className="bg-dark-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-500/20 text-primary-400 flex items-center justify-center flex-shrink-0">
                      <selectedPillar.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-2">{selectedPillar.title}</CardTitle>
                      <CardDescription className="text-base">{selectedPillar.description}</CardDescription>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedPillar(null)}
                    className="text-gray-400 hover:text-gray-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-primary-400 mb-3">Strategic Goals</h3>
                  <div className="space-y-2">
                    {selectedPillar.goals.map((goal, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <Text className="text-gray-300">{goal}</Text>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-primary-400 mb-3">Expected Impact</h3>
                  <Card variant="default" className="bg-dark-700/30 border-dark-600">
                    <CardContent className="p-4">
                      <Text className="text-gray-300">{selectedPillar.impact}</Text>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-4 pt-4 border-t border-dark-700">
                  <Button className="flex-1">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Learn More
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Get Involved
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
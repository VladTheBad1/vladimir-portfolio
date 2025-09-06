'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  RectangleStackIcon,
  TargetIcon,
  ChartBarIcon,
  LightBulbIcon,
  PresentationChartBarIcon,
  DocumentTextIcon,
  PlayIcon,
  PauseIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  CogIcon,
  PlusIcon,
  PencilSquareIcon,
  ShareIcon,
  ClockIcon,
  FlagIcon
} from '@heroicons/react/24/outline'
import { BusinessModelCanvas, ObjectivesKeyResults, CompetitiveAnalysis, ScenarioPlanning } from '@/types/strategy'

const mockBusinessCanvas: BusinessModelCanvas = {
  id: 'canvas-1',
  ventureId: 'verivox-ai',
  ventureName: 'VeriVox AI',
  version: 3,
  lastUpdated: '2024-01-20T15:30:00Z',
  elements: {
    keyPartners: [
      { id: 'kp1', text: 'AI/ML Cloud Providers (AWS, GCP)', priority: 'high', validated: true, confidence: 0.9, evidence: ['Signed partnerships'], relatedElements: ['kr1'], createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-20T15:30:00Z' },
      { id: 'kp2', text: 'System Integrators', priority: 'medium', validated: false, confidence: 0.6, evidence: [], relatedElements: [], createdAt: '2024-01-05T00:00:00Z', updatedAt: '2024-01-15T12:00:00Z' }
    ],
    keyActivities: [
      { id: 'ka1', text: 'Voice AI Model Development', priority: 'high', validated: true, confidence: 0.95, evidence: ['R&D team', 'Patents'], relatedElements: ['vp1'], createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-18T10:00:00Z' },
      { id: 'ka2', text: 'Customer Support & Success', priority: 'high', validated: true, confidence: 0.85, evidence: ['Team hired', 'Processes'], relatedElements: ['cr1'], createdAt: '2024-01-02T00:00:00Z', updatedAt: '2024-01-10T14:00:00Z' }
    ],
    keyResources: [
      { id: 'kr1', text: 'Proprietary AI Models', priority: 'high', validated: true, confidence: 0.92, evidence: ['IP portfolio', 'Performance metrics'], relatedElements: ['ka1'], createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-20T15:30:00Z' },
      { id: 'kr2', text: 'Engineering Team', priority: 'high', validated: true, confidence: 0.88, evidence: ['Team composition', 'Retention rates'], relatedElements: ['ka1'], createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-15T09:00:00Z' }
    ],
    valuePropositions: [
      { id: 'vp1', text: '99.9% Voice Accuracy for Enterprise', priority: 'high', validated: true, confidence: 0.94, evidence: ['Benchmarks', 'Customer testimonials'], relatedElements: ['cs1'], createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-20T15:30:00Z' },
      { id: 'vp2', text: 'Real-time Processing', priority: 'medium', validated: true, confidence: 0.87, evidence: ['Technical demos'], relatedElements: ['cs2'], createdAt: '2024-01-02T00:00:00Z', updatedAt: '2024-01-12T16:00:00Z' }
    ],
    customerRelationships: [
      { id: 'cr1', text: 'Dedicated Account Management', priority: 'high', validated: true, confidence: 0.91, evidence: ['Customer satisfaction scores'], relatedElements: ['cs1'], createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-18T11:00:00Z' },
      { id: 'cr2', text: 'Community & Support Forums', priority: 'medium', validated: false, confidence: 0.65, evidence: [], relatedElements: ['cs2'], createdAt: '2024-01-10T00:00:00Z', updatedAt: '2024-01-15T13:00:00Z' }
    ],
    channels: [
      { id: 'ch1', text: 'Direct Sales Team', priority: 'high', validated: true, confidence: 0.89, evidence: ['Sales metrics', 'Team performance'], relatedElements: ['cs1'], createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-20T15:30:00Z' },
      { id: 'ch2', text: 'Partner Network', priority: 'medium', validated: false, confidence: 0.58, evidence: [], relatedElements: ['kp2'], createdAt: '2024-01-08T00:00:00Z', updatedAt: '2024-01-15T10:00:00Z' }
    ],
    customerSegments: [
      { id: 'cs1', text: 'Large Enterprises (Call Centers)', priority: 'high', validated: true, confidence: 0.96, evidence: ['Customer interviews', 'Revenue data'], relatedElements: ['vp1'], createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-20T15:30:00Z' },
      { id: 'cs2', text: 'Healthcare Organizations', priority: 'medium', validated: true, confidence: 0.78, evidence: ['Pilot programs'], relatedElements: ['vp2'], createdAt: '2024-01-03T00:00:00Z', updatedAt: '2024-01-18T14:00:00Z' }
    ],
    costStructure: [
      { id: 'cost1', text: 'R&D and Engineering (45%)', priority: 'high', validated: true, confidence: 0.93, evidence: ['Budget allocation', 'Payroll'], relatedElements: ['ka1'], createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-20T15:30:00Z' },
      { id: 'cost2', text: 'Cloud Infrastructure (25%)', priority: 'high', validated: true, confidence: 0.91, evidence: ['AWS bills', 'Usage metrics'], relatedElements: ['kp1'], createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-15T12:00:00Z' }
    ],
    revenueStreams: [
      { id: 'rev1', text: 'SaaS Subscription (80%)', priority: 'high', validated: true, confidence: 0.97, evidence: ['Revenue reports', 'Churn analysis'], relatedElements: ['vp1'], createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-20T15:30:00Z' },
      { id: 'rev2', text: 'Professional Services (20%)', priority: 'medium', validated: true, confidence: 0.84, evidence: ['Service contracts'], relatedElements: ['cr1'], createdAt: '2024-01-02T00:00:00Z', updatedAt: '2024-01-18T16:00:00Z' }
    ]
  },
  assumptions: [
    {
      id: 'assump1',
      element: 'valuePropositions',
      assumption: 'Enterprises will pay premium for 99.9% accuracy',
      criticality: 'high',
      testable: true,
      validationMethod: 'Customer interviews and pricing experiments',
      status: 'validated',
      evidence: ['15% price premium accepted by 80% of prospects'],
      impact: 'Enables premium pricing strategy'
    }
  ],
  validationStatus: {
    overall: 82,
    byElement: [
      { element: 'Value Propositions', validated: 2, total: 2, percentage: 100 },
      { element: 'Customer Segments', validated: 2, total: 2, percentage: 100 },
      { element: 'Key Resources', validated: 2, total: 2, percentage: 100 },
      { element: 'Key Partners', validated: 1, total: 2, percentage: 50 }
    ],
    riskLevel: 'medium',
    recommendations: [
      'Validate partner channel strategy',
      'Test community support model',
      'Strengthen SMB segment validation'
    ]
  },
  risks: [
    {
      id: 'risk1',
      element: 'keyPartners',
      risk: 'Over-dependence on cloud providers',
      probability: 'medium',
      impact: 'high',
      severity: 'high',
      mitigation: ['Multi-cloud strategy', 'Edge computing options'],
      owner: 'CTO',
      status: 'mitigating'
    }
  ]
}

const mockOKRs: ObjectivesKeyResults = {
  id: 'okr-1',
  ventureId: 'verivox-ai',
  ventureName: 'VeriVox AI',
  quarter: 'Q1',
  year: 2024,
  objectives: [
    {
      id: 'obj1',
      title: 'Achieve Product-Market Fit in Enterprise Segment',
      description: 'Validate our value proposition with large enterprise customers',
      category: 'growth',
      owner: 'Vladimir Proskurov',
      priority: 'p0',
      keyResults: [
        {
          id: 'kr1',
          title: 'Close 5 enterprise deals > $100K ARR',
          type: 'number',
          baseline: 0,
          target: 5,
          current: 3,
          unit: 'deals',
          measurementMethod: 'CRM tracking',
          updateFrequency: 'weekly',
          progress: 60,
          status: 'on-track',
          owner: 'Sales Director',
          checkIns: [
            { id: 'ci1', date: '2024-01-15', value: 2, confidence: 0.8, notes: 'Pipeline looking strong', blockers: ['Legal review delays'], owner: 'Sales Director' },
            { id: 'ci2', date: '2024-01-22', value: 3, confidence: 0.9, notes: 'One deal closed ahead of schedule', blockers: [], owner: 'Sales Director' }
          ]
        }
      ],
      progress: 60,
      status: 'on-track',
      startDate: '2024-01-01',
      targetDate: '2024-03-31',
      dependencies: [],
      tags: ['enterprise', 'pmf']
    },
    {
      id: 'obj2',
      title: 'Build World-Class Engineering Team',
      category: 'people',
      owner: 'CTO',
      priority: 'p0',
      keyResults: [
        {
          id: 'kr2',
          title: 'Hire 8 senior engineers',
          type: 'number',
          baseline: 12,
          target: 20,
          current: 17,
          unit: 'engineers',
          measurementMethod: 'HR system',
          updateFrequency: 'monthly',
          progress: 63,
          status: 'at-risk',
          owner: 'CTO',
          checkIns: [
            { id: 'ci3', date: '2024-01-31', value: 17, confidence: 0.7, notes: 'Hiring market is tough', blockers: ['Compensation budget', 'Market competition'], owner: 'CTO' }
          ]
        }
      ],
      progress: 63,
      status: 'at-risk',
      startDate: '2024-01-01',
      targetDate: '2024-03-31',
      dependencies: [],
      tags: ['hiring', 'engineering']
    }
  ],
  alignment: {
    parentObjectives: [],
    childObjectives: [],
    crossFunctional: ['obj1', 'obj2'],
    alignmentScore: 85
  },
  progress: {
    overall: 62,
    byObjective: [
      { objectiveId: 'obj1', progress: 60 },
      { objectiveId: 'obj2', progress: 63 }
    ],
    trend: 'improving',
    velocity: 8.5,
    forecast: {
      projectedCompletion: 78,
      confidenceInterval: [65, 85],
      atRiskCount: 1
    }
  },
  reviews: []
}

const mockCompetitiveAnalysis: CompetitiveAnalysis = {
  id: 'comp-1',
  ventureId: 'verivox-ai',
  ventureName: 'VeriVox AI',
  title: 'Q1 2024 Competitive Landscape',
  analysisDate: '2024-01-20',
  competitors: [
    {
      id: 'comp1',
      name: 'Nuance Communications',
      type: 'direct',
      tier: 'tier-1',
      marketCap: 19500000000,
      employees: 7000,
      stage: 'enterprise',
      strengths: ['Market leader', 'Healthcare focus', 'Microsoft backing'],
      weaknesses: ['Legacy technology', 'High prices', 'Slow innovation'],
      keyProducts: ['Dragon Professional', 'PowerScribe'],
      targetMarket: ['Healthcare', 'Legal', 'Financial Services'],
      businessModel: 'Software licensing + SaaS',
      recentNews: [
        {
          id: 'news1',
          title: 'Microsoft integrates Nuance into Teams',
          description: 'Enhanced voice capabilities in Microsoft Teams',
          date: '2024-01-10',
          source: 'Microsoft Blog',
          significance: 'high',
          category: 'product'
        }
      ],
      threatLevel: 'high'
    },
    {
      id: 'comp2',
      name: 'AssemblyAI',
      type: 'direct',
      tier: 'tier-2',
      employees: 150,
      funding: 28000000,
      stage: 'growth',
      strengths: ['Developer-friendly API', 'Competitive pricing', 'Fast innovation'],
      weaknesses: ['Limited enterprise features', 'Smaller team', 'Less market presence'],
      keyProducts: ['Speech-to-Text API', 'Audio Intelligence API'],
      targetMarket: ['Developers', 'Startups', 'Mid-market'],
      businessModel: 'API-based usage pricing',
      recentNews: [],
      threatLevel: 'medium'
    }
  ],
  positioningMap: {
    axes: {
      x: { label: 'Ease of Use', min: 0, max: 10 },
      y: { label: 'Enterprise Features', min: 0, max: 10 }
    },
    positions: [
      { competitor: 'VeriVox AI', x: 8, y: 9, marketShare: 2, color: '#2563EB' },
      { competitor: 'Nuance', x: 4, y: 10, marketShare: 35, color: '#DC2626' },
      { competitor: 'AssemblyAI', x: 9, y: 5, marketShare: 8, color: '#059669' }
    ],
    insights: ['Opportunity in high-ease, high-enterprise quadrant', 'Nuance vulnerable to disruption']
  },
  marketShare: {
    total: 100,
    byCompetitor: [
      { competitor: 'Nuance', share: 35, trend: 'down' },
      { competitor: 'Google Cloud Speech', share: 22, trend: 'up' },
      { competitor: 'Amazon Transcribe', share: 18, trend: 'stable' },
      { competitor: 'AssemblyAI', share: 8, trend: 'up' },
      { competitor: 'VeriVox AI', share: 2, trend: 'up' },
      { competitor: 'Others', share: 15, trend: 'stable' }
    ],
    methodology: 'Revenue-based market share estimation',
    dataSource: 'Industry reports + primary research',
    lastUpdated: '2024-01-20'
  },
  featureComparison: {
    features: ['Real-time Processing', 'Custom Models', 'Multi-language', 'On-premise Deployment', 'API Integration', 'Compliance'],
    comparison: [
      {
        competitor: 'VeriVox AI',
        features: [
          { feature: 'Real-time Processing', hasFeature: true, quality: 'excellent' },
          { feature: 'Custom Models', hasFeature: true, quality: 'excellent' },
          { feature: 'Multi-language', hasFeature: true, quality: 'good' },
          { feature: 'On-premise Deployment', hasFeature: true, quality: 'good' },
          { feature: 'API Integration', hasFeature: true, quality: 'excellent' },
          { feature: 'Compliance', hasFeature: true, quality: 'good' }
        ]
      }
    ],
    gaps: []
  },
  pricing: {
    pricingModels: [
      {
        competitor: 'VeriVox AI',
        model: 'usage-based',
        tiers: [
          { name: 'Starter', price: 0.01, billingCycle: 'monthly', features: ['Basic API', '1000 minutes/month'], limitations: ['No custom models'] },
          { name: 'Professional', price: 0.008, billingCycle: 'monthly', features: ['Advanced API', 'Custom models', 'Priority support'] },
          { name: 'Enterprise', price: 0, billingCycle: 'annual', features: ['On-premise', 'Custom deployment', 'Dedicated support'] }
        ]
      }
    ],
    insights: ['Pricing premium justified by accuracy', 'Volume discounts competitive'],
    opportunities: ['SMB market entry with lower tier']
  },
  swotAnalysis: {
    strengths: [
      { id: 's1', item: 'Superior accuracy (99.9%)', impact: 'high', evidence: ['Benchmark tests', 'Customer feedback'], actionable: false },
      { id: 's2', item: 'Strong technical team', impact: 'high', evidence: ['Team credentials', 'R&D output'], actionable: true }
    ],
    weaknesses: [
      { id: 'w1', item: 'Limited market presence', impact: 'high', evidence: ['Market share data'], actionable: true },
      { id: 'w2', item: 'High customer acquisition cost', impact: 'medium', evidence: ['CAC metrics'], actionable: true }
    ],
    opportunities: [
      { id: 'o1', item: 'AI/ML adoption acceleration', impact: 'high', evidence: ['Market trends'], actionable: true },
      { id: 'o2', item: 'Nuance disruption opportunity', impact: 'high', evidence: ['Customer dissatisfaction'], actionable: true }
    ],
    threats: [
      { id: 't1', item: 'Big Tech competition', impact: 'high', evidence: ['Google/Amazon investments'], relatedCompetitors: ['Google', 'Amazon'], actionable: true }
    ],
    strategicQuadrants: {
      soStrategies: ['Leverage superior accuracy to capture AI adoption wave'],
      woStrategies: ['Invest in marketing to build market presence'],
      stStrategies: ['Build moats through specialized enterprise features'],
      wtStrategies: ['Focus on niche markets to avoid direct Big Tech competition']
    }
  },
  strategicRecommendations: [
    'Double down on enterprise features and compliance',
    'Invest heavily in go-to-market to build market presence',
    'Consider strategic partnerships to accelerate distribution'
  ]
}

export default function StrategyPage() {
  const [activeTab, setActiveTab] = useState<'canvas' | 'okrs' | 'competitive' | 'scenarios'>('canvas')
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': case 'completed': case 'validated': return 'text-green-700 bg-green-100'
      case 'at-risk': case 'testing': return 'text-yellow-700 bg-yellow-100'
      case 'behind': case 'untested': case 'invalidated': return 'text-red-700 bg-red-100'
      default: return 'text-gray-700 bg-gray-100'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': case 'p0': case 'critical': return 'text-red-700 bg-red-100'
      case 'medium': case 'p1': return 'text-yellow-700 bg-yellow-100'
      case 'low': case 'p2': return 'text-green-700 bg-green-100'
      default: return 'text-gray-700 bg-gray-100'
    }
  }

  const renderCanvasTab = () => (
    <div className="space-y-8">
      {/* Canvas Overview */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{mockBusinessCanvas.ventureName} Business Model Canvas</h2>
            <p className="text-gray-600">Version {mockBusinessCanvas.version} • Last updated {new Date(mockBusinessCanvas.lastUpdated).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{mockBusinessCanvas.validationStatus.overall}%</div>
              <div className="text-sm text-gray-600">Validated</div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Edit Canvas
            </button>
          </div>
        </div>

        {/* Canvas Grid */}
        <div className="grid grid-cols-5 gap-4 h-96">
          {/* Key Partners */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <UserGroupIcon className="h-4 w-4" />
              Key Partners
            </h3>
            <div className="space-y-2">
              {mockBusinessCanvas.elements.keyPartners.map((element) => (
                <div key={element.id} className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${element.validated ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className={`px-1 py-0.5 text-xs rounded ${getPriorityColor(element.priority)}`}>
                      {element.priority}
                    </span>
                  </div>
                  <p className="text-blue-800">{element.text}</p>
                  <div className="text-xs text-blue-600 mt-1">
                    Confidence: {Math.round(element.confidence * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Activities */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
              <CogIcon className="h-4 w-4" />
              Key Activities
            </h3>
            <div className="space-y-2">
              {mockBusinessCanvas.elements.keyActivities.map((element) => (
                <div key={element.id} className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${element.validated ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className={`px-1 py-0.5 text-xs rounded ${getPriorityColor(element.priority)}`}>
                      {element.priority}
                    </span>
                  </div>
                  <p className="text-green-800">{element.text}</p>
                  <div className="text-xs text-green-600 mt-1">
                    Confidence: {Math.round(element.confidence * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Resources */}
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
              <ShieldCheckIcon className="h-4 w-4" />
              Key Resources
            </h3>
            <div className="space-y-2">
              {mockBusinessCanvas.elements.keyResources.map((element) => (
                <div key={element.id} className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${element.validated ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className={`px-1 py-0.5 text-xs rounded ${getPriorityColor(element.priority)}`}>
                      {element.priority}
                    </span>
                  </div>
                  <p className="text-purple-800">{element.text}</p>
                  <div className="text-xs text-purple-600 mt-1">
                    Confidence: {Math.round(element.confidence * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Value Propositions */}
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
              <LightBulbIcon className="h-4 w-4" />
              Value Propositions
            </h3>
            <div className="space-y-2">
              {mockBusinessCanvas.elements.valuePropositions.map((element) => (
                <div key={element.id} className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${element.validated ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className={`px-1 py-0.5 text-xs rounded ${getPriorityColor(element.priority)}`}>
                      {element.priority}
                    </span>
                  </div>
                  <p className="text-red-800 font-medium">{element.text}</p>
                  <div className="text-xs text-red-600 mt-1">
                    Confidence: {Math.round(element.confidence * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Relationships */}
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <h3 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
              <UserGroupIcon className="h-4 w-4" />
              Customer Relationships
            </h3>
            <div className="space-y-2">
              {mockBusinessCanvas.elements.customerRelationships.map((element) => (
                <div key={element.id} className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${element.validated ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className={`px-1 py-0.5 text-xs rounded ${getPriorityColor(element.priority)}`}>
                      {element.priority}
                    </span>
                  </div>
                  <p className="text-indigo-800">{element.text}</p>
                  <div className="text-xs text-indigo-600 mt-1">
                    Confidence: {Math.round(element.confidence * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Channels - Second Row */}
          <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
            <h3 className="font-semibold text-teal-900 mb-3 flex items-center gap-2">
              <PresentationChartBarIcon className="h-4 w-4" />
              Channels
            </h3>
            <div className="space-y-2">
              {mockBusinessCanvas.elements.channels.map((element) => (
                <div key={element.id} className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${element.validated ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className={`px-1 py-0.5 text-xs rounded ${getPriorityColor(element.priority)}`}>
                      {element.priority}
                    </span>
                  </div>
                  <p className="text-teal-800">{element.text}</p>
                  <div className="text-xs text-teal-600 mt-1">
                    Confidence: {Math.round(element.confidence * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty cells for layout */}
          <div className="col-span-3"></div>

          {/* Customer Segments */}
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
              <TargetIcon className="h-4 w-4" />
              Customer Segments
            </h3>
            <div className="space-y-2">
              {mockBusinessCanvas.elements.customerSegments.map((element) => (
                <div key={element.id} className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${element.validated ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className={`px-1 py-0.5 text-xs rounded ${getPriorityColor(element.priority)}`}>
                      {element.priority}
                    </span>
                  </div>
                  <p className="text-orange-800 font-medium">{element.text}</p>
                  <div className="text-xs text-orange-600 mt-1">
                    Confidence: {Math.round(element.confidence * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Structure - Bottom Row */}
          <div className="col-span-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <ChartBarIcon className="h-4 w-4" />
              Cost Structure
            </h3>
            <div className="space-y-2">
              {mockBusinessCanvas.elements.costStructure.map((element) => (
                <div key={element.id} className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${element.validated ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className={`px-1 py-0.5 text-xs rounded ${getPriorityColor(element.priority)}`}>
                      {element.priority}
                    </span>
                  </div>
                  <p className="text-gray-800">{element.text}</p>
                  <div className="text-xs text-gray-600 mt-1">
                    Confidence: {Math.round(element.confidence * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Streams */}
          <div className="col-span-3 bg-emerald-50 p-4 rounded-lg border border-emerald-200">
            <h3 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
              <ArrowTrendingUpIcon className="h-4 w-4" />
              Revenue Streams
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {mockBusinessCanvas.elements.revenueStreams.map((element) => (
                <div key={element.id} className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${element.validated ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className={`px-1 py-0.5 text-xs rounded ${getPriorityColor(element.priority)}`}>
                      {element.priority}
                    </span>
                  </div>
                  <p className="text-emerald-800 font-medium">{element.text}</p>
                  <div className="text-xs text-emerald-600 mt-1">
                    Confidence: {Math.round(element.confidence * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Validation Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Validation Status</h3>
          <div className="space-y-4">
            {mockBusinessCanvas.validationStatus.byElement.map((element) => (
              <div key={element.element} className="flex items-center justify-between">
                <span className="text-gray-700">{element.element}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${element.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{element.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Risks</h3>
          <div className="space-y-4">
            {mockBusinessCanvas.risks.map((risk) => (
              <div key={risk.id} className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-orange-900">{risk.risk}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    risk.severity === 'critical' ? 'text-red-700 bg-red-100' :
                    risk.severity === 'high' ? 'text-orange-700 bg-orange-100' :
                    risk.severity === 'medium' ? 'text-yellow-700 bg-yellow-100' :
                    'text-green-700 bg-green-100'
                  }`}>
                    {risk.severity}
                  </span>
                </div>
                <p className="text-sm text-orange-800 mb-2">{risk.element}</p>
                <div className="text-xs text-orange-700">
                  <span className="font-medium">Mitigation: </span>
                  {risk.mitigation.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderOKRsTab = () => (
    <div className="space-y-8">
      {/* OKR Overview */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{mockOKRs.ventureName} OKRs</h2>
            <p className="text-gray-600">{mockOKRs.quarter} {mockOKRs.year} • Overall Progress: {mockOKRs.progress.overall}%</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{mockOKRs.progress.overall}%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add Objective
            </button>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-900">{mockOKRs.objectives.length}</div>
            <div className="text-sm text-blue-700">Objectives</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-900">{mockOKRs.progress.velocity.toFixed(1)}%</div>
            <div className="text-sm text-green-700">Weekly Velocity</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-900">{mockOKRs.progress.forecast.atRiskCount}</div>
            <div className="text-sm text-yellow-700">At Risk</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-900">{mockOKRs.alignment.alignmentScore}%</div>
            <div className="text-sm text-purple-700">Alignment</div>
          </div>
        </div>

        {/* Objectives */}
        <div className="space-y-6">
          {mockOKRs.objectives.map((objective) => (
            <div key={objective.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{objective.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(objective.priority)}`}>
                      {objective.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(objective.status)}`}>
                      {objective.status}
                    </span>
                  </div>
                  {objective.description && (
                    <p className="text-gray-600 mb-3">{objective.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Owner: {objective.owner}</span>
                    <span>•</span>
                    <span>Category: {objective.category}</span>
                    <span>•</span>
                    <span>Due: {new Date(objective.targetDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{objective.progress}%</div>
                  <div className="w-24 bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full ${
                        objective.status === 'on-track' ? 'bg-green-500' :
                        objective.status === 'at-risk' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${objective.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Key Results */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Key Results</h4>
                {objective.keyResults.map((kr) => (
                  <div key={kr.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 mb-1">{kr.title}</h5>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Owner: {kr.owner}</span>
                          <span>•</span>
                          <span>Updates: {kr.updateFrequency}</span>
                          <span>•</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(kr.status)}`}>
                            {kr.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          {kr.current} / {kr.target} {kr.unit}
                        </div>
                        <div className="text-sm text-gray-500">{kr.progress}% complete</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          kr.status === 'on-track' ? 'bg-green-500' :
                          kr.status === 'at-risk' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${kr.progress}%` }}
                      ></div>
                    </div>

                    {/* Recent Check-ins */}
                    {kr.checkIns.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <h6 className="text-sm font-medium text-gray-700 mb-2">Recent Check-ins</h6>
                        <div className="space-y-2">
                          {kr.checkIns.slice(-2).map((checkIn) => (
                            <div key={checkIn.id} className="text-sm">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{new Date(checkIn.date).toLocaleDateString()}</span>
                                <span>{checkIn.value} {kr.unit}</span>
                              </div>
                              {checkIn.notes && (
                                <p className="text-gray-600 mt-1">{checkIn.notes}</p>
                              )}
                              {checkIn.blockers.length > 0 && (
                                <div className="text-red-600 mt-1">
                                  <span className="font-medium">Blockers: </span>
                                  {checkIn.blockers.join(', ')}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderCompetitiveTab = () => (
    <div className="space-y-8">
      {/* Competitive Overview */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Competitive Analysis</h2>
            <p className="text-gray-600">{mockCompetitiveAnalysis.title} • {new Date(mockCompetitiveAnalysis.analysisDate).toLocaleDateString()}</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Update Analysis
          </button>
        </div>

        {/* Competitors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mockCompetitiveAnalysis.competitors.map((competitor) => (
            <div key={competitor.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{competitor.name}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  competitor.threatLevel === 'critical' ? 'text-red-700 bg-red-100' :
                  competitor.threatLevel === 'high' ? 'text-orange-700 bg-orange-100' :
                  competitor.threatLevel === 'medium' ? 'text-yellow-700 bg-yellow-100' :
                  'text-green-700 bg-green-100'
                }`}>
                  {competitor.threatLevel} threat
                </span>
              </div>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Type:</span>
                  <span className="font-medium capitalize">{competitor.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tier:</span>
                  <span className="font-medium capitalize">{competitor.tier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Stage:</span>
                  <span className="font-medium capitalize">{competitor.stage}</span>
                </div>
                {competitor.employees && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Employees:</span>
                    <span className="font-medium">{competitor.employees.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-green-700 mb-1">Strengths</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {competitor.strengths.slice(0, 2).map((strength, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-red-700 mb-1">Weaknesses</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {competitor.weaknesses.slice(0, 2).map((weakness, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {competitor.recentNews.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-2">Recent News</h4>
                  {competitor.recentNews.slice(0, 1).map((news) => (
                    <div key={news.id} className="text-sm">
                      <p className="font-medium text-gray-900">{news.title}</p>
                      <p className="text-gray-600 mt-1">{news.description}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <span>{new Date(news.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className={`px-2 py-1 rounded-full ${
                          news.significance === 'high' ? 'bg-red-100 text-red-700' :
                          news.significance === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {news.significance}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Market Share */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Share</h3>
          <div className="space-y-3">
            {mockCompetitiveAnalysis.marketShare.byCompetitor.map((item) => (
              <div key={item.competitor} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 font-medium">{item.competitor}</span>
                  <div className="flex items-center gap-1">
                    {item.trend === 'up' && <ArrowTrendingUpIcon className="h-3 w-3 text-green-500" />}
                    {item.trend === 'down' && <ArrowTrendingUpIcon className="h-3 w-3 text-red-500 rotate-180" />}
                    {item.trend === 'stable' && <div className="w-3 h-0.5 bg-gray-400"></div>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${item.share}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium w-8">{item.share}%</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            {mockCompetitiveAnalysis.marketShare.methodology} • Last updated: {new Date(mockCompetitiveAnalysis.marketShare.lastUpdated).toLocaleDateString()}
          </p>
        </div>

        {/* SWOT Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-3">Strengths</h4>
              <div className="space-y-2">
                {mockCompetitiveAnalysis.swotAnalysis.strengths.map((item) => (
                  <div key={item.id} className="text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-green-800">{item.item}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(item.impact)}`}>
                        {item.impact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3">Opportunities</h4>
              <div className="space-y-2">
                {mockCompetitiveAnalysis.swotAnalysis.opportunities.map((item) => (
                  <div key={item.id} className="text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-800">{item.item}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(item.impact)}`}>
                        {item.impact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-900 mb-3">Weaknesses</h4>
              <div className="space-y-2">
                {mockCompetitiveAnalysis.swotAnalysis.weaknesses.map((item) => (
                  <div key={item.id} className="text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-800">{item.item}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(item.impact)}`}>
                        {item.impact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-900 mb-3">Threats</h4>
              <div className="space-y-2">
                {mockCompetitiveAnalysis.swotAnalysis.threats.map((item) => (
                  <div key={item.id} className="text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-red-800">{item.item}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(item.impact)}`}>
                        {item.impact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Recommendations */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Recommendations</h3>
          <div className="space-y-2">
            {mockCompetitiveAnalysis.strategicRecommendations.map((recommendation, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <span className="text-gray-800">{recommendation}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderScenariosTab = () => (
    <div className="space-y-8">
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-4">
          <DocumentTextIcon className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Scenario Planning</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Plan for multiple futures with strategic scenario analysis. Model different outcomes 
          and prepare contingency strategies.
        </p>
        
        <div className="mt-8 flex items-center justify-center gap-4">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            Create Scenario Plan
          </button>
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
              <h1 className="text-2xl font-bold text-gray-900">Strategic Planning Canvas</h1>
              <p className="text-sm text-gray-600">Business model validation, OKRs, and competitive intelligence</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all flex items-center gap-2">
                <LightBulbIcon className="h-4 w-4" />
                AI Strategy Assistant
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-8 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('canvas')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'canvas'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Business Model Canvas
          </button>
          <button
            onClick={() => setActiveTab('okrs')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'okrs'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            OKRs & Goals
          </button>
          <button
            onClick={() => setActiveTab('competitive')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'competitive'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Competitive Analysis
          </button>
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'scenarios'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Scenario Planning
          </button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'canvas' && renderCanvasTab()}
          {activeTab === 'okrs' && renderOKRsTab()}
          {activeTab === 'competitive' && renderCompetitiveTab()}
          {activeTab === 'scenarios' && renderScenariosTab()}
        </AnimatePresence>
      </div>
    </div>
  )
}
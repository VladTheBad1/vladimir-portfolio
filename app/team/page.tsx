'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users,
  TrendingUp,
  Target,
  Award,
  AlertCircle,
  ChevronRight,
  BarChart3,
  Brain,
  Zap,
  UserCheck,
  Calendar,
  Star,
  Activity
} from 'lucide-react'
import { TeamMember, OKR, PerformanceMetrics } from '@/types/team'
import { motion } from 'framer-motion'

// Mock data
const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'CTO',
    department: 'Engineering',
    ventureId: '1',
    ventureName: 'VCTRONICS CORP',
    email: 'sarah@vctronics.com',
    startDate: '2021-03-15',
    location: 'San Francisco',
    status: 'active',
    skills: ['AI/ML', 'Python', 'Leadership', 'System Design'],
    performance: {
      productivity: 92,
      quality: 95,
      collaboration: 88,
      innovation: 90,
      leadership: 93,
      overallScore: 91,
      trend: 'improving',
      lastReview: '2024-12-01',
      nextReview: '2025-03-01'
    },
    okrs: []
  },
  {
    id: '2',
    name: 'Michael Roberts',
    role: 'Head of Product',
    department: 'Product',
    ventureId: '2',
    ventureName: 'VeriVox AI',
    email: 'michael@verivox.ai',
    startDate: '2023-06-01',
    location: 'New York',
    status: 'active',
    skills: ['Product Strategy', 'User Research', 'Agile', 'Data Analysis'],
    performance: {
      productivity: 85,
      quality: 88,
      collaboration: 92,
      innovation: 86,
      leadership: 84,
      overallScore: 87,
      trend: 'stable',
      lastReview: '2024-11-15',
      nextReview: '2025-02-15'
    },
    okrs: []
  },
  {
    id: '3',
    name: 'Emma Johnson',
    role: 'VP Sales',
    department: 'Sales',
    ventureId: '3',
    ventureName: 'Perfect Liquid',
    email: 'emma@perfectliquid.com',
    startDate: '2022-01-10',
    location: 'London',
    status: 'active',
    skills: ['B2B Sales', 'Negotiation', 'CRM', 'Team Building'],
    performance: {
      productivity: 94,
      quality: 91,
      collaboration: 89,
      innovation: 85,
      leadership: 90,
      overallScore: 90,
      trend: 'improving',
      lastReview: '2024-10-01',
      nextReview: '2025-01-15'
    },
    okrs: []
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Engineering Manager',
    department: 'Engineering',
    ventureId: '7',
    ventureName: 'Domain Analyser',
    email: 'david@domainanalyser.com',
    startDate: '2021-09-01',
    location: 'Seoul',
    status: 'active',
    skills: ['React', 'Node.js', 'AWS', 'Team Management'],
    performance: {
      productivity: 78,
      quality: 82,
      collaboration: 85,
      innovation: 75,
      leadership: 80,
      overallScore: 80,
      trend: 'declining',
      lastReview: '2024-12-15',
      nextReview: '2025-01-30'
    },
    okrs: []
  }
]

const mockOKRs: OKR[] = [
  {
    id: '1',
    objective: 'Launch AI-powered diagnostic platform',
    quarter: 'Q1',
    year: 2025,
    status: 'on-track',
    progress: 65,
    owner: 'Sarah Chen',
    ventureId: '1',
    keyResults: [
      {
        id: 'kr1',
        description: 'Complete FDA documentation',
        target: 100,
        current: 80,
        unit: '%',
        progress: 80,
        status: 'on-track',
        dueDate: '2025-02-15'
      },
      {
        id: 'kr2',
        description: 'Onboard 10 beta hospitals',
        target: 10,
        current: 6,
        unit: 'hospitals',
        progress: 60,
        status: 'at-risk',
        dueDate: '2025-03-01'
      },
      {
        id: 'kr3',
        description: 'Achieve 95% accuracy rate',
        target: 95,
        current: 92,
        unit: '%',
        progress: 97,
        status: 'on-track',
        dueDate: '2025-03-15'
      }
    ]
  },
  {
    id: '2',
    objective: 'Scale revenue to $1M MRR',
    quarter: 'Q1',
    year: 2025,
    status: 'at-risk',
    progress: 45,
    owner: 'Emma Johnson',
    ventureId: '3',
    keyResults: [
      {
        id: 'kr4',
        description: 'Close 20 enterprise deals',
        target: 20,
        current: 8,
        unit: 'deals',
        progress: 40,
        status: 'behind',
        dueDate: '2025-03-31'
      },
      {
        id: 'kr5',
        description: 'Increase ACV to $50K',
        target: 50000,
        current: 35000,
        unit: '$',
        progress: 70,
        status: 'at-risk',
        dueDate: '2025-03-31'
      }
    ]
  }
]

export default function TeamPage() {
  const [selectedView, setSelectedView] = useState<'overview' | 'performance' | 'okrs' | 'skills'>('overview')
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusColor = (status: OKR['status']) => {
    const colors = {
      'on-track': 'bg-green-100 text-green-800',
      'at-risk': 'bg-yellow-100 text-yellow-800',
      'behind': 'bg-red-100 text-red-800',
      'completed': 'bg-blue-100 text-blue-800'
    }
    return colors[status]
  }

  const averagePerformance = mockTeamMembers.reduce((sum, m) => sum + m.performance.overallScore, 0) / mockTeamMembers.length
  const topPerformers = mockTeamMembers.filter(m => m.performance.overallScore >= 90)
  const atRiskMembers = mockTeamMembers.filter(m => m.performance.trend === 'declining')

  return (
    <main className="min-h-screen pt-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Team Performance
          </h1>
          <p className="text-lg text-gray-700">
            Track team performance, OKRs, and skill development across ventures
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Team Size</p>
                  <p className="text-2xl font-bold text-gray-900">{mockTeamMembers.length}</p>
                  <p className="text-xs text-gray-500">Across ventures</p>
                </div>
                <Users className="h-8 w-8 text-primary-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Performance</p>
                  <p className="text-2xl font-bold text-gray-900">{averagePerformance.toFixed(0)}%</p>
                  <p className="text-xs text-gray-500">Overall score</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Top Performers</p>
                  <p className="text-2xl font-bold text-gray-900">{topPerformers.length}</p>
                  <p className="text-xs text-gray-500">90%+ score</p>
                </div>
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">At Risk</p>
                  <p className="text-2xl font-bold text-gray-900">{atRiskMembers.length}</p>
                  <p className="text-xs text-gray-500">Need attention</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* View Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={selectedView === 'overview' ? 'primary' : 'outline'}
            onClick={() => setSelectedView('overview')}
            className="text-sm"
          >
            <Users className="h-4 w-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={selectedView === 'performance' ? 'primary' : 'outline'}
            onClick={() => setSelectedView('performance')}
            className="text-sm"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Performance
          </Button>
          <Button
            variant={selectedView === 'okrs' ? 'primary' : 'outline'}
            onClick={() => setSelectedView('okrs')}
            className="text-sm"
          >
            <Target className="h-4 w-4 mr-2" />
            OKRs
          </Button>
          <Button
            variant={selectedView === 'skills' ? 'primary' : 'outline'}
            onClick={() => setSelectedView('skills')}
            className="text-sm"
          >
            <Brain className="h-4 w-4 mr-2" />
            Skills
          </Button>
        </div>

        {/* Overview */}
        {selectedView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTeamMembers.map(member => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedMember(member)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{member.name}</h3>
                            <p className="text-sm text-gray-600">{member.role} • {member.ventureName}</p>
                            <p className="text-xs text-gray-500 mt-1">{member.department} • {member.location}</p>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${getPerformanceColor(member.performance.overallScore)}`}>
                              {member.performance.overallScore}%
                            </div>
                            <Badge variant={member.performance.trend === 'improving' ? 'primary' : 
                                           member.performance.trend === 'stable' ? 'outline' : 'default'}>
                              {member.performance.trend}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex gap-2">
                          {member.skills.slice(0, 3).map(skill => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {member.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{member.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Member Detail */}
            <div>
              {selectedMember ? (
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>{selectedMember.name}</CardTitle>
                    <CardDescription>{selectedMember.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Performance Metrics</h4>
                      <div className="space-y-2">
                        {Object.entries(selectedMember.performance).filter(([key]) => 
                          !['overallScore', 'trend', 'lastReview', 'nextReview'].includes(key)
                        ).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 capitalize">{key}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-2 bg-gray-200 rounded-full">
                                <div 
                                  className="h-full bg-primary-600 rounded-full"
                                  style={{ width: `${value}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium w-10 text-right">{value}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Review Schedule</h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-gray-600">Last Review:</span>{' '}
                          {new Date(selectedMember.performance.lastReview).toLocaleDateString()}
                        </p>
                        <p>
                          <span className="text-gray-600">Next Review:</span>{' '}
                          {new Date(selectedMember.performance.nextReview).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <Button variant="primary" className="w-full">
                      <UserCheck className="h-4 w-4 mr-2" />
                      Schedule 1:1
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-white">
                  <CardContent className="p-8 text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Select a team member to view details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Performance View */}
        {selectedView === 'performance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Performance Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['90-100', '80-89', '70-79', '60-69', 'Below 60'].map((range, index) => {
                    const count = mockTeamMembers.filter(m => {
                      const score = m.performance.overallScore
                      if (index === 0) return score >= 90
                      if (index === 1) return score >= 80 && score < 90
                      if (index === 2) return score >= 70 && score < 80
                      if (index === 3) return score >= 60 && score < 70
                      return score < 60
                    }).length
                    
                    return (
                      <div key={range} className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 w-20">{range}%</span>
                        <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${
                              index === 0 ? 'bg-green-500' :
                              index === 1 ? 'bg-blue-500' :
                              index === 2 ? 'bg-yellow-500' :
                              index === 3 ? 'bg-orange-500' :
                              'bg-red-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${(count / mockTeamMembers.length) * 100}%` }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          />
                        </div>
                        <span className="text-sm font-medium w-10 text-right">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Engineering', 'Product', 'Sales', 'Marketing'].map(dept => {
                    const deptMembers = mockTeamMembers.filter(m => m.department === dept)
                    const avgScore = deptMembers.length > 0 
                      ? deptMembers.reduce((sum, m) => sum + m.performance.overallScore, 0) / deptMembers.length
                      : 0
                    
                    return (
                      <div key={dept} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{dept}</p>
                          <p className="text-sm text-gray-600">{deptMembers.length} members</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-xl font-bold ${getPerformanceColor(avgScore)}`}>
                            {avgScore.toFixed(0)}%
                          </p>
                          <p className="text-xs text-gray-500">avg score</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* OKRs View */}
        {selectedView === 'okrs' && (
          <div className="space-y-6">
            {mockOKRs.map(okr => (
              <Card key={okr.id} className="bg-white">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{okr.objective}</CardTitle>
                      <CardDescription>{okr.owner} • {okr.quarter} {okr.year}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(okr.status)}>
                      {okr.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Overall Progress</span>
                      <span className="font-medium">{okr.progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary-600 rounded-full"
                        style={{ width: `${okr.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {okr.keyResults.map(kr => (
                      <div key={kr.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm font-medium text-gray-900">{kr.description}</p>
                          <Badge variant={
                            kr.status === 'on-track' ? 'primary' :
                            kr.status === 'at-risk' ? 'outline' :
                            'default'
                          } className="text-xs">
                            {kr.progress}%
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span>{kr.current} / {kr.target} {kr.unit}</span>
                          <span>•</span>
                          <span>Due {new Date(kr.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Skills View */}
        {selectedView === 'skills' && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Skills Matrix</CardTitle>
              <CardDescription>Team capabilities across key skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Team Member</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">AI/ML</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">Leadership</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">Product</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">Sales</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">Engineering</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTeamMembers.map(member => (
                      <tr key={member.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.role}</p>
                          </div>
                        </td>
                        {['AI/ML', 'Leadership', 'Product', 'Sales', 'Engineering'].map(skill => {
                          const hasSkill = member.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
                          const level = hasSkill ? Math.floor(Math.random() * 3) + 3 : 0
                          
                          return (
                            <td key={skill} className="py-3 px-4 text-center">
                              <div className="flex justify-center gap-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                  <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full ${
                                      i <= level ? 'bg-primary-600' : 'bg-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp,
  Users,
  DollarSign,
  PieChart,
  FileText,
  Mail,
  Calendar,
  ChevronRight,
  Plus,
  Download,
  Send,
  Phone,
  Linkedin,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  Briefcase,
  BarChart3
} from 'lucide-react'
import { Investor, FundraisingRound, InvestorCommitment, CapTable, Shareholder } from '@/types/investor'
import { motion } from 'framer-motion'

// Mock data
const mockInvestors: Investor[] = [
  {
    id: '1',
    name: 'John Smith',
    firm: 'Apex Ventures',
    type: 'VC',
    status: 'due-diligence',
    email: 'john@apexvc.com',
    linkedIn: 'linkedin.com/in/johnsmith',
    checkSize: { min: 1000000, max: 5000000 },
    sweetSpot: 2500000,
    stages: ['series-a', 'series-b'],
    sectors: ['healthcare', 'ai'],
    lastContact: '2025-01-15',
    nextFollowUp: '2025-01-22',
    temperature: 'hot',
    leadPartner: 'John Smith'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    firm: 'TechStars',
    type: 'VC',
    status: 'term-sheet',
    email: 'sarah@techstars.com',
    checkSize: { min: 500000, max: 2000000 },
    sweetSpot: 1000000,
    stages: ['seed', 'series-a'],
    sectors: ['ai', 'saas'],
    temperature: 'hot',
    leadPartner: 'Sarah Chen'
  },
  {
    id: '3',
    name: 'Michael Brown',
    firm: 'Angel Network',
    type: 'Angel',
    status: 'meeting',
    email: 'michael@angel.com',
    checkSize: { min: 25000, max: 100000 },
    sweetSpot: 50000,
    stages: ['pre-seed', 'seed'],
    sectors: ['healthcare', 'biotech'],
    temperature: 'warm'
  }
]

const mockFundraisingRound: FundraisingRound = {
  id: '1',
  ventureId: '1',
  ventureName: 'VCTRONICS CORP',
  roundType: 'Series A',
  status: 'active',
  targetAmount: 15000000,
  amountRaised: 8500000,
  preMoneyValuation: 60000000,
  startDate: '2024-12-01',
  targetCloseDate: '2025-03-01',
  investors: [
    {
      investorId: '1',
      investorName: 'Apex Ventures',
      amount: 5000000,
      status: 'committed',
      dateCommitted: '2025-01-10',
      ownership: 7.7
    },
    {
      investorId: '2',
      investorName: 'TechStars',
      amount: 2000000,
      status: 'verbal',
      ownership: 3.1
    },
    {
      investorId: '3',
      investorName: 'Angel Network',
      amount: 1500000,
      status: 'signed',
      dateCommitted: '2025-01-15',
      ownership: 2.3
    }
  ],
  documents: [],
  milestones: [
    { id: '1', title: 'Pitch Deck Finalized', date: '2024-12-01', completed: true },
    { id: '2', title: 'First Investor Meeting', date: '2024-12-15', completed: true },
    { id: '3', title: 'Due Diligence Complete', date: '2025-01-31', completed: false },
    { id: '4', title: 'First Close', date: '2025-02-15', completed: false },
    { id: '5', title: 'Final Close', date: '2025-03-01', completed: false }
  ]
}

const mockCapTable: CapTable = {
  ventureId: '1',
  ventureName: 'VCTRONICS CORP',
  totalShares: 10000000,
  fullyDilutedShares: 11500000,
  optionPool: 15,
  shareholders: [
    { id: '1', name: 'Vladimir Proskurov', type: 'founder', shares: 4000000, percentage: 40, class: 'common' },
    { id: '2', name: 'Co-Founder', type: 'founder', shares: 2000000, percentage: 20, class: 'common' },
    { id: '3', name: 'Seed Investors', type: 'investor', shares: 1500000, percentage: 15, class: 'preferred-a' },
    { id: '4', name: 'Employee Pool', type: 'employee', shares: 1500000, percentage: 15, class: 'common' },
    { id: '5', name: 'Series A Investors', type: 'investor', shares: 1000000, percentage: 10, class: 'preferred-b' }
  ],
  rounds: [mockFundraisingRound]
}

export default function InvestorsPage() {
  const [selectedTab, setSelectedTab] = useState<'pipeline' | 'fundraising' | 'cap-table' | 'updates'>('pipeline')
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null)
  const [showNewInvestor, setShowNewInvestor] = useState(false)

  const getStatusColor = (status: Investor['status']) => {
    const colors = {
      prospect: 'bg-gray-100 text-gray-800',
      contacted: 'bg-blue-100 text-blue-800',
      meeting: 'bg-yellow-100 text-yellow-800',
      'due-diligence': 'bg-purple-100 text-purple-800',
      'term-sheet': 'bg-green-100 text-green-800',
      closed: 'bg-green-500 text-white',
      passed: 'bg-red-100 text-red-800'
    }
    return colors[status]
  }

  const getTemperatureIcon = (temp: Investor['temperature']) => {
    if (temp === 'hot') return '🔥'
    if (temp === 'warm') return '🌡️'
    return '❄️'
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const completionPercentage = (mockFundraisingRound.amountRaised / mockFundraisingRound.targetAmount) * 100

  const investorsByStatus = mockInvestors.reduce((acc, inv) => {
    acc[inv.status] = (acc[inv.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <main className="min-h-screen pt-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Investor Relations
          </h1>
          <p className="text-lg text-gray-700">
            Manage fundraising, investor communications, and cap table
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Round</p>
                  <p className="text-2xl font-bold text-gray-900">{mockFundraisingRound.roundType}</p>
                  <p className="text-xs text-gray-500">{completionPercentage.toFixed(0)}% raised</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Amount Raised</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(mockFundraisingRound.amountRaised)}
                  </p>
                  <p className="text-xs text-gray-500">
                    of {formatCurrency(mockFundraisingRound.targetAmount)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-primary-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Investors</p>
                  <p className="text-2xl font-bold text-gray-900">{mockInvestors.length}</p>
                  <p className="text-xs text-gray-500">
                    {investorsByStatus['term-sheet'] || 0} in term sheet
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Valuation</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(mockFundraisingRound.preMoneyValuation)}
                  </p>
                  <p className="text-xs text-gray-500">Pre-money</p>
                </div>
                <PieChart className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={selectedTab === 'pipeline' ? 'primary' : 'outline'}
            onClick={() => setSelectedTab('pipeline')}
            className="text-sm"
          >
            <Users className="h-4 w-4 mr-2" />
            Pipeline
          </Button>
          <Button
            variant={selectedTab === 'fundraising' ? 'primary' : 'outline'}
            onClick={() => setSelectedTab('fundraising')}
            className="text-sm"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Fundraising
          </Button>
          <Button
            variant={selectedTab === 'cap-table' ? 'primary' : 'outline'}
            onClick={() => setSelectedTab('cap-table')}
            className="text-sm"
          >
            <PieChart className="h-4 w-4 mr-2" />
            Cap Table
          </Button>
          <Button
            variant={selectedTab === 'updates' ? 'primary' : 'outline'}
            onClick={() => setSelectedTab('updates')}
            className="text-sm"
          >
            <Mail className="h-4 w-4 mr-2" />
            Updates
          </Button>
        </div>

        {/* Pipeline View */}
        {selectedTab === 'pipeline' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Investor List */}
            <div className="lg:col-span-2">
              <Card className="bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Investor Pipeline</CardTitle>
                    <Button variant="primary" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Investor
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockInvestors.map(investor => (
                      <motion.div
                        key={investor.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedInvestor(investor)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900">{investor.name}</h3>
                              <span className="text-lg">{getTemperatureIcon(investor.temperature)}</span>
                            </div>
                            <p className="text-sm text-gray-600">{investor.firm} • {investor.type}</p>
                          </div>
                          <Badge className={getStatusColor(investor.status)}>
                            {investor.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Check Size:</span>
                            <span className="ml-2 font-medium">
                              {formatCurrency(investor.checkSize.min)} - {formatCurrency(investor.checkSize.max)}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Sectors:</span>
                            <span className="ml-2">{investor.sectors.join(', ')}</span>
                          </div>
                        </div>
                        
                        {investor.nextFollowUp && (
                          <div className="mt-3 flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-orange-500" />
                            <span className="text-gray-600">Follow up:</span>
                            <span className="font-medium">
                              {new Date(investor.nextFollowUp).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Investor Details */}
            <div>
              {selectedInvestor ? (
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>{selectedInvestor.name}</CardTitle>
                    <CardDescription>{selectedInvestor.firm}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Contact</p>
                      <div className="space-y-2">
                        <a href={`mailto:${selectedInvestor.email}`} className="flex items-center gap-2 text-sm hover:text-primary-600">
                          <Mail className="h-4 w-4" />
                          {selectedInvestor.email}
                        </a>
                        {selectedInvestor.linkedIn && (
                          <a href={selectedInvestor.linkedIn} className="flex items-center gap-2 text-sm hover:text-primary-600">
                            <Linkedin className="h-4 w-4" />
                            LinkedIn Profile
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Investment Profile</p>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Sweet Spot:</span> {formatCurrency(selectedInvestor.sweetSpot)}</p>
                        <p><span className="font-medium">Stages:</span> {selectedInvestor.stages.join(', ')}</p>
                        <p><span className="font-medium">Sectors:</span> {selectedInvestor.sectors.join(', ')}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="primary" size="sm" className="flex-1">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-white">
                  <CardContent className="p-8 text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Select an investor to view details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Fundraising View */}
        {selectedTab === 'fundraising' && (
          <div className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{mockFundraisingRound.roundType} Round</CardTitle>
                    <CardDescription>
                      {mockFundraisingRound.ventureName} • Target close: {new Date(mockFundraisingRound.targetCloseDate).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Badge variant={mockFundraisingRound.status === 'active' ? 'primary' : 'outline'}>
                    {mockFundraisingRound.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{completionPercentage.toFixed(0)}% Complete</span>
                  </div>
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${completionPercentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-600">{formatCurrency(mockFundraisingRound.amountRaised)}</span>
                    <span className="font-medium">{formatCurrency(mockFundraisingRound.targetAmount)}</span>
                  </div>
                </div>

                {/* Milestones */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Milestones</h3>
                  <div className="space-y-2">
                    {mockFundraisingRound.milestones.map(milestone => (
                      <div key={milestone.id} className="flex items-center gap-3">
                        {milestone.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                        )}
                        <span className={`text-sm ${milestone.completed ? 'text-gray-900' : 'text-gray-600'}`}>
                          {milestone.title}
                        </span>
                        <span className="text-xs text-gray-500 ml-auto">
                          {new Date(milestone.date).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Commitments */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Investor Commitments</h3>
                  <div className="space-y-3">
                    {mockFundraisingRound.investors.map(commitment => (
                      <div key={commitment.investorId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{commitment.investorName}</p>
                          <p className="text-sm text-gray-600">{commitment.ownership}% ownership</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatCurrency(commitment.amount)}</p>
                          <Badge variant={
                            commitment.status === 'wired' ? 'primary' :
                            commitment.status === 'signed' ? 'outline' :
                            'default'
                          } className="text-xs">
                            {commitment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Cap Table View */}
        {selectedTab === 'cap-table' && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Capitalization Table</CardTitle>
              <CardDescription>{mockCapTable.ventureName}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Ownership Breakdown */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Ownership Breakdown</h3>
                  <div className="space-y-3">
                    {mockCapTable.shareholders.map(shareholder => (
                      <div key={shareholder.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            shareholder.type === 'founder' ? 'bg-blue-500' :
                            shareholder.type === 'investor' ? 'bg-green-500' :
                            shareholder.type === 'employee' ? 'bg-yellow-500' :
                            'bg-gray-500'
                          }`} />
                          <div>
                            <p className="font-medium text-gray-900">{shareholder.name}</p>
                            <p className="text-sm text-gray-600">{shareholder.class}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{shareholder.percentage}%</p>
                          <p className="text-sm text-gray-600">{shareholder.shares.toLocaleString()} shares</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Chart */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Visual Breakdown</h3>
                  <div className="relative h-64 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full overflow-hidden relative">
                      {mockCapTable.shareholders.map((shareholder, index) => {
                        const rotation = mockCapTable.shareholders
                          .slice(0, index)
                          .reduce((sum, s) => sum + s.percentage, 0) * 3.6
                        
                        return (
                          <div
                            key={shareholder.id}
                            className={`absolute inset-0 ${
                              shareholder.type === 'founder' ? 'bg-blue-500' :
                              shareholder.type === 'investor' ? 'bg-green-500' :
                              shareholder.type === 'employee' ? 'bg-yellow-500' :
                              'bg-gray-500'
                            }`}
                            style={{
                              transform: `rotate(${rotation}deg)`,
                              clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((shareholder.percentage * 3.6 - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((shareholder.percentage * 3.6 - 90) * Math.PI / 180)}%)`
                            }}
                          />
                        )
                      })}
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span className="text-gray-600">Founders</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-gray-600">Investors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <span className="text-gray-600">Employees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-500 rounded-full" />
                      <span className="text-gray-600">Advisors</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Total Shares</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {mockCapTable.totalShares.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fully Diluted</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {mockCapTable.fullyDilutedShares?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Option Pool</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {mockCapTable.optionPool}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Investor Updates View */}
        {selectedTab === 'updates' && (
          <div className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Investor Updates</CardTitle>
                  <Button variant="primary">
                    <Plus className="h-4 w-4 mr-2" />
                    New Update
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">January 2025 Update</h3>
                        <p className="text-sm text-gray-600">VCTRONICS CORP</p>
                      </div>
                      <Badge variant="primary">Sent</Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 my-3 text-sm">
                      <div>
                        <p className="text-gray-600">Revenue</p>
                        <p className="font-semibold">$450K MRR</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Growth</p>
                        <p className="font-semibold text-green-600">+25%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Users</p>
                        <p className="font-semibold">550</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Runway</p>
                        <p className="font-semibold">18 months</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-sm text-gray-500">Sent to 25 investors</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Send className="h-4 w-4 mr-2" />
                          Resend
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}
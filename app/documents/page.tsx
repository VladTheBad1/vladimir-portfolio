'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  DocumentIcon, 
  FolderIcon, 
  MagnifyingGlassIcon,
  CloudArrowUpIcon,
  DocumentArrowDownIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  ShieldCheckIcon,
  ClockIcon,
  TagIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  ArrowUpTrayIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import { Document, DocumentFolder, DocumentAnalytics, DocumentSearch, AIDocumentInsight } from '@/types/document'

const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    title: 'Series A Term Sheet - VeriVox AI',
    description: 'Investment terms for Series A funding round',
    type: 'financial',
    category: 'Investment',
    ventureId: 'verivox-ai',
    ventureName: 'VeriVox AI',
    filePath: '/documents/verivox-ai/series-a-term-sheet.pdf',
    fileSize: 2500000,
    fileType: 'PDF',
    version: 3,
    status: 'review',
    confidentiality: 'confidential',
    createdBy: 'Vladimir Proskurov',
    createdAt: '2024-01-15T10:00:00Z',
    updatedBy: 'Sarah Johnson',
    updatedAt: '2024-01-20T15:30:00Z',
    tags: ['investment', 'series-a', 'legal', 'urgent'],
    metadata: {
      author: 'Vladimir Proskurov',
      reviewer: 'Sarah Johnson',
      dealValue: 15000000,
      riskLevel: 'high',
      complianceStatus: 'pending',
      expiryDate: '2024-02-15T00:00:00Z'
    },
    versions: [
      {
        id: 'v1',
        version: 1,
        filePath: '/documents/verivox-ai/series-a-term-sheet-v1.pdf',
        changeDescription: 'Initial draft',
        createdBy: 'Vladimir Proskurov',
        createdAt: '2024-01-15T10:00:00Z',
        fileSize: 2300000,
        checksum: 'abc123'
      }
    ],
    accessLog: [
      {
        id: 'access-1',
        userId: 'user-1',
        userName: 'Vladimir Proskurov',
        action: 'view',
        timestamp: '2024-01-20T09:00:00Z',
        ipAddress: '192.168.1.1',
        device: 'MacBook Pro'
      }
    ]
  },
  {
    id: 'doc-2',
    title: 'Product Roadmap Q1 2024 - Perfect Liquid',
    description: 'Quarterly product development roadmap',
    type: 'strategic',
    category: 'Product',
    ventureId: 'perfect-liquid',
    ventureName: 'Perfect Liquid',
    filePath: '/documents/perfect-liquid/roadmap-q1-2024.pptx',
    fileSize: 5200000,
    fileType: 'PPTX',
    version: 2,
    status: 'approved',
    confidentiality: 'internal',
    createdBy: 'Alex Chen',
    createdAt: '2024-01-10T14:00:00Z',
    updatedBy: 'Alex Chen',
    updatedAt: '2024-01-18T16:45:00Z',
    tags: ['product', 'roadmap', 'q1-2024'],
    metadata: {
      author: 'Alex Chen',
      approver: 'Vladimir Proskurov',
      riskLevel: 'medium',
      complianceStatus: 'compliant'
    },
    versions: [],
    accessLog: []
  },
  {
    id: 'doc-3',
    title: 'Partnership Agreement - AtemaBio',
    description: 'Strategic partnership with research institution',
    type: 'contract',
    category: 'Partnership',
    ventureId: 'atemabio',
    ventureName: 'AtemaBio',
    filePath: '/documents/atemabio/partnership-agreement.docx',
    fileSize: 1800000,
    fileType: 'DOCX',
    version: 1,
    status: 'draft',
    confidentiality: 'restricted',
    createdBy: 'Maria Rodriguez',
    createdAt: '2024-01-22T11:30:00Z',
    updatedBy: 'Maria Rodriguez',
    updatedAt: '2024-01-22T11:30:00Z',
    tags: ['partnership', 'contract', 'biotech'],
    metadata: {
      author: 'Maria Rodriguez',
      counterparty: 'BioResearch Institute',
      dealValue: 2500000,
      riskLevel: 'medium',
      complianceStatus: 'pending',
      expiryDate: '2024-12-31T00:00:00Z'
    },
    versions: [],
    accessLog: []
  }
]

const mockFolders: DocumentFolder[] = [
  {
    id: 'folder-1',
    name: 'Legal Documents',
    path: '/legal',
    documentCount: 25,
    totalSize: 45000000,
    permissions: [
      {
        userId: 'user-1',
        userName: 'Vladimir Proskurov',
        role: 'CEO',
        permission: 'admin',
        grantedBy: 'system',
        grantedAt: '2024-01-01T00:00:00Z'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'folder-2',
    name: 'Financial Reports',
    path: '/financial',
    documentCount: 18,
    totalSize: 32000000,
    permissions: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-19T10:15:00Z'
  }
]

const mockAnalytics: DocumentAnalytics = {
  totalDocuments: 247,
  documentsByType: [
    { type: 'contract', count: 45 },
    { type: 'financial', count: 62 },
    { type: 'strategic', count: 38 },
    { type: 'legal', count: 41 },
    { type: 'operational', count: 35 },
    { type: 'presentation', count: 26 }
  ],
  documentsByVenture: [
    { venture: 'VeriVox AI', count: 32 },
    { venture: 'Perfect Liquid', count: 28 },
    { venture: 'AtemaBio', count: 25 },
    { venture: 'AstroForYou School', count: 22 },
    { venture: 'GenieX Lab', count: 18 }
  ],
  storageUsed: 15600000000, // 15.6 GB
  storageLimit: 50000000000, // 50 GB
  recentActivity: mockDocuments[0].accessLog,
  pendingReviews: mockDocuments.filter(doc => doc.status === 'review'),
  expiringDocuments: mockDocuments.filter(doc => doc.metadata.expiryDate),
  complianceAlerts: [
    {
      type: 'expiry',
      message: '3 documents expiring within 30 days',
      documents: mockDocuments.filter(doc => doc.metadata.expiryDate)
    },
    {
      type: 'compliance',
      message: '2 documents require compliance review',
      documents: mockDocuments.filter(doc => doc.metadata.complianceStatus === 'pending')
    }
  ]
}

const mockInsights: AIDocumentInsight[] = [
  {
    id: 'insight-1',
    documentId: 'doc-1',
    type: 'risk-analysis',
    title: 'High-Risk Clauses Identified',
    content: 'Liquidation preferences and anti-dilution provisions may impact future fundraising flexibility.',
    confidence: 0.92,
    generatedAt: '2024-01-20T16:00:00Z'
  },
  {
    id: 'insight-2',
    documentId: 'doc-1',
    type: 'key-terms',
    title: 'Key Investment Terms',
    content: '$15M Series A, 20% equity, 2x liquidation preference, board seat allocation.',
    confidence: 0.98,
    generatedAt: '2024-01-20T16:00:00Z'
  }
]

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState<'documents' | 'folders' | 'analytics'>('documents')
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [showInsights, setShowInsights] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterVenture, setFilterVenture] = useState('all')
  const [showUpload, setShowUpload] = useState(false)

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = filterType === 'all' || doc.type === filterType
    const matchesVenture = filterVenture === 'all' || doc.ventureId === filterVenture
    return matchesSearch && matchesType && matchesVenture
  })

  const getConfidentialityColor = (level: string) => {
    switch (level) {
      case 'public': return 'text-green-600 bg-green-100'
      case 'internal': return 'text-blue-600 bg-blue-100'
      case 'confidential': return 'text-orange-600 bg-orange-100'
      case 'restricted': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100'
      case 'review': return 'text-orange-600 bg-orange-100'
      case 'draft': return 'text-gray-600 bg-gray-100'
      case 'archived': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const renderDocumentsTab = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="contract">Contract</option>
            <option value="financial">Financial</option>
            <option value="legal">Legal</option>
            <option value="strategic">Strategic</option>
            <option value="operational">Operational</option>
            <option value="presentation">Presentation</option>
          </select>
          
          <select
            value={filterVenture}
            onChange={(e) => setFilterVenture(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Ventures</option>
            <option value="verivox-ai">VeriVox AI</option>
            <option value="perfect-liquid">Perfect Liquid</option>
            <option value="atemabio">AtemaBio</option>
          </select>
          
          <button
            onClick={() => setShowUpload(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <CloudArrowUpIcon className="h-4 w-4" />
            Upload
          </button>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((document) => (
          <motion.div
            key={document.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedDocument(document)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <DocumentIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    {document.fileType}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                  {document.title}
                </h3>
                {document.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">{document.description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConfidentialityColor(document.confidentiality)}`}>
                {document.confidentiality}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(document.status)}`}>
                {document.status}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>v{document.version}</span>
              <span>{formatFileSize(document.fileSize)}</span>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{document.ventureName}</span>
                <span>{new Date(document.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>

            {document.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {document.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                  >
                    {tag}
                  </span>
                ))}
                {document.tags.length > 3 && (
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                    +{document.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderFoldersTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Document Folders</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <FolderIcon className="h-4 w-4" />
          New Folder
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockFolders.map((folder) => (
          <motion.div
            key={folder.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FolderIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{folder.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{folder.path}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Documents:</span>
                    <span className="font-medium">{folder.documentCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Size:</span>
                    <span className="font-medium">{formatFileSize(folder.totalSize)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Updated:</span>
                    <span className="font-medium">{new Date(folder.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {folder.permissions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <UserGroupIcon className="h-3 w-3" />
                      {folder.permissions.length} permission{folder.permissions.length > 1 ? 's' : ''}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderAnalyticsTab = () => (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Documents</p>
              <p className="text-3xl font-bold text-gray-900">{mockAnalytics.totalDocuments}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <DocumentIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Storage Used</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatFileSize(mockAnalytics.storageUsed)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                of {formatFileSize(mockAnalytics.storageLimit)}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
              <p className="text-3xl font-bold text-gray-900">{mockAnalytics.pendingReviews.length}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Compliance Alerts</p>
              <p className="text-3xl font-bold text-gray-900">{mockAnalytics.complianceAlerts.length}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Documents by Type */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents by Type</h3>
          <div className="space-y-3">
            {mockAnalytics.documentsByType.map((item) => (
              <div key={item.type} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700 capitalize">{item.type}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Documents by Venture */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents by Venture</h3>
          <div className="space-y-3">
            {mockAnalytics.documentsByVenture.map((item) => (
              <div key={item.venture} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">{item.venture}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Alerts */}
      {mockAnalytics.complianceAlerts.length > 0 && (
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
            Compliance Alerts
          </h3>
          <div className="space-y-4">
            {mockAnalytics.complianceAlerts.map((alert, index) => (
              <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-red-800 capitalize">{alert.type}</h4>
                    <p className="text-sm text-red-700 mt-1">{alert.message}</p>
                  </div>
                  <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Document Vault</h1>
              <p className="text-sm text-gray-600">Secure document management with AI insights</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowInsights(!showInsights)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <ShieldCheckIcon className="h-4 w-4" />
                AI Insights
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-8 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('documents')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'documents'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Documents ({filteredDocuments.length})
          </button>
          <button
            onClick={() => setActiveTab('folders')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'folders'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Folders ({mockFolders.length})
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'analytics'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'documents' && renderDocumentsTab()}
          {activeTab === 'folders' && renderFoldersTab()}
          {activeTab === 'analytics' && renderAnalyticsTab()}
        </AnimatePresence>

        {/* Document Detail Modal */}
        <AnimatePresence>
          {selectedDocument && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedDocument(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedDocument.title}</h2>
                      {selectedDocument.description && (
                        <p className="text-gray-600 mt-1">{selectedDocument.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedDocument(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Document Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Information</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Type:</span>
                          <span className="font-medium capitalize">{selectedDocument.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Version:</span>
                          <span className="font-medium">v{selectedDocument.version}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Size:</span>
                          <span className="font-medium">{formatFileSize(selectedDocument.fileSize)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Status:</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedDocument.status)}`}>
                            {selectedDocument.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Confidentiality:</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConfidentialityColor(selectedDocument.confidentiality)}`}>
                            {selectedDocument.confidentiality}
                          </span>
                        </div>
                      </div>

                      {selectedDocument.tags.length > 0 && (
                        <div className="mt-6">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Tags</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedDocument.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Metadata</h3>
                      <div className="space-y-3">
                        {selectedDocument.metadata.author && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Author:</span>
                            <span className="font-medium">{selectedDocument.metadata.author}</span>
                          </div>
                        )}
                        {selectedDocument.metadata.dealValue && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Deal Value:</span>
                            <span className="font-medium">${selectedDocument.metadata.dealValue.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-500">Risk Level:</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            selectedDocument.metadata.riskLevel === 'high' ? 'text-red-600 bg-red-100' :
                            selectedDocument.metadata.riskLevel === 'medium' ? 'text-orange-600 bg-orange-100' :
                            'text-green-600 bg-green-100'
                          }`}>
                            {selectedDocument.metadata.riskLevel}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Compliance:</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            selectedDocument.metadata.complianceStatus === 'compliant' ? 'text-green-600 bg-green-100' :
                            selectedDocument.metadata.complianceStatus === 'pending' ? 'text-orange-600 bg-orange-100' :
                            'text-red-600 bg-red-100'
                          }`}>
                            {selectedDocument.metadata.complianceStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Insights */}
                  {showInsights && (
                    <div className="mt-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
                        <ShieldCheckIcon className="h-5 w-5" />
                        AI Insights
                      </h3>
                      <div className="space-y-3">
                        {mockInsights.filter(insight => insight.documentId === selectedDocument.id).map((insight) => (
                          <div key={insight.id} className="bg-white p-4 rounded-lg border border-purple-200">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-purple-900">{insight.title}</h4>
                              <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                                {(insight.confidence * 100).toFixed(0)}% confidence
                              </span>
                            </div>
                            <p className="text-sm text-purple-800">{insight.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-8 flex gap-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <EyeIcon className="h-4 w-4" />
                      View
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                      <DocumentArrowDownIcon className="h-4 w-4" />
                      Download
                    </button>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
                      <PencilSquareIcon className="h-4 w-4" />
                      Edit
                    </button>
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2">
                      <ArrowUpTrayIcon className="h-4 w-4" />
                      Share
                    </button>
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
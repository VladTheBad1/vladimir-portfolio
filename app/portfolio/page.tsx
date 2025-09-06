'use client'

import React, { useState, useMemo } from 'react'
import { VentureCard } from '@/components/features/venture-card'
import { H1, Lead, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { ventures } from '@/data/ventures'
import { VentureCategory, VentureStage, CATEGORY_LABELS, STAGE_LABELS } from '@/types/venture'
import { Search, Filter, Grid3x3, List, TrendingUp, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type SortOption = 'featured' | 'newest' | 'stage' | 'category'
type ViewMode = 'grid' | 'list'

export default function PortfolioPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<VentureCategory[]>([])
  const [selectedStages, setSelectedStages] = useState<VentureStage[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const filteredVentures = useMemo(() => {
    let filtered = [...ventures]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(v => 
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(v => selectedCategories.includes(v.category))
    }

    // Stage filter
    if (selectedStages.length > 0) {
      filtered = filtered.filter(v => selectedStages.includes(v.stage))
    }

    // Sorting
    switch (sortBy) {
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
      case 'newest':
        filtered.sort((a, b) => parseInt(b.founded) - parseInt(a.founded))
        break
      case 'stage':
        const stageOrder = ['exit', 'scale', 'growth', 'mvp', 'ideation']
        filtered.sort((a, b) => stageOrder.indexOf(a.stage) - stageOrder.indexOf(b.stage))
        break
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category))
        break
    }

    return filtered
  }, [searchQuery, selectedCategories, selectedStages, sortBy])

  const toggleCategory = (category: VentureCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const toggleStage = (stage: VentureStage) => {
    setSelectedStages(prev =>
      prev.includes(stage)
        ? prev.filter(s => s !== stage)
        : [...prev, stage]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategories([])
    setSelectedStages([])
  }

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || selectedStages.length > 0

  return (
    <>
      <main className="min-h-screen pt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <H1 gradient className="mb-4">Venture Portfolio</H1>
            <Lead className="max-w-3xl mx-auto">
              Building the future across {ventures.length} revolutionary companies
            </Lead>
          </div>

          {/* Search and Controls */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600" />
                <input
                  type="text"
                  placeholder="Search ventures..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-colors shadow-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant={showFilters ? 'primary' : 'outline'}
                  onClick={() => setShowFilters(!showFilters)}
                  className="min-w-[120px]"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-gray-800 text-white">
                      {selectedCategories.length + selectedStages.length + (searchQuery ? 1 : 0)}
                    </span>
                  )}
                </Button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-gray-500 shadow-sm"
                >
                  <option value="featured">Featured First</option>
                  <option value="newest">Newest First</option>
                  <option value="stage">By Stage</option>
                  <option value="category">By Category</option>
                </select>

                <div className="hidden sm:flex border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
                  <Button
                    onClick={() => setViewMode('grid')}
                    variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                    size="icon"
                    className="rounded-none"
                  >
                    <Grid3x3 className="h-5 w-5" />
                  </Button>
                  <Button
                    onClick={() => setViewMode('list')}
                    variant={viewMode === 'list' ? 'primary' : 'ghost'}
                    size="icon"
                    className="rounded-none"
                  >
                    <List className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="p-6 bg-gray-50 border-2 border-gray-200 rounded-lg space-y-4 shadow-sm">
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                      <Button
                        key={key}
                        onClick={() => toggleCategory(key as VentureCategory)}
                        variant={selectedCategories.includes(key as VentureCategory) ? "primary" : "outline"}
                        size="sm"
                        className="rounded-full"
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Stages */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Stages</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(STAGE_LABELS).map(([key, label]) => (
                      <Button
                        key={key}
                        onClick={() => toggleStage(key as VentureStage)}
                        variant={selectedStages.includes(key as VentureStage) ? "primary" : "outline"}
                        size="sm"
                        className="rounded-full"
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>

                {hasActiveFilters && (
                  <Button
                    onClick={clearFilters}
                    variant="ghost"
                    size="sm"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear all filters
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="mb-6 flex items-center justify-between">
            <Text className="text-gray-700">
              Showing {filteredVentures.length} of {ventures.length} ventures
            </Text>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-gray-700" />
              <span className="text-sm text-gray-700">
                Total Portfolio Value: <span className="text-gray-700 font-semibold">$100M+</span>
              </span>
            </div>
          </div>

          {/* Ventures Grid/List */}
          {filteredVentures.length > 0 ? (
            <div className={cn(
              viewMode === 'grid'
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            )}>
              {filteredVentures.map((venture) => (
                <VentureCard
                  key={venture.id}
                  venture={venture}
                  onClick={() => console.log('View venture:', venture.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Text className="text-gray-700 mb-4">
                No ventures found matching your criteria
              </Text>
              <Button variant="outline" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
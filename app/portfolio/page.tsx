'use client'

import React, { useState, useMemo } from 'react'
import { Navigation } from '@/components/layout/navigation'
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
      <Navigation />
      <main className="min-h-screen pt-24">
        <div className="section-container py-12">
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
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search ventures..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-dark-800/50 border border-dark-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
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
                    <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-primary-500 text-dark-900">
                      {selectedCategories.length + selectedStages.length + (searchQuery ? 1 : 0)}
                    </span>
                  )}
                </Button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-2 bg-dark-800/50 border border-dark-700 rounded-lg text-gray-100 focus:outline-none focus:border-primary-500"
                >
                  <option value="featured">Featured First</option>
                  <option value="newest">Newest First</option>
                  <option value="stage">By Stage</option>
                  <option value="category">By Category</option>
                </select>

                <div className="hidden sm:flex border border-dark-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      "p-2.5 transition-colors",
                      viewMode === 'grid' ? 'bg-primary-500 text-dark-900' : 'text-gray-400 hover:text-gray-200'
                    )}
                  >
                    <Grid3x3 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      "p-2.5 transition-colors",
                      viewMode === 'list' ? 'bg-primary-500 text-dark-900' : 'text-gray-400 hover:text-gray-200'
                    )}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="p-6 bg-dark-800/30 border border-dark-700 rounded-lg space-y-4">
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => toggleCategory(key as VentureCategory)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-sm transition-all",
                          selectedCategories.includes(key as VentureCategory)
                            ? "bg-primary-500 text-dark-900"
                            : "bg-dark-700/50 text-gray-400 hover:bg-dark-700 hover:text-gray-200"
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stages */}
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Stages</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(STAGE_LABELS).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => toggleStage(key as VentureStage)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-sm transition-all",
                          selectedStages.includes(key as VentureStage)
                            ? "bg-primary-500 text-dark-900"
                            : "bg-dark-700/50 text-gray-400 hover:bg-dark-700 hover:text-gray-200"
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-400 hover:text-gray-200 flex items-center gap-1"
                  >
                    <X className="h-4 w-4" />
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="mb-6 flex items-center justify-between">
            <Text className="text-gray-400">
              Showing {filteredVentures.length} of {ventures.length} ventures
            </Text>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary-400" />
              <span className="text-sm text-gray-400">
                Total Portfolio Value: <span className="text-primary-400 font-semibold">$100M+</span>
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
              <Text className="text-gray-500 mb-4">
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
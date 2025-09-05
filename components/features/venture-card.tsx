'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Venture, STAGE_LABELS } from '@/types/venture'
import { TrendingUp, Users, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VentureCardProps {
  venture: Venture
  onClick?: () => void
}

const stageColors = {
  ideation: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  mvp: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  growth: 'bg-green-500/20 text-green-400 border-green-500/30',
  scale: 'bg-primary-500/20 text-primary-400 border-primary-500/30',
  exit: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
}

export function VentureCard({ venture, onClick }: VentureCardProps) {
  return (
    <Card 
      variant="venture" 
      className={cn(
        "group cursor-pointer transition-all duration-300",
        "hover:shadow-[0_0_50px_rgba(212,134,10,0.15)]",
        venture.featured && "ring-1 ring-primary-500/20"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className={cn(
            "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
            stageColors[venture.stage]
          )}>
            {STAGE_LABELS[venture.stage]}
          </div>
          {venture.featured && (
            <Badge variant="primary" className="text-xs">Featured</Badge>
          )}
        </div>
        
        <CardTitle className="text-xl text-gray-100 group-hover:text-primary-400 transition-colors">
          {venture.name}
        </CardTitle>
        <CardDescription className="text-base mt-2">
          {venture.tagline}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-400 line-clamp-2">
          {venture.description}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{venture.founded}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{venture.teamSize} team</span>
          </div>
        </div>
        
        {venture.metrics && Object.keys(venture.metrics).length > 0 && (
          <div className="pt-3 border-t border-dark-700/50">
            <div className="flex items-center gap-1 mb-2">
              <TrendingUp className="h-3 w-3 text-primary-400" />
              <span className="text-xs font-medium text-primary-400">Key Metrics</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {venture.metrics.revenue && (
                <div>
                  <div className="text-xs text-gray-500">Revenue</div>
                  <div className="text-sm font-medium text-gray-300">{venture.metrics.revenue}</div>
                </div>
              )}
              {venture.metrics.users && (
                <div>
                  <div className="text-xs text-gray-500">Users</div>
                  <div className="text-sm font-medium text-gray-300">{venture.metrics.users}</div>
                </div>
              )}
              {venture.metrics.growth && (
                <div className={venture.metrics.revenue ? 'col-span-2' : ''}>
                  <div className="text-xs text-gray-500">Growth</div>
                  <div className="text-sm font-medium text-gray-300">{venture.metrics.growth}</div>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 pt-2">
          {venture.technologies.slice(0, 3).map((tech) => (
            <span 
              key={tech}
              className="text-xs px-2 py-1 rounded-full bg-dark-700/50 text-gray-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
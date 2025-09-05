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

// Removed stageColors - now using Badge component variants

export function VentureCard({ venture, onClick }: VentureCardProps) {
  return (
    <Card 
      variant="venture" 
      className={cn(
        "group cursor-pointer transition-all duration-300",
        "hover:shadow-[0_0_50px_rgba(212,134,10,0.15)]"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <Badge variant={venture.stage} className="text-xs">
            {STAGE_LABELS[venture.stage]}
          </Badge>
          {venture.featured && (
            <Badge variant="primary" className="text-xs">Featured</Badge>
          )}
        </div>
        
        <CardTitle className="text-xl group-hover:text-primary-600 transition-colors">
          {venture.name}
        </CardTitle>
        <CardDescription className="text-base mt-2">
          {venture.tagline}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700 line-clamp-2">
          {venture.description}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-gray-700">
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
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1 mb-2">
              <TrendingUp className="h-3 w-3 text-primary-600" />
              <span className="text-xs font-medium text-primary-600">Key Metrics</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {venture.metrics.revenue && (
                <div>
                  <div className="text-xs text-gray-700">Revenue</div>
                  <div className="text-sm font-medium text-gray-900">{venture.metrics.revenue}</div>
                </div>
              )}
              {venture.metrics.users && (
                <div>
                  <div className="text-xs text-gray-700">Users</div>
                  <div className="text-sm font-medium text-gray-900">{venture.metrics.users}</div>
                </div>
              )}
              {venture.metrics.growth && (
                <div className={venture.metrics.revenue ? 'col-span-2' : ''}>
                  <div className="text-xs text-gray-700">Growth</div>
                  <div className="text-sm font-medium text-gray-900">{venture.metrics.growth}</div>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 pt-2">
          {venture.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="default" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
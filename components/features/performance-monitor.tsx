'use client'

import { useEffect, useState } from 'react'
import { Activity } from 'lucide-react'

interface PerformanceMetrics {
  fps: number
  memory: number
  loadTime: number
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memory: 0,
    loadTime: 0
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return

    let frameCount = 0
    let lastTime = performance.now()
    let rafId: number

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        
        // Get memory usage if available
        const memory = (performance as any).memory
          ? Math.round((performance as any).memory.usedJSHeapSize / 1048576)
          : 0

        // Get page load time
        const loadTime = performance.timing
          ? performance.timing.loadEventEnd - performance.timing.navigationStart
          : 0

        setMetrics({
          fps,
          memory,
          loadTime
        })

        frameCount = 0
        lastTime = currentTime
      }

      rafId = requestAnimationFrame(measureFPS)
    }

    measureFPS()

    // Keyboard shortcut to toggle visibility
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  if (process.env.NODE_ENV !== 'development' || !isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-3 rounded-lg text-xs font-mono backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-2">
        <Activity className="h-3 w-3" />
        <span className="font-semibold">Performance</span>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between gap-4">
          <span>FPS:</span>
          <span className={metrics.fps >= 50 ? 'text-green-400' : metrics.fps >= 30 ? 'text-yellow-400' : 'text-red-400'}>
            {metrics.fps}
          </span>
        </div>
        {metrics.memory > 0 && (
          <div className="flex justify-between gap-4">
            <span>Memory:</span>
            <span>{metrics.memory} MB</span>
          </div>
        )}
        {metrics.loadTime > 0 && (
          <div className="flex justify-between gap-4">
            <span>Load:</span>
            <span>{metrics.loadTime} ms</span>
          </div>
        )}
      </div>
      <div className="mt-2 pt-2 border-t border-white/20 text-[10px] text-gray-400">
        Ctrl+Shift+P to toggle
      </div>
    </div>
  )
}
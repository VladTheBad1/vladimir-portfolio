'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'

interface NewsletterFormProps {
  variant?: 'inline' | 'card'
  title?: string
  description?: string
}

export function NewsletterForm({ 
  variant = 'card',
  title = 'Stay Updated',
  description = 'Get insights on innovation, entrepreneurship, and venture building delivered to your inbox.'
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setStatus('error')
      setMessage('Please enter your email address')
      return
    }

    setStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setMessage('Thank you for subscribing! Check your email to confirm.')
      setEmail('')
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    }, 1000)
  }

  if (variant === 'inline') {
    return (
      <div className="w-full">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-700 mb-4">{description}</p>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading' || status === 'success'}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={status === 'loading' || status === 'success'}
            variant="primary"
          >
            {status === 'loading' ? 'Subscribing...' : 
             status === 'success' ? 'Subscribed!' : 'Subscribe'}
          </Button>
        </form>
        
        {message && (
          <div className={`mt-2 text-sm flex items-center gap-1 ${
            status === 'success' ? 'text-green-600' : 
            status === 'error' ? 'text-red-600' : 'text-gray-700'
          }`}>
            {status === 'success' && <CheckCircle className="h-4 w-4" />}
            {status === 'error' && <AlertCircle className="h-4 w-4" />}
            {message}
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-primary-50 to-white border-primary-100">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Mail className="h-5 w-5 text-primary-600" />
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading' || status === 'success'}
            className="w-full"
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={status === 'loading' || status === 'success'}
            variant="primary"
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Subscribing...
              </span>
            ) : status === 'success' ? (
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Successfully Subscribed!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Subscribe to Newsletter
              </span>
            )}
          </Button>
        </form>
        
        {message && status !== 'idle' && (
          <div className={`mt-4 p-3 rounded-lg text-sm flex items-center gap-2 ${
            status === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 
            status === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 
            'bg-gray-50 text-gray-700 border border-gray-200'
          }`}>
            {status === 'success' && <CheckCircle className="h-4 w-4 flex-shrink-0" />}
            {status === 'error' && <AlertCircle className="h-4 w-4 flex-shrink-0" />}
            {message}
          </div>
        )}
        
        <p className="text-xs text-gray-700 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </CardContent>
    </Card>
  )
}
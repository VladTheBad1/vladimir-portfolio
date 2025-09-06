'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Globe, Linkedin, Github, Twitter } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      setStatusMessage('Please fill in all required fields')
      return
    }

    setStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setStatusMessage('Thank you for your message! I\'ll get back to you within 24 hours.')
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      })
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setStatusMessage('')
      }, 5000)
    }, 1500)
  }

  return (
    <main className="min-h-screen pt-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Let&apos;s Connect
          </h1>
          <p className="text-lg text-gray-700">
            Whether you&apos;re interested in partnership, investment, or just want to discuss innovation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and I&apos;ll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={status === 'loading' || status === 'success'}
                        className="w-full"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={status === 'loading' || status === 'success'}
                        className="w-full"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        disabled={status === 'loading' || status === 'success'}
                        className="w-full"
                        placeholder="Acme Corp"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={status === 'loading' || status === 'success'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select a topic</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="investment">Investment Inquiry</option>
                        <option value="venture">Venture Collaboration</option>
                        <option value="speaking">Speaking Engagement</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={status === 'loading' || status === 'success'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Tell me about your idea or project..."
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-700">
                      * Required fields
                    </p>
                    
                    <Button 
                      type="submit" 
                      disabled={status === 'loading' || status === 'success'}
                      variant="primary"
                      className="min-w-[150px]"
                    >
                      {status === 'loading' ? (
                        <span className="flex items-center gap-2">
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : status === 'success' ? (
                        <span className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Sent!
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </div>

                  {statusMessage && (
                    <div className={`p-4 rounded-lg flex items-center gap-2 ${
                      status === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 
                      status === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 
                      'bg-gray-50 text-gray-700 border border-gray-200'
                    }`}>
                      {status === 'success' && <CheckCircle className="h-5 w-5 flex-shrink-0" />}
                      {status === 'error' && <AlertCircle className="h-5 w-5 flex-shrink-0" />}
                      {statusMessage}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Direct Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-700">Email</p>
                    <a href="mailto:vladimir@proskurov.com" className="font-medium text-gray-900 hover:text-primary-600">
                      vladimir@proskurov.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-700">Phone</p>
                    <a href="tel:+1234567890" className="font-medium text-gray-900 hover:text-primary-600">
                      Available on request
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-700">Location</p>
                    <p className="font-medium text-gray-900">
                      Global Operations
                    </p>
                    <p className="text-sm text-gray-700">
                      Currently: North America
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Social Presence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Linkedin className="h-5 w-5 text-primary-600" />
                  <span className="font-medium text-gray-900">LinkedIn</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Twitter className="h-5 w-5 text-primary-600" />
                  <span className="font-medium text-gray-900">Twitter/X</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Github className="h-5 w-5 text-primary-600" />
                  <span className="font-medium text-gray-900">GitHub</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Globe className="h-5 w-5 text-primary-600" />
                  <span className="font-medium text-gray-900">Personal Website</span>
                </a>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary-50 to-white border-primary-100">
              <CardHeader>
                <CardTitle>Office Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-3">
                  I hold virtual office hours for entrepreneurs and innovators.
                </p>
                <Badge variant="primary">Every Thursday 3-5 PM EST</Badge>
                <p className="text-sm text-gray-700 mt-3">
                  Book a 30-minute slot to discuss your venture or ideas.
                </p>
                <Button variant="outline" className="w-full mt-4">
                  Schedule a Call
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
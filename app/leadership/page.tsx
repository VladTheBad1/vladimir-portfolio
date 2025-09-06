'use client'

import React, { useState } from 'react'
import { H1, Lead, Text, H2 } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Target,
  Rocket,
  Brain,
  Heart,
  Trophy,
  Star,
  Linkedin,
  Twitter,
  Mail,
  Building,
  Award,
  Zap,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TeamMember {
  id: string
  name: string
  role: string
  company: string
  bio: string
  expertise: string[]
  achievements: string[]
  linkedin?: string
  twitter?: string
  featured?: boolean
}

interface AdvisorProfile {
  id: string
  name: string
  title: string
  company: string
  expertise: string
  contribution: string
  image?: string
}

const leadershipQualities = [
  {
    icon: Target,
    title: 'Visionary',
    description: 'Setting ambitious goals that inspire teams to exceed their limits'
  },
  {
    icon: Users,
    title: 'Team Builder',
    description: 'Assembling world-class teams from diverse backgrounds and expertise'
  },
  {
    icon: Rocket,
    title: 'Executor',
    description: 'Turning ideas into reality with relentless focus and determination'
  },
  {
    icon: Brain,
    title: 'Strategic',
    description: 'Making complex decisions with incomplete information and high stakes'
  },
  {
    icon: Heart,
    title: 'Empathetic',
    description: 'Understanding and addressing the human side of business'
  },
  {
    icon: Trophy,
    title: 'Results-Driven',
    description: 'Delivering measurable outcomes that create lasting value'
  }
]

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    role: 'Chief Medical Officer',
    company: 'MediCore Solutions',
    bio: 'Former Johns Hopkins researcher with 15+ years in medical AI',
    expertise: ['Medical AI', 'Clinical Research', 'FDA Regulations'],
    achievements: ['Published 40+ papers', 'Led FDA approval for 3 devices'],
    linkedin: '#',
    featured: true
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    role: 'CTO',
    company: 'NeuralForge AI',
    bio: 'Ex-Google AI engineer, specializing in enterprise automation',
    expertise: ['Machine Learning', 'Cloud Architecture', 'DevOps'],
    achievements: ['Scaled systems to 1B+ requests/day', 'Filed 12 patents'],
    linkedin: '#',
    twitter: '#',
    featured: true
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'CEO',
    company: 'VitalBlend Naturals',
    bio: 'Serial entrepreneur with 3 successful exits in consumer health',
    expertise: ['D2C Marketing', 'Supply Chain', 'Brand Building'],
    achievements: ['$100M+ in exits', 'Built 500K+ customer base'],
    linkedin: '#'
  },
  {
    id: '4',
    name: 'Dr. Ahmed Hassan',
    role: 'Chief Scientist',
    company: 'NanoShield Technologies',
    bio: 'MIT PhD in Materials Science, pioneer in industrial nano-coatings',
    expertise: ['Nanotechnology', 'Material Science', 'R&D Management'],
    achievements: ['15 patents granted', 'Led $50M research programs'],
    linkedin: '#'
  },
  {
    id: '5',
    name: 'Lisa Park',
    role: 'VP of Growth',
    company: 'Cosmic Academy',
    bio: 'Growth hacker who scaled 5 EdTech platforms to profitability',
    expertise: ['Growth Marketing', 'Product-Led Growth', 'Analytics'],
    achievements: ['10M+ users acquired', '300% YoY growth average'],
    linkedin: '#',
    twitter: '#'
  },
  {
    id: '6',
    name: 'James Okonkwo',
    role: 'Country Director',
    company: 'AgriTech Nigeria',
    bio: 'Agricultural economist transforming African farming',
    expertise: ['AgriTech', 'Market Development', 'Policy'],
    achievements: ['50K farmers onboarded', '$25M funding raised'],
    linkedin: '#'
  }
]

const advisors: AdvisorProfile[] = [
  {
    id: '1',
    name: 'Prof. Michael Zhang',
    title: 'AI Ethics Advisor',
    company: 'Stanford University',
    expertise: 'Responsible AI Development',
    contribution: 'Ensuring ethical AI practices across all ventures'
  },
  {
    id: '2',
    name: 'Rachel Thompson',
    title: 'Investment Advisor',
    company: 'Sequoia Capital',
    expertise: 'Venture Capital & Scaling',
    contribution: 'Strategic guidance on fundraising and growth'
  },
  {
    id: '3',
    name: 'David Kim',
    title: 'Legal Advisor',
    company: 'Wilson Sonsini',
    expertise: 'Corporate Law & IP',
    contribution: 'Navigating complex legal landscapes globally'
  }
]

export default function LeadershipPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  return (
    <>
      <main className="min-h-screen pt-24 bg-white">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="primary" className="mb-4">
              <Users className="h-3 w-3 mr-1" />
              Leadership Excellence
            </Badge>
            <H1 gradient className="mb-6">
              World-Class Leadership
            </H1>
            <Lead className="mb-12">
              Building exceptional teams that transform industries and create lasting impact
            </Lead>

            {/* Leadership Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">250+</div>
                <Text className="text-sm text-gray-600">Team Members</Text>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">15</div>
                <Text className="text-sm text-gray-600">Countries</Text>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">87%</div>
                <Text className="text-sm text-gray-600">Retention Rate</Text>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">4.9</div>
                <Text className="text-sm text-gray-600">Culture Score</Text>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Philosophy */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <H2 className="mb-4">Leadership Philosophy</H2>
              <Lead className="max-w-3xl mx-auto text-base">
                Great companies are built by great people. My role is to attract, inspire, and empower 
                the brightest minds to solve humanity&apos;s biggest challenges.
              </Lead>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {leadershipQualities.map((quality, index) => {
                const Icon = quality.icon
                return (
                  <Card key={index} variant="default" className="transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">{quality.title}</h3>
                          <Text className="text-sm text-gray-600">{quality.description}</Text>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        {/* Team Showcase */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <H2 className="mb-4">Venture Leadership Team</H2>
              <Lead className="max-w-3xl mx-auto text-base">
                Meet the exceptional leaders driving innovation across our portfolio
              </Lead>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <Card 
                  key={member.id}
                  variant="default"
                  hover={true}
                  interactive={true}
                  className={cn(
                    "bg-white transition-all cursor-pointer shadow-sm"
                  )}
                  onClick={() => setSelectedMember(member)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        {member.featured && (
                          <Badge variant="primary" className="mb-2">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Building className="h-3 w-3 text-gray-400" />
                      <Text className="text-xs text-gray-600">{member.company}</Text>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Text className="text-sm text-gray-700 line-clamp-2">{member.bio}</Text>
                    
                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-1">
                      {member.expertise.slice(0, 3).map((skill) => (
                        <span key={skill} className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-700">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Key Achievement */}
                    <div className="flex items-start gap-2 pt-2 border-t border-gray-200">
                      <Trophy className="h-3 w-3 text-gray-600 mt-0.5" />
                      <Text className="text-xs text-gray-700">
                        {member.achievements[0]}
                      </Text>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-2">
                      {member.linkedin && (
                        <Button variant="ghost" size="sm" className="p-2">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      )}
                      {member.twitter && (
                        <Button variant="ghost" size="sm" className="p-2">
                          <Twitter className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="p-2">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Advisory Board */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <H2 className="mb-4">Advisory Board</H2>
              <Lead className="max-w-3xl mx-auto text-base">
                Strategic guidance from industry luminaries
              </Lead>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {advisors.map((advisor) => (
                <Card key={advisor.id} variant="default">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{advisor.name}</h3>
                        <Text className="text-sm text-gray-700 font-medium mb-2">{advisor.title}</Text>
                        <div className="flex items-center gap-2">
                          <Building className="h-3 w-3 text-gray-400" />
                          <Text className="text-xs text-gray-600">{advisor.company}</Text>
                        </div>
                      </div>
                      
                      <div>
                        <Text className="text-xs text-gray-600 mb-1">Expertise</Text>
                        <Text className="text-sm text-gray-700">{advisor.expertise}</Text>
                      </div>

                      <div>
                        <Text className="text-xs text-gray-600 mb-1">Contribution</Text>
                        <Text className="text-sm text-gray-600">{advisor.contribution}</Text>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Join Us CTA */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pb-20">
          <Card variant="default" className="bg-gray-50">
            <CardContent className="p-12 text-center">
              <Badge variant="primary" className="mb-4">
                <Zap className="h-3 w-3 mr-1" />
                We&apos;re Hiring
              </Badge>
              <H2 className="mb-4">Join Our Mission</H2>
              <Lead className="max-w-2xl mx-auto mb-8 text-base">
                We&apos;re always looking for exceptional talent to join our ventures. 
                If you&apos;re passionate about building the future, let&apos;s talk.
              </Lead>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  View Open Positions
                </Button>
                <Button variant="outline" size="lg">
                  Start a Conversation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Member Detail Modal */}
        {selectedMember && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          >
            <Card 
              variant="default" 
              className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    {selectedMember.featured && (
                      <Badge variant="primary" className="mb-3">
                        <Star className="h-3 w-3 mr-1" />
                        Featured Leader
                      </Badge>
                    )}
                    <CardTitle className="text-2xl mb-2">{selectedMember.name}</CardTitle>
                    <CardDescription className="text-base">
                      {selectedMember.role} at {selectedMember.company}
                    </CardDescription>
                  </div>
                  <button 
                    onClick={() => setSelectedMember(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Bio */}
                <div>
                  <h3 className="text-sm font-medium text-gray-800 mb-2">Biography</h3>
                  <Text className="text-gray-700">{selectedMember.bio}</Text>
                </div>

                {/* Expertise */}
                <div>
                  <h3 className="text-sm font-medium text-gray-800 mb-3">Areas of Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.expertise.map((skill) => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-sm font-medium text-gray-800 mb-3">Key Achievements</h3>
                  <div className="space-y-2">
                    {selectedMember.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Award className="h-4 w-4 text-yellow-400 mt-0.5" />
                        <Text className="text-gray-700">{achievement}</Text>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connect */}
                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  {selectedMember.linkedin && (
                    <Button variant="outline" className="flex-1">
                      <Linkedin className="h-4 w-4 mr-2" />
                      Connect on LinkedIn
                    </Button>
                  )}
                  {selectedMember.twitter && (
                    <Button variant="outline" className="flex-1">
                      <Twitter className="h-4 w-4 mr-2" />
                      Follow on Twitter
                    </Button>
                  )}
                  <Button className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </>
  )
}
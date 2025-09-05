import { Navigation } from '@/components/layout/navigation'
import { H1, Lead, Text } from '@/components/ui/typography'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Briefcase, Globe, Lightbulb } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16">
        <div className="section-container py-20">
          <div className="text-center">
            <H1 gradient className="mb-6">
              Vladimir Proskurov
            </H1>
            <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">
              Serial Innovator Command Center
            </h2>
            <Lead className="max-w-2xl mx-auto mb-12">
              Where vision meets velocity. Creating tomorrow&apos;s companies today.
            </Lead>
            
            <div className="flex justify-center gap-4 mb-16">
              <Button variant="primary" size="lg">
                Explore Portfolio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
              <Card variant="venture">
                <CardHeader>
                  <Briefcase className="h-8 w-8 text-primary-400 mb-2" />
                  <CardTitle className="text-primary-300">7+ Active Ventures</CardTitle>
                  <CardDescription>
                    Health MedTech, AI Solutions, NanoTech, and more
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="primary">MedTech</Badge>
                    <Badge variant="primary">AI</Badge>
                    <Badge variant="primary">NanoTech</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card variant="venture">
                <CardHeader>
                  <Globe className="h-8 w-8 text-primary-400 mb-2" />
                  <CardTitle className="text-primary-300">Global Experience</CardTitle>
                  <CardDescription>
                    Operating across Europe, Asia, Africa, and Americas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="success">7+ Countries</Badge>
                    <Badge variant="success">4 Continents</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card variant="venture">
                <CardHeader>
                  <Lightbulb className="h-8 w-8 text-primary-400 mb-2" />
                  <CardTitle className="text-primary-300">AI-Powered Creation</CardTitle>
                  <CardDescription>
                    Building a company a day with AI capabilities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="warning">Company/Day</Badge>
                    <Badge variant="warning">AI-First</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-16">
              <Text className="text-gray-500">
                Full platform features rolling out progressively. Experience the future of serial entrepreneurship.
              </Text>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

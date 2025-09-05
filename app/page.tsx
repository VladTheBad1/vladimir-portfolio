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
      <main className="min-h-screen pt-24">
        <div className="section-container py-20">
          <div className="text-center">
            <H1 gradient className="mb-8">
              Vladimir Proskurov
            </H1>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-300 mb-8">
              Serial Innovator Command Center
            </h2>
            <Lead className="max-w-3xl mx-auto mb-12">
              Where vision meets velocity. Creating tomorrow&apos;s companies today.
            </Lead>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
              <Button variant="primary" size="lg" className="min-w-[180px]">
                Explore Portfolio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="min-w-[180px]">
                Watch Demo
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
              <Card variant="venture" className="group">
                <CardHeader className="pb-4">
                  <Briefcase className="h-10 w-10 text-primary-400 mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl text-primary-300 mb-2">7+ Active Ventures</CardTitle>
                  <CardDescription className="text-base">
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

              <Card variant="venture" className="group">
                <CardHeader className="pb-4">
                  <Globe className="h-10 w-10 text-primary-400 mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl text-primary-300 mb-2">Global Experience</CardTitle>
                  <CardDescription className="text-base">
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

              <Card variant="venture" className="group">
                <CardHeader className="pb-4">
                  <Lightbulb className="h-10 w-10 text-primary-400 mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl text-primary-300 mb-2">AI-Powered Creation</CardTitle>
                  <CardDescription className="text-base">
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

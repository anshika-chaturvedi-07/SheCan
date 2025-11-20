'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp, Users, Building2, DollarSign, Target, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'

const INVESTORS = [
  {
    id: 1,
    name: 'Women Empowerment Fund',
    type: 'Angel Investor',
    focus: ['Women-led', 'Social Impact', 'Rural'],
    investment: '₹5L - ₹50L',
    portfolio: 45,
    matchScore: 92,
    description: 'Focused on empowering women entrepreneurs in rural and semi-urban areas'
  },
  {
    id: 2,
    name: 'Startup India Seed Fund',
    type: 'Government Fund',
    focus: ['Early Stage', 'Innovation', 'Technology'],
    investment: 'Up to ₹20L',
    portfolio: 120,
    matchScore: 78,
    description: 'Government initiative to support innovative startups in early stages'
  },
  {
    id: 3,
    name: 'Impact Ventures',
    type: 'VC Fund',
    focus: ['E-commerce', 'D2C', 'Sustainable'],
    investment: '₹50L - ₹5Cr',
    portfolio: 32,
    matchScore: 85,
    description: 'Venture capital focused on sustainable and impact-driven businesses'
  },
]

const NGOS = [
  {
    id: 1,
    name: 'Self-Employed Women\'s Association',
    type: 'NGO',
    services: ['Training', 'Microfinance', 'Market Access'],
    reach: '2M+ women',
    location: 'Pan India',
    matchScore: 88
  },
  {
    id: 2,
    name: 'Women Entrepreneurship Platform',
    type: 'Government Initiative',
    services: ['Mentorship', 'Funding', 'Networking'],
    reach: '500K+ women',
    location: 'Pan India',
    matchScore: 82
  },
]

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-main" />
            Investors & NGOs
          </h1>
          <p className="text-foreground/70 mt-2">Connect with funding sources and support organizations</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-main/10 rounded-lg">
                <Building2 className="w-5 h-5 text-main" />
              </div>
              <div>
                <p className="text-2xl font-bold">150+</p>
                <p className="text-sm text-foreground/70">Investors</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-2/10 rounded-lg">
                <Users className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold">80+</p>
                <p className="text-sm text-foreground/70">NGOs</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-3/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹500Cr+</p>
                <p className="text-sm text-foreground/70">Funding Pool</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-4/10 rounded-lg">
                <Target className="w-5 h-5 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">65%</p>
                <p className="text-sm text-foreground/70">Success Rate</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Investment Readiness */}
        <Card className="p-6 bg-gradient-to-r from-main/10 to-main/5 border-main">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-main rounded-full">
              <Target className="w-6 h-6 text-main-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">Your Investment Readiness Score</h3>
              <div className="flex items-center gap-4 mb-3">
                <div className="text-4xl font-bold text-main">72/100</div>
                <div className="flex-1">
                  <p className="text-sm text-foreground/70 mb-2">Good! You&apos;re ready to approach investors.</p>
                  <div className="flex gap-2">
                    <Badge variant="neutral" className="text-xs">Business Plan ✓</Badge>
                    <Badge variant="neutral" className="text-xs">Financial Projections ✓</Badge>
                    <Badge className="text-xs">Pitch Deck Needed</Badge>
                  </div>
                </div>
              </div>
              <Button size="sm">Improve Score</Button>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="investors">
          <TabsList className="grid w-full md:w-[300px] grid-cols-2">
            <TabsTrigger value="investors">Investors</TabsTrigger>
            <TabsTrigger value="ngos">NGOs</TabsTrigger>
          </TabsList>

          <TabsContent value="investors" className="space-y-4 mt-6">
            {INVESTORS.map((investor, idx) => (
              <motion.div
                key={investor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 hover:border-main transition-colors">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-main/10 text-main text-xl">
                        {investor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{investor.name}</h3>
                          <Badge variant="neutral">{investor.type}</Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-main">{investor.matchScore}%</div>
                          <div className="text-xs text-foreground/70">Match</div>
                        </div>
                      </div>

                      <p className="text-sm text-foreground/70 mb-3">{investor.description}</p>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-foreground/70 mb-1">Investment Range</p>
                          <p className="font-semibold">{investor.investment}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/70 mb-1">Portfolio</p>
                          <p className="font-semibold">{investor.portfolio} companies</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs text-foreground/70 mb-2">Focus Areas</p>
                        <div className="flex flex-wrap gap-2">
                          {investor.focus.map((area, i) => (
                            <Badge key={i} variant="neutral">{area}</Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Request Meeting
                        </Button>
                        <Button variant="neutral">View Details</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="ngos" className="space-y-4 mt-6">
            {NGOS.map((ngo, idx) => (
              <motion.div
                key={ngo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 hover:border-main transition-colors">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-main/10 text-main text-xl">
                        {ngo.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{ngo.name}</h3>
                          <Badge variant="neutral">{ngo.type}</Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-main">{ngo.matchScore}%</div>
                          <div className="text-xs text-foreground/70">Match</div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-foreground/70 mb-1">Reach</p>
                          <p className="font-semibold">{ngo.reach}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/70 mb-1">Location</p>
                          <p className="font-semibold">{ngo.location}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs text-foreground/70 mb-2">Services Offered</p>
                        <div className="flex flex-wrap gap-2">
                          {ngo.services.map((service, i) => (
                            <Badge key={i} variant="neutral">{service}</Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Connect
                        </Button>
                        <Button variant="neutral">Learn More</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
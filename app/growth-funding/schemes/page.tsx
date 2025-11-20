'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Landmark, CheckCircle2, Clock, FileText, TrendingUp, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const SCHEMES = [
  {
    id: 1,
    name: 'MUDRA Loan - Shishu',
    provider: 'Government of India',
    amount: 'Up to ₹50,000',
    eligible: true,
    applied: false,
    category: 'Loan',
    eligibility: 95,
    description: 'Micro-credit for starting small businesses',
    benefits: ['No collateral', 'Low interest', 'Easy process'],
    deadline: 'Rolling basis'
  },
  {
    id: 2,
    name: 'Stand-Up India',
    provider: 'Government of India',
    amount: '₹10 Lakh - ₹1 Crore',
    eligible: true,
    applied: true,
    category: 'Loan',
    eligibility: 88,
    description: 'Loans for SC/ST and women entrepreneurs',
    benefits: ['Manufacturing/Services', 'Greenfield projects', 'Handholding support'],
    deadline: 'Open',
    status: 'Under Review'
  },
  {
    id: 3,
    name: 'PMEGP',
    provider: 'Ministry of MSME',
    amount: 'Up to ₹25 Lakh',
    eligible: true,
    applied: false,
    category: 'Subsidy',
    eligibility: 82,
    description: 'Prime Minister Employment Generation Programme',
    benefits: ['15-35% subsidy', 'Manufacturing & Services', 'Training support'],
    deadline: 'March 2025'
  },
  {
    id: 4,
    name: 'Startup India',
    provider: 'DPIIT',
    amount: 'Tax benefits + Funding',
    eligible: false,
    applied: false,
    category: 'Support',
    eligibility: 45,
    description: 'Recognition and benefits for startups',
    benefits: ['Tax exemption', 'IPR support', 'Networking'],
    deadline: 'Open',
    reason: 'Business must be registered as Pvt Ltd'
  },
]

export default function SchemesPage() {
  const [filter, setFilter] = useState('all')

  const filteredSchemes = SCHEMES.filter(scheme => 
    filter === 'all' ? true :
    filter === 'eligible' ? scheme.eligible :
    filter === 'applied' ? scheme.applied : true
  )

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-main/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-chart-4/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            <Landmark className="w-8 h-8 text-main" />
            Government Schemes
          </h1>
          <p className="text-foreground/70 mt-2">Find and apply for funding schemes automatically</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-main/10 rounded-lg">
                <Landmark className="w-5 h-5 text-main" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-foreground/70">Total Schemes</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-2/10 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-foreground/70">Eligible</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-3/10 rounded-lg">
                <Clock className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-foreground/70">Applied</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-4/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-sm text-foreground/70">Success Rate</p>
              </div>
            </div>
          </Card>
        </div>

        {/* AI Recommendation */}
        <Card className="p-6 bg-gradient-to-r from-main/10 to-main/5 border-main">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-main rounded-full">
              <TrendingUp className="w-6 h-6 text-main-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">AI Recommendation</h3>
              <p className="text-sm text-foreground/70 mb-3">
                Based on your profile, you have a 95% eligibility for MUDRA Loan. This can provide up to ₹50,000 with no collateral required. We recommend applying immediately!
              </p>
              <Button size="sm">Apply Now</Button>
            </div>
          </div>
        </Card>

        {/* Filters */}
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList className="grid w-full md:w-[400px] grid-cols-3">
            <TabsTrigger value="all">All Schemes</TabsTrigger>
            <TabsTrigger value="eligible">Eligible</TabsTrigger>
            <TabsTrigger value="applied">Applied</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Schemes List */}
        <div className="space-y-4">
          {filteredSchemes.map((scheme, idx) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className={`p-6 ${
                scheme.eligible ? 'hover:border-main' : 'opacity-75'
              } transition-colors`}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold">{scheme.name}</h3>
                        {scheme.eligible ? (
                          <Badge className="bg-chart-2">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Eligible
                          </Badge>
                        ) : (
                          <Badge variant="neutral">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Not Eligible
                          </Badge>
                        )}
                        {scheme.applied && (
                          <Badge variant="neutral">
                            <Clock className="w-3 h-3 mr-1" />
                            {scheme.status}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-foreground/70 mb-1">{scheme.provider}</p>
                      <Badge variant="neutral">{scheme.category}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-main">{scheme.amount}</p>
                    </div>
                  </div>

                  <p className="text-sm">{scheme.description}</p>

                  {scheme.eligible && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/70">Eligibility Match</span>
                        <span className="font-medium">{scheme.eligibility}%</span>
                      </div>
                      <Progress value={scheme.eligibility} className="h-2" />
                    </div>
                  )}

                  {!scheme.eligible && scheme.reason && (
                    <div className="flex items-start gap-2 p-3 bg-chart-4/10 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-chart-4 mt-0.5" />
                      <p className="text-sm text-foreground/70">{scheme.reason}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {scheme.benefits.map((benefit, i) => (
                      <Badge key={i} variant="neutral" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="text-sm text-foreground/70">
                      Deadline: {scheme.deadline}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="neutral" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                      {scheme.eligible && !scheme.applied && (
                        <Button size="sm">
                          Apply Now
                        </Button>
                      )}
                      {scheme.applied && (
                        <Button size="sm" variant="neutral">
                          Track Application
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
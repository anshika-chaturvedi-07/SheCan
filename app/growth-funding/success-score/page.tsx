'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Target, TrendingUp, AlertCircle, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const SCORE_FACTORS = [
  { name: 'Business Model', score: 85, max: 100, status: 'good' },
  { name: 'Market Opportunity', score: 78, max: 100, status: 'good' },
  { name: 'Financial Health', score: 65, max: 100, status: 'medium' },
  { name: 'Team & Skills', score: 72, max: 100, status: 'good' },
  { name: 'Customer Traction', score: 45, max: 100, status: 'low' },
  { name: 'Scalability', score: 58, max: 100, status: 'medium' },
]

const RECOMMENDATIONS = [
  {
    priority: 'High',
    title: 'Improve Customer Traction',
    description: 'Focus on acquiring more customers. Target: 100 customers in next 3 months',
    impact: '+15 points',
    actions: ['Launch referral program', 'Increase social media presence', 'Offer first-time discounts']
  },
  {
    priority: 'Medium',
    title: 'Strengthen Financial Position',
    description: 'Improve profit margins and cash flow management',
    impact: '+10 points',
    actions: ['Optimize pricing strategy', 'Reduce operational costs', 'Implement better inventory management']
  },
  {
    priority: 'Medium',
    title: 'Enhance Scalability',
    description: 'Build systems and processes for growth',
    impact: '+12 points',
    actions: ['Automate order processing', 'Expand to ONDC', 'Build supplier network']
  },
]

const MILESTONES = [
  { title: 'First Sale', completed: true, date: 'Oct 2024' },
  { title: '10 Customers', completed: true, date: 'Nov 2024' },
  { title: '50 Customers', completed: false, target: 'Jan 2025' },
  { title: '₹1L Revenue', completed: false, target: 'Feb 2025' },
  { title: 'Break Even', completed: false, target: 'Mar 2025' },
]

export default function SuccessScorePage() {
  const overallScore = 67
  const scoreColor = overallScore >= 70 ? 'text-chart-2' : overallScore >= 50 ? 'text-chart-3' : 'text-chart-4'

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            <Target className="w-8 h-8 text-main" />
            Business Success Score
          </h1>
          <p className="text-foreground/70 mt-2">AI-powered analysis of your business potential</p>
        </div>

        {/* Overall Score */}
        <Card className="p-8 bg-gradient-to-r from-main/10 to-main/5 border-main">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-40 h-40 rounded-full border-8 border-main/20 flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-5xl font-bold ${scoreColor}`}>{overallScore}</div>
                  <div className="text-sm text-foreground/70">out of 100</div>
                </div>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">Good Progress!</h2>
              <p className="text-foreground/70 mb-4">
                Your business shows strong potential. Focus on customer acquisition and financial management to reach the next level.
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge className="bg-chart-2">Strong Business Model</Badge>
                <Badge className="bg-chart-3">Growing Market</Badge>
                <Badge variant="neutral">Needs More Customers</Badge>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Score Breakdown */}
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-main" />
                Score Breakdown
              </h3>
              <div className="space-y-4">
                {SCORE_FACTORS.map((factor, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{factor.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{factor.score}/{factor.max}</span>
                        {factor.status === 'good' && <CheckCircle2 className="w-4 h-4 text-chart-2" />}
                        {factor.status === 'medium' && <AlertCircle className="w-4 h-4 text-chart-3" />}
                        {factor.status === 'low' && <AlertCircle className="w-4 h-4 text-chart-4" />}
                      </div>
                    </div>
                    <Progress value={factor.score} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-main" />
                AI Recommendations
              </h3>
              <div className="space-y-4">
                {RECOMMENDATIONS.map((rec, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 border border-border rounded-lg hover:border-main transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{rec.title}</h4>
                          <Badge variant={rec.priority === 'High' ? 'default' : 'neutral'} className="text-xs">
                            {rec.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground/70">{rec.description}</p>
                      </div>
                      <Badge className="bg-chart-2 whitespace-nowrap">{rec.impact}</Badge>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-foreground/70 mb-2">Action Steps:</p>
                      <ul className="space-y-1">
                        {rec.actions.map((action, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <ArrowRight className="w-3 h-3 text-main" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Milestones */}
            <Card className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-main" />
                Milestones
              </h3>
              <div className="space-y-3">
                {MILESTONES.map((milestone, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center ${
                      milestone.completed ? 'bg-chart-2' : 'bg-foreground/10'
                    }`}>
                      {milestone.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        milestone.completed ? 'text-foreground' : 'text-foreground/70'
                      }`}>
                        {milestone.title}
                      </p>
                      <p className="text-xs text-foreground/50">
                        {milestone.completed ? milestone.date : `Target: ${milestone.target}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-bold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full" size="sm">
                  Generate Report
                </Button>
                <Button className="w-full" size="sm" variant="neutral">
                  Share with Mentor
                </Button>
                <Button className="w-full" size="sm" variant="neutral">
                  Compare with Peers
                </Button>
              </div>
            </Card>

            {/* Next Review */}
            <Card className="p-6 bg-main/5">
              <h3 className="font-bold mb-2">Next Review</h3>
              <p className="text-sm text-foreground/70 mb-3">
                Your score will be updated automatically in 7 days based on your progress.
              </p>
              <Button size="sm" variant="neutral" className="w-full">
                Request Early Review
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
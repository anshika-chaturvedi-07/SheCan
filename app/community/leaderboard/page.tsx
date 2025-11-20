'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Trophy, TrendingUp, Award, Star, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const LEADERBOARD_DATA = [
  { rank: 1, name: 'Kavita Singh', points: 2450, level: 12, badges: 15, streak: 45, city: 'Mumbai', badge: '🏆' },
  { rank: 2, name: 'Sunita Verma', points: 2180, level: 11, badges: 13, streak: 38, city: 'Delhi', badge: '🥈' },
  { rank: 3, name: 'Rekha Nair', points: 1950, level: 10, badges: 12, streak: 32, city: 'Bangalore', badge: '🥉' },
  { rank: 4, name: 'Pooja Gupta', points: 1720, level: 9, badges: 10, streak: 28, city: 'Pune', badge: '⭐' },
  { rank: 5, name: 'Neha Joshi', points: 1580, level: 9, badges: 9, streak: 25, city: 'Hyderabad', badge: '⭐' },
  { rank: 6, name: 'Priya Sharma', points: 1420, level: 8, badges: 8, streak: 22, city: 'Chennai', badge: '⭐' },
  { rank: 7, name: 'Anjali Patel', points: 1280, level: 8, badges: 7, streak: 20, city: 'Ahmedabad', badge: '⭐' },
  { rank: 8, name: 'Meera Reddy', points: 1150, level: 7, badges: 6, streak: 18, city: 'Kolkata', badge: '⭐' },
]

const TOP_ACHIEVERS = [
  { name: 'Kavita Singh', achievement: 'Most Courses Completed', value: '24 courses', icon: Award },
  { name: 'Sunita Verma', achievement: 'Longest Streak', value: '45 days', icon: Zap },
  { name: 'Rekha Nair', achievement: 'Most Community Helpful', value: '156 answers', icon: Star },
]

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            <Trophy className="w-8 h-8 text-main" />
            Leaderboard
          </h1>
          <p className="text-foreground/70 mt-2">Top performers in the SheCan community</p>
        </div>

        {/* Your Rank */}
        <Card className="p-6 bg-gradient-to-r from-main/10 to-main/5 border-main">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-main rounded-full">
                <Trophy className="w-6 h-6 text-main-foreground" />
              </div>
              <div>
                <p className="text-sm text-foreground/70">Your Rank</p>
                <p className="text-3xl font-bold">#42</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-foreground/70">Your Points</p>
              <p className="text-3xl font-bold text-main">850</p>
            </div>
          </div>
        </Card>

        {/* Top Achievers */}
        <div>
          <h2 className="text-xl font-bold mb-4">Top Achievers</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {TOP_ACHIEVERS.map((achiever, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6">
                  <achiever.icon className="w-8 h-8 text-main mb-3" />
                  <h3 className="font-semibold mb-1">{achiever.name}</h3>
                  <p className="text-sm text-foreground/70 mb-2">{achiever.achievement}</p>
                  <Badge variant="neutral">{achiever.value}</Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leaderboard Table */}
        <Card className="p-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full md:w-[400px] grid-cols-3 mb-6">
              <TabsTrigger value="all">All Time</TabsTrigger>
              <TabsTrigger value="monthly">This Month</TabsTrigger>
              <TabsTrigger value="weekly">This Week</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3">
              {LEADERBOARD_DATA.map((user, idx) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                    user.rank <= 3 ? 'bg-main/5 border border-main/20' : 'hover:bg-secondary-background'
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl w-12 text-center">{user.badge}</span>
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-main/10 text-main font-semibold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">{user.name}</p>
                        <Badge variant="neutral" className="text-xs">Level {user.level}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-foreground/70">
                        <span>{user.city}</span>
                        <span className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          {user.badges} badges
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          {user.streak} day streak
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-main">{user.points}</p>
                    <p className="text-xs text-foreground/70">points</p>
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="monthly" className="space-y-3">
              {LEADERBOARD_DATA.slice(0, 5).map((user, idx) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-secondary-background transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{user.badge}</span>
                    <Avatar>
                      <AvatarFallback className="bg-main/10 text-main">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-foreground/70">{user.city}</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-main">{Math.floor(user.points * 0.3)}</p>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="weekly" className="space-y-3">
              {LEADERBOARD_DATA.slice(0, 5).map((user, idx) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-secondary-background transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{user.badge}</span>
                    <Avatar>
                      <AvatarFallback className="bg-main/10 text-main">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-foreground/70">{user.city}</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-main">{Math.floor(user.points * 0.1)}</p>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
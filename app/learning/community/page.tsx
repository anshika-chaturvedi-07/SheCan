'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Users, MessageSquare, Heart, Share2, TrendingUp, Award, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

const POSTS = [
  {
    id: 1,
    author: 'Priya Sharma',
    role: 'Handicraft Entrepreneur',
    time: '2 hours ago',
    content: 'Just launched my ONDC store! Got 15 orders in the first week. SheCan made it so easy. Thank you!',
    likes: 45,
    comments: 12,
    category: 'Success Story'
  },
  {
    id: 2,
    author: 'Anjali Patel',
    role: 'Food Business Owner',
    time: '5 hours ago',
    content: 'Looking for packaging suppliers in Mumbai. Any recommendations for eco-friendly options?',
    likes: 23,
    comments: 8,
    category: 'Question'
  },
  {
    id: 3,
    author: 'Meera Reddy',
    role: 'Fashion Designer',
    time: '1 day ago',
    content: 'Completed the Digital Marketing course! The Instagram strategies really work. My engagement is up 200%!',
    likes: 67,
    comments: 15,
    category: 'Achievement'
  },
]

const EVENTS = [
  {
    id: 1,
    title: 'Women Entrepreneurs Meetup',
    date: 'Dec 15, 2024',
    location: 'Mumbai',
    attendees: 45,
    type: 'Networking'
  },
  {
    id: 2,
    title: 'Digital Marketing Workshop',
    date: 'Dec 20, 2024',
    location: 'Online',
    attendees: 120,
    type: 'Workshop'
  },
]

const LEADERBOARD = [
  { rank: 1, name: 'Kavita Singh', points: 2450, color: 'text-yellow-500' },
  { rank: 2, name: 'Sunita Verma', points: 2180, color: 'text-gray-400' },
  { rank: 3, name: 'Rekha Nair', points: 1950, color: 'text-orange-600' },
  { rank: 4, name: 'Pooja Gupta', points: 1720, color: 'text-main' },
  { rank: 5, name: 'Neha Joshi', points: 1580, color: 'text-main' },
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('feed')

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-main/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-chart-2/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            <Users className="w-8 h-8 text-main" />
            Community Hub
          </h1>
          <p className="text-foreground/70 mt-2">Connect, learn, and grow together</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-main/10 rounded-lg">
                <Users className="w-5 h-5 text-main" />
              </div>
              <div>
                <p className="text-2xl font-bold">12.5K</p>
                <p className="text-sm text-foreground/70">Members</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-2/10 rounded-lg">
                <MessageSquare className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold">3.2K</p>
                <p className="text-sm text-foreground/70">Discussions</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-3/10 rounded-lg">
                <Calendar className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-foreground/70">Events</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-4/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">850</p>
                <p className="text-sm text-foreground/70">Your Points</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="space-y-4 mt-6">
                {POSTS.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{post.author}</h4>
                              <p className="text-sm text-foreground/70">{post.role}</p>
                            </div>
                            <Badge variant="neutral">{post.category}</Badge>
                          </div>
                          <p className="text-sm mb-3">{post.content}</p>
                          <div className="flex items-center gap-4 text-sm text-foreground/70">
                            <span>{post.time}</span>
                            <button className="flex items-center gap-1 hover:text-main transition-colors">
                              <Heart className="w-4 h-4" />
                              {post.likes}
                            </button>
                            <button className="flex items-center gap-1 hover:text-main transition-colors">
                              <MessageSquare className="w-4 h-4" />
                              {post.comments}
                            </button>
                            <button className="flex items-center gap-1 hover:text-main transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="events" className="space-y-4 mt-6">
                {EVENTS.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-lg mb-1">{event.title}</h4>
                          <div className="flex items-center gap-3 text-sm text-foreground/70">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {event.date}
                            </span>
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <Badge>{event.type}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground/70">
                          <Users className="w-4 h-4 inline mr-1" />
                          {event.attendees} attending
                        </span>
                        <Button size="sm">Register</Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="leaderboard" className="mt-6">
                <Card className="p-6">
                  <div className="space-y-4">
                    {LEADERBOARD.map((user, idx) => (
                      <motion.div
                        key={user.rank}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary-background transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${user.color} bg-${user.color}/10`}>
                            {user.rank}
                          </div>
                          <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-foreground/70">Rank #{user.rank}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-main">{user.points}</p>
                          <p className="text-xs text-foreground/70">points</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-main" />
                Your Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    First Sale
                  </span>
                  <Badge variant="neutral">Unlocked</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-500" />
                    Course Master
                  </span>
                  <Badge variant="neutral">Unlocked</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-green-500" />
                    Community Helper
                  </span>
                  <Badge>In Progress</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Trending Topics</h3>
              <div className="space-y-2">
                <Badge variant="neutral" className="mr-2">#DigitalMarketing</Badge>
                <Badge variant="neutral" className="mr-2">#ONDCSuccess</Badge>
                <Badge variant="neutral" className="mr-2">#Packaging</Badge>
                <Badge variant="neutral" className="mr-2">#Pricing</Badge>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
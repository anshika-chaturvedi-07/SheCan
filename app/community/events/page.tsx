'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, MapPin, Users, Clock, Video, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const EVENTS = [
  {
    id: 1,
    title: 'Women Entrepreneurs Networking Meetup',
    date: 'Dec 15, 2024',
    time: '10:00 AM - 2:00 PM',
    location: 'Mumbai, Maharashtra',
    type: 'In-Person',
    category: 'Networking',
    attendees: 45,
    maxAttendees: 50,
    description: 'Connect with fellow women entrepreneurs, share experiences, and build lasting partnerships.',
    registered: false
  },
  {
    id: 2,
    title: 'Digital Marketing Masterclass',
    date: 'Dec 20, 2024',
    time: '6:00 PM - 8:00 PM',
    location: 'Online',
    type: 'Virtual',
    category: 'Workshop',
    attendees: 120,
    maxAttendees: 200,
    description: 'Learn advanced Instagram and Facebook marketing strategies from industry experts.',
    registered: true
  },
  {
    id: 3,
    title: 'Financial Planning for Small Business',
    date: 'Dec 22, 2024',
    time: '4:00 PM - 6:00 PM',
    location: 'Delhi NCR',
    type: 'In-Person',
    category: 'Workshop',
    attendees: 32,
    maxAttendees: 40,
    description: 'Master budgeting, cash flow management, and financial forecasting for your business.',
    registered: false
  },
  {
    id: 4,
    title: 'ONDC Seller Success Stories',
    date: 'Dec 25, 2024',
    time: '3:00 PM - 5:00 PM',
    location: 'Online',
    type: 'Virtual',
    category: 'Webinar',
    attendees: 89,
    maxAttendees: 150,
    description: 'Hear from successful ONDC sellers and learn how to scale your online business.',
    registered: false
  },
]

export default function EventsPage() {
  const [filter, setFilter] = useState('all')

  const filteredEvents = EVENTS.filter(event => 
    filter === 'all' ? true :
    filter === 'registered' ? event.registered :
    filter === 'virtual' ? event.type === 'Virtual' :
    filter === 'in-person' ? event.type === 'In-Person' : true
  )

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            <Calendar className="w-8 h-8 text-main" />
            Community Events
          </h1>
          <p className="text-foreground/70 mt-2">Join workshops, webinars, and networking events</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-main/10 rounded-lg">
                <Calendar className="w-5 h-5 text-main" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-foreground/70">Total Events</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-2/10 rounded-lg">
                <Users className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-foreground/70">Registered</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-3/10 rounded-lg">
                <Video className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-foreground/70">Virtual</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-4/10 rounded-lg">
                <MapPin className="w-5 h-5 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-foreground/70">In-Person</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList className="grid w-full md:w-[500px] grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="registered">Registered</TabsTrigger>
            <TabsTrigger value="virtual">Virtual</TabsTrigger>
            <TabsTrigger value="in-person">In-Person</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-6 hover:border-main transition-colors">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant={event.type === 'Virtual' ? 'default' : 'neutral'}>
                          {event.type === 'Virtual' ? <Video className="w-3 h-3 mr-1" /> : <MapPin className="w-3 h-3 mr-1" />}
                          {event.type}
                        </Badge>
                        <Badge variant="neutral">{event.category}</Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/70">{event.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-foreground/70">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-foreground/70">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-foreground/70">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-foreground/70">
                      <Users className="w-4 h-4" />
                      {event.attendees}/{event.maxAttendees} attending
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    variant={event.registered ? 'neutral' : 'neutral'}
                  >
                    {event.registered ? 'Registered ✓' : 'Register Now'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Mic, MicOff, Send, Volume2, VolumeX, Sparkles, MessageSquare, BookOpen, TrendingUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { EmotionalCanvas } from '@/components/emotional-canvas'
import Image from 'next/image'

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'mr', name: 'मराठी' },
  { code: 'bn', name: 'বাংলা' },
]

const QUICK_TOPICS = [
  { icon: TrendingUp, label: 'Business Ideas', query: 'Suggest profitable business ideas for me' },
  { icon: BookOpen, label: 'Marketing Tips', query: 'How can I market my business effectively?' },
  { icon: MessageSquare, label: 'Customer Service', query: 'Best practices for customer service' },
  { icon: Sparkles, label: 'Pricing Strategy', query: 'How should I price my products?' },
]

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AiMentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Namaste! I am Suno Sathi, your AI business mentor. How can I help you grow your business today?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [language, setLanguage] = useState('en')
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentEmotion, setCurrentEmotion] = useState('calm')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const messageId = crypto.randomUUID()
    const userMessage: Message = {
      id: messageId,
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const userInput = input
    setInput('')
    setIsLoading(true)

    // Detect emotion from input
    const lowerInput = userInput.toLowerCase()
    if (lowerInput.includes('happy') || lowerInput.includes('excited') || lowerInput.includes('great')) {
      setCurrentEmotion('happy')
    } else if (lowerInput.includes('help') || lowerInput.includes('problem') || lowerInput.includes('difficult')) {
      setCurrentEmotion('focused')
    } else if (lowerInput.includes('thank') || lowerInput.includes('good')) {
      setCurrentEmotion('calm')
    } else {
      setCurrentEmotion('focused')
    }

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: generateAIResponse(userInput),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()
    if (lowerQuery.includes('business idea') || lowerQuery.includes('start')) {
      return 'Based on your skills and location, I recommend starting with: 1) Home-based catering service - Low investment, high demand. 2) Handicraft online store - Leverage ONDC marketplace. 3) Tutoring services - Use your expertise. Would you like detailed guidance on any of these?'
    } else if (lowerQuery.includes('market') || lowerQuery.includes('customer')) {
      return 'For effective marketing: 1) Use WhatsApp Business for direct customer engagement. 2) Create Instagram reels showcasing your products. 3) Join local SHG networks for word-of-mouth. 4) Offer first-time customer discounts. Shall I help you create a marketing plan?'
    } else if (lowerQuery.includes('price') || lowerQuery.includes('cost')) {
      return 'Pricing strategy tips: 1) Calculate all costs (materials + time + overhead). 2) Research competitor prices in your area. 3) Add 30-40% profit margin. 4) Consider psychological pricing (₹99 vs ₹100). Would you like me to analyze pricing for your specific product?'
    }
    return 'That\'s a great question! I can help you with business planning, marketing strategies, financial management, and growth tactics. Could you provide more details about your specific situation?'
  }

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setIsRecording(false)
        setInput('How can I increase my sales?')
      }, 2000)
    }
  }

  const handleQuickTopic = (query: string) => {
    setInput(query)
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-main/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-chart-2/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-chart-3/5 rounded-full blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-main/10 via-chart-2/10 to-chart-3/10 border border-main/20 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 w-48 h-48 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&q=80"
              alt="AI Mentor"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-main" />
              Suno Sathi - AI Mentor
            </h1>
            <p className="text-foreground/70 mt-2">Your 24/7 business advisor in your language</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="neutral" className="text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Online
            </Badge>
          </div>
        </div>

        {/* Quick Topics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {QUICK_TOPICS.map((topic, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className="p-4 cursor-pointer hover:border-main transition-all hover:shadow-lg hover:shadow-main/20 bg-gradient-to-br from-background to-secondary-background"
                onClick={() => handleQuickTopic(topic.query)}
              >
                <div className="p-2 bg-main/10 rounded-lg w-fit mb-2">
                  <topic.icon className="w-6 h-6 text-main" />
                </div>
                <p className="text-sm font-medium">{topic.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Chat Interface with Emotional Background */}
        <Card className="h-[500px] flex flex-col relative overflow-hidden shadow-xl">
          {/* Emotional Canvas Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <EmotionalCanvas emotion={currentEmotion} />
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-main/5 via-transparent to-chart-2/5 pointer-events-none" />
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-main text-main-foreground'
                        : 'bg-secondary-background border border-border'
                    }`}
                  >
                    <p className="text-sm md:text-base">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-secondary-background border border-border rounded-lg p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-main rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-main rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-main rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4 relative z-10 bg-background/80 backdrop-blur-sm">
            <div className="flex gap-2">
              <Button
                variant={isRecording ? 'default' : 'neutral'}
                size="icon"
                onClick={handleVoiceToggle}
                className={isRecording ? 'animate-pulse' : ''}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about your business..."
                className="flex-1"
                disabled={isRecording}
              />
              <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading}>
                <Send className="w-5 h-5" />
              </Button>
            </div>
            {isRecording && (
              <p className="text-sm text-main mt-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-main rounded-full animate-pulse" />
                Listening...
              </p>
            )}
          </div>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4">
            <Volume2 className="w-8 h-8 text-main mb-2" />
            <h3 className="font-semibold mb-1">Voice Support</h3>
            <p className="text-sm text-foreground/70">Speak in your language, get instant voice responses</p>
          </Card>
          <Card className="p-4">
            <MessageSquare className="w-8 h-8 text-main mb-2" />
            <h3 className="font-semibold mb-1">24/7 Available</h3>
            <p className="text-sm text-foreground/70">Get business advice anytime, anywhere</p>
          </Card>
          <Card className="p-4">
            <Sparkles className="w-8 h-8 text-main mb-2" />
            <h3 className="font-semibold mb-1">Personalized Guidance</h3>
            <p className="text-sm text-foreground/70">AI learns your business and provides tailored advice</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState, useRef, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || data.message || 'I encountered an issue processing your request.',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('[v0] Error sending message:', error)
      
      // Mock responses for demo
      const mockResponses: Record<string, string> = {
        'career': 'Based on your profile, I recommend focusing on system design and distributed systems. Your strong foundation in algorithms and web development positions you well for senior roles.',
        'skill': 'Your LeetCode progress is impressive! I suggest practicing more medium-level problems in graph algorithms and dynamic programming to strengthen weak areas.',
        'interview': 'For your upcoming interviews, prepare behavioral questions and practice system design. I recommend studying microservices architecture and scaling patterns.',
        'doubt': 'Feel free to explain what concept you\'re struggling with. I can help break it down into simpler parts or provide relevant resources.',
        'default': 'That\'s a great question! Based on my analysis of successful candidates, here are my recommendations for your career development.'
      }

      let response = mockResponses.default
      const inputLower = input.toLowerCase()
      if (inputLower.includes('career')) response = mockResponses.career
      else if (inputLower.includes('skill')) response = mockResponses.skill
      else if (inputLower.includes('interview')) response = mockResponses.interview
      else if (inputLower.includes('doubt') || inputLower.includes('help')) response = mockResponses.doubt

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-12">
        <div className="space-y-6 flex-1 flex flex-col">
          <div>
            <h1 className="text-4xl font-bold mb-2">AI Career & Learning Support</h1>
            <p className="text-muted-foreground">Get personalized guidance, resume tips, interview prep, and career advice powered by AI</p>
          </div>

          {/* Chat Area */}
          <Card className="bg-card/50 border-border/40 flex-1 p-6 flex flex-col overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-6">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="text-5xl mb-4">🤖</div>
                  <h2 className="text-xl font-semibold mb-2">Hello! I'm your AI Assistant</h2>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Ask me about career guidance, interview preparation, resume tips, or help with technical concepts.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                    <Button
                      variant="outline"
                      onClick={() => setInput('What career path should I pursue based on my skills?')}
                      className="justify-start text-left h-auto whitespace-normal"
                    >
                      Career Guidance
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setInput('How can I improve my resume for tech roles?')}
                      className="justify-start text-left h-auto whitespace-normal"
                    >
                      Resume Tips
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setInput('What should I prepare for my technical interviews?')}
                      className="justify-start text-left h-auto whitespace-normal"
                    >
                      Interview Prep
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setInput('Help me understand distributed systems')}
                      className="justify-start text-left h-auto whitespace-normal"
                    >
                      Doubt Clearing
                    </Button>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-accent text-white rounded-br-none'
                          : 'bg-muted text-foreground rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground px-4 py-3 rounded-lg rounded-bl-none">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border/40 pt-4 space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder="Ask me anything about your career or learning..."
                  className="flex-1 bg-background border border-border/40 rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  disabled={loading}
                />
                <Button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="bg-accent hover:bg-blue-600 text-white"
                >
                  Send
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">Powered by Google Gemini AI</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

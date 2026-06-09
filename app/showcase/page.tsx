'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import Link from 'next/link'

export default function Showcase() {
  const features = [
    {
      title: 'Student Dashboard',
      description: 'Personalized skill assessment and learning recommendations',
      url: '/student',
      icon: '👨‍🎓',
      tags: ['Skills', 'Learning', 'Placement']
    },
    {
      title: 'Instructor Analytics',
      description: 'Cohort metrics, performance tracking, skill distribution',
      url: '/instructor',
      icon: '📊',
      tags: ['Analytics', 'Metrics', 'Performance']
    },
    {
      title: 'Candidate Rankings',
      description: 'AI-powered ranking with explainable scores and skill matching',
      url: '/rankings',
      icon: '🏆',
      tags: ['Ranking', 'AI', 'Matching']
    },
    {
      title: 'AI Career Chat',
      description: 'Real-time guidance for interviews, resumes, and career paths',
      url: '/ai-chat',
      icon: '🤖',
      tags: ['AI', 'Support', 'Guidance']
    }
  ]

  const apiEndpoints = [
    {
      method: 'GET',
      path: '/api/student',
      description: 'Individual student profile'
    },
    {
      method: 'GET',
      path: '/api/students',
      description: 'All students list'
    },
    {
      method: 'GET',
      path: '/api/jobs',
      description: 'Available job postings'
    },
    {
      method: 'GET',
      path: '/api/rankings',
      description: 'Ranked candidates for a job'
    },
    {
      method: 'GET',
      path: '/api/instructor/metrics',
      description: 'Cohort statistics'
    },
    {
      method: 'GET',
      path: '/api/instructor/students',
      description: 'Student performance data'
    },
    {
      method: 'POST',
      path: '/api/ai-chat',
      description: 'AI career guidance responses'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Platform Features Showcase
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete Smart AI-Driven Student Skill & Placement Support Platform
          </p>
        </div>

        {/* Main Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Main Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="bg-card/50 border-border/40 p-8 hover:bg-card/70 transition group">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <div className="flex gap-2 mb-4">
                      {feature.tags.map((tag, j) => (
                        <span key={j} className="px-2 py-1 bg-accent/20 text-accent rounded text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link href={feature.url}>
                      <Button className="w-full bg-accent hover:bg-blue-600">
                        Open {feature.title}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* API Endpoints */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Working API Endpoints</h2>
          <div className="grid grid-cols-1 gap-3">
            {apiEndpoints.map((endpoint, i) => (
              <Card key={i} className="bg-card/50 border-border/40 p-4">
                <div className="flex items-center gap-4">
                  <div className={`px-4 py-2 rounded font-bold text-white ${
                    endpoint.method === 'GET' ? 'bg-green-600' : 'bg-blue-600'
                  }`}>
                    {endpoint.method}
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-accent text-lg">{endpoint.path}</div>
                    <div className="text-sm text-muted-foreground">{endpoint.description}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Platform Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Pages', value: '7', icon: '📄' },
              { label: 'API Endpoints', value: '7', icon: '🔌' },
              { label: 'Sample Students', value: '3', icon: '👥' },
              { label: 'Sample Jobs', value: '3', icon: '💼' }
            ].map((stat, i) => (
              <Card key={i} className="bg-card/50 border-border/40 p-6 text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-accent">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Tech Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Frontend',
                items: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'shadcn/ui']
              },
              {
                title: 'Design',
                items: ['Dark Theme', 'Responsive', 'Accessible', 'Professional', 'Animations']
              },
              {
                title: 'Features',
                items: ['Mock Data', 'AI Ready', 'Real-time', 'Zero Database', 'Stateless']
              }
            ].map((tech, i) => (
              <Card key={i} className="bg-card/50 border-border/40 p-6">
                <h3 className="text-xl font-bold mb-4">{tech.title}</h3>
                <ul className="space-y-2">
                  {tech.items.map((item, j) => (
                    <li key={j} className="text-muted-foreground flex gap-2">
                      <span className="text-accent">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-card to-card/50 border-border/40 p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Click any feature above to see the complete platform in action
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/student">
              <Button size="lg" className="bg-accent hover:bg-blue-600">
                Student Dashboard
              </Button>
            </Link>
            <Link href="/rankings">
              <Button size="lg" variant="outline" className="border-border hover:bg-card bg-transparent">
                View Rankings
              </Button>
            </Link>
            <Link href="/ai-chat">
              <Button size="lg" variant="outline" className="border-border hover:bg-card bg-transparent">
                AI Chat
              </Button>
            </Link>
          </div>
        </Card>

        {/* Documentation Links */}
        <div className="mt-16 pt-12 border-t border-border/40">
          <h2 className="text-2xl font-bold mb-6">Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'START_HERE.md', desc: '5-minute quick setup' },
              { title: 'QUICK_REFERENCE.md', desc: 'All URLs and endpoints' },
              { title: 'COMPLETE_PLATFORM_GUIDE.md', desc: 'Detailed API reference' },
              { title: 'PREVIEW_GUIDE.md', desc: 'Features and testing' }
            ].map((doc, i) => (
              <Card key={i} className="bg-card/50 border-border/40 p-4">
                <div className="font-mono text-accent">{doc.title}</div>
                <div className="text-sm text-muted-foreground">{doc.desc}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

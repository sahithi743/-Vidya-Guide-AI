'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[#0a1628] to-background">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <h1 className="text-2xl font-bold">Placement AI</h1>
          </div>
          <nav className="flex gap-6">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition">Dashboard</Link>
            <Link href="/candidates" className="text-muted-foreground hover:text-foreground transition">Candidates</Link>
            <Link href="/jobs" className="text-muted-foreground hover:text-foreground transition">Jobs</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent mb-6">
                AI-Powered Candidate Ranking
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Match candidates to jobs with precision. Our AI analyzes GitHub activity, LeetCode proficiency, and LinkedIn profiles to rank students for placements.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Key Features:</h3>
              <ul className="space-y-3">
                {[
                  "Real-time candidate ranking against job requirements",
                  "Multi-source analysis: GitHub, LeetCode, LinkedIn",
                  "AI-generated explanations for every ranking",
                  "Skill gap identification and recommendations",
                  "Instant placement readiness assessment"
                ].map((feature, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground">
                    <span className="text-accent font-bold">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 pt-4">
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-blue-600 text-white"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/candidates">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-border hover:bg-card bg-transparent"
                >
                  View Candidates
                </Button>
              </Link>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4">
            <Card className="bg-card/50 border-border/40 p-6 hover:bg-card/70 transition">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">📊</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Smart Ranking</h3>
                  <p className="text-sm text-muted-foreground">Algorithmic scoring based on 3 key indicators</p>
                </div>
              </div>
            </Card>

            <Card className="bg-card/50 border-border/40 p-6 hover:bg-card/70 transition">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🤖</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">AI Explanations</h3>
                  <p className="text-sm text-muted-foreground">Transparent insights into every ranking decision</p>
                </div>
              </div>
            </Card>

            <Card className="bg-card/50 border-border/40 p-6 hover:bg-card/70 transition">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">⚡</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Real-time Analysis</h3>
                  <p className="text-sm text-muted-foreground">Instant results with zero database overhead</p>
                </div>
              </div>
            </Card>

            <Card className="bg-card/50 border-border/40 p-6 hover:bg-card/70 transition">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">📈</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Growth Insights</h3>
                  <p className="text-sm text-muted-foreground">Personalized recommendations for improvement</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-r from-card to-card/50 border-border/40 p-12">
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-bold">Ready to Transform Placements?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start ranking candidates in seconds with AI-powered analysis
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/showcase">
                <Button size="lg" className="bg-accent hover:bg-blue-600 text-white">
                  See Full Platform
                </Button>
              </Link>
              <Link href="/rankings">
                <Button size="lg" variant="outline" className="border-border hover:bg-card bg-transparent">
                  View Rankings
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2024 Placement AI. All rights reserved.</p>
            <p>Powered by Google Gemini AI</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

interface Candidate {
  id: string
  name: string
  email?: string
  college: string
  linkedin: {
    skills: string[]
    experience_years: number
  }
  github: {
    repos: number
    stars: number
    languages: string[]
  }
  leetcode: {
    problems_solved: number
  }
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/students')
        if (response.ok) {
          const data = await response.json()
          setCandidates(data)
        } else {
          throw new Error('Failed to fetch candidates')
        }
      } catch (err) {
        console.error('[v0] Error fetching candidates:', err)
        setError('Failed to load candidates')
        // Mock data
        setCandidates([
          {
            id: 'student_001',
            name: 'Rajesh Kumar',
            email: 'rajesh@example.com',
            college: 'IIT Delhi',
            linkedin: {
              skills: ['Python', 'JavaScript', 'React', 'Node.js', 'AWS'],
              experience_years: 2
            },
            github: {
              repos: 42,
              stars: 285,
              languages: ['Python', 'JavaScript', 'Java']
            },
            leetcode: {
              problems_solved: 412
            }
          },
          {
            id: 'student_002',
            name: 'Priya Sharma',
            email: 'priya@example.com',
            college: 'BITS Pilani',
            linkedin: {
              skills: ['Java', 'Python', 'Spring Boot', 'PostgreSQL'],
              experience_years: 1
            },
            github: {
              repos: 28,
              stars: 145,
              languages: ['Java', 'Python', 'C++']
            },
            leetcode: {
              problems_solved: 287
            }
          },
          {
            id: 'student_003',
            name: 'Arjun Patel',
            email: 'arjun@example.com',
            college: 'NIT Bombay',
            linkedin: {
              skills: ['Python', 'Go', 'Kubernetes', 'AWS'],
              experience_years: 4
            },
            github: {
              repos: 56,
              stars: 432,
              languages: ['Python', 'Go', 'Rust', 'JavaScript']
            },
            leetcode: {
              problems_solved: 567
            }
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchCandidates()
  }, [])

  const getExperienceLevel = (years: number) => {
    if (years === 0) return 'Fresher'
    if (years < 2) return 'Junior'
    if (years < 4) return 'Mid-level'
    return 'Senior'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[#0a1628] to-background">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">👥</span>
            </div>
            <h1 className="text-2xl font-bold">Candidates</h1>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="border-border hover:bg-card bg-transparent">
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold mb-2">All Candidates</h2>
            <p className="text-muted-foreground">Browse and analyze student profiles</p>
          </div>

          {/* Candidates Grid */}
          {loading ? (
            <Card className="bg-card/50 border-border/40 p-8">
              <div className="text-center text-muted-foreground">Loading candidates...</div>
            </Card>
          ) : error ? (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <p className="text-sm text-yellow-100">{error} - Using sample data</p>
            </div>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((candidate) => (
              <Card
                key={candidate.id}
                className="bg-card/50 border-border/40 hover:bg-card/70 transition overflow-hidden group"
              >
                {/* Card Header with experience level badge */}
                <div className="bg-gradient-to-r from-accent/20 to-primary/20 p-6 relative">
                  <div className="absolute top-4 right-4 bg-accent/30 px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-accent">
                      {getExperienceLevel(candidate.linkedin.experience_years)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition">
                      {candidate.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{candidate.college}</p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Skills */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Top Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {candidate.linkedin.skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="text-xs bg-accent/20 text-accent px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {candidate.linkedin.skills.length > 4 && (
                        <span className="text-xs text-muted-foreground px-2 py-1">
                          +{candidate.linkedin.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 py-4 border-y border-border/40">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-accent">{candidate.github.repos}</p>
                      <p className="text-xs text-muted-foreground">GitHub Repos</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-accent">{candidate.leetcode.problems_solved}</p>
                      <p className="text-xs text-muted-foreground">LC Problems</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-accent">{candidate.github.languages.length}</p>
                      <p className="text-xs text-muted-foreground">Languages</p>
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Programming Languages</p>
                    <p className="text-sm text-muted-foreground">{candidate.github.languages.join(', ')}</p>
                  </div>

                  {/* View Button */}
                  <Link href={`/candidates/${candidate.id}`}>
                    <Button variant="outline" className="w-full border-border hover:bg-background bg-transparent">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {candidates.length === 0 && !loading && (
            <Card className="bg-card/50 border-border/40 p-8">
              <div className="text-center text-muted-foreground">No candidates found</div>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

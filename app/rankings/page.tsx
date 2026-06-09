'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

interface RankingResult {
  job_id: string
  candidate_id: string
  candidate_name: string
  rank: number
  total_score: number
  component_scores: {
    github: number
    leetcode: number
    linkedin: number
  }
  explanation?: {
    summary: string
    strengths: string[]
    gaps: string[]
    recommendations: string[]
    skill_match_percentage: number
    experience_alignment: string
  }
}

interface Job {
  id: string
  title: string
  company: string
}

export default function RankingsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [selectedJobId, setSelectedJobId] = useState<string>('')
  const [rankings, setRankings] = useState<RankingResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs')
        if (response.ok) {
          const data = await response.json()
          setJobs(data)
          if (data.length > 0) {
            setSelectedJobId(data[0].id)
          }
        } else {
          // Mock data
          const mockJobs = [
            { id: 'job_001', title: 'Senior Full Stack Engineer', company: 'TechCorp' },
            { id: 'job_002', title: 'Backend Developer', company: 'DataSystems' },
            { id: 'job_003', title: 'DevOps Engineer', company: 'CloudInfra' }
          ]
          setJobs(mockJobs)
          setSelectedJobId(mockJobs[0].id)
        }
      } catch (err) {
        console.error('[v0] Error fetching jobs:', err)
      }
    }
    fetchJobs()
  }, [])

  // Fetch rankings when job changes
  useEffect(() => {
    if (!selectedJobId) return

    const fetchRankings = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`/api/rankings/generate?job_id=${selectedJobId}`)
        if (response.ok) {
          const data = await response.json()
          setRankings(data.rankings)
        } else {
          throw new Error('Failed to fetch rankings')
        }
      } catch (err) {
        console.error('[v0] Error fetching rankings:', err)
        setError('Failed to load rankings. Make sure the backend is running.')
        // Use mock rankings for demo
        setRankings([
          {
            job_id: selectedJobId,
            candidate_id: 'student_001',
            candidate_name: 'Rajesh Kumar',
            rank: 1,
            total_score: 87.5,
            component_scores: { github: 85, leetcode: 78, linkedin: 92 },
            explanation: {
              summary: 'Excellent match for this role with strong technical foundation',
              strengths: ['Python expertise', 'React experience', 'AWS knowledge'],
              gaps: ['Limited Kubernetes experience'],
              recommendations: ['Learn Kubernetes basics'],
              skill_match_percentage: 92.5,
              experience_alignment: 'Perfect alignment'
            }
          },
          {
            job_id: selectedJobId,
            candidate_id: 'student_002',
            candidate_name: 'Priya Sharma',
            rank: 2,
            total_score: 76.3,
            component_scores: { github: 72, leetcode: 82, linkedin: 75 },
            explanation: {
              summary: 'Good fit for the role with solid problem-solving skills',
              strengths: ['Java expertise', 'Backend knowledge'],
              gaps: ['Limited React experience'],
              recommendations: ['Learn React framework'],
              skill_match_percentage: 78.0,
              experience_alignment: 'Good alignment'
            }
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchRankings()
  }, [selectedJobId])

  const selectedJob = jobs.find(j => j.id === selectedJobId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[#0a1628] to-background">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">📊</span>
            </div>
            <h1 className="text-2xl font-bold">Rankings</h1>
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
          {/* Job Selector */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Job</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {jobs.map((job) => (
                <Card
                  key={job.id}
                  className={`p-4 cursor-pointer transition border-border/40 ${
                    selectedJobId === job.id
                      ? 'bg-accent/20 border-accent'
                      : 'bg-card/50 border-border/40 hover:bg-card/70'
                  }`}
                  onClick={() => setSelectedJobId(job.id)}
                >
                  <h3 className="font-semibold text-foreground">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Rankings */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">Candidate Rankings</h2>
                {selectedJob && (
                  <p className="text-muted-foreground mt-2">{selectedJob.title} at {selectedJob.company}</p>
                )}
              </div>
              {rankings.length > 0 && (
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Candidates</p>
                  <p className="text-3xl font-bold text-accent">{rankings.length}</p>
                </div>
              )}
            </div>

            {loading ? (
              <Card className="bg-card/50 border-border/40 p-8">
                <div className="text-center text-muted-foreground">
                  <div className="animate-spin inline-block w-8 h-8 border-4 border-accent border-t-transparent rounded-full mb-4"></div>
                  <p>Analyzing candidates with AI...</p>
                </div>
              </Card>
            ) : error ? (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-100">{error}</p>
              </div>
            ) : rankings.length === 0 ? (
              <Card className="bg-card/50 border-border/40 p-8">
                <div className="text-center text-muted-foreground">No rankings available</div>
              </Card>
            ) : (
              <div className="space-y-4">
                {rankings.map((ranking) => (
                  <Card key={ranking.candidate_id} className="bg-card/50 border-border/40 p-6 hover:bg-card/70 transition">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-4">
                            <div className="text-3xl font-bold text-accent w-12">#{ranking.rank}</div>
                            <div>
                              <h3 className="text-xl font-semibold text-foreground">{ranking.candidate_name}</h3>
                              <p className="text-sm text-muted-foreground">ID: {ranking.candidate_id}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-accent">{ranking.total_score.toFixed(1)}</p>
                          <p className="text-xs text-muted-foreground">Overall Score</p>
                        </div>
                      </div>

                      {/* Component Scores */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-background/50 rounded-lg p-4">
                          <p className="text-xs text-muted-foreground mb-2">GitHub</p>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-border rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${ranking.component_scores.github}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold">{ranking.component_scores.github}</span>
                          </div>
                        </div>
                        <div className="bg-background/50 rounded-lg p-4">
                          <p className="text-xs text-muted-foreground mb-2">LeetCode</p>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-border rounded-full h-2">
                              <div
                                className="bg-purple-500 h-2 rounded-full"
                                style={{ width: `${ranking.component_scores.leetcode}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold">{ranking.component_scores.leetcode}</span>
                          </div>
                        </div>
                        <div className="bg-background/50 rounded-lg p-4">
                          <p className="text-xs text-muted-foreground mb-2">LinkedIn</p>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-border rounded-full h-2">
                              <div
                                className="bg-cyan-500 h-2 rounded-full"
                                style={{ width: `${ranking.component_scores.linkedin}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold">{ranking.component_scores.linkedin}</span>
                          </div>
                        </div>
                      </div>

                      {/* Explanation */}
                      {ranking.explanation && (
                        <div className="border-t border-border/40 pt-4 space-y-3">
                          <div>
                            <p className="text-sm font-semibold text-foreground mb-2">Summary</p>
                            <p className="text-sm text-muted-foreground">{ranking.explanation.summary}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-semibold text-green-400 mb-2">Strengths</p>
                              <ul className="space-y-1">
                                {ranking.explanation.strengths.slice(0, 2).map((s, i) => (
                                  <li key={i} className="text-xs text-muted-foreground flex gap-2">
                                    <span className="text-green-400">✓</span>
                                    <span>{s}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-red-400 mb-2">Gaps</p>
                              <ul className="space-y-1">
                                {ranking.explanation.gaps.slice(0, 2).map((g, i) => (
                                  <li key={i} className="text-xs text-muted-foreground flex gap-2">
                                    <span className="text-red-400">✗</span>
                                    <span>{g}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {ranking.explanation.recommendations.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-accent mb-2">Recommendations</p>
                              <ul className="space-y-1">
                                {ranking.explanation.recommendations.slice(0, 1).map((r, i) => (
                                  <li key={i} className="text-xs text-muted-foreground">• {r}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      <Link href={`/rankings/${ranking.job_id}/${ranking.candidate_id}`}>
                        <Button size="sm" variant="outline" className="w-full border-border hover:bg-card bg-transparent">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

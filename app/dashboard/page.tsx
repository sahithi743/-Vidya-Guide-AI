'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Job {
  id: string
  title: string
  company: string
  seniority_level: string
}

export default function DashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        // Try to fetch from backend, fallback to mock data
        const response = await fetch('/api/jobs', { 
          headers: { 'Accept': 'application/json' }
        }).catch(() => null)
        
        if (response?.ok) {
          const data = await response.json()
          setJobs(data)
        } else {
          // Fallback to mock data
          setJobs([
            {
              id: 'job_001',
              title: 'Senior Full Stack Engineer',
              company: 'TechCorp India',
              seniority_level: 'mid-level'
            },
            {
              id: 'job_002',
              title: 'Backend Developer',
              company: 'DataSystems',
              seniority_level: 'mid-level'
            },
            {
              id: 'job_003',
              title: 'DevOps Engineer',
              company: 'CloudInfra',
              seniority_level: 'mid-level'
            }
          ])
        }
        setError(null)
      } catch (err) {
        console.error('[v0] Error fetching jobs:', err)
        setError('Failed to load jobs. Using sample data.')
        // Set mock data
        setJobs([
          {
            id: 'job_001',
            title: 'Senior Full Stack Engineer',
            company: 'TechCorp India',
            seniority_level: 'mid-level'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[#0a1628] to-background">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/">
              <Button variant="outline" className="border-border hover:bg-card bg-transparent">
                Home
              </Button>
            </Link>
            <Link href="/jobs/new">
              <Button className="bg-accent hover:bg-blue-600 text-white">
                Create Job
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card/50 border-border/40 p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Jobs</p>
                <p className="text-3xl font-bold">{jobs.length}</p>
              </div>
            </Card>
            <Card className="bg-card/50 border-border/40 p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Active Placements</p>
                <p className="text-3xl font-bold">3</p>
              </div>
            </Card>
            <Card className="bg-card/50 border-border/40 p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Avg Match Score</p>
                <p className="text-3xl font-bold">78%</p>
              </div>
            </Card>
          </div>

          {/* Jobs Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Recent Jobs</h2>
            {loading ? (
              <Card className="bg-card/50 border-border/40 p-8">
                <div className="text-center text-muted-foreground">Loading jobs...</div>
              </Card>
            ) : error ? (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-100">{error}</p>
              </div>
            ) : jobs.length === 0 ? (
              <Card className="bg-card/50 border-border/40 p-8">
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">No jobs yet</p>
                  <Link href="/jobs/new">
                    <Button className="bg-accent hover:bg-blue-600 text-white">
                      Create First Job
                    </Button>
                  </Link>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <Card 
                    key={job.id}
                    className="bg-card/50 border-border/40 p-6 hover:bg-card/70 transition cursor-pointer"
                    onClick={() => router.push(`/rankings/${job.id}`)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{job.title}</h3>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>{job.company}</span>
                          <span>•</span>
                          <span className="capitalize">{job.seniority_level}</span>
                        </div>
                      </div>
                      <Link href={`/rankings/${job.id}`}>
                        <Button 
                          size="sm"
                          className="bg-accent hover:bg-blue-600 text-white"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Rankings
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-card/50 border-border/40 p-6 hover:bg-card/70 transition">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">View All Candidates</h3>
                    <p className="text-sm text-muted-foreground">Browse student profiles</p>
                  </div>
                </div>
                <Link href="/candidates">
                  <Button variant="outline" className="w-full mt-4 border-border hover:bg-card bg-transparent">
                    View Candidates
                  </Button>
                </Link>
              </Card>

              <Card className="bg-card/50 border-border/40 p-6 hover:bg-card/70 transition">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Create Job Posting</h3>
                    <p className="text-sm text-muted-foreground">Add new job requirement</p>
                  </div>
                </div>
                <Link href="/jobs/new">
                  <Button variant="outline" className="w-full mt-4 border-border hover:bg-card bg-transparent">
                    Create Job
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface StudentMetrics {
  total_students: number
  average_skill_score: number
  placement_ready_count: number
  top_performer: string
  skill_distribution: Record<string, number>
  placement_readiness: {
    ready: number
    in_progress: number
    needs_improvement: number
  }
}

interface StudentPerformance {
  id: string
  name: string
  skill_score: number
  placement_readiness: number
  github_activity: number
  leetcode_progress: number
  status: 'ready' | 'in-progress' | 'needs-improvement'
}

export default function InstructorDashboard() {
  const [metrics, setMetrics] = useState<StudentMetrics | null>(null)
  const [students, setStudents] = useState<StudentPerformance[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch('/api/instructor/metrics')
        const data = await res.json()
        setMetrics(data)
      } catch (error) {
        console.error('[v0] Error fetching metrics:', error)
        setMetrics({
          total_students: 45,
          average_skill_score: 76,
          placement_ready_count: 28,
          top_performer: 'Arjun Patel',
          skill_distribution: {
            'Python': 42,
            'JavaScript': 39,
            'React': 35,
            'Java': 28,
            'PostgreSQL': 32
          },
          placement_readiness: {
            ready: 28,
            in_progress: 12,
            needs_improvement: 5
          }
        })
      }
    }

    const fetchStudents = async () => {
      try {
        const res = await fetch('/api/instructor/students')
        const data = await res.json()
        setStudents(data)
      } catch (error) {
        console.error('[v0] Error fetching students:', error)
        setStudents([
          {
            id: 'student_1',
            name: 'Arjun Patel',
            skill_score: 92,
            placement_readiness: 87,
            github_activity: 95,
            leetcode_progress: 85,
            status: 'ready'
          },
          {
            id: 'student_2',
            name: 'Priya Singh',
            skill_score: 85,
            placement_readiness: 80,
            github_activity: 88,
            leetcode_progress: 78,
            status: 'ready'
          },
          {
            id: 'student_3',
            name: 'Rohan Kumar',
            skill_score: 72,
            placement_readiness: 65,
            github_activity: 70,
            leetcode_progress: 60,
            status: 'in-progress'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
    fetchStudents()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-green-500/20 text-green-400'
      case 'in-progress':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'needs-improvement':
        return 'bg-red-500/20 text-red-400'
      default:
        return 'bg-muted'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Instructor Analytics</h1>
            <p className="text-muted-foreground">Monitor student performance and placement readiness</p>
          </div>

          {/* Key Metrics */}
          {metrics && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-card/50 border-border/40 p-6">
                <p className="text-sm text-muted-foreground mb-2">Total Students</p>
                <p className="text-3xl font-bold">{metrics.total_students}</p>
              </Card>

              <Card className="bg-card/50 border-border/40 p-6">
                <p className="text-sm text-muted-foreground mb-2">Average Skill Score</p>
                <p className="text-3xl font-bold text-blue-400">{metrics.average_skill_score}%</p>
              </Card>

              <Card className="bg-card/50 border-border/40 p-6">
                <p className="text-sm text-muted-foreground mb-2">Placement Ready</p>
                <p className="text-3xl font-bold text-green-400">{metrics.placement_ready_count}</p>
              </Card>

              <Card className="bg-card/50 border-border/40 p-6">
                <p className="text-sm text-muted-foreground mb-2">Top Performer</p>
                <p className="text-lg font-semibold">{metrics.top_performer}</p>
              </Card>
            </div>
          )}

          {/* Readiness Distribution */}
          {metrics && (
            <Card className="bg-card/50 border-border/40 p-8">
              <h2 className="text-xl font-bold mb-6">Placement Readiness Distribution</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-400">{metrics.placement_readiness.ready}</span>
                  </div>
                  <p className="font-semibold mb-2">Ready for Placement</p>
                  <p className="text-sm text-muted-foreground">
                    {Math.round((metrics.placement_readiness.ready / metrics.total_students) * 100)}% of cohort
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-yellow-400">{metrics.placement_readiness.in_progress}</span>
                  </div>
                  <p className="font-semibold mb-2">In Progress</p>
                  <p className="text-sm text-muted-foreground">
                    {Math.round((metrics.placement_readiness.in_progress / metrics.total_students) * 100)}% of cohort
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-red-400">{metrics.placement_readiness.needs_improvement}</span>
                  </div>
                  <p className="font-semibold mb-2">Needs Improvement</p>
                  <p className="text-sm text-muted-foreground">
                    {Math.round((metrics.placement_readiness.needs_improvement / metrics.total_students) * 100)}% of cohort
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Student Performance Table */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Student Performance Overview</h2>
            <Card className="bg-card/50 border-border/40 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border/40">
                    <tr className="text-left text-sm font-semibold">
                      <th className="p-4">Name</th>
                      <th className="p-4">Skill Score</th>
                      <th className="p-4">Placement Ready</th>
                      <th className="p-4">GitHub Activity</th>
                      <th className="p-4">LeetCode Progress</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, idx) => (
                      <tr key={student.id} className={`border-b border-border/40 ${idx % 2 === 0 ? 'bg-card/30' : ''}`}>
                        <td className="p-4 font-medium">{student.name}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-muted rounded-full h-1.5">
                              <div
                                className="bg-blue-500 h-1.5 rounded-full"
                                style={{ width: `${student.skill_score}%` }}
                              />
                            </div>
                            <span className="text-sm">{student.skill_score}%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-muted rounded-full h-1.5">
                              <div
                                className="bg-green-500 h-1.5 rounded-full"
                                style={{ width: `${student.placement_readiness}%` }}
                              />
                            </div>
                            <span className="text-sm">{student.placement_readiness}%</span>
                          </div>
                        </td>
                        <td className="p-4">{student.github_activity}%</td>
                        <td className="p-4">{student.leetcode_progress}%</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(student.status)}`}>
                            {student.status.replace('-', ' ')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Top Skills */}
          {metrics && (
            <Card className="bg-card/50 border-border/40 p-8">
              <h2 className="text-xl font-bold mb-6">Top Skills in Cohort</h2>
              <div className="space-y-4">
                {Object.entries(metrics.skill_distribution).map(([skill, count]) => (
                  <div key={skill}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill}</span>
                      <span className="text-sm text-muted-foreground">{count} students</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-accent to-primary h-2 rounded-full"
                        style={{ width: `${(count / 45) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface StudentProfile {
  id: string
  name: string
  email: string
  github_username: string
  leetcode_username: string
  linkedin_profile: string
  skills: string[]
  skill_readiness_score: number
  placement_readiness_score: number
  learning_path: string[]
  recent_achievements: string[]
}

export default function StudentDashboard() {
  const [student, setStudent] = useState<StudentProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch('/api/student')
        const data = await res.json()
        setStudent(data)
      } catch (error) {
        console.error('[v0] Error fetching student:', error)
        // Mock data fallback
        setStudent({
          id: 'student_1',
          name: 'Arjun Patel',
          email: 'arjun@example.com',
          github_username: 'arjun-codes',
          leetcode_username: 'arjun_lc',
          linkedin_profile: 'linkedin.com/in/arjun-patel',
          skills: ['Python', 'JavaScript', 'React', 'PostgreSQL', 'AWS'],
          skill_readiness_score: 78,
          placement_readiness_score: 82,
          learning_path: ['Advanced System Design', 'Distributed Systems', 'Machine Learning Basics'],
          recent_achievements: ['Solved 150 LeetCode problems', 'Completed 5 GitHub projects', '4.0 GPA']
        })
      } finally {
        setLoading(false)
      }
    }
    fetchStudent()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!student) {
    return <div className="flex justify-center items-center min-h-screen">Failed to load profile</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">{student.name}</h1>
          <p className="text-muted-foreground">{student.email}</p>
        </div>

        {/* Scores Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-card/50 border-border/40 p-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Skill Readiness Score</h2>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{student.skill_readiness_score}%</span>
                </div>
                <p className="text-muted-foreground">Based on GitHub, LeetCode, and project portfolio analysis</p>
              </div>
            </div>
          </Card>

          <Card className="bg-card/50 border-border/40 p-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Placement Readiness</h2>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{student.placement_readiness_score}%</span>
                </div>
                <p className="text-muted-foreground">Overall preparedness for job placement</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Skills Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Technical Skills</h2>
          <Card className="bg-card/50 border-border/40 p-8">
            <div className="flex flex-wrap gap-3">
              {student.skills.map((skill) => (
                <span key={skill} className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* Learning Path */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Personalized Learning Path</h2>
          <div className="space-y-4">
            {student.learning_path.map((course, idx) => (
              <Card key={idx} className="bg-card/50 border-border/40 p-6 hover:bg-card/70 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold mb-2">{course}</h3>
                    <p className="text-sm text-muted-foreground">Recommended based on your skill gaps</p>
                  </div>
                  <Button variant="outline" size="sm">Start</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Recent Achievements</h2>
          <Card className="bg-card/50 border-border/40 p-8">
            <ul className="space-y-3">
              {student.recent_achievements.map((achievement, idx) => (
                <li key={idx} className="flex gap-3 items-center">
                  <span className="text-accent text-xl">✓</span>
                  <span className="text-foreground">{achievement}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link href="/rankings">
            <Button className="bg-accent hover:bg-blue-600">View Job Rankings</Button>
          </Link>
          <Link href="/ai-chat">
            <Button variant="outline">Get AI Career Guidance</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

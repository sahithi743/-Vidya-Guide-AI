import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Mock student data
    const student = {
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
    }
    return NextResponse.json(student)
  } catch (error) {
    console.error('[v0] Error in student API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch student data' },
      { status: 500 }
    )
  }
}

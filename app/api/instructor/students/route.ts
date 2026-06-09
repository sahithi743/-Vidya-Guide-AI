import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const students = [
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
      },
      {
        id: 'student_4',
        name: 'Neha Sharma',
        skill_score: 88,
        placement_readiness: 82,
        github_activity: 90,
        leetcode_progress: 80,
        status: 'ready'
      },
      {
        id: 'student_5',
        name: 'Vikram Joshi',
        skill_score: 68,
        placement_readiness: 55,
        github_activity: 65,
        leetcode_progress: 50,
        status: 'needs-improvement'
      }
    ]
    return NextResponse.json(students)
  } catch (error) {
    console.error('[v0] Error in instructor students API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
}

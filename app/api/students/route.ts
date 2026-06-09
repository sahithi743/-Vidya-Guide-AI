import { NextRequest, NextResponse } from 'next/server'

// Mock students data
const mockStudents = [
  {
    id: 'student_001',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    college: 'IIT Delhi',
    major: 'Computer Science',
    batch_year: 2024,
    github: {
      username: 'rajesh_dev',
      repos: 42,
      stars: 285,
      languages: ['Python', 'JavaScript', 'Java'],
      recent_commits: 234,
      contribution_streak: 45,
      followers: 156
    },
    leetcode: {
      username: 'rajesh_lc',
      problems_solved: 412,
      easy: 125,
      medium: 198,
      hard: 89,
      topics: ['Dynamic Programming', 'Graphs', 'Trees', 'Greedy'],
      rank: 42000,
      acceptance_rate: 87.5
    },
    linkedin: {
      username: 'rajesh-kumar',
      headline: 'Full Stack Developer | Python | JavaScript',
      skills: ['Python', 'JavaScript', 'React', 'Node.js', 'PostgreSQL', 'AWS'],
      endorsements: { 'Python': 89, 'JavaScript': 76, 'React': 62 },
      experience_years: 2,
      certifications: ['AWS Solutions Architect', 'Google Cloud Associate'],
      education: ['B.Tech Computer Science']
    }
  },
  {
    id: 'student_002',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    college: 'BITS Pilani',
    major: 'Computer Science',
    batch_year: 2024,
    github: {
      username: 'priya_codes',
      repos: 28,
      stars: 145,
      languages: ['Java', 'Python', 'C++'],
      recent_commits: 156,
      contribution_streak: 30,
      followers: 89
    },
    leetcode: {
      username: 'priya_lc',
      problems_solved: 287,
      easy: 95,
      medium: 142,
      hard: 50,
      topics: ['Dynamic Programming', 'Linked Lists', 'Trees'],
      rank: 78000,
      acceptance_rate: 85.0
    },
    linkedin: {
      username: 'priya-sharma',
      headline: 'Backend Developer | Java | System Design',
      skills: ['Java', 'Python', 'Spring Boot', 'PostgreSQL', 'Microservices'],
      endorsements: { 'Java': 95, 'Python': 67 },
      experience_years: 1,
      certifications: ['Oracle Java Associate'],
      education: ['B.Tech Computer Science']
    }
  },
  {
    id: 'student_003',
    name: 'Arjun Patel',
    email: 'arjun@example.com',
    college: 'NIT Bombay',
    major: 'Computer Science',
    batch_year: 2023,
    github: {
      username: 'arjun_dev',
      repos: 56,
      stars: 432,
      languages: ['Python', 'Go', 'Rust', 'JavaScript'],
      recent_commits: 345,
      contribution_streak: 67,
      followers: 234
    },
    leetcode: {
      username: 'arjun_lc',
      problems_solved: 567,
      easy: 145,
      medium: 287,
      hard: 135,
      topics: ['Advanced DP', 'Graphs', 'System Design'],
      rank: 8000,
      acceptance_rate: 91.0
    },
    linkedin: {
      username: 'arjun-patel',
      headline: 'Senior Backend Engineer | Distributed Systems',
      skills: ['Python', 'Go', 'Kubernetes', 'AWS', 'System Design'],
      endorsements: { 'Python': 142, 'Go': 98 },
      experience_years: 4,
      certifications: ['AWS Solutions Architect Professional'],
      education: ['B.Tech Computer Science', 'M.Tech Cloud Computing']
    }
  }
]

export async function GET(request: NextRequest) {
  try {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
    
    // Try to fetch from Python backend first
    try {
      const response = await fetch(`${backend}/api/students`, {
        headers: { 'Accept': 'application/json' }
      })
      if (response.ok) {
        const data = await response.json()
        return NextResponse.json(data)
      }
    } catch (err) {
      console.error('[v0] Backend not available, using mock data')
    }
    
    // Fallback to mock data
    return NextResponse.json(mockStudents)
  } catch (error) {
    console.error('[v0] Error in students API:', error)
    return NextResponse.json(mockStudents)
  }
}

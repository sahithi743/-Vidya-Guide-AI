import { NextRequest, NextResponse } from 'next/server'

// Mock jobs data
const mockJobs = [
  {
    id: 'job_001',
    title: 'Senior Full Stack Engineer',
    company: 'TechCorp India',
    description: 'Looking for an experienced full stack engineer to lead our platform development...',
    requirements: {
      required_skills: ['Python', 'React', 'PostgreSQL', 'AWS'],
      preferred_skills: ['Docker', 'Kubernetes', 'GraphQL'],
      experience_years: 3,
      difficulty_level: 'intermediate'
    },
    seniority_level: 'mid-level',
    location: 'Bangalore, India',
    salary_range: '₹25L - ₹35L'
  },
  {
    id: 'job_002',
    title: 'Backend Developer',
    company: 'DataSystems',
    description: 'Join our backend team to build scalable microservices...',
    requirements: {
      required_skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Microservices'],
      preferred_skills: ['Kubernetes', 'Message Queues'],
      experience_years: 2,
      difficulty_level: 'intermediate'
    },
    seniority_level: 'mid-level',
    location: 'Remote',
    salary_range: '₹20L - ₹28L'
  },
  {
    id: 'job_003',
    title: 'DevOps Engineer',
    company: 'CloudInfra',
    description: 'Help us build and maintain our cloud infrastructure...',
    requirements: {
      required_skills: ['Kubernetes', 'Docker', 'AWS', 'Go'],
      preferred_skills: ['Terraform', 'CI/CD', 'Prometheus'],
      experience_years: 3,
      difficulty_level: 'intermediate'
    },
    seniority_level: 'mid-level',
    location: 'Pune, India',
    salary_range: '₹24L - ₹32L'
  }
]

export async function GET(request: NextRequest) {
  try {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
    
    // Try to fetch from Python backend first
    try {
      const response = await fetch(`${backend}/api/jobs`, {
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
    return NextResponse.json(mockJobs)
  } catch (error) {
    console.error('[v0] Error in jobs API:', error)
    return NextResponse.json(mockJobs)
  }
}

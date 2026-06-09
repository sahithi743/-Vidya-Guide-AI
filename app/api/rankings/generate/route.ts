import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const jobId = request.nextUrl.searchParams.get("job_id")

  if (!jobId) {
    return NextResponse.json({ error: "job_id parameter required" }, { status: 400 })
  }

  try {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"
    
    // Try to fetch from Python backend
    try {
      const response = await fetch(`${backend}/api/rankings/generate?job_id=${jobId}`, {
        method: "POST",
        headers: { "Accept": "application/json" }
      })
      if (response.ok) {
        const data = await response.json()
        return NextResponse.json(data)
      }
    } catch (err) {
      console.error("[v0] Backend not available using mock rankings")
    }

    // Fallback to mock data
    const mockRankings = {
      job_id: jobId,
      job_title: "Senior Full Stack Engineer",
      total_candidates: 2,
      rankings: [
        {
          job_id: jobId,
          candidate_id: "student_001",
          candidate_name: "Rajesh Kumar",
          rank: 1,
          total_score: 87.5,
          component_scores: {
            github: 85,
            leetcode: 78,
            linkedin: 92
          },
          explanation: {
            summary: "Excellent match for this role with strong technical foundation and relevant experience.",
            strengths: ["Python expertise", "React experience", "AWS knowledge", "Strong GitHub presence"],
            gaps: ["Limited Kubernetes experience", "No GraphQL background"],
            recommendations: ["Learn Kubernetes basics", "Practice GraphQL patterns"],
            skill_match_percentage: 92.5,
            experience_alignment: "Perfect alignment with senior requirements"
          }
        },
        {
          job_id: jobId,
          candidate_id: "student_002",
          candidate_name: "Priya Sharma",
          rank: 2,
          total_score: 76.3,
          component_scores: {
            github: 72,
            leetcode: 82,
            linkedin: 75
          },
          explanation: {
            summary: "Good fit for the role with solid problem-solving skills and backend expertise.",
            strengths: ["Java expertise", "Backend knowledge", "Strong algorithm skills"],
            gaps: ["Limited React experience", "No AWS experience"],
            recommendations: ["Learn React framework", "Get AWS certification"],
            skill_match_percentage: 78.0,
            experience_alignment: "Good alignment with role requirements"
          }
        }
      ],
      generated_at: new Date().toISOString()
    }

    return NextResponse.json(mockRankings)
  } catch (error) {
    console.error("[v0] Error in rankings API:", error)
    return NextResponse.json(
      { error: "Failed to generate rankings" },
      { status: 500 }
    )
  }
}

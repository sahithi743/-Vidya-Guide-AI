'use client'

import { useState, useEffect } from " react\
import { useParams } from \next/navigation\
import { Card } from \@/components/ui/card\
import { Button } from \@/components/ui/button\
import { Badge } from \@/components/ui/badge\
import { Progress } from \@/components/ui/progress\
import { Navbar } from \@/components/navbar\
import Link from \next/link\
import {
 Github,
 Linkedin,
 Code,
 TrendingUp,
 AlertCircle,
 CheckCircle2,
 ArrowLeft,
 Briefcase
} from \lucide-react\

interface CandidateDetail {
 id: string
 name: string
 email: string
 job_title: string
 total_score: number
 rank: number
 scores: {
 github: number
 leetcode: number
 linkedin: number
 }
 analysis: {
 summary: string
 strengths: string[]
 gaps: string[]
 recommendations: string[]
 }
 projects: Array<{
 name: string
 description: string
 stars: number
 tech: string[]
 }>
}

export default function CandidateDetailPage() {
 const params = useParams()
 const jobId = params.jobId as string
 const candidateId = params.candidateId as string
 
 const [candidate, setCandidate] = useState<CandidateDetail | null>(null)
 const [loading, setLoading] = useState(true)

 useEffect(() => {
 // Mock data for now
 setTimeout(() => {
 setCandidate({
 id: candidateId,
 name: candidateId === \student_001\ ? \Rajesh Kumar\ : \Priya Sharma\,
 email: candidateId === \student_001\ ? \rajesh@example.com\ : \priya@example.com\,
 job_title: \Senior Full Stack Engineer\,
 total_score: candidateId === \student_001\ ? 87.5 : 76.3,
 rank: candidateId === \student_001\ ? 1 : 2,
 scores: {
 github: candidateId === \student_001\ ? 85 : 72,
 leetcode: candidateId === \student_001\ ? 78 : 82,
 linkedin: candidateId === \student_001\ ? 92 : 75
 },
 analysis: {
 summary: candidateId === \student_001\ 
 ? \Excellent match for this role with strong technical foundation and relevant experience.\ 
 : \Good fit for the role with solid problem-solving skills and backend expertise.\,
 strengths: candidateId === \student_001\
 ? [\Python expertise\, \React experience\, \AWS knowledge\, \Strong GitHub presence\]
 : [\Java expertise\, \Backend knowledge\, \Strong algorithm skills\, \System design basics\],
 gaps: candidateId === \student_001\
 ? [\Limited Kubernetes experience\, \No GraphQL background\]
 : [\Limited React experience\, \No AWS experience\, \Frontend performance optimization\],
 recommendations: candidateId === \student_001\
 ? [\Learn Kubernetes basics\, \Practice GraphQL patterns\]
 : [\Learn React framework\, \Get AWS certification\, \Build frontend projects\]
 },
 projects: [
 {
 name: \AI Image Generator\,
 description: \A full-stack application using OpenAI and React\,
 stars: 45,
 tech: [\React\, \Node.js\, \OpenAI\]
 },
 {
 name: \Microservices Auth\,
 description: \Scalable authentication service with Redis\,
 stars: 120,
 tech: [\Go\, \Redis\, \Docker\]
 }
 ]
 })
 setLoading(false)
 }, 800)
 }, [jobId, candidateId])

 if (loading) {
 return (
 <div className=\min-h-screen bg-background flex flex-col\>
 <Navbar />
 <div className=\flex-1 flex items-center justify-center\>
 <div className=\text-center\>
 <div className=\animate-spin w-10 h-10 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4\></div>
 <p className=\text-muted-foreground\>Loading analysis...</p>
 </div>
 </div>
 </div>
 )
 }

 if (!candidate) return <div>Candidate not found</div>

 return (
 <div className=\min-h-screen bg-background pb-20\>
 <Navbar />
 
 <main className=\max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8\>
 <Link href=\/rankings\ className=\flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition w-fit\>
 <ArrowLeft size={16} />
 <span>Back to Rankings</span>
 </Link>
 <div className=\flex flex-col md:flex-row justify-between items-start gap-8 mb-12\>
 <div className=\flex items-center gap-6\>
 <div className=\w-24 h-24 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-accent/20\>
 {candidate.name.charAt(0)}
 </div>
 <div>
 <div className=\flex items-center gap-3 mb-1\>
 <h1 className=\text-4xl font-bold\>{candidate.name}</h1>
 <Badge variant=\outline\ className=\text-accent border-accent/20 bg-accent/5\>
 Rank #{candidate.rank}
 </Badge>
 </div>
 <p className=\text-lg text-muted-foreground mb-4\>{candidate.email}</p>
 <div className=\flex gap-3\>
 <Button size=\sm\ variant=\ghost\ className=\h-8 gap-2\>
 <Github size={16} /> GitHub
 </Button>
 <Button size=\sm\ variant=\ghost\ className=\h-8 gap-2\>
 <Linkedin size={16} /> LinkedIn
 </Button>
 <Button size=\sm\ variant=\ghost\ className=\h-8 gap-2\>
 <Code size={16} /> LeetCode
 </Button>
 </div>
 </div>
 </div>
 
 <Card className=\bg-card/50 border-border/40 p-6 text-center min-w-[200px]\>
 <p className=\text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold\>Match Score</p>
 <p className=\text-5xl font-bold text-accent\>{candidate.total_score}</p>
 <p className=\text-xs text-muted-foreground mt-2 italic\>Highly Recommended</p>
 </Card>
 </div>

 <div className=\grid grid-cols-1 lg:grid-cols-3 gap-8\>
 <div className=\lg:col-span-2 space-y-8\>
 <Card className=\bg-card/50 border-border/40 p-8\>
 <h2 className=\text-xl font-bold mb-4 flex items-center gap-2\>
 <TrendingUp size={20} className=\text-accent\ />
 AI Match Analysis
 </h2>
 <p className=\text-lg text-muted-foreground leading-relaxed mb-6\>
 {candidate.analysis.summary}
 </p>
 
 <div className=\grid grid-cols-1 md:grid-cols-2 gap-8\>
 <div className=\space-y-4\>
 <h3 className=\text-sm font-semibold text-green-400 uppercase tracking-wider flex items-center gap-2\>
 <CheckCircle2 size={16} /> Strengths
 </h3>
 <ul className=\space-y-3\>
 {candidate.analysis.strengths.map((str, i) => (
 <li key={i} className=\flex gap-3 text-sm text-foreground\>
 <span className=\text-green-400\></span>
 {str}
 </li>
 ))}
 </ul>
 </div>
 
 <div className=\space-y-4\>
 <h3 className=\text-sm font-semibold text-red-400 uppercase tracking-wider flex items-center gap-2\>
 <AlertCircle size={16} /> Areas for Growth
 </h3>
 <ul className=\space-y-3\>
 {candidate.analysis.gaps.map((gap, i) => (
 <li key={i} className=\flex gap-3 text-sm text-foreground\>
 <span className=\text-red-400\></span>
 {gap}
 </li>
 ))}
 </ul>
 </div>
 </div>
 
 <div className=\mt-8 pt-8 border-t border-border/40\>
 <h3 className=\text-sm font-semibold text-accent uppercase tracking-wider mb-4\>Strategic Recommendations</h3>
 <div className=\flex flex-wrap gap-2\>
 {candidate.analysis.recommendations.map((rec, i) => (
 <Badge key={i} variant=\secondary\ className=\bg-accent/10 text-accent hover:bg-accent/20\>
 {rec}
 </Badge>
 ))}
 </div>
 </div>
 </Card>

 <section>
 <h2 className=\text-2xl font-bold mb-6 flex items-center gap-2\>
 <Github size={24} /> Highlighted Projects
 </h2>
 <div className=\grid grid-cols-1 md:grid-cols-2 gap-4\>
 {candidate.projects.map((project, i) => (
 <Card key={i} className=\bg-card/50 border-border/40 p-6 group hover:border-accent/40 transition\>
 <div className=\flex justify-between items-start mb-2\>
 <h3 className=\font-bold text-lg group-hover:text-accent transition\>{project.name}</h3>
 <div className=\flex items-center gap-1 text-yellow-500\>
 <span className=\text-sm font-bold\> {project.stars}</span>
 </div>
 </div>
 <p className=\text-sm text-muted-foreground mb-4 line-clamp-2\>
 {project.description}
 </p>
 <div className=\flex flex-wrap gap-2\>
 {project.tech.map((t, idx) => (
 <span key={idx} className=\text-[10px] px-2 py-1 bg-background/50 rounded-md border border-border/40\>
 {t}
 </span>
 ))}
 </div>
 </Card>
 ))}
 </div>
 </section>
 </div>

 <div className=\space-y-8\>
 <Card className=\bg-card/50 border-border/40 p-8 sticky top-24\>
 <h2 className=\text-xl font-bold mb-8\>Score Breakdown</h2>
 <div className=\space-y-8\>
 <div className=\space-y-2\>
 <div className=\flex justify-between text-sm\>
 <span className=\text-muted-foreground flex items-center gap-2\>
 <Github size={14} /> Open Source
 </span>
 <span className=\font-bold text-blue-400\>{candidate.scores.github}</span>
 </div>
 <Progress value={candidate.scores.github} className=\h-1.5 bg-blue-950/20\ />
 </div>
 
 <div className=\space-y-2\>
 <div className=\flex justify-between text-sm\>
 <span className=\text-muted-foreground flex items-center gap-2\>
 <Code size={14} /> DSA Proficiency
 </span>
 <span className=\font-bold text-purple-400\>{candidate.scores.leetcode}</span>
 </div>
 <Progress value={candidate.scores.leetcode} className=\h-1.5 bg-purple-950/20\ />
 </div>
 
 <div className=\space-y-2\>
 <div className=\flex justify-between text-sm\>
 <span className=\text-muted-foreground flex items-center gap-2\>
 <Linkedin size={14} /> Professionalism
 </span>
 <span className=\font-bold text-cyan-400\>{candidate.scores.linkedin}</span>
 </div>
 <Progress value={candidate.scores.linkedin} className=\h-1.5 bg-cyan-950/20\ />
 </div>
 </div>

 <div className=\mt-12 pt-8 border-t border-border/40\>
 <div className=\bg-accent/5 rounded-xl p-6 border border-accent/10\>
 <h3 className=\font-bold text-sm mb-2 flex items-center gap-2\>
 <Briefcase size={16} className=\text-accent\ />
 Target Role
 </h3>
 <p className=\text-sm font-semibold\>{candidate.job_title}</p>
 <p className=\text-xs text-muted-foreground mt-1\>TechCorp, Inc.</p>
 </div>
 </div>
 
 <Button className=\w-full mt-8 bg-accent hover:bg-blue-600 text-white font-bold py-6\>
 Interview Candidate
 </Button>
 </Card>
 </div>
 </div>
 </main>
 </div>
 )
}

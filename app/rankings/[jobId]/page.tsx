'use client'

import { useState, useEffect } from " react\
import { useParams, useRouter } from \next/navigation\
import { Card } from \@/components/ui/card\
import { Button } from \@/components/ui/button\
import { Navbar } from \@/components/navbar\
import Link from \next/link\
import { ArrowLeft, Users, Trophy, ExternalLink } from \lucide-react\

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
}

interface Job {
 id: string
 title: string
 company: string
}

export default function JobRankingsPage() {
 const params = useParams()
 const jobId = params.jobId as string
 const router = useRouter()
 
 const [job, setJob] = useState<Job | null>(null)
 const [rankings, setRankings] = useState<RankingResult[]>([])
 const [loading, setLoading] = useState(true)

 useEffect(() => {
 const fetchData = async () => {
 try {
 setLoading(true)
 // Mocking for now
 setJob({
 id: jobId,
 title: jobId === \job_001\ ? \Senior Full Stack Engineer\ : \Backend Developer\,
 company: jobId === \job_001\ ? \TechCorp India\ : \DataSystems\
 })
 
 setRankings([
 {
 job_id: jobId,
 candidate_id: \student_001\,
 candidate_name: \Rajesh Kumar\,
 rank: 1,
 total_score: 87.5,
 component_scores: { github: 85, leetcode: 78, linkedin: 92 }
 },
 {
 job_id: jobId,
 candidate_id: \student_002\,
 candidate_name: \Priya Sharma\,
 rank: 2,
 total_score: 76.3,
 component_scores: { github: 72, leetcode: 82, linkedin: 75 }
 }
 ])
 } catch (err) {
 console.error(\Error fetching job rankings:\, err)
 } finally {
 setLoading(false)
 }
 }
 
 fetchData()
 }, [jobId])

 if (loading) return <div className=\flex justify-center items-center min-h-screen\>Loading rankings...</div>
 if (!job) return <div>Job not found</div>

 return (
 <div className=\min-h-screen bg-background\>
 <Navbar />
 
 <main className=\max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12\>
 <Link href=\/dashboard\ className=\flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition w-fit\>
 <ArrowLeft size={16} />
 <span>Back to Dashboard</span>
 </Link>

 <div className=\flex justify-between items-end mb-12\>
 <div>
 <h1 className=\text-4xl font-bold mb-2\>{job.title}</h1>
 <p className=\text-xl text-muted-foreground\>{job.company}</p>
 </div>
 <div className=\flex gap-4\>
 <Card className=\bg-accent/5 border-accent/20 p-4 flex items-center gap-4\>
 <Users className=\text-accent\ />
 <div>
 <p className=\text-xs text-muted-foreground uppercase\>Candidates</p>
 <p className=\text-xl font-bold\>{rankings.length}</p>
 </div>
 </Card>
 </div>
 </div>

 <div className=\space-y-4\>
 <h2 className=\text-2xl font-bold mb-6 flex items-center gap-2\>
 <Trophy className=\text-yellow-500\ />
 Top Ranked Candidates
 </h2>
 
 {rankings.map((ranking) => (
 <Card key={ranking.candidate_id} className=\p-6 bg-card/50 border-border/40 hover:border-accent/40 transition group\>
 <div className=\flex justify-between items-center\>
 <div className=\flex items-center gap-6\>
 <div className=\text-4xl font-black text-accent/20 italic w-12 group-hover:text-accent/40 transition\>
 #{ranking.rank}
 </div>
 <div>
 <h3 className=\text-xl font-bold mb-1\>{ranking.candidate_name}</h3>
 <div className=\flex gap-4 items-center\>
 <div className=\flex items-center gap-2 text-sm text-muted-foreground\>
 <span className=\w-2 h-2 rounded-full bg-blue-500\></span>
 GitHub: {ranking.component_scores.github}
 </div>
 <div className=\flex items-center gap-2 text-sm text-muted-foreground\>
 <span className=\w-2 h-2 rounded-full bg-purple-500\></span>
 LeetCode: {ranking.component_scores.leetcode}
 </div>
 </div>
 </div>
 </div>
 
 <div className=\flex items-center gap-8\>
 <div className=\text-center\>
 <p className=\text-xs text-muted-foreground uppercase font-bold\>Score</p>
 <p className=\text-3xl font-bold text-accent\>{ranking.total_score}</p>
 </div>
 <Link href={/rankings//}>
 <Button variant=\outline\ className=\gap-2\>
 View Profile <ExternalLink size={14} />
 </Button>
 </Link>
 </div>
 </div>
 </Card>
 ))}
 </div>
 </main>
 </div>
 )
}

'use client'

import { useState, useEffect } from " react\
import { useParams } from \next/navigation\
import { Card } from \@/components/ui/card\
import { Button } from \@/components/ui/button\
import { Badge } from \@/components/ui/badge\
import { Navbar } from \@/components/navbar\
import Link from \next/link\
import {
 Github,
 Linkedin,
 Code,
 MapPin,
 Mail,
 School,
 Calendar,
 Award,
 ArrowLeft,
 ExternalLink
} from \lucide-react\

interface CandidateProfile {
 id: string
 name: string
 email: string
 college: string
 major: string
 batch_year: number
 github: {
 username: string
 repos: number
 stars: number
 languages: string[]
 }
 leetcode: {
 username: string
 problems_solved: number
 rank: number
 }
 linkedin: {
 username: string
 headline: string
 skills: string[]
 experience_years: number
 }
}

export default function CandidateProfilePage() {
 const params = useParams()
 const id = params.id as string
 
 const [profile, setProfile] = useState<CandidateProfile | null>(null)
 const [loading, setLoading] = useState(true)

 useEffect(() => {
 // Mock data
 setTimeout(() => {
 setProfile({
 id: id,
 name: id === \student_001\ ? \Rajesh Kumar\ : \Priya Sharma\,
 email: id === \student_001\ ? \rajesh@example.com\ : \priya@example.com\,
 college: id === \student_001\ ? \IIT Delhi\ : \BITS Pilani\,
 major: \Computer Science\,
 batch_year: 2024,
 github: {
 username: id === \student_001\ ? \rajesh_dev\ : \priya_codes\,
 repos: id === \student_001\ ? 42 : 28,
 stars: id === \student_001\ ? 285 : 145,
 languages: id === \student_001\ ? [\Python\, \JavaScript\, \Java\] : [\Java\, \Python\, \C++\]
 },
 leetcode: {
 username: id === \student_001\ ? \rajesh_lc\ : \priya_lc\,
 problems_solved: id === \student_001\ ? 412 : 287,
 rank: id === \student_001\ ? 42000 : 78000
 },
 linkedin: {
 username: id === \student_001\ ? \rajesh-kumar\ : \priya-sharma\,
 headline: id === \student_001\ ? \Full Stack Developer\ : \Backend Developer\,
 skills: id === \student_001\ ? [\Python\, \React\, \AWS\] : [\Java\, \Spring Boot\, \Microservices\],
 experience_years: id === \student_001\ ? 2 : 1
 }
 })
 setLoading(false)
 }, 500)
 }, [id])

 if (loading) return <div className=\flex justify-center items-center min-h-screen\>Loading profile...</div>
 if (!profile) return <div>Profile not found</div>

 return (
 <div className=\min-h-screen bg-background\>
 <Navbar />
 
 <main className=\max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12\>
 <Link href=\/candidates\ className=\flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition w-fit\>
 <ArrowLeft size={16} />
 <span>Back to Candidates</span>
 </Link>

 <div className=\grid grid-cols-1 lg:grid-cols-3 gap-8\>
 {/* Left Column: Profile Card */}
 <div className=\space-y-6\>
 <Card className=\bg-card/50 border-border/40 p-8 text-center\>
 <div className=\w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center text-white text-5xl font-bold mb-6 shadow-xl shadow-accent/20\>
 {profile.name.charAt(0)}
 </div>
 <h1 className=\text-2xl font-bold mb-2\>{profile.name}</h1>
 <p className=\text-muted-foreground mb-6\>{profile.linkedin.headline}</p>
 
 <div className=\flex justify-center gap-4\>
 <Button variant=\outline\ size=\icon\ className=\rounded-full\>
 <Github size={18} />
 </Button>
 <Button variant=\outline\ size=\icon\ className=\rounded-full\>
 <Linkedin size={18} />
 </Button>
 <Button variant=\outline\ size=\icon\ className=\rounded-full\>
 <Mail size={18} />
 </Button>
 </div>
 </Card>

 <Card className=\bg-card/50 border-border/40 p-6 space-y-4\>
 <h3 className=\font-bold uppercase tracking-wider text-xs text-muted-foreground\>Education</h3>
 <div>
 <div className=\flex items-start gap-3\>
 <School size={16} className=\mt-1 text-accent\ />
 <div>
 <p className=\font-bold\>{profile.college}</p>
 <p className=\text-sm text-muted-foreground\>{profile.major}</p>
 <p className=\text-xs text-muted-foreground mt-1\>Batch of {profile.batch_year}</p>
 </div>
 </div>
 </div>
 </Card>
 </div>

 {/* Right Column: Stats & Skills */}
 <div className=\lg:col-span-2 space-y-8\>
 <div className=\grid grid-cols-1 md:grid-cols-3 gap-4\>
 <Card className=\p-6 bg-card/50 border-border/40\>
 <div className=\flex items-center gap-3 mb-2\>
 <Github className=\text-white\ size={20} />
 <span className=\font-bold\>GitHub</span>
 </div>
 <p className=\text-3xl font-bold\>{profile.github.repos}</p>
 <p className=\text-xs text-muted-foreground uppercase\>Repositories</p>
 </Card>
 <Card className=\p-6 bg-card/50 border-border/40\>
 <div className=\flex items-center gap-3 mb-2\>
 <Code className=\text-yellow-500\ size={20} />
 <span className=\font-bold\>LeetCode</span>
 </div>
 <p className=\text-3xl font-bold\>{profile.leetcode.problems_solved}</p>
 <p className=\text-xs text-muted-foreground uppercase\>Problems Solved</p>
 </Card>
 <Card className=\p-6 bg-card/50 border-border/40\>
 <div className=\flex items-center gap-3 mb-2\>
 <Award className=\text-blue-500\ size={20} />
 <span className=\font-bold\>Experience</span>
 </div>
 <p className=\text-3xl font-bold\>{profile.linkedin.experience_years}</p>
 <p className=\text-xs text-muted-foreground uppercase\>Years</p>
 </Card>
 </div>

 <Card className=\bg-card/50 border-border/40 p-8\>
 <h2 className=\text-xl font-bold mb-6\>Top Skills</h2>
 <div className=\flex flex-wrap gap-2\>
 {profile.linkedin.skills.map((skill) => (
 <Badge key={skill} variant=\secondary\ className=\px-4 py-2 text-sm bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20\>
 {skill}
 </Badge>
 ))}
 </div>
 </Card>

 <Card className=\bg-card/50 border-border/40 p-8\>
 <h2 className=\text-xl font-bold mb-6\>Languages</h2>
 <div className=\space-y-4\>
 {profile.github.languages.map((lang) => (
 <div key={lang} className=\flex items-center justify-between\>
 <span className=\font-medium\>{lang}</span>
 <Progress value={Math.floor(Math.random() * 40) + 60} className=\w-1/2 h-2\ />
 </div>
 ))}
 </div>
 </Card>
 </div>
 </div>
 </main>
 </div>
 )
}

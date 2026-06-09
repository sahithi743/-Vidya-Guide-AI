'use client'

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { Briefcase, Building2, MapPin, Search, Plus } from "lucide-react"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  tags: string[]
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      setJobs([
        {
          id: "job_001",
          title: "Senior Full Stack Engineer",
          company: "TechCorp India",
          location: "Bangalore / Remote",
          type: "Full-time",
          salary: "₹25L - ₹45L",
          tags: ["React", "Node.js", "Python"]
        },
        {
          id: "job_002",
          title: "Backend Developer",
          company: "DataSystems",
          location: "Hyderabad",
          type: "Full-time",
          salary: "₹18L - ₹30L",
          tags: ["Go", "PostgreSQL", "Redis"]
        },
        {
          id: "job_003",
          title: "DevOps Engineer",
          company: "CloudInfra",
          location: "Remote",
          type: "Contract",
          salary: "₹20L - ₹35L",
          tags: ["AWS", "Kubernetes", "Terraform"]
        }
      ])
      setLoading(false)
    }, 500)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Available Jobs</h1>
            <p className="text-muted-foreground">Manage and monitor your job postings</p>
          </div>
          <Link href="/jobs/new">
            <Button className="bg-accent hover:bg-blue-600 gap-2 h-12 px-6">
              <Plus size={20} /> Create New Job
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input 
            type="text" 
            placeholder="Search by role company or skills..."
            className="w-full bg-card/50 border border-border/40 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-accent transition"
          />
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading jobs...</div>
          ) : (
            jobs.map(job => (
              <Card key={job.id} className="p-6 bg-card/50 border-border/40 hover:border-accent/40 transition group">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex gap-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-background to-card border border-border/40 flex items-center justify-center text-accent">
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold mb-1 group-hover:text-accent transition">{job.title}</h2>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Building2 size={14} /> {job.company}</span>
                        <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                        <span className="font-bold text-foreground/80">{job.salary}</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        {job.tags.map(tag => (
                          <span key={tag} className="text-[10px] px-2 py-1 bg-accent/10 text-accent rounded-md border border-accent/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex md:flex-col justify-between items-end gap-4 min-w-[150px]">
                    <span className="px-3 py-1 bg-background border border-border/40 rounded-full text-xs font-semibold">
                      {job.type}
                    </span>
                    <Link href={"/rankings"}>
                      <Button variant="outline" className="w-full h-10 px-6 font-bold">
                        Analyze Candidates
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

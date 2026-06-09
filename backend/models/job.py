"""Job posting data models"""

from pydantic import BaseModel
from typing import List, Optional

class JobRequirements(BaseModel):
    """Job requirements specification"""
    required_skills: List[str] = []
    preferred_skills: List[str] = []
    experience_years: int = 0
    difficulty_level: str = "intermediate"  # beginner, intermediate, advanced, expert
    keywords: List[str] = []

class JobPosting(BaseModel):
    """Complete job posting"""
    id: str
    title: str
    company: str = ""
    description: str
    requirements: JobRequirements
    seniority_level: str = "mid-level"  # entry, mid-level, senior
    location: str = "Remote"
    salary_range: str = ""
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "id": "job_001",
                "title": "Senior Full Stack Engineer",
                "company": "TechCorp",
                "description": "We're looking for a full stack engineer with 3+ years of experience...",
                "requirements": {
                    "required_skills": ["Python", "React", "PostgreSQL", "AWS"],
                    "preferred_skills": ["Docker", "Kubernetes", "GraphQL"],
                    "experience_years": 3,
                    "difficulty_level": "intermediate",
                    "keywords": ["backend", "frontend", "cloud"]
                },
                "seniority_level": "mid-level",
                "location": "San Francisco, CA",
                "salary_range": "$150K - $200K"
            }
        }

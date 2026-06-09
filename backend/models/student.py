"""Student profile data models"""

from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict

class GithubData(BaseModel):
    """GitHub profile data"""
    username: str
    repos: int = 0
    stars: int = 0
    languages: List[str] = []
    recent_commits: int = 0
    contribution_streak: int = 0
    followers: int = 0

class LeetCodeData(BaseModel):
    """LeetCode profile data"""
    username: str
    problems_solved: int = 0
    easy: int = 0
    medium: int = 0
    hard: int = 0
    topics: List[str] = []
    rank: int = 1000000
    acceptance_rate: float = 0.0

class LinkedInData(BaseModel):
    """LinkedIn profile data"""
    username: str
    headline: str = ""
    skills: List[str] = []
    endorsements: Dict[str, int] = {}
    experience_years: int = 0
    certifications: List[str] = []
    education: List[str] = []

class StudentProfile(BaseModel):
    """Complete student profile"""
    id: str
    name: str
    email: Optional[EmailStr] = None
    college: str = ""
    major: str = ""
    batch_year: int = 0
    github: GithubData
    leetcode: LeetCodeData
    linkedin: LinkedInData
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "id": "student_001",
                "name": "John Doe",
                "email": "john@example.com",
                "college": "MIT",
                "major": "Computer Science",
                "batch_year": 2024,
                "github": {
                    "username": "johndoe",
                    "repos": 45,
                    "stars": 312,
                    "languages": ["Python", "JavaScript", "Java"],
                    "recent_commits": 156,
                    "contribution_streak": 45,
                    "followers": 123
                },
                "leetcode": {
                    "username": "johndoe",
                    "problems_solved": 287,
                    "easy": 95,
                    "medium": 142,
                    "hard": 50,
                    "topics": ["Dynamic Programming", "Trees", "Graphs"],
                    "rank": 125000,
                    "acceptance_rate": 87.5
                },
                "linkedin": {
                    "username": "johndoe",
                    "headline": "Full Stack Developer",
                    "skills": ["Python", "React", "AWS", "PostgreSQL"],
                    "endorsements": {"Python": 45, "React": 38},
                    "experience_years": 3,
                    "certifications": ["AWS Certified"],
                    "education": ["B.S. Computer Science"]
                }
            }
        }

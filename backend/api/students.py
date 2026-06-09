"""Student profile endpoints"""

from fastapi import APIRouter, HTTPException
from typing import List
from models import StudentProfile
from services import data_aggregator

router = APIRouter()

@router.get("/students", response_model=List[StudentProfile])
async def list_students():
    """Get all students"""
    students = data_aggregator.get_all_students()
    return students

@router.get("/students/{student_id}", response_model=StudentProfile)
async def get_student(student_id: str):
    """Get a specific student"""
    student = data_aggregator.get_student(student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@router.get("/students/{student_id}/activity")
async def get_student_activity(student_id: str):
    """Get student activity data from multiple sources"""
    student = data_aggregator.get_student(student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    return {
        "github": {
            "repos": student.github.repos,
            "stars": student.github.stars,
            "recent_commits": student.github.recent_commits,
            "contribution_streak": student.github.contribution_streak,
            "languages": student.github.languages
        },
        "leetcode": {
            "problems_solved": student.leetcode.problems_solved,
            "easy": student.leetcode.easy,
            "medium": student.leetcode.medium,
            "hard": student.leetcode.hard,
            "rank": student.leetcode.rank
        },
        "linkedin": {
            "skills": student.linkedin.skills,
            "endorsements": student.linkedin.endorsements,
            "experience_years": student.linkedin.experience_years,
            "certifications": student.linkedin.certifications
        }
    }

@router.get("/students/search/{query}", response_model=List[StudentProfile])
async def search_students(query: str):
    """Search students by name or email"""
    results = data_aggregator.search_students(query)
    return results

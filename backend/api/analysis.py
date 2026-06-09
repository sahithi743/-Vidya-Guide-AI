"""AI analysis endpoints"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services import ai_analyzer, job_matcher, data_aggregator
from typing import Optional

router = APIRouter()

class JobDescriptionRequest(BaseModel):
    """Request to analyze job description"""
    description: str

class SkillMatchRequest(BaseModel):
    """Request to analyze skill match"""
    student_id: str
    job_id: str

@router.post("/analysis/job-requirements")
async def analyze_job_requirements(request: JobDescriptionRequest):
    """Extract job requirements from description using AI"""
    
    if not request.description or len(request.description) < 10:
        raise HTTPException(status_code=400, detail="Job description too short")
    
    requirements = ai_analyzer.analyze_job_requirements(request.description)
    
    return {
        "analysis": requirements,
        "status": "success"
    }

@router.post("/analysis/skill-match")
async def analyze_skill_match(request: SkillMatchRequest):
    """Analyze skill match between student and job"""
    
    student = data_aggregator.get_student(request.student_id)
    job = data_aggregator.get_job(request.job_id)
    
    if not student or not job:
        raise HTTPException(status_code=404, detail="Student or job not found")
    
    # Create match profile
    match_profile = job_matcher.create_match_profile(student, job)
    
    return {
        "student_id": request.student_id,
        "job_id": request.job_id,
        "match_profile": match_profile,
        "status": "success"
    }

@router.get("/analysis/student/{student_id}/skills")
async def get_student_skills(student_id: str):
    """Get detailed skills analysis for a student"""
    
    student = data_aggregator.get_student(student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    return {
        "student_id": student_id,
        "name": student.name,
        "linkedin_skills": student.linkedin.skills,
        "endorsed_skills": student.linkedin.endorsements,
        "github_languages": student.github.languages,
        "leetcode_topics": student.leetcode.topics,
        "total_endorsements": sum(student.linkedin.endorsements.values()),
        "skill_strength": {
            "languages": "Strong" if len(student.github.languages) >= 3 else "Developing",
            "problem_solving": "Expert" if student.leetcode.problems_solved > 400 else "Advanced" if student.leetcode.problems_solved > 200 else "Developing",
            "practical_experience": "Experienced" if student.github.repos > 30 else "Active" if student.github.repos > 10 else "Learning"
        }
    }

@router.get("/analysis/job/{job_id}/difficulty")
async def analyze_job_difficulty(job_id: str):
    """Analyze difficulty and requirements of a job"""
    
    job = data_aggregator.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    return {
        "job_id": job_id,
        "title": job.title,
        "difficulty": job.requirements.difficulty_level,
        "experience_required": job.requirements.experience_years,
        "required_skills_count": len(job.requirements.required_skills),
        "required_skills": job.requirements.required_skills,
        "preferred_skills": job.requirements.preferred_skills,
        "skill_diversity": len(set(job.requirements.required_skills + job.requirements.preferred_skills)),
        "requirements_complexity": "High" if len(job.requirements.required_skills) > 5 else "Medium" if len(job.requirements.required_skills) > 3 else "Low"
    }

@router.get("/analysis/student/{student_id}/recommendations")
async def get_learning_recommendations(student_id: str, job_id: Optional[str] = None):
    """Get AI-generated learning recommendations for a student"""
    
    student = data_aggregator.get_student(student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    recommendations = []
    
    # Analyze gaps and suggest improvements
    
    # GitHub activity recommendations
    if student.github.recent_commits < 50:
        recommendations.append({
            "category": "GitHub Activity",
            "priority": "High",
            "suggestion": "Increase code contributions - aim for at least 5 commits per week",
            "benefit": "Demonstrates consistent practical experience"
        })
    
    if len(student.github.languages) < 3:
        recommendations.append({
            "category": "Programming Languages",
            "priority": "High",
            "suggestion": "Learn additional programming languages (target: Python, JavaScript, Java)",
            "benefit": "Increases job compatibility and adaptability"
        })
    
    # LeetCode recommendations
    if student.leetcode.problems_solved < 200:
        recommendations.append({
            "category": "Problem Solving",
            "priority": "High",
            "suggestion": "Practice more algorithmic problems on LeetCode (target: 300+ problems)",
            "benefit": "Improves coding interview readiness"
        })
    
    if student.leetcode.hard < 30:
        recommendations.append({
            "category": "Algorithm Mastery",
            "priority": "Medium",
            "suggestion": "Focus on hard-level problems, especially Dynamic Programming and Graphs",
            "benefit": "Prepares for advanced technical interviews"
        })
    
    # LinkedIn recommendations
    if len(student.linkedin.skills) < 6:
        recommendations.append({
            "category": "Skills Portfolio",
            "priority": "Medium",
            "suggestion": "Expand LinkedIn skills section to cover: Python, JavaScript, React, AWS, Docker, PostgreSQL",
            "benefit": "Better visibility to recruiters"
        })
    
    if student.linkedin.experience_years < 1:
        recommendations.append({
            "category": "Experience",
            "priority": "Medium",
            "suggestion": "Pursue internships or freelance projects to gain practical experience",
            "benefit": "Essential for senior role applications"
        })
    
    # Job-specific recommendations
    if job_id:
        job = data_aggregator.get_job(job_id)
        if job:
            gaps = job_matcher.get_skill_gaps(student, job)
            if gaps:
                recommendations.append({
                    "category": "Role-Specific",
                    "priority": "High",
                    "suggestion": f"Learn {', '.join(gaps[:3])} for the {job.title} position",
                    "benefit": f"Increases match for target job"
                })
    
    return {
        "student_id": student_id,
        "name": student.name,
        "recommendations_count": len(recommendations),
        "recommendations": recommendations,
        "overall_assessment": "Strong foundation - continue building projects" if len(recommendations) <= 2 else "Good potential - focus on skill gaps" if len(recommendations) <= 4 else "Significant room for growth - prioritize recommendations"
    }

"""Job matching and skill analysis service"""

from models import StudentProfile, JobPosting
from typing import Dict, List, Tuple

def calculate_skill_match(student: StudentProfile, job: JobPosting) -> float:
    """Calculate skill match percentage between student and job"""
    
    job_skills = set(job.requirements.required_skills + job.requirements.preferred_skills)
    student_skills = set(student.linkedin.skills)
    
    if not job_skills:
        return 0.0
    
    matching = len(job_skills & student_skills)
    return (matching / len(job_skills)) * 100

def get_skill_gaps(student: StudentProfile, job: JobPosting) -> List[str]:
    """Get list of missing skills"""
    
    job_skills = set(job.requirements.required_skills)
    student_skills = set(student.linkedin.skills)
    
    return list(job_skills - student_skills)

def get_skill_overlap(student: StudentProfile, job: JobPosting) -> List[str]:
    """Get overlapping skills"""
    
    job_skills = set(job.requirements.required_skills + job.requirements.preferred_skills)
    student_skills = set(student.linkedin.skills)
    
    return list(job_skills & student_skills)

def get_programming_language_match(student: StudentProfile, job: JobPosting) -> Tuple[List[str], List[str]]:
    """Get matching and missing programming languages"""
    
    job_languages = set(job.requirements.required_skills)
    student_languages = set(student.github.languages)
    
    matching = list(job_languages & student_languages)
    missing = list(job_languages - student_languages)
    
    return matching, missing

def get_topic_coverage(student: StudentProfile, job: JobPosting) -> float:
    """Calculate topic coverage from LeetCode for job difficulty"""
    
    leetcode = student.leetcode
    difficulty = job.requirements.difficulty_level
    
    total_problems = leetcode.easy + leetcode.medium + leetcode.hard
    
    if total_problems == 0:
        return 0.0
    
    if difficulty == "beginner":
        return (leetcode.easy / total_problems) * 100
    elif difficulty == "intermediate":
        return ((leetcode.easy + leetcode.medium) / total_problems) * 100
    else:  # advanced/expert
        return (leetcode.hard / total_problems) * 100

def create_match_profile(student: StudentProfile, job: JobPosting) -> Dict:
    """Create comprehensive match profile"""
    
    skill_match_pct = calculate_skill_match(student, job)
    gaps = get_skill_gaps(student, job)
    overlap = get_skill_overlap(student, job)
    lang_match, lang_gaps = get_programming_language_match(student, job)
    topic_coverage = get_topic_coverage(student, job)
    
    experience_fit = student.linkedin.experience_years >= job.requirements.experience_years
    
    return {
        "skill_match_percentage": skill_match_pct,
        "matched_skills": overlap,
        "missing_skills": gaps,
        "language_match": lang_match,
        "language_gaps": lang_gaps,
        "topic_coverage": topic_coverage,
        "experience_fit": experience_fit,
        "experience_gap": max(0, job.requirements.experience_years - student.linkedin.experience_years),
        "endorsement_strength": sum(student.linkedin.endorsements.values()),
        "GitHub_activity_level": "High" if student.github.recent_commits > 100 else "Medium" if student.github.recent_commits > 20 else "Low",
        "LeetCode_consistency": student.leetcode.problems_solved > 200
    }

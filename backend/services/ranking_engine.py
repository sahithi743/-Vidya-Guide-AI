"""Core ranking algorithm service"""

from models import StudentProfile, JobPosting, RankingResult, ComponentScores, RankingExplanation
from typing import List, Dict, Tuple
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

# Scoring weights
GITHUB_WEIGHT = 0.35
LEETCODE_WEIGHT = 0.35
LINKEDIN_WEIGHT = 0.30

def calculate_github_score(student: StudentProfile, job: JobPosting) -> float:
    """Calculate GitHub score based on match with job requirements"""
    score = 0.0
    
    github = student.github
    job_skills = set(job.requirements.required_skills + job.requirements.preferred_skills)
    student_languages = set(github.languages)
    
    # Language match (40 points)
    language_overlap = job_skills & student_languages
    if job_skills:
        language_score = (len(language_overlap) / len(job_skills)) * 40
        score += language_score
    
    # Repository quality (30 points)
    repo_score = min((github.repos / 50) * 30, 30)
    score += repo_score
    
    # Contribution activity (20 points)
    commit_score = min((github.recent_commits / 500) * 20, 20)
    score += commit_score
    
    # Normalize to 0-100
    score = min(score, 100)
    return max(0, score)

def calculate_leetcode_score(student: StudentProfile, job: JobPosting) -> float:
    """Calculate LeetCode score based on problem-solving proficiency"""
    score = 0.0
    
    leetcode = student.leetcode
    job_difficulty = job.requirements.difficulty_level
    
    # Problems solved (30 points)
    problems_score = min((leetcode.problems_solved / 500) * 30, 30)
    score += problems_score
    
    # Difficulty distribution (40 points)
    if job_difficulty == "beginner":
        difficulty_score = (leetcode.easy / max(leetcode.easy + leetcode.medium + leetcode.hard, 1)) * 40
    elif job_difficulty == "intermediate":
        medium_ratio = (leetcode.medium / max(leetcode.easy + leetcode.medium + leetcode.hard, 1))
        difficulty_score = (0.5 * medium_ratio + 0.3 * (1 - medium_ratio)) * 40
    else:  # advanced/expert
        hard_ratio = (leetcode.hard / max(leetcode.easy + leetcode.medium + leetcode.hard, 1))
        difficulty_score = hard_ratio * 40
    score += max(0, difficulty_score)
    
    # Topic coverage (20 points)
    job_topics = set(job.requirements.keywords)
    student_topics = set(leetcode.topics)
    if job_topics:
        topic_score = (len(job_topics & student_topics) / len(job_topics)) * 20
        score += topic_score
    else:
        score += 20  # Full points if no specific topics required
    
    # Acceptance rate bonus (10 points)
    acceptance_bonus = (leetcode.acceptance_rate / 100) * 10
    score += acceptance_bonus
    
    # Normalize to 0-100
    score = min(score, 100)
    return max(0, score)

def calculate_linkedin_score(student: StudentProfile, job: JobPosting) -> float:
    """Calculate LinkedIn score based on experience and skills"""
    score = 0.0
    
    linkedin = student.linkedin
    job_skills = set(job.requirements.required_skills)
    job_exp_years = job.requirements.experience_years
    
    # Skill match (40 points)
    student_skills = set(linkedin.skills)
    skill_overlap = job_skills & student_skills
    if job_skills:
        skill_score = (len(skill_overlap) / len(job_skills)) * 40
        score += skill_score
    
    # Skill endorsements (30 points)
    total_endorsements = sum(linkedin.endorsements.values())
    endorsement_score = min((total_endorsements / 200) * 30, 30)
    score += endorsement_score
    
    # Experience level (20 points)
    exp_score = min((linkedin.experience_years / job_exp_years) * 20, 20)
    score += exp_score
    
    # Certifications (10 points)
    cert_score = min((len(linkedin.certifications) * 5), 10)
    score += cert_score
    
    # Normalize to 0-100
    score = min(score, 100)
    return max(0, score)

def rank_candidates(
    students: List[StudentProfile],
    job: JobPosting
) -> Tuple[List[RankingResult], Dict[str, float]]:
    """
    Rank all students for a given job.
    Returns: (ranked results, component scores for each student)
    """
    rankings = []
    component_scores_map = {}
    
    for student in students:
        # Calculate component scores
        github_score = calculate_github_score(student, job)
        leetcode_score = calculate_leetcode_score(student, job)
        linkedin_score = calculate_linkedin_score(student, job)
        
        # Calculate total score
        total_score = (
            github_score * GITHUB_WEIGHT +
            leetcode_score * LEETCODE_WEIGHT +
            linkedin_score * LINKEDIN_WEIGHT
        )
        
        # Store component scores
        component_scores_map[student.id] = {
            "github": github_score,
            "leetcode": leetcode_score,
            "linkedin": linkedin_score,
            "total": total_score
        }
        
        # Create ranking result (explanation will be added by AI analyzer)
        ranking = RankingResult(
            job_id=job.id,
            candidate_id=student.id,
            candidate_name=student.name,
            rank=0,  # Will be set after sorting
            total_score=round(total_score, 2),
            component_scores=ComponentScores(
                github=round(github_score, 2),
                leetcode=round(leetcode_score, 2),
                linkedin=round(linkedin_score, 2)
            ),
            explanation=RankingExplanation(
                summary="AI explanation pending...",
                strengths=[],
                gaps=[],
                recommendations=[],
                skill_match_percentage=0.0,
                experience_alignment=""
            ),
            timestamp=datetime.now().isoformat()
        )
        rankings.append(ranking)
    
    # Sort by total score (descending)
    rankings.sort(key=lambda x: x.total_score, reverse=True)
    
    # Assign ranks
    for i, ranking in enumerate(rankings, 1):
        ranking.rank = i
    
    logger.info(f"Ranked {len(rankings)} candidates for job {job.id}")
    return rankings, component_scores_map

def calculate_match_details(
    student: StudentProfile,
    job: JobPosting,
    component_scores: Dict[str, float]
) -> Dict:
    """Calculate detailed match analysis"""
    job_skills = set(job.requirements.required_skills)
    student_skills = set(student.linkedin.skills)
    
    matched_skills = job_skills & student_skills
    missing_skills = job_skills - student_skills
    extra_skills = student_skills - job_skills
    
    return {
        "matched_skills": list(matched_skills),
        "missing_skills": list(missing_skills),
        "extra_skills": list(extra_skills),
        "skill_match_percentage": (len(matched_skills) / len(job_skills) * 100) if job_skills else 0,
        "languages_overlap": list(set(job.requirements.required_skills) & set(student.github.languages)),
        "experience_fit": student.linkedin.experience_years >= job.requirements.experience_years
    }

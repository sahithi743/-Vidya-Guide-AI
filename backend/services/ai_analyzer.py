"""AI analyzer service using Google Gemini API"""

import google.generativeai as genai
from models import StudentProfile, JobPosting, RankingResult, RankingExplanation
from typing import Optional, Dict
import logging
import os
import json

logger = logging.getLogger(__name__)

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    try:
        genai.configure(api_key=GEMINI_API_KEY)
        MODEL = genai.GenerativeModel('gemini-1.5-flash')
        logger.info("Gemini API configured successfully")
    except Exception as e:
        logger.warning(f"Failed to configure Gemini API: {e}")
        MODEL = None
else:
    logger.warning("GEMINI_API_KEY not set. Using mock explanations.")
    MODEL = None

def generate_explanation(
    student: StudentProfile,
    job: JobPosting,
    ranking: RankingResult,
    match_details: Dict
) -> RankingExplanation:
    """Generate AI-powered explanation for ranking"""
    
    if MODEL:
        try:
            return _generate_gemini_explanation(student, job, ranking, match_details)
        except Exception as e:
            logger.error(f"Error generating Gemini explanation: {e}")
            return _generate_mock_explanation(student, job, ranking, match_details)
    else:
        return _generate_mock_explanation(student, job, ranking, match_details)

def _generate_gemini_explanation(
    student: StudentProfile,
    job: JobPosting,
    ranking: RankingResult,
    match_details: Dict
) -> RankingExplanation:
    """Generate explanation using Gemini API"""
    
    prompt = f"""
    Analyze the match between a student and a job posting. Provide structured feedback.
    
    STUDENT PROFILE:
    Name: {student.name}
    Skills: {', '.join(student.linkedin.skills)}
    Experience: {student.linkedin.experience_years} years
    GitHub Repos: {student.github.repos}
    LeetCode Problems Solved: {student.leetcode.problems_solved}
    
    JOB REQUIREMENTS:
    Title: {job.title}
    Required Skills: {', '.join(job.requirements.required_skills)}
    Preferred Skills: {', '.join(job.requirements.preferred_skills)}
    Experience Required: {job.requirements.experience_years} years
    
    MATCH ANALYSIS:
    Overall Score: {ranking.total_score}/100
    GitHub Score: {ranking.component_scores.github}/100
    LeetCode Score: {ranking.component_scores.leetcode}/100
    LinkedIn Score: {ranking.component_scores.linkedin}/100
    
    Matched Skills: {', '.join(match_details.get('matched_skills', []))}
    Missing Skills: {', '.join(match_details.get('missing_skills', []))}
    
    Provide a JSON response with:
    {{
        "summary": "One sentence overall assessment",
        "strengths": ["strength 1", "strength 2", "strength 3"],
        "gaps": ["gap 1", "gap 2"],
        "recommendations": ["recommendation 1", "recommendation 2"],
        "experience_alignment": "How well experience aligns (one sentence)"
    }}
    
    IMPORTANT: Respond ONLY with valid JSON, no markdown or extra text.
    """
    
    try:
        response = MODEL.generate_content(prompt)
        response_text = response.text.strip()
        
        # Parse JSON response
        if response_text.startswith("```"):
            # Extract JSON from code block if present
            response_text = response_text.split("```")[1]
            if response_text.startswith("json"):
                response_text = response_text[4:]
        
        explanation_data = json.loads(response_text)
        
        return RankingExplanation(
            summary=explanation_data.get("summary", "Strong candidate match"),
            strengths=explanation_data.get("strengths", []),
            gaps=explanation_data.get("gaps", []),
            recommendations=explanation_data.get("recommendations", []),
            skill_match_percentage=match_details.get("skill_match_percentage", 0),
            experience_alignment=explanation_data.get("experience_alignment", "")
        )
    
    except Exception as e:
        logger.error(f"Error parsing Gemini response: {e}")
        return _generate_mock_explanation(student, job, ranking, match_details)

def _generate_mock_explanation(
    student: StudentProfile,
    job: JobPosting,
    ranking: RankingResult,
    match_details: Dict
) -> RankingExplanation:
    """Generate mock explanation (fallback)"""
    
    matched_skills = match_details.get("matched_skills", [])
    missing_skills = match_details.get("missing_skills", [])
    skill_match = match_details.get("skill_match_percentage", 0)
    
    # Create intelligent mock explanation based on actual data
    if ranking.total_score >= 80:
        summary = f"Excellent match for the {job.title} position. Strong alignment across technical skills and experience."
    elif ranking.total_score >= 60:
        summary = f"Good fit for the {job.title} role with solid technical foundation and relevant experience."
    else:
        summary = f"Potential candidate for {job.title}. Recommend focused skill development in key areas."
    
    strengths = []
    if ranking.component_scores.github >= 70:
        strengths.append(f"Strong GitHub presence with {student.github.repos} repositories")
    if ranking.component_scores.leetcode >= 70:
        strengths.append(f"Solid problem-solving skills - {student.leetcode.problems_solved} LeetCode problems solved")
    if ranking.component_scores.linkedin >= 70:
        strengths.append(f"Well-endorsed skills matching job requirements ({student.linkedin.experience_years}+ years exp)")
    
    if not strengths:
        strengths = matched_skills[:3] if matched_skills else ["Problem-solving ability", "Learning potential"]
    
    gaps = missing_skills[:2] if missing_skills else ["Advanced specialization"]
    
    recommendations = []
    if missing_skills:
        recommendations.append(f"Develop expertise in: {', '.join(missing_skills[:2])}")
    if student.linkedin.experience_years < job.requirements.experience_years:
        recommendations.append(f"Gain more industry experience ({job.requirements.experience_years - student.linkedin.experience_years} more years recommended)")
    if student.leetcode.problems_solved < 300:
        recommendations.append("Practice more algorithmic problems on LeetCode")
    
    if not recommendations:
        recommendations = ["Continue building projects on GitHub", "Maintain consistent practice"]
    
    exp_alignment = "Meets experience requirements" if student.linkedin.experience_years >= job.requirements.experience_years else "Below experience requirements"
    
    return RankingExplanation(
        summary=summary,
        strengths=strengths,
        gaps=gaps,
        recommendations=recommendations,
        skill_match_percentage=skill_match,
        experience_alignment=exp_alignment
    )

def analyze_job_requirements(job_description: str) -> Dict:
    """Extract structured requirements from job description using AI"""
    
    if not MODEL:
        return _mock_job_analysis(job_description)
    
    try:
        prompt = f"""
        Analyze this job description and extract key requirements:
        
        JOB DESCRIPTION:
        {job_description}
        
        Provide JSON response with:
        {{
            "required_skills": ["skill1", "skill2", ...],
            "preferred_skills": ["skill1", "skill2", ...],
            "experience_years": <number>,
            "difficulty_level": "beginner|intermediate|advanced|expert",
            "keywords": ["keyword1", "keyword2", ...],
            "summary": "One line summary"
        }}
        
        IMPORTANT: Respond ONLY with valid JSON.
        """
        
        response = MODEL.generate_content(prompt)
        response_text = response.text.strip()
        
        if response_text.startswith("```"):
            response_text = response_text.split("```")[1]
            if response_text.startswith("json"):
                response_text = response_text[4:]
        
        return json.loads(response_text)
    
    except Exception as e:
        logger.error(f"Error analyzing job requirements: {e}")
        return _mock_job_analysis(job_description)

def _mock_job_analysis(job_description: str) -> Dict:
    """Mock job analysis (fallback)"""
    
    # Simple keyword extraction
    keywords = []
    common_skills = [
        "python", "java", "javascript", "react", "node.js", "aws", "docker",
        "kubernetes", "postgresql", "mongodb", "mysql", "sql", "linux",
        "git", "api", "rest", "graphql", "microservices", "cloud"
    ]
    
    job_lower = job_description.lower()
    for skill in common_skills:
        if skill in job_lower:
            keywords.append(skill.title())
    
    experience = 1  # Default
    if "3+" in job_description or "3 years" in job_description:
        experience = 3
    elif "5+" in job_description or "5 years" in job_description:
        experience = 5
    
    difficulty = "intermediate"
    if "senior" in job_lower:
        difficulty = "advanced"
    elif "junior" in job_lower or "entry" in job_lower:
        difficulty = "beginner"
    
    return {
        "required_skills": keywords[:4] if keywords else ["Python", "JavaScript"],
        "preferred_skills": keywords[4:6] if len(keywords) > 4 else [],
        "experience_years": experience,
        "difficulty_level": difficulty,
        "keywords": keywords,
        "summary": "Job requires " + ", ".join(keywords[:2]) if keywords else "General software development role"
    }

"""Ranking result data models"""

from pydantic import BaseModel
from typing import List, Optional

class ComponentScores(BaseModel):
    """Individual component scores"""
    github: float = 0.0
    leetcode: float = 0.0
    linkedin: float = 0.0

class RankingExplanation(BaseModel):
    """AI-generated explanation for ranking"""
    summary: str
    strengths: List[str] = []
    gaps: List[str] = []
    recommendations: List[str] = []
    skill_match_percentage: float = 0.0
    experience_alignment: str = ""

class RankingResult(BaseModel):
    """Complete ranking result for a candidate"""
    job_id: str
    candidate_id: str
    candidate_name: str
    rank: int
    total_score: float
    component_scores: ComponentScores
    explanation: RankingExplanation
    match_details: Optional[dict] = None
    timestamp: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "job_id": "job_001",
                "candidate_id": "student_001",
                "candidate_name": "John Doe",
                "rank": 1,
                "total_score": 87.5,
                "component_scores": {
                    "github": 85,
                    "leetcode": 78,
                    "linkedin": 92
                },
                "explanation": {
                    "summary": "Strong match for this role due to relevant experience and skills",
                    "strengths": ["Python expertise", "React experience", "AWS knowledge"],
                    "gaps": ["Limited Kubernetes experience", "No GraphQL background"],
                    "recommendations": ["Learn Kubernetes basics", "Practice GraphQL patterns"],
                    "skill_match_percentage": 92.5,
                    "experience_alignment": "Perfect alignment with senior requirements"
                }
            }
        }

class RankingResponse(BaseModel):
    """Response containing all rankings for a job"""
    job_id: str
    job_title: str
    total_candidates: int
    rankings: List[RankingResult]
    generated_at: Optional[str] = None

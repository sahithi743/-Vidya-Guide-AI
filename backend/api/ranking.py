"""Ranking generation endpoints"""

from fastapi import APIRouter, HTTPException
from typing import List, Optional
from models import RankingResult, RankingResponse
from services import data_aggregator, ranking_engine, ai_analyzer, job_matcher
from datetime import datetime
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/rankings/generate", response_model=RankingResponse)
async def generate_rankings(job_id: str):
    """Generate rankings for a specific job"""
    
    # Get job details
    job = data_aggregator.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    # Get all students
    students = data_aggregator.get_all_students()
    if not students:
        raise HTTPException(status_code=404, detail="No students found")
    
    logger.info(f"Generating rankings for job {job_id} against {len(students)} students")
    
    # Generate rankings
    rankings, component_scores = ranking_engine.rank_candidates(students, job)
    
    # Add AI-generated explanations and match details
    enriched_rankings = []
    for ranking in rankings:
        student = data_aggregator.get_student(ranking.candidate_id)
        if student:
            # Get match details
            match_details = ranking_engine.calculate_match_details(student, job, component_scores[student.id])
            
            # Generate AI explanation
            explanation = ai_analyzer.generate_explanation(student, job, ranking, match_details)
            
            ranking.explanation = explanation
            ranking.match_details = match_details
        
        enriched_rankings.append(ranking)
    
    return RankingResponse(
        job_id=job.id,
        job_title=job.title,
        total_candidates=len(enriched_rankings),
        rankings=enriched_rankings,
        generated_at=datetime.now().isoformat()
    )

@router.get("/rankings/{job_id}", response_model=RankingResponse)
async def get_rankings(job_id: str):
    """Get cached rankings for a job (without regenerating)"""
    # For now, this regenerates. In production, could cache results.
    return await generate_rankings(job_id)

@router.get("/rankings/{job_id}/{student_id}", response_model=RankingResult)
async def get_candidate_ranking(job_id: str, student_id: str):
    """Get detailed ranking for a specific candidate on a job"""
    
    # Get job and student
    job = data_aggregator.get_job(job_id)
    student = data_aggregator.get_student(student_id)
    
    if not job or not student:
        raise HTTPException(status_code=404, detail="Job or student not found")
    
    # Generate ranking
    rankings, component_scores = ranking_engine.rank_candidates([student], job)
    
    if not rankings:
        raise HTTPException(status_code=500, detail="Failed to generate ranking")
    
    ranking = rankings[0]
    
    # Add AI explanation and match details
    match_details = ranking_engine.calculate_match_details(student, job, component_scores[student.id])
    explanation = ai_analyzer.generate_explanation(student, job, ranking, match_details)
    
    ranking.explanation = explanation
    ranking.match_details = match_details
    
    return ranking

@router.post("/rankings/compare")
async def compare_candidates(job_id: str, student_ids: List[str]):
    """Compare multiple candidates for a job"""
    
    job = data_aggregator.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    students = [data_aggregator.get_student(sid) for sid in student_ids if data_aggregator.get_student(sid)]
    
    if not students:
        raise HTTPException(status_code=404, detail="No students found")
    
    # Generate rankings
    rankings, component_scores = ranking_engine.rank_candidates(students, job)
    
    # Sort by total score
    rankings.sort(key=lambda x: x.total_score, reverse=True)
    
    return {
        "job_id": job_id,
        "job_title": job.title,
        "total_candidates": len(rankings),
        "rankings": rankings,
        "comparison": {
            "top_scorer": rankings[0].candidate_name if rankings else None,
            "top_score": rankings[0].total_score if rankings else 0,
            "average_score": sum(r.total_score for r in rankings) / len(rankings) if rankings else 0
        }
    }

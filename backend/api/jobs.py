"""Job posting endpoints"""

from fastapi import APIRouter, HTTPException
from typing import List
from models import JobPosting
from services import data_aggregator
import uuid
from datetime import datetime

router = APIRouter()

@router.get("/jobs", response_model=List[JobPosting])
async def list_jobs():
    """Get all job postings"""
    jobs = data_aggregator.get_all_jobs()
    return jobs

@router.get("/jobs/{job_id}", response_model=JobPosting)
async def get_job(job_id: str):
    """Get a specific job posting"""
    job = data_aggregator.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.post("/jobs", response_model=JobPosting)
async def create_job(job: JobPosting):
    """Create a new job posting"""
    # If no ID provided, generate one
    if not job.id or job.id.startswith("job_"):
        job.id = f"job_{uuid.uuid4().hex[:8]}"
    
    job.created_at = datetime.now().isoformat()
    job.updated_at = datetime.now().isoformat()
    
    created_job = data_aggregator.create_job(job)
    return created_job

@router.delete("/jobs/{job_id}")
async def delete_job(job_id: str):
    """Delete a job posting"""
    if not data_aggregator.get_job(job_id):
        raise HTTPException(status_code=404, detail="Job not found")
    
    success = data_aggregator.delete_job(job_id)
    if success:
        return {"message": f"Job {job_id} deleted successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to delete job")

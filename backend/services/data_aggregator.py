"""Mock data aggregator service"""

import json
import os
from typing import List, Dict, Optional
from models import StudentProfile, JobPosting
import logging

logger = logging.getLogger(__name__)

# In-memory storage
students_cache: Dict[str, StudentProfile] = {}
jobs_cache: Dict[str, JobPosting] = {}

def load_mock_data():
    """Load mock data from JSON files"""
    global students_cache, jobs_cache
    
    data_dir = os.path.join(os.path.dirname(__file__), "../data")
    
    # Load students
    try:
        with open(os.path.join(data_dir, "mock_students.json"), "r") as f:
            students_data = json.load(f)
            for student_data in students_data:
                student = StudentProfile(**student_data)
                students_cache[student.id] = student
        logger.info(f"Loaded {len(students_cache)} students")
    except Exception as e:
        logger.error(f"Error loading students: {e}")
        # Create sample student if file not found
        _create_sample_students()
    
    # Load jobs
    try:
        with open(os.path.join(data_dir, "mock_jobs.json"), "r") as f:
            jobs_data = json.load(f)
            for job_data in jobs_data:
                job = JobPosting(**job_data)
                jobs_cache[job.id] = job
        logger.info(f"Loaded {len(jobs_cache)} jobs")
    except Exception as e:
        logger.error(f"Error loading jobs: {e}")
        # Create sample jobs if file not found
        _create_sample_jobs()

def _create_sample_students():
    """Create sample student data if mock file not found"""
    global students_cache
    from models import GithubData, LeetCodeData, LinkedInData
    
    sample_students = [
        {
            "id": "student_001",
            "name": "Rajesh Kumar",
            "email": "rajesh@example.com",
            "college": "IIT Delhi",
            "major": "Computer Science",
            "batch_year": 2024,
            "github": GithubData(
                username="rajesh_dev",
                repos=42,
                stars=285,
                languages=["Python", "JavaScript", "Java"],
                recent_commits=234,
                contribution_streak=45,
                followers=156
            ),
            "leetcode": LeetCodeData(
                username="rajesh_lc",
                problems_solved=412,
                easy=125,
                medium=198,
                hard=89,
                topics=["Dynamic Programming", "Graphs", "Trees", "Greedy"],
                rank=42000,
                acceptance_rate=87.5
            ),
            "linkedin": LinkedInData(
                username="rajesh-kumar",
                headline="Full Stack Developer | Python | JavaScript",
                skills=["Python", "JavaScript", "React", "Node.js", "PostgreSQL", "AWS"],
                endorsements={"Python": 89, "JavaScript": 76, "React": 62},
                experience_years=2,
                certifications=["AWS Solutions Architect", "Google Cloud Associate"],
                education=["B.Tech Computer Science"]
            )
        },
        {
            "id": "student_002",
            "name": "Priya Sharma",
            "email": "priya@example.com",
            "college": "BITS Pilani",
            "major": "Computer Science",
            "batch_year": 2024,
            "github": GithubData(
                username="priya_codes",
                repos=28,
                stars=145,
                languages=["Java", "Python", "C++"],
                recent_commits=156,
                contribution_streak=30,
                followers=89
            ),
            "leetcode": LeetCodeData(
                username="priya_lc",
                problems_solved=287,
                easy=95,
                medium=142,
                hard=50,
                topics=["Dynamic Programming", "Linked Lists", "Trees"],
                rank=78000,
                acceptance_rate=85.0
            ),
            "linkedin": LinkedInData(
                username="priya-sharma",
                headline="Backend Developer | Java | System Design",
                skills=["Java", "Python", "Spring Boot", "PostgreSQL", "Microservices"],
                endorsements={"Java": 95, "Python": 67},
                experience_years=1,
                certifications=["Oracle Java Associate"],
                education=["B.Tech Computer Science"]
            )
        },
        {
            "id": "student_003",
            "name": "Arjun Patel",
            "email": "arjun@example.com",
            "college": "NIT Bombay",
            "major": "Computer Science",
            "batch_year": 2023,
            "github": GithubData(
                username="arjun_dev",
                repos=56,
                stars=432,
                languages=["Python", "Go", "Rust", "JavaScript"],
                recent_commits=345,
                contribution_streak=67,
                followers=234
            ),
            "leetcode": LeetCodeData(
                username="arjun_lc",
                problems_solved=567,
                easy=145,
                medium=287,
                hard=135,
                topics=["Advanced DP", "Graphs", "System Design"],
                rank=8000,
                acceptance_rate=91.0
            ),
            "linkedin": LinkedInData(
                username="arjun-patel",
                headline="Senior Backend Engineer | Distributed Systems",
                skills=["Python", "Go", "Kubernetes", "AWS", "System Design"],
                endorsements={"Python": 142, "Go": 98},
                experience_years=4,
                certifications=["AWS Solutions Architect Professional"],
                education=["B.Tech Computer Science", "M.Tech Cloud Computing"]
            )
        }
    ]
    
    for student_data in sample_students:
        student = StudentProfile(**student_data)
        students_cache[student.id] = student
    logger.info(f"Created {len(students_cache)} sample students")

def _create_sample_jobs():
    """Create sample job data if mock file not found"""
    global jobs_cache
    from models import JobRequirements
    
    sample_jobs = [
        {
            "id": "job_001",
            "title": "Senior Full Stack Engineer",
            "company": "TechCorp India",
            "description": "Looking for an experienced full stack engineer to lead our platform development...",
            "requirements": JobRequirements(
                required_skills=["Python", "React", "PostgreSQL", "AWS"],
                preferred_skills=["Docker", "Kubernetes", "GraphQL"],
                experience_years=3,
                difficulty_level="intermediate"
            ),
            "seniority_level": "mid-level",
            "location": "Bangalore, India",
            "salary_range": "₹25L - ₹35L"
        },
        {
            "id": "job_002",
            "title": "Backend Developer",
            "company": "DataSystems",
            "description": "Join our backend team to build scalable microservices...",
            "requirements": JobRequirements(
                required_skills=["Java", "Spring Boot", "PostgreSQL", "Microservices"],
                preferred_skills=["Kubernetes", "Message Queues"],
                experience_years=2,
                difficulty_level="intermediate"
            ),
            "seniority_level": "mid-level",
            "location": "Remote",
            "salary_range": "₹20L - ₹28L"
        },
        {
            "id": "job_003",
            "title": "DevOps Engineer",
            "company": "CloudInfra",
            "description": "Help us build and maintain our cloud infrastructure...",
            "requirements": JobRequirements(
                required_skills=["Kubernetes", "Docker", "AWS", "Go"],
                preferred_skills=["Terraform", "CI/CD", "Prometheus"],
                experience_years=3,
                difficulty_level="intermediate"
            ),
            "seniority_level": "mid-level",
            "location": "Pune, India",
            "salary_range": "₹24L - ₹32L"
        }
    ]
    
    for job_data in sample_jobs:
        job = JobPosting(**job_data)
        jobs_cache[job.id] = job
    logger.info(f"Created {len(jobs_cache)} sample jobs")

def get_all_students() -> List[StudentProfile]:
    """Get all students from cache"""
    return list(students_cache.values())

def get_student(student_id: str) -> Optional[StudentProfile]:
    """Get a specific student"""
    return students_cache.get(student_id)

def get_all_jobs() -> List[JobPosting]:
    """Get all jobs from cache"""
    return list(jobs_cache.values())

def get_job(job_id: str) -> Optional[JobPosting]:
    """Get a specific job"""
    return jobs_cache.get(job_id)

def create_job(job: JobPosting) -> JobPosting:
    """Create a new job posting"""
    jobs_cache[job.id] = job
    logger.info(f"Created job: {job.id}")
    return job

def delete_job(job_id: str) -> bool:
    """Delete a job posting"""
    if job_id in jobs_cache:
        del jobs_cache[job_id]
        logger.info(f"Deleted job: {job_id}")
        return True
    return False

def search_students(query: str) -> List[StudentProfile]:
    """Search students by name or email"""
    query_lower = query.lower()
    results = []
    for student in students_cache.values():
        if (query_lower in student.name.lower() or 
            (student.email and query_lower in student.email.lower())):
            results.append(student)
    return results

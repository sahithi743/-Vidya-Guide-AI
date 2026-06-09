"""
Smart AI-Driven Student Skill & Placement Support Platform
FastAPI Backend Application
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=os.getenv("LOG_LEVEL", "INFO"))
logger = logging.getLogger(__name__)

# Import routes
from api import students, jobs, ranking, analysis, health
from services import data_aggregator
from config import settings

# Lifespan event
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    # Startup
    logger.info("Starting up...")
    data_aggregator.load_mock_data()
    logger.info("Mock data loaded successfully")
    yield
    # Shutdown
    logger.info("Shutting down...")

# Create FastAPI app
app = FastAPI(
    title="Student Skill & Placement Platform API",
    description="AI-powered candidate ranking system",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
cors_origin = os.getenv("CORS_ORIGIN", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origin,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/api", tags=["Health"])
app.include_router(students.router, prefix="/api", tags=["Students"])
app.include_router(jobs.router, prefix="/api", tags=["Jobs"])
app.include_router(ranking.router, prefix="/api", tags=["Ranking"])
app.include_router(analysis.router, prefix="/api", tags=["Analysis"])

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to Student Skill & Placement Platform API",
        "version": "1.0.0",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8000)),
        reload=os.getenv("ENVIRONMENT", "development") == "development"
    )

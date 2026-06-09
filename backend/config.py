"""Configuration management for the FastAPI application"""

from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    """Application settings"""
    
    # API Configuration
    app_name: str = "Student Skill & Placement Platform"
    debug: bool = os.getenv("DEBUG", "False") == "True"
    environment: str = os.getenv("ENVIRONMENT", "development")
    
    # Server Configuration
    host: str = os.getenv("HOST", "0.0.0.0")
    port: int = int(os.getenv("PORT", 8000))
    
    # CORS Configuration
    cors_origin: str = os.getenv("CORS_ORIGIN", "http://localhost:3000")
    
    # AI Configuration
    gemini_api_key: Optional[str] = os.getenv("GEMINI_API_KEY")
    ai_model: str = "gemini-1.5-flash"
    
    # Data Configuration
    mock_data_path: str = "./data"
    
    # Logging Configuration
    log_level: str = os.getenv("LOG_LEVEL", "INFO")
    
    class Config:
        env_file = ".env"
        case_sensitive = False

# Create settings instance
settings = Settings()

# Validate critical settings
if not settings.gemini_api_key and settings.environment == "production":
    raise ValueError("GEMINI_API_KEY must be set in production environment")

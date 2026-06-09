# Backend Setup Guide

## Quick Start

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Set Environment Variables

Create a `.env` file in the `backend/` directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=INFO
PORT=8000
HOST=0.0.0.0
```

### 3. Run the Server

```bash
# Development
uvicorn main:app --reload --port 8000

# Production
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind 0.0.0.0:8000
```

The API will be available at `http://localhost:8000`
API documentation at `http://localhost:8000/docs`

## File Structure

```
backend/
├── main.py                    # FastAPI application entry point
├── requirements.txt           # Python dependencies
├── .env.example               # Example environment variables
├── config.py                  # Configuration management
├── data/
│   ├── mock_students.json     # Mock student data
│   ├── mock_jobs.json         # Mock job postings
│   └── mock_activities.json   # Mock GitHub/LeetCode/LinkedIn data
├── api/
│   ├── __init__.py
│   ├── students.py            # Student profile endpoints
│   ├── jobs.py                # Job management endpoints
│   ├── ranking.py             # Ranking generation endpoints
│   └── analysis.py            # AI analysis endpoints
├── services/
│   ├── __init__.py
│   ├── ranking_engine.py      # Core ranking algorithm
│   ├── ai_analyzer.py         # Gemini AI integration
│   ├── data_aggregator.py     # Mock data management
│   └── explainer.py           # AI explanation generator
├── models/
│   ├── __init__.py
│   ├── student.py             # Student data models
│   ├── job.py                 # Job data models
│   └── ranking.py             # Ranking data models
└── utils/
    ├── __init__.py
    ├── validators.py          # Input validation
    └── scoring.py             # Scoring utilities
```

## Dependencies

Key Python packages:
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `pydantic` - Data validation
- `google-generativeai` - Gemini API integration
- `python-dotenv` - Environment variable management
- `pydantic-settings` - Settings management
- `pytest` - Testing framework
- `httpx` - Async HTTP client (for testing)

## API Testing

Use FastAPI's auto-generated Swagger UI:
1. Start the server: `uvicorn main:app --reload`
2. Open: `http://localhost:8000/docs`
3. Test endpoints directly from the UI

## Mock Data

Mock data is stored in JSON files for quick development:
- `data/mock_students.json` - 50 student profiles
- `data/mock_jobs.json` - 10 job postings
- `data/mock_activities.json` - Activity data per student

To load mock data, the services automatically load from these files on startup.

## Performance Notes

- All data is in-memory after initial load
- Ranking computation on large datasets (100+ candidates) may take 10-30 seconds
- Gemini API calls are rate-limited by default
- Consider adding async processing for production use

## Troubleshooting

### Gemini API Error
```
Error: "API_KEY not found"
Solution: Ensure GEMINI_API_KEY is set in .env file
```

### CORS Issues
```
Error: "CORS policy: No 'Access-Control-Allow-Origin' header"
Solution: Check CORS_ORIGIN in .env matches your frontend URL
```

### Port Already in Use
```
Error: "Address already in use"
Solution: Change PORT in .env or use: uvicorn main:app --port 8001
```

## Production Deployment

### Docker
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "main:app"]
```

### Environment Setup
1. Use environment secrets (not .env files)
2. Enable HTTPS in production
3. Implement rate limiting
4. Add authentication/authorization if needed
5. Set up logging and monitoring

## Development Workflow

1. Write tests first: `tests/test_ranking.py`
2. Run tests: `pytest -v`
3. Implement features in services
4. Add API endpoints
5. Test with FastAPI docs UI
6. Update frontend integration

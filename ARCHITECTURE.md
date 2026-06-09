# Smart AI-Driven Student Skill & Placement Support Platform

## System Architecture

### Overview
A stateless, AI-powered platform that ranks candidates based on their GitHub, LeetCode, and LinkedIn activity against job descriptions using real-time data and Google Gemini for intelligent analysis.

### Technology Stack
- **Frontend**: Next.js 16 (React 19) with Tailwind CSS
- **Backend**: Python FastAPI (separate deployment)
- **AI/ML**: Google Gemini API for ranking, analysis, and explanations
- **Data**: In-memory structures + mock APIs + JSON for temporary storage
- **Real-time**: WebSocket support for live updates

---

## Core Components

### 1. Backend Architecture (Python FastAPI)

```
backend/
├── main.py                          # FastAPI app initialization
├── requirements.txt                 # Python dependencies
├── config.py                        # Configuration settings
├── data/
│   ├── mock_students.json          # Mock student profiles
│   ├── mock_jobs.json              # Mock job postings
│   └── mock_activities.json        # Mock GitHub/LeetCode/LinkedIn data
├── api/
│   ├── students.py                 # Student profile endpoints
│   ├── jobs.py                     # Job management endpoints
│   ├── ranking.py                  # Core ranking algorithm
│   ├── analysis.py                 # AI analysis endpoints
│   └── health.py                   # Health check endpoints
├── services/
│   ├── ranking_engine.py           # Weighted scoring algorithm
│   ├── ai_analyzer.py              # Gemini integration
│   ├── data_aggregator.py          # Mock data from multiple sources
│   ├── job_matcher.py              # Job-skill matching
│   └── explainer.py                # AI-generated explanations
├── models/
│   ├── student.py                  # Student data model
│   ├── job.py                      # Job posting model
│   └── ranking.py                  # Ranking result model
└── utils/
    ├── scoring.py                  # Scoring utilities
    └── validators.py               # Input validation
```

### 2. Frontend Architecture (Next.js)

```
/app
├── layout.tsx                      # Root layout with theme
├── globals.css                     # Theme design tokens
├── page.tsx                        # Home page
├── (dashboard)/
│   ├── layout.tsx                  # Dashboard layout
│   ├── page.tsx                    # Dashboard home
│   ├── candidates/
│   │   ├── page.tsx                # Candidate listing
│   │   └── [id]/page.tsx           # Candidate detail view
│   ├── jobs/
│   │   ├── page.tsx                # Job listing
│   │   ├── [id]/page.tsx           # Job detail view
│   │   └── new/page.tsx            # Create new job
│   └── rankings/
│       ├── page.tsx                # Rankings dashboard
│       └── [jobId]/page.tsx        # Rankings for specific job
└── api/
    ├── proxy/[...path].ts          # API proxy to backend
    └── mock/
        ├── students.ts             # Mock data endpoints
        └── jobs.ts                 # Mock data endpoints

components/
├── candidates/
│   ├── CandidateCard.tsx           # Candidate display card
│   ├── CandidateDetail.tsx         # Full candidate profile
│   └── CandidateList.tsx           # Candidate listing with filters
├── jobs/
│   ├── JobCard.tsx                 # Job display card
│   ├── JobForm.tsx                 # Job creation/editing
│   └── JobDetail.tsx               # Full job details
├── rankings/
│   ├── RankingsList.tsx            # Ranked candidates list
│   ├── RankingChart.tsx            # Visualization of rankings
│   └── ExplanationCard.tsx         # AI-generated explanation
├── analysis/
│   ├── SkillMatcher.tsx            # Skill matching visualization
│   ├── InsightCard.tsx             # AI insights display
│   └── ComparisonView.tsx          # Multi-candidate comparison
├── common/
│   ├── Header.tsx                  # Page header
│   ├── Sidebar.tsx                 # Navigation sidebar
│   └── LoadingState.tsx            # Loading indicators
└── ui/                             # shadcn/ui components
```

### 3. Data Flow

```
User Input (Job Description)
         ↓
[Job Analyzer Service] - NLP preprocessing, requirement extraction
         ↓
[Mock Data Aggregator] - Fetch student profiles & activity data
         ↓
[Ranking Engine] - Calculate scores based on:
  - GitHub: repos, languages, commits, stars
  - LeetCode: problems solved, difficulty, topics
  - LinkedIn: skills, endorsements, certifications
         ↓
[AI Analyzer (Gemini)] - Generate explanations for each ranking
         ↓
[Ranking Results] - Sorted candidates with scores & insights
         ↓
Frontend Dashboard - Visualize rankings & explanations
```

---

## Core Algorithms

### 1. Ranking Score Calculation

```
Total Score = (
  GitHubScore * 0.35 +
  LeetCodeScore * 0.35 +
  LinkedInScore * 0.30
)

Score Range: 0-100
```

**GitHub Score Components:**
- Repository quality (stars, forks, contributions)
- Language diversity (weighted by job requirements)
- Commit frequency and consistency
- Project relevance to job type

**LeetCode Score Components:**
- Problems solved at matching difficulty levels
- Topic coverage (intersection with job skills)
- Consistency of practice
- Difficulty level progression

**LinkedIn Score Components:**
- Skill endorsements (matching job requirements)
- Years of relevant experience
- Certifications and education
- Project and achievement indicators

### 2. Job-Skill Matcher

```
1. Extract job requirements using Gemini NLP
2. Create skill vector from job description
3. For each candidate:
   - Extract skills from profiles
   - Calculate skill overlap score
   - Apply relevance weights
4. Return match score (0-100)
```

### 3. AI-Generated Explanations

```
For each ranking decision:
1. Identify top 3 matching skills
2. Identify top 3 missing skills
3. Highlight key strengths
4. Suggest improvement areas
5. Generate career recommendations

Format: Transparent, explainable text
Use: Gemini's prompt engineering for consistency
```

---

## API Endpoints

### Backend API (http://localhost:8000)

#### Students
- `GET /api/students` - List all students
- `GET /api/students/{id}` - Get student profile
- `GET /api/students/{id}/activity` - Get student activity data
- `POST /api/students/search` - Search students by criteria

#### Jobs
- `GET /api/jobs` - List all jobs
- `GET /api/jobs/{id}` - Get job details
- `POST /api/jobs` - Create new job
- `DELETE /api/jobs/{id}` - Delete job

#### Rankings
- `POST /api/rankings/generate` - Generate rankings for job
- `GET /api/rankings/{job_id}` - Get rankings for specific job
- `GET /api/rankings/{job_id}/{student_id}` - Get detailed ranking for candidate

#### Analysis
- `POST /api/analysis/job-requirements` - Extract job requirements
- `POST /api/analysis/skill-match` - Analyze skill match
- `POST /api/analysis/explain-ranking` - Get explanation for ranking

#### Health
- `GET /api/health` - Health check

### Frontend API (Next.js API Routes)
- `/api/proxy/*` - Proxy requests to Python backend
- `/api/mock/students` - Mock student data
- `/api/mock/jobs` - Mock job data

---

## Mock Data Structure

### Student Profile
```json
{
  "id": "student_001",
  "name": "John Doe",
  "email": "john@example.com",
  "github": {
    "username": "johndoe",
    "repos": 45,
    "stars": 312,
    "languages": ["Python", "JavaScript", "Java"],
    "recent_commits": 156
  },
  "leetcode": {
    "username": "johndoe",
    "problems_solved": 287,
    "easy": 95,
    "medium": 142,
    "hard": 50,
    "topics": ["Dynamic Programming", "Trees", "Graphs"],
    "rank": 125000
  },
  "linkedin": {
    "username": "johndoe",
    "headline": "Full Stack Developer",
    "skills": ["Python", "React", "AWS", "PostgreSQL"],
    "endorsements": {"Python": 45, "React": 38},
    "experience_years": 3
  }
}
```

### Job Posting
```json
{
  "id": "job_001",
  "title": "Senior Full Stack Engineer",
  "description": "We're looking for a full stack engineer...",
  "requirements": {
    "required_skills": ["Python", "React", "PostgreSQL", "AWS"],
    "preferred_skills": ["Docker", "Kubernetes"],
    "experience_years": 3,
    "difficulty_level": "intermediate"
  }
}
```

### Ranking Result
```json
{
  "job_id": "job_001",
  "candidate_id": "student_001",
  "rank": 1,
  "total_score": 87.5,
  "component_scores": {
    "github": 85,
    "leetcode": 78,
    "linkedin": 92
  },
  "explanation": "Strong match due to...",
  "strengths": ["Python expertise", "React experience"],
  "gaps": ["Kubernetes experience"],
  "recommendations": ["Focus on Kubernetes..."]
}
```

---

## Real-time Processing

### WebSocket Events (Optional Enhancement)
- `ranking_started` - When ranking computation begins
- `candidate_processed` - Each candidate's ranking completes
- `ranking_complete` - All rankings finished
- `analysis_updated` - AI analysis complete

---

## Deployment Strategy

### Development
```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Frontend
npm run dev
```

### Production
- Frontend: Vercel deployment (auto-detected Next.js)
- Backend: Python container (Docker / Cloud Run / EC2)
- Environment Variables:
  - `GEMINI_API_KEY` - Google Gemini API key
  - `BACKEND_URL` - Python backend URL
  - `CORS_ORIGIN` - Frontend origin for CORS

---

## Security Considerations

1. **API Rate Limiting**: Implement rate limiting for ranking computations
2. **Input Validation**: Validate all job descriptions and student data
3. **CORS Policy**: Restrict cross-origin requests
4. **API Key Management**: Secure storage of Gemini API key
5. **Data Privacy**: No persistent storage of sensitive data

---

## Future Enhancements

1. **Real-time Data Integration**: Direct GitHub/LeetCode/LinkedIn API calls
2. **Historical Analytics**: Cache rankings for comparison
3. **Personalized Recommendations**: ML-based learning path suggestions
4. **Doubt Assistance Chatbot**: AI-powered Q&A system
5. **Contest Integration**: Real-time contest data and rankings
6. **Interview Preparation**: AI-driven interview prep system
7. **Multi-language Support**: Support for multiple programming languages

---

## Testing Strategy

1. **Unit Tests**: Test ranking algorithm with known data
2. **Integration Tests**: Test API endpoints
3. **E2E Tests**: Test full user workflows
4. **Performance Tests**: Test ranking speed with large datasets
5. **AI Output Quality**: Manual review of explanations

---

## Documentation

- Full API documentation: Available in `backend/docs`
- Component documentation: See individual component files
- Setup guide: See `SETUP.md`
- Deployment guide: See `DEPLOYMENT.md`

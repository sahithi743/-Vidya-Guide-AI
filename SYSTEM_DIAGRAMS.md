# System Diagrams & Flow Charts

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                            │
│                   (Next.js 16 + React 19)                        │
│                                                                  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────────┐ │
│  │  Home Page   │ │  Dashboard   │ │  Rankings & Candidates   │ │
│  └──────┬───────┘ └──────┬───────┘ └───────────┬──────────────┘ │
│         │                │                     │                │
└─────────┼────────────────┼─────────────────────┼────────────────┘
          │                │                     │
          └────────────────┴─────────────────────┘
                           │
                    API Calls (fetch)
                           │
          ┌────────────────┼─────────────────────┐
          │                │                     │
┌─────────▼────────────────────────────────────────────────────────┐
│              NEXT.JS API ROUTES (Proxy Layer)                    │
│                                                                   │
│  GET /api/students    ──┐                                        │
│  GET /api/jobs        ──┼──→ Mock Data / Backend Proxy           │
│  GET /api/rankings    ──┘                                        │
│                                                                   │
│  Falls back to mock data if backend unavailable                 │
└─────────────────────────┬──────────────────────────────────────┘
                          │
                          │ (Optional: Connect to)
                          │
      ┌───────────────────▼──────────────────────┐
      │                                          │
┌─────▼──────────────────────────────────────────────────────────┐
│          PYTHON FASTAPI BACKEND (http://localhost:8000)         │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ API ROUTES                                                 │ │
│  │ ├─ GET /api/students                                      │ │
│  │ ├─ POST /api/jobs                                         │ │
│  │ ├─ POST /api/rankings/generate                            │ │
│  │ ├─ POST /api/analysis/job-requirements                    │ │
│  │ └─ More endpoints...                                      │ │
│  └────────────┬──────────────────────────────────────────────┘ │
│               │                                                 │
│  ┌────────────▼──────────────────────────────────────────────┐ │
│  │ SERVICE LAYER                                              │ │
│  │ ├─ data_aggregator (load mock data, manage cache)         │ │
│  │ ├─ ranking_engine (calculate scores)                      │ │
│  │ ├─ ai_analyzer (Gemini integration)                       │ │
│  │ ├─ job_matcher (skill analysis)                           │ │
│  │ └─ explainer (mock explanations)                          │ │
│  └────────────┬──────────────────────────────────────────────┘ │
│               │                                                 │
│  ┌────────────▼──────────────────────────────────────────────┐ │
│  │ DATA LAYER (In-Memory)                                     │ │
│  │ ├─ 3 Mock Students (profiles, skills, activity)           │ │
│  │ ├─ 3 Mock Jobs (requirements, descriptions)               │ │
│  │ └─ No persistent storage (stateless)                      │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ EXTERNAL API (Optional)                                     │ │
│  │ └─ Google Gemini API (AI explanations & analysis)          │ │
│  │    (Graceful fallback if not available)                    │ │
│  └────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────┘
```

## 2. Ranking Generation Flow

```
┌──────────────────────┐
│   User Selects Job   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────────────────────────┐
│  Frontend Calls /api/rankings?job_id=X   │
└──────────┬───────────────────────────────┘
           │
           ▼
┌────────────────────────────────────────────────────┐
│  Backend: Load Job Requirements                    │
│  ├─ Get required skills                           │
│  ├─ Get preferred skills                          │
│  ├─ Get experience level                          │
│  └─ Get difficulty level                          │
└──────────┬─────────────────────────────────────────┘
           │
           ▼
┌────────────────────────────────────────────────────┐
│  Backend: Load All Student Profiles                │
│  ├─ GitHub data (repos, languages, commits)       │
│  ├─ LeetCode data (problems, difficulty)          │
│  └─ LinkedIn data (skills, endorsements)          │
└──────────┬─────────────────────────────────────────┘
           │
           ▼
┌────────────────────────────────────────────────────┐
│  For Each Student: Calculate Scores                │
│                                                     │
│  GitHub Score = (                                  │
│    language_match * 0.4 +                          │
│    repo_quality * 0.3 +                            │
│    commit_activity * 0.2 +                         │
│    stars * 0.1                                     │
│  ) normalized to 0-100                             │
│                                                     │
│  LeetCode Score = (                                │
│    problems_solved * 0.3 +                         │
│    difficulty_fit * 0.4 +                          │
│    topic_coverage * 0.2 +                          │
│    acceptance_rate * 0.1                           │
│  ) normalized to 0-100                             │
│                                                     │
│  LinkedIn Score = (                                │
│    skill_match * 0.4 +                             │
│    endorsements * 0.3 +                            │
│    experience_fit * 0.2 +                          │
│    certifications * 0.1                            │
│  ) normalized to 0-100                             │
│                                                     │
│  Total Score = (                                   │
│    GitHub * 0.35 +                                 │
│    LeetCode * 0.35 +                               │
│    LinkedIn * 0.30                                 │
│  )                                                 │
└──────────┬─────────────────────────────────────────┘
           │
           ▼
┌────────────────────────────────────────────────────┐
│  Sort Students by Total Score (Descending)         │
│                                                     │
│  1. Student A: 87.5/100                            │
│  2. Student B: 76.3/100                            │
│  3. Student C: 65.1/100                            │
└──────────┬─────────────────────────────────────────┘
           │
           ▼
┌────────────────────────────────────────────────────┐
│  For Each Ranked Student: Generate Explanation     │
│                                                     │
│  Method 1: Using Gemini AI                         │
│  ├─ Send profile, job, scores to Gemini           │
│  ├─ Get intelligent explanation                   │
│  └─ Extract strengths, gaps, recommendations      │
│                                                     │
│  Method 2: Fallback (No Gemini)                    │
│  ├─ Analyze skill overlap                         │
│  ├─ Identify gaps automatically                   │
│  └─ Generate smart recommendations                │
└──────────┬─────────────────────────────────────────┘
           │
           ▼
┌────────────────────────────────────────────────────┐
│  Return Results to Frontend                        │
│                                                     │
│  Response = {                                      │
│    job_id: "job_001",                              │
│    rankings: [                                     │
│      {                                             │
│        rank: 1,                                    │
│        candidate_name: "Student A",                │
│        total_score: 87.5,                          │
│        component_scores: {...},                    │
│        explanation: {...}                          │
│      },                                            │
│      ...                                           │
│    ]                                               │
│  }                                                 │
└──────────┬─────────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────┐
│  Frontend: Display Rankings Beautifully  │
│  ├─ Show rank and scores                 │
│  ├─ Score breakdown charts               │
│  ├─ AI explanations                      │
│  └─ Action buttons                       │
└──────────────────────────────────────────┘
```

## 3. Component Hierarchy

```
Next.js App
│
├── RootLayout
│   ├── Header
│   └── Footer
│
├── Home Page (/)
│   ├── Hero Section
│   ├── Features Grid
│   ├── CTA Section
│   └── Footer
│
├── Dashboard (/dashboard)
│   ├── Header with Nav
│   ├── Stats Cards (3)
│   ├── Jobs List
│   └── Quick Actions
│
├── Candidates (/candidates)
│   ├── Header
│   ├── Search/Filter
│   ├── Candidate Grid
│   │   └── CandidateCard (x3)
│   │       ├── Avatar
│   │       ├── Skills
│   │       ├── Stats
│   │       └── View Button
│   └── Footer
│
├── Rankings (/rankings)
│   ├── Header
│   ├── Job Selector
│   │   └── JobCard (x3, selectable)
│   ├── Rankings List
│   │   └── RankingCard (x N)
│   │       ├── Rank Badge
│   │       ├── Score Display
│   │       ├── Component Scores
│   │       ├── Explanation
│   │       └── Action Button
│   └── Footer
│
└── Detail Pages
    ├── /candidates/[id]
    ├── /rankings/[jobId]/[studentId]
    └── /jobs/new
```

## 4. Data Model Relationships

```
┌──────────────────────────────────────────────────────────────┐
│                      JOB POSTING                             │
│                                                               │
│  id: string                                                   │
│  title: string                                                │
│  company: string                                              │
│  description: string                                          │
│  ├─ requirements: JobRequirements                             │
│  │  ├─ required_skills: string[]                             │
│  │  ├─ preferred_skills: string[]                            │
│  │  ├─ experience_years: number                              │
│  │  └─ difficulty_level: string                              │
│  └─ seniority_level: string                                   │
└──────────────────┬───────────────────────────────────────────┘
                   │ Matched Against
                   │
┌──────────────────▼───────────────────────────────────────────┐
│                  STUDENT PROFILE                             │
│                                                               │
│  id: string                                                   │
│  name: string                                                 │
│  college: string                                              │
│  ├─ github: GithubData                                        │
│  │  ├─ repos: number                                         │
│  │  ├─ stars: number                                         │
│  │  ├─ languages: string[]                                   │
│  │  └─ recent_commits: number                                │
│  ├─ leetcode: LeetCodeData                                    │
│  │  ├─ problems_solved: number                               │
│  │  ├─ hard/medium/easy: number                              │
│  │  ├─ topics: string[]                                      │
│  │  └─ rank: number                                          │
│  └─ linkedin: LinkedInData                                    │
│     ├─ skills: string[]                                      │
│     ├─ endorsements: Map<string, number>                     │
│     └─ experience_years: number                              │
└──────────────────┬───────────────────────────────────────────┘
                   │ Produces
                   │
┌──────────────────▼───────────────────────────────────────────┐
│                RANKING RESULT                                │
│                                                               │
│  job_id: string                                               │
│  candidate_id: string                                         │
│  rank: number (1, 2, 3, ...)                                 │
│  total_score: number (0-100)                                 │
│  ├─ component_scores: ComponentScores                         │
│  │  ├─ github: number                                        │
│  │  ├─ leetcode: number                                      │
│  │  └─ linkedin: number                                      │
│  └─ explanation: RankingExplanation                           │
│     ├─ summary: string                                       │
│     ├─ strengths: string[]                                   │
│     ├─ gaps: string[]                                        │
│     ├─ recommendations: string[]                             │
│     └─ experience_alignment: string                          │
└───────────────────────────────────────────────────────────────┘
```

## 5. API Call Flow

```
CLIENT REQUEST                BACKEND PROCESSING              RESPONSE
│                             │                              │
├─→ GET /api/students ────→ │ Load mock_students.json  ──→ │ 200 OK
│                             │ Return StudentProfile[] │   │
│                             │                             │
├─→ GET /api/jobs ────────→ │ Load mock_jobs.json ─────→ │ 200 OK
│                             │ Return JobPosting[]     │   │
│                             │                             │
├─→ POST /api/rankings ────→ │ 1. Load students         │   │
│   /generate                 │ 2. Calculate scores     │   │ 200 OK
│   ?job_id=X                 │ 3. Generate explanations │   │ RankingResponse
│                             │ 4. Sort & return        │   │
│                             │                             │
├─→ GET /api/analysis ────→ │ Analyze job requirements │   │ 200 OK
│   /job-requirements         │ Extract skills & levels │   │ Job Analysis
│                             │                             │
└─→ GET /api/health ──────→ │ Return OK ───────────────→ │ 200 OK
                             │                              │
```

## 6. Scoring Calculation Example

```
Job: Senior Full Stack Engineer
Required: Python, React, AWS
Preferred: Docker, Kubernetes

Student: Rajesh Kumar

GITHUB ANALYSIS
├─ Has: Python ✓, JavaScript ✓, Java ✓
├─ Repos: 42 (good)
├─ Commits: 234 (recent activity)
└─ Language Match: 1/3 = 33%
   → Score = (33% * 0.4) + (42/50 * 0.3) + (234/500 * 0.2) + (285/500 * 0.1)
   → Score = 13.2 + 25.2 + 9.36 + 5.7 = 53.46
   → Normalized: 85/100 ✓

LEETCODE ANALYSIS
├─ Problems: 412 (excellent)
├─ Hard: 89 (good for intermediate)
├─ Topics: DP, Graphs, Trees, Greedy
├─ Acceptance: 87.5% (strong)
└─ Difficulty Fit: Good
   → Score = (412/500 * 0.3) + (0.65 * 0.4) + (4/4 * 0.2) + (0.875 * 0.1)
   → Score = 24.72 + 26 + 20 + 8.75 = 79.47
   → Normalized: 78/100 ✓

LINKEDIN ANALYSIS
├─ Skills: Python ✓, JavaScript, React ✓, Node.js, AWS ✓
├─ Endorsements: 89+76+62 = 227 (strong)
├─ Experience: 2 years (meets requirement)
└─ Certifications: 2 (AWS, Google Cloud)
   → Score = (3/3 * 0.4) + (227/200 * 0.3) + (2/3 * 0.2) + (2/2 * 0.1)
   → Score = 40 + 34.05 + 13.33 + 10 = 97.38
   → Normalized: 92/100 ✓

FINAL SCORE
= (85 * 0.35) + (78 * 0.35) + (92 * 0.30)
= 29.75 + 27.30 + 27.60
= 84.65/100

RANK: 1 (Best Match) ✓
```

## 7. Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PRODUCTION ENVIRONMENT                   │
│                                                              │
│  ┌───────────────────────┐      ┌──────────────────────┐   │
│  │   Vercel (Frontend)   │      │  Cloud Run (Backend) │   │
│  │                       │      │                      │   │
│  │  - Next.js App        │      │  - FastAPI App       │   │
│  │  - Auto-deploy on     │      │  - Python Container  │   │
│  │    git push           │      │  - Auto-scale        │   │
│  │  - CDN                │      │  - Load balanced     │   │
│  │  - Analytics          │      │                      │   │
│  │                       │      │  Env Vars:           │   │
│  │  Env Vars:            │      │  - GEMINI_API_KEY    │   │
│  │  - NEXT_PUBLIC_       │      │  - CORS_ORIGIN       │   │
│  │    BACKEND_URL        │      │  - LOG_LEVEL         │   │
│  └───────┬───────────────┘      └──────────┬───────────┘   │
│          │                                 │                │
│          │  HTTPS                          │ HTTPS          │
│          │  Frontend API                   │ Backend API    │
│          │                                 │                │
│          └────────────────┬────────────────┘                │
│                           │                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Google Cloud (Gemini API)                   │   │
│  │  - API Key in environment variable                  │   │
│  │  - Rate limiting configured                         │   │
│  │  - Cost monitoring enabled                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         GitHub (Source Control)                     │   │
│  │  - Webhook triggers Vercel deployment               │   │
│  │  - Actions trigger Cloud Run build                  │   │
│  │  - CI/CD automated                                  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 8. Data Flow Timing

```
User Action: Select Job & View Rankings
│
├─ T=0ms: Click "View Rankings"
│
├─ T=50ms: Frontend sends GET /api/rankings?job_id=X
│
├─ T=100ms: Next.js route handler processes request
│
├─ T=150ms: Check if backend available
│         ├─ Success → Forward to Python backend
│         └─ Fail → Return mock data
│
├─ T=300ms: Python backend receives request
│        ├─ Load job requirements
│        ├─ Load student profiles (from cache)
│        └─ Start ranking calculations
│
├─ T=1000ms: Ranking calculations complete
│          ├─ GitHub scores (algorithm)
│          ├─ LeetCode scores (algorithm)
│          └─ LinkedIn scores (algorithm)
│
├─ T=2000ms: For each student, call Gemini API
│          ├─ Send context to Gemini
│          ├─ Receive explanation
│          └─ Parse JSON response
│
├─ T=5000ms: All explanations complete
│          ├─ Sort rankings
│          └─ Format response
│
├─ T=5100ms: Send response back to frontend
│
└─ T=5200ms: Frontend renders rankings
           ├─ Display candidates
           ├─ Show scores
           ├─ Display explanations
           └─ User can interact
```

These diagrams show:
- **System Architecture**: How components connect
- **Data Flow**: Rankings generation process
- **Component Structure**: UI hierarchy
- **Data Models**: Relationships between entities
- **API Calls**: Request/response patterns
- **Scoring Logic**: Example calculation
- **Production Setup**: Deployment topology
- **Timing**: Performance characteristics

---

For more details, see:
- ARCHITECTURE.md - Detailed system design
- README.md - Feature documentation
- QUICKSTART.md - Getting started guide

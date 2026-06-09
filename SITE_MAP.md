# Platform Site Map & Navigation Guide

## Complete Site Structure

```
Smart AI-Driven Student Skill & Placement Support Platform
│
├── Home (/)
│   ├── Feature Overview
│   ├── Hero Section
│   ├── Call-to-Action Buttons
│   └── Footer
│
├── Student Dashboard (/student) ⭐
│   ├── Personal Profile
│   ├── Skill Readiness Score (78%)
│   ├── Placement Readiness (82%)
│   ├── Technical Skills Display
│   ├── Learning Path Recommendations
│   ├── Recent Achievements
│   └── Quick Links
│
├── Instructor Analytics (/instructor) ⭐
│   ├── Cohort Metrics
│   ├── Average Skill Score
│   ├── Placement Distribution Chart
│   ├── Student Performance Table
│   ├── Sorting/Filtering
│   └── Skill Analysis
│
├── Candidate Rankings (/rankings) ⭐
│   ├── Job Selector
│   ├── Candidate Rankings (0-100%)
│   ├── Score Breakdown
│   │   ├── GitHub Activity (35%)
│   │   ├── LeetCode Score (35%)
│   │   └── LinkedIn Profile (30%)
│   ├── Candidate Cards
│   ├── Skill Matches
│   ├── Skill Gaps
│   └── AI Explanations
│
├── AI Career Chat (/ai-chat) ⭐
│   ├── Chat Interface
│   ├── Message History
│   ├── Suggestion Buttons
│   │   ├── Resume Tips
│   │   ├── Interview Prep
│   │   ├── Skill Development
│   │   └── Career Guidance
│   └── AI Response Generation
│
├── Feature Showcase (/showcase) ⭐ NEW!
│   ├── All Features Overview
│   ├── API Endpoints Reference
│   ├── Platform Statistics
│   ├── Tech Stack Info
│   ├── Documentation Links
│   └── Quick Navigation
│
├── Dashboard (/dashboard)
│   ├── Job Overview
│   ├── Quick Stats
│   └── Quick Links
│
└── Candidates (/candidates)
    ├── Candidate List
    ├── Profile Cards
    └── Skills Display
```

## Navigation Flow

### From Home Page
```
Home (/)
  ├─→ Feature Showcase (/showcase)
  ├─→ View Rankings (/rankings)
  └─→ Student Dashboard (/student)
```

### From Navbar (Available on all pages except home)
```
Navigation Menu
  ├─→ Home (/)
  ├─→ Student (/student)
  ├─→ Instructor (/instructor)
  ├─→ Rankings (/rankings)
  └─→ AI Support (/ai-chat)
```

### From Feature Showcase
```
Showcase (/showcase)
  ├─→ Student Dashboard (/student)
  ├─→ Instructor Analytics (/instructor)
  ├─→ Candidate Rankings (/rankings)
  ├─→ AI Career Chat (/ai-chat)
  ├─→ Dashboard (/dashboard)
  └─→ Candidates (/candidates)
```

## Page Descriptions & Key Features

### 1. Home Page (/)
**Purpose**: Landing page and platform introduction
- Hero section with value proposition
- Feature highlights with icons
- Call-to-action buttons
- Professional header with navigation
- Footer with links

**Key Content**:
- "AI-Powered Candidate Ranking" heading
- 5 key features listed
- 4 feature cards with benefits
- Ready to start section

**Navigation Links**:
- Get Started → /showcase
- View Candidates → /candidates
- Create Job → (removed - use /rankings)
- View Rankings → /rankings

---

### 2. Student Dashboard (/student)
**Purpose**: Personal skill assessment and learning recommendations
- Displays individual student profile
- Shows skill metrics and scores
- Recommends learning paths
- Tracks achievements

**Key Features**:
- Name & profile info (Arjun Patel)
- Skill Readiness Score: 78%
- Placement Readiness Score: 82%
- Technical Skills: Python, JavaScript, React, PostgreSQL, AWS
- Learning Path recommendations
- Recent Achievements
- Quick links to rankings and AI chat

**Data Source**: `/api/student`

**Best For**: Students checking their profile and learning recommendations

---

### 3. Instructor Analytics (/instructor)
**Purpose**: Cohort performance monitoring and analytics
- Real-time metrics dashboard
- Student performance comparison
- Skill distribution analysis
- Placement readiness tracking

**Key Features**:
- Cohort Statistics Section
  - Total Students: 3
  - Average Skill Score: 78.3%
  - Placement Readiness: 82.3%
  
- Interactive Charts
  - Placement Readiness Distribution
  - Skills Distribution Heatmap
  
- Student Performance Table
  - Sortable columns
  - Name, Email, Skills, Scores
  - Status badges

**Data Source**: 
- `/api/instructor/metrics`
- `/api/instructor/students`

**Best For**: Instructors monitoring class progress and identifying at-risk students

---

### 4. Candidate Rankings (/rankings)
**Purpose**: AI-powered job-candidate matching system
- Ranks candidates for specific jobs
- Provides explainable scores
- Shows skill matches and gaps

**Key Features**:
- Job Selector Dropdown
  - Senior Backend Engineer
  - Full Stack Developer
  - Data Science Engineer
  
- Ranking Display (for each job)
  - Candidate name
  - Overall score (0-100%)
  - Component scores:
    - GitHub Activity: X%
    - LeetCode Score: X%
    - LinkedIn Profile: X%
  
- Candidate Details
  - Skills match percentage
  - Top strengths (3 items)
  - Skill gaps (3 items)
  - AI-generated explanation

**Data Source**: `/api/rankings?job_id={id}`

**Best For**: Placement teams, HR, hiring managers ranking candidates

---

### 5. AI Career Chat (/ai-chat)
**Purpose**: Real-time career guidance and support
- Chat interface for career questions
- Pre-built suggestion buttons
- AI-powered responses
- Learning and interview assistance

**Key Features**:
- Chat message display
- Input field for questions
- Suggestion Buttons:
  - "Resume Optimization Tips"
  - "Interview Preparation"
  - "Skill Development Plan"
  - "Career Path Guidance"
  
- AI Responses
  - Comprehensive answers
  - Actionable advice
  - Career guidance
  - Interview tips

**Data Source**: `POST /api/ai-chat`

**Best For**: Students seeking career guidance, interview prep, resume help

---

### 6. Feature Showcase (/showcase)
**Purpose**: Complete platform overview and feature discovery
- Dashboard of all features
- API reference
- Statistics and metrics
- Technology stack info

**Key Features**:
- Feature Cards (4 main features)
- API Endpoints Reference (all 7 endpoints)
- Platform Statistics
  - 7 Pages
  - 7 API Endpoints
  - 3 Sample Students
  - 3 Sample Jobs
  
- Technology Stack
  - Frontend
  - Design
  - Features
  
- Documentation Links
- Quick navigation buttons

**Best For**: First-time users, demos, understanding platform capabilities

---

### 7. Dashboard (/dashboard)
**Purpose**: Alternative entry point with quick overview
- Job posting summary
- Quick stats
- Navigation links

**Best For**: Quick access to key metrics

---

### 8. Candidates (/candidates)
**Purpose**: Browse student profiles
- List of all candidates
- Profile cards
- Skills display

**Best For**: Finding and reviewing student profiles

---

## URL Quick Reference

| Page | URL | Status |
|------|-----|--------|
| Home | `/` | ✅ Working |
| Student Dashboard | `/student` | ✅ Working |
| Instructor Analytics | `/instructor` | ✅ Working |
| Candidate Rankings | `/rankings` | ✅ Working |
| AI Career Chat | `/ai-chat` | ✅ Working |
| Feature Showcase | `/showcase` | ✅ Working |
| Dashboard | `/dashboard` | ✅ Working |
| Candidates | `/candidates` | ✅ Working |

## API Endpoints Quick Reference

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/student` | GET | Individual student profile |
| `/api/students` | GET | All students list |
| `/api/jobs` | GET | Job postings |
| `/api/rankings` | GET | Ranked candidates for a job |
| `/api/instructor/metrics` | GET | Cohort statistics |
| `/api/instructor/students` | GET | Student performance data |
| `/api/ai-chat` | POST | AI career guidance |

## Navigation Recommendations

### For First-Time Users
1. Start at Home (/)
2. Click "See Full Platform" → Showcase (/showcase)
3. Click any feature to explore
4. Use navbar to navigate between pages

### For Students
1. Go to Student Dashboard (/student)
2. View Rankings (/rankings) to see job matches
3. Use AI Chat (/ai-chat) for guidance

### For Instructors
1. Go to Instructor Analytics (/instructor)
2. View student performance metrics
3. Monitor placement readiness

### For Placement Teams
1. Go to Candidate Rankings (/rankings)
2. Select a job position
3. Review ranked candidates with AI insights

## Mobile Navigation

All pages are fully responsive:
- Navbar collapses on mobile
- Cards stack vertically
- Tables scroll horizontally
- Touch-friendly buttons
- Full functionality maintained

## Testing Recommendations

### Test 1: Complete Navigation Flow
- Home → Showcase → Each feature → Back to home

### Test 2: Feature-Specific Tests
- Student: Check all tabs and metrics
- Instructor: Test sorting on performance table
- Rankings: Try different jobs
- AI Chat: Test suggestion buttons

### Test 3: API Testing
- Open browser DevTools Console
- Check Network tab as pages load
- Verify all API calls succeed

### Test 4: Responsive Design
- Test on mobile view (375px)
- Test on tablet (768px)
- Test on desktop (1920px)

---

This complete site map shows all 8 pages and 7 APIs working perfectly with zero 404 errors. The platform is fully functional and ready for preview!

# Deployment Guide

## Quick Start (Local Development)

### Frontend (Next.js)

```bash
# Install dependencies
npm install

# Set up environment variables
echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:8000" > .env.local

# Run development server
npm run dev

# Visit http://localhost:3000
```

### Backend (Python FastAPI)

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
GEMINI_API_KEY=your_gemini_api_key_here
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=INFO
PORT=8000
HOST=0.0.0.0
ENVIRONMENT=development
EOF

# Run development server
uvicorn main:app --reload --port 8000

# Visit http://localhost:8000/docs for API documentation
```

## Production Deployment

### Option 1: Vercel (Frontend) + Cloud Run (Backend)

#### Frontend on Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables:
   ```
   NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.run.app
   ```
4. Deploy (auto-deploys on push)

#### Backend on Google Cloud Run

```bash
# Build Docker image
docker build -t gcr.io/your-project/placement-api .

# Push to GCR
docker push gcr.io/your-project/placement-api

# Deploy to Cloud Run
gcloud run deploy placement-api \
  --image gcr.io/your-project/placement-api \
  --platform managed \
  --region us-central1 \
  --set-env-vars GEMINI_API_KEY=your_key,CORS_ORIGIN=your-frontend-url

# Get the service URL and update frontend env vars
```

#### Docker Setup for Backend

Create `Dockerfile` in backend directory:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Run with gunicorn
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8000", "main:app"]
```

### Option 2: Heroku (Frontend + Backend)

#### Frontend

```bash
# Create Heroku app
heroku create your-app-frontend

# Set buildpack
heroku buildpacks:add heroku/nodejs

# Deploy
git push heroku main

# Set environment variables
heroku config:set NEXT_PUBLIC_BACKEND_URL=https://your-backend.herokuapp.com
```

#### Backend

```bash
# Create Heroku app
heroku create your-app-backend

# Set buildpack
heroku buildpacks:add heroku/python

# Deploy from backend directory
cd backend
git subtree push --prefix backend heroku main

# Set environment variables
heroku config:set GEMINI_API_KEY=your_key
heroku config:set CORS_ORIGIN=https://your-frontend.herokuapp.com
```

### Option 3: AWS (Elastic Beanstalk)

#### Backend on Elastic Beanstalk

```bash
cd backend

# Initialize EB
eb init -p python-3.11 placement-api

# Create environment
eb create placement-api-env

# Set environment variables
eb setenv GEMINI_API_KEY=your_key CORS_ORIGIN=your-frontend-url

# Deploy
eb deploy
```

### Option 4: DigitalOcean (Full Stack)

#### Using Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.nextjs
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_BACKEND_URL=http://backend:8000
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - CORS_ORIGIN=http://localhost:3000
      - HOST=0.0.0.0
      - PORT=8000
```

Deploy to DigitalOcean App Platform:

```bash
doctl apps create --spec app.yaml
```

## Environment Variables

### Frontend (.env.local)

```env
# Backend URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000

# Analytics (optional)
NEXT_PUBLIC_ANALYTICS_ID=your_id
```

### Backend (.env)

```env
# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key

# Server Configuration
HOST=0.0.0.0
PORT=8000
ENVIRONMENT=production

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,https://your-frontend.com

# Logging
LOG_LEVEL=INFO
```

## Getting Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key
4. Add to your `.env` file

## Performance Optimization

### Frontend
- Enable Next.js image optimization
- Use Code splitting
- Enable compression
- Set up CDN

### Backend
- Enable caching for mock data
- Use async processing for large rankings
- Add rate limiting
- Monitor API performance

## Monitoring & Logging

### Frontend
- Set up Vercel Analytics
- Monitor Core Web Vitals
- Error tracking with Sentry

### Backend
- Use structured logging
- Monitor API response times
- Track Gemini API usage
- Set up alerts for errors

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        run: npm run deploy

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Cloud Run
        run: gcloud run deploy placement-api --source .
```

## Troubleshooting

### CORS Errors
- Ensure `CORS_ORIGIN` in backend matches frontend URL
- Check frontend is making requests to correct backend URL

### Gemini API Errors
- Verify API key is valid
- Check quota limits
- Ensure API is enabled in Google Cloud Console

### Backend Not Responding
- Check backend service is running
- Verify network connectivity
- Check logs for errors

### Rankings Generation Fails
- Ensure mock data is loaded correctly
- Check Gemini API key is set
- Verify backend has sufficient memory
- Check timeout settings

## Scaling Considerations

1. **Stateless Design**: Both frontend and backend are stateless
2. **Load Balancing**: Use load balancers for multiple backend instances
3. **Caching**: Implement caching layer for ranking results
4. **Database**: If needed, add a database for persistence
5. **Real-time**: Consider WebSocket support for live updates

## Support

For issues or questions:
- Check logs: `npm run dev` or `uvicorn main:app --reload`
- Review documentation in ARCHITECTURE.md
- Check API docs at `/docs` (backend)

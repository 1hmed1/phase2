# Quickstart Guide: Beautiful Todo Web App

## Overview
This guide provides instructions for setting up and running the Beautiful Todo Web App locally for development.

## Prerequisites
- Node.js 18+ (for frontend development)
- Python 3.13+ (for backend development)
- UV package manager (for Python dependencies)
- PostgreSQL (or access to Neon Serverless PostgreSQL)
- Git

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd hackathon-todo
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies using UV
uv sync

# Activate the virtual environment
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Set up environment variables
cp .env.example .env
# Edit .env with your database connection details and JWT secret
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install JavaScript dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your backend API URL and other configuration
```

### 4. Database Setup
```bash
# From the backend directory
cd src
python -m pip install sqlmodel
# Run database migrations (if implemented)
# python -m alembic upgrade head
```

### 5. Running the Applications

#### Backend (FastAPI)
```bash
# From the backend directory
cd src
uv run python main.py
# Or using the task runner if configured
# uv run task dev
```

#### Frontend (Next.js)
```bash
# From the frontend directory
npm run dev
```

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://username:password@localhost:5432/todo_app
BETTER_AUTH_SECRET=your-super-secret-jwt-key-here
BETTER_AUTH_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

## API Endpoints
- Authentication: `/api/auth/*` (handled by Better Auth)
- Tasks: `/api/{user_id}/tasks` (GET, POST)
- Task Detail: `/api/{user_id}/tasks/{task_id}` (GET, PUT, DELETE)
- Task Completion: `/api/{user_id}/tasks/{task_id}/complete` (PATCH)

## Development Workflow
1. Make changes to the code
2. For backend: FastAPI should auto-reload on file changes
3. For frontend: Next.js should auto-reload on file changes
4. Run tests before committing:
   - Backend: `pytest tests/`
   - Frontend: `npm run test`

## Testing
### Backend Tests
```bash
# From the backend directory
pytest tests/ -v
```

### Frontend Tests
```bash
# From the frontend directory
npm run test
```

## Troubleshooting
- If you encounter dependency issues, try clearing caches:
  - Backend: Delete `uv.lock` and reinstall with `uv sync`
  - Frontend: Delete `node_modules` and reinstall with `npm install`
- Ensure your database is running and accessible
- Verify all environment variables are properly set
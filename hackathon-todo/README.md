# Beautiful Todo Web App

A stunning, modern todo app with premium UI/UX. Smooth animations, delightful interactions, professional polish.

## Features

- User authentication (signup, signin, signout)
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Filter tasks (All, Active, Completed)
- Search tasks by title or description
- Responsive design for mobile, tablet, and desktop
- Beautiful UI with smooth animations

## Tech Stack

- **Frontend**: Next.js 16+, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Python 3.13+, FastAPI, SQLModel, Pydantic
- **Database**: Neon Serverless PostgreSQL
- **Authentication**: Better Auth with JWT

## Project Structure

```
hackathon-todo/
├── frontend/                 # Next.js app
│   ├── app/
│   │   ├── (auth)/          # Authentication pages
│   │   ├── dashboard/       # Main dashboard
│   │   └── globals.css
│   ├── components/          # Reusable UI components
│   ├── lib/                 # API client and utilities
│   └── public/
├── backend/                  # FastAPI app
│   ├── src/
│   │   ├── main.py          # FastAPI app entry point
│   │   ├── models.py        # SQLModel definitions
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── auth.py          # Authentication utilities
│   └── tests/               # Backend tests
└── specs/                   # Feature specifications
```

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.13+
- UV package manager
- PostgreSQL (or access to Neon Serverless PostgreSQL)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` with your backend API URL and other configuration.

4. Run the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies using UV:
   ```bash
   uv sync
   ```

3. Activate the virtual environment:
   ```bash
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database connection details and JWT secret.

5. Run the development server:
   ```bash
   uv run python -m src.main
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

## License

This project is licensed under the MIT License.
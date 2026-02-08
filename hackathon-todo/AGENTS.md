# AI Agents Configuration

This document outlines the configuration for AI agents working on the Beautiful Todo Web App project.

## Project Overview

The Beautiful Todo Web App is a stunning, modern todo app with premium UI/UX. It features smooth animations, delightful interactions, and professional polish. The application follows a monorepo architecture with a Next.js frontend and FastAPI backend, ensuring multi-tenancy security through JWT-based authentication and user isolation.

## Tech Stack

- **Frontend**: Next.js 16+, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Python 3.13+, FastAPI, SQLModel, Pydantic
- **Database**: Neon Serverless PostgreSQL
- **Authentication**: Better Auth with JWT

## Key Files and Directories

### Frontend
- `frontend/app/` - Next.js app router pages
- `frontend/components/` - Reusable UI components
- `frontend/lib/api.ts` - API client functions
- `frontend/app/context/auth-context.tsx` - Authentication context

### Backend
- `backend/src/main.py` - FastAPI application entry point
- `backend/src/models.py` - SQLModel database models
- `backend/src/auth.py` - Authentication utilities
- `backend/src/routes/tasks.py` - Task-related API endpoints
- `backend/src/services/task_service.py` - Business logic for tasks
- `backend/src/utils/logging.py` - Logging utilities

## Important Implementation Notes

1. **Multi-tenancy Security**: Each user should only see their own tasks. Always validate that the user_id in the JWT matches the user_id in the URL path.

2. **Stateless API**: Use JWT-based authentication only, with no server-side sessions.

3. **Component Reusability**: Frontend components should be designed for reusability and maintain clean separation of concerns.

4. **Error Handling**: Implement proper error handling on both frontend and backend with user-friendly messages.

5. **Validation**: All inputs should be properly validated both on the frontend and backend.

## Common Tasks

When implementing new features:
1. Update the backend models and services first
2. Add new API endpoints
3. Create/update frontend components
4. Connect frontend to backend via API client
5. Add tests for new functionality
6. Update documentation if needed

## Testing

- Backend tests are located in `backend/tests/`
- Frontend tests should be added as needed
- Ensure all tests pass before merging changes

## Environment Variables

### Backend
- `DATABASE_URL` - Database connection string
- `BETTER_AUTH_SECRET` - Secret key for JWT tokens

### Frontend
- `NEXT_PUBLIC_API_BASE_URL` - Backend API URL
- `NEXT_PUBLIC_BETTER_AUTH_URL` - Authentication service URL
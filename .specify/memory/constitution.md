<!-- SYNC IMPACT REPORT
Version change: N/A -> 1.0.0
Modified principles: N/A
Added sections: Spec-Driven Development, Multi-Tenancy Security, Stateless API, Technology Stack, Architecture Rules, Code Standards, Security, Data Models, API Endpoints, Performance Targets
Removed sections: N/A
Templates requiring updates: ✅ updated - .specify/templates/plan-template.md, .specify/templates/spec-template.md, .specify/templates/tasks-template.md
Follow-up TODOs: None
-->

# Todo Full-Stack Web Application Constitution

## Core Principles

### Spec-Driven Development
NO code without corresponding task in speckit.tasks; ALL features must originate from speckit.specify; Constitution is highest authority

### Multi-Tenancy Security
Each user sees ONLY their own tasks (API enforced); JWT authentication REQUIRED for all operations; User ID in URL MUST match JWT user_id

### Stateless API
No server sessions, JWT-based auth only; All state persists in database; Must be horizontally scalable

## Technology Stack (Non-Negotiable)

**Frontend:**
- Next.js 16+ (App Router ONLY)
- TypeScript (strict mode)
- Tailwind CSS
- Better Auth

**Backend:**
- Python 3.13+
- FastAPI
- SQLModel (ORM)
- Pydantic (validation)

**Database:**
- Neon Serverless PostgreSQL
- No raw SQL (ORM only)

**Dev Tools:**
- UV for Python packages
- Qwen Code CLI / Claude Code
- Spec-Kit Plus

## Architecture Rules

### Monorepo Structure
```
hackathon-todo/
├── specs/           # All specifications
├── AGENTS.md        # AI instructions
├── frontend/        # Next.js app
└── backend/         # FastAPI app
```

### API Contract
- Base: `/api/{user_id}/tasks`
- Auth: `Authorization: Bearer <JWT>` header required
- Format: JSON only
- Validation: User ID in URL = JWT user_id

### Authentication Flow
```
1. Better Auth issues JWT → Frontend stores in httpOnly cookie
2. Frontend sends JWT in header → Backend verifies JWT
3. Backend extracts user_id → Filters all data by user_id
```

## Code Standards

### Python Backend
- Type hints required
- async/await for DB operations
- Pydantic models for all requests/responses
- Max function length: 50 lines

### TypeScript Frontend
- Server Components by default
- Client Components only for interactivity
- API calls in `/lib/api.ts`
- Tailwind only (no inline styles)

### Naming
- **Files:** kebab-case (`task-list.tsx`, `user_routes.py`)
- **Components:** PascalCase (`TaskCard`)
- **Functions:** camelCase (TS) / snake_case (Python)
- **Tables:** lowercase plural (`tasks`, `users`)

## Security

### Required
- JWT secret in environment variable (BETTER_AUTH_SECRET)
- Passwords hashed (Better Auth)
- No user accesses other user's data
- CORS configured (not `*`)
- Input validation on ALL endpoints

### Environment Variables
```env
# Both Frontend & Backend
BETTER_AUTH_SECRET=<shared-secret>
DATABASE_URL=<neon-postgres-url>
```

## Data Models

### User (Better Auth managed)
- id: UUID
- email: unique
- name: optional

### Task
- id: integer (auto-increment)
- user_id: UUID (foreign key, indexed)
- title: string (1-200 chars, required)
- description: string (0-1000 chars, optional)
- completed: boolean (default false)
- created_at, updated_at: timestamps

### Validation
- Title: 1-200 characters, no whitespace-only
- Description: max 1000 characters

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/{user_id}/tasks` | List all tasks |
| POST | `/api/{user_id}/tasks` | Create task |
| GET | `/api/{user_id}/tasks/{id}` | Get task |
| PUT | `/api/{user_id}/tasks/{id}` | Update task |
| DELETE | `/api/{user_id}/tasks/{id}` | Delete task |
| PATCH | `/api/{user_id}/tasks/{id}/complete` | Toggle complete |

**Responses:**
- Success: 200/201/204
- Error: 400/401/404/500
- All JSON format

## Performance Targets
- API response: < 500ms (p95)
- Database: indexed user_id filtering
- Frontend FCP: < 2s

## Governance

This constitution supersedes all other development practices. All code reviews must verify compliance with these principles. Any deviation from these principles requires amending this constitution first. Changes to technology stack or architecture rules require explicit approval and documentation of the migration plan.

**Version**: 1.0.0 | **Ratified**: 2026-02-08 | **Last Amended**: 2026-02-08

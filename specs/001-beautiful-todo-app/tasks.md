---

description: "Task list template for feature implementation"
---

# Tasks: Beautiful Todo Web App

**Input**: Design documents from `/specs/001-beautiful-todo-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- **Todo Web App**: `hackathon-todo/frontend/`, `hackathon-todo/backend/`
- Paths shown below assume single project - adjust based on plan.md structure

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /sp.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/

  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment

  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project structure per implementation plan
- [X] T002 [P] Initialize frontend package.json in hackathon-todo/frontend/package.json
- [X] T003 [P] Initialize backend pyproject.toml in hackathon-todo/backend/pyproject.toml
- [X] T004 [P] Configure linting and formatting tools for both frontend and backend
- [X] T005 [P] Verify compliance with technology stack (Next.js 16+, TypeScript, Tailwind CSS, Better Auth, Python 3.13+, FastAPI, SQLModel, Pydantic, Neon Serverless PostgreSQL)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [X] T006 Setup database schema and migrations framework in hackathon-todo/backend/src/database/
- [X] T007 [P] Implement authentication/authorization framework with Better Auth and JWT in hackathon-todo/backend/src/auth.py
- [X] T008 [P] Setup API routing and middleware structure with user_id validation in hackathon-todo/backend/src/main.py
- [X] T009 Create base models/entities that all stories depend on in hackathon-todo/backend/src/models.py
- [X] T010 Configure error handling and logging infrastructure in hackathon-todo/backend/src/utils/
- [X] T011 Setup environment configuration management in hackathon-todo/backend/.env
- [X] T012 [P] Implement user isolation mechanism (ensure each user sees ONLY their own data) in hackathon-todo/backend/src/routes/tasks.py
- [X] T013 [P] Create frontend API client in hackathon-todo/frontend/lib/api.ts
- [X] T014 Setup frontend authentication context in hackathon-todo/frontend/app/context/auth-context.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Authentication (Priority: P1) 🎯 MVP

**Goal**: Enable new users to sign up, sign in, and sign out of the application using email and password credentials with beautiful minimal forms featuring floating labels, smooth error states, and loading indicators.

**Independent Test**: A new user can navigate to the signup page, enter valid credentials (email, password, name), and successfully create an account. After signing in with those credentials, they can access their dashboard and then sign out, with their session properly terminated.

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T015 [P] [US1] Contract test for signup endpoint in hackathon-todo/backend/tests/test_auth.py
- [ ] T016 [P] [US1] Contract test for signin endpoint in hackathon-todo/backend/tests/test_auth.py
- [ ] T017 [P] [US1] Contract test for signout endpoint in hackathon-todo/backend/tests/test_auth.py

### Implementation for User Story 1

- [X] T018 [P] [US1] Create authentication pages in hackathon-todo/frontend/app/(auth)/
- [X] T019 [P] [US1] Create signup page with floating labels in hackathon-todo/frontend/app/(auth)/signup/page.tsx
- [X] T020 [P] [US1] Create signin page with floating labels in hackathon-todo/frontend/app/(auth)/signin/page.tsx
- [X] T021 [P] [US1] Create signout functionality in hackathon-todo/frontend/app/(auth)/signout/page.tsx
- [X] T022 [P] [US1] Create authentication form components in hackathon-todo/frontend/components/auth-form.tsx
- [X] T023 [US1] Implement error handling and loading states in hackathon-todo/frontend/components/auth-form.tsx
- [X] T024 [US1] Connect frontend auth forms to backend API in hackathon-todo/frontend/lib/api.ts
- [X] T025 [US1] Verify user isolation compliance (each user sees ONLY their own data) in hackathon-todo/backend/src/auth.py

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Task Management (Priority: P2)

**Goal**: Allow authenticated users to create, view, update, complete, and delete tasks with beautiful cards featuring hover effects, smooth animations, and responsive design.

**Independent Test**: A signed-in user can add a new task with a title and optional description, see it displayed in a card with a smooth animation, mark it as complete with a strikethrough animation, edit its details, and delete it with a confirmation modal.

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T026 [P] [US2] Contract test for create task endpoint in hackathon-todo/backend/tests/test_tasks.py
- [ ] T027 [P] [US2] Contract test for get tasks endpoint in hackathon-todo/backend/tests/test_tasks.py
- [ ] T028 [P] [US2] Contract test for update task endpoint in hackathon-todo/backend/tests/test_tasks.py
- [ ] T029 [P] [US2] Contract test for delete task endpoint in hackathon-todo/backend/tests/test_tasks.py
- [ ] T030 [P] [US2] Contract test for toggle complete endpoint in hackathon-todo/backend/tests/test_tasks.py

### Implementation for User Story 2

- [X] T031 [P] [US2] Create Task model in hackathon-todo/backend/src/models.py
- [X] T032 [P] [US2] Create Task service in hackathon-todo/backend/src/services/task_service.py
- [X] T033 [US2] Implement task CRUD endpoints in hackathon-todo/backend/src/routes/tasks.py
- [X] T034 [P] [US2] Create task card component in hackathon-todo/frontend/components/task-card.tsx
- [X] T035 [P] [US2] Create task form component in hackathon-todo/frontend/components/task-form.tsx
- [X] T036 [P] [US2] Create task list component in hackathon-todo/frontend/components/task-list.tsx
- [X] T037 [US2] Implement task creation functionality in hackathon-todo/frontend/components/task-form.tsx
- [X] T038 [US2] Implement task completion toggle with animation in hackathon-todo/frontend/components/task-card.tsx
- [X] T039 [US2] Implement task editing functionality in hackathon-todo/frontend/components/task-card.tsx
- [X] T040 [US2] Implement task deletion with confirmation in hackathon-todo/frontend/components/task-card.tsx
- [X] T041 [US2] Connect frontend task components to backend API in hackathon-todo/frontend/lib/api.ts
- [X] T042 [US2] Verify user isolation compliance (each user sees ONLY their own data) in hackathon-todo/backend/src/routes/tasks.py

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Task Organization (Priority: P3)

**Goal**: Enable users to filter tasks (All, Active, Completed) and search through their tasks by title or description with smooth transitions and visual feedback.

**Independent Test**: A user with multiple tasks can switch between filter views (All, Active, Completed) with smooth transitions and accurate counts, and can search for specific tasks with live results and highlighted matches.

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T043 [P] [US3] Contract test for filtered tasks endpoint in hackathon-todo/backend/tests/test_tasks.py
- [ ] T044 [P] [US3] Contract test for search tasks endpoint in hackathon-todo/backend/tests/test_tasks.py

### Implementation for User Story 3

- [X] T045 [P] [US3] Create filter tabs component in hackathon-todo/frontend/components/filter-tabs.tsx
- [X] T046 [P] [US3] Create search bar component in hackathon-todo/frontend/components/search-bar.tsx
- [X] T047 [US3] Implement filtering functionality in hackathon-todo/frontend/components/task-list.tsx
- [X] T048 [US3] Implement search functionality in hackathon-todo/frontend/components/task-list.tsx
- [X] T049 [US3] Add search endpoint to backend in hackathon-todo/backend/src/routes/tasks.py
- [X] T050 [US3] Add filtering to backend task retrieval in hackathon-todo/backend/src/routes/tasks.py
- [X] T051 [US3] Verify user isolation compliance (each user sees ONLY their own data) in hackathon-todo/backend/src/routes/tasks.py

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T052 [P] Documentation updates in docs/
- [X] T053 Code cleanup and refactoring
- [X] T054 Performance optimization across all stories
- [X] T055 [P] Additional unit tests (if requested) in tests/unit/
- [X] T056 Security hardening (ensure JWT authentication for all operations, validate user_id in URL matches JWT)
- [X] T057 Run quickstart.md validation
- [X] T058 Verify stateless API compliance (no server sessions, JWT-based auth only)
- [X] T059 Implement responsive design for mobile/tablet in hackathon-todo/frontend/components/
- [X] T060 Add animations and transitions to UI components in hackathon-todo/frontend/components/

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for signup endpoint in hackathon-todo/backend/tests/test_auth.py"
Task: "Contract test for signin endpoint in hackathon-todo/backend/tests/test_auth.py"
Task: "Contract test for signout endpoint in hackathon-todo/backend/tests/test_auth.py"

# Launch all components for User Story 1 together:
Task: "Create signup page with floating labels in hackathon-todo/frontend/app/(auth)/signup/page.tsx"
Task: "Create signin page with floating labels in hackathon-todo/frontend/app/(auth)/signin/page.tsx"
Task: "Create signout functionality in hackathon-todo/frontend/app/(auth)/signout/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Ensure all tasks comply with constitution principles: Spec-Driven Development, Multi-Tenancy Security, Stateless API
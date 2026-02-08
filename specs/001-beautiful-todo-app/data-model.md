# Data Model: Beautiful Todo Web App

## Overview
This document defines the data models for the Beautiful Todo Web App, including entity definitions, relationships, and validation rules.

## Entities

### User
- **Description**: Represents a registered user of the application
- **Fields**:
  - `id`: UUID (Primary Key, auto-generated)
  - `email`: String (Unique, Required, Valid email format)
  - `name`: String (Optional, max 100 characters)
  - `created_at`: DateTime (Auto-generated timestamp)
  - `updated_at`: DateTime (Auto-generated timestamp, updated on change)
- **Validation**:
  - Email must be unique across all users
  - Email must match standard email format
  - Name, if provided, must be 1-100 characters
- **Notes**: User entity is primarily managed by Better Auth, with additional application-specific fields as needed

### Task
- **Description**: Represents a user's task/to-do item
- **Fields**:
  - `id`: Integer (Primary Key, auto-increment)
  - `user_id`: UUID (Foreign Key referencing User.id, Required, Indexed)
  - `title`: String (Required, 1-200 characters)
  - `description`: String (Optional, 0-1000 characters)
  - `completed`: Boolean (Required, Default: false)
  - `created_at`: DateTime (Auto-generated timestamp)
  - `updated_at`: DateTime (Auto-generated timestamp, updated on change)
- **Validation**:
  - Title must be 1-200 characters
  - Title cannot be empty or whitespace-only
  - Description, if provided, must be 0-1000 characters
  - user_id must correspond to an existing User
- **Relationships**:
  - Belongs to one User
  - User has many Tasks

## State Transitions

### Task Completion
- **Initial State**: `completed: false`
- **Transition**: User toggles completion status
- **Resulting State**: `completed: true` or `completed: false`
- **Validation**: Only the owning user can change the completion status

## Indexes
- User.email: Unique index for authentication performance
- Task.user_id: Index for efficient user-specific queries
- Task.created_at: Index for chronological sorting
- Task.completed: Index for filtering by completion status

## Constraints
- Referential integrity: Task.user_id must reference an existing User.id
- Multi-tenancy: All queries must filter by user_id to prevent unauthorized access
- Data validation: All field constraints must be enforced at both application and database levels
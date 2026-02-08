from sqlmodel import SQLModel, Field, create_engine
from typing import Optional
from datetime import datetime
import uuid
import os
from pydantic import BaseModel


def generate_uuid():
    return str(uuid.uuid4())


class User(SQLModel, table=True):
    """
    User model representing a registered user of the application
    """
    id: str = Field(default_factory=generate_uuid, primary_key=True)
    email: str = Field(unique=True, nullable=False)
    name: Optional[str] = Field(default=None, max_length=100)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class Task(SQLModel, table=True):
    """
    Task model representing a user's task/to-do item
    """
    id: int = Field(default=None, primary_key=True, nullable=False)
    user_id: str = Field(foreign_key="user.id", nullable=False, index=True)
    title: str = Field(min_length=1, max_length=200, nullable=False)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class TaskCreate(BaseModel):
    """
    Model for creating a new task
    """
    title: str
    description: Optional[str] = None


class TaskUpdate(BaseModel):
    """
    Model for updating an existing task
    """
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None


class TaskResponse(Task):
    """
    Response model for tasks that includes validation
    """
    pass


class UserResponse(BaseModel):
    """
    Response model for users
    """
    id: str
    email: str
    name: Optional[str]
    created_at: datetime
    updated_at: datetime


# Database setup
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://username:password@localhost:5432/todo_app")
engine = create_engine(DATABASE_URL)
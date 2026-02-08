from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session
from typing import List, Optional

from ..models import Task, TaskCreate, TaskUpdate, TaskResponse, User
from ..auth import get_current_user, verify_user_access
from ..database import get_session
from ..services.task_service import TaskService

router = APIRouter()


@router.get("/tasks", response_model=List[TaskResponse])
async def get_tasks(
    user_id: str,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
    completed: Optional[bool] = Query(None, description="Filter tasks by completion status")
):
    """
    Get all tasks for a specific user
    """
    # Verify that the user_id in the path matches the user_id from the token
    verify_user_access(current_user.id, user_id)
    
    tasks = TaskService.get_tasks_by_user_id(session, user_id, completed)
    return tasks


@router.post("/tasks", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    user_id: str,
    task_data: TaskCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Create a new task for the specified user
    """
    # Verify that the user_id in the path matches the user_id from the token
    verify_user_access(current_user.id, user_id)
    
    task = TaskService.create_task(session, user_id, task_data)
    return task


@router.get("/tasks/{task_id}", response_model=TaskResponse)
async def get_task(
    user_id: str,
    task_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Get a specific task by ID for the specified user
    """
    # Verify that the user_id in the path matches the user_id from the token
    verify_user_access(current_user.id, user_id)
    
    # Get the task
    task = TaskService.get_task_by_id(session, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Verify that the task belongs to the user
    if task.user_id != user_id:
        raise HTTPException(status_code=403, detail="Access denied: Task does not belong to user")
    
    return task


@router.put("/tasks/{task_id}", response_model=TaskResponse)
async def update_task(
    user_id: str,
    task_id: int,
    task_data: TaskUpdate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Update an existing task for the specified user
    """
    # Verify that the user_id in the path matches the user_id from the token
    verify_user_access(current_user.id, user_id)
    
    # Get the task
    task = TaskService.get_task_by_id(session, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Verify that the task belongs to the user
    if task.user_id != user_id:
        raise HTTPException(status_code=403, detail="Access denied: Task does not belong to user")
    
    # Update the task with provided data
    updated_task = TaskService.update_task(session, task, task_data)
    return updated_task


@router.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    user_id: str,
    task_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Delete an existing task for the specified user
    """
    # Verify that the user_id in the path matches the user_id from the token
    verify_user_access(current_user.id, user_id)
    
    # Get the task
    task = TaskService.get_task_by_id(session, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Verify that the task belongs to the user
    if task.user_id != user_id:
        raise HTTPException(status_code=403, detail="Access denied: Task does not belong to user")
    
    TaskService.delete_task(session, task)
    return


@router.patch("/tasks/{task_id}/complete", response_model=TaskResponse)
async def toggle_task_completion(
    user_id: str,
    task_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Toggle the completion status of a task for the specified user
    """
    # Verify that the user_id in the path matches the user_id from the token
    verify_user_access(current_user.id, user_id)
    
    # Get the task
    task = TaskService.get_task_by_id(session, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Verify that the task belongs to the user
    if task.user_id != user_id:
        raise HTTPException(status_code=403, detail="Access denied: Task does not belong to user")
    
    # Toggle completion status
    updated_task = TaskService.toggle_task_completion(session, task)
    return updated_task
from sqlmodel import Session, select
from typing import List, Optional
from datetime import datetime

from ..models import Task, TaskCreate, TaskUpdate, User


class TaskService:
    """
    Service class for handling business logic related to tasks
    """
    
    @staticmethod
    def get_tasks_by_user_id(
        session: Session, 
        user_id: str, 
        completed: Optional[bool] = None
    ) -> List[Task]:
        """
        Get all tasks for a specific user, optionally filtered by completion status
        """
        query = select(Task).where(Task.user_id == user_id)
        if completed is not None:
            query = query.where(Task.completed == completed)
        
        return session.exec(query).all()
    
    @staticmethod
    def create_task(session: Session, user_id: str, task_data: TaskCreate) -> Task:
        """
        Create a new task for a user
        """
        task = Task(
            user_id=user_id,
            title=task_data.title,
            description=task_data.description,
            completed=False  # New tasks are not completed by default
        )
        
        session.add(task)
        session.commit()
        session.refresh(task)
        
        return task
    
    @staticmethod
    def get_task_by_id(session: Session, task_id: int) -> Optional[Task]:
        """
        Get a task by its ID
        """
        return session.get(Task, task_id)
    
    @staticmethod
    def update_task(session: Session, task: Task, task_data: TaskUpdate) -> Task:
        """
        Update a task with new data
        """
        # Update only the fields that are provided in task_data
        update_data = task_data.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(task, field, value)
        
        task.updated_at = datetime.utcnow()
        session.add(task)
        session.commit()
        session.refresh(task)
        
        return task
    
    @staticmethod
    def delete_task(session: Session, task: Task) -> None:
        """
        Delete a task
        """
        session.delete(task)
        session.commit()
    
    @staticmethod
    def toggle_task_completion(session: Session, task: Task) -> Task:
        """
        Toggle the completion status of a task
        """
        task.completed = not task.completed
        task.updated_at = datetime.utcnow()
        
        session.add(task)
        session.commit()
        session.refresh(task)
        
        return task
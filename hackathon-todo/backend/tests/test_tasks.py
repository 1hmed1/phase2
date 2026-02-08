import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, select
from httpx import AsyncClient

from src.main import app
from src.models import Task, User
from src.auth import create_access_token


def test_create_task(client: TestClient, session: Session):
    # Create a user first
    user = User(email="test@example.com", name="Test User")
    session.add(user)
    session.commit()
    session.refresh(user)
    
    # Create a JWT token for the user
    token = create_access_token(data={"sub": user.id})
    
    # Test creating a task
    response = client.post(
        f"/api/{user.id}/tasks",
        json={"title": "Test Task", "description": "Test Description"},
        headers={"Authorization": f"Bearer {token}"}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Task"
    assert data["description"] == "Test Description"
    assert data["user_id"] == user.id
    assert data["completed"] is False


def test_get_tasks(client: TestClient, session: Session):
    # Create a user first
    user = User(email="test@example.com", name="Test User")
    session.add(user)
    session.commit()
    session.refresh(user)
    
    # Create a JWT token for the user
    token = create_access_token(data={"sub": user.id})
    
    # Create a task
    task = Task(user_id=user.id, title="Test Task", description="Test Description")
    session.add(task)
    session.commit()
    session.refresh(task)
    
    # Test getting tasks
    response = client.get(
        f"/api/{user.id}/tasks",
        headers={"Authorization": f"Bearer {token}"}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["title"] == "Test Task"


def test_update_task(client: TestClient, session: Session):
    # Create a user first
    user = User(email="test@example.com", name="Test User")
    session.add(user)
    session.commit()
    session.refresh(user)
    
    # Create a JWT token for the user
    token = create_access_token(data={"sub": user.id})
    
    # Create a task
    task = Task(user_id=user.id, title="Original Task", description="Original Description")
    session.add(task)
    session.commit()
    session.refresh(task)
    
    # Test updating the task
    response = client.put(
        f"/api/{user.id}/tasks/{task.id}",
        json={"title": "Updated Task", "description": "Updated Description"},
        headers={"Authorization": f"Bearer {token}"}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Updated Task"
    assert data["description"] == "Updated Description"


def test_delete_task(client: TestClient, session: Session):
    # Create a user first
    user = User(email="test@example.com", name="Test User")
    session.add(user)
    session.commit()
    session.refresh(user)
    
    # Create a JWT token for the user
    token = create_access_token(data={"sub": user.id})
    
    # Create a task
    task = Task(user_id=user.id, title="Test Task", description="Test Description")
    session.add(task)
    session.commit()
    session.refresh(task)
    
    # Test deleting the task
    response = client.delete(
        f"/api/{user.id}/tasks/{task.id}",
        headers={"Authorization": f"Bearer {token}"}
    )
    
    assert response.status_code == 204
    
    # Verify the task was deleted
    response = client.get(
        f"/api/{user.id}/tasks",
        headers={"Authorization": f"Bearer {token}"}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 0


def test_toggle_task_completion(client: TestClient, session: Session):
    # Create a user first
    user = User(email="test@example.com", name="Test User")
    session.add(user)
    session.commit()
    session.refresh(user)
    
    # Create a JWT token for the user
    token = create_access_token(data={"sub": user.id})
    
    # Create a task
    task = Task(user_id=user.id, title="Test Task", description="Test Description", completed=False)
    session.add(task)
    session.commit()
    session.refresh(task)
    
    # Test toggling task completion
    response = client.patch(
        f"/api/{user.id}/tasks/{task.id}/complete",
        headers={"Authorization": f"Bearer {token}"}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data["completed"] is True
    
    # Toggle again to set it back to false
    response = client.patch(
        f"/api/{user.id}/tasks/{task.id}/complete",
        headers={"Authorization": f"Bearer {token}"}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data["completed"] is False
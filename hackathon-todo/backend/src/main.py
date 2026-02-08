from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
import os
from datetime import datetime, timezone
from typing import Optional, Dict, Any

from .models import (
    User,
    Task,
    TaskCreate,
    TaskUpdate,
    TaskResponse,
    UserResponse,
    engine
)
from .auth import get_current_user, verify_user_access
from .routes import tasks_router
from .utils.logging import setup_logger, log_api_call

app = FastAPI(title="Beautiful Todo API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(tasks_router, prefix="/api/{user_id}", tags=["tasks"])

@app.on_event("startup")
def on_startup():
    """Initialize database tables on startup"""
    from sqlmodel import SQLModel
    SQLModel.metadata.create_all(bind=engine)
    logger = setup_logger("startup")
    logger.info("Application started successfully")

@app.get("/")
def read_root(request: Request):
    log_api_call("/", "GET")
    return {"Hello": "Beautiful Todo API"}

@app.get("/health")
def health_check(request: Request):
    log_api_call("/health", "GET")
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc)}

@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Middleware to log all incoming requests"""
    start_time = datetime.now()
    response = await call_next(request)
    process_time = (datetime.now() - start_time).total_seconds()
    
    log_api_call(
        endpoint=request.url.path,
        method=request.method,
        user_id=request.headers.get("user-id"),  # If available
        status_code=response.status_code
    )
    
    response.headers["X-Process-Time"] = str(process_time)
    return response
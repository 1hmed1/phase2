from sqlmodel import create_engine, Session
from sqlalchemy.orm import sessionmaker
from .models import DATABASE_URL

# Create the database engine
engine = create_engine(DATABASE_URL)

# Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_session():
    """
    Dependency to get a database session
    """
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
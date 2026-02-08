import logging
from datetime import datetime
from typing import Any, Dict


def setup_logger(name: str, log_file: str = None, level: int = logging.INFO) -> logging.Logger:
    """
    Function to setup a logger with specified name and file
    """
    formatter = logging.Formatter('%(asctime)s %(levelname)s %(name)s %(message)s')

    if log_file:
        handler = logging.FileHandler(log_file)
    else:
        handler = logging.StreamHandler()
    
    handler.setFormatter(formatter)

    logger = logging.getLogger(name)
    logger.setLevel(level)
    logger.addHandler(handler)

    return logger


def log_api_call(endpoint: str, method: str, user_id: str = None, status_code: int = None) -> None:
    """
    Log API calls with relevant information
    """
    logger = setup_logger("api_calls")
    logger.info(f"API Call: {method} {endpoint} | User: {user_id} | Status: {status_code}")


def log_error(error: Exception, context: str = "") -> None:
    """
    Log errors with context information
    """
    logger = setup_logger("errors")
    logger.error(f"Error in {context}: {str(error)}", exc_info=True)


def log_security_event(event_type: str, user_id: str = None, ip_address: str = None, details: str = "") -> None:
    """
    Log security-related events
    """
    logger = setup_logger("security")
    logger.info(f"Security Event: {event_type} | User: {user_id} | IP: {ip_address} | Details: {details}")
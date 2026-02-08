/**
 * API client for the Beautiful Todo Web App
 * Provides functions to interact with the backend API
 */

import { 
  Task, 
  TaskCreate, 
  TaskUpdate, 
  User, 
  LoginCredentials, 
  RegisterData, 
  AuthResponse 
} from '../../shared/types';

// Base API URL from environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

// Generic function to make API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  // Handle responses without body (e.g., DELETE requests)
  if (response.status === 204) {
    return null;
  }

  return response.json();
};

// Authentication functions
export const authAPI = {
  // Sign up a new user
  signUp: async (userData: RegisterData) => {
    return apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    }) as Promise<AuthResponse>;
  },

  // Sign in an existing user
  signIn: async (credentials: LoginCredentials) => {
    return apiRequest('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }) as Promise<AuthResponse>;
  },

  // Sign out the current user
  signOut: async () => {
    return apiRequest('/auth/signout', {
      method: 'POST',
    });
  },
};

// Task functions
export const taskAPI = {
  // Get all tasks for a user
  getUserTasks: async (userId: string, completed?: boolean) => {
    let url = `/${userId}/tasks`;
    if (completed !== undefined) {
      url += `?completed=${completed}`;
    }
    return apiRequest(url, {
      method: 'GET',
    }) as Promise<Task[]>;
  },

  // Create a new task for a user
  createTask: async (userId: string, taskData: TaskCreate) => {
    return apiRequest(`/${userId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(taskData),
    }) as Promise<Task>;
  },

  // Get a specific task
  getTask: async (userId: string, taskId: number) => {
    return apiRequest(`/${userId}/tasks/${taskId}`, {
      method: 'GET',
    }) as Promise<Task>;
  },

  // Update a task
  updateTask: async (userId: string, taskId: number, taskData: TaskUpdate) => {
    return apiRequest(`/${userId}/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    }) as Promise<Task>;
  },

  // Delete a task
  deleteTask: async (userId: string, taskId: number) => {
    return apiRequest(`/${userId}/tasks/${taskId}`, {
      method: 'DELETE',
    });
  },

  // Toggle task completion status
  toggleTaskCompletion: async (userId: string, taskId: number) => {
    return apiRequest(`/${userId}/tasks/${taskId}/complete`, {
      method: 'PATCH',
    }) as Promise<Task>;
  },
};

export default {
  authAPI,
  taskAPI,
};
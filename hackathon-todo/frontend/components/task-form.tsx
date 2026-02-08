'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { taskAPI } from '../lib/api';
import { TaskCreate, Task } from '../../shared/types';

interface TaskFormProps {
  userId: string;
  onTaskCreated: (newTask: Task) => void;
}

const TaskForm = ({ userId, onTaskCreated }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (title.length < 1 || title.length > 200) {
      setError('Title must be between 1 and 200 characters');
      return;
    }
    
    if (description && description.length > 1000) {
      setError('Description must be less than 1000 characters');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const taskData: TaskCreate = {
        title: title.trim(),
        description: description.trim() || undefined,
      };
      
      const newTask = await taskAPI.createTask(userId, taskData);
      
      onTaskCreated(newTask);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Failed to create task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-4 mb-6"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Add New Task</h2>
      
      {error && (
        <div className="mb-3 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="mb-3">
        <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 mb-1">
          What needs to be done? *
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          maxLength={200}
        />
        <div className="text-right text-xs text-gray-500 mt-1">
          {title.length}/200
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="task-description" className="block text-sm font-medium text-gray-700 mb-1">
          Description (optional)
        </label>
        <textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          rows={2}
          maxLength={1000}
        />
        <div className="text-right text-xs text-gray-500 mt-1">
          {description.length}/1000
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        }`}
      >
        {isLoading ? 'Creating...' : 'Add Task'}
      </button>
    </motion.form>
  );
};

export default TaskForm;
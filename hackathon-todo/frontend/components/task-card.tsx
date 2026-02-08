'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { taskAPI } from '../../lib/api';
import { Task } from '../../../shared/types';

interface TaskCardProps {
  task: Task;
  userId: string;
  onTaskUpdate: (updatedTask: Task) => void;
  onTaskDelete: (taskId: number) => void;
}

const TaskCard = ({ task, userId, onTaskUpdate, onTaskDelete }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleComplete = async () => {
    try {
      const updatedTask = await taskAPI.toggleTaskCompletion(userId, task.id);
      onTaskUpdate(updatedTask);
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const handleEdit = async () => {
    try {
      const updatedTask = await taskAPI.updateTask(userId, task.id, {
        title: editTitle,
        description: editDescription,
        completed: task.completed
      });
      onTaskUpdate(updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      try {
        await taskAPI.deleteTask(userId, task.id);
        onTaskDelete(task.id);
      } catch (error) {
        console.error('Error deleting task:', error);
        setIsDeleting(false);
      }
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`bg-white rounded-lg shadow-md p-4 mb-3 border-l-4 ${
        task.completed ? 'border-green-500' : 'border-indigo-500'
      }`}
    >
      <div className="flex items-start">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className="mt-1 h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
        />
        
        <div className="ml-3 flex-1 min-w-0">
          {isEditing ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full text-lg font-medium text-gray-900 bg-gray-100 rounded p-1 mb-2"
                autoFocus
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full text-gray-700 bg-gray-100 rounded p-1 mb-2"
                rows={2}
              />
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={handleEdit}
                  className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditTitle(task.title);
                    setEditDescription(task.description || '');
                  }}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h3
                className={`text-lg font-medium ${
                  task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-gray-700 mt-1 ${task.completed ? 'text-gray-400' : ''}`}>
                  {task.description}
                </p>
              )}
            </>
          )}
        </div>
        
        <div className="flex space-x-2 ml-2">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-indigo-600"
              aria-label="Edit task"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          )}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`${isDeleting ? 'text-gray-400' : 'text-gray-500 hover:text-red-600'}`}
            aria-label="Delete task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        Created: {new Date(task.created_at).toLocaleDateString()}
        {task.updated_at !== task.created_at && (
          <span>, Updated: {new Date(task.updated_at).toLocaleDateString()}</span>
        )}
      </div>
    </motion.div>
  );
};

export default TaskCard;
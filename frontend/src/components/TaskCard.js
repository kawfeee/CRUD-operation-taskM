import React from 'react';
import { FiEdit2, FiTrash2, FiClock, FiFlag } from 'react-icons/fi';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h3>
          {task.description && (
            <p className="text-gray-600 text-sm mb-3">{task.description}</p>
          )}
        </div>
        <div className="flex space-x-2 ml-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
            title="Edit task"
          >
            <FiEdit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Delete task"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
          {task.status.replace('-', ' ')}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getPriorityColor(task.priority)}`}>
          <FiFlag size={12} className="mr-1" />
          {task.priority}
        </span>
      </div>

      {task.dueDate && (
        <div className="flex items-center text-sm text-gray-500">
          <FiClock size={14} className="mr-1" />
          <span>Due: {formatDate(task.dueDate)}</span>
        </div>
      )}

      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskCard;

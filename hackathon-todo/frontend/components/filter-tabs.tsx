'use client';

import { useState } from 'react';

interface FilterTabsProps {
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

const FilterTabs = ({ onFilterChange, counts }: FilterTabsProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');

  const handleTabClick = (tab: 'all' | 'active' | 'completed') => {
    setActiveTab(tab);
    onFilterChange(tab);
  };

  return (
    <div className="flex border-b border-gray-200">
      <button
        className={`py-3 px-6 text-center font-medium text-sm border-b-2 -mb-px ${
          activeTab === 'all'
            ? 'border-indigo-500 text-indigo-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
        onClick={() => handleTabClick('all')}
      >
        All{' '}
        <span
          className={`inline-block ml-1 px-2 py-0.5 text-xs rounded-full ${
            activeTab === 'all' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          {counts.all}
        </span>
      </button>
      <button
        className={`py-3 px-6 text-center font-medium text-sm border-b-2 -mb-px ${
          activeTab === 'active'
            ? 'border-indigo-500 text-indigo-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
        onClick={() => handleTabClick('active')}
      >
        Active{' '}
        <span
          className={`inline-block ml-1 px-2 py-0.5 text-xs rounded-full ${
            activeTab === 'active' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          {counts.active}
        </span>
      </button>
      <button
        className={`py-3 px-6 text-center font-medium text-sm border-b-2 -mb-px ${
          activeTab === 'completed'
            ? 'border-indigo-500 text-indigo-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
        onClick={() => handleTabClick('completed')}
      >
        Completed{' '}
        <span
          className={`inline-block ml-1 px-2 py-0.5 text-xs rounded-full ${
            activeTab === 'completed' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          {counts.completed}
        </span>
      </button>
    </div>
  );
};

export default FilterTabs;
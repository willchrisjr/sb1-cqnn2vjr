import React from 'react';
import { JobType } from '../types';

interface JobFilterProps {
  selectedType: JobType | 'All';
  onTypeChange: (type: JobType | 'All') => void;
}

const types: (JobType | 'All')[] = ['All', 'Full-time', 'Part-time', 'Contract', 'Remote'];

export function JobFilter({ selectedType, onTypeChange }: JobFilterProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <span className="text-sm font-medium text-gray-700">Filter by:</span>
      <div className="flex gap-2">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              selectedType === type
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
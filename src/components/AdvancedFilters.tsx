import React from 'react';
import { SearchFilters, Job } from '../types';
import { Filter, Search, Save } from 'lucide-react';

interface AdvancedFiltersProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  onSaveSearch: (name: string) => void;
}

export function AdvancedFilters({ filters, onChange, onSaveSearch }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchName, setSearchName] = React.useState('');

  const handleSaveSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchName.trim()) {
      onSaveSearch(searchName.trim());
      setSearchName('');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border hover:bg-gray-50"
      >
        <Filter size={16} />
        Advanced Filters
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border p-4 z-10">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience Level
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Entry', 'Mid', 'Senior', 'Lead'].map(level => (
                  <label key={level} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.experienceLevels.includes(level as any)}
                      onChange={(e) => {
                        const newLevels = e.target.checked
                          ? [...filters.experienceLevels, level as any]
                          : filters.experienceLevels.filter(l => l !== level);
                        onChange({ ...filters, experienceLevels: newLevels });
                      }}
                      className="rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm text-gray-600">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Required Skills
              </label>
              <input
                type="text"
                placeholder="e.g., React, TypeScript"
                className="w-full px-3 py-2 border rounded-lg"
                value={filters.requiredSkills.join(', ')}
                onChange={(e) => onChange({
                  ...filters,
                  requiredSkills: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Sources
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['LinkedIn', 'Indeed', 'Glassdoor', 'StackOverflow'].map(source => (
                  <label key={source} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.sources.includes(source as any)}
                      onChange={(e) => {
                        const newSources = e.target.checked
                          ? [...filters.sources, source as any]
                          : filters.sources.filter(s => s !== source);
                        onChange({ ...filters, sources: newSources });
                      }}
                      className="rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm text-gray-600">{source}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <form onSubmit={handleSaveSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-lg text-sm"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  disabled={!searchName.trim()}
                >
                  <Save size={16} />
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
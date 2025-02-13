import React from 'react';
import { SavedSearch, SearchFilters } from '../types';
import { Bookmark, X } from 'lucide-react';

interface SavedSearchesProps {
  searches: SavedSearch[];
  onApplySearch: (filters: SearchFilters) => void;
  onDeleteSearch: (id: string) => void;
}

export function SavedSearches({ searches, onApplySearch, onDeleteSearch }: SavedSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Bookmark className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Saved Searches</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searches.map(search => (
          <div
            key={search.id}
            className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-medium text-gray-900">{search.name}</h3>
              <button
                onClick={() => onDeleteSearch(search.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>
            <div className="space-y-2 mb-4">
              {search.filters.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {search.filters.keywords.map(keyword => (
                    <span
                      key={keyword}
                      className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
              <div className="text-sm text-gray-500">
                {search.filters.locations.length > 0 && (
                  <div>📍 {search.filters.locations.join(', ')}</div>
                )}
                {search.filters.jobTypes.length > 0 && (
                  <div>💼 {search.filters.jobTypes.join(', ')}</div>
                )}
                {search.filters.minSalary > 0 && (
                  <div>💰 Min ${search.filters.minSalary.toLocaleString()}</div>
                )}
              </div>
            </div>
            <button
              onClick={() => onApplySearch(search.filters)}
              className="w-full px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
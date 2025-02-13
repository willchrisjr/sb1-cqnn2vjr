import React, { useState } from 'react';
import { AlertPreferences, JobType } from '../types';
import { Bell } from 'lucide-react';

interface AlertSettingsProps {
  onSave: (preferences: AlertPreferences) => void;
}

export function AlertSettings({ onSave }: AlertSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState<AlertPreferences>({
    jobTypes: [],
    maxCompetitionScore: 5,
    keywords: [],
    locations: [],
    minSalary: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(preferences);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border hover:bg-gray-50"
      >
        <Bell size={16} />
        Set Alert Preferences
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border p-4 z-10">
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-semibold mb-4">Alert Preferences</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Competition Score
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={preferences.maxCompetitionScore}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    maxCompetitionScore: parseFloat(e.target.value)
                  })}
                  className="w-full"
                />
                <div className="text-sm text-gray-500 mt-1">
                  Score: {preferences.maxCompetitionScore}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="react, typescript, etc."
                  onChange={(e) => setPreferences({
                    ...preferences,
                    keywords: e.target.value.split(',').map(k => k.trim())
                  })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Salary
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="50000"
                  onChange={(e) => setPreferences({
                    ...preferences,
                    minSalary: parseInt(e.target.value)
                  })}
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Preferences
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
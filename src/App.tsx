import React, { useState } from 'react';
import { JobCard } from './components/JobCard';
import { JobFilter } from './components/JobFilter';
import { AlertSettings } from './components/AlertSettings';
import { AdvancedFilters } from './components/AdvancedFilters';
import { SavedSearches } from './components/SavedSearches';
import { CompetitionAnalytics } from './components/CompetitionAnalytics';
import { jobs } from './data';
import { JobType, AlertPreferences, SearchFilters, SavedSearch } from './types';
import { BriefcaseIcon } from 'lucide-react';

const defaultFilters: SearchFilters = {
  jobTypes: [],
  experienceLevels: [],
  maxCompetitionScore: 10,
  keywords: [],
  locations: [],
  minSalary: 0,
  requiredSkills: [],
  sources: []
};

function App() {
  const [selectedType, setSelectedType] = useState<JobType | 'All'>('All');
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [alertPreferences, setAlertPreferences] = useState<AlertPreferences | null>(null);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);

  const filteredJobs = jobs
    .filter(job => {
      if (selectedType !== 'All' && job.type !== selectedType) return false;
      if (filters.experienceLevels.length > 0 && !filters.experienceLevels.includes(job.experienceLevel)) return false;
      if (filters.sources.length > 0 && !filters.sources.includes(job.source)) return false;
      if (filters.minSalary > 0 && job.salaryRange.min < filters.minSalary) return false;
      if (filters.requiredSkills.length > 0 && !filters.requiredSkills.every(skill => job.requiredSkills.includes(skill))) return false;
      if (filters.keywords.length > 0 && !filters.keywords.some(keyword => 
        job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.description.toLowerCase().includes(keyword.toLowerCase())
      )) return false;
      if (job.competitionScore > filters.maxCompetitionScore) return false;
      return true;
    })
    .sort((a, b) => a.competitionScore - b.competitionScore);

  const handleSaveSearch = (name: string) => {
    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      name,
      filters,
      createdAt: new Date().toISOString()
    };
    setSavedSearches([...savedSearches, newSearch]);
  };

  const handleDeleteSearch = (id: string) => {
    setSavedSearches(savedSearches.filter(search => search.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">JobBoard</h1>
            </div>
            <div className="flex items-center gap-4">
              <AdvancedFilters
                filters={filters}
                onChange={setFilters}
                onSaveSearch={handleSaveSearch}
              />
              <AlertSettings onSave={setAlertPreferences} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <SavedSearches
          searches={savedSearches}
          onApplySearch={setFilters}
          onDeleteSearch={handleDeleteSearch}
        />

        <CompetitionAnalytics jobs={jobs} />

        <div className="my-8">
          <JobFilter
            selectedType={selectedType}
            onTypeChange={setSelectedType}
          />
        </div>

        <div className="space-y-6">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No jobs found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
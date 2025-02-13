import React from 'react';
import { Job, CompetitionStats } from '../types';
import { BarChart, TrendingUp, MapPin, DollarSign } from 'lucide-react';

interface CompetitionAnalyticsProps {
  jobs: Job[];
}

export function CompetitionAnalytics({ jobs }: CompetitionAnalyticsProps) {
  const analytics: CompetitionStats = React.useMemo(() => {
    const skillDemand: Record<string, number> = {};
    const locationDemand: Record<string, number> = {};
    const salaryRanges: Record<string, { count: number; totalCompetition: number }> = {};
    
    jobs.forEach(job => {
      // Skill demand
      job.requiredSkills.forEach(skill => {
        skillDemand[skill] = (skillDemand[skill] || 0) + 1;
      });
      
      // Location demand
      locationDemand[job.location] = (locationDemand[job.location] || 0) + 1;
      
      // Salary ranges
      const range = `${Math.floor(job.salaryRange.min / 20000) * 20000}-${Math.ceil(job.salaryRange.max / 20000) * 20000}`;
      if (!salaryRanges[range]) {
        salaryRanges[range] = { count: 0, totalCompetition: 0 };
      }
      salaryRanges[range].count += 1;
      salaryRanges[range].totalCompetition += job.competitionScore;
    });

    return {
      averageApplicants: jobs.reduce((acc, job) => acc + job.applicants, 0) / jobs.length,
      skillDemand,
      locationDemand,
      salaryRanges: Object.entries(salaryRanges).map(([range, data]) => ({
        range,
        count: data.count,
        averageCompetition: data.totalCompetition / data.count
      }))
    };
  }, [jobs]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Competition Analytics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Top Skills */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <TrendingUp size={16} />
            Most In-Demand Skills
          </h3>
          <div className="space-y-2">
            {Object.entries(analytics.skillDemand)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([skill, count]) => (
                <div key={skill} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{skill}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 bg-blue-100 rounded-full w-24">
                      <div
                        className="h-2 bg-blue-600 rounded-full"
                        style={{
                          width: `${(count / Math.max(...Object.values(analytics.skillDemand))) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">{count}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Top Locations */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPin size={16} />
            Top Hiring Locations
          </h3>
          <div className="space-y-2">
            {Object.entries(analytics.locationDemand)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([location, count]) => (
                <div key={location} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{location}</span>
                  <span className="text-sm text-gray-500">{count} jobs</span>
                </div>
              ))}
          </div>
        </div>

        {/* Salary Ranges */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <DollarSign size={16} />
            Competition by Salary Range
          </h3>
          <div className="space-y-2">
            {analytics.salaryRanges
              .sort((a, b) => b.averageCompetition - a.averageCompetition)
              .map(({ range, count, averageCompetition }) => (
                <div key={range} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">${range}</span>
                    <span className="text-sm text-gray-500">{count} jobs</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(averageCompetition / 10) * 100}%`,
                        backgroundColor: averageCompetition > 7 ? '#FCA5A5' : 
                                      averageCompetition > 4 ? '#FCD34D' : '#86EFAC'
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
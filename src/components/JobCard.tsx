import React from 'react';
import { Job } from '../types';
import { Building2, MapPin, Timer, Users, Briefcase } from 'lucide-react';
import { CompetitionBadge } from './CompetitionBadge';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <img
          src={job.logo}
          alt={`${job.company} logo`}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-500">{job.posted}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">via {job.source}</span>
              </div>
            </div>
            <CompetitionBadge level={job.competitionLevel} />
          </div>
          
          <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Building2 size={16} />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Timer size={16} />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{job.applicants} applicants</span>
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-600">{job.description}</p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {job.requiredSkills.map(skill => (
              <span
                key={skill}
                className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-medium text-gray-900">{job.salary}</span>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
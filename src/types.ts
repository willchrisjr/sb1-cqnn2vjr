export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  posted: string;
  description: string;
  logo: string;
  source: 'LinkedIn' | 'Indeed' | 'Glassdoor' | 'StackOverflow';
  applicants: number;
  requiredSkills: string[];
  competitionScore: number;
  competitionLevel: 'Low' | 'Medium' | 'High';
  salaryRange: {
    min: number;
    max: number;
  };
  applicationDeadline?: string;
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  competitionFactors: {
    applicantScore: number;
    postingAgeScore: number;
    skillsMatchScore: number;
    locationScore: number;
  };
}

export type JobType = Job['type'];
export type ExperienceLevel = Job['experienceLevel'];

export interface SavedSearch {
  id: string;
  name: string;
  filters: SearchFilters;
  createdAt: string;
}

export interface SearchFilters {
  jobTypes: JobType[];
  experienceLevels: ExperienceLevel[];
  maxCompetitionScore: number;
  keywords: string[];
  locations: string[];
  minSalary: number;
  requiredSkills: string[];
  sources: Job['source'][];
}

export interface AlertPreferences extends SearchFilters {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'realtime';
}

export interface CompetitionStats {
  averageApplicants: number;
  skillDemand: Record<string, number>;
  locationDemand: Record<string, number>;
  salaryRanges: {
    range: string;
    count: number;
    averageCompetition: number;
  }[];
}
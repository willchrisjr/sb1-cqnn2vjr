import { Job } from './types';

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    salary: '$120k - $160k',
    salaryRange: { min: 120000, max: 160000 },
    type: 'Full-time',
    posted: '2d ago',
    description: 'We are looking for an experienced Frontend Developer to join our team and help build amazing user experiences.',
    logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=128&h=128&fit=crop',
    source: 'LinkedIn',
    applicants: 45,
    requiredSkills: ['React', 'TypeScript', 'CSS', 'GraphQL'],
    competitionScore: 7.5,
    competitionLevel: 'High',
    experienceLevel: 'Senior',
    applicationDeadline: '2024-04-15',
    competitionFactors: {
      applicantScore: 8.0,
      postingAgeScore: 6.5,
      skillsMatchScore: 7.8,
      locationScore: 7.2
    }
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'DataFlow',
    location: 'Remote',
    salary: '$130k - $170k',
    salaryRange: { min: 130000, max: 170000 },
    type: 'Remote',
    posted: '1d ago',
    description: 'Join our distributed team building the next generation of data processing tools.',
    logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=128&h=128&fit=crop',
    source: 'StackOverflow',
    applicants: 12,
    requiredSkills: ['Node.js', 'Python', 'AWS', 'MongoDB'],
    competitionScore: 3.2,
    competitionLevel: 'Low',
    experienceLevel: 'Mid',
    applicationDeadline: '2024-04-30',
    competitionFactors: {
      applicantScore: 3.0,
      postingAgeScore: 2.5,
      skillsMatchScore: 4.0,
      locationScore: 3.5
    }
  },
  {
    id: '3',
    title: 'Product Designer',
    company: 'DesignHub',
    location: 'New York, NY',
    salary: '$90k - $120k',
    salaryRange: { min: 90000, max: 120000 },
    type: 'Full-time',
    posted: '5d ago',
    description: 'Looking for a creative Product Designer to help shape the future of our digital products.',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=128&h=128&fit=crop',
    source: 'Glassdoor',
    applicants: 28,
    requiredSkills: ['Figma', 'UI/UX', 'Design Systems', 'User Research'],
    competitionScore: 5.8,
    competitionLevel: 'Medium',
    experienceLevel: 'Mid',
    applicationDeadline: '2024-04-20',
    competitionFactors: {
      applicantScore: 5.5,
      postingAgeScore: 6.0,
      skillsMatchScore: 5.8,
      locationScore: 6.0
    }
  }
];
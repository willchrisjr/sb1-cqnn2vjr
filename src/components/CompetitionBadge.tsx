import React from 'react';
import { Job } from '../types';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

interface CompetitionBadgeProps {
  level: Job['competitionLevel'];
}

export function CompetitionBadge({ level }: CompetitionBadgeProps) {
  const config = {
    Low: {
      icon: TrendingDown,
      text: 'text-green-700',
      bg: 'bg-green-100',
      border: 'border-green-200'
    },
    Medium: {
      icon: Minus,
      text: 'text-yellow-700',
      bg: 'bg-yellow-100',
      border: 'border-yellow-200'
    },
    High: {
      icon: TrendingUp,
      text: 'text-red-700',
      bg: 'bg-red-100',
      border: 'border-red-200'
    }
  };

  const { icon: Icon, text, bg, border } = config[level];

  return (
    <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${bg} ${border} border ${text}`}>
      <Icon size={14} />
      <span className="text-xs font-medium">{level} Competition</span>
    </div>
  );
}
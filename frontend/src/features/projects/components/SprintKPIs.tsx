import { Zap, Target, ListChecks } from 'lucide-react';
import { Sprint } from '../types';

interface Props {
  sprints: Sprint[];
}

const SprintKPIs = ({ sprints }: Props) => {
  const active = sprints.filter(s => s.status === 'Active').length;
  const planned = sprints.filter(s => s.status === 'Planned').length;
  const completed = sprints.filter(s => s.status === 'Completed').length;

  const stats = [
    { label: 'Active Sprints', value: active, color: '#22C55E', bg: '#22C55E15', icon: Zap },
    { label: 'Planned', value: planned, color: '#6366F1', bg: '#6366F115', icon: Target },
    { label: 'Completed', value: completed, color: '#94A3B8', bg: '#94A3B815', icon: ListChecks },
    { label: 'Total Sprints', value: sprints.length, color: '#F59E0B', bg: '#F59E0B15', icon: ListChecks },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4 transition-all duration-200 hover:border-[#3A3A3A]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-500 text-xs">{stat.label}</p>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.bg }}>
                <Icon className="w-4 h-4" style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-white text-2xl font-bold tabular-nums">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SprintKPIs;


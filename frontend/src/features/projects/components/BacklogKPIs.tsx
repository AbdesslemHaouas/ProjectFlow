import { ListChecks, Target, CheckCircle, AlertTriangle } from 'lucide-react';

interface Props {
  total: number;
  totalPoints: number;
  inSprint: number;
  done: number;
  highPriority: number;
}

const BacklogKPIs = ({ total, totalPoints, inSprint, done, highPriority }: Props) => {
  const stats = [
    { label: 'Total Items', value: total, color: '#6366F1', bg: '#6366F115', icon: ListChecks },
    { label: 'In Sprint', value: inSprint, color: '#F59E0B', bg: '#F59E0B15', icon: Target },
    { label: 'Done', value: done, color: '#22C55E', bg: '#22C55E15', icon: CheckCircle },
    { label: 'High Priority', value: highPriority, color: '#EF4444', bg: '#EF444415', icon: AlertTriangle },
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

export default BacklogKPIs;


import { useAuthStore } from '@/store/auth.store';
import { CheckSquare, Clock, AlertCircle, Palmtree } from 'lucide-react';

const stats = [
  {
    label: 'My Tasks',
    value: '12',
    trend: '3 due today',
    icon: CheckSquare,
    color: '#6366F1',
    bg: 'rgba(99, 102, 241, 0.1)',
  },
  {
    label: 'In Progress',
    value: '4',
    trend: 'Currently working on',
    icon: Clock,
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.1)',
  },
  {
    label: 'Overdue',
    value: '2',
    trend: 'Needs attention',
    icon: AlertCircle,
    color: '#EF4444',
    bg: 'rgba(239, 68, 68, 0.1)',
  },
  {
    label: 'Leave Balance',
    value: '14',
    trend: 'Days remaining',
    icon: Palmtree,
    color: '#22C55E',
    bg: 'rgba(34, 197, 94, 0.1)',
  },
];

const TeamMemberDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold">
          Welcome back, {user?.prenom} 👋
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Here's your tasks overview
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 text-sm">{stat.label}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.bg }}>
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-white text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-slate-500 text-xs">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
          <h3 className="text-white font-medium mb-4">My Tasks Today</h3>
          <div className="space-y-3">
            {[
              { task: 'Fix login bug', status: 'In Progress', color: '#F59E0B' },
              { task: 'Update dashboard UI', status: 'To Do', color: '#6366F1' },
              { task: 'Write unit tests', status: 'Done', color: '#22C55E' },
            ].map((item) => (
              <div key={item.task} className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">{item.task}</span>
                <span className="text-xs px-2 py-1 rounded-full" style={{ color: item.color, backgroundColor: `${item.color}20` }}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
          <h3 className="text-white font-medium mb-4">Current Sprint</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400 text-sm">Sprint 3</span>
              <span className="text-slate-400 text-sm">Day 5/14</span>
            </div>
            <div className="w-full bg-[#0F0F0F] rounded-full h-1.5">
              <div className="bg-[#6366F1] h-1.5 rounded-full" style={{ width: '35%' }} />
            </div>
            <p className="text-slate-500 text-xs">35% completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDashboard;

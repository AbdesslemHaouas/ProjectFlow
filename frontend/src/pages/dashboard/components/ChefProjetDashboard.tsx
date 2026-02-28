import { useAuthStore } from '@/store/auth.store';
import { FolderKanban, Zap, CheckSquare, Users } from 'lucide-react';

const stats = [
  {
    label: 'My Projects',
    value: '6',
    trend: '2 due this week',
    icon: FolderKanban,
    color: '#6366F1',
    bg: 'rgba(99, 102, 241, 0.1)',
  },
  {
    label: 'Active Sprints',
    value: '3',
    trend: '1 ending soon',
    icon: Zap,
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.1)',
  },
  {
    label: 'Tasks Completed',
    value: '48',
    trend: '80% completion rate',
    icon: CheckSquare,
    color: '#22C55E',
    bg: 'rgba(34, 197, 94, 0.1)',
  },
  {
    label: 'Team Members',
    value: '12',
    trend: '2 on leave',
    icon: Users,
    color: '#EF4444',
    bg: 'rgba(239, 68, 68, 0.1)',
  },
];

const ChefProjetDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold">
          Welcome back, {user?.prenom} 👋
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Here's your projects overview
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
          <h3 className="text-white font-medium mb-4">My Projects</h3>
          <div className="space-y-3">
            {['ProjectFlow', 'Vaerdia CRM', 'Mobile App'].map((project) => (
              <div key={project} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#6366F1]" />
                  <span className="text-slate-300 text-sm">{project}</span>
                </div>
                <span className="text-xs text-slate-500 bg-[#0F0F0F] px-2 py-1 rounded-full">Active</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
          <h3 className="text-white font-medium mb-4">Sprint Progress</h3>
          <div className="space-y-3">
            {[
              { name: 'Sprint 1', progress: 80 },
              { name: 'Sprint 2', progress: 45 },
              { name: 'Sprint 3', progress: 20 },
            ].map((sprint) => (
              <div key={sprint.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300 text-sm">{sprint.name}</span>
                  <span className="text-slate-500 text-xs">{sprint.progress}%</span>
                </div>
                <div className="w-full bg-[#0F0F0F] rounded-full h-1.5">
                  <div
                    className="bg-[#6366F1] h-1.5 rounded-full"
                    style={{ width: `${sprint.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefProjetDashboard;
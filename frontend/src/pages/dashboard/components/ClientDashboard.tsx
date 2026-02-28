import { useAuthStore } from '@/store/auth.store';
import { FolderKanban, CheckSquare, AlertCircle, Clock } from 'lucide-react';

const stats = [
  {
    label: 'My Projects',
    value: '3',
    trend: '2 active',
    icon: FolderKanban,
    color: '#6366F1',
    bg: 'rgba(99, 102, 241, 0.1)',
  },
  {
    label: 'Completed Tasks',
    value: '45',
    trend: 'This month',
    icon: CheckSquare,
    color: '#22C55E',
    bg: 'rgba(34, 197, 94, 0.1)',
  },
  {
    label: 'Open Tickets',
    value: '3',
    trend: '1 urgent',
    icon: AlertCircle,
    color: '#EF4444',
    bg: 'rgba(239, 68, 68, 0.1)',
  },
  {
    label: 'Pending Reviews',
    value: '2',
    trend: 'Awaiting feedback',
    icon: Clock,
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.1)',
  },
];

const ClientDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold">
          Welcome back, {user?.prenom} 👋
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Here's your projects status
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
            {[
              { name: 'Website Redesign', progress: 75 },
              { name: 'Mobile App', progress: 40 },
              { name: 'API Integration', progress: 90 },
            ].map((project) => (
              <div key={project.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300 text-sm">{project.name}</span>
                  <span className="text-slate-500 text-xs">{project.progress}%</span>
                </div>
                <div className="w-full bg-[#0F0F0F] rounded-full h-1.5">
                  <div
                    className="bg-[#6366F1] h-1.5 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
          <h3 className="text-white font-medium mb-4">Recent Updates</h3>
          <div className="space-y-3">
            {[
              { text: 'Sprint 2 completed successfully', time: '2h ago' },
              { text: 'New feature deployed to staging', time: '5h ago' },
              { text: 'Bug fix merged to main', time: '1d ago' },
            ].map((update) => (
              <div key={update.text} className="flex items-start justify-between gap-2">
                <p className="text-slate-300 text-sm">{update.text}</p>
                <span className="text-slate-500 text-xs whitespace-nowrap">{update.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
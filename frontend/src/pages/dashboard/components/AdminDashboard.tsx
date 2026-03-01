import { useAuthStore } from '@/store/auth.store';
import { FolderKanban, Zap, Users, Palmtree } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stats = [
  {
    label: 'Total Projects',
    value: '24',
    trend: '+12% this month',
    icon: FolderKanban,
    color: '#6366F1',
    bg: 'rgba(99, 102, 241, 0.1)',
  },
  {
    label: 'Active Sprints',
    value: '8',
    trend: '3 ending this week',
    icon: Zap,
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.1)',
  },
  {
    label: 'Total Users',
    value: '32',
    trend: '5 pending approval',
    icon: Users,
    color: '#22C55E',
    bg: 'rgba(34, 197, 94, 0.1)',
  },
  {
    label: 'Pending Leaves',
    value: '5',
    trend: 'Needs review',
    icon: Palmtree,
    color: '#EF4444',
    bg: 'rgba(239, 68, 68, 0.1)',
  },
];

const AdminDashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-white text-2xl font-bold">
            Welcome back, {user?.prenom} 👋
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Here's your platform overview
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/admin/users')}
            className="bg-[#6366F1] hover:bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#6366F1]/20"
            type="button"
          >
            Manage Users
          </button>
          <button
            onClick={() => navigate('/projects')}
            className="bg-[#1A1A1A] hover:bg-[#0F0F0F] text-slate-300 px-4 py-2 rounded-xl text-sm border border-[#2A2A2A] transition-colors"
            type="button"
          >
            View Projects
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4 transition-all duration-200 hover:border-[#3A3A3A]"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 text-sm">{stat.label}</span>
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: stat.bg }}
              >
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-white text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-slate-500 text-xs">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-4">

        {/* Recent Projects */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-5">
          <h3 className="text-white font-medium mb-4">Recent Projects</h3>
          <div className="space-y-3">
            {['ProjectFlow', 'Vaerdia CRM', 'Mobile App'].map((project) => (
              <div key={project} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#6366F1]" />
                  <span className="text-slate-300 text-sm">{project}</span>
                </div>
                <span className="text-xs text-slate-500 bg-[#0F0F0F] px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Aura AI Insights */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🤖</span>
            <h3 className="text-white font-medium">Aura AI Insights</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <span>⚠️</span>
              <p className="text-slate-300 text-sm">Project X is at risk of delay</p>
            </div>
            <div className="flex items-start gap-2">
              <span>📉</span>
              <p className="text-slate-300 text-sm">Team velocity dropped by 12%</p>
            </div>
            <div className="flex items-start gap-2">
              <span>✅</span>
              <p className="text-slate-300 text-sm">Sprint 3 is on track</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-5 col-span-2">
          <h3 className="text-white font-medium mb-4">Quick Actions</h3>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/admin/users')}
              className="bg-[#6366F1] hover:bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#6366F1]/20"
              type="button"
            >
              👥 Manage Users
            </button>
            <button className="bg-[#0F0F0F] hover:bg-[#2A2A2A] text-white px-4 py-2 rounded-xl text-sm border border-[#2A2A2A] transition-colors" type="button">
              📁 Create Project
            </button>
            <button className="bg-[#0F0F0F] hover:bg-[#2A2A2A] text-white px-4 py-2 rounded-xl text-sm border border-[#2A2A2A] transition-colors" type="button">
              🌴 Review Leaves
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
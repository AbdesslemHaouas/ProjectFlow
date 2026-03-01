import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Plus, Search, FolderKanban } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Project {
  id: number;
  name: string;
  description: string;
  type: 'Scrum' | 'Kanban';
  status: 'Active' | 'On Hold' | 'Completed' | 'Planned';
  progress: number;
  chefProjet: string;
  members: string[];
  dueDate: string;
}

const mockProjects: Project[] = [
  {
    id: 1,
    name: 'ProjectFlow Platform',
    description: 'Internal project management platform for VAERDIA',
    type: 'Scrum',
    status: 'Active',
    progress: 65,
    chefProjet: 'Abdesslem H',
    members: ['AB', 'MC', 'YC'],
    dueDate: 'Mar 30, 2026',
  },
  {
    id: 2,
    name: 'Vaerdia CRM',
    description: 'Customer relationship management system',
    type: 'Kanban',
    status: 'Active',
    progress: 40,
    chefProjet: 'Abdesslem H',
    members: ['AB', 'YC'],
    dueDate: 'Apr 15, 2026',
  },
  {
    id: 3,
    name: 'Mobile App',
    description: 'Cross platform mobile application',
    type: 'Scrum',
    status: 'Planned',
    progress: 10,
    chefProjet: 'Abdesslem H',
    members: ['MC', 'YC', 'AB'],
    dueDate: 'May 1, 2026',
  },
  {
    id: 4,
    name: 'API Gateway',
    description: 'Centralized API gateway for microservices',
    type: 'Kanban',
    status: 'On Hold',
    progress: 55,
    chefProjet: 'Abdesslem H',
    members: ['AB'],
    dueDate: 'Apr 1, 2026',
  },
  {
    id: 5,
    name: 'Analytics Dashboard',
    description: 'Business intelligence and analytics platform',
    type: 'Scrum',
    status: 'Completed',
    progress: 100,
    chefProjet: 'Abdesslem H',
    members: ['AB', 'MC'],
    dueDate: 'Feb 1, 2026',
  },
];

const statusColors: Record<string, string> = {
  Active: 'text-green-400 bg-green-400/10 border-green-400/20',
  Planned: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'On Hold': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  Completed: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
};

const typeColors: Record<string, string> = {
  Scrum: 'text-[#6366F1] bg-[#6366F1]/10',
  Kanban: 'text-purple-400 bg-purple-400/10',
};

const progressColors: Record<string, string> = {
  Active: '#22C55E',
  Planned: '#6366F1',
  'On Hold': '#F59E0B',
  Completed: '#6366F1',
};

const filters = ['All', 'Active', 'Planned', 'On Hold', 'Completed'];

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filtered = mockProjects.filter((p) => {
    const matchesFilter = activeFilter === 'All' || p.status === activeFilter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <MainLayout>

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-semibold">Projects</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {mockProjects.length} projects total
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="pl-9 bg-[#1A1A1A] border-[#2A2A2A] text-white placeholder:text-slate-600 focus:border-[#6366F1]"
          />
        </div>
        <div className="flex gap-1">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                activeFilter === filter
                  ? 'bg-[#6366F1] text-white'
                  : 'bg-[#1A1A1A] text-slate-400 hover:text-white border border-[#2A2A2A]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16">
          <FolderKanban className="w-10 h-10 text-slate-600 mb-3" />
          <p className="text-slate-400 text-sm">No projects found</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 hover:border-[#3A3A3A] transition-colors cursor-pointer group"
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[project.type]}`}>
                    {project.type}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project name */}
              <h3 className="text-white font-medium text-sm mb-1 group-hover:text-[#6366F1] transition-colors">
                {project.name}
              </h3>
              <p className="text-slate-500 text-xs mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-slate-500 text-xs">Progress</span>
                  <span className="text-slate-400 text-xs">{project.progress}%</span>
                </div>
                <div className="w-full bg-[#0F0F0F] rounded-full h-1">
                  <div
                    className="h-1 rounded-full transition-all"
                    style={{
                      width: `${project.progress}%`,
                      backgroundColor: progressColors[project.status],
                    }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                {/* Member avatars */}
                <div className="flex -space-x-2">
                  {project.members.map((member, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-[#6366F1] border-2 border-[#1A1A1A] flex items-center justify-center text-white text-xs font-medium"
                    >
                      {member.charAt(0)}
                    </div>
                  ))}
                </div>

                {/* Due date */}
                <span className="text-slate-600 text-xs">{project.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-20"
            onClick={() => setShowCreateModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 z-30">
            <h2 className="text-white font-medium mb-4">Create New Project</h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs">Project Name</label>
                <Input
                  placeholder="Enter project name"
                  className="bg-[#0F0F0F] border-[#2A2A2A] text-white placeholder:text-slate-600 focus:border-[#6366F1]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs">Description</label>
                <textarea
                  placeholder="Enter project description"
                  rows={3}
                  className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#6366F1] resize-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs">Project Type</label>
                <select className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]">
                  <option value="Scrum">Scrum</option>
                  <option value="Kanban">Kanban</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-slate-400 text-xs">Start Date</label>
                  <Input
                    type="date"
                    className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-400 text-xs">End Date</label>
                  <Input
                    type="date"
                    className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1]"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white border border-[#2A2A2A] hover:bg-[#0F0F0F] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 rounded-lg text-sm bg-[#6366F1] hover:bg-[#4F46E5] text-white transition-colors"
              >
                Create Project
              </button>
            </div>
          </div>
        </>
      )}

    </MainLayout>
  );
};

export default ProjectsPage;
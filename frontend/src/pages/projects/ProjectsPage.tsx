import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Plus, Search, FolderKanban, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useGetProjects, useDeleteProject } from '@/features/projects/api';
import { useProjectFilters } from '@/features/projects/hooks/UseProjectFilters';
import { PROJECT_STATUS_FILTERS } from '@/features/projects/constants';
import {
  ProjectKPIs,
  ProjectCard,
  ProjectDetailModal,
  CreateProjectModal,
} from '@/features/projects/components';
import { Project } from '@/features/projects/types';

const ProjectsPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { data: projects, isLoading, error } = useGetProjects();
  const { mutate: deleteProject } = useDeleteProject();
  const { search, setSearch, statusFilter, setStatusFilter, filtered, kpis } = useProjectFilters(projects || []);

  return (
    <MainLayout>

      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-white text-xl font-semibold">Projects</h1>
          <p className="text-slate-500 text-sm mt-0.5">{kpis.total} projects total</p>
        </div>
        <button onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#6366F1]/20">
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      {/* KPIs */}
      <ProjectKPIs {...kpis} />

      {/* Search + Filters */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects..."
              className="pl-9 bg-[#141414] border-[#2A2A2A] text-white placeholder:text-slate-600 focus:border-[#6366F1] rounded-xl" />
          </div>
          <div className="flex gap-1">
            {PROJECT_STATUS_FILTERS.map((f) => (
              <button key={f} onClick={() => setStatusFilter(f)} type="button"
                className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${statusFilter === f ? 'bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/20' : 'bg-[#141414] text-slate-400 hover:text-white border border-[#2A2A2A]'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-red-400 text-sm">Failed to load projects</p>
        </div>
      )}

      {/* Loading / Empty / Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center p-16">
          <Loader2 className="w-6 h-6 text-[#6366F1] animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16">
          <FolderKanban className="w-10 h-10 text-slate-600 mb-3" />
          <p className="text-slate-400 text-sm">No projects found</p>
          <button onClick={() => setShowCreateModal(true)} className="mt-3 text-[#6366F1] text-sm hover:text-[#4F46E5] transition-colors">
            Create your first project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedProject}
              onDelete={deleteProject}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onDelete={deleteProject}
        />
      )}

      {showCreateModal && (
        <CreateProjectModal onClose={() => setShowCreateModal(false)} />
      )}

    </MainLayout>
  );
};

export default ProjectsPage;
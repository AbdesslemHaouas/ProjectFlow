import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Plus, Search, ChevronDown, ChevronUp, Calendar, Zap, Trash2, Play, CheckCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useGetSprints, useActivateSprint, useCompleteSprint, useDeleteSprint } from '@/features/projects/api';
import { SprintKPIs, CreateSprintModal } from '@/features/projects/components';

const statusColors: Record<string, string> = {
  Active: 'text-green-400 bg-green-400/10 border-green-400/20',
  Planned: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  Completed: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
};

const progressColors: Record<string, string> = {
  Active: '#22C55E',
  Planned: '#6366F1',
  Completed: '#6366F1',
};

const SprintsPage = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState<number[]>([]);
  const [showCreate, setShowCreate] = useState(false);

  const { data: sprints = [], isLoading, error } = useGetSprints();
  const { mutate: activate } = useActivateSprint();
  const { mutate: complete } = useCompleteSprint();
  const { mutate: deleteSprint } = useDeleteSprint();

  const filtered = sprints.filter((s) => {
    const matchesFilter = filter === 'All' || s.status === filter;
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleExpand = (id: number) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDelete = (id: number) => {
    if (!confirm('Delete this sprint?')) return;
    deleteSprint(id);
  };

  return (
    <MainLayout>

      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-white text-xl font-semibold">Sprints</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {sprints.filter(s => s.status === 'Active').length} active sprints
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#6366F1]/20"
        >
          <Plus className="w-4 h-4" />
          New Sprint
        </button>
      </div>

      {/* KPIs */}
      <SprintKPIs sprints={sprints} />

      {/* Search + Filters */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sprints..."
              className="pl-9 bg-[#141414] border-[#2A2A2A] text-white placeholder:text-slate-600 focus:border-[#6366F1] rounded-xl" />
          </div>
          <div className="flex gap-1">
            {['All', 'Active', 'Planned', 'Completed'].map((f) => (
              <button key={f} onClick={() => setFilter(f)} type="button"
                className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  filter === f
                    ? 'bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/20'
                    : 'bg-[#141414] text-slate-400 hover:text-white border border-[#2A2A2A]'
                }`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-red-400 text-sm">Failed to load sprints</p>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center p-12">
          <div className="w-6 h-6 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Sprints List */}
      <div className="space-y-3">
        {filtered.map((sprint) => (
          <div key={sprint.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden">

            {/* Sprint Header */}
            <div className="flex items-center gap-4 p-5 cursor-pointer hover:bg-[#0F0F0F] transition-colors"
              onClick={() => toggleExpand(sprint.id)}>

              <button className="text-slate-500 shrink-0" type="button">
                {expanded.includes(sprint.id)
                  ? <ChevronUp className="w-4 h-4" />
                  : <ChevronDown className="w-4 h-4" />}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-medium text-sm">{sprint.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[sprint.status]}`}>
                    {sprint.status}
                  </span>
                </div>
                <p className="text-slate-500 text-xs truncate">{sprint.goal}</p>
              </div>

              {/* Progress */}
              <div className="w-32 shrink-0">
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600 text-xs">Progress</span>
                  <span className="text-slate-400 text-xs">{sprint.progress}%</span>
                </div>
                <div className="w-full bg-[#141414] border border-[#2A2A2A] rounded-full h-1.5 overflow-hidden">
                  <div className="h-1.5 rounded-full" style={{
                    width: `${sprint.progress}%`,
                    backgroundColor: progressColors[sprint.status],
                  }} />
                </div>
              </div>

              {/* Dates */}
              <div className="text-right shrink-0">
                <div className="flex items-center justify-end gap-1 text-slate-500 text-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  {sprint.startDate || '—'}
                </div>
                <p className="text-slate-600 text-xs">→ {sprint.endDate || '—'}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0" onClick={e => e.stopPropagation()}>
                {sprint.status === 'Planned' && (
                  <button onClick={() => activate(sprint.id)}
                    className="text-green-400 hover:text-green-300 transition-colors" title="Activate">
                    <Play className="w-4 h-4" />
                  </button>
                )}
                {sprint.status === 'Active' && (
                  <button onClick={() => complete(sprint.id)}
                    className="text-blue-400 hover:text-blue-300 transition-colors" title="Complete">
                    <CheckCheck className="w-4 h-4" />
                  </button>
                )}
                <button onClick={() => handleDelete(sprint.id)}
                  className="text-red-400 hover:text-red-300 transition-colors" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Expanded - no tasks yet (coming with task service) */}
            {expanded.includes(sprint.id) && (
              <div className="border-t border-[#2A2A2A] p-5">
                <p className="text-slate-500 text-xs text-center">
                  Tasks will appear here once the Task Service is built.
                </p>
              </div>
            )}
          </div>
        ))}

        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-sm">No sprints found</p>
            <button onClick={() => setShowCreate(true)}
              className="text-[#6366F1] text-sm mt-2 hover:underline">
              Create your first sprint
            </button>
          </div>
        )}
      </div>

      {showCreate && <CreateSprintModal onClose={() => setShowCreate(false)} />}

    </MainLayout>
  );
};

export default SprintsPage;
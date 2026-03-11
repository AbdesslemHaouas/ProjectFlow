import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Plus, Search, GripVertical, ArrowUp, ArrowDown, Minus, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useGetBacklog, useDeleteBacklogItem, useGetProjects, useGetSprints } from '@/features/projects/api';
import { useBacklogFilters } from '@/features/projects/hooks/UseBacklogFilters';
import { BACKLOG_TYPE_COLORS, BACKLOG_STATUS_COLORS, BACKLOG_PRIORITY_COLORS, BACKLOG_STATUS_FILTERS, BACKLOG_TYPE_FILTERS } from '@/features/projects/constants';
import { BacklogKPIs, CreateBacklogModal, BacklogItemDetail } from '@/features/projects/components';
import { BacklogItem } from '@/features/projects/types';

const PriorityIcon = ({ priority }: { priority: string }) => {
  if (priority === 'High') return <ArrowUp className="w-3.5 h-3.5 text-red-400" />;
  if (priority === 'Low') return <ArrowDown className="w-3.5 h-3.5 text-green-400" />;
  return <Minus className="w-3.5 h-3.5 text-yellow-400" />;
};

const BacklogPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BacklogItem | null>(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [localOrder, setLocalOrder] = useState<number[]>([]);

  const { data: backlogItems, isLoading, error } = useGetBacklog();
  const { data: projects } = useGetProjects();
  const { data: sprints } = useGetSprints();
  const { mutate: deleteBacklogItem } = useDeleteBacklogItem();

  const ordered = backlogItems
    ? localOrder.length
      ? [...backlogItems].sort((a, b) => localOrder.indexOf(a.id) - localOrder.indexOf(b.id))
      : backlogItems
    : [];

  const { search, setSearch, statusFilter, setStatusFilter, typeFilter, setTypeFilter, filtered, kpis } = useBacklogFilters(ordered);

  const getProjectName = (projectId: number) => projects?.find(p => p.id === projectId)?.name || `#${projectId}`;
  const getSprintName = (sprintId?: number) => sprintId ? (sprints?.find(s => s.id === sprintId)?.name || `#${sprintId}`) : '—';

  const handleDragStart = (id: number) => {
    setDraggingId(id);
    if (!localOrder.length && backlogItems) setLocalOrder(backlogItems.map(i => i.id));
  };

  const handleDragOver = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    if (draggingId === null || draggingId === targetId) return;
    const ids = localOrder.length ? [...localOrder] : (backlogItems || []).map(i => i.id);
    const updated = [...ids];
    updated.splice(ids.indexOf(draggingId), 1);
    updated.splice(ids.indexOf(targetId), 0, draggingId);
    setLocalOrder(updated);
  };

  return (
    <MainLayout>

      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-white text-xl font-semibold">Backlog</h1>
          <p className="text-slate-500 text-sm mt-0.5">{kpis.total} items · {kpis.totalPoints} story points</p>
        </div>
        <button onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#6366F1]/20">
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      {/* KPIs */}
      <BacklogKPIs {...kpis} />

      {/* Search + Filters */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search backlog..."
              className="pl-9 bg-[#141414] border-[#2A2A2A] text-white placeholder:text-slate-600 focus:border-[#6366F1] rounded-xl" />
          </div>
          <div className="flex gap-1">
            {BACKLOG_STATUS_FILTERS.map((f) => (
              <button key={f} onClick={() => setStatusFilter(f)} type="button"
                className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${statusFilter === f ? 'bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/20' : 'bg-[#141414] text-slate-400 hover:text-white border border-[#2A2A2A]'}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {BACKLOG_TYPE_FILTERS.map((f) => (
              <button key={f} onClick={() => setTypeFilter(f)} type="button"
                className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${typeFilter === f ? 'bg-[#0F0F0F] text-white border border-[#3A3A3A]' : 'bg-[#141414] text-slate-400 hover:text-white border border-[#2A2A2A]'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-red-400 text-sm">Failed to load backlog</p>
        </div>
      )}

      {/* Backlog Table */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-4 py-2 border-b border-[#2A2A2A]">
          <div className="col-span-1" />
          <div className="col-span-4 text-slate-500 text-xs">Title</div>
          <div className="col-span-1 text-slate-500 text-xs">Type</div>
          <div className="col-span-1 text-slate-500 text-xs">Priority</div>
          <div className="col-span-1 text-slate-500 text-xs text-center">Pts</div>
          <div className="col-span-1 text-slate-500 text-xs">Project</div>
          <div className="col-span-2 text-slate-500 text-xs">Status</div>
          <div className="col-span-1 text-slate-500 text-xs">Sprint</div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center p-12"><Loader2 className="w-6 h-6 text-[#6366F1] animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center p-12"><p className="text-slate-500 text-sm">No backlog items found</p></div>
        ) : (
          <div className="divide-y divide-[#2A2A2A]">
            {filtered.map((item) => (
              <div key={item.id} draggable
                onDragStart={() => handleDragStart(item.id)}
                onDragOver={(e) => handleDragOver(e, item.id)}
                onDragEnd={() => setDraggingId(null)}
                onClick={() => setSelectedItem(item)}
                className={`grid grid-cols-12 gap-2 px-4 py-3 hover:bg-[#0F0F0F] transition-colors group items-center cursor-pointer ${draggingId === item.id ? 'opacity-50' : ''}`}>
                <div className="col-span-1 flex items-center">
                  <GripVertical className="w-3.5 h-3.5 text-slate-600 opacity-0 group-hover:opacity-100 cursor-grab" />
                </div>
                <div className="col-span-4">
                  <p className={`text-sm ${item.status === 'Done' ? 'text-slate-500 line-through' : 'text-white'}`}>{item.title}</p>
                  <p className="text-slate-600 text-xs mt-0.5 truncate">{item.description}</p>
                </div>
                <div className="col-span-1">
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${BACKLOG_TYPE_COLORS[item.type]}`}>{item.type}</span>
                </div>
                <div className="col-span-1 flex items-center gap-1">
                  <PriorityIcon priority={item.priority} />
                  <span className={`text-xs ${BACKLOG_PRIORITY_COLORS[item.priority]}`}>{item.priority}</span>
                </div>
                <div className="col-span-1 text-center">
                  <span className="text-white text-xs bg-[#0F0F0F] border border-[#2A2A2A] px-2 py-0.5 rounded-full">{item.points}</span>
                </div>
                <div className="col-span-1">
                  <span className="text-slate-400 text-xs truncate">{getProjectName(item.projectId)}</span>
                </div>
                <div className="col-span-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${BACKLOG_STATUS_COLORS[item.status]}`}>{item.status}</span>
                </div>
                <div className="col-span-1">
                  <span className="text-slate-500 text-xs truncate">{getSprintName(item.sprintId)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedItem && (
        <BacklogItemDetail
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onDelete={deleteBacklogItem}
          getProjectName={getProjectName}
          getSprintName={getSprintName}
        />
      )}

      {showCreateModal && (
        <CreateBacklogModal onClose={() => setShowCreateModal(false)} />
      )}

    </MainLayout>
  );
};

export default BacklogPage;
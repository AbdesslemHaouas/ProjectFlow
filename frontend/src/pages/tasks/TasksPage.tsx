import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Plus, Search, ListChecks, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useGetTasks, useUpdateTaskStatus } from '@/features/tasks/api';
import { useTaskFilters } from '@/features/tasks/hooks';
import { CreateTaskModal, TaskCard, TaskDetailModal } from '@/features/tasks/components';
import { Task, TaskStatus } from '@/features/tasks/types';
import { COLUMN_COLORS, COLUMN_DOTS } from '@/features/tasks/constants';

const COLUMNS: TaskStatus[] = ['Todo', 'In Progress', 'In Review', 'Done'];

const TasksPage = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [dragging, setDragging] = useState<Task | null>(null);

  const { data: tasks = [], isLoading } = useGetTasks();
  const { mutate: updateStatus } = useUpdateTaskStatus();
  const { search, setSearch, grouped, kpis } = useTaskFilters(tasks);

  const handleDrop = (status: TaskStatus) => {
    if (!dragging || dragging.status === status) return;
    updateStatus({ id: dragging.id, status });
    setDragging(null);
  };

  return (
    <MainLayout>

      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-white text-xl font-semibold">Tasks</h1>
          <p className="text-slate-500 text-sm mt-0.5">{tasks.length} tasks total</p>
        </div>
        <button onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#6366F1]/20">
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Todo', value: kpis.todo, color: '#94A3B8', bg: '#94A3B815', icon: ListChecks },
          { label: 'In Progress', value: kpis.inProgress, color: '#F59E0B', bg: '#F59E0B15', icon: Zap },
          { label: 'Done', value: kpis.done, color: '#22C55E', bg: '#22C55E15', icon: CheckCircle },
          { label: 'High Priority Open', value: kpis.highPriority, color: '#EF4444', bg: '#EF444415', icon: AlertTriangle },
        ].map((stat) => {
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

      {/* Search */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4 mb-6">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="pl-9 bg-[#141414] border-[#2A2A2A] text-white placeholder:text-slate-600 focus:border-[#6366F1] rounded-xl" />
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center p-12">
          <div className="w-6 h-6 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Kanban Board */}
      <div className="grid grid-cols-4 gap-4">
        {COLUMNS.map((column) => (
          <div key={column}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(column)}
            className={`bg-[#1A1A1A] border rounded-2xl p-4 transition-colors min-h-[400px] ${
              dragging && dragging.status !== column
                ? 'border-[#6366F1]/50 bg-[#6366F1]/5'
                : 'border-[#2A2A2A]'
            }`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${COLUMN_DOTS[column]}`} />
                <span className={`text-xs font-medium ${COLUMN_COLORS[column]}`}>{column}</span>
                <span className="text-xs text-slate-600 bg-[#0F0F0F] px-1.5 py-0.5 rounded-full">
                  {grouped[column]?.length || 0}
                </span>
              </div>
              <button onClick={() => setShowCreate(true)}
                className="text-slate-600 hover:text-white transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tasks */}
            <div className="space-y-2">
              {(grouped[column] || []).map((task) => (
                <div key={task.id}
                  draggable
                  onDragStart={() => setDragging(task)}
                  onDragEnd={() => setDragging(null)}
                >
                  <TaskCard task={task} onClick={() => setSelectedTask(task)} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showCreate && <CreateTaskModal onClose={() => setShowCreate(false)} />}
      {selectedTask && <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} />}

    </MainLayout>
  );
};

export default TasksPage;
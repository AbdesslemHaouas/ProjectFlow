import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Plus, Search, GripVertical, ArrowUp, ArrowDown, Minus, X, ChevronDown, ListChecks, Target, CheckCircle, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface BacklogItem {
  id: number;
  title: string;
  description: string;
  type: 'Story' | 'Bug' | 'Task' | 'Epic';
  priority: 'High' | 'Medium' | 'Low';
  points: number;
  status: 'To Do' | 'In Sprint' | 'Done';
  project: string;
  assignee: string;
  sprint?: string;
  acceptanceCriteria?: string;
}

const initialBacklog: BacklogItem[] = [
  {
    id: 1,
    title: 'As a user I can login with email and password',
    description: 'Implement JWT authentication with email and password',
    type: 'Story',
    priority: 'High',
    points: 8,
    status: 'Done',
    project: 'ProjectFlow',
    assignee: 'AB',
    sprint: 'Sprint 2',
    acceptanceCriteria: 'User can login with valid credentials\nInvalid credentials show error message\nJWT token is stored securely',
  },
  {
    id: 2,
    title: 'As an admin I can manage users and roles',
    description: 'Admin panel for user management with role assignment',
    type: 'Story',
    priority: 'High',
    points: 13,
    status: 'Done',
    project: 'ProjectFlow',
    assignee: 'MC',
    sprint: 'Sprint 2',
    acceptanceCriteria: 'Admin can view all users\nAdmin can change user roles\nAdmin can activate/suspend users',
  },
  {
    id: 3,
    title: 'As a user I can view my dashboard',
    description: 'Role based dashboard with KPI cards and charts',
    type: 'Story',
    priority: 'High',
    points: 8,
    status: 'In Sprint',
    project: 'ProjectFlow',
    assignee: 'AB',
    sprint: 'Sprint 3',
  },
  {
    id: 4,
    title: 'As a chef projet I can create projects',
    description: 'Project creation with Scrum or Kanban type selection',
    type: 'Story',
    priority: 'High',
    points: 5,
    status: 'In Sprint',
    project: 'ProjectFlow',
    assignee: 'YC',
    sprint: 'Sprint 3',
  },
  {
    id: 5,
    title: 'As a user I can manage tasks in kanban board',
    description: 'Drag and drop kanban board with task management',
    type: 'Story',
    priority: 'Medium',
    points: 13,
    status: 'To Do',
    project: 'ProjectFlow',
    assignee: 'AB',
  },
  {
    id: 6,
    title: 'Fix login page not redirecting on mobile',
    description: 'Login redirect broken on mobile browsers',
    type: 'Bug',
    priority: 'High',
    points: 3,
    status: 'To Do',
    project: 'ProjectFlow',
    assignee: 'MC',
    acceptanceCriteria: 'Login redirects correctly on iOS Safari\nLogin redirects correctly on Android Chrome',
  },
  {
    id: 7,
    title: 'As a user I can request leave',
    description: 'Leave request form with type and date selection',
    type: 'Story',
    priority: 'Medium',
    points: 8,
    status: 'To Do',
    project: 'ProjectFlow',
    assignee: 'YC',
  },
  {
    id: 8,
    title: 'Implement Aura AI insights',
    description: 'AI powered project risk detection and suggestions',
    type: 'Epic',
    priority: 'Low',
    points: 21,
    status: 'To Do',
    project: 'ProjectFlow',
    assignee: 'AB',
  },
  {
    id: 9,
    title: 'As a client I can view project progress',
    description: 'Client portal with project progress and updates',
    type: 'Story',
    priority: 'Medium',
    points: 5,
    status: 'To Do',
    project: 'Vaerdia CRM',
    assignee: 'MC',
  },
  {
    id: 10,
    title: 'Export reports to PDF',
    description: 'Generate and download PDF reports for projects',
    type: 'Task',
    priority: 'Low',
    points: 5,
    status: 'To Do',
    project: 'ProjectFlow',
    assignee: 'YC',
  },
];

const typeColors: Record<string, string> = {
  Story: 'text-green-400 bg-green-400/10',
  Bug: 'text-red-400 bg-red-400/10',
  Task: 'text-blue-400 bg-blue-400/10',
  Epic: 'text-purple-400 bg-purple-400/10',
};

const statusColors: Record<string, string> = {
  'To Do': 'text-slate-400 bg-slate-400/10 border-slate-400/20',
  'In Sprint': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  'Done': 'text-green-400 bg-green-400/10 border-green-400/20',
};

const priorityColors: Record<string, string> = {
  High: 'text-red-400',
  Medium: 'text-yellow-400',
  Low: 'text-green-400',
};

const PriorityIcon = ({ priority }: { priority: string }) => {
  if (priority === 'High') return <ArrowUp className="w-3.5 h-3.5 text-red-400" />;
  if (priority === 'Low') return <ArrowDown className="w-3.5 h-3.5 text-green-400" />;
  return <Minus className="w-3.5 h-3.5 text-yellow-400" />;
};

const defaultForm = {
  title: '',
  description: '',
  type: 'Story' as const,
  priority: 'Medium' as const,
  points: 5,
  status: 'To Do' as const,
  project: 'ProjectFlow',
  assignee: '',
  sprint: '',
  acceptanceCriteria: '',
};

const BacklogPage = () => {
  const [items, setItems] = useState<BacklogItem[]>(initialBacklog);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BacklogItem | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const statusFilters = ['All', 'To Do', 'In Sprint', 'Done'];
  const typeFilters = ['All', 'Story', 'Bug', 'Task', 'Epic'];

  const filtered = items.filter((item) => {
    const matchesStatus = filter === 'All' || item.status === filter;
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const totalPoints = filtered.reduce((sum, item) => sum + item.points, 0);
  const inSprintCount = filtered.filter(i => i.status === 'In Sprint').length;
  const doneCount = filtered.filter(i => i.status === 'Done').length;
  const highPrioCount = filtered.filter(i => i.priority === 'High' && i.status !== 'Done').length;

  const handleCreate = () => {
    if (!form.title.trim()) return;
    const newItem: BacklogItem = {
      ...form,
      id: items.length + 1,
    };
    setItems([...items, newItem]);
    setForm(defaultForm);
    setShowCreateModal(false);
  };

  const handleDragStart = (id: number) => setDraggingId(id);

  const handleDragOver = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    if (draggingId === null || draggingId === targetId) return;
    const newItems = [...items];
    const dragIndex = newItems.findIndex(i => i.id === draggingId);
    const targetIndex = newItems.findIndex(i => i.id === targetId);
    const [removed] = newItems.splice(dragIndex, 1);
    newItems.splice(targetIndex, 0, removed);
    setItems(newItems);
  };

  return (
    <MainLayout>

      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-white text-xl font-semibold">Backlog</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {filtered.length} items · {totalPoints} story points
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#6366F1]/20"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Items', value: String(filtered.length), color: '#6366F1', bg: '#6366F115', icon: ListChecks },
          { label: 'In Sprint', value: String(inSprintCount), color: '#F59E0B', bg: '#F59E0B15', icon: Target },
          { label: 'Done', value: String(doneCount), color: '#22C55E', bg: '#22C55E15', icon: CheckCircle },
          { label: 'High Priority', value: String(highPrioCount), color: '#EF4444', bg: '#EF444415', icon: AlertTriangle },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4 transition-all duration-200 hover:border-[#3A3A3A]"
            >
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

      {/* Search + Filters */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search backlog..."
              className="pl-9 bg-[#141414] border-[#2A2A2A] text-white placeholder:text-slate-600 focus:border-[#6366F1] rounded-xl"
            />
          </div>
          <div className="flex gap-1">
            {statusFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  filter === f
                    ? 'bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/20'
                    : 'bg-[#141414] text-slate-400 hover:text-white border border-[#2A2A2A]'
                }`}
                type="button"
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {typeFilters.map((f) => (
              <button
                key={f}
                onClick={() => setTypeFilter(f)}
                className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  typeFilter === f
                    ? 'bg-[#0F0F0F] text-white border border-[#3A3A3A]'
                    : 'bg-[#141414] text-slate-400 hover:text-white border border-[#2A2A2A]'
                }`}
                type="button"
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Backlog Table */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-4 py-2 border-b border-[#2A2A2A]">
          <div className="col-span-1" />
          <div className="col-span-4 text-slate-500 text-xs">Title</div>
          <div className="col-span-1 text-slate-500 text-xs">Type</div>
          <div className="col-span-1 text-slate-500 text-xs">Priority</div>
          <div className="col-span-1 text-slate-500 text-xs text-center">Pts</div>
          <div className="col-span-1 text-slate-500 text-xs">Assignee</div>
          <div className="col-span-2 text-slate-500 text-xs">Status</div>
          <div className="col-span-1 text-slate-500 text-xs">Sprint</div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex items-center justify-center p-12">
            <p className="text-slate-500 text-sm">No backlog items found</p>
          </div>
        ) : (
          <div className="divide-y divide-[#2A2A2A]">
            {filtered.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item.id)}
                onDragOver={(e) => handleDragOver(e, item.id)}
                onDragEnd={() => setDraggingId(null)}
                onClick={() => setSelectedItem(item)}
                className={`grid grid-cols-12 gap-2 px-4 py-3 hover:bg-[#0F0F0F] transition-colors group items-center cursor-pointer ${
                  draggingId === item.id ? 'opacity-50' : ''
                }`}
              >
                {/* Drag handle */}
                <div className="col-span-1 flex items-center">
                  <GripVertical className="w-3.5 h-3.5 text-slate-600 opacity-0 group-hover:opacity-100 cursor-grab" />
                </div>

                {/* Title */}
                <div className="col-span-4">
                  <p className={`text-sm ${item.status === 'Done' ? 'text-slate-500 line-through' : 'text-white'}`}>
                    {item.title}
                  </p>
                  <p className="text-slate-600 text-xs mt-0.5 truncate">{item.description}</p>
                </div>

                {/* Type */}
                <div className="col-span-1">
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${typeColors[item.type]}`}>
                    {item.type}
                  </span>
                </div>

                {/* Priority */}
                <div className="col-span-1 flex items-center gap-1">
                  <PriorityIcon priority={item.priority} />
                  <span className={`text-xs ${priorityColors[item.priority]}`}>{item.priority}</span>
                </div>

                {/* Points */}
                <div className="col-span-1 text-center">
                  <span className="text-white text-xs bg-[#0F0F0F] border border-[#2A2A2A] px-2 py-0.5 rounded-full">
                    {item.points}
                  </span>
                </div>

                {/* Assignee */}
                <div className="col-span-1">
                  {item.assignee && (
                    <div className="w-6 h-6 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-xs">
                      {item.assignee.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[item.status]}`}>
                    {item.status}
                  </span>
                </div>

                {/* Sprint */}
                <div className="col-span-1">
                  <span className="text-slate-500 text-xs truncate">{item.sprint || '—'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <>
          <div className="fixed inset-0 bg-black/50 z-20" onClick={() => setSelectedItem(null)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl z-30 max-h-[80vh] overflow-y-auto">

            {/* Modal header */}
            <div className="flex items-start justify-between p-6 border-b border-[#2A2A2A]">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[selectedItem.type]}`}>
                  {selectedItem.type}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[selectedItem.status]}`}>
                  {selectedItem.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal content */}
            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-white font-medium text-base">{selectedItem.title}</h2>
                <p className="text-slate-400 text-sm mt-1">{selectedItem.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-500 text-xs mb-1">Priority</p>
                  <div className="flex items-center gap-1">
                    <PriorityIcon priority={selectedItem.priority} />
                    <span className={`text-sm ${priorityColors[selectedItem.priority]}`}>
                      {selectedItem.priority}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-1">Story Points</p>
                  <span className="text-white text-sm font-medium">{selectedItem.points} pts</span>
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-1">Project</p>
                  <span className="text-white text-sm">{selectedItem.project}</span>
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-1">Assignee</p>
                  <div className="flex items-center gap-2">
                    {selectedItem.assignee ? (
                      <>
                        <div className="w-5 h-5 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-xs">
                          {selectedItem.assignee.charAt(0)}
                        </div>
                        <span className="text-white text-sm">{selectedItem.assignee}</span>
                      </>
                    ) : (
                      <span className="text-slate-500 text-sm">Unassigned</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-1">Sprint</p>
                  <span className="text-white text-sm">{selectedItem.sprint || '—'}</span>
                </div>
              </div>

              {selectedItem.acceptanceCriteria && (
                <div>
                  <p className="text-slate-500 text-xs mb-2">Acceptance Criteria</p>
                  <div className="bg-[#0F0F0F] rounded-lg p-3 space-y-1">
                    {selectedItem.acceptanceCriteria.split('\n').map((line, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1] mt-1.5 shrink-0" />
                        <p className="text-slate-300 text-sm">{line}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-20" onClick={() => setShowCreateModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl z-30 max-h-[90vh] overflow-y-auto">

            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A]">
              <h2 className="text-white font-medium">Add Backlog Item</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal form */}
            <div className="p-6 space-y-4">

              {/* Title */}
              <div className="space-y-1.5">
                <Label className="text-slate-400 text-xs">Title *</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="As a user I can..."
                  className="bg-[#0F0F0F] border-[#2A2A2A] text-white placeholder:text-slate-600 focus:border-[#6366F1]"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label className="text-slate-400 text-xs">Description</Label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe the user story..."
                  rows={3}
                  className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#6366F1] resize-none"
                />
              </div>

              {/* Type + Priority */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-slate-400 text-xs">Type</Label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                    className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]"
                  >
                    <option>Story</option>
                    <option>Bug</option>
                    <option>Task</option>
                    <option>Epic</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-400 text-xs">Priority</Label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value as any })}
                    className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              {/* Points + Status */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-slate-400 text-xs">Story Points</Label>
                  <select
                    value={form.points}
                    onChange={(e) => setForm({ ...form, points: Number(e.target.value) })}
                    className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]"
                  >
                    {[1, 2, 3, 5, 8, 13, 21].map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-400 text-xs">Status</Label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                    className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]"
                  >
                    <option>To Do</option>
                    <option>In Sprint</option>
                    <option>Done</option>
                  </select>
                </div>
              </div>

              {/* Project + Sprint */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-slate-400 text-xs">Project</Label>
                  <select
                    value={form.project}
                    onChange={(e) => setForm({ ...form, project: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]"
                  >
                    <option>ProjectFlow</option>
                    <option>Vaerdia CRM</option>
                    <option>Mobile App</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-400 text-xs">Sprint</Label>
                  <select
                    value={form.sprint}
                    onChange={(e) => setForm({ ...form, sprint: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]"
                  >
                    <option value="">No Sprint</option>
                    <option>Sprint 1</option>
                    <option>Sprint 2</option>
                    <option>Sprint 3</option>
                    <option>Sprint 4</option>
                  </select>
                </div>
              </div>

              {/* Assignee */}
              <div className="space-y-1.5">
                <Label className="text-slate-400 text-xs">Assignee</Label>
                <select
                  value={form.assignee}
                  onChange={(e) => setForm({ ...form, assignee: e.target.value })}
                  className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]"
                >
                  <option value="">Unassigned</option>
                  <option value="AB">Abdesslem</option>
                  <option value="MC">Mohamed Chebil</option>
                  <option value="YC">Ayoub Chebil</option>
                </select>
              </div>

              {/* Acceptance Criteria */}
              <div className="space-y-1.5">
                <Label className="text-slate-400 text-xs">Acceptance Criteria</Label>
                <textarea
                  value={form.acceptanceCriteria}
                  onChange={(e) => setForm({ ...form, acceptanceCriteria: e.target.value })}
                  placeholder="One criteria per line..."
                  rows={4}
                  className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#6366F1] resize-none"
                />
                <p className="text-slate-600 text-xs">Write each acceptance criteria on a new line</p>
              </div>

            </div>

            {/* Modal footer */}
            <div className="flex gap-3 p-6 border-t border-[#2A2A2A]">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white border border-[#2A2A2A] hover:bg-[#0F0F0F] transition-colors"
              >
                Cancel
              </button>
              <Button
                onClick={handleCreate}
                className="flex-1 bg-[#6366F1] hover:bg-[#4F46E5] text-white"
              >
                Add to Backlog
              </Button>
            </div>
          </div>
        </>
      )}

    </MainLayout>
  );
};

export default BacklogPage;
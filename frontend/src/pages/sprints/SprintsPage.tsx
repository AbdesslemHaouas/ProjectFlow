import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Plus, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Task {
  id: number;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
  status: 'Todo' | 'In Progress' | 'Done';
}

interface Sprint {
  id: number;
  name: string;
  goal: string;
  project: string;
  status: 'Planned' | 'Active' | 'Completed';
  startDate: string;
  endDate: string;
  progress: number;
  tasks: Task[];
}

const mockSprints: Sprint[] = [
  {
    id: 1,
    name: 'Sprint 3',
    goal: 'Complete authentication and user management',
    project: 'ProjectFlow',
    status: 'Active',
    startDate: 'Mar 1, 2026',
    endDate: 'Mar 14, 2026',
    progress: 65,
    tasks: [
      { id: 1, title: 'Build auth service', priority: 'High', assignee: 'AB', status: 'Done' },
      { id: 2, title: 'Create login page', priority: 'High', assignee: 'MC', status: 'Done' },
      { id: 3, title: 'User management panel', priority: 'Medium', assignee: 'AB', status: 'In Progress' },
      { id: 4, title: 'Role based dashboard', priority: 'Medium', assignee: 'YC', status: 'Todo' },
    ],
  },
  {
    id: 2,
    name: 'Sprint 4',
    goal: 'Build project and task management features',
    project: 'ProjectFlow',
    status: 'Planned',
    startDate: 'Mar 15, 2026',
    endDate: 'Mar 28, 2026',
    progress: 0,
    tasks: [
      { id: 5, title: 'Projects page', priority: 'High', assignee: 'AB', status: 'Todo' },
      { id: 6, title: 'Tasks kanban board', priority: 'High', assignee: 'MC', status: 'Todo' },
      { id: 7, title: 'Sprint management', priority: 'Medium', assignee: 'YC', status: 'Todo' },
    ],
  },
  {
    id: 3,
    name: 'Sprint 2',
    goal: 'Setup project structure and database',
    project: 'ProjectFlow',
    status: 'Completed',
    startDate: 'Feb 15, 2026',
    endDate: 'Feb 28, 2026',
    progress: 100,
    tasks: [
      { id: 8, title: 'NestJS setup', priority: 'High', assignee: 'AB', status: 'Done' },
      { id: 9, title: 'Database schema', priority: 'High', assignee: 'MC', status: 'Done' },
      { id: 10, title: 'Docker setup', priority: 'Medium', assignee: 'YC', status: 'Done' },
    ],
  },
  {
    id: 4,
    name: 'Sprint 1',
    goal: 'Complete CRM core features',
    project: 'Vaerdia CRM',
    status: 'Active',
    startDate: 'Mar 1, 2026',
    endDate: 'Mar 14, 2026',
    progress: 40,
    tasks: [
      { id: 11, title: 'Customer list', priority: 'High', assignee: 'AB', status: 'In Progress' },
      { id: 12, title: 'Contact management', priority: 'Medium', assignee: 'MC', status: 'Todo' },
    ],
  },
];

const statusColors: Record<string, string> = {
  Active: 'text-green-400 bg-green-400/10 border-green-400/20',
  Planned: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  Completed: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
};

const taskStatusColors: Record<string, string> = {
  Todo: 'text-slate-400 bg-slate-400/10',
  'In Progress': 'text-yellow-400 bg-yellow-400/10',
  Done: 'text-green-400 bg-green-400/10',
};

const priorityColors: Record<string, string> = {
  High: 'text-red-400',
  Medium: 'text-yellow-400',
  Low: 'text-green-400',
};

const progressColors: Record<string, string> = {
  Active: '#22C55E',
  Planned: '#6366F1',
  Completed: '#6366F1',
};

const SprintsPage = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState<number[]>([1]);

  const filters = ['All', 'Active', 'Planned', 'Completed'];

  const filtered = mockSprints.filter((s) => {
    const matchesFilter = filter === 'All' || s.status === filter;
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.project.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleExpand = (id: number) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <MainLayout>

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-semibold">Sprints</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {mockSprints.filter(s => s.status === 'Active').length} active sprints
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white px-4 py-2 rounded-lg text-sm transition-colors">
          <Plus className="w-4 h-4" />
          New Sprint
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sprints..."
            className="pl-9 bg-[#1A1A1A] border-[#2A2A2A] text-white placeholder:text-slate-600 focus:border-[#6366F1]"
          />
        </div>
        <div className="flex gap-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                filter === f
                  ? 'bg-[#6366F1] text-white'
                  : 'bg-[#1A1A1A] text-slate-400 hover:text-white border border-[#2A2A2A]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Sprints List */}
      <div className="space-y-3">
        {filtered.map((sprint) => (
          <div
            key={sprint.id}
            className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden"
          >
            {/* Sprint Header */}
            <div
              className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#0F0F0F] transition-colors"
              onClick={() => toggleExpand(sprint.id)}
            >
              {/* Expand icon */}
              <button className="text-slate-500 shrink-0">
                {expanded.includes(sprint.id)
                  ? <ChevronUp className="w-4 h-4" />
                  : <ChevronDown className="w-4 h-4" />
                }
              </button>

              {/* Sprint info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-medium text-sm">{sprint.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[sprint.status]}`}>
                    {sprint.status}
                  </span>
                  <span className="text-xs text-slate-500 bg-[#0F0F0F] px-2 py-0.5 rounded-full">
                    {sprint.project}
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
                <div className="w-full bg-[#0F0F0F] rounded-full h-1">
                  <div
                    className="h-1 rounded-full"
                    style={{
                      width: `${sprint.progress}%`,
                      backgroundColor: progressColors[sprint.status],
                    }}
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="text-right shrink-0">
                <p className="text-slate-400 text-xs">{sprint.startDate}</p>
                <p className="text-slate-600 text-xs">→ {sprint.endDate}</p>
              </div>

              {/* Task count */}
              <div className="text-center shrink-0">
                <p className="text-white text-sm font-medium">{sprint.tasks.length}</p>
                <p className="text-slate-500 text-xs">tasks</p>
              </div>
            </div>

            {/* Sprint Tasks */}
            {expanded.includes(sprint.id) && (
              <div className="border-t border-[#2A2A2A] p-4">
                <div className="space-y-2">
                  {sprint.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#0F0F0F] transition-colors group"
                    >
                      {/* Status dot */}
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        task.status === 'Done' ? 'bg-green-400' :
                        task.status === 'In Progress' ? 'bg-yellow-400' :
                        'bg-slate-500'
                      }`} />

                      {/* Task title */}
                      <p className={`flex-1 text-sm ${
                        task.status === 'Done' ? 'text-slate-500 line-through' : 'text-slate-300'
                      }`}>
                        {task.title}
                      </p>

                      {/* Priority */}
                      <span className={`text-xs ${priorityColors[task.priority]}`}>
                        {task.priority}
                      </span>

                      {/* Status badge */}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${taskStatusColors[task.status]}`}>
                        {task.status}
                      </span>

                      {/* Assignee */}
                      <div className="w-5 h-5 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-xs shrink-0">
                        {task.assignee.charAt(0)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add task button */}
                <button className="flex items-center gap-2 text-slate-500 hover:text-white text-xs mt-3 px-3 transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  Add task to sprint
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

    </MainLayout>
  );
};

export default SprintsPage;
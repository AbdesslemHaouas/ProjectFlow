import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Plus, MoreHorizontal, Search, ListChecks, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
  dueDate: string;
  project: string;
}

type Column = 'Todo' | 'In Progress' | 'In Review' | 'Done';

const initialTasks: Record<Column, Task[]> = {
  'Todo': [
    {
      id: 1,
      title: 'Design login page',
      description: 'Create wireframes and mockups for the login page',
      priority: 'High',
      assignee: 'AB',
      dueDate: 'Mar 10',
      project: 'ProjectFlow',
    },
    {
      id: 2,
      title: 'Setup PostgreSQL',
      description: 'Configure database and create schemas',
      priority: 'Medium',
      assignee: 'YC',
      dueDate: 'Mar 12',
      project: 'Vaerdia CRM',
    },
  ],
  'In Progress': [
    {
      id: 3,
      title: 'Build auth service',
      description: 'Implement JWT authentication with NestJS',
      priority: 'High',
      assignee: 'AB',
      dueDate: 'Mar 8',
      project: 'ProjectFlow',
    },
    {
      id: 4,
      title: 'Create dashboard UI',
      description: 'Build responsive dashboard with charts',
      priority: 'Medium',
      assignee: 'MC',
      dueDate: 'Mar 9',
      project: 'ProjectFlow',
    },
  ],
  'In Review': [
    {
      id: 5,
      title: 'API documentation',
      description: 'Write Swagger docs for all endpoints',
      priority: 'Low',
      assignee: 'YC',
      dueDate: 'Mar 7',
      project: 'Mobile App',
    },
  ],
  'Done': [
    {
      id: 6,
      title: 'Project setup',
      description: 'Initialize NestJS project with dependencies',
      priority: 'High',
      assignee: 'AB',
      dueDate: 'Mar 1',
      project: 'ProjectFlow',
    },
    {
      id: 7,
      title: 'Database schema',
      description: 'Design and implement database schema',
      priority: 'Medium',
      assignee: 'MC',
      dueDate: 'Mar 3',
      project: 'Vaerdia CRM',
    },
  ],
};

const priorityColors: Record<string, string> = {
  High: 'text-red-400 bg-red-400/10',
  Medium: 'text-yellow-400 bg-yellow-400/10',
  Low: 'text-green-400 bg-green-400/10',
};

const columnColors: Record<Column, string> = {
  'Todo': 'text-slate-400',
  'In Progress': 'text-yellow-400',
  'In Review': 'text-blue-400',
  'Done': 'text-green-400',
};

const columnDots: Record<Column, string> = {
  'Todo': 'bg-slate-400',
  'In Progress': 'bg-yellow-400',
  'In Review': 'bg-blue-400',
  'Done': 'bg-green-400',
};

const columns: Column[] = ['Todo', 'In Progress', 'In Review', 'Done'];

const TasksPage = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState('');
  const [dragging, setDragging] = useState<{ task: Task; from: Column } | null>(null);

  const allTasks = Object.values(tasks).flat();
  const todoCount = tasks['Todo'].length;
  const inProgressCount = tasks['In Progress'].length;
  const doneCount = tasks['Done'].length;
  const highPrioOpenCount = allTasks.filter(t => t.priority === 'High').length - tasks['Done'].filter(t => t.priority === 'High').length;

  const handleDragStart = (task: Task, from: Column) => {
    setDragging({ task, from });
  };

  const handleDrop = (to: Column) => {
    if (!dragging || dragging.from === to) return;

    const newTasks = { ...tasks };
    newTasks[dragging.from] = newTasks[dragging.from].filter(t => t.id !== dragging.task.id);
    newTasks[to] = [...newTasks[to], dragging.task];
    setTasks(newTasks);
    setDragging(null);
  };

  const filterTasks = (taskList: Task[]) =>
    taskList.filter(t =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.project.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <MainLayout>

      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-white text-xl font-semibold">Tasks</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {allTasks.length} tasks total
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#6366F1]/20">
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Todo', value: String(todoCount), color: '#94A3B8', bg: '#94A3B815', icon: ListChecks },
          { label: 'In Progress', value: String(inProgressCount), color: '#F59E0B', bg: '#F59E0B15', icon: Zap },
          { label: 'Done', value: String(doneCount), color: '#22C55E', bg: '#22C55E15', icon: CheckCircle },
          { label: 'High Priority Open', value: String(Math.max(0, highPrioOpenCount)), color: '#EF4444', bg: '#EF444415', icon: AlertTriangle },
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

      {/* Search */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4 mb-6">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="pl-9 bg-[#141414] border-[#2A2A2A] text-white placeholder:text-slate-600 focus:border-[#6366F1] rounded-xl"
          />
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-4 gap-4 h-full">
        {columns.map((column) => (
          <div
            key={column}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(column)}
            className={`bg-[#1A1A1A] border rounded-2xl p-4 transition-colors ${
              dragging && dragging.from !== column
                ? 'border-[#6366F1]/50 bg-[#6366F1]/5'
                : 'border-[#2A2A2A]'
            }`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${columnDots[column]}`} />
                <span className={`text-xs font-medium ${columnColors[column]}`}>
                  {column}
                </span>
                <span className="text-xs text-slate-600 bg-[#0F0F0F] px-1.5 py-0.5 rounded-full">
                  {filterTasks(tasks[column]).length}
                </span>
              </div>
              <button className="text-slate-600 hover:text-white transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tasks */}
            <div className="space-y-2">
              {filterTasks(tasks[column]).map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task, column)}
                  className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-3 cursor-grab active:cursor-grabbing hover:border-[#3A3A3A] transition-colors group"
                >
                  {/* Task header */}
                  <div className="flex items-start justify-between mb-2">
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                    <button className="text-slate-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Title */}
                  <p className="text-white text-xs font-medium mb-1">{task.title}</p>
                  <p className="text-slate-500 text-xs mb-3 line-clamp-2">{task.description}</p>

                  {/* Project tag */}
                  <div className="mb-3">
                    <span className="text-xs text-[#6366F1] bg-[#6366F1]/10 px-1.5 py-0.5 rounded-full">
                      {task.project}
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="w-5 h-5 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-xs">
                      {task.assignee.charAt(0)}
                    </div>
                    <span className="text-slate-600 text-xs">{task.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </MainLayout>
  );
};

export default TasksPage;
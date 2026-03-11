import { MoreHorizontal, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Task } from '../types';
import { PRIORITY_COLORS } from '../constants';
import { useDeleteTask } from '../api';

interface Props {
  task: Task;
  onClick: () => void;
}

const TaskCard = ({ task, onClick }: Props) => {
  const { mutate: deleteTask } = useDeleteTask();
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Delete this task?')) return;
    deleteTask(task.id);
  };

  return (
    <div
      draggable
      onClick={onClick}
      className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-3 cursor-grab active:cursor-grabbing hover:border-[#3A3A3A] transition-colors group"
    >
      <div className="flex items-start justify-between mb-2">
        <span className={`text-xs px-1.5 py-0.5 rounded-full ${PRIORITY_COLORS[task.priority]}`}>
          {task.priority}
        </span>
        <button
          onClick={handleDelete}
          className="text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-white text-xs font-medium mb-1">{task.title}</p>
      {task.description && (
        <p className="text-slate-500 text-xs mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1.5">
          {task.storyPoints > 0 && (
            <span className="text-xs text-slate-500 bg-[#1A1A1A] px-1.5 py-0.5 rounded-full">
              {task.storyPoints}pts
            </span>
          )}
        </div>
        {task.dueDate && (
          <span className="text-slate-600 text-xs">{task.dueDate.slice(0, 10)}</span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;


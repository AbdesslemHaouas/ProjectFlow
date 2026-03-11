import { X, Trash2 } from 'lucide-react';
import { Task } from '../types';
import { PRIORITY_COLORS } from '../constants';
import { useDeleteTask } from '../api';

interface Props {
  task: Task;
  onClose: () => void;
}

const TaskDetailModal = ({ task, onClose }: Props) => {
  const { mutate: deleteTask } = useDeleteTask();

  const handleDelete = () => {
    if (!confirm('Delete this task?')) return;
    deleteTask(task.id, { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl w-full max-w-lg">
        <div className="flex items-center justify-between p-5 border-b border-[#2A2A2A]">
          <div className="flex items-center gap-3">
            <span className={`text-xs px-2 py-0.5 rounded-full ${PRIORITY_COLORS[task.priority]}`}>
              {task.priority}
            </span>
            <span className="text-xs text-slate-500 bg-[#0F0F0F] px-2 py-0.5 rounded-full">
              {task.status}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleDelete} className="text-red-400 hover:text-red-300 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <h2 className="text-white font-semibold text-lg">{task.title}</h2>

          {task.description && (
            <p className="text-slate-400 text-sm">{task.description}</p>
          )}

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <p className="text-slate-500 text-xs mb-1">Project</p>
              <p className="text-white text-sm">#{task.projectId}</p>
            </div>
            {task.sprintId && (
              <div>
                <p className="text-slate-500 text-xs mb-1">Sprint</p>
                <p className="text-white text-sm">#{task.sprintId}</p>
              </div>
            )}
            {task.dueDate && (
              <div>
                <p className="text-slate-500 text-xs mb-1">Due Date</p>
                <p className="text-white text-sm">{task.dueDate.slice(0, 10)}</p>
              </div>
            )}
            {task.storyPoints > 0 && (
              <div>
                <p className="text-slate-500 text-xs mb-1">Story Points</p>
                <p className="text-white text-sm">{task.storyPoints}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;

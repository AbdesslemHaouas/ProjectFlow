import { X, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { BacklogItem } from '../types';
import { BACKLOG_TYPE_COLORS, BACKLOG_STATUS_COLORS, BACKLOG_PRIORITY_COLORS } from '../constants';

interface Props {
  item: BacklogItem;
  onClose: () => void;
  onDelete: (id: number) => void;
  getProjectName: (id: number) => string;
  getSprintName: (id?: number) => string;
}

const PriorityIcon = ({ priority }: { priority: string }) => {
  if (priority === 'High') return <ArrowUp className="w-3.5 h-3.5 text-red-400" />;
  if (priority === 'Low') return <ArrowDown className="w-3.5 h-3.5 text-green-400" />;
  return <Minus className="w-3.5 h-3.5 text-yellow-400" />;
};

const BacklogItemDetail = ({ item, onClose, onDelete, getProjectName, getSprintName }: Props) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-20" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl z-30 max-h-[80vh] overflow-y-auto">
        <div className="flex items-start justify-between p-6 border-b border-[#2A2A2A]">
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-0.5 rounded-full ${BACKLOG_TYPE_COLORS[item.type]}`}>{item.type}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${BACKLOG_STATUS_COLORS[item.status]}`}>{item.status}</span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-white font-medium text-base">{item.title}</h2>
            <p className="text-slate-400 text-sm mt-1">{item.description || 'No description'}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-slate-500 text-xs mb-1">Priority</p>
              <div className="flex items-center gap-1">
                <PriorityIcon priority={item.priority} />
                <span className={`text-sm ${BACKLOG_PRIORITY_COLORS[item.priority]}`}>{item.priority}</span>
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Story Points</p>
              <span className="text-white text-sm font-medium">{item.points} pts</span>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Project</p>
              <span className="text-white text-sm">{getProjectName(item.projectId)}</span>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Sprint</p>
              <span className="text-white text-sm">{getSprintName(item.sprintId)}</span>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Created</p>
              <span className="text-white text-sm">
                {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>

          {item.acceptanceCriteria && (
            <div>
              <p className="text-slate-500 text-xs mb-2">Acceptance Criteria</p>
              <div className="bg-[#0F0F0F] rounded-lg p-3 space-y-1">
                {item.acceptanceCriteria.split('\n').map((line, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1] mt-1.5 shrink-0" />
                    <p className="text-slate-300 text-sm">{line}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 p-6 border-t border-[#2A2A2A]">
          <button onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white border border-[#2A2A2A] hover:bg-[#0F0F0F] transition-colors">
            Close
          </button>
          <button onClick={() => { if (confirm('Delete this item?')) { onDelete(item.id); onClose(); } }}
            className="px-4 py-2.5 rounded-xl text-sm text-red-400 border border-red-400/20 hover:bg-red-400/10 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default BacklogItemDetail;

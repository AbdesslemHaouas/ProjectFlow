import { X } from 'lucide-react';
import { Project } from '../types';
import { PROJECT_TYPE_COLORS, PROJECT_STATUS_COLORS, PROJECT_PROGRESS_COLORS } from '../constants';
import { formatProjectDate } from '../helpers';

interface Props {
  project: Project;
  onClose: () => void;
  onDelete: (id: number) => void;
}

const ProjectDetailModal = ({ project, onClose, onDelete }: Props) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#141414] border border-[#2A2A2A] rounded-2xl z-30 shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between p-6 border-b border-[#2A2A2A]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${PROJECT_TYPE_COLORS[project.type]}`}>{project.type}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${PROJECT_STATUS_COLORS[project.status]}`}>{project.status}</span>
            </div>
            <h2 className="text-white font-semibold text-lg">{project.name}</h2>
            <p className="text-slate-500 text-sm mt-1">{project.description || 'No description'}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-2 rounded-xl hover:bg-[#2A2A2A]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-3">
              <p className="text-slate-500 text-xs">Chef Projet ID</p>
              <p className="text-white text-sm font-medium mt-1">#{project.chefProjetId}</p>
            </div>
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-3">
              <p className="text-slate-500 text-xs">Members</p>
              <p className="text-white text-sm font-medium mt-1">{project.memberIds?.length || 0}</p>
            </div>
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-3">
              <p className="text-slate-500 text-xs">Due date</p>
              <p className="text-white text-sm font-medium mt-1">{formatProjectDate(project.endDate)}</p>
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-500 text-xs">Progress</p>
              <p className="text-slate-400 text-xs tabular-nums">{project.progress}%</p>
            </div>
            <div className="w-full bg-[#141414] border border-[#2A2A2A] rounded-full h-2 overflow-hidden">
              <div className="h-2 rounded-full"
                style={{ width: `${project.progress}%`, backgroundColor: PROJECT_PROGRESS_COLORS[project.status] || '#6366F1' }} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-3">
              <p className="text-slate-500 text-xs">Start Date</p>
              <p className="text-white text-sm font-medium mt-1">{formatProjectDate(project.startDate)}</p>
            </div>
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-3">
              <p className="text-slate-500 text-xs">Created</p>
              <p className="text-white text-sm font-medium mt-1">{formatProjectDate(project.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t border-[#2A2A2A]">
          <button onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white border border-[#2A2A2A] hover:bg-[#1A1A1A] transition-colors">
            Close
          </button>
          <button onClick={() => { if (confirm('Delete this project?')) { onDelete(project.id); onClose(); } }}
            className="px-4 py-2.5 rounded-xl text-sm text-red-400 border border-red-400/20 hover:bg-red-400/10 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailModal;
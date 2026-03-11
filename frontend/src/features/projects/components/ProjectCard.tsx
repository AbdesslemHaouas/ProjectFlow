import { Calendar, Users, ArrowRight, Trash2 } from 'lucide-react';
import { Project } from '../types';
import { PROJECT_TYPE_COLORS, PROJECT_STATUS_COLORS, PROJECT_PROGRESS_COLORS } from '../constants';
import { formatProjectDate } from '../helpers';

interface Props {
  project: Project;
  onClick: (project: Project) => void;
  onDelete: (id: number) => void;
}

const ProjectCard = ({ project, onClick, onDelete }: Props) => {
  return (
    <div
      onClick={() => onClick(project)}
      className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-5 hover:border-[#3A3A3A] transition-all duration-200 cursor-pointer group hover:shadow-xl hover:shadow-black/20"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${PROJECT_TYPE_COLORS[project.type]}`}>{project.type}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full border ${PROJECT_STATUS_COLORS[project.status]}`}>{project.status}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); if (confirm('Delete this project?')) onDelete(project.id); }}
            className="text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <div className="w-9 h-9 rounded-xl bg-[#141414] border border-[#2A2A2A] flex items-center justify-center text-slate-500 group-hover:text-white group-hover:border-[#3A3A3A] transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      <h3 className="text-white font-medium text-sm mb-1 group-hover:text-[#6366F1] transition-colors">{project.name}</h3>
      <p className="text-slate-500 text-xs mb-4 line-clamp-2">{project.description || 'No description'}</p>

      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-slate-500 text-xs">Progress</span>
          <span className="text-slate-400 text-xs">{project.progress}%</span>
        </div>
        <div className="w-full bg-[#141414] border border-[#2A2A2A] rounded-full h-1.5 overflow-hidden">
          <div className="h-1.5 rounded-full transition-all"
            style={{ width: `${project.progress}%`, backgroundColor: PROJECT_PROGRESS_COLORS[project.status] || '#6366F1' }} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#141414] border border-[#2A2A2A] flex items-center justify-center">
            <Users className="w-4 h-4 text-slate-500" />
          </div>
          <div className="flex -space-x-2">
            {(project.memberIds || []).slice(0, 4).map((id, i) => (
              <div key={i} className="w-7 h-7 rounded-full bg-[#6366F1] border-2 border-[#1A1A1A] flex items-center justify-center text-white text-xs font-medium">
                {id}
              </div>
            ))}
            {(project.memberIds || []).length === 0 && <span className="text-slate-600 text-xs">No members</span>}
            {(project.memberIds || []).length > 4 && (
              <div className="w-7 h-7 rounded-full bg-[#141414] border-2 border-[#1A1A1A] flex items-center justify-center text-slate-400 text-xs font-medium">
                +{project.memberIds.length - 4}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-600 text-xs shrink-0">
          <Calendar className="w-3.5 h-3.5" />
          {formatProjectDate(project.endDate)}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
import { X, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreateProject } from '../api';
import { createProjectSchema, CreateProjectFormData } from '../schemas';
import { ProjectType } from '../types';
import { useAuthStore } from '@/store/auth.store';
interface Props {
  onClose: () => void;
}
const CreateProjectModal = ({ onClose }: Props) => {
  const { mutate: createProject, isPending } = useCreateProject();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: { type: ProjectType.SCRUM },
  });

  const onSubmit = (data: CreateProjectFormData) => {
  createProject(
    {
      name: data.name,
      description: data.description,
      type: data.type as ProjectType,
      startDate: data.startDate,
      endDate: data.endDate,
    },
    { onSuccess: () => { reset(); onClose(); } }
  );
};

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#141414] border border-[#2A2A2A] rounded-2xl z-30 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A]">
          <div>
            <h2 className="text-white font-semibold">Create New Project</h2>
            <p className="text-slate-500 text-xs mt-0.5">Set up a new workspace for your team</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-2 rounded-xl hover:bg-[#2A2A2A]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-slate-400 text-xs">Project Name *</label>
              <Input {...register('name')} placeholder="Enter project name"
                className="bg-[#0F0F0F] border-[#2A2A2A] text-white placeholder:text-slate-600 focus:border-[#6366F1] rounded-xl" />
              {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400 text-xs">Description</label>
              <textarea {...register('description')} placeholder="Enter project description" rows={3}
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl px-3 py-2 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#6366F1] resize-none" />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400 text-xs">Project Type</label>
              <select {...register('type')} className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]">
                <option value={ProjectType.SCRUM}>Scrum</option>
                <option value={ProjectType.KANBAN}>Kanban</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs">Start Date</label>
                <Input type="date" {...register('startDate')} className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1] rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs">End Date</label>
                <Input type="date" {...register('endDate')} className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1] rounded-xl" />
              </div>
            </div>
          </div>

          <div className="flex gap-3 p-6 border-t border-[#2A2A2A]">
            <button type="button" onClick={() => { reset(); onClose(); }}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white border border-[#2A2A2A] hover:bg-[#1A1A1A] transition-colors">
              Cancel
            </button>
            <Button type="submit" disabled={isPending} className="flex-1 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl">
              {isPending ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Creating...</> : 'Create Project'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProjectModal;
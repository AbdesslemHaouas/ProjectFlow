import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useCreateSprint } from '../api';
import { useGetProjects } from '../api';
import { createSprintSchema, CreateSprintFormData } from '../schemas';

interface Props {
  onClose: () => void;
}

const CreateSprintModal = ({ onClose }: Props) => {
  const { mutate: createSprint, isPending } = useCreateSprint();
  const { data: projects } = useGetProjects();

  const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(createSprintSchema),
});

const onSubmit = (data: any) => {
  createSprint(
    {
      name: data.name,
      goal: data.goal,
      projectId: Number(data.projectId),
      startDate: data.startDate,
      endDate: data.endDate,
    },
    { onSuccess: onClose }
  );
};

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b border-[#2A2A2A]">
          <h2 className="text-white font-semibold">New Sprint</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          <div className="space-y-1.5">
            <Label className="text-slate-400 text-xs">Sprint Name</Label>
            <Input {...register('name')} placeholder="Sprint 1"
              className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1]" />
            {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-400 text-xs">Goal</Label>
            <Input {...register('goal')} placeholder="Sprint goal..."
              className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1]" />
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-400 text-xs">Project</Label>
            <select {...register('projectId')}
              className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]">
              <option value="">Select project...</option>
              {projects?.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            {errors.projectId && <p className="text-red-400 text-xs">{errors.projectId.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-slate-400 text-xs">Start Date</Label>
              <Input type="date" {...register('startDate')}
                className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1]" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-400 text-xs">End Date</Label>
              <Input type="date" {...register('endDate')}
                className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1]" />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" onClick={onClose} variant="outline"
              className="flex-1 border-[#2A2A2A] text-slate-400 hover:text-white bg-transparent">
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}
              className="flex-1 bg-[#6366F1] hover:bg-[#4F46E5] text-white">
              {isPending ? 'Creating...' : 'Create Sprint'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSprintModal;
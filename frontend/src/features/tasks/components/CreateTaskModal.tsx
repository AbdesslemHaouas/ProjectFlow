import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useCreateTask } from '../api';
import { useGetProjects } from '@/features/projects/api';
import { useGetSprints } from '@/features/projects/api';
import { createTaskSchema, CreateTaskFormData } from '../schemas';

interface Props {
  onClose: () => void;
  defaultStatus?: string;
}

const CreateTaskModal = ({ onClose, defaultStatus = 'Todo' }: Props) => {
  const { mutate: createTask, isPending } = useCreateTask();
  const { data: projects } = useGetProjects();
  const { data: sprints } = useGetSprints();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(createTaskSchema),
    defaultValues: { priority: 'Medium' },
  });

  const onSubmit = (data: any) => {
    createTask(
      {
        title: data.title,
        description: data.description,
        priority: data.priority,
        dueDate: data.dueDate,
        storyPoints: data.storyPoints ? Number(data.storyPoints) : undefined,
        projectId: Number(data.projectId),
        sprintId: data.sprintId ? Number(data.sprintId) : undefined,
        status: defaultStatus as any,
      },
      { onSuccess: onClose }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b border-[#2A2A2A]">
          <h2 className="text-white font-semibold">New Task</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          <div className="space-y-1.5">
            <Label className="text-slate-400 text-xs">Title</Label>
            <Input {...register('title')} placeholder="Task title..."
              className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1]" />
            {errors.title && <p className="text-red-400 text-xs">{errors.title.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-400 text-xs">Description</Label>
            <textarea {...register('description')} placeholder="Task description..." rows={3}
              className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl px-3 py-2 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#6366F1] resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-slate-400 text-xs">Priority</Label>
              <select {...register('priority')}
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-400 text-xs">Due Date</Label>
              <Input type="date" {...register('dueDate')}
                className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
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
            <div className="space-y-1.5">
              <Label className="text-slate-400 text-xs">Sprint</Label>
              <select {...register('sprintId')}
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]">
                <option value="">No sprint</option>
                {sprints?.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-400 text-xs">Story Points</Label>
            <Input type="number" {...register('storyPoints')} placeholder="0"
              className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1]" />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" onClick={onClose} variant="outline"
              className="flex-1 border-[#2A2A2A] text-slate-400 hover:text-white bg-transparent">
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}
              className="flex-1 bg-[#6366F1] hover:bg-[#4F46E5] text-white">
              {isPending ? 'Creating...' : 'Create Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;



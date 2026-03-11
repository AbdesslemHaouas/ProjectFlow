import { X, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useCreateBacklogItem, useGetProjects, useGetSprints } from '../api';
import { STORY_POINTS } from '../constants';

interface Props {
  onClose: () => void;
}

const defaultForm = {
  title: '',
  description: '',
  type: 'Story',
  priority: 'Medium',
  points: 5,
  status: 'To Do',
  projectId: 0,
  sprintId: undefined as number | undefined,
  acceptanceCriteria: '',
};

const CreateBacklogModal = ({ onClose }: Props) => {
  const [form, setForm] = useState(defaultForm);

  const { data: projects } = useGetProjects();
  const { data: sprints } = useGetSprints(form.projectId || undefined);
  const { mutate: createBacklogItem, isPending } = useCreateBacklogItem();

  const handleCreate = () => {
    if (!form.title.trim() || !form.projectId) return;
    createBacklogItem(
      { title: form.title, description: form.description, type: form.type, priority: form.priority, points: form.points, projectId: form.projectId, sprintId: form.sprintId, acceptanceCriteria: form.acceptanceCriteria },
      { onSuccess: () => { setForm(defaultForm); onClose(); } }
    );
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-20" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl z-30 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A]">
          <h2 className="text-white font-medium">Add Backlog Item</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-1.5">
            <Label className="text-slate-400 text-xs">Title *</Label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="As a user I can..." className="bg-[#0F0F0F] border-[#2A2A2A] text-white placeholder:text-slate-600 focus:border-[#6366F1]" />
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-400 text-xs">Description</Label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the user story..." rows={3}
              className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#6366F1] resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-slate-400 text-xs">Type</Label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]">
                <option>Story</option><option>Bug</option><option>Task</option><option>Epic</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-400 text-xs">Priority</Label>
              <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]">
                <option>High</option><option>Medium</option><option>Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-slate-400 text-xs">Story Points</Label>
              <select value={form.points} onChange={(e) => setForm({ ...form, points: Number(e.target.value) })}
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]">
                {STORY_POINTS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-400 text-xs">Status</Label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]">
                <option>To Do</option><option>In Sprint</option><option>Done</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-400 text-xs">Project *</Label>
            <select value={form.projectId} onChange={(e) => setForm({ ...form, projectId: Number(e.target.value), sprintId: undefined })}
              className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]">
              <option value={0}>Select project...</option>
              {(projects || []).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-400 text-xs">Sprint</Label>
            <select value={form.sprintId || ''} onChange={(e) => setForm({ ...form, sprintId: e.target.value ? Number(e.target.value) : undefined })}
              disabled={!form.projectId}
              className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1] disabled:opacity-50">
              <option value="">No Sprint</option>
              {(sprints || []).map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-400 text-xs">Acceptance Criteria</Label>
            <textarea value={form.acceptanceCriteria} onChange={(e) => setForm({ ...form, acceptanceCriteria: e.target.value })}
              placeholder="One criteria per line..." rows={4}
              className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#6366F1] resize-none" />
            <p className="text-slate-600 text-xs">Write each acceptance criteria on a new line</p>
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t border-[#2A2A2A]">
          <button onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white border border-[#2A2A2A] hover:bg-[#0F0F0F] transition-colors">
            Cancel
          </button>
          <Button onClick={handleCreate} disabled={isPending || !form.title.trim() || !form.projectId}
            className="flex-1 bg-[#6366F1] hover:bg-[#4F46E5] text-white">
            {isPending ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Adding...</> : 'Add to Backlog'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateBacklogModal;


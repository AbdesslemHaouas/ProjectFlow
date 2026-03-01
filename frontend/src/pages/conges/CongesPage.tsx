import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Plus, X, Calendar, Clock, CheckCircle, XCircle, Palmtree, Stethoscope, Baby, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth.store';

interface LeaveRequest {
  id: number;
  employeeName: string;
  employeeInitials: string;
  type: 'Congé Annuel' | 'Maladie' | 'Maternité' | 'Sans Solde' | 'Exceptionnel';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedAt: string;
  color: string;
}

const mockLeaves: LeaveRequest[] = [
  {
    id: 1,
    employeeName: 'Abdesslem Haouas',
    employeeInitials: 'AH',
    type: 'Congé Annuel',
    startDate: 'Mar 15, 2026',
    endDate: 'Mar 22, 2026',
    days: 7,
    reason: 'Family vacation',
    status: 'Approved',
    submittedAt: 'Mar 1, 2026',
    color: '#6366F1',
  },
  {
    id: 2,
    employeeName: 'Mohamed Chebil',
    employeeInitials: 'MC',
    type: 'Maladie',
    startDate: 'Mar 10, 2026',
    endDate: 'Mar 12, 2026',
    days: 3,
    reason: 'Medical appointment',
    status: 'Approved',
    submittedAt: 'Mar 9, 2026',
    color: '#22C55E',
  },
  {
    id: 3,
    employeeName: 'Ayoub Chebil',
    employeeInitials: 'AC',
    type: 'Congé Annuel',
    startDate: 'Apr 1, 2026',
    endDate: 'Apr 7, 2026',
    days: 6,
    reason: 'Personal time off',
    status: 'Pending',
    submittedAt: 'Mar 5, 2026',
    color: '#F59E0B',
  },
  {
    id: 4,
    employeeName: 'Sara Ben Ali',
    employeeInitials: 'SB',
    type: 'Maternité',
    startDate: 'Apr 15, 2026',
    endDate: 'Jul 15, 2026',
    days: 90,
    reason: 'Maternity leave',
    status: 'Approved',
    submittedAt: 'Mar 10, 2026',
    color: '#EC4899',
  },
  {
    id: 5,
    employeeName: 'Karim Trabelsi',
    employeeInitials: 'KT',
    type: 'Sans Solde',
    startDate: 'Mar 20, 2026',
    endDate: 'Mar 25, 2026',
    days: 5,
    reason: 'Personal reasons',
    status: 'Rejected',
    submittedAt: 'Mar 8, 2026',
    color: '#EF4444',
  },
  {
    id: 6,
    employeeName: 'Leila Mansouri',
    employeeInitials: 'LM',
    type: 'Exceptionnel',
    startDate: 'Mar 18, 2026',
    endDate: 'Mar 19, 2026',
    days: 2,
    reason: 'Family emergency',
    status: 'Pending',
    submittedAt: 'Mar 17, 2026',
    color: '#8B5CF6',
  },
];

const typeIcons: Record<string, any> = {
  'Congé Annuel': Palmtree,
  'Maladie': Stethoscope,
  'Maternité': Baby,
  'Sans Solde': Clock,
  'Exceptionnel': Calendar,
};

const typeColors: Record<string, string> = {
  'Congé Annuel': '#6366F1',
  'Maladie': '#22C55E',
  'Maternité': '#EC4899',
  'Sans Solde': '#EF4444',
  'Exceptionnel': '#8B5CF6',
};

const statusConfig: Record<string, { color: string; bg: string; border: string; icon: any }> = {
  Pending: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', icon: Clock },
  Approved: { color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20', icon: CheckCircle },
  Rejected: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', icon: XCircle },
};

const defaultForm = {
  type: 'Congé Annuel' as const,
  startDate: '',
  endDate: '',
  reason: '',
};

const CongesPage = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin' || user?.role === 'chef_projet';

  const [leaves, setLeaves] = useState<LeaveRequest[]>(mockLeaves);
  const [filter, setFilter] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const filters = ['All', 'Pending', 'Approved', 'Rejected'];

  const filtered = leaves.filter(l =>
    filter === 'All' || l.status === filter
  );

  const stats = {
    total: leaves.length,
    pending: leaves.filter(l => l.status === 'Pending').length,
    approved: leaves.filter(l => l.status === 'Approved').length,
    rejected: leaves.filter(l => l.status === 'Rejected').length,
  };

  const handleStatusChange = (id: number, status: 'Approved' | 'Rejected') => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status } : l));
    setSelectedLeave(null);
  };

  const handleCreate = () => {
    if (!form.startDate || !form.endDate) return;
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const newLeave: LeaveRequest = {
      id: leaves.length + 1,
      employeeName: `${user?.prenom} ${user?.nom}` || 'Unknown',
      employeeInitials: `${user?.prenom?.charAt(0)}${user?.nom?.charAt(0)}` || 'XX',
      type: form.type,
      startDate: new Date(form.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      endDate: new Date(form.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      days,
      reason: form.reason,
      status: 'Pending',
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      color: typeColors[form.type],
    };

    setLeaves([newLeave, ...leaves]);
    setForm(defaultForm);
    setShowCreateModal(false);
  };

  return (
    <MainLayout>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-semibold">Congés</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Manage leave requests and approvals
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#6366F1]/20"
        >
          <Plus className="w-4 h-4" />
          Request Leave
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Requests', value: stats.total, color: '#6366F1', bg: '#6366F115' },
          { label: 'Pending', value: stats.pending, color: '#F59E0B', bg: '#F59E0B15' },
          { label: 'Approved', value: stats.approved, color: '#22C55E', bg: '#22C55E15' },
          { label: 'Rejected', value: stats.rejected, color: '#EF4444', bg: '#EF444415' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4 transition-all duration-200 hover:border-[#3A3A3A]"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-500 text-xs">{stat.label}</p>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.bg }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stat.color }} />
              </div>
            </div>
            <p className="text-white text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
              filter === f
                ? 'bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/20'
                : 'bg-[#1A1A1A] text-slate-400 hover:text-white border border-[#2A2A2A]'
            }`}
          >
            {f}
            {f !== 'All' && (
              <span className="ml-1.5 text-xs opacity-70">
                ({leaves.filter(l => l.status === f).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Leave Cards */}
      <div className="space-y-3">
        {filtered.map((leave) => {
          const TypeIcon = typeIcons[leave.type];
          const status = statusConfig[leave.status];
          const StatusIcon = status.icon;

          return (
            <div
              key={leave.id}
              onMouseEnter={() => setHoveredCard(leave.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setSelectedLeave(leave)}
              className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:border-[#3A3A3A] hover:shadow-xl hover:shadow-black/20"
              style={{
                transform: hoveredCard === leave.id ? 'translateX(4px)' : 'translateX(0)',
              }}
            >
              <div className="flex items-center gap-4">

                {/* Type icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${typeColors[leave.type]}15` }}
                >
                  <TypeIcon className="w-5 h-5" style={{ color: typeColors[leave.type] }} />
                </div>

                {/* Employee */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0"
                  style={{ backgroundColor: leave.color }}
                >
                  {leave.employeeInitials}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-white text-sm font-medium">{leave.employeeName}</p>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ color: typeColors[leave.type], backgroundColor: `${typeColors[leave.type]}15` }}
                    >
                      {leave.type}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs truncate">{leave.reason}</p>
                </div>

                {/* Dates */}
                <div className="text-center shrink-0">
                  <p className="text-white text-sm font-medium">{leave.days} days</p>
                  <p className="text-slate-500 text-xs">{leave.startDate} → {leave.endDate}</p>
                </div>

                {/* Status */}
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${status.bg} ${status.border} shrink-0`}>
                  <StatusIcon className={`w-3.5 h-3.5 ${status.color}`} />
                  <span className={`text-xs font-medium ${status.color}`}>{leave.status}</span>
                </div>

                {/* Actions for admin */}
                {isAdmin && leave.status === 'Pending' && (
                  <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleStatusChange(leave.id, 'Approved')}
                      className="w-7 h-7 rounded-lg bg-green-400/10 hover:bg-green-400/20 flex items-center justify-center text-green-400 transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleStatusChange(leave.id, 'Rejected')}
                      className="w-7 h-7 rounded-lg bg-red-400/10 hover:bg-red-400/20 flex items-center justify-center text-red-400 transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedLeave && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20"
            onClick={() => setSelectedLeave(null)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#141414] border border-[#2A2A2A] rounded-2xl z-30 shadow-2xl overflow-hidden">

            {/* Colored top bar */}
            <div
              className="h-1 w-full"
              style={{ backgroundColor: typeColors[selectedLeave.type] }}
            />

            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-[#2A2A2A]">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${typeColors[selectedLeave.type]}15` }}
                >
                  {(() => {
                    const Icon = typeIcons[selectedLeave.type];
                    return <Icon className="w-5 h-5" style={{ color: typeColors[selectedLeave.type] }} />;
                  })()}
                </div>
                <div>
                  <h2 className="text-white font-semibold">{selectedLeave.type}</h2>
                  <p className="text-slate-500 text-xs">Submitted {selectedLeave.submittedAt}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLeave(null)}
                className="text-slate-500 hover:text-white transition-colors p-2 rounded-xl hover:bg-[#2A2A2A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">

              {/* Employee */}
              <div className="flex items-center gap-3 p-3 bg-[#1A1A1A] rounded-xl">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
                  style={{ backgroundColor: selectedLeave.color }}
                >
                  {selectedLeave.employeeInitials}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{selectedLeave.employeeName}</p>
                  <p className="text-slate-500 text-xs">Employee</p>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#1A1A1A] rounded-xl p-3 text-center">
                  <p className="text-slate-500 text-xs mb-1">Start</p>
                  <p className="text-white text-xs font-medium">{selectedLeave.startDate}</p>
                </div>
                <div className="bg-[#1A1A1A] rounded-xl p-3 text-center">
                  <p className="text-slate-500 text-xs mb-1">End</p>
                  <p className="text-white text-xs font-medium">{selectedLeave.endDate}</p>
                </div>
                <div className="bg-[#1A1A1A] rounded-xl p-3 text-center">
                  <p className="text-slate-500 text-xs mb-1">Duration</p>
                  <p className="text-white text-sm font-bold">{selectedLeave.days}d</p>
                </div>
              </div>

              {/* Reason */}
              <div className="bg-[#1A1A1A] rounded-xl p-3">
                <p className="text-slate-500 text-xs mb-1">Reason</p>
                <p className="text-white text-sm">{selectedLeave.reason}</p>
              </div>

              {/* Status */}
              <div className={`flex items-center gap-2 p-3 rounded-xl border ${statusConfig[selectedLeave.status].bg} ${statusConfig[selectedLeave.status].border}`}>
                {(() => {
                  const Icon = statusConfig[selectedLeave.status].icon;
                  return <Icon className={`w-4 h-4 ${statusConfig[selectedLeave.status].color}`} />;
                })()}
                <span className={`text-sm font-medium ${statusConfig[selectedLeave.status].color}`}>
                  {selectedLeave.status}
                </span>
              </div>
            </div>

            {/* Admin actions */}
            {isAdmin && selectedLeave.status === 'Pending' && (
              <div className="flex gap-3 p-6 border-t border-[#2A2A2A]">
                <button
                  onClick={() => handleStatusChange(selectedLeave.id, 'Rejected')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm text-red-400 border border-red-400/20 hover:bg-red-400/10 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
                <button
                  onClick={() => handleStatusChange(selectedLeave.id, 'Approved')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm bg-green-400/10 border border-green-400/20 text-green-400 hover:bg-green-400/20 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20"
            onClick={() => setShowCreateModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#141414] border border-[#2A2A2A] rounded-2xl z-30 shadow-2xl">

            <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A]">
              <div>
                <h2 className="text-white font-semibold">Request Leave</h2>
                <p className="text-slate-500 text-xs mt-0.5">Submit a new leave request</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-500 hover:text-white transition-colors p-2 rounded-xl hover:bg-[#2A2A2A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">

              {/* Leave type */}
              <div className="space-y-1.5">
                <Label className="text-slate-400 text-xs">Leave Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(typeColors).map((type) => {
                    const Icon = typeIcons[type];
                    const isSelected = form.type === type;
                    return (
                      <button
                        key={type}
                        onClick={() => setForm({ ...form, type: type as any })}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs transition-all duration-200 ${
                          isSelected
                            ? 'border-transparent text-white'
                            : 'border-[#2A2A2A] text-slate-400 hover:border-[#3A3A3A] bg-[#0F0F0F]'
                        }`}
                        style={isSelected ? {
                          backgroundColor: `${typeColors[type]}20`,
                          borderColor: `${typeColors[type]}40`,
                          color: typeColors[type],
                        } : {}}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-slate-400 text-xs">Start Date *</Label>
                  <Input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1] rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-400 text-xs">End Date *</Label>
                  <Input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1] rounded-xl"
                  />
                </div>
              </div>

              {/* Reason */}
              <div className="space-y-1.5">
                <Label className="text-slate-400 text-xs">Reason</Label>
                <textarea
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  placeholder="Briefly describe your reason..."
                  rows={3}
                  className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl px-3 py-2 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#6366F1] resize-none"
                />
              </div>

            </div>

            <div className="flex gap-3 p-6 border-t border-[#2A2A2A]">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white border border-[#2A2A2A] hover:bg-[#1A1A1A] transition-colors"
              >
                Cancel
              </button>
              <Button
                onClick={handleCreate}
                className="flex-1 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl"
              >
                Submit Request
              </Button>
            </div>
          </div>
        </>
      )}

    </MainLayout>
  );
};

export default CongesPage;
import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Search } from 'lucide-react';
import { useGetAllUsers, useUpdateUserStatus, useUpdateUserRole, useDeleteUser, useCreateApprovedUser } from '@/features/users/api';
import { useUserFilters } from '@/features/users/hooks/useUserFilters';
import { UserKPIs, UserTable } from '@/features/users/components';
import { UserRole } from '@/types';

const UsersManagementPage = () => {
  const [isCreateApprovedOpen, setIsCreateApprovedOpen] = useState(false);
  const [createNom, setCreateNom] = useState('');
  const [createPrenom, setCreatePrenom] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [createRole, setCreateRole] = useState<UserRole>(UserRole.TEAM_MEMBER);
  const [createApprovedError, setCreateApprovedError] = useState<string | null>(null);

  const { data: users, isLoading, error } = useGetAllUsers();
  const { mutate: updateStatus } = useUpdateUserStatus();
  const { mutate: updateRole } = useUpdateUserRole();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: createApprovedUser, isPending: isCreatingApproved } = useCreateApprovedUser();

  const { search, setSearch, statusFilter, setStatusFilter, filtered, kpis } = useUserFilters(users || []);

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    deleteUser(id);
  };

  const resetCreateApproved = () => {
    setCreateNom('');
    setCreatePrenom('');
    setCreateEmail('');
    setCreatePassword('');
    setCreateRole(UserRole.TEAM_MEMBER);
    setCreateApprovedError(null);
  };

  const closeCreateApproved = () => {
    setIsCreateApprovedOpen(false);
    resetCreateApproved();
  };

  const submitCreateApproved = () => {
    setCreateApprovedError(null);
    createApprovedUser(
      {
        nom: createNom,
        prenom: createPrenom,
        email: createEmail,
        password: createPassword,
        role: createRole,
      },
      {
        onSuccess: () => closeCreateApproved(),
        onError: (err: any) => {
          const message =
            err?.response?.data?.message ||
            err?.message ||
            'Failed to create user';
          setCreateApprovedError(String(message));
        },
      }
    );
  };

  return (
    <MainLayout>

      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-white text-2xl font-bold">User Management</h1>
          <p className="text-slate-400 text-sm mt-1">Manage users, roles and access control</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsCreateApprovedOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-medium bg-[#6366F1] hover:bg-[#4F46E5] text-white transition-colors"
          >
            Add Approved User
          </button>
          <div className="text-xs text-slate-500 bg-[#1A1A1A] border border-[#2A2A2A] px-3 py-2 rounded-xl">
            {filtered.length} users
          </div>
        </div>
      </div>

      {/* KPIs */}
      <UserKPIs {...kpis} />

      {/* Search + Filters */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users by name or email..."
              className="w-full pl-9 pr-3 py-2 bg-[#141414] border border-[#2A2A2A] text-white placeholder:text-slate-600 focus:outline-none focus:border-[#6366F1] rounded-xl text-sm" />
          </div>
          <div className="flex gap-1">
            {(['all', 'pending', 'active', 'suspended'] as const).map((f) => (
              <button key={f} onClick={() => setStatusFilter(f)} type="button"
                className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  statusFilter === f
                    ? 'bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/20'
                    : 'bg-[#141414] text-slate-400 hover:text-white border border-[#2A2A2A]'
                }`}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-red-400 text-sm">Failed to load users</p>
        </div>
      )}

      {/* Table */}
      <UserTable
        users={filtered}
        isLoading={isLoading}
        onStatusChange={(id, status) => updateStatus({ id, status })}
        onRoleChange={(id, role) => updateRole({ id, role })}
        onDelete={handleDelete}
      />

      {isCreateApprovedOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20" onClick={closeCreateApproved} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#141414] border border-[#2A2A2A] rounded-2xl z-30 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A]">
              <div>
                <h2 className="text-white font-semibold">Add Approved User</h2>
                <p className="text-slate-500 text-xs mt-0.5">User will be created as active automatically</p>
              </div>
              <button onClick={closeCreateApproved} className="text-slate-500 hover:text-white transition-colors p-2 rounded-xl hover:bg-[#2A2A2A]">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              {createApprovedError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-red-400 text-sm">{createApprovedError}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-slate-400 text-xs">Nom *</label>
                  <input
                    value={createNom}
                    onChange={(e) => setCreateNom(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#2A2A2A] text-white placeholder:text-slate-600 focus:outline-none focus:border-[#6366F1] rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-400 text-xs">Prenom *</label>
                  <input
                    value={createPrenom}
                    onChange={(e) => setCreatePrenom(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#2A2A2A] text-white placeholder:text-slate-600 focus:outline-none focus:border-[#6366F1] rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs">Email *</label>
                <input
                  value={createEmail}
                  onChange={(e) => setCreateEmail(e.target.value)}
                  type="email"
                  className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#2A2A2A] text-white placeholder:text-slate-600 focus:outline-none focus:border-[#6366F1] rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs">Password *</label>
                <input
                  value={createPassword}
                  onChange={(e) => setCreatePassword(e.target.value)}
                  type="password"
                  className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#2A2A2A] text-white placeholder:text-slate-600 focus:outline-none focus:border-[#6366F1] rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs">Role</label>
                <select
                  value={createRole}
                  onChange={(e) => setCreateRole(e.target.value as UserRole)}
                  className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]"
                >
                  {Object.values(UserRole).map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-[#2A2A2A]">
              <button
                type="button"
                onClick={closeCreateApproved}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white border border-[#2A2A2A] hover:bg-[#1A1A1A] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isCreatingApproved || !createNom || !createPrenom || !createEmail || !createPassword}
                onClick={submitCreateApproved}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm bg-[#6366F1] hover:bg-[#4F46E5] disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
              >
                {isCreatingApproved ? 'Creating...' : 'Create User'}
              </button>
            </div>
          </div>
        </>
      )}

    </MainLayout>
  );
};

export default UsersManagementPage;
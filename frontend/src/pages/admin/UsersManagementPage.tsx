import { useMemo, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Loader2, Search, Shield, Trash2, UserCheck, UserX, Users } from 'lucide-react';
import { useGetAllUsers, useUpdateUserStatus, useUpdateUserRole, useDeleteUser } from '@/features/users/api';
import { UserRole, UserStatus } from '@/types';

const roles = Object.values(UserRole);

const statusColors: Record<string, string> = {
  pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  active: 'text-green-400 bg-green-400/10 border-green-400/20',
  suspended: 'text-red-400 bg-red-400/10 border-red-400/20',
};

const UsersManagementPage = () => {
  const { data: users, isLoading, error } = useGetAllUsers();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'active' | 'suspended'>('all');

  const { mutate: updateStatus } = useUpdateUserStatus();
  const { mutate: updateRole } = useUpdateUserRole();
  const { mutate: deleteUser } = useDeleteUser();

  const filteredUsers = useMemo(() => {
    const list = users ?? [];

    return list.filter((u) => {
      const matchesStatus = statusFilter === 'all' ? true : u.status === statusFilter;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        q.length === 0 ||
        `${u.nom ?? ''} ${u.prenom ?? ''}`.toLowerCase().includes(q) ||
        (u.email ?? '').toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [users, search, statusFilter]);

  const handleStatusChange = (id: number, status: UserStatus) => {
    updateStatus({ id, status });
  };

  const handleRoleChange = (id: number, role: UserRole) => {
    updateRole({ id, role });
  };

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    deleteUser(id);
  };

  return (
    <MainLayout>

      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-white text-2xl font-bold">User Management</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage users, roles and access control
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs text-slate-500 bg-[#1A1A1A] border border-[#2A2A2A] px-3 py-2 rounded-xl">
            {filteredUsers.length} users
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {(
          () => {
            const total = users?.length || 0;
            const pending = users?.filter(u => u.status === UserStatus.PENDING).length || 0;
            const active = users?.filter(u => u.status === UserStatus.ACTIVE).length || 0;
            const suspended = users?.filter(u => u.status === UserStatus.SUSPENDED).length || 0;

            return [
              { label: 'Total Users', value: String(total), color: '#6366F1', bg: '#6366F115', icon: Users },
              { label: 'Pending', value: String(pending), color: '#F59E0B', bg: '#F59E0B15', icon: Shield },
              { label: 'Active', value: String(active), color: '#22C55E', bg: '#22C55E15', icon: UserCheck },
              { label: 'Suspended', value: String(suspended), color: '#EF4444', bg: '#EF444415', icon: UserX },
            ];
          }
        )().map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4 transition-all duration-200 hover:border-[#3A3A3A]"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-500 text-xs">{stat.label}</p>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.bg }}>
                  <Icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-white text-2xl font-bold tabular-nums">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Search + Filters */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users by name or email..."
              className="w-full pl-9 pr-3 py-2 bg-[#141414] border border-[#2A2A2A] text-white placeholder:text-slate-600 focus:outline-none focus:border-[#6366F1] rounded-xl text-sm"
            />
          </div>

          <div className="flex gap-1">
            {(
              [
                { key: 'all', label: 'All' },
                { key: 'pending', label: 'Pending' },
                { key: 'active', label: 'Active' },
                { key: 'suspended', label: 'Suspended' },
              ] as const
            ).map((f) => (
              <button
                key={f.key}
                onClick={() => setStatusFilter(f.key)}
                className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  statusFilter === f.key
                    ? 'bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/20'
                    : 'bg-[#141414] text-slate-400 hover:text-white border border-[#2A2A2A]'
                }`}
                type="button"
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-red-400 text-sm">Failed to load users</p>
        </div>
      )}

      {/* Table */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-[#2A2A2A] flex items-center justify-between gap-4">
          <div>
            <h2 className="text-white font-medium">All Users</h2>
            <p className="text-slate-500 text-xs mt-0.5">Role changes and status actions are applied immediately</p>
          </div>
          <div className="text-xs text-slate-500 bg-[#0F0F0F] border border-[#2A2A2A] px-3 py-2 rounded-xl">
            Showing {filteredUsers.length}
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="w-6 h-6 text-[#6366F1] animate-spin" />
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A]">
                <th className="text-left text-slate-400 text-xs font-medium px-4 py-3">User</th>
                <th className="text-left text-slate-400 text-xs font-medium px-4 py-3">Email</th>
                <th className="text-left text-slate-400 text-xs font-medium px-4 py-3">Role</th>
                <th className="text-left text-slate-400 text-xs font-medium px-4 py-3">Status</th>
                <th className="text-left text-slate-400 text-xs font-medium px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-[#2A2A2A] hover:bg-[#0F0F0F] transition-colors">

                  {/* User */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-xs font-medium">
                        {user.nom?.charAt(0)}{user.prenom?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{user.nom} {user.prenom}</p>
                        <p className="text-slate-500 text-xs">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-4 py-3">
                    <p className="text-slate-300 text-sm">{user.email}</p>
                  </td>

                  {/* Role */}
                  <td className="px-4 py-3">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                      className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl px-2 py-1 text-white text-xs focus:outline-none focus:border-[#6366F1]"
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full border ${statusColors[user.status]}`}>
                      {user.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {user.status === UserStatus.PENDING && (
                        <button
                          onClick={() => handleStatusChange(user.id, UserStatus.ACTIVE)}
                          className="text-green-400 hover:text-green-300 transition-colors"
                          title="Activate"
                        >
                          <UserCheck className="w-4 h-4" />
                        </button>
                      )}
                      {user.status === UserStatus.ACTIVE && (
                        <button
                          onClick={() => handleStatusChange(user.id, UserStatus.SUSPENDED)}
                          className="text-yellow-400 hover:text-yellow-300 transition-colors"
                          title="Suspend"
                        >
                          <UserX className="w-4 h-4" />
                        </button>
                      )}
                      {user.status === UserStatus.SUSPENDED && (
                        <button
                          onClick={() => handleStatusChange(user.id, UserStatus.ACTIVE)}
                          className="text-green-400 hover:text-green-300 transition-colors"
                          title="Reactivate"
                        >
                          <UserCheck className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </MainLayout>
  );
};

export default UsersManagementPage;
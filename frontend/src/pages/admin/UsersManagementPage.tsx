import MainLayout from '@/components/layout/MainLayout';
import { Loader2, Trash2, UserCheck, UserX } from 'lucide-react';
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

  const { mutate: updateStatus } = useUpdateUserStatus();
  const { mutate: updateRole } = useUpdateUserRole();
  const { mutate: deleteUser } = useDeleteUser();

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
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold">User Management</h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage users, roles and access control
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
          <p className="text-slate-400 text-sm">Total Users</p>
          <p className="text-white text-2xl font-bold mt-1">{users?.length || 0}</p>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
          <p className="text-slate-400 text-sm">Pending Approval</p>
          <p className="text-yellow-400 text-2xl font-bold mt-1">
            {users?.filter(u => u.status === UserStatus.PENDING).length || 0}
          </p>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
          <p className="text-slate-400 text-sm">Active Users</p>
          <p className="text-green-400 text-2xl font-bold mt-1">
            {users?.filter(u => u.status === UserStatus.ACTIVE).length || 0}
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-red-400 text-sm">Failed to load users</p>
        </div>
      )}

      {/* Table */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#2A2A2A]">
          <h2 className="text-white font-medium">All Users</h2>
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
              {users?.map((user) => (
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
                      className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-2 py-1 text-white text-xs focus:outline-none focus:border-[#6366F1]"
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
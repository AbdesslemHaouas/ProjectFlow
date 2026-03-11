import { Loader2, UserCheck, UserX, Trash2 } from 'lucide-react';
import { User, UserRole, UserStatus } from '@/types';
import { ROLE_COLORS, STATUS_COLORS } from '../constants';

interface Props {
  users: User[];
  isLoading: boolean;
  onStatusChange: (id: number, status: UserStatus) => void;
  onRoleChange: (id: number, role: UserRole) => void;
  onDelete: (id: number) => void;
}

const roles = Object.values(UserRole);

const UserTable = ({ users, isLoading, onStatusChange, onRoleChange, onDelete }: Props) => {
  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden">
      <div className="p-5 border-b border-[#2A2A2A] flex items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-medium">All Users</h2>
          <p className="text-slate-500 text-xs mt-0.5">Role changes and status actions are applied immediately</p>
        </div>
        <div className="text-xs text-slate-500 bg-[#0F0F0F] border border-[#2A2A2A] px-3 py-2 rounded-xl">
          Showing {users.length}
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
            {users.map((user) => (
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
                    onChange={(e) => onRoleChange(user.id, e.target.value as UserRole)}
                    className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl px-2 py-1 text-white text-xs focus:outline-none focus:border-[#6366F1]"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full border ${STATUS_COLORS[user.status]}`}>
                    {user.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {user.status === UserStatus.PENDING && (
                      <button onClick={() => onStatusChange(user.id, UserStatus.ACTIVE)}
                        className="text-green-400 hover:text-green-300 transition-colors" title="Activate">
                        <UserCheck className="w-4 h-4" />
                      </button>
                    )}
                    {user.status === UserStatus.ACTIVE && (
                      <button onClick={() => onStatusChange(user.id, UserStatus.SUSPENDED)}
                        className="text-yellow-400 hover:text-yellow-300 transition-colors" title="Suspend">
                        <UserX className="w-4 h-4" />
                      </button>
                    )}
                    {user.status === UserStatus.SUSPENDED && (
                      <button onClick={() => onStatusChange(user.id, UserStatus.ACTIVE)}
                        className="text-green-400 hover:text-green-300 transition-colors" title="Reactivate">
                        <UserCheck className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => onDelete(user.id)}
                      className="text-red-400 hover:text-red-300 transition-colors" title="Delete">
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
  );
};

export default UserTable;
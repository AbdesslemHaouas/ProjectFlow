import { User } from '@/types';

export const getFullName = (user: User): string =>
  `${user.prenom} ${user.nom}`;

export const filterUsers = (
  users: User[],
  search: string,
  roleFilter: string,
  statusFilter: string
) =>
  users.filter(u => {
    const matchesSearch =
      `${u.prenom} ${u.nom} ${u.email}`.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

export const getUserKPIs = (users: User[]) => ({
  total: users.length,
  active: users.filter(u => u.status === 'active').length,
  pending: users.filter(u => u.status === 'pending').length,
  suspended: users.filter(u => u.status === 'suspended').length,
});

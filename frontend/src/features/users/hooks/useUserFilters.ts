import { useState, useMemo } from 'react';
import { User } from '@/types';
import { filterUsers, getUserKPIs } from '../helpers';

export const useUserFilters = (users: User[] = []) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('All');

  const filtered = useMemo(
    () => filterUsers(users, search, roleFilter, statusFilter),
    [users, search, roleFilter, statusFilter]
  );

  const kpis = useMemo(() => getUserKPIs(users), [users]);

  return {
    search, setSearch,
    statusFilter, setStatusFilter,
    roleFilter, setRoleFilter,
    filtered,
    kpis,
  };
};
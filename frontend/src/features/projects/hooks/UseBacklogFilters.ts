import { useState, useMemo } from 'react';
import { BacklogItem } from '../types';
import { filterBacklog, getBacklogKPIs } from '../helpers';

export const useBacklogFilters = (items: BacklogItem[] = []) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const filtered = useMemo(
    () => filterBacklog(items, search, statusFilter, typeFilter),
    [items, search, statusFilter, typeFilter]
  );

  const kpis = useMemo(() => getBacklogKPIs(filtered), [filtered]);

  return {
    search, setSearch,
    statusFilter, setStatusFilter,
    typeFilter, setTypeFilter,
    filtered,
    kpis,
  };
};
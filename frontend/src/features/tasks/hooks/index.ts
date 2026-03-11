import { useState, useMemo } from 'react';
import { Task, TaskStatus } from '../types';
import { groupTasksByStatus, filterTasks, getTaskKPIs } from '../helpers';

export const useTaskFilters = (tasks: Task[] = []) => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => filterTasks(tasks, search), [tasks, search]);
  const grouped = useMemo(() => groupTasksByStatus(filtered), [filtered]);
  const kpis = useMemo(() => getTaskKPIs(tasks), [tasks]);

  return { search, setSearch, filtered, grouped, kpis };
};


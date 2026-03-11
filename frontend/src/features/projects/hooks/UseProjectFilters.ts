import { useState, useMemo } from 'react';
import { Project } from '../types';
import { filterProjects, getProjectKPIs } from '../helpers';

export const useProjectFilters = (projects: Project[] = []) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = useMemo(
    () => filterProjects(projects, search, statusFilter),
    [projects, search, statusFilter]
  );

  const kpis = useMemo(() => getProjectKPIs(projects), [projects]);

  return { search, setSearch, statusFilter, setStatusFilter, filtered, kpis };
};


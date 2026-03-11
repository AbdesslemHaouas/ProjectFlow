import { Project, BacklogItem } from '../types';

export const getProjectKPIs = (projects: Project[]) => ({
  total: projects.length,
  active: projects.filter(p => p.status === 'Active').length,
  atRisk: projects.filter(p => p.status !== 'Completed' && p.progress < 35).length,
  completed: projects.filter(p => p.status === 'Completed').length,
});

export const getBacklogKPIs = (items: BacklogItem[]) => ({
  total: items.length,
  totalPoints: items.reduce((sum, i) => sum + (i.points || 0), 0),
  inSprint: items.filter(i => i.status === 'In Sprint').length,
  done: items.filter(i => i.status === 'Done').length,
  highPriority: items.filter(i => i.priority === 'High' && i.status !== 'Done').length,
});

export const formatProjectDate = (date?: string) => {
  if (!date) return 'No deadline';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const filterProjects = (
  projects: Project[],
  search: string,
  statusFilter: string
) =>
  projects.filter(p => {
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

export const filterBacklog = (
  items: BacklogItem[],
  search: string,
  statusFilter: string,
  typeFilter: string
) =>
  items.filter(item => {
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });
  
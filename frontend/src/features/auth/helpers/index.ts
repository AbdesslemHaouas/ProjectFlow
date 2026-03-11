export const getInitials = (nom?: string, prenom?: string): string => {
  if (!nom && !prenom) return '?';
  return `${prenom?.charAt(0) || ''}${nom?.charAt(0) || ''}`.toUpperCase();
};

export const getRoleLabel = (role: string): string => {
  const labels: Record<string, string> = {
    admin: 'Admin',
    chef_projet: 'Chef Projet',
    employe: 'Employé',
    client: 'Client',
  };
  return labels[role] || role;
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    active: 'text-green-400 bg-green-400/10 border-green-400/20',
    pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    suspended: 'text-red-400 bg-red-400/10 border-red-400/20',
  };
  return colors[status] || 'text-slate-400 bg-slate-400/10';
};

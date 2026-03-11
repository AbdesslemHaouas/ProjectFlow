export const ROLE_COLORS: Record<string, string> = {
  admin: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  chef_projet: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  employe: 'text-green-400 bg-green-400/10 border-green-400/20',
  client: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
};

export const STATUS_COLORS: Record<string, string> = {
  active: 'text-green-400 bg-green-400/10 border-green-400/20',
  pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  suspended: 'text-red-400 bg-red-400/10 border-red-400/20',
};

export const ROLE_LABELS: Record<string, string> = {
  admin: 'Admin',
  chef_projet: 'Chef Projet',
  employe: 'Employé',
  client: 'Client',
};

export const STATUS_LABELS: Record<string, string> = {
  active: 'Active',
  pending: 'Pending',
  suspended: 'Suspended',
};

export const AVAILABLE_ROLES = ['admin', 'chef_projet', 'employe', 'client'];
export const AVAILABLE_STATUSES = ['active', 'pending', 'suspended'];


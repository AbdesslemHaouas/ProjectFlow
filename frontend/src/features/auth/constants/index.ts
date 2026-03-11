export const AUTH_ROLES = [
  { value: 'chef_projet', label: 'Chef Projet' },
  { value: 'employe', label: 'Employé' },
  { value: 'client', label: 'Client' },
];

export const USER_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
} as const;

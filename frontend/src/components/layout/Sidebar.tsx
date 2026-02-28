import { 
  LayoutDashboard, 
  FolderKanban, 
  Zap, 
  ListChecks, 
  CheckSquare, 
  Users, 
  Palmtree, 
  Bell, 
  Bot, 
  BarChart3,
  Settings,
  LogOut,
  Shield,
  Ticket
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';

// Define menu items per role
const getMenuItems = (role: string) => {
  const common = [
    {
      label: 'Home',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      ]
    },
  ];

  const adminMenu = [
    ...common,
    {
      label: 'Management',
      items: [
        { icon: Shield, label: 'User Management', path: '/admin/users' },
        { icon: FolderKanban, label: 'Projects', path: '/projects' },
        { icon: Zap, label: 'Sprints', path: '/sprints' },
        { icon: ListChecks, label: 'Backlog', path: '/backlog' },
        { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
      ]
    },
    {
      label: 'People',
      items: [
        { icon: Users, label: 'Teams', path: '/teams' },
        { icon: Palmtree, label: 'Congés', path: '/conges' },
      ]
    },
    {
      label: 'System',
      items: [
        { icon: Bell, label: 'Notifications', path: '/notifications' },
        { icon: Bot, label: 'Aura AI', path: '/aura' },
        { icon: BarChart3, label: 'Reports', path: '/reports' },
      ]
    },
  ];

  const chefProjetMenu = [
    ...common,
    {
      label: 'Management',
      items: [
        { icon: FolderKanban, label: 'Projects', path: '/projects' },
        { icon: Zap, label: 'Sprints', path: '/sprints' },
        { icon: ListChecks, label: 'Backlog', path: '/backlog' },
        { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
      ]
    },
    {
      label: 'People',
      items: [
        { icon: Users, label: 'Teams', path: '/teams' },
        { icon: Palmtree, label: 'Congés', path: '/conges' },
      ]
    },
    {
      label: 'System',
      items: [
        { icon: Bell, label: 'Notifications', path: '/notifications' },
        { icon: Bot, label: 'Aura AI', path: '/aura' },
        { icon: BarChart3, label: 'Reports', path: '/reports' },
      ]
    },
  ];

  const teamMemberMenu = [
    ...common,
    {
      label: 'Work',
      items: [
        { icon: CheckSquare, label: 'My Tasks', path: '/tasks' },
        { icon: Zap, label: 'My Sprints', path: '/sprints' },
      ]
    },
    {
      label: 'Personal',
      items: [
        { icon: Palmtree, label: 'My Congés', path: '/conges' },
        { icon: Bell, label: 'Notifications', path: '/notifications' },
      ]
    },
  ];

  const clientMenu = [
    ...common,
    {
      label: 'My Space',
      items: [
        { icon: FolderKanban, label: 'My Projects', path: '/projects' },
        { icon: Ticket, label: 'My Tickets', path: '/tickets' },
      ]
    },
    {
      label: 'System',
      items: [
        { icon: Bell, label: 'Notifications', path: '/notifications' },
        { icon: BarChart3, label: 'Reports', path: '/reports' },
      ]
    },
  ];

  switch (role) {
    case 'admin': return adminMenu;
    case 'chef_projet': return chefProjetMenu;
    case 'team_member': return teamMemberMenu;
    case 'client': return clientMenu;
    default: return teamMemberMenu;
  }
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const menuItems = getMenuItems(user?.role || 'team_member');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-[240px] h-screen bg-[#0F0F0F] border-r border-[#1F1F1F] flex flex-col fixed left-0 top-0">
      
      {/* Logo */}
      <div className="p-4 border-b border-[#1F1F1F]">
        <h1 className="text-white font-bold text-lg">Vaerdia</h1>
        <p className="text-slate-500 text-xs">ProjectFlow</p>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {menuItems.map((section) => (
          <div key={section.label}>
            <p className="text-slate-600 text-xs font-medium uppercase tracking-wider mb-2 px-2">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive 
                        ? 'bg-[#1A1A1A] text-white' 
                        : 'text-slate-400 hover:text-white hover:bg-[#1A1A1A]'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-[#6366F1]' : ''}`} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User + Logout */}
      <div className="p-3 border-t border-[#1F1F1F] space-y-1">
        <button
          onClick={() => navigate('/settings')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-[#1A1A1A] transition-colors"
        >
          <Settings className="w-4 h-4" />
          Settings
        </button>
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-7 h-7 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-xs font-medium">
            {user?.nom?.charAt(0)}{user?.prenom?.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">{user?.nom} {user?.prenom}</p>
            <p className="text-slate-500 text-xs truncate">{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-500 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import { ReactNode, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Settings, LogOut, User } from 'lucide-react';
import Sidebar from './Sidebar';
import { useAuthStore } from '@/store/auth.store';

const mockNotifications = [
  {
    id: 1,
    title: 'Task assigned',
    message: 'You have been assigned to Fix login bug',
    time: '2 min ago',
    read: false,
  },
  {
    id: 2,
    title: 'Sprint started',
    message: 'Sprint 3 has been started by Abdesslem',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    title: 'Leave approved',
    message: 'Your leave request has been approved',
    time: '3 hours ago',
    read: true,
  },
];

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[#141414]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-[240px] overflow-y-auto">

        {/* Top Navbar */}
        <div className="h-14 border-b border-[#1F1F1F] bg-[#141414] flex items-center justify-between px-6 sticky top-0 z-10">
          <h2 className="text-white font-medium text-sm">ProjectFlow</h2>

          {/* Right side */}
          <div className="flex items-center gap-2">

            {/* Notification Bell */}
            <div ref={notifRef} className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="relative w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1A1A1A] rounded-lg transition-colors"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#6366F1] rounded-full" />
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-10 w-80 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl shadow-xl z-20">
                  <div className="p-4 border-b border-[#2A2A2A] flex items-center justify-between">
                    <h3 className="text-white font-medium text-sm">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="text-xs text-[#6366F1]">{unreadCount} unread</span>
                    )}
                  </div>
                  <div className="divide-y divide-[#2A2A2A]">
                    {mockNotifications.slice(0, 3).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-[#0F0F0F] transition-colors cursor-pointer ${
                          !notification.read ? 'border-l-2 border-[#6366F1]' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-white text-sm font-medium">{notification.title}</p>
                            <p className="text-slate-400 text-xs mt-0.5">{notification.message}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1] mt-1 shrink-0" />
                          )}
                        </div>
                        <p className="text-slate-600 text-xs mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-[#2A2A2A]">
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        navigate('/notifications');
                      }}
                      className="w-full text-center text-[#6366F1] hover:text-[#4F46E5] text-xs transition-colors py-1"
                    >
                      View all notifications →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar */}
            <div ref={userRef} className="relative">
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="w-8 h-8 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-xs font-medium hover:bg-[#4F46E5] transition-colors"
              >
                {user?.nom?.charAt(0)}{user?.prenom?.charAt(0)}
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 top-10 w-64 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl shadow-xl z-20">

                  {/* User info */}
                  <div className="p-4 border-b border-[#2A2A2A]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-sm font-medium">
                        {user?.nom?.charAt(0)}{user?.prenom?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">
                          {user?.nom} {user?.prenom}
                        </p>
                        <p className="text-slate-500 text-xs">{user?.email}</p>
                        <span className="text-xs text-[#6366F1] bg-[#6366F1]/10 px-2 py-0.5 rounded-full mt-1 inline-block">
                          {user?.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate('/profile');
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#0F0F0F] transition-colors text-sm"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate('/settings');
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#0F0F0F] transition-colors text-sm"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="p-2 border-t border-[#2A2A2A]">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/5 transition-colors text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>

                </div>
              )}
            </div>

          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>

      </div>
    </div>
  );
};

export default MainLayout;
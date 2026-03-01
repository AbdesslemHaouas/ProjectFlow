import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'task' | 'sprint' | 'leave' | 'system' | 'ai';
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: 'Task assigned',
    message: 'You have been assigned to Fix login bug',
    time: '2 min ago',
    read: false,
    type: 'task',
  },
  {
    id: 2,
    title: 'Sprint started',
    message: 'Sprint 3 has been started by Abdesslem',
    time: '1 hour ago',
    read: false,
    type: 'sprint',
  },
  {
    id: 3,
    title: 'Leave approved',
    message: 'Your leave request has been approved',
    time: '3 hours ago',
    read: true,
    type: 'leave',
  },
  {
    id: 4,
    title: 'Aura AI Alert',
    message: 'Project X is at risk of delay based on current velocity',
    time: '5 hours ago',
    read: false,
    type: 'ai',
  },
  {
    id: 5,
    title: 'Sprint completed',
    message: 'Sprint 2 has been completed successfully',
    time: '1 day ago',
    read: true,
    type: 'sprint',
  },
  {
    id: 6,
    title: 'New comment',
    message: 'Abdesslem commented on your task',
    time: '1 day ago',
    read: true,
    type: 'task',
  },
  {
    id: 7,
    title: 'System update',
    message: 'ProjectFlow has been updated to version 1.2.0',
    time: '2 days ago',
    read: true,
    type: 'system',
  },
];

const dotColors: Record<string, string> = {
  task: 'bg-[#6366F1]',
  sprint: 'bg-[#F59E0B]',
  leave: 'bg-[#22C55E]',
  ai: 'bg-purple-400',
  system: 'bg-slate-400',
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <MainLayout>

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-semibold">Notifications</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-md text-xs transition-colors ${
            filter === 'all'
              ? 'bg-[#1A1A1A] text-white border border-[#2A2A2A]'
              : 'text-slate-500 hover:text-white'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1 rounded-md text-xs transition-colors ${
            filter === 'unread'
              ? 'bg-[#1A1A1A] text-white border border-[#2A2A2A]'
              : 'text-slate-500 hover:text-white'
          }`}
        >
          Unread {unreadCount > 0 && `(${unreadCount})`}
        </button>
      </div>

      {/* Notifications list */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12">
            <Bell className="w-8 h-8 text-slate-600 mb-2" />
            <p className="text-slate-500 text-sm">No notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-[#2A2A2A]">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className="group flex items-start gap-3 px-4 py-3 hover:bg-[#0F0F0F] transition-colors"
              >
                {/* Colored dot */}
                <div className="mt-1.5 shrink-0">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    notification.read ? 'bg-slate-600' : dotColors[notification.type]
                  }`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className={`text-sm ${
                        notification.read ? 'text-slate-400' : 'text-white font-medium'
                      }`}>
                        {notification.title}
                      </p>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {notification.message}
                      </p>
                    </div>

                    {/* Time + Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-slate-600 text-xs">{notification.time}</span>
                      <div className="hidden group-hover:flex items-center gap-1">
                        {!notification.read && (
                          <button
                            onClick={() => markRead(notification.id)}
                            className="text-slate-500 hover:text-[#6366F1] transition-colors"
                            title="Mark as read"
                          >
                            <CheckCheck className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-slate-500 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </MainLayout>
  );
};

export default NotificationsPage;
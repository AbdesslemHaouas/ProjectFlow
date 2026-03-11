import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { User, Lock, Bell, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProfileForm, PasswordForm } from '@/features/users/components';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Shield },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifSettings, setNotifSettings] = useState({
    taskAssigned: true,
    sprintStarted: true,
    leaveApproved: true,
    aiAlerts: true,
    systemUpdates: false,
  });

  return (
    <MainLayout>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-white text-xl font-semibold">Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your account settings and preferences</p>
      </div>

      <div className="flex gap-6">

        {/* Sidebar */}
        <div className="w-48 shrink-0">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-2 space-y-0.5">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === tab.id ? 'bg-[#0F0F0F] text-white' : 'text-slate-400 hover:text-white hover:bg-[#0F0F0F]'
                }`}>
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#6366F1]' : ''}`} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6">

            {activeTab === 'profile' && <ProfileForm />}
            {activeTab === 'security' && <PasswordForm />}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-white font-medium mb-1">Notification Preferences</h2>
                  <p className="text-slate-500 text-xs">Choose what you want to be notified about</p>
                </div>
                <div className="space-y-4">
                  {[
                    { key: 'taskAssigned', label: 'Task assigned', desc: 'When a task is assigned to you' },
                    { key: 'sprintStarted', label: 'Sprint started', desc: 'When a new sprint begins' },
                    { key: 'leaveApproved', label: 'Leave approved', desc: 'When your leave request is approved' },
                    { key: 'aiAlerts', label: 'Aura AI alerts', desc: 'When AI detects project risks' },
                    { key: 'systemUpdates', label: 'System updates', desc: 'Platform updates and announcements' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between py-2 border-b border-[#2A2A2A] last:border-0">
                      <div>
                        <p className="text-white text-sm">{item.label}</p>
                        <p className="text-slate-500 text-xs">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifSettings({ ...notifSettings, [item.key]: !notifSettings[item.key as keyof typeof notifSettings] })}
                        className={`w-10 h-5 rounded-full transition-colors relative ${notifSettings[item.key as keyof typeof notifSettings] ? 'bg-[#6366F1]' : 'bg-[#2A2A2A]'}`}>
                        <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${notifSettings[item.key as keyof typeof notifSettings] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  ))}
                </div>
                <Button className="bg-[#6366F1] hover:bg-[#4F46E5] text-white">Save preferences</Button>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-white font-medium mb-1">Privacy</h2>
                  <p className="text-slate-500 text-xs">Manage your privacy settings</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Show my profile to team members', desc: 'Others can see your profile information' },
                    { label: 'Show my activity status', desc: 'Show when you are online' },
                    { label: 'Allow mentions', desc: 'Allow team members to mention you in comments' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-[#2A2A2A] last:border-0">
                      <div>
                        <p className="text-white text-sm">{item.label}</p>
                        <p className="text-slate-500 text-xs">{item.desc}</p>
                      </div>
                      <button className="w-10 h-5 rounded-full bg-[#6366F1] relative">
                        <div className="w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 translate-x-5 transition-transform" />
                      </button>
                    </div>
                  ))}
                </div>
                <Button className="bg-[#6366F1] hover:bg-[#4F46E5] text-white">Save preferences</Button>
              </div>
            )}

          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
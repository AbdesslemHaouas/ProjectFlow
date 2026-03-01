import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import MainLayout from '@/components/layout/MainLayout';
import { useAuthStore } from '@/store/auth.store';
import { User, Lock, Bell, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useUpdateProfile, useUpdatePassword } from '@/features/users/api';
import {
  updateProfileSchema,
  updatePasswordSchema,
  UpdateProfileFormData,
  UpdatePasswordFormData,
} from '@/features/users/schemas';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Shield },
];

const SettingsPage = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');

  const [notifSettings, setNotifSettings] = useState({
    taskAssigned: true,
    sprintStarted: true,
    leaveApproved: true,
    aiAlerts: true,
    systemUpdates: false,
  });

  // React Query mutations
  const {
    mutate: updateProfile,
    isPending: isUpdatingProfile,
    isSuccess: profileSuccess,
    error: profileError,
  } = useUpdateProfile();

  const {
    mutate: updatePassword,
    isPending: isUpdatingPassword,
    isSuccess: passwordSuccess,
    error: passwordError,
  } = useUpdatePassword();

  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      nom: user?.nom || '',
      prenom: user?.prenom || '',
      email: user?.email || '',
    },
  });

  // Password form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onProfileSubmit = (data: UpdateProfileFormData) => {
    updateProfile(data);
  };

  const onPasswordSubmit = (data: UpdatePasswordFormData) => {
    updatePassword(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => resetPassword(),
      }
    );
  };

  return (
    <MainLayout>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-white text-xl font-semibold">Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex gap-6">

        {/* Sidebar tabs */}
        <div className="w-48 shrink-0">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-2 space-y-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#0F0F0F] text-white'
                    : 'text-slate-400 hover:text-white hover:bg-[#0F0F0F]'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#6366F1]' : ''}`} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6">

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-white font-medium mb-1">Profile Information</h2>
                  <p className="text-slate-500 text-xs">Update your personal information</p>
                </div>

                {profileSuccess && (
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="text-green-400 text-sm">Profile updated successfully!</p>
                  </div>
                )}

                {profileError && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-red-400 text-sm">
                      {(profileError as any).response?.data?.message || 'Something went wrong'}
                    </p>
                  </div>
                )}

                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-xl font-medium">
                    {user?.nom?.charAt(0)}{user?.prenom?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{user?.nom} {user?.prenom}</p>
                    <p className="text-slate-500 text-xs">{user?.email}</p>
                    <span className="text-xs text-[#6366F1] bg-[#6366F1]/10 px-2 py-0.5 rounded-full mt-1 inline-block">
                      {user?.role}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#2A2A2A] pt-6">
                  <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-slate-400 text-xs">Last name</Label>
                        <Input
                          {...registerProfile('nom')}
                          className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1]"
                        />
                        {profileErrors.nom && (
                          <p className="text-red-400 text-xs">{profileErrors.nom.message}</p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-400 text-xs">First name</Label>
                        <Input
                          {...registerProfile('prenom')}
                          className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1]"
                        />
                        {profileErrors.prenom && (
                          <p className="text-red-400 text-xs">{profileErrors.prenom.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-slate-400 text-xs">Email</Label>
                      <Input
                        type="email"
                        {...registerProfile('email')}
                        className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1]"
                      />
                      {profileErrors.email && (
                        <p className="text-red-400 text-xs">{profileErrors.email.message}</p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      disabled={isUpdatingProfile}
                      className="bg-[#6366F1] hover:bg-[#4F46E5] text-white"
                    >
                      {isUpdatingProfile ? 'Saving...' : 'Save changes'}
                    </Button>
                  </form>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-white font-medium mb-1">Security</h2>
                  <p className="text-slate-500 text-xs">Update your password</p>
                </div>

                {passwordSuccess && (
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="text-green-400 text-sm">Password updated successfully!</p>
                  </div>
                )}

                {passwordError && (
  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
    <p className="text-red-400 text-sm">
      {(passwordError as any).response?.data?.message || 'Something went wrong'}
    </p>
  </div>
)}  

                <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-slate-400 text-xs">Current password</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...registerPassword('currentPassword')}
                      className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1]"
                    />
                    {passwordErrors.currentPassword && (
                      <p className="text-red-400 text-xs">{passwordErrors.currentPassword.message}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-slate-400 text-xs">New password</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...registerPassword('newPassword')}
                      className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1]"
                    />
                    {passwordErrors.newPassword && (
                      <p className="text-red-400 text-xs">{passwordErrors.newPassword.message}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-slate-400 text-xs">Confirm new password</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...registerPassword('confirmPassword')}
                      className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1]"
                    />
                    {passwordErrors.confirmPassword && (
                      <p className="text-red-400 text-xs">{passwordErrors.confirmPassword.message}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="bg-[#6366F1] hover:bg-[#4F46E5] text-white"
                  >
                    {isUpdatingPassword ? 'Updating...' : 'Update password'}
                  </Button>
                </form>
              </div>
            )}

            {/* Notifications Tab */}
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
                        onClick={() => setNotifSettings({
                          ...notifSettings,
                          [item.key]: !notifSettings[item.key as keyof typeof notifSettings]
                        })}
                        className={`w-10 h-5 rounded-full transition-colors relative ${
                          notifSettings[item.key as keyof typeof notifSettings]
                            ? 'bg-[#6366F1]'
                            : 'bg-[#2A2A2A]'
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                          notifSettings[item.key as keyof typeof notifSettings]
                            ? 'translate-x-5'
                            : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
                <Button className="bg-[#6366F1] hover:bg-[#4F46E5] text-white">
                  Save preferences
                </Button>
              </div>
            )}

            {/* Privacy Tab */}
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
                <Button className="bg-[#6366F1] hover:bg-[#4F46E5] text-white">
                  Save preferences
                </Button>
              </div>
            )}

          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
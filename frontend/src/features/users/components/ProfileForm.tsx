import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth.store';
import { useUpdateProfile } from '../api';
import { updateProfileSchema, UpdateProfileFormData } from '../schemas';

const ProfileForm = () => {
  const { user } = useAuthStore();
  const { mutate: updateProfile, isPending, isSuccess, error } = useUpdateProfile();

  const { register, handleSubmit, formState: { errors } } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      nom: user?.nom || '',
      prenom: user?.prenom || '',
      email: user?.email || '',
    },
  });

  const onSubmit = (data: UpdateProfileFormData) => updateProfile(data);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white font-medium mb-1">Profile Information</h2>
        <p className="text-slate-500 text-xs">Update your personal information</p>
      </div>

      {isSuccess && (
        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
          <p className="text-green-400 text-sm">Profile updated successfully!</p>
        </div>
      )}
      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-red-400 text-sm">
            {(error as any).response?.data?.message || 'Something went wrong'}
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-slate-400 text-xs">Last name</Label>
              <Input {...register('nom')} className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1]" />
              {errors.nom && <p className="text-red-400 text-xs">{errors.nom.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-400 text-xs">First name</Label>
              <Input {...register('prenom')} className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1]" />
              {errors.prenom && <p className="text-red-400 text-xs">{errors.prenom.message}</p>}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-slate-400 text-xs">Email</Label>
            <Input type="email" {...register('email')} className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1]" />
            {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
          </div>
          <Button type="submit" disabled={isPending} className="bg-[#6366F1] hover:bg-[#4F46E5] text-white">
            {isPending ? 'Saving...' : 'Save changes'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
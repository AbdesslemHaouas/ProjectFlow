import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useUpdatePassword } from '../api';
import { updatePasswordSchema, UpdatePasswordFormData } from '../schemas';

const PasswordForm = () => {
  const { mutate: updatePassword, isPending, isSuccess, error } = useUpdatePassword();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = (data: UpdatePasswordFormData) => {
    updatePassword(
      { currentPassword: data.currentPassword, newPassword: data.newPassword },
      { onSuccess: () => reset() }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white font-medium mb-1">Security</h2>
        <p className="text-slate-500 text-xs">Update your password</p>
      </div>

      {isSuccess && (
        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
          <p className="text-green-400 text-sm">Password updated successfully!</p>
        </div>
      )}
      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-red-400 text-sm">
            {(error as any).response?.data?.message || 'Something went wrong'}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-slate-400 text-xs">Current password</Label>
          <Input type="password" placeholder="••••••••" {...register('currentPassword')}
            className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1]" />
          {errors.currentPassword && <p className="text-red-400 text-xs">{errors.currentPassword.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label className="text-slate-400 text-xs">New password</Label>
          <Input type="password" placeholder="••••••••" {...register('newPassword')}
            className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1]" />
          {errors.newPassword && <p className="text-red-400 text-xs">{errors.newPassword.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label className="text-slate-400 text-xs">Confirm new password</Label>
          <Input type="password" placeholder="••••••••" {...register('confirmPassword')}
            className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#6366F1]" />
          {errors.confirmPassword && <p className="text-red-400 text-xs">{errors.confirmPassword.message}</p>}
        </div>
        <Button type="submit" disabled={isPending} className="bg-[#6366F1] hover:bg-[#4F46E5] text-white">
          {isPending ? 'Updating...' : 'Update password'}
        </Button>
      </form>
    </div>
  );
};

export default PasswordForm;

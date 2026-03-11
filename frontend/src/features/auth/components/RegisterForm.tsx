import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, Mail, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRegister } from '../api';
import { registerSchema, RegisterFormData } from '../schemas';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: register, isPending, error } = useRegister();

  const { register: registerField, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'team_member' },
  });

  const onSubmit = (data: RegisterFormData) => register(data);

  return (
    <>
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-red-400 text-sm">
            {(error as any).response?.data?.message || 'Something went wrong'}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-slate-400">Last name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <Input placeholder="Haouas" {...registerField('nom')}
                className="pl-10 bg-[#0F0F0F] border-[#2A2A2A] text-white placeholder:text-slate-600 focus:border-[#6366F1]" />
            </div>
            {errors.nom && <p className="text-red-400 text-xs">{errors.nom.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label className="text-slate-400">First name</Label>
            <Input placeholder="Abdesslem" {...registerField('prenom')}
              className="bg-[#0F0F0F] border-[#2A2A2A] text-white placeholder:text-slate-600 focus:border-[#6366F1]" />
            {errors.prenom && <p className="text-red-400 text-xs">{errors.prenom.message}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-slate-400">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <Input type="email" placeholder="you@example.com" {...registerField('email')}
              className="pl-10 bg-[#0F0F0F] border-[#2A2A2A] text-white placeholder:text-slate-600 focus:border-[#6366F1]" />
          </div>
          {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label className="text-slate-400">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••"
              {...registerField('password')}
              className="pl-10 pr-10 bg-[#0F0F0F] border-[#2A2A2A] text-white placeholder:text-slate-600 focus:border-[#6366F1]" />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label className="text-slate-400">Role</Label>
          <select {...registerField('role')}
            className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-md py-2 px-3 text-white text-sm focus:outline-none focus:border-[#6366F1]">
            <option value="team_member">Team Member</option>
            <option value="chef_projet">Chef Projet</option>
            <option value="client">Client</option>
          </select>
          {errors.role && <p className="text-red-400 text-xs">{errors.role.message}</p>}
        </div>

        <Button type="submit" disabled={isPending} className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white mt-2">
          {isPending ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Creating account...</> : 'Create account'}
        </Button>
      </form>

      <p className="text-center text-slate-500 text-sm mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-[#6366F1] hover:text-[#4F46E5] transition-colors">
          Sign in
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { registerApi } from '@/api/auth.api';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    role: 'team_member',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await registerApi(formData);
      navigate('/pending');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Vaerdia</h1>
          <p className="text-slate-400 text-sm mt-1">ProjectFlow Platform</p>
        </div>

        <Card className="bg-[#1A1A1A] border-[#2A2A2A]">
          <CardHeader>
            <CardTitle className="text-white text-xl">Create account</CardTitle>
            <CardDescription className="text-slate-400">
              Fill in your details to request access
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">

              {/* Nom + Prenom */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-slate-400">Last name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <Input
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Haouas"
                      className="pl-10 bg-[#0F0F0F] border-[#2A2A2A] text-white placeholder:text-slate-600 focus:border-[#6366F1]"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-400">First name</Label>
                  <Input
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    placeholder="Abdesslem"
                    className="bg-[#0F0F0F] border-[#2A2A2A] text-white placeholder:text-slate-600 focus:border-[#6366F1]"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label className="text-slate-400">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="pl-10 bg-[#0F0F0F] border-[#2A2A2A] text-white placeholder:text-slate-600 focus:border-[#6366F1]"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label className="text-slate-400">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-[#0F0F0F] border-[#2A2A2A] text-white placeholder:text-slate-600 focus:border-[#6366F1]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showPassword
                      ? <EyeOff className="w-4 h-4" />
                      : <Eye className="w-4 h-4" />
                    }
                  </button>
                </div>
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <Label className="text-slate-400">Role</Label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-md py-2 px-3 text-white text-sm focus:outline-none focus:border-[#6366F1]"
                >
                  <option value="team_member">Team Member</option>
                  <option value="chef_projet">Chef Projet</option>
                  <option value="client">Client</option>
                </select>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Creating account...
                  </>
                ) : (
                  'Create account'
                )}
              </Button>

            </form>

            {/* Footer */}
            <p className="text-center text-slate-500 text-sm mt-6">
              Already have an account?{' '}
              <a
                href="/login"
                className="text-[#6366F1] hover:text-[#4F46E5] transition-colors"
              >
                Sign in
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
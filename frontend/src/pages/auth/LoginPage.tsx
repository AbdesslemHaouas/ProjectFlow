import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { loginApi } from '@/api/auth.api';
import { useAuthStore } from '@/store/auth.store';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await loginApi(email, password);
      const { access_token, user } = response.data;
      login(access_token, user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
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
            <CardTitle className="text-white text-xl">Welcome back</CardTitle>
            <CardDescription className="text-slate-400">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Email */}
              <div className="space-y-1.5">
                <Label className="text-slate-400">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>

            </form>

            {/* Footer */}
            <p className="text-center text-slate-500 text-sm mt-6">
              Don't have an account?{' '}
              <a 
                href="/register" 
                className="text-[#6366F1] hover:text-[#4F46E5] transition-colors"
              >
                Sign up
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
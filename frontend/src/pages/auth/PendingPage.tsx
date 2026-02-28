import { Clock, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/button';

const PendingPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">

        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-[#F59E0B]/10 flex items-center justify-center mx-auto mb-6">
          <Clock className="w-8 h-8 text-[#F59E0B]" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-2">
          Account Pending Approval
        </h1>

        {/* Description */}
        <p className="text-slate-400 text-sm mb-8">
          Your account has been created successfully. 
          Please wait for an admin to review and activate your account. 
          You will be able to login once approved.
        </p>

        {/* Info card */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 mb-6 text-left">
          <h3 className="text-white text-sm font-medium mb-3">What happens next?</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#6366F1]/10 flex items-center justify-center text-xs text-[#6366F1] font-medium">1</div>
              <p className="text-slate-400 text-sm">Admin reviews your request</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#6366F1]/10 flex items-center justify-center text-xs text-[#6366F1] font-medium">2</div>
              <p className="text-slate-400 text-sm">Admin assigns your role</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#6366F1]/10 flex items-center justify-center text-xs text-[#6366F1] font-medium">3</div>
              <p className="text-slate-400 text-sm">Your account gets activated</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#6366F1]/10 flex items-center justify-center text-xs text-[#6366F1] font-medium">4</div>
              <p className="text-slate-400 text-sm">You can login and access the platform</p>
            </div>
          </div>
        </div>

        {/* Logout button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-[#2A2A2A] text-slate-400 hover:text-white hover:bg-[#1A1A1A]"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Back to login
        </Button>

      </div>
    </div>
  );
};

export default PendingPage;
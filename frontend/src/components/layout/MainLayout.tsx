import { ReactNode } from 'react';
import Sidebar from './sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-screen bg-[#141414]">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-[240px] overflow-y-auto">
        
        {/* Top Navbar */}
        <div className="h-14 border-b border-[#1F1F1F] bg-[#141414] flex items-center justify-between px-6 sticky top-0 z-10">
          <h2 className="text-white font-medium text-sm">ProjectFlow</h2>
          <div className="flex items-center gap-3">
            <button className="text-slate-400 hover:text-white transition-colors">
              🔔
            </button>
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
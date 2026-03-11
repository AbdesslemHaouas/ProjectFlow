import MainLayout from '@/layouts/MainLayout';
import { useAuthStore } from '@/store/auth.store';
import AdminDashboard from './components/AdminDashboard';
import ChefProjetDashboard from './components/ChefProjetDashboard';
import TeamMemberDashboard from './components/TeamMemberDashboard';
import ClientDashboard from './components/ClientDashboard';

const DashboardPage = () => {
  const { user } = useAuthStore();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'chef_projet':
        return <ChefProjetDashboard />;
      case 'team_member':
        return <TeamMemberDashboard />;
      case 'client':
        return <ClientDashboard />;
      default:
        return <TeamMemberDashboard />;
    }
  };

  return (
    <MainLayout>
      {renderDashboard()}
    </MainLayout>
  );
};

export default DashboardPage;
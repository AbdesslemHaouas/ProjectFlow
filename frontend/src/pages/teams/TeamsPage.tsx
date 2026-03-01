import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Plus, Search, X, Crown, Users, Mail, Calendar, MoreHorizontal, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface TeamMember {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  status: 'active' | 'pending' | 'suspended';
  joinedAt: string;
  avatar?: string;
}

interface Team {
  id: number;
  name: string;
  description: string;
  project: string;
  chefProjet: string;
  color: string;
  members: TeamMember[];
  createdAt: string;
}

const mockTeams: Team[] = [
  {
    id: 1,
    name: 'ProjectFlow Core',
    description: 'Main development team for the ProjectFlow platform',
    project: 'ProjectFlow',
    chefProjet: 'Abdesslem Haouas',
    color: '#6366F1',
    createdAt: 'Jan 15, 2026',
    members: [
      { id: 1, nom: 'Haouas', prenom: 'Abdesslem', email: 'abdesslem@gmail.com', role: 'chef_projet', status: 'active', joinedAt: 'Jan 15, 2026' },
      { id: 2, nom: 'Chebil', prenom: 'Mohamed', email: 'mohamed@gmail.com', role: 'team_member', status: 'active', joinedAt: 'Jan 20, 2026' },
      { id: 3, nom: 'Chebil', prenom: 'Ayoub', email: 'ayoub@gmail.com', role: 'team_member', status: 'active', joinedAt: 'Feb 1, 2026' },
      { id: 4, nom: 'Ben Ali', prenom: 'Sara', email: 'sara@gmail.com', role: 'team_member', status: 'pending', joinedAt: 'Feb 10, 2026' },
    ],
  },
  {
    id: 2,
    name: 'Vaerdia CRM Squad',
    description: 'CRM development and maintenance team',
    project: 'Vaerdia CRM',
    chefProjet: 'Abdesslem Haouas',
    color: '#F59E0B',
    createdAt: 'Feb 1, 2026',
    members: [
      { id: 1, nom: 'Haouas', prenom: 'Abdesslem', email: 'abdesslem@gmail.com', role: 'chef_projet', status: 'active', joinedAt: 'Feb 1, 2026' },
      { id: 5, nom: 'Trabelsi', prenom: 'Karim', email: 'karim@gmail.com', role: 'team_member', status: 'active', joinedAt: 'Feb 5, 2026' },
      { id: 6, nom: 'Mansouri', prenom: 'Leila', email: 'leila@gmail.com', role: 'team_member', status: 'active', joinedAt: 'Feb 8, 2026' },
    ],
  },
  {
    id: 3,
    name: 'Mobile App Team',
    description: 'Cross-platform mobile application development',
    project: 'Mobile App',
    chefProjet: 'Mohamed Chebil',
    color: '#22C55E',
    createdAt: 'Mar 1, 2026',
    members: [
      { id: 2, nom: 'Chebil', prenom: 'Mohamed', email: 'mohamed@gmail.com', role: 'chef_projet', status: 'active', joinedAt: 'Mar 1, 2026' },
      { id: 3, nom: 'Chebil', prenom: 'Ayoub', email: 'ayoub@gmail.com', role: 'team_member', status: 'active', joinedAt: 'Mar 1, 2026' },
    ],
  },
];

const roleColors: Record<string, string> = {
  chef_projet: 'text-[#6366F1] bg-[#6366F1]/10',
  team_member: 'text-slate-400 bg-slate-400/10',
  admin: 'text-purple-400 bg-purple-400/10',
  client: 'text-green-400 bg-green-400/10',
};

const statusDot: Record<string, string> = {
  active: 'bg-green-400',
  pending: 'bg-yellow-400',
  suspended: 'bg-red-400',
};

const Avatar = ({ nom, prenom, size = 'md', color = '#6366F1' }: { nom: string; prenom: string; size?: 'sm' | 'md' | 'lg'; color?: string }) => {
  const sizes = { sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-12 h-12 text-base' };
  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center text-white font-medium shrink-0`}
      style={{ backgroundColor: color }}
    >
      {nom.charAt(0)}{prenom.charAt(0)}
    </div>
  );
};

const TeamsPage = () => {
  const [search, setSearch] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [hoveredTeam, setHoveredTeam] = useState<number | null>(null);

  const filtered = mockTeams.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.project.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-semibold">Teams</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {mockTeams.length} teams · {mockTeams.reduce((acc, t) => acc + t.members.length, 0)} members
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#6366F1]/20"
        >
          <Plus className="w-4 h-4" />
          New Team
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search teams..."
          className="pl-9 bg-[#1A1A1A] border-[#2A2A2A] text-white placeholder:text-slate-600 focus:border-[#6366F1] rounded-xl"
        />
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-3 gap-5">
        {filtered.map((team) => (
          <div
            key={team.id}
            onMouseEnter={() => setHoveredTeam(team.id)}
            onMouseLeave={() => setHoveredTeam(null)}
            onClick={() => setSelectedTeam(team)}
            className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:border-[#3A3A3A] hover:shadow-xl hover:-translate-y-1"
            style={{
              boxShadow: hoveredTeam === team.id ? `0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px ${team.color}20` : undefined,
            }}
          >
            {/* Top */}
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${team.color}15` }}
              >
                <Users className="w-5 h-5" style={{ color: team.color }} />
              </div>
              <button className="text-slate-600 hover:text-white transition-colors p-1 rounded-lg hover:bg-[#2A2A2A]">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Team info */}
            <h3 className="text-white font-semibold text-base mb-1">{team.name}</h3>
            <p className="text-slate-500 text-xs mb-4 line-clamp-2 leading-relaxed">{team.description}</p>

            {/* Project badge */}
            <div className="mb-4">
              <span
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ color: team.color, backgroundColor: `${team.color}15` }}
              >
                {team.project}
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-[#2A2A2A] mb-4" />

            {/* Members */}
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {team.members.slice(0, 4).map((member, i) => (
                  <div
                    key={member.id}
                    className="w-8 h-8 rounded-full border-2 border-[#1A1A1A] flex items-center justify-center text-white text-xs font-medium transition-transform duration-200 hover:translate-y-[-2px]"
                    style={{ backgroundColor: i === 0 ? team.color : `${team.color}80`, zIndex: 4 - i }}
                    title={`${member.prenom} ${member.nom}`}
                  >
                    {member.nom.charAt(0)}{member.prenom.charAt(0)}
                  </div>
                ))}
                {team.members.length > 4 && (
                  <div className="w-8 h-8 rounded-full border-2 border-[#1A1A1A] bg-[#2A2A2A] flex items-center justify-center text-slate-400 text-xs font-medium">
                    +{team.members.length - 4}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 text-slate-500 text-xs hover:text-white transition-colors">
                <span>{team.members.length} members</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Team Detail Modal */}
      {selectedTeam && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 transition-opacity duration-300"
            onClick={() => setSelectedTeam(null)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#141414] border border-[#2A2A2A] rounded-2xl z-30 max-h-[85vh] overflow-hidden shadow-2xl">

            {/* Modal header */}
            <div
              className="p-6 border-b border-[#2A2A2A] relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${selectedTeam.color}15, transparent)` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${selectedTeam.color}20` }}
                  >
                    <Users className="w-6 h-6" style={{ color: selectedTeam.color }} />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-lg">{selectedTeam.name}</h2>
                    <p className="text-slate-400 text-sm mt-0.5">{selectedTeam.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTeam(null)}
                  className="text-slate-500 hover:text-white transition-colors p-2 rounded-xl hover:bg-[#2A2A2A]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedTeam.color }} />
                  <span className="text-slate-400 text-xs">{selectedTeam.project}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-slate-400 text-xs">{selectedTeam.members.length} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-slate-400 text-xs">Created {selectedTeam.createdAt}</span>
                </div>
              </div>
            </div>

            {/* Members list */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-200px)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium text-sm">Team Members</h3>
                <button className="flex items-center gap-1.5 text-xs text-[#6366F1] hover:text-[#4F46E5] transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  Add member
                </button>
              </div>

              <div className="space-y-2">
                {selectedTeam.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#1A1A1A] transition-all duration-200 group"
                  >
                    {/* Avatar with status dot */}
                    <div className="relative shrink-0">
                      <Avatar
                        nom={member.nom}
                        prenom={member.prenom}
                        color={selectedTeam.color}
                      />
                      <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#141414] ${statusDot[member.status]}`} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-white text-sm font-medium">
                          {member.prenom} {member.nom}
                        </p>
                        {member.role === 'chef_projet' && (
                          <Crown className="w-3.5 h-3.5 text-[#F59E0B]" />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Mail className="w-3 h-3 text-slate-600" />
                        <p className="text-slate-500 text-xs truncate">{member.email}</p>
                      </div>
                    </div>

                    {/* Role badge */}
                    <span className={`text-xs px-2.5 py-1 rounded-full ${roleColors[member.role]}`}>
                      {member.role.replace('_', ' ')}
                    </span>

                    {/* Joined date */}
                    <div className="text-right shrink-0">
                      <p className="text-slate-600 text-xs">Joined</p>
                      <p className="text-slate-400 text-xs">{member.joinedAt}</p>
                    </div>

                    {/* Actions */}
                    <button className="text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Create Team Modal */}
      {showCreateModal && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20"
            onClick={() => setShowCreateModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#141414] border border-[#2A2A2A] rounded-2xl z-30 shadow-2xl">

            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A]">
              <div>
                <h2 className="text-white font-semibold">Create New Team</h2>
                <p className="text-slate-500 text-xs mt-0.5">Set up a new team for your project</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-500 hover:text-white transition-colors p-2 rounded-xl hover:bg-[#2A2A2A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-slate-400 text-xs">Team Name *</Label>
                <Input
                  placeholder="e.g. Frontend Team"
                  className="bg-[#0F0F0F] border-[#2A2A2A] text-white placeholder:text-slate-600 focus:border-[#6366F1] rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-slate-400 text-xs">Description</Label>
                <textarea
                  placeholder="What does this team work on?"
                  rows={3}
                  className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl px-3 py-2 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#6366F1] resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-slate-400 text-xs">Project</Label>
                <select className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]">
                  <option>ProjectFlow</option>
                  <option>Vaerdia CRM</option>
                  <option>Mobile App</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-slate-400 text-xs">Team Color</Label>
                <div className="flex gap-2">
                  {['#6366F1', '#F59E0B', '#22C55E', '#EF4444', '#8B5CF6', '#EC4899'].map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded-full transition-transform hover:scale-110 border-2 border-transparent hover:border-white"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-[#2A2A2A]">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white border border-[#2A2A2A] hover:bg-[#1A1A1A] transition-colors"
              >
                Cancel
              </button>
              <Button className="flex-1 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl">
                Create Team
              </Button>
            </div>
          </div>
        </>
      )}

    </MainLayout>
  );
};

export default TeamsPage;
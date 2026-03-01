import { useMemo, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import {
  BarChart3,
  Download,
  Calendar,
  Filter,
  TrendingUp,
  TrendingDown,
  Minus,
  FolderKanban,
  CheckCircle,
  AlertTriangle,
  Timer,
  FileText,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

type ReportPeriod = 'Last 7 days' | 'Last 30 days' | 'This quarter' | 'This year';

type Trend = 'up' | 'down' | 'flat';

interface Kpi {
  label: string;
  value: string;
  subLabel: string;
  trend: Trend;
  trendValue: string;
  color: string;
  bg: string;
  icon: any;
}

interface ProjectRow {
  id: number;
  name: string;
  health: number;
  delivery: number;
  velocity: number;
  risks: number;
}

const TrendIcon = ({ trend }: { trend: Trend }) => {
  if (trend === 'up') return <TrendingUp className="w-3.5 h-3.5 text-green-500" />;
  if (trend === 'down') return <TrendingDown className="w-3.5 h-3.5 text-red-500" />;
  return <Minus className="w-3.5 h-3.5 text-slate-500" />;
};

const ReportsPage = () => {
  const [period, setPeriod] = useState<ReportPeriod>('Last 30 days');
  const [project, setProject] = useState<string>('All Projects');
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');

  const projects = ['All Projects', 'ProjectFlow', 'Vaerdia CRM', 'Mobile App'];
  const periods: ReportPeriod[] = ['Last 7 days', 'Last 30 days', 'This quarter', 'This year'];

  const kpis: Kpi[] = useMemo(
    () => [
      {
        label: 'Delivery Rate',
        value: '78%',
        subLabel: 'On-time tasks',
        trend: 'up',
        trendValue: '+6%',
        color: '#22C55E',
        bg: '#22C55E15',
        icon: CheckCircle,
      },
      {
        label: 'Risks Detected',
        value: '4',
        subLabel: 'High priority',
        trend: 'down',
        trendValue: '-2',
        color: '#EF4444',
        bg: '#EF444415',
        icon: AlertTriangle,
      },
      {
        label: 'Avg Velocity',
        value: '36 pts',
        subLabel: 'Per sprint',
        trend: 'up',
        trendValue: '+3',
        color: '#6366F1',
        bg: '#6366F115',
        icon: BarChart3,
      },
      {
        label: 'Cycle Time',
        value: '4.2 d',
        subLabel: 'Median',
        trend: 'flat',
        trendValue: '+0.1',
        color: '#F59E0B',
        bg: '#F59E0B15',
        icon: Timer,
      },
    ],
    []
  );

  const rows: ProjectRow[] = useMemo(
    () => [
      { id: 1, name: 'ProjectFlow', health: 72, delivery: 81, velocity: 34, risks: 2 },
      { id: 2, name: 'Vaerdia CRM', health: 91, delivery: 92, velocity: 41, risks: 0 },
      { id: 3, name: 'Mobile App', health: 58, delivery: 63, velocity: 28, risks: 2 },
    ],
    []
  );

  const filteredRows = useMemo(() => {
    if (project === 'All Projects') return rows;
    return rows.filter((r) => r.name === project);
  }, [project, rows]);

  const exportLabel = from || to ? 'Export (Custom Range)' : `Export (${period})`;

  return (
    <MainLayout>
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-white text-xl font-semibold">Reports</h1>
          <p className="text-slate-500 text-sm mt-0.5">Executive summary, project health and delivery performance</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] hover:bg-[#0F0F0F] text-slate-300 px-3.5 py-2 rounded-xl text-sm transition-colors"
            type="button"
          >
            <FileText className="w-4 h-4 text-slate-500" />
            Generate PDF
          </button>
          <button
            className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white px-3.5 py-2 rounded-xl text-sm transition-colors"
            type="button"
          >
            <Download className="w-4 h-4" />
            {exportLabel}
          </button>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <Filter className="w-3.5 h-3.5" />
            Filters
          </div>

          <div className="flex gap-1">
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  period === p
                    ? 'bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/20'
                    : 'bg-[#141414] text-slate-400 hover:text-white border border-[#2A2A2A]'
                }`}
                type="button"
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto flex-wrap">
            <div className="flex items-center gap-2 bg-[#141414] border border-[#2A2A2A] rounded-xl px-3 py-2">
              <FolderKanban className="w-4 h-4 text-slate-500" />
              <select
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="bg-transparent text-slate-300 text-sm focus:outline-none"
              >
                {projects.map((p) => (
                  <option key={p} value={p} className="bg-[#141414]">
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 bg-[#141414] border border-[#2A2A2A] rounded-xl px-3 py-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              <Input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="h-auto p-0 border-0 bg-transparent text-slate-300 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <span className="text-slate-600 text-xs">→</span>
              <Input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="h-auto p-0 border-0 bg-transparent text-slate-300 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4 transition-all duration-200 hover:border-[#3A3A3A]"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-500 text-xs">{kpi.label}</p>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: kpi.bg }}
                >
                  <Icon className="w-4 h-4" style={{ color: kpi.color }} />
                </div>
              </div>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-white text-2xl font-bold">{kpi.value}</p>
                  <p className="text-slate-600 text-xs mt-0.5">{kpi.subLabel}</p>
                </div>
                <div className="flex items-center gap-1">
                  <TrendIcon trend={kpi.trend} />
                  <span className="text-xs text-slate-500 tabular-nums">{kpi.trendValue}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-5 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white font-semibold">Delivery performance</h2>
              <p className="text-slate-600 text-xs mt-0.5">Planned vs completed across the selected period</p>
            </div>
            <div className="text-slate-500 text-xs">{period}</div>
          </div>

          <div className="h-44 rounded-xl border border-[#2A2A2A] bg-[#141414] relative overflow-hidden">
            <div className="absolute inset-0 opacity-40" style={{
              background:
                'radial-gradient(600px circle at 20% 10%, rgba(99,102,241,0.25), transparent 45%), radial-gradient(600px circle at 80% 60%, rgba(34,197,94,0.18), transparent 45%)',
            }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-slate-400 text-sm">Chart preview</p>
                <p className="text-slate-600 text-xs mt-1">Hook your real data later</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: 'Completed', value: '124', color: '#22C55E' },
              { label: 'Planned', value: '159', color: '#6366F1' },
              { label: 'Overdue', value: '9', color: '#EF4444' },
            ].map((s) => (
              <div key={s.label} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-3">
                <p className="text-slate-500 text-xs">{s.label}</p>
                <p className="text-white text-lg font-semibold mt-1 tabular-nums">{s.value}</p>
                <div className="mt-2 h-1 rounded-full" style={{ backgroundColor: `${s.color}20` }}>
                  <div className="h-1 rounded-full" style={{ width: '62%', backgroundColor: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white font-semibold">Highlights</h2>
              <p className="text-slate-600 text-xs mt-0.5">Key events & recommendations</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                title: 'Velocity improved',
                desc: 'Average sprint velocity is trending up (+3 points).',
                color: '#22C55E',
              },
              {
                title: '2 high risks detected',
                desc: 'Check overloaded members and due dates on Mobile App.',
                color: '#EF4444',
              },
              {
                title: 'Delivery stable',
                desc: 'On-time delivery stays above 75% for most projects.',
                color: '#6366F1',
              },
            ].map((h) => (
              <div
                key={h.title}
                className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-4 hover:bg-[#0F0F0F] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: h.color }} />
                  <p className="text-white text-sm font-medium">{h.title}</p>
                </div>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A2A]">
          <div>
            <h2 className="text-white font-semibold">Project health</h2>
            <p className="text-slate-600 text-xs mt-0.5">Summary by project</p>
          </div>
          <div className="text-slate-500 text-xs">{filteredRows.length} projects</div>
        </div>

        <div className="grid grid-cols-12 gap-2 px-5 py-2 border-b border-[#2A2A2A]">
          <div className="col-span-4 text-slate-500 text-xs">Project</div>
          <div className="col-span-2 text-slate-500 text-xs">Health</div>
          <div className="col-span-2 text-slate-500 text-xs">Delivery</div>
          <div className="col-span-2 text-slate-500 text-xs">Velocity</div>
          <div className="col-span-2 text-slate-500 text-xs text-right">Risks</div>
        </div>

        <div className="divide-y divide-[#2A2A2A]">
          {filteredRows.map((r) => (
            <div key={r.id} className="grid grid-cols-12 gap-2 px-5 py-4 hover:bg-[#0F0F0F] transition-colors items-center">
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#141414] border border-[#2A2A2A] flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{r.name}</p>
                  <p className="text-slate-600 text-xs mt-0.5">{period}</p>
                </div>
              </div>

              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-[#141414] border border-[#2A2A2A] rounded-full overflow-hidden">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${r.health}%`,
                        backgroundColor: r.health >= 80 ? '#22C55E' : r.health >= 60 ? '#F59E0B' : '#EF4444',
                      }}
                    />
                  </div>
                  <span className="text-white text-xs tabular-nums">{r.health}%</span>
                </div>
              </div>

              <div className="col-span-2">
                <span className="text-slate-300 text-sm tabular-nums">{r.delivery}%</span>
              </div>

              <div className="col-span-2">
                <span className="text-slate-300 text-sm tabular-nums">{r.velocity} pts</span>
              </div>

              <div className="col-span-2 text-right">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${
                    r.risks === 0
                      ? 'text-green-400 bg-green-400/10 border-green-400/20'
                      : r.risks <= 2
                        ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
                        : 'text-red-400 bg-red-400/10 border-red-400/20'
                  }`}
                >
                  {r.risks}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ReportsPage;

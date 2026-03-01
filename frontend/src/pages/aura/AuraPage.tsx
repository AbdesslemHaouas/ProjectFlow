import { useState, useRef, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import {
  Bot, Send, Sparkles, TrendingUp, TrendingDown,
  AlertTriangle, CheckCircle, Brain, Zap, BarChart3,
  Target, Clock, ChevronRight, Lightbulb, Shield
} from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Insight {
  id: number;
  type: 'risk' | 'suggestion' | 'achievement' | 'alert';
  title: string;
  description: string;
  project?: string;
  severity?: 'low' | 'medium' | 'high';
  timestamp: string;
}

interface ProjectHealth {
  name: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

const mockInsights: Insight[] = [
  {
    id: 1,
    type: 'risk',
    title: 'Sprint delay detected',
    description: 'ProjectFlow Sprint 3 is at risk. Velocity is 18% below target.',
    project: 'ProjectFlow',
    severity: 'high',
    timestamp: '2 min ago',
  },
  {
    id: 2,
    type: 'suggestion',
    title: 'Reassign overloaded member',
    description: 'Abdesslem has 8 active tasks. Redistribute 2-3 to Mohamed.',
    project: 'ProjectFlow',
    severity: 'medium',
    timestamp: '15 min ago',
  },
  {
    id: 3,
    type: 'achievement',
    title: 'Sprint 2 completed',
    description: 'Vaerdia CRM Sprint 2 delivered 100% of story points.',
    project: 'Vaerdia CRM',
    timestamp: '1 hour ago',
  },
  {
    id: 4,
    type: 'alert',
    title: '3 tasks overdue',
    description: 'Mobile App has 3 tasks past their due date.',
    project: 'Mobile App',
    severity: 'high',
    timestamp: '3 hours ago',
  },
  {
    id: 5,
    type: 'suggestion',
    title: 'Optimize sprint capacity',
    description: 'Team performs best at 34-40 pts. Current sprint has 52.',
    project: 'ProjectFlow',
    severity: 'low',
    timestamp: '5 hours ago',
  },
  {
    id: 6,
    type: 'risk',
    title: 'Team capacity reduced',
    description: 'Sara is on maternity leave. Adjust sprint capacity.',
    severity: 'medium',
    timestamp: '1 day ago',
  },
];

const projectHealth: ProjectHealth[] = [
  { name: 'ProjectFlow', score: 72, trend: 'down', color: '#6366F1' },
  { name: 'Vaerdia CRM', score: 91, trend: 'up', color: '#22C55E' },
  { name: 'Mobile App', score: 58, trend: 'down', color: '#F59E0B' },
];

const insightConfig = {
  risk: { icon: AlertTriangle, color: '#EF4444', bg: '#EF444410', label: 'Risk' },
  suggestion: { icon: Lightbulb, color: '#6366F1', bg: '#6366F110', label: 'Suggestion' },
  achievement: { icon: CheckCircle, color: '#22C55E', bg: '#22C55E10', label: 'Achievement' },
  alert: { icon: Zap, color: '#F59E0B', bg: '#F59E0B10', label: 'Alert' },
};

const severityColors: Record<string, string> = {
  high: 'text-red-400',
  medium: 'text-yellow-400',
  low: 'text-blue-400',
};

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'assistant',
    content: "Hello! I'm Aura, your AI project management assistant. I can help you analyze project risks, optimize team performance, and provide actionable insights. How can I help you today?",
    timestamp: new Date(),
  },
];

const suggestedPrompts = [
  "What are the main risks?",
  "Team performance this sprint",
  "Improve velocity",
  "Generate health report",
  "Critical tasks",
  "Predict completion date",
];

const navItems = [
  { id: 'chat', label: 'Chat', icon: Send },
  { id: 'insights', label: 'Insights', icon: Sparkles },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'actions', label: 'Quick Actions', icon: Zap },
  { id: 'status', label: 'AI Status', icon: Brain },
];

const AuraPage = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeNav, setActiveNav] = useState('chat');
  const [insightFilter, setInsightFilter] = useState('All');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        role: 'assistant',
        content: "I'm currently in preview mode. Full AI capabilities coming soon — risk analysis, sprint predictions, team insights and more.",
        timestamp: new Date(),
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handlePrompt = (prompt: string) => {
    setInput(prompt);
    setActiveNav('chat');
  };

  const insightFilters = ['All', 'Risk', 'Alert', 'Suggestion', 'Achievement'];
  const filteredInsights = mockInsights.filter(i =>
    insightFilter === 'All' || i.type === insightFilter.toLowerCase()
  );

  const getHealthColor = (score: number) => {
    if (score >= 80) return '#22C55E';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)] gap-0">

        {/* Main area */}
        <div className="flex flex-1 gap-0 overflow-hidden rounded-2xl border border-[#1F1F1F]">

          {/* Left vertical nav */}
          <div className="w-48 bg-[#111111] border-r border-[#1F1F1F] flex flex-col shrink-0">

            {/* Aura brand */}
            <div className="p-4 border-b border-[#1F1F1F]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-slate-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Aura AI</p>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-slate-600 text-xs">Preview</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nav items */}
            <div className="flex-1 p-2 space-y-0.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                    activeNav === item.id
                      ? 'bg-[#1A1A1A] text-white border border-[#2A2A2A]'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-[#161616]'
                  }`}
                >
                  <item.icon className={`w-3.5 h-3.5 ${activeNav === item.id ? 'text-[#6366F1]' : ''}`} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 bg-[#0F0F0F] overflow-y-auto">

            {/* Chat */}
            {activeNav === 'chat' && (
              <div className="flex h-full">
                {/* Messages */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F1F1F]">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-slate-500" />
                      <span className="text-white text-sm font-medium">Chat with Aura</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.role === 'assistant' && (
                          <div className="w-6 h-6 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center shrink-0 mt-0.5">
                            <Bot className="w-3 h-3 text-slate-400" />
                          </div>
                        )}
                        <div
                          className={`max-w-sm px-3 py-2 rounded-xl text-xs leading-relaxed ${
                            message.role === 'user'
                              ? 'bg-[#1A1A1A] border border-[#2A2A2A] text-white rounded-tr-sm'
                              : 'bg-[#161616] border border-[#1F1F1F] text-slate-300 rounded-tl-sm'
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex gap-2">
                        <div className="w-6 h-6 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center shrink-0">
                          <Bot className="w-3 h-3 text-slate-400" />
                        </div>
                        <div className="bg-[#161616] border border-[#1F1F1F] px-3 py-2 rounded-xl rounded-tl-sm">
                          <div className="flex gap-1 items-center">
                            <div className="w-1 h-1 rounded-full bg-slate-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-1 h-1 rounded-full bg-slate-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-1 h-1 rounded-full bg-slate-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-6 border-t border-[#1F1F1F]">
                    <div className="flex gap-2">
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                        placeholder="Ask Aura anything..."
                        className="flex-1 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl px-3 py-2 text-white text-xs placeholder:text-slate-700 focus:outline-none focus:border-[#2A2A2A] transition-colors"
                      />
                      <button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="w-8 h-8 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#6366F1] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Suggested prompts */}
                <div className="w-48 border-l border-[#1F1F1F] p-3 flex flex-col">
                  <p className="text-slate-600 text-xs mb-3">Suggested</p>
                  <div className="space-y-1.5 flex-1">
                    {suggestedPrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(prompt)}
                        className="w-full text-left text-xs text-slate-500 hover:text-white px-2.5 py-2 rounded-lg hover:bg-[#1A1A1A] transition-colors leading-relaxed"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Insights */}
            {activeNav === 'insights' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-white font-semibold">AI Insights</h2>
                    <p className="text-slate-600 text-xs mt-0.5">{filteredInsights.length} insights detected</p>
                  </div>
                  <div className="flex gap-1">
                    {insightFilters.map((f) => (
                      <button
                        key={f}
                        onClick={() => setInsightFilter(f)}
                        className={`px-3 py-1 rounded-lg text-xs transition-all duration-200 ${
                          insightFilter === f
                            ? 'bg-[#1A1A1A] text-white border border-[#2A2A2A]'
                            : 'text-slate-600 hover:text-slate-300'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Insights grid */}
                <div className="grid grid-cols-2 gap-3">
                  {filteredInsights.map((insight) => {
                    const config = insightConfig[insight.type];
                    const Icon = config.icon;
                    return (
                      <div
                        key={insight.id}
                        className="bg-[#141414] border border-[#1F1F1F] rounded-2xl p-4 hover:border-[#2A2A2A] transition-all duration-200 group cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: config.bg }}
                          >
                            <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
                          </div>
                          <div className="flex items-center gap-1.5">
                            {insight.severity && (
                              <span className={`text-xs ${severityColors[insight.severity]}`}>
                                {insight.severity}
                              </span>
                            )}
                            <span className="text-slate-700 text-xs">{insight.timestamp}</span>
                          </div>
                        </div>
                        <h3 className="text-white text-sm font-medium mb-1 group-hover:text-slate-200">
                          {insight.title}
                        </h3>
                        <p className="text-slate-600 text-xs leading-relaxed">{insight.description}</p>
                        {insight.project && (
                          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[#1F1F1F]">
                            <div className="w-1 h-1 rounded-full bg-[#6366F1]/60" />
                            <span className="text-slate-500 text-xs">{insight.project}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Analytics */}
            {activeNav === 'analytics' && (
              <div className="p-6 space-y-5">
                <div>
                  <h2 className="text-white font-semibold">Analytics</h2>
                  <p className="text-slate-600 text-xs mt-0.5">AI-powered project metrics</p>
                </div>

                {/* Project Health */}
                <div className="bg-[#141414] border border-[#1F1F1F] rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-5">
                    <Target className="w-3.5 h-3.5 text-slate-500" />
                    <h3 className="text-slate-300 text-sm font-medium">Project Health</h3>
                  </div>
                  <div className="space-y-5">
                    {projectHealth.map((project) => {
                      const healthColor = getHealthColor(project.score);
                      return (
                        <div key={project.name}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                              <span className="text-slate-400 text-sm">{project.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {project.trend === 'up'
                                ? <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                                : <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                              }
                              <span className="text-white text-sm font-medium tabular-nums">{project.score}%</span>
                            </div>
                          </div>
                          <div className="w-full bg-[#0A0A0A] rounded-full h-1.5 overflow-hidden">
                            <div
                              className="h-1.5 rounded-full transition-all duration-1000"
                              style={{ width: `${project.score}%`, backgroundColor: healthColor }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Metrics grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Risks Detected', value: '4', icon: AlertTriangle, color: '#EF4444' },
                    { label: 'Suggestions', value: '12', icon: Lightbulb, color: '#6366F1' },
                    { label: 'On-time Delivery', value: '78%', icon: CheckCircle, color: '#22C55E' },
                    { label: 'Avg Velocity', value: '36pts', icon: Zap, color: '#F59E0B' },
                  ].map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <div key={metric.label} className="bg-[#141414] border border-[#1F1F1F] rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-slate-600 text-xs">{metric.label}</p>
                          <Icon className="w-3.5 h-3.5" style={{ color: metric.color }} />
                        </div>
                        <p className="text-white text-2xl font-semibold tabular-nums">{metric.value}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Coming soon features */}
                <div className="bg-[#141414] border border-[#1F1F1F] rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Brain className="w-3.5 h-3.5 text-slate-500" />
                      <h3 className="text-slate-300 text-sm font-medium">Advanced Analytics</h3>
                    </div>
                    <span className="text-xs text-slate-600 bg-[#1A1A1A] border border-[#2A2A2A] px-2 py-0.5 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                    {[
                      'Burndown Charts',
                      'Velocity Trends',
                      'Team Performance',
                      'Risk Predictions',
                      'Resource Planning',
                      'Cost Analysis',
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#2A2A2A]" />
                        <span className="text-slate-600 text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {activeNav === 'actions' && (
              <div className="p-6">
                <div className="mb-5">
                  <h2 className="text-white font-semibold">Quick Actions</h2>
                  <p className="text-slate-600 text-xs mt-0.5">Ask Aura to do something</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Analyze all projects', desc: 'Get a full overview of all project statuses', icon: BarChart3, color: '#6366F1' },
                    { label: 'Generate sprint report', desc: 'Create a detailed sprint performance report', icon: Target, color: '#22C55E' },
                    { label: 'Check team workload', desc: 'See who is overloaded and who has capacity', icon: Brain, color: '#F59E0B' },
                    { label: 'Predict project risks', desc: 'Identify potential blockers before they happen', icon: Shield, color: '#EF4444' },
                    { label: 'Suggest improvements', desc: 'Get AI recommendations for your workflow', icon: Lightbulb, color: '#8B5CF6' },
                    { label: 'Predict completion dates', desc: 'Estimate when projects will be delivered', icon: Clock, color: '#EC4899' },
                  ].map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.label}
                        onClick={() => { handlePrompt(action.label); }}
                        className="bg-[#141414] border border-[#1F1F1F] rounded-2xl p-4 hover:border-[#2A2A2A] transition-all duration-200 text-left group"
                      >
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                          style={{ backgroundColor: `${action.color}10` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: action.color }} />
                        </div>
                        <p className="text-white text-sm font-medium mb-1 group-hover:text-slate-200">
                          {action.label}
                        </p>
                        <p className="text-slate-600 text-xs leading-relaxed">{action.desc}</p>
                        <div className="flex items-center gap-1 mt-3 text-slate-600 group-hover:text-slate-400 transition-colors">
                          <span className="text-xs">Ask Aura</span>
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* AI Status */}
            {activeNav === 'status' && (
              <div className="p-6">
                <div className="mb-5">
                  <h2 className="text-white font-semibold">AI Status</h2>
                  <p className="text-slate-600 text-xs mt-0.5">Current capabilities and availability</p>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Insights Engine', desc: 'Real-time project risk detection', status: 'Active', color: '#22C55E' },
                    { label: 'Risk Detection', desc: 'Automated risk scoring and alerts', status: 'Active', color: '#22C55E' },
                    { label: 'Chat Assistant', desc: 'Conversational AI interface', status: 'Preview', color: '#F59E0B' },
                    { label: 'Burndown Analysis', desc: 'Sprint velocity and trend analysis', status: 'Soon', color: '#6366F1' },
                    { label: 'Resource Planning', desc: 'AI-powered team capacity planning', status: 'Soon', color: '#6366F1' },
                    { label: 'Cost Forecasting', desc: 'Budget prediction and optimization', status: 'Soon', color: '#6366F1' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-[#141414] border border-[#1F1F1F] rounded-2xl p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <div>
                          <p className="text-white text-sm font-medium">{item.label}</p>
                          <p className="text-slate-600 text-xs mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                      <span
                        className="text-xs px-2.5 py-1 rounded-full border"
                        style={{
                          color: item.color,
                          backgroundColor: `${item.color}10`,
                          borderColor: `${item.color}20`,
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AuraPage;

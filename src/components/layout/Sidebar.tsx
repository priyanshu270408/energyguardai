import React from 'react';
import {
  LayoutDashboard,
  Zap,
  Cpu,
  BrainCircuit,
  Sliders,
  Leaf,
  FileText,
  Network,
  Settings as SettingsIcon,
  HelpCircle,
  X,
  TrendingDown,
  DollarSign
} from 'lucide-react';
import { useFactory } from '../../store/factoryContext';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { activeTab, setActiveTab, setIsSettingsOpen, alerts, setSelectedMachineId } = useFactory();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'energy', label: 'Energy', icon: Zap, badge: null },
    { id: 'machines', label: 'Machines', icon: Cpu, badge: '5 units' },
    {
      id: 'insights',
      label: 'AI Insights',
      icon: BrainCircuit,
      badge: `${alerts.filter(a => !a.resolved).length} active`,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    { id: 'optimization', label: 'Optimization', icon: Sliders, badge: '₹3.7k/d' },
    { id: 'carbon', label: 'Carbon', icon: Leaf, badge: null },
    { id: 'financial', label: 'Financial Impact', icon: DollarSign, badge: '₹30.2k/m' },
    { id: 'reports', label: 'Reports', icon: FileText, badge: null },
    { id: 'architecture', label: 'How It Works', icon: Network, badge: 'IoT Edge' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setSelectedMachineId(null);
    onCloseMobile();
  };

  const navContent = (
    <div className="flex flex-col h-full bg-industrial-900 text-industrial-100 select-none">
      {/* Brand Header */}
      <div className="p-3.5 flex items-center justify-between border-b border-industrial-800">
        <div className="flex items-center gap-2.5">
          {/* Official EnergyGuard AI Logo */}
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-white p-0.5 border border-forest-600/50 shrink-0 shadow-xs flex items-center justify-center">
            <img src="/logo.jpg" alt="EnergyGuard AI Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-bold tracking-tight text-white text-sm">
                ENERGYGUARD
              </span>
              <span className="text-[10px] font-mono font-semibold px-1 py-0.5 rounded bg-forest-800 text-forest-200 border border-forest-700">
                AI
              </span>
            </div>
            <span className="text-[10px] text-industrial-400 font-medium tracking-wide">
              Cleaner Industry Brighter Tomorrow
            </span>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded text-industrial-400 hover:text-white hover:bg-industrial-800"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-2 pb-2 text-[10px] font-mono uppercase tracking-wider text-industrial-400 font-semibold">
          Operations
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-forest-800 text-white font-semibold shadow-xs'
                  : 'text-industrial-300 hover:text-white hover:bg-industrial-800/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-forest-200' : 'text-industrial-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    item.badgeColor || (isActive ? 'bg-forest-900/60 text-forest-100' : 'bg-industrial-800 text-industrial-300')
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Secondary Controls: Settings & Info */}
      <div className="p-3 border-t border-industrial-800 space-y-1">
        <button
          onClick={() => {
            setIsSettingsOpen(true);
            onCloseMobile();
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs text-industrial-300 hover:text-white hover:bg-industrial-800 transition-colors"
        >
          <SettingsIcon className="w-4 h-4 text-industrial-400" />
          <span>Plant Settings</span>
        </button>

        <div className="p-2.5 rounded bg-industrial-950/60 border border-industrial-800/80 mt-2">
          <div className="flex items-center justify-between text-[11px] font-medium text-industrial-300 mb-1">
            <span>Plant Intensity</span>
            <span className="font-mono text-emerald-400 font-semibold">↓ 16.0%</span>
          </div>
          <div className="w-full bg-industrial-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '84%' }}></div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-industrial-500 mt-1 font-mono">
            <span>0.84 kWh/unit</span>
            <span>Target: 1.00</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-industrial-800 h-screen sticky top-0 overflow-hidden">
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-full shadow-2xl z-50">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};

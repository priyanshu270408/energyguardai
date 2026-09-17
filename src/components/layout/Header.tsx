import React, { useState } from 'react';
import {
  Bell,
  Play,
  Bot,
  Settings as SettingsIcon,
  Menu,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { useFactory } from '../../store/factoryContext';
import { DisclaimerBadge } from '../common/DisclaimerBadge';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const {
    settings,
    kpis,
    alerts,
    isDemoMode,
    startDemoScenario,
    setIsCopilotOpen,
    setIsSettingsOpen,
    setActiveTab,
    setSelectedMachineId,
  } = useFactory();

  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  const unresolvedAlerts = alerts.filter(a => !a.resolved);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
      <div className="px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left Section: Mobile Menu + Factory Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <img
            src="/logo.jpg"
            alt="EnergyGuard AI"
            className="w-9 h-9 object-contain rounded-md border border-slate-200 p-0.5 bg-white shrink-0 hidden sm:block shadow-xs"
          />

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-industrial-950 tracking-tight text-sm sm:text-base">
                {settings.factoryName}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                {settings.location}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                All systems online
              </span>
              <span className="text-slate-300">•</span>
              <span className="hidden md:inline text-slate-500">
                Last updated {kpis.lastUpdatedSecondsAgo}s ago
              </span>
            </div>
          </div>
        </div>

        {/* Center Section: Transparency Disclaimer */}
        <div className="hidden xl:flex items-center">
          <DisclaimerBadge />
        </div>

        {/* Right Section: Demo Action, Notifications, Copilot, Settings, User */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hackathon Demo CTA */}
          {!isDemoMode && (
            <button
              onClick={startDemoScenario}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-forest-800 hover:bg-forest-900 text-white text-xs font-medium shadow-xs transition-colors border border-forest-900"
              title="Start guided 10-step hackathon presentation"
            >
              <Play className="w-3.5 h-3.5 fill-current text-forest-200" />
              <span className="hidden sm:inline">Run Demo Scenario</span>
              <span className="sm:hidden">Demo</span>
            </button>
          )}

          {/* Copilot Trigger */}
          <button
            onClick={() => setIsCopilotOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-industrial-800 text-xs font-medium border border-slate-300 transition-colors"
            title="Open EnergyGuard AI Copilot"
          >
            <Bot className="w-3.5 h-3.5 text-forest-700" />
            <span className="hidden md:inline">AI Copilot</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
              className="relative p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors"
              aria-label="Alerts"
            >
              <Bell className="w-4 h-4" />
              {unresolvedAlerts.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {unresolvedAlerts.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotificationDropdown && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-slate-200 z-50 overflow-hidden">
                <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-semibold text-industrial-900 uppercase tracking-wider">
                    Plant Alerts ({unresolvedAlerts.length})
                  </span>
                  <button
                    onClick={() => {
                      setShowNotificationDropdown(false);
                      setActiveTab('insights');
                    }}
                    className="text-xs text-forest-700 hover:text-forest-900 font-medium"
                  >
                    View all
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {unresolvedAlerts.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-500">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1.5" />
                      All machine telemetry within baseline.
                    </div>
                  ) : (
                    unresolvedAlerts.map(alert => (
                      <div
                        key={alert.id}
                        className="p-3 hover:bg-slate-50 cursor-pointer transition-colors"
                        onClick={() => {
                          setShowNotificationDropdown(false);
                          if (alert.machineId) {
                            setSelectedMachineId(alert.machineId);
                            setActiveTab('machines');
                          }
                        }}
                      >
                        <div className="flex items-start gap-2">
                          <AlertTriangle
                            className={`w-4 h-4 mt-0.5 shrink-0 ${
                              alert.severity === 'critical'
                                ? 'text-rose-600'
                                : alert.severity === 'warning'
                                ? 'text-amber-600'
                                : 'text-sky-600'
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-semibold text-industrial-900 truncate">
                                {alert.machineName}
                              </span>
                              <span className="text-[10px] text-slate-400 shrink-0">
                                {alert.timeAgo}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                              {alert.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Settings Trigger */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Factory & Tariff Settings"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>

          {/* User Profile */}
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-forest-800 text-forest-100 flex items-center justify-center text-xs font-bold font-mono">
              RV
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-semibold text-industrial-900 leading-tight">
                Rajesh Varma
              </span>
              <span className="text-[11px] text-slate-500 leading-tight">
                Energy Manager
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

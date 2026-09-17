import React, { useState } from 'react';
import { FactoryProvider, useFactory } from './store/factoryContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { DemoModeBar } from './components/layout/DemoModeBar';
import { PlantOverview } from './components/dashboard/PlantOverview';
import { EnergyMonitor } from './components/energy/EnergyMonitor';
import { MachineHealthGrid } from './components/machines/MachineHealthGrid';
import { AiInsightsView } from './components/insights/AiInsightsView';
import { OptimizationView } from './components/optimization/OptimizationView';
import { CarbonView } from './components/carbon/CarbonView';
import { FinancialImpactView } from './components/financial/FinancialImpactView';
import { ReportsView } from './components/reports/ReportsView';
import { ArchitectureView } from './components/architecture/ArchitectureView';
import { EnergyCopilotDrawer } from './components/copilot/EnergyCopilotDrawer';
import { SettingsModal } from './components/settings/SettingsModal';
import { DisclaimerBadge } from './components/common/DisclaimerBadge';

const MainLayout: React.FC = () => {
  const { activeTab } = useFactory();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <PlantOverview />;
      case 'energy':
        return <EnergyMonitor />;
      case 'machines':
        return <MachineHealthGrid />;
      case 'insights':
        return <AiInsightsView />;
      case 'optimization':
        return <OptimizationView />;
      case 'carbon':
        return <CarbonView />;
      case 'financial':
        return <FinancialImpactView />;
      case 'reports':
        return <ReportsView />;
      case 'architecture':
        return <ArchitectureView />;
      default:
        return <PlantOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Persistent Left Sidebar */}
      <Sidebar
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Shell */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

        {/* Demo Mode Notification Bar */}
        <DemoModeBar />

        {/* Main Content View */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </main>

        {/* Professional Industrial Footer (Prompt 49) */}
        <footer className="bg-white border-t border-slate-200 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 no-print">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
              <div className="flex items-center gap-1.5 font-bold text-industrial-950">
                <span className="w-2 h-2 rounded-full bg-forest-700"></span>
                <span>ENERGYGUARD AI</span>
              </div>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span>Industrial energy intelligence for manufacturing SMEs</span>
            </div>

            <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px] flex-wrap justify-center">
              <span>IoT & Edge</span>
              <span>•</span>
              <span>AI Diagnostics</span>
              <span>•</span>
              <span>Time-of-Day Optimization</span>
              <span>•</span>
              <span>Scope 2 Carbon</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span>Status: Prototype / Demo Environment</span>
            </div>
          </div>
        </footer>

        {/* AI Copilot Side Drawer */}
        <EnergyCopilotDrawer />

        {/* Settings Modal */}
        <SettingsModal />
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <FactoryProvider>
      <MainLayout />
    </FactoryProvider>
  );
};

export default App;

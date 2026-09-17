import React from 'react';
import { KpiGrid } from './KpiGrid';
import { EnergyChart } from './EnergyChart';
import { MachineStatusTable } from './MachineStatusTable';
import { AlertCenter } from './AlertCenter';
import { AiInsightCard } from './AiInsightCard';
import { useFactory } from '../../store/factoryContext';
import { ArrowRight, CheckCircle2, TrendingDown, Factory, Gauge } from 'lucide-react';

export const PlantOverview: React.FC = () => {
  const { settings, kpis, setActiveTab } = useFactory();

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-industrial-950">
            Plant Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time energy and equipment performance for {settings.factoryName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-md font-mono flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Data Quality: {kpis.dataQuality}
          </span>
          <span className="text-xs text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-md font-mono hidden md:inline-block shadow-xs">
            Shift: Morning (06:00 – 14:00)
          </span>
        </div>
      </div>

      {/* Top KPI Cards (5 Cards) */}
      <KpiGrid />

      {/* Main Energy Consumption Chart */}
      <EnergyChart />

      {/* Live Machine Fleet Table */}
      <MachineStatusTable />

      {/* Bottom 2-Column Section: Alert Center + AI Insight Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <AlertCenter />
        </div>
        <div className="lg:col-span-7">
          <AiInsightCard />
        </div>
      </div>

      {/* Before vs After Impact Highlight Strip */}
      <div className="bg-gradient-to-r from-forest-900 to-forest-950 rounded-lg p-4 sm:p-5 text-white shadow-sm border border-forest-800">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                Baseline vs Optimized
              </span>
              <span className="text-xs text-forest-200">Continuous Closed-Loop Tracking</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Demonstrated 16% Energy Intensity Reduction
            </h4>
            <p className="text-xs text-forest-200 max-w-2xl leading-relaxed">
              Specific energy consumption reduced from 1.00 to 0.84 kWh/unit with stable 2,960-unit textile output. Modelled based on 30-day baseline data.
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 shrink-0 bg-forest-900/60 p-3 rounded-md border border-forest-800/80 font-mono text-xs">
            <div>
              <span className="text-forest-400 block text-[10px] font-sans">Baseline SEC</span>
              <span className="text-slate-300 font-bold">1.00 kWh/u</span>
            </div>
            <span className="text-forest-500 font-sans">→</span>
            <div>
              <span className="text-emerald-300 block text-[10px] font-sans">Current SEC</span>
              <span className="text-emerald-400 font-bold">0.84 kWh/u</span>
            </div>
            <div className="border-l border-forest-800 pl-3">
              <button
                onClick={() => setActiveTab('optimization')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 hover:text-white underline underline-offset-2"
              >
                View Optimization →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

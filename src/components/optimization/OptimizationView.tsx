import React, { useState } from 'react';
import {
  Clock,
  Zap,
  IndianRupee,
  CheckCircle2,
  TrendingDown,
  Info,
  Calendar,
  Layers,
  ArrowRight,
  Sliders,
  Sparkles
} from 'lucide-react';
import { useFactory } from '../../store/factoryContext';
import { OPTIMIZATION_SCHEDULES } from '../../data/baselineProfiles';

export const OptimizationView: React.FC = () => {
  const { settings } = useFactory();
  const [activePlan, setActivePlan] = useState<'current' | 'optimized'>('optimized');

  const tariffBands = [
    { label: 'Night Off-Peak', hours: '00:00 – 06:00', rate: settings.offPeakTariffInr, color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    { label: 'Morning Normal', hours: '06:00 – 14:00', rate: settings.normalTariffInr, color: 'bg-slate-100 text-slate-700 border-slate-300' },
    { label: 'Evening Peak (ToD)', hours: '14:00 – 18:00', rate: settings.peakTariffInr, color: 'bg-rose-100 text-rose-800 border-rose-300' },
    { label: 'Night Shift Normal', hours: '18:00 – 20:00', rate: settings.normalTariffInr, color: 'bg-slate-100 text-slate-700 border-slate-300' },
    { label: 'Night Off-Peak', hours: '20:00 – 24:00', rate: settings.offPeakTariffInr, color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-industrial-950">
            Production & Energy Optimization
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Tariff-aware production scheduling and flexible load shifting
          </p>
        </div>

        {/* Schedule Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setActivePlan('current')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activePlan === 'current'
                ? 'bg-white text-industrial-950 font-bold shadow-xs'
                : 'text-slate-600 hover:text-industrial-900'
            }`}
          >
            Current Schedule
          </button>
          <button
            onClick={() => setActivePlan('optimized')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
              activePlan === 'optimized'
                ? 'bg-forest-800 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-industrial-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Optimized Schedule (Recommended)</span>
          </button>
        </div>
      </div>

      {/* Modelled Results Disclaimer */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs text-slate-600 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-industrial-900 block">
            Modelled Decision Support
          </span>
          <p className="text-slate-600 mt-0.5 leading-relaxed">
            Schedule models and cost savings shown below are simulated projections based on Surat ToD tariff structures. They demonstrate load shifting opportunities without autonomous intervention on factory machinery.
          </p>
        </div>
      </div>

      {/* Cost & Production Impact Comparison Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-industrial-950 tracking-tight">
            Schedule Cost Comparison (Simulated 24-Hour Run)
          </h2>
          <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
            ₹3,700 / Day Savings Potential
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg border transition-all ${activePlan === 'current' ? 'border-slate-400 bg-slate-50 ring-1 ring-slate-400/30' : 'border-slate-200 bg-white'}`}>
            <span className="text-xs text-slate-500 block uppercase font-mono tracking-wider font-semibold">
              Current Cost Profile
            </span>
            <div className="text-2xl font-bold font-mono text-industrial-950 mt-1">
              ₹42,600 <span className="text-xs font-normal text-slate-500 font-sans">/ day</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Includes 35 kW auxiliary compressor run during Gujarat peak tariff window (14:00 – 16:00).
            </p>
          </div>

          <div className={`p-4 rounded-lg border transition-all ${activePlan === 'optimized' ? 'border-forest-700 bg-forest-50/50 ring-2 ring-forest-500/20' : 'border-slate-200 bg-white'}`}>
            <span className="text-xs text-forest-800 block uppercase font-mono tracking-wider font-semibold">
              Optimized Cost Profile
            </span>
            <div className="text-2xl font-bold font-mono text-emerald-800 mt-1">
              ₹38,900 <span className="text-xs font-normal text-slate-500 font-sans">/ day</span>
            </div>
            <p className="text-xs text-emerald-900 mt-1">
              Shifted high-demand charging to off-peak night window (20:00 – 22:00) at ₹6.20/kWh.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/40">
            <span className="text-xs text-emerald-900 block uppercase font-mono tracking-wider font-semibold">
              Production Throughput Impact
            </span>
            <div className="text-2xl font-bold font-mono text-industrial-900 mt-1">
              2,960 <span className="text-xs font-normal text-slate-500 font-sans">units (100% preserved)</span>
            </div>
            <p className="text-xs text-emerald-800 mt-1">
              Zero reduction in weaving output. Fabric tension maintained via existing 1000L receiver buffer.
            </p>
          </div>
        </div>
      </div>

      {/* Gujarat Time-of-Day Tariff Visual Timeline */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
        <h3 className="text-sm font-bold text-industrial-950 tracking-tight mb-2">
          Surat DISCOM Time-of-Day (ToD) Tariff Structure
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Visualizing electricity rate differentials across the 24-hour manufacturing cycle
        </p>

        {/* Visual 24h Timeline Bar */}
        <div className="grid grid-cols-24 h-9 rounded-md overflow-hidden border border-slate-300 font-mono text-[10px] text-center font-bold">
          {/* 00:00 - 06:00 Off Peak (6 cols) */}
          <div className="col-span-6 bg-emerald-600 text-white flex items-center justify-center p-1" title="Off-Peak: ₹6.20/kWh">
            Off-Peak (₹6.20)
          </div>
          {/* 06:00 - 14:00 Normal (8 cols) */}
          <div className="col-span-8 bg-slate-500 text-white flex items-center justify-center p-1" title="Normal: ₹7.90/kWh">
            Normal (₹7.90)
          </div>
          {/* 14:00 - 18:00 Peak (4 cols) */}
          <div className="col-span-4 bg-rose-600 text-white flex items-center justify-center p-1 animate-pulse" title="Peak: ₹11.50/kWh">
            PEAK (₹11.50)
          </div>
          {/* 18:00 - 20:00 Normal (2 cols) */}
          <div className="col-span-2 bg-slate-500 text-white flex items-center justify-center p-1" title="Normal: ₹7.90/kWh">
            Normal
          </div>
          {/* 20:00 - 24:00 Off Peak (4 cols) */}
          <div className="col-span-4 bg-emerald-600 text-white flex items-center justify-center p-1" title="Off-Peak: ₹6.20/kWh">
            Off-Peak (₹6.20)
          </div>
        </div>

        {/* Timeline markers */}
        <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1 px-1">
          <span>00:00</span>
          <span>06:00</span>
          <span>14:00</span>
          <span>18:00</span>
          <span>20:00</span>
          <span>24:00</span>
        </div>

        {/* Schedule Shifting Opportunities Table */}
        <div className="mt-6 space-y-3">
          <span className="text-xs font-semibold text-industrial-950 uppercase font-mono tracking-wider block">
            Identified Load-Shifting Opportunities
          </span>

          {OPTIMIZATION_SCHEDULES.map(item => (
            <div key={item.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-industrial-950">
                    {item.machineName}
                  </span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                    Flexibility: {item.flexibility}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{item.process}</p>
                <div className="flex items-center gap-3 text-xs font-mono pt-1">
                  <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    Current: {item.currentSlot} ({item.currentTariffType} Tariff)
                  </span>
                  <span className="text-slate-400 font-sans">→</span>
                  <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                    Optimized: {item.optimizedSlot} ({item.optimizedTariffType} Tariff)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end md:self-auto shrink-0">
                <div className="text-right font-mono">
                  <span className="text-xs text-slate-500 block font-sans">Daily Saving</span>
                  <span className="text-base font-bold text-emerald-800">
                    ₹{item.savingsInr.toLocaleString()}/day
                  </span>
                </div>

                <div className="px-3 py-1.5 rounded bg-white border border-slate-200 text-xs text-slate-600 max-w-xs">
                  {item.productionImpact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Before vs After Systematic Benchmark Card (Section 34) */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
        <div className="pb-3 mb-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-industrial-950 tracking-tight">
            Before vs After Systematic Benchmark (Prompt 34)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Illustrative simulation based on defined operating baseline (Shakti Textiles)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Baseline State */}
          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-bold text-slate-700 font-sans uppercase">Defined Baseline (100%)</span>
              <span className="text-slate-400">Standard Run</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Total Energy:</span>
              <span className="font-bold text-industrial-950">2,714 kWh (100%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Specific Energy:</span>
              <span className="font-bold text-industrial-950">1.00 kWh/unit (100%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">CO₂ Emissions:</span>
              <span className="font-bold text-industrial-950">1.95 tonnes (100%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Energy Cost:</span>
              <span className="font-bold text-industrial-950">₹21,440 / day (100%)</span>
            </div>
          </div>

          {/* Optimized State */}
          <div className="p-4 rounded-lg border border-emerald-300 bg-emerald-50/40 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
              <span className="font-bold text-emerald-950 font-sans uppercase">Optimized Simulation (84.0%)</span>
              <span className="text-emerald-700 font-bold">↓ 16.0% Lower Intensity</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-sans">Total Energy:</span>
              <span className="font-bold text-emerald-800">2,486 kWh (91.6%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-sans">Specific Energy:</span>
              <span className="font-bold text-emerald-800">0.84 kWh/unit (84.0%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-sans">CO₂ Emissions:</span>
              <span className="font-bold text-emerald-800">1.72 tonnes (88.2%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-sans">Energy Cost:</span>
              <span className="font-bold text-emerald-800">₹19,640 / day (↓ 8.4%)</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>* Illustrative simulation based on defined baseline. Does not claim guaranteed physical savings.</span>
          <span className="font-semibold text-industrial-900">Output: 2,960 units • Quality: In-Spec</span>
        </div>
      </div>
    </div>
  );
};

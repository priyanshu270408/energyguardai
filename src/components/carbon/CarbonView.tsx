import React from 'react';
import {
  Leaf,
  Sliders,
  TrendingDown,
  Info,
  Sun,
  Wind,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { useFactory } from '../../store/factoryContext';

export const CarbonView: React.FC = () => {
  const { kpis, settings, updateSettings } = useFactory();

  const handleEmissionFactorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    updateSettings({ gridEmissionFactorKgPerKwh: val });
  };

  const calculatedDailyEmissionsTonnes = Number(
    ((kpis.todayEnergyKwh * settings.gridEmissionFactorKgPerKwh) / 1000).toFixed(2)
  );

  const calculatedMonthlyEmissionsTonnes = Number(
    (calculatedDailyEmissionsTonnes * 30).toFixed(1)
  );

  const calculatedIntensityKgPerUnit = Number(
    ((kpis.todayEnergyKwh * settings.gridEmissionFactorKgPerKwh) / kpis.todayProductionUnits).toFixed(2)
  );

  const decarbonizationOpportunities = [
    {
      title: 'Eliminate Compressed-Air Pneumatic Leaks',
      icon: Wind,
      monthlyEnergyReductionKwh: 1260,
      monthlyCo2ReductionTonnes: Number((1260 * settings.gridEmissionFactorKgPerKwh / 1000).toFixed(2)),
      financialSavingInr: 10080,
      capexEstimateInr: 12000,
      difficulty: 'Immediate (Low Capex)',
    },
    {
      title: 'HVAC Chilled Water Setpoint Drift Calibration',
      icon: Sliders,
      monthlyEnergyReductionKwh: 980,
      monthlyCo2ReductionTonnes: Number((980 * settings.gridEmissionFactorKgPerKwh / 1000).toFixed(2)),
      financialSavingInr: 7800,
      capexEstimateInr: 5000,
      difficulty: 'SOP Update (Zero Capex)',
    },
    {
      title: 'Loom Motor Lubrication & High-Efficiency Belts',
      icon: TrendingDown,
      monthlyEnergyReductionKwh: 600,
      monthlyCo2ReductionTonnes: Number((600 * settings.gridEmissionFactorKgPerKwh / 1000).toFixed(2)),
      financialSavingInr: 4800,
      capexEstimateInr: 18000,
      difficulty: 'Maintenance Window',
    },
    {
      title: '50 kWp Rooftop Solar PV Integration (Surat Grid)',
      icon: Sun,
      monthlyEnergyReductionKwh: 6200,
      monthlyCo2ReductionTonnes: Number((6200 * settings.gridEmissionFactorKgPerKwh / 1000).toFixed(2)),
      financialSavingInr: 49600,
      capexEstimateInr: 2100000,
      difficulty: 'Capital Investment (Subsidy Available)',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-industrial-950">
            Carbon Accounting & Decarbonization Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Scope 2 greenhouse gas emissions and clean technology impact modeling
          </p>
        </div>

        <div className="text-xs font-mono bg-white border border-slate-200 px-3 py-1.5 rounded-md text-slate-600 shadow-xs">
          CEA Base Factor: <strong className="text-industrial-900">0.71 kg CO₂/kWh</strong>
        </div>
      </div>

      {/* Grid Emission Factor Configurator Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-industrial-950 tracking-tight">
                Electricity Grid Emission Factor Configuration
              </h3>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                Scope 2 Standard
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Grid emission factors vary significantly by regional electricity mix, captive generation, and open-access green tariffs. Adjust this slider to reflect your specific utility billing tariff or state CEA baseline.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 w-full md:w-80 shrink-0">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-slate-500">Configured Factor:</span>
              <span className="text-base font-bold text-forest-800">
                {settings.gridEmissionFactorKgPerKwh.toFixed(2)} kg CO₂/kWh
              </span>
            </div>
            <input
              type="range"
              min="0.40"
              max="0.95"
              step="0.01"
              value={settings.gridEmissionFactorKgPerKwh}
              onChange={handleEmissionFactorChange}
              className="w-full accent-forest-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>0.40 (Solar Rich)</span>
              <span>0.71 (CEA Avg)</span>
              <span>0.95 (Thermal)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Carbon Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <span className="text-xs font-mono uppercase text-slate-500 block font-semibold">Today's CO₂ Emissions</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold font-mono text-industrial-950">
              {calculatedDailyEmissionsTonnes}
            </span>
            <span className="text-xs text-slate-500 font-mono">tonnes</span>
          </div>
          <span className="text-[11px] text-emerald-700 mt-1 block font-mono">
            ↓ 11.8% vs baseline (1.95 t)
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <span className="text-xs font-mono uppercase text-slate-500 block font-semibold">Monthly Estimated Run</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold font-mono text-industrial-950">
              {calculatedMonthlyEmissionsTonnes}
            </span>
            <span className="text-xs text-slate-500 font-mono">tonnes</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block font-mono">
            Based on 30-day projection
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <span className="text-xs font-mono uppercase text-slate-500 block font-semibold">Emission Intensity</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold font-mono text-emerald-800">
              {calculatedIntensityKgPerUnit}
            </span>
            <span className="text-xs text-slate-500 font-mono">kg CO₂/unit</span>
          </div>
          <span className="text-[11px] text-emerald-700 mt-1 block font-mono">
            ↓ 15.2% vs baseline (0.71)
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <span className="text-xs font-mono uppercase text-slate-500 block font-semibold">Potential CO₂ Abatement</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold font-mono text-emerald-800">
              2.01
            </span>
            <span className="text-xs text-slate-500 font-mono">tonnes/mo</span>
          </div>
          <span className="text-[11px] text-emerald-700 mt-1 block font-mono">
            Low-capex opportunities
          </span>
        </div>
      </div>

      {/* Decarbonization Levers Table */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
        <div className="pb-3 mb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-industrial-950 tracking-tight">
              Decarbonization Opportunities & Abatement Levers
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ranked by cost-effectiveness (Capex vs CO₂ reduction potential)
            </p>
          </div>
          <span className="text-xs font-mono bg-slate-100 px-2.5 py-1 rounded text-slate-700">
            Shakti Textiles Simulation
          </span>
        </div>

        <div className="space-y-3">
          {decarbonizationOpportunities.map((op, i) => {
            const Icon = op.icon;
            return (
              <div
                key={i}
                className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-forest-50 border border-forest-200 text-forest-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-industrial-950">
                      {op.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap font-mono">
                      <span>Energy Save: <strong className="text-industrial-900">{op.monthlyEnergyReductionKwh} kWh/mo</strong></span>
                      <span>•</span>
                      <span>Capex: <strong className="text-industrial-900">₹{op.capexEstimateInr.toLocaleString()}</strong></span>
                      <span>•</span>
                      <span className="text-emerald-800 font-sans font-medium">{op.difficulty}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 self-end md:self-auto shrink-0 font-mono text-right">
                  <div>
                    <span className="text-[10px] uppercase font-sans text-slate-500 block">Monthly CO₂ Cut</span>
                    <span className="text-sm font-bold text-emerald-800">
                      -{op.monthlyCo2ReductionTonnes} tonnes
                    </span>
                  </div>

                  <div className="border-l border-slate-200 pl-4">
                    <span className="text-[10px] uppercase font-sans text-slate-500 block">Monthly Financial Saving</span>
                    <span className="text-sm font-bold text-industrial-900">
                      ₹{op.financialSavingInr.toLocaleString()}/mo
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
          * Decarbonization metrics are calculated in accordance with the GHG Protocol Scope 2 location-based calculation methodology.
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  IndianRupee,
  TrendingDown,
  Calculator,
  Wind,
  Thermometer,
  Clock,
  Gauge,
  Info,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { SAVINGS_OPPORTUNITIES } from '../../data/baselineProfiles';

export const FinancialImpactView: React.FC = () => {
  // Payback calculator state (defaults from prompt section 25)
  const [monthlyBillInr, setMonthlyBillInr] = useState<number>(200000);
  const [efficiencyPct, setEfficiencyPct] = useState<number>(10);
  const [implementationCostInr, setImplementationCostInr] = useState<number>(60000);

  // Formulas
  const monthlySavingInr = Math.round((monthlyBillInr * efficiencyPct) / 100);
  const annualSavingInr = monthlySavingInr * 12;
  const paybackMonths = monthlySavingInr > 0 ? Number((implementationCostInr / monthlySavingInr).toFixed(1)) : 0;

  const getOpportunityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wind': return <Wind className="w-4 h-4 text-rose-700" />;
      case 'Thermometer': return <Thermometer className="w-4 h-4 text-amber-700" />;
      case 'Clock': return <Clock className="w-4 h-4 text-sky-700" />;
      default: return <Gauge className="w-4 h-4 text-emerald-700" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-industrial-950">
            Financial Impact & Savings Opportunities
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Identify unbudgeted energy waste and evaluate simple payback on efficiency investments
          </p>
        </div>

        <div className="text-xs font-mono bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-md text-emerald-900 font-bold shadow-xs">
          Total Identified Opportunity: ₹30,200 / month
        </div>
      </div>

      {/* Modelled Assumptions Disclaimer Banner (Section 25) */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs text-slate-600 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-industrial-900 block">
            Illustrative Scenario & Modelled Assumptions
          </span>
          <p className="text-slate-600 mt-0.5 leading-relaxed">
            These figures are modelled estimates for Shakti Textiles Pvt. Ltd. based on current baseline sensor deviations and Gujarat tariff structures. EnergyGuard does not offer guaranteed percentage savings; figures illustrate actionable potential based on selected operating assumptions.
          </p>
        </div>
      </div>

      {/* "Where Can We Save?" Breakdown (Prompt 26) */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-industrial-950 tracking-tight">
              Where Can We Save? (Identified Factory Inefficiencies)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Breakdown of ₹30,200/month in addressable electrical waste across Shakti Textiles
            </p>
          </div>

          <div className="text-xs font-mono font-bold text-emerald-800 bg-slate-100 px-2.5 py-1 rounded">
            ₹3,62,400 / year cumulative
          </div>
        </div>

        {/* Breakdown Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAVINGS_OPPORTUNITIES.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-white border border-slate-200 flex items-center justify-center">
                    {getOpportunityIcon(item.icon)}
                  </div>
                  <span className="font-bold text-sm text-industrial-950">
                    {item.category}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-industrial-900">
                  {item.percentage}% of total
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-3">
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${item.percentage * 2}%`, backgroundColor: item.color }}
                />
              </div>

              <div className="flex items-center justify-between font-mono text-xs pt-1 border-t border-slate-200">
                <span className="text-slate-500 font-sans">Identified Savings:</span>
                <span className="font-bold text-emerald-800">
                  ₹{item.monthlyInr.toLocaleString()} / month
                </span>
                <span className="text-slate-400">
                  (₹{item.annualInr.toLocaleString()}/yr)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive SME Payback Calculator (Prompt 25) */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
          <Calculator className="w-5 h-5 text-forest-800" />
          <div>
            <h3 className="text-base font-bold text-industrial-950 tracking-tight">
              Interactive SME Efficiency Payback Calculator
            </h3>
            <p className="text-xs text-slate-500">
              Model simple payback on EnergyGuard telemetry, leak repairs, and motor servicing
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs Section */}
          <div className="lg:col-span-6 space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-medium text-slate-700 mb-1">
                <span>Monthly Factory Electricity Bill:</span>
                <span className="font-bold font-mono text-industrial-950 text-sm">
                  ₹{monthlyBillInr.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="1000000"
                step="10000"
                value={monthlyBillInr}
                onChange={e => setMonthlyBillInr(parseInt(e.target.value))}
                className="w-full accent-forest-700 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                <span>₹50,000 (Small Unit)</span>
                <span>₹2,00,000 (Default)</span>
                <span>₹10,00,000 (Large Mill)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium text-slate-700 mb-1">
                <span>Targeted Efficiency Improvement:</span>
                <span className="font-bold font-mono text-emerald-700 text-sm">
                  {efficiencyPct}%
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="25"
                step="1"
                value={efficiencyPct}
                onChange={e => setEfficiencyPct(parseInt(e.target.value))}
                className="w-full accent-forest-700 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                <span>3% (Conservative)</span>
                <span>10% (Typical SME Audit)</span>
                <span>25% (Extensive Retrofit)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium text-slate-700 mb-1">
                <span>Estimated Implementation Capex:</span>
                <span className="font-bold font-mono text-industrial-950 text-sm">
                  ₹{implementationCostInr.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="15000"
                max="300000"
                step="5000"
                value={implementationCostInr}
                onChange={e => setImplementationCostInr(parseInt(e.target.value))}
                className="w-full accent-forest-700 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                <span>₹15,000 (Sensors Only)</span>
                <span>₹60,000 (Turnkey)</span>
                <span>₹3,00,000 (Hardware + VFD)</span>
              </div>
            </div>
          </div>

          {/* Results Output Card */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase font-semibold text-slate-500 block mb-3">
                Calculated Return on Investment (ROI)
              </span>

              <div className="grid grid-cols-2 gap-3 mb-4 font-mono">
                <div className="p-3 bg-white border border-slate-200 rounded">
                  <span className="text-[11px] font-sans text-slate-500 block">Monthly Savings:</span>
                  <span className="text-xl font-bold text-emerald-800">
                    ₹{monthlySavingInr.toLocaleString()}
                  </span>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded">
                  <span className="text-[11px] font-sans text-slate-500 block">Annual Savings:</span>
                  <span className="text-xl font-bold text-emerald-800">
                    ₹{annualSavingInr.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Simple Payback Readout */}
              <div className="p-4 bg-emerald-950 text-white rounded-lg border border-emerald-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase text-emerald-300 block">
                    Simple Payback Period
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-bold font-mono text-white">
                      {paybackMonths}
                    </span>
                    <span className="text-sm font-medium text-emerald-200 font-sans">
                      months
                    </span>
                  </div>
                </div>
                <div className="text-right text-xs text-emerald-200 max-w-[160px] leading-snug">
                  ₹{implementationCostInr.toLocaleString()} Capex ÷ ₹{monthlySavingInr.toLocaleString()}/mo Saving
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-200">
              * Based on simple payback formula: <code>Capex ÷ Monthly Savings</code>. Excludes depreciation and tax incentives (such as Section 32 of Indian IT Act for energy-saving equipment).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

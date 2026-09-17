import React, { useState } from 'react';
import {
  BrainCircuit,
  Wrench,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Info,
  Sliders,
  DollarSign
} from 'lucide-react';
import { useFactory } from '../../store/factoryContext';
import { AIInsight } from '../../types/factory';

export const AiInsightsView: React.FC = () => {
  const { insights, updateInsightStatus, setSelectedMachineId, setActiveTab } = useFactory();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredInsights = insights.filter(i => {
    if (selectedCategory !== 'all' && i.category !== selectedCategory) return false;
    return true;
  });

  const categories = [
    { id: 'all', label: 'All Insights', count: insights.length },
    { id: 'anomaly', label: 'Active Anomalies', count: insights.filter(i => i.category === 'anomaly').length },
    { id: 'waste', label: 'Energy Waste', count: insights.filter(i => i.category === 'waste').length },
    { id: 'maintenance', label: 'Maintenance Risks', count: insights.filter(i => i.category === 'maintenance').length },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-industrial-950">
            AI Insights & Decision Support
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Turn plant telemetry into actionable maintenance and energy-saving decisions
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-forest-800 text-white font-semibold'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                selectedCategory === cat.id ? 'bg-forest-900 text-forest-200' : 'bg-slate-100 text-slate-500'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Model Calibration & Transparency Alert */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs text-slate-600 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-industrial-900 block">
            Calibrated Industrial Decision Support
          </span>
          <p className="text-slate-600 mt-0.5 leading-relaxed">
            EnergyGuard AI employs multivariate statistical anomaly baselining and rule-guided diagnostics. Insights provide probabilistic explanations to assist plant managers and mill technicians, rather than definitive autonomous diagnoses.
          </p>
        </div>
      </div>

      {/* Insights Cards Feed */}
      <div className="space-y-4">
        {filteredInsights.map((insight: AIInsight) => {
          const isResolved = insight.status === 'resolved';
          const isInProgress = insight.status === 'in_progress';

          return (
            <div
              key={insight.id}
              className={`bg-white border rounded-lg p-5 shadow-sm transition-all ${
                isResolved
                  ? 'opacity-75 border-slate-200 bg-slate-50/50'
                  : insight.category === 'anomaly'
                  ? 'border-forest-800/40 ring-1 ring-forest-600/20'
                  : 'border-slate-200'
              }`}
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-forest-50 text-forest-800 border border-forest-200">
                    {insight.category}
                  </span>
                  <h3 className="text-base font-bold text-industrial-950 tracking-tight">
                    {insight.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-slate-500">
                    Confidence: <strong className="text-industrial-900">{insight.confidenceScore}%</strong>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-sans capitalize ${
                    isResolved
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : isInProgress
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {insight.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Problem Statement */}
              <div className="mb-3">
                <span className="text-[10px] uppercase tracking-wider font-mono font-semibold text-slate-400 block">
                  Observed Problem
                </span>
                <p className="text-sm font-semibold text-industrial-900 mt-0.5">
                  {insight.problem}
                </p>
              </div>

              {/* Correlated Evidence Pills */}
              <div className="mb-3">
                <span className="text-[10px] uppercase tracking-wider font-mono font-semibold text-slate-400 block mb-1.5">
                  Supporting Sensor Telemetry
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {insight.evidence.map((ev, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-200 rounded p-2 text-center text-xs">
                      <span className="text-slate-500 text-[11px] block truncate">{ev.label}</span>
                      <span className="font-mono font-bold text-industrial-900 block mt-0.5">{ev.value}</span>
                      <span className={`font-mono text-[11px] font-semibold ${
                        ev.delta.includes('+') && !ev.label.includes('Output') ? 'text-rose-600' : 'text-slate-600'
                      }`}>
                        {ev.delta}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explanation & Action Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-xs">
                <div className="bg-slate-50/80 border border-slate-200 rounded p-3">
                  <span className="font-semibold text-industrial-900 block mb-1 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-slate-500" />
                    Likely Physical Explanation:
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {insight.likelyExplanation}
                  </p>
                </div>

                <div className="bg-amber-50/50 border border-amber-200 rounded p-3">
                  <span className="font-semibold text-amber-950 block mb-1 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-amber-700" />
                    Recommended Remediation:
                  </span>
                  <p className="text-amber-900/90 leading-relaxed">
                    {insight.recommendedAction}
                  </p>
                </div>
              </div>

              {/* Card Footer: Impact & Actions */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-slate-500 font-sans text-[11px]">Potential Opportunity:</span>
                  <span className="font-bold text-emerald-800">
                    {insight.potentialImpactDaily.kwh > 0 && `${insight.potentialImpactDaily.kwh} kWh/day • `}
                    ₹{insight.potentialImpactDaily.inr}/day
                  </span>
                  <span className="text-slate-400">
                    (₹{insight.potentialImpactMonthly.inr.toLocaleString()}/mo)
                  </span>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => {
                      setSelectedMachineId(insight.machineId);
                      setActiveTab('machines');
                    }}
                    className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-medium"
                  >
                    Inspect Machine
                  </button>

                  {!isResolved ? (
                    <button
                      onClick={() => updateInsightStatus(insight.id, isInProgress ? 'resolved' : 'in_progress')}
                      className="px-3 py-1.5 rounded bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      <span>{isInProgress ? 'Mark Resolved' : 'Mark for Shift Action'}</span>
                    </button>
                  ) : (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1 text-xs">
                      <CheckCircle2 className="w-4 h-4" /> Resolved
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

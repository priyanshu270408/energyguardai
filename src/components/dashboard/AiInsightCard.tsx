import React, { useState } from 'react';
import {
  BrainCircuit,
  ArrowRight,
  Wrench,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  Info
} from 'lucide-react';
import { useFactory } from '../../store/factoryContext';

export const AiInsightCard: React.FC = () => {
  const { insights, setSelectedMachineId, setActiveTab, updateInsightStatus } = useFactory();
  const [isMarked, setIsMarked] = useState(false);

  // Focus on the primary compressor anomaly insight
  const primaryInsight = insights.find(i => i.id === 'ins-001') || insights[0];

  if (!primaryInsight) return null;

  const handleMarkMaintenance = () => {
    setIsMarked(true);
    updateInsightStatus(primaryInsight.id, 'in_progress');
  };

  return (
    <div className="bg-white border border-forest-800/30 rounded-lg shadow-sm p-4 h-full flex flex-col relative overflow-hidden">
      {/* Top subtle industrial accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-forest-800"></div>

      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-700">
            <BrainCircuit className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-industrial-950 tracking-tight flex items-center gap-1.5">
              EnergyGuard AI Insight
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">
              Confidence: {primaryInsight.confidenceScore}% (Multivariate Anomaly Model)
            </span>
          </div>
        </div>

        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
          Decision Support
        </span>
      </div>

      {/* Main Problem Headline */}
      <div className="mb-3">
        <p className="text-sm font-semibold text-industrial-900 leading-snug">
          "{primaryInsight.problem}"
        </p>
      </div>

      {/* Evidence Grid */}
      <div className="mb-3">
        <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 block mb-1.5 font-mono">
          Correlated Sensor Evidence
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {primaryInsight.evidence.map((ev, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded p-2 text-center">
              <span className="text-[10px] text-slate-500 block truncate">{ev.label}</span>
              <span className="text-xs font-bold text-industrial-900 font-mono block mt-0.5">
                {ev.value}
              </span>
              <span
                className={`text-[11px] font-mono font-bold block ${
                  ev.delta.includes('+') && !ev.label.includes('Production')
                    ? 'text-rose-600'
                    : 'text-slate-600'
                }`}
              >
                {ev.delta}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Probabilistic Explanation */}
      <div className="mb-3 bg-slate-50/80 border border-slate-200 rounded p-3 text-xs leading-relaxed text-slate-700">
        <div className="flex items-center gap-1.5 font-semibold text-industrial-900 mb-1 text-xs">
          <Info className="w-3.5 h-3.5 text-slate-500" />
          <span>Possible Explanation:</span>
        </div>
        <p className="text-slate-600">
          {primaryInsight.likelyExplanation}
        </p>
      </div>

      {/* Actionable Next Step */}
      <div className="mb-3 bg-amber-50/60 border border-amber-200/80 rounded p-3 text-xs text-amber-950">
        <div className="font-semibold text-amber-900 mb-1 flex items-center gap-1.5">
          <Wrench className="w-3.5 h-3.5 text-amber-700" />
          <span>Recommended Next Step:</span>
        </div>
        <p className="text-amber-900/90 leading-relaxed">
          {primaryInsight.recommendedAction}
        </p>
      </div>

      {/* Opportunity Callout */}
      <div className="mt-auto pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-wide text-slate-500 block">
            Potential Waste Opportunity
          </span>
          <div className="flex items-baseline gap-2 font-mono">
            <span className="text-sm font-bold text-emerald-800">
              {primaryInsight.potentialImpactDaily.kwh} kWh/day
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-sm font-bold text-emerald-800">
              ₹{primaryInsight.potentialImpactDaily.inr}/day
            </span>
            <span className="text-xs text-slate-500 font-sans">
              (₹{primaryInsight.potentialImpactMonthly.inr.toLocaleString()}/mo)
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              setSelectedMachineId(primaryInsight.machineId);
              setActiveTab('machines');
            }}
            className="px-2.5 py-1.5 rounded text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-300 transition-colors"
          >
            View Machine
          </button>
          <button
            onClick={handleMarkMaintenance}
            disabled={isMarked}
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isMarked
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                : 'bg-forest-800 text-white hover:bg-forest-900 border border-forest-900'
            }`}
          >
            {isMarked ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Marked for Shift Inspection</span>
              </>
            ) : (
              <>
                <Wrench className="w-3.5 h-3.5" />
                <span>Mark for Maintenance</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

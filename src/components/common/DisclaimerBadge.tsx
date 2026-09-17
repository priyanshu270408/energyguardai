import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

export const DisclaimerBadge: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400"
        title="Click for data provenance and simulation details"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse"></span>
        <span>Simulated Plant Data • Demo Environment</span>
        <Info className="w-3.5 h-3.5 text-slate-500" />
      </button>

      {showTooltip && (
        <div className="absolute top-full left-0 mt-1.5 w-72 p-3 bg-industrial-900 text-industrial-100 rounded-md shadow-xl border border-industrial-700 z-50 text-xs leading-relaxed">
          <div className="flex items-center justify-between pb-1 mb-1 border-b border-industrial-700 font-medium text-white">
            <span>Data Transparency</span>
            <button onClick={() => setShowTooltip(false)} className="text-industrial-400 hover:text-white">
              <X className="w-3 h-3" />
            </button>
          </div>
          <p className="text-industrial-300">
            Values displayed in this prototype are generated from realistic industrial telemetry models for Shakti Textiles Pvt. Ltd. (Surat, Gujarat). Sensor readings, baselines, and ToD tariffs emulate standard Indian SME manufacturing operations.
          </p>
        </div>
      )}
    </div>
  );
};

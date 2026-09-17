import React, { useState } from 'react';
import { X, Settings, CheckCircle2, RefreshCw } from 'lucide-react';
import { useFactory } from '../../store/factoryContext';

export const SettingsModal: React.FC = () => {
  const { isSettingsOpen, setIsSettingsOpen, settings, updateSettings } = useFactory();

  const [formState, setFormState] = useState({ ...settings });
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isSettingsOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formState);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      setIsSettingsOpen(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in duration-150">
        <div className="p-4 bg-industrial-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-forest-300" />
            <h3 className="font-bold text-base text-white">
              Plant & Tariff Configuration
            </h3>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-1 rounded text-industrial-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs font-sans">
          {/* Factory Info */}
          <div>
            <label className="font-semibold text-industrial-950 block mb-1">
              Factory Name
            </label>
            <input
              type="text"
              value={formState.factoryName}
              onChange={e => setFormState({ ...formState, factoryName: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs focus:outline-none focus:border-forest-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-industrial-950 block mb-1">
                Location
              </label>
              <input
                type="text"
                value={formState.location}
                onChange={e => setFormState({ ...formState, location: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs focus:outline-none focus:border-forest-700"
              />
            </div>
            <div>
              <label className="font-semibold text-industrial-950 block mb-1">
                Industry Sector
              </label>
              <input
                type="text"
                value={formState.industry}
                onChange={e => setFormState({ ...formState, industry: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs focus:outline-none focus:border-forest-700"
              />
            </div>
          </div>

          {/* Tariffs */}
          <div className="pt-2 border-t border-slate-200">
            <span className="font-bold text-industrial-950 block mb-2 font-mono uppercase tracking-wider text-[11px]">
              Electricity Tariff Structure (₹ / kWh)
            </span>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-slate-500 block mb-1 text-[11px]">Normal Rate</label>
                <input
                  type="number"
                  step="0.1"
                  value={formState.normalTariffInr}
                  onChange={e => setFormState({ ...formState, normalTariffInr: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs font-mono"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1 text-[11px]">Peak ToD Rate</label>
                <input
                  type="number"
                  step="0.1"
                  value={formState.peakTariffInr}
                  onChange={e => setFormState({ ...formState, peakTariffInr: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs font-mono text-rose-700 font-bold"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1 text-[11px]">Off-Peak Rate</label>
                <input
                  type="number"
                  step="0.1"
                  value={formState.offPeakTariffInr}
                  onChange={e => setFormState({ ...formState, offPeakTariffInr: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs font-mono text-emerald-700 font-bold"
                />
              </div>
            </div>
          </div>

          {/* Emission Factor & Anomaly Threshold */}
          <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-industrial-950 block mb-1">
                CEA Grid Emission Factor
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  step="0.01"
                  value={formState.gridEmissionFactorKgPerKwh}
                  onChange={e => setFormState({ ...formState, gridEmissionFactorKgPerKwh: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs font-mono"
                />
                <span className="text-slate-500 text-[11px]">kg/kWh</span>
              </div>
            </div>

            <div>
              <label className="font-semibold text-industrial-950 block mb-1">
                Anomaly Alert Threshold
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={formState.alertDeviationThresholdPct}
                  onChange={e => setFormState({ ...formState, alertDeviationThresholdPct: parseInt(e.target.value) || 15 })}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs font-mono"
                />
                <span className="text-slate-500 text-[11px]">%</span>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {savedNotice ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Settings updated
              </span>
            ) : (
              <span className="text-[11px] text-slate-400">
                Changes apply immediately to live plant models.
              </span>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-forest-800 hover:bg-forest-900 text-white font-semibold"
              >
                Save Settings
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

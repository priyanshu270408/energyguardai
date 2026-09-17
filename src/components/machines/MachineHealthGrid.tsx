import React, { useState } from 'react';
import {
  Cpu,
  AlertTriangle,
  Wrench,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  CheckCircle2,
  Info,
  Clock
} from 'lucide-react';
import { useFactory } from '../../store/factoryContext';
import { StatusBadge } from '../common/StatusBadge';
import { MachineDetailModal } from './MachineDetailModal';
import { Machine } from '../../types/factory';

export const MachineHealthGrid: React.FC = () => {
  const { machines, selectedMachineId, setSelectedMachineId } = useFactory();
  const [filterArea, setFilterArea] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredMachines = machines.filter(m => {
    if (filterArea !== 'all' && m.area !== filterArea) return false;
    if (filterStatus !== 'all' && m.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-industrial-950">
            Machine Health & Condition Monitoring
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Predictive maintenance indicators, vibration telemetry, and mechanical risk scoring
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-md px-2.5 py-1 text-xs text-slate-600 shadow-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterArea}
              onChange={e => setFilterArea(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-industrial-900 font-medium cursor-pointer"
            >
              <option value="all">All Areas</option>
              <option value="Production Floor A">Production Floor A</option>
              <option value="Utilities">Utilities</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-md px-2.5 py-1 text-xs text-slate-600 shadow-xs">
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-industrial-900 font-medium cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="normal">Normal</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transparent Health Scoring Methodology Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-industrial-900 block">
              Transparent Machine Health Indicator Methodology
            </span>
            <p className="text-slate-600 mt-0.5 leading-relaxed">
              This score is a prototype decision-support indicator based on current sensor patterns: Temperature drift, Vibration velocity against ISO 10816, Power variance from 30-day baseline, and Cumulative running hours.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-slate-500 font-mono text-[11px]">
          <span>● Low: &gt;80</span>
          <span>● Med: 70–80</span>
          <span>● High: &lt;70</span>
        </div>
      </div>

      {/* Machine Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMachines.map((machine: Machine) => {
          const isCritical = machine.status === 'critical';
          const isWarning = machine.status === 'warning';

          return (
            <div
              key={machine.id}
              onClick={() => setSelectedMachineId(machine.id)}
              className={`bg-white border rounded-lg p-5 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between ${
                isCritical
                  ? 'border-rose-300 ring-1 ring-rose-500/30'
                  : isWarning
                  ? 'border-amber-300 ring-1 ring-amber-500/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Card Top */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-industrial-950 tracking-tight">
                        {machine.name}
                      </h3>
                      <StatusBadge status={machine.status} risk={machine.maintenanceRisk} size="sm" />
                    </div>
                    <span className="text-xs text-slate-500 font-mono block mt-0.5">
                      {machine.area} • {machine.makeModel}
                    </span>
                  </div>

                  {/* Health Score Dial */}
                  <div className="text-right">
                    <div className="text-xl font-bold font-mono text-industrial-900">
                      {machine.healthScore}
                      <span className="text-xs text-slate-400 font-normal">/100</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 block">
                      Health
                    </span>
                  </div>
                </div>

                {/* Health Bar */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden mb-4">
                  <div
                    className={`h-1.5 rounded-full ${
                      machine.healthScore < 70
                        ? 'bg-rose-500'
                        : machine.healthScore < 85
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${machine.healthScore}%` }}
                  />
                </div>

                {/* Sensor Readings Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-50 p-3 rounded border border-slate-100 mb-3">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-sans">Active Power:</span>
                    <span className="font-semibold text-industrial-900">
                      {machine.currentPowerKw.toFixed(1)} kW
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] font-sans">Baseline Deviation:</span>
                    <span
                      className={`font-semibold ${
                        machine.deviationPct > 10 ? 'text-rose-600' : 'text-emerald-700'
                      }`}
                    >
                      {machine.deviationPct > 0 ? `+${machine.deviationPct}%` : `${machine.deviationPct}%`}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] font-sans">Motor Temp:</span>
                    <span className={machine.temperatureC > 70 ? 'text-rose-600 font-bold' : 'text-slate-700'}>
                      {machine.temperatureC.toFixed(1)}°C
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] font-sans">Vibration RMS:</span>
                    <span className={machine.vibrationMmS > 5.0 ? 'text-amber-600 font-bold' : 'text-slate-700'}>
                      {machine.vibrationMmS.toFixed(1)} mm/s
                    </span>
                  </div>
                </div>

                {/* Risk Factors Note */}
                <div className="text-xs text-slate-600 mb-3">
                  {machine.id === 'compressor-01' && (
                    <div className="p-2 bg-rose-50 border border-rose-200 rounded text-rose-900 text-[11px] leading-relaxed">
                      <strong>Critical Anomaly:</strong> +21% power surge, 78°C temp, 7.2 mm/s vibration. Intake filter or pneumatic leak suspected.
                    </div>
                  )}
                  {machine.id === 'loom-02' && (
                    <div className="p-2 bg-amber-50 border border-amber-200 rounded text-amber-900 text-[11px] leading-relaxed">
                      <strong>Bearing Drift:</strong> Drive-end shaft vibration increased to 5.2 mm/s over 3 hours. Check lubrication.
                    </div>
                  )}
                  {machine.status === 'normal' && (
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Operating nominal within ±3% baseline tolerance.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {machine.operatingHours.toLocaleString()} hrs
                </span>
                <span className="text-forest-700 font-semibold flex items-center gap-1 hover:underline">
                  Full Diagnostic →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Machine Detail Modal */}
      {selectedMachineId && (
        <MachineDetailModal
          machineId={selectedMachineId}
          onClose={() => setSelectedMachineId(null)}
        />
      )}
    </div>
  );
};

import React from 'react';
import { ChevronRight, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { useFactory } from '../../store/factoryContext';
import { StatusBadge } from '../common/StatusBadge';
import { Machine } from '../../types/factory';

export const MachineStatusTable: React.FC = () => {
  const { machines, setSelectedMachineId, setActiveTab } = useFactory();

  const handleMachineClick = (machineId: string) => {
    setSelectedMachineId(machineId);
    setActiveTab('machines');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden mb-6">
      {/* Table Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-industrial-950 tracking-tight">
            Live Machine Telemetry & Health
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time sensor telemetry across production and utilities assets
          </p>
        </div>
        <button
          onClick={() => setActiveTab('machines')}
          className="text-xs text-forest-700 hover:text-forest-900 font-semibold flex items-center gap-1"
        >
          View Full Fleet ({machines.length}) →
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold font-mono text-[11px]">
              <th className="py-2.5 px-4">Machine</th>
              <th className="py-2.5 px-3">Area</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Active Power</th>
              <th className="py-2.5 px-3">Temp</th>
              <th className="py-2.5 px-3">Vibration</th>
              <th className="py-2.5 px-3">Health Score</th>
              <th className="py-2.5 px-3">Energy Deviation</th>
              <th className="py-2.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-sans">
            {machines.map((machine: Machine) => {
              const isHighDev = machine.deviationPct > 15;
              const isNegativeDev = machine.deviationPct < 0;

              return (
                <tr
                  key={machine.id}
                  onClick={() => handleMachineClick(machine.id)}
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                >
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-industrial-900 group-hover:text-forest-700 transition-colors">
                        {machine.name}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {machine.makeModel}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {machine.area}
                  </td>
                  <td className="py-3 px-3">
                    <StatusBadge status={machine.status} risk={machine.maintenanceRisk} />
                  </td>
                  <td className="py-3 px-3 font-mono font-medium text-industrial-900">
                    {machine.currentPowerKw.toFixed(1)} kW
                  </td>
                  <td className="py-3 px-3 font-mono">
                    <span className={machine.temperatureC > 70 ? 'text-rose-600 font-bold' : 'text-slate-700'}>
                      {machine.temperatureC.toFixed(1)}°C
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono">
                    <span className={machine.vibrationMmS > 5.0 ? 'text-amber-600 font-bold' : 'text-slate-700'}>
                      {machine.vibrationMmS.toFixed(1)} mm/s
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-slate-100 rounded-full h-1.5 overflow-hidden">
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
                      <span className="font-semibold text-industrial-900">
                        {machine.healthScore}/100
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono">
                    <span
                      className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-semibold ${
                        isHighDev
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : isNegativeDev
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {machine.deviationPct > 0 ? `+${machine.deviationPct}%` : `${machine.deviationPct}%`}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-slate-400 group-hover:text-forest-700 inline-flex items-center text-xs font-medium">
                      Inspect <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-slate-100">
        {machines.map((machine: Machine) => (
          <div
            key={machine.id}
            onClick={() => handleMachineClick(machine.id)}
            className="p-3.5 hover:bg-slate-50 active:bg-slate-100 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="font-semibold text-sm text-industrial-950 block">
                  {machine.name}
                </span>
                <span className="text-xs text-slate-500">{machine.area}</span>
              </div>
              <StatusBadge status={machine.status} risk={machine.maintenanceRisk} size="sm" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-50 p-2 rounded mb-2">
              <div>
                <span className="text-slate-500 block text-[10px] font-sans">Power:</span>
                <span className="font-bold text-industrial-900">{machine.currentPowerKw.toFixed(1)} kW</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] font-sans">Deviation:</span>
                <span className={machine.deviationPct > 10 ? 'text-rose-600 font-bold' : 'text-emerald-700'}>
                  {machine.deviationPct > 0 ? `+${machine.deviationPct}%` : `${machine.deviationPct}%`}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] font-sans">Temp / Vibration:</span>
                <span>{machine.temperatureC}°C | {machine.vibrationMmS} mm/s</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] font-sans">Health:</span>
                <span className="font-bold">{machine.healthScore}/100</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-forest-700 font-medium">
              <span>{machine.description}</span>
              <span className="flex items-center">Inspect →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

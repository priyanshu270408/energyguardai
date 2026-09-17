import React from 'react';
import {
  X,
  Activity,
  AlertTriangle,
  Wrench,
  Thermometer,
  Gauge,
  Clock,
  CheckCircle2,
  TrendingUp,
  ShieldAlert,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { useFactory } from '../../store/factoryContext';
import { StatusBadge } from '../common/StatusBadge';
import { Machine } from '../../types/factory';

interface MachineDetailModalProps {
  machineId: string;
  onClose: () => void;
}

export const MachineDetailModal: React.FC<MachineDetailModalProps> = ({ machineId, onClose }) => {
  const { machines, alerts, setActiveTab, updateInsightStatus } = useFactory();
  const machine = machines.find(m => m.id === machineId);

  if (!machine) return null;

  // 12-hour historical trend points for this machine
  const historicalTrend = [
    { time: '04:00', power: machine.id === 'compressor-01' ? 31.5 : 21.0, baseline: machine.expectedBaselineKw, temp: 68, vib: 4.8 },
    { time: '06:00', power: machine.id === 'compressor-01' ? 31.8 : 21.2, baseline: machine.expectedBaselineKw, temp: 69, vib: 5.0 },
    { time: '08:00', power: machine.id === 'compressor-01' ? 32.0 : 21.4, baseline: machine.expectedBaselineKw, temp: 70, vib: 5.1 },
    { time: '10:00', power: machine.id === 'compressor-01' ? 32.2 : 21.6, baseline: machine.expectedBaselineKw, temp: 71, vib: 5.2 },
    { time: '12:00', power: machine.id === 'compressor-01' ? 33.0 : 21.3, baseline: machine.expectedBaselineKw, temp: 72, vib: 5.4 },
    { time: '13:00', power: machine.id === 'compressor-01' ? 34.5 : 21.5, baseline: machine.expectedBaselineKw, temp: 74, vib: 6.0 },
    { time: '14:00', power: machine.currentPowerKw, baseline: machine.expectedBaselineKw, temp: machine.temperatureC, vib: machine.vibrationMmS },
    { time: '15:00', power: machine.currentPowerKw * 1.02, baseline: machine.expectedBaselineKw, temp: machine.temperatureC + 1, vib: machine.vibrationMmS },
    { time: '16:00', power: machine.currentPowerKw * 1.01, baseline: machine.expectedBaselineKw, temp: machine.temperatureC, vib: machine.vibrationMmS - 0.2 },
  ];

  const machineAlerts = alerts.filter(a => a.machineId === machine.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-lg shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-industrial-900 text-white flex items-center justify-between border-b border-industrial-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-industrial-800 border border-industrial-700 flex items-center justify-center text-forest-300 font-mono font-bold text-sm">
              {machine.id.slice(0, 3).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  {machine.name}
                </h2>
                <StatusBadge status={machine.status} risk={machine.maintenanceRisk} />
              </div>
              <span className="text-xs text-industrial-400 font-mono">
                {machine.description} • {machine.makeModel} (Installed {machine.installYear})
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-industrial-400 hover:text-white hover:bg-industrial-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Key Sensor Readout Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded p-3">
              <span className="text-[10px] font-sans uppercase text-slate-500 block">Active Power</span>
              <span className="text-lg font-bold font-mono text-industrial-950 mt-0.5 block">
                {machine.currentPowerKw.toFixed(1)} kW
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                Baseline: {machine.expectedBaselineKw.toFixed(1)} kW
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded p-3">
              <span className="text-[10px] font-sans uppercase text-slate-500 block">Energy Deviation</span>
              <span
                className={`text-lg font-bold font-mono mt-0.5 block ${
                  machine.deviationPct > 15 ? 'text-rose-600' : 'text-emerald-700'
                }`}
              >
                {machine.deviationPct > 0 ? `+${machine.deviationPct}%` : `${machine.deviationPct}%`}
              </span>
              <span className="text-[11px] text-slate-500">
                Threshold: ±15%
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded p-3">
              <span className="text-[10px] font-sans uppercase text-slate-500 block">Operating Temp</span>
              <span
                className={`text-lg font-bold font-mono mt-0.5 block ${
                  machine.temperatureC > 72 ? 'text-rose-600' : 'text-industrial-950'
                }`}
              >
                {machine.temperatureC.toFixed(1)}°C
              </span>
              <span className="text-[11px] text-slate-500">
                Nominal: ~65.0°C
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded p-3">
              <span className="text-[10px] font-sans uppercase text-slate-500 block">Vibration (RMS)</span>
              <span
                className={`text-lg font-bold font-mono mt-0.5 block ${
                  machine.vibrationMmS > 5.0 ? 'text-amber-600' : 'text-industrial-950'
                }`}
              >
                {machine.vibrationMmS.toFixed(1)} mm/s
              </span>
              <span className="text-[11px] text-slate-500">
                ISO Limit: 4.5 mm/s
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded p-3 col-span-2 sm:col-span-4 lg:col-span-1">
              <span className="text-[10px] font-sans uppercase text-slate-500 block">Health Score</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-lg font-bold font-mono text-industrial-950">
                  {machine.healthScore}
                </span>
                <span className="text-xs text-slate-500 font-mono">/100</span>
              </div>
              <span className="text-[11px] font-semibold text-rose-700">
                Risk: {machine.maintenanceRisk}
              </span>
            </div>
          </div>

          {/* Synchronized Trend Charts (Power, Temp, Vibration) */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-industrial-950 tracking-tight">
                Historical Telemetry & Operating Envelopes (Last 12 Hours)
              </h3>
              <span className="text-xs font-mono text-slate-500">
                Sampling Rate: 1s • Modbus RTU / MQTT Gateway
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Power Trend */}
              <div>
                <span className="text-xs font-semibold text-slate-700 block mb-1">
                  Active Power vs Baseline (kW)
                </span>
                <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalTrend}>
                      <CartesianGrid strokeDasharray="2 2" stroke="#f1f5f9" />
                      <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '11px' }} />
                      <Line type="monotone" dataKey="baseline" stroke="#94a3b8" strokeDasharray="3 3" dot={false} strokeWidth={1.5} name="Baseline" />
                      <Line type="monotone" dataKey="power" stroke="#164e3f" strokeWidth={2} dot={{ r: 2 }} name="Power (kW)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Temperature Trend */}
              <div>
                <span className="text-xs font-semibold text-slate-700 block mb-1">
                  Discharge / Housing Temp (°C)
                </span>
                <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalTrend}>
                      <CartesianGrid strokeDasharray="2 2" stroke="#f1f5f9" />
                      <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} domain={[60, 85]} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '11px' }} />
                      <ReferenceLine y={75} stroke="#dc2626" strokeDasharray="3 3" label={{ value: 'Warn', fill: '#dc2626', fontSize: 9 }} />
                      <Line type="monotone" dataKey="temp" stroke="#d97706" strokeWidth={2} dot={{ r: 2 }} name="Temp (°C)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Vibration Trend */}
              <div>
                <span className="text-xs font-semibold text-slate-700 block mb-1">
                  Drive Vibration Velocity (mm/s)
                </span>
                <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalTrend}>
                      <CartesianGrid strokeDasharray="2 2" stroke="#f1f5f9" />
                      <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} domain={[3, 9]} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '11px' }} />
                      <ReferenceLine y={4.5} stroke="#d97706" strokeDasharray="3 3" label={{ value: 'ISO 10816', fill: '#d97706', fontSize: 9 }} />
                      <Line type="monotone" dataKey="vib" stroke="#dc2626" strokeWidth={2} dot={{ r: 2 }} name="Vibration" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Structured Human-Readable Engineering Diagnostic Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* 1. What's Happening? */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-2 font-semibold text-industrial-950 mb-1.5 text-sm">
                <Activity className="w-4 h-4 text-forest-700" />
                <span>What is happening?</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {machine.id === 'compressor-01'
                  ? 'Compressor-01 power draw surged from 31.7 kW to 38.4 kW (+21.1%) at 14:00. Concurrently, motor discharge temperature rose to 78°C (+9°C delta) and housing vibration rose to 7.2 mm/s, while weaving production rate remained flat at ~152 units/hour.'
                  : `${machine.name} is operating at ${machine.currentPowerKw.toFixed(1)} kW with a variance of ${machine.deviationPct > 0 ? `+${machine.deviationPct}%` : `${machine.deviationPct}%`} from its learned baseline envelope.`}
              </p>
            </div>

            {/* 2. Why it Matters */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-2 font-semibold text-industrial-950 mb-1.5 text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Why it matters</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {machine.id === 'compressor-01'
                  ? 'In a textile weaving plant, compressed air powers weft yarn insertion nozzles and tensioners. Inefficiency causes volumetric losses that manifest as pure electrical waste, costing ~₹336 every day in excess power bill without adding any production value.'
                  : 'Sustained deviations indicate either mechanical friction, electrical imbalance, or process inefficiencies that accelerate wear and tear and drive up specific energy consumption.'}
              </p>
            </div>

            {/* 3. What to Inspect */}
            <div className="bg-amber-50/50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-2 font-semibold text-amber-950 mb-1.5 text-sm">
                <Wrench className="w-4 h-4 text-amber-800" />
                <span>Recommended inspection steps</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                {machine.id === 'compressor-01' ? (
                  <>
                    <li>Inspect inlet air filter for particulate clogging or lint accumulation.</li>
                    <li>Conduct ultrasonic leak sweep across Floor A quick-connect manifolds.</li>
                    <li>Check minimum pressure valve and oil separator differential pressure.</li>
                  </>
                ) : (
                  <>
                    <li>Check drive belt tension and motor pulley alignment.</li>
                    <li>Inspect bearings for lubrication status and thermal signatures.</li>
                    <li>Verify three-phase current balance on local electrical contactor.</li>
                  </>
                )}
              </ul>
            </div>

            {/* 4. Potential Impact & Opportunity */}
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-lg p-4">
              <div className="flex items-center gap-2 font-semibold text-emerald-950 mb-1.5 text-sm">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                <span>Quantified potential impact</span>
              </div>
              <div className="space-y-1 text-slate-700 font-mono">
                <div className="flex justify-between">
                  <span>Daily Energy Waste:</span>
                  <span className="font-bold text-emerald-800">~42 kWh / day</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Financial Loss:</span>
                  <span className="font-bold text-emerald-800">~₹336 / day</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-emerald-200/60">
                  <span>Monthly Identified Opportunity:</span>
                  <span className="font-bold text-emerald-800">~₹10,080 / month</span>
                </div>
              </div>
            </div>
          </div>

          {/* Machine Health Scoring Transparency Callout */}
          <div className="bg-slate-100/80 rounded-lg p-3.5 border border-slate-300 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-semibold text-industrial-900 mb-1">
              <Info className="w-4 h-4 text-slate-500" />
              <span>Transparent Decision-Support Scoring</span>
            </div>
            <p className="leading-relaxed">
              <strong>Maintenance risk indicator:</strong> This score ({machine.healthScore}/100) is a prototype decision-support indicator based on current sensor patterns (temperature drift, vibration velocity against ISO 10816, power variance from 30-day baseline, and 8,450 cumulative operating hours). EnergyGuard provides decision support to guide human plant technicians rather than autonomous machine shutdown.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Asset ID: <span className="font-mono font-medium text-industrial-800">{machine.id}</span> • Area: <span className="font-medium text-industrial-800">{machine.area}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded text-xs font-medium text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                setActiveTab('insights');
              }}
              className="px-4 py-1.5 rounded text-xs font-semibold bg-forest-800 hover:bg-forest-900 text-white transition-colors flex items-center gap-1.5"
            >
              <span>View Active AI Insights</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

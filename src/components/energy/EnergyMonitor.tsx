import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  Zap,
  Gauge,
  TrendingDown,
  Layers,
  Calendar,
  Filter,
  Info,
  ArrowDownRight,
  Factory
} from 'lucide-react';
import { useFactory } from '../../store/factoryContext';
import { TOP_ENERGY_CONSUMERS } from '../../data/baselineProfiles';

export const EnergyMonitor: React.FC = () => {
  const { kpis, machines, timeSeries, setActiveTab, setSelectedMachineId } = useFactory();
  const [selectedMachineFilter, setSelectedMachineFilter] = useState<string>('all');
  const [selectedAreaFilter, setSelectedAreaFilter] = useState<string>('all');

  // Specific Energy Consumption data points (Hourly correlation)
  const secHourlyData = [
    { time: '06:00', totalKwh: 88.5, productionUnits: 118, sec: 0.75, baselineSec: 0.95 },
    { time: '08:00', totalKwh: 114.2, productionUnits: 145, sec: 0.79, baselineSec: 0.98 },
    { time: '10:00', totalKwh: 122.8, productionUnits: 155, sec: 0.79, baselineSec: 0.99 },
    { time: '12:00', totalKwh: 118.4, productionUnits: 150, sec: 0.79, baselineSec: 0.98 },
    { time: '14:00', totalKwh: 138.6, productionUnits: 152, sec: 0.91, baselineSec: 0.98 }, // Anomaly
    { time: '16:00', totalKwh: 136.0, productionUnits: 150, sec: 0.91, baselineSec: 0.98 },
    { time: '18:00', totalKwh: 115.0, productionUnits: 142, sec: 0.81, baselineSec: 0.96 },
    { time: '20:00', totalKwh: 98.4, productionUnits: 125, sec: 0.79, baselineSec: 0.94 },
  ];

  // Energy by Production Area
  const areaBreakdownData = [
    { name: 'Production Floor A (Weaving)', kwh: 1362, sharePct: 54.8, color: '#164e3f' },
    { name: 'Utilities (Compressor & Chiller)', kwh: 1124, sharePct: 45.2, color: '#2d6a4f' },
  ];

  // Colors for Donut Chart
  const CONSUMER_COLORS = ['#164e3f', '#2d6a4f', '#40916c', '#52b788', '#74c69d'];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-industrial-950">
            Energy Monitor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Detailed sub-metering, specific energy consumption (SEC), and load profiling
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-md px-2.5 py-1 text-xs text-slate-600 shadow-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedAreaFilter}
              onChange={e => setSelectedAreaFilter(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-industrial-900 font-medium cursor-pointer"
            >
              <option value="all">All Plant Areas</option>
              <option value="floor-a">Floor A (Weaving)</option>
              <option value="utilities">Utilities</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-md px-2.5 py-1 text-xs text-slate-600 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-industrial-900">Today (Last 24h)</span>
          </div>
        </div>
      </div>

      {/* Top 4 Quick Summary Pills */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs">
          <span className="text-[11px] uppercase font-mono tracking-wider text-slate-500 block">Total Plant Energy</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-bold font-mono text-industrial-950">2,486</span>
            <span className="text-xs text-slate-500">kWh</span>
          </div>
          <span className="text-[11px] text-emerald-700 mt-1 block font-mono">↓ 8.4% vs baseline</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs">
          <span className="text-[11px] uppercase font-mono tracking-wider text-slate-500 block">Specific Energy (SEC)</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-bold font-mono text-emerald-700">0.84</span>
            <span className="text-xs text-slate-500">kWh/unit</span>
          </div>
          <span className="text-[11px] text-emerald-700 mt-1 block font-mono">↓ 16.0% efficiency gain</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs">
          <span className="text-[11px] uppercase font-mono tracking-wider text-slate-500 block">Peak Demand Recorded</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-bold font-mono text-industrial-950">141.2</span>
            <span className="text-xs text-slate-500">kW</span>
          </div>
          <span className="text-[11px] text-rose-600 mt-1 block font-mono">15:00 (Surat Peak ToD)</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs">
          <span className="text-[11px] uppercase font-mono tracking-wider text-slate-500 block">Daily Energy Cost</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-bold font-mono text-industrial-950">₹19,640</span>
          </div>
          <span className="text-[11px] text-emerald-700 mt-1 block font-mono">↓ 6.2% vs yesterday</span>
        </div>
      </div>

      {/* SEC Section: Deep-Dive on Specific Energy Consumption */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-industrial-950 tracking-tight">
                Specific Energy Consumption (SEC) & Production Decoupling
              </h2>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-bold">
                16% Improvement
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Energy required to produce one unit of textile output compared with defined baseline
            </p>
          </div>

          <div className="text-xs text-slate-600 font-mono bg-slate-50 px-3 py-1.5 rounded border border-slate-200">
            Formula: <span className="font-bold text-industrial-900">Total Energy (kWh) ÷ Production Units</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart: SEC vs Production */}
          <div className="lg:col-span-8">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={secHourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} domain={[0.6, 1.2]} />
                  <Tooltip
                    formatter={(value: any, name: any) => [
                      `${value} kWh/unit`,
                      name === 'sec' ? 'Current SEC' : 'Baseline SEC'
                    ]}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }} />
                  <Line
                    type="monotone"
                    dataKey="baselineSec"
                    name="Operating Baseline (1.00)"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="sec"
                    name="Actual SEC (kWh/unit)"
                    stroke="#164e3f"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#164e3f' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* SEC Explanation & Assurance */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-slate-50 rounded-lg p-4 border border-slate-200 text-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-semibold text-industrial-900 text-sm">
                <Gauge className="w-4 h-4 text-emerald-600" />
                <span>Production Decoupling Check</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Energy required to produce one unit of output has decreased compared with the defined baseline.
              </p>
              <div className="p-2.5 bg-white rounded border border-slate-200 space-y-1.5 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Baseline SEC:</span>
                  <span className="font-semibold text-slate-700">1.00 kWh/unit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Current SEC:</span>
                  <span className="font-bold text-emerald-700">0.84 kWh/unit</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-100 text-emerald-700 font-bold">
                  <span>Efficiency Gain:</span>
                  <span>16.0%</span>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded p-2.5 text-emerald-900">
                <span className="font-semibold block mb-0.5">Crucial Verification:</span>
                Production throughput is maintained at <strong>2,960 units</strong> (Target: 3,000 units, 98.7% fulfillment) with fabric quality strictly within spec. Efficiency did not come at the expense of output.
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400">
              * Simulated baseline learned over 30 operating days at Shakti Textiles.
            </div>
          </div>
        </div>
      </div>

      {/* Machine Breakdown & Top Consumers Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Donut Chart: Consumption Share */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-5 shadow-sm flex flex-col">
          <h3 className="text-base font-semibold text-industrial-950 tracking-tight mb-1">
            Energy Consumption by Asset
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Percentage share of plant electrical power (Simulated demo plant)
          </p>

          <div className="h-56 w-full my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={TOP_ENERGY_CONSUMERS}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="sharePct"
                >
                  {TOP_ENERGY_CONSUMERS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CONSUMER_COLORS[index % CONSUMER_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`${value}%`, 'Share']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-100 font-mono">
            {TOP_ENERGY_CONSUMERS.map((c, i) => (
              <div key={c.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: CONSUMER_COLORS[i] }}></span>
                <span className="text-slate-600 font-sans truncate">{c.name}:</span>
                <span className="font-bold text-industrial-900">{c.sharePct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Energy Consumers Ranking List */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-semibold text-industrial-950 tracking-tight">
                Top Energy Consumers Ranking
              </h3>
              <p className="text-xs text-slate-500">
                Sorted by instantaneous power draw and variance from baseline
              </p>
            </div>
            <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
              Demo Plant Fleet
            </span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto">
            {TOP_ENERGY_CONSUMERS.map((consumer, idx) => {
              const machineObj = machines.find(m => m.name === consumer.name);
              const isAnomaly = machineObj && machineObj.deviationPct > 15;

              return (
                <div
                  key={consumer.name}
                  onClick={() => {
                    if (machineObj) {
                      setSelectedMachineId(machineObj.id);
                      setActiveTab('machines');
                    }
                  }}
                  className="p-3 rounded border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 text-slate-700 font-mono font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-industrial-900 text-xs sm:text-sm">
                        {consumer.name}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">({consumer.area})</span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="font-bold text-industrial-900">{consumer.powerKw} kW</span>
                      <span className="text-slate-400">|</span>
                      <span className="font-bold text-slate-700">{consumer.sharePct}% of total</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${
                        isAnomaly ? 'bg-rose-500' : 'bg-forest-700'
                      }`}
                      style={{ width: `${consumer.sharePct * 2.5}%` }}
                    />
                  </div>

                  {/* Extra Context */}
                  {isAnomaly && (
                    <div className="mt-2 text-[11px] text-rose-700 bg-rose-50 px-2 py-1 rounded border border-rose-200 flex items-center justify-between">
                      <span>⚠️ Operating +21.1% above expected baseline load</span>
                      <span className="font-semibold underline">Inspect Diagnostic →</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
            Note: This ranking reflects the simulated operating cycle of Shakti Textiles Pvt. Ltd. and is not universal across all textile facilities.
          </p>
        </div>
      </div>
    </div>
  );
};

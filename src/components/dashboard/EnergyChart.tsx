import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  Legend,
} from 'recharts';
import { AlertCircle, Calendar, Download, RefreshCw, ZoomIn } from 'lucide-react';
import { useFactory } from '../../store/factoryContext';

export const EnergyChart: React.FC = () => {
  const { timeSeries, setSelectedMachineId, setActiveTab } = useFactory();
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');

  // Simulated 7-day and 30-day aggregations for realistic switching
  const getDisplayData = () => {
    if (timeRange === '7d') {
      return [
        { time: 'Mon', actualEnergyKwh: 2650, expectedBaselineKwh: 2700, productionUnits: 2890, specificEnergy: 0.92, costInr: 21200 },
        { time: 'Tue', actualEnergyKwh: 2580, expectedBaselineKwh: 2710, productionUnits: 2950, specificEnergy: 0.87, costInr: 20640 },
        { time: 'Wed', actualEnergyKwh: 2720, expectedBaselineKwh: 2690, productionUnits: 2920, specificEnergy: 0.93, costInr: 22100, isAnomaly: true, anomalyNote: 'Mid-week auxiliary compressor run' },
        { time: 'Thu', actualEnergyKwh: 2486, expectedBaselineKwh: 2714, productionUnits: 2960, specificEnergy: 0.84, costInr: 19640 },
        { time: 'Fri', actualEnergyKwh: 2510, expectedBaselineKwh: 2700, productionUnits: 2940, specificEnergy: 0.85, costInr: 20080 },
        { time: 'Sat', actualEnergyKwh: 1840, expectedBaselineKwh: 1900, productionUnits: 2100, specificEnergy: 0.88, costInr: 14720 },
        { time: 'Sun', actualEnergyKwh: 920, expectedBaselineKwh: 950, productionUnits: 800, specificEnergy: 1.15, costInr: 7360 },
      ];
    } else if (timeRange === '30d') {
      return Array.from({ length: 15 }, (_, i) => {
        const day = (i + 1) * 2;
        const actual = Math.round(2450 + Math.sin(i * 0.8) * 220 + (i === 7 ? 350 : 0));
        const baseline = 2700;
        return {
          time: `Day ${day}`,
          actualEnergyKwh: actual,
          expectedBaselineKwh: baseline,
          productionUnits: Math.round(actual / 0.86),
          specificEnergy: Number((actual / (actual / 0.86)).toFixed(2)),
          costInr: Math.round(actual * 8.2),
          isAnomaly: i === 7,
          anomalyNote: i === 7 ? 'Compressor unloader failure' : undefined
        };
      });
    }
    return timeSeries;
  };

  const chartData = getDisplayData();

  // Custom rich industrial tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const actual = payload.find((p: any) => p.dataKey === 'actualEnergyKwh')?.value || 0;
      const baseline = payload.find((p: any) => p.dataKey === 'expectedBaselineKwh')?.value || 0;
      const deviation = baseline > 0 ? (((actual - baseline) / baseline) * 100).toFixed(1) : '0';
      const devNum = parseFloat(deviation);
      const dataPoint = payload[0]?.payload;

      return (
        <div className="bg-industrial-900 border border-industrial-700 p-3 rounded-md shadow-xl text-white text-xs max-w-xs font-sans">
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-industrial-800">
            <span className="font-mono text-industrial-400 font-semibold">{label}</span>
            {dataPoint?.isAnomaly && (
              <span className="inline-flex items-center gap-1 text-[10px] bg-rose-950 text-rose-300 px-1.5 py-0.5 rounded border border-rose-800">
                <AlertCircle className="w-2.5 h-2.5" /> Anomaly Point
              </span>
            )}
          </div>

          <div className="space-y-1 font-mono">
            <div className="flex items-center justify-between gap-4">
              <span className="text-industrial-400 font-sans">Actual Energy:</span>
              <span className="font-bold text-white">{actual} kWh</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-industrial-400 font-sans">Expected Baseline:</span>
              <span className="text-industrial-300">{baseline} kWh</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-industrial-400 font-sans">Deviation:</span>
              <span className={`font-semibold ${devNum > 10 ? 'text-rose-400' : devNum < 0 ? 'text-emerald-400' : 'text-slate-300'}`}>
                {devNum > 0 ? `+${devNum}%` : `${devNum}%`}
              </span>
            </div>
            {dataPoint?.productionUnits && (
              <div className="flex items-center justify-between gap-4 pt-1 border-t border-industrial-800 text-[11px]">
                <span className="text-industrial-400 font-sans">Output Rate:</span>
                <span className="text-emerald-400 font-semibold">{dataPoint.productionUnits} units</span>
              </div>
            )}
          </div>

          {dataPoint?.anomalyNote && (
            <div className="mt-2 pt-1.5 border-t border-industrial-800 text-[11px] text-amber-300 bg-amber-950/40 p-1.5 rounded">
              ⚠️ {dataPoint.anomalyNote}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm mb-6">
      {/* Chart Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-industrial-950 tracking-tight">
              Energy Consumption vs Operating Baseline
            </h2>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-mono">
              Main Meter + Sub-meters
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Learned machine operating envelope compared with real-time electrical telemetry
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-md border border-slate-200 bg-slate-50 p-0.5 text-xs font-medium">
            {(['24h', '7d', '30d'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  timeRange === range
                    ? 'bg-white text-industrial-950 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-industrial-900'
                }`}
              >
                {range === '24h' ? '24 Hours' : range === '7d' ? '7 Days' : '30 Days'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#164e3f" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#164e3f" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="baselineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64748b" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#64748b" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="time"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              unit=" kWh"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="plainline"
              wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }}
            />
            <Area
              type="monotone"
              dataKey="expectedBaselineKwh"
              name="Expected Baseline"
              stroke="#64748b"
              strokeWidth={2}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#baselineGradient)"
            />
            <Area
              type="monotone"
              dataKey="actualEnergyKwh"
              name="Actual Consumption"
              stroke="#164e3f"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#actualGradient)"
            />
            {/* Reference Dot marking the 14:00 Compressor Anomaly */}
            {timeRange === '24h' && (
              <ReferenceDot
                x="14:00"
                y={138.6}
                r={5}
                fill="#dc2626"
                stroke="#ffffff"
                strokeWidth={2}
                isFront={true}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Context Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          <span>
            <strong className="text-industrial-900">14:00 Anomaly:</strong> Compressor-01 surge (+21.1% over baseline) during Surat peak tariff window.
          </span>
        </div>
        <button
          onClick={() => {
            setSelectedMachineId('compressor-01');
            setActiveTab('machines');
          }}
          className="text-forest-700 hover:text-forest-900 font-semibold underline underline-offset-2 flex items-center gap-1"
        >
          View Compressor Diagnostic →
        </button>
      </div>
    </div>
  );
};

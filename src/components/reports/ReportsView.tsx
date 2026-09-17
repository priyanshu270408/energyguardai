import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  X
} from 'lucide-react';
import { useFactory } from '../../store/factoryContext';

export const ReportsView: React.FC = () => {
  const { settings, kpis, machines, alerts, insights } = useFactory();
  const [selectedReportType, setSelectedReportType] = useState<string>('monthly');
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  const reportOptions = [
    {
      id: 'monthly',
      title: 'Monthly Plant Energy Audit',
      description: 'Comprehensive 30-day facility assessment with baseline variances, SEC trend, and financial savings.',
      generatedDate: '17-Sep-2026',
      period: '01-Aug-2026 to 31-Aug-2026',
    },
    {
      id: 'daily-shift',
      title: 'Daily Shift Energy & Machine Log',
      description: 'Shift-level electrical consumption, machine health scores, and critical maintenance flags.',
      generatedDate: '17-Sep-2026',
      period: 'Today (Shift A & B)',
    },
    {
      id: 'carbon',
      title: 'Scope 2 Carbon Emissions Disclosure',
      description: 'Monthly greenhouse gas accounting using CEA grid emission factors and abatement roadmap.',
      generatedDate: '15-Sep-2026',
      period: 'Current Financial Quarter',
    },
    {
      id: 'machine-health',
      title: 'Compressor & Loom Condition Report',
      description: 'Detailed vibration spectra, operating thermal drift, and ISO 10816 mechanical compliance.',
      generatedDate: '17-Sep-2026',
      period: 'Last 14 Operating Days',
    },
  ];

  const activeReport = reportOptions.find(r => r.id === selectedReportType) || reportOptions[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-industrial-950">
            Plant Reports & Energy Audits
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Standardized operational audits for plant managers, owners, and energy consultants
          </p>
        </div>

        <button
          onClick={() => setIsPreviewOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Preview Active Report</span>
        </button>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportOptions.map(rep => (
          <div
            key={rep.id}
            onClick={() => {
              setSelectedReportType(rep.id);
              setIsPreviewOpen(true);
            }}
            className={`bg-white border rounded-lg p-5 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between ${
              selectedReportType === rep.id
                ? 'border-forest-700 ring-1 ring-forest-500/20'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-forest-800">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                  {rep.period}
                </span>
              </div>

              <h3 className="text-base font-bold text-industrial-950 tracking-tight mb-1">
                {rep.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {rep.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">
                Updated: {rep.generatedDate}
              </span>
              <span className="text-forest-700 font-semibold flex items-center gap-1 hover:underline">
                View & Export →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Polished Printable Report Modal / View */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-slate-300 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in duration-150">
            {/* Modal Actions Bar (No Print) */}
            <div className="p-3 bg-industrial-900 text-white flex items-center justify-between no-print">
              <div className="flex items-center gap-2 text-xs">
                <FileText className="w-4 h-4 text-forest-300" />
                <span className="font-semibold">{activeReport.title}</span>
                <span className="text-industrial-400 font-mono">({settings.factoryName})</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-forest-800 hover:bg-forest-700 text-white text-xs font-semibold transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-1 rounded text-industrial-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Content (Print-Friendly) */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-white text-industrial-900 font-sans space-y-6">
              {/* Document Letterhead */}
              <div className="border-b-2 border-industrial-900 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src="/logo.jpg"
                    alt="EnergyGuard AI"
                    className="w-14 h-14 object-contain rounded border border-slate-200 p-0.5 bg-white shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold tracking-tight text-industrial-950">
                        ENERGYGUARD AI
                      </span>
                      <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-forest-800 text-white">
                        AUDIT
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Predict Energy Waste. Optimize Production. Reduce Emissions.
                    </p>
                    <p className="text-[11px] text-forest-800 font-medium mt-0.5">
                      Cleaner Industry Brighter Tomorrow
                    </p>
                  </div>
                </div>

                <div className="text-right text-xs font-mono text-slate-600">
                  <div className="font-bold text-industrial-900 text-sm">{settings.factoryName}</div>
                  <div>Location: {settings.location}</div>
                  <div>Report Date: {activeReport.generatedDate}</div>
                  <div>Period: {activeReport.period}</div>
                </div>
              </div>

              {/* Executive Summary Metrics */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-2">
                  1. Executive Operational Metrics
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                    <span className="text-[10px] text-slate-500 block font-sans">Total Energy</span>
                    <span className="text-base font-bold text-industrial-950">
                      {kpis.todayEnergyKwh.toLocaleString()} kWh
                    </span>
                    <span className="text-[10px] text-emerald-700 block">↓ 8.4% vs baseline</span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                    <span className="text-[10px] text-slate-500 block font-sans">Specific Energy (SEC)</span>
                    <span className="text-base font-bold text-emerald-800">
                      {kpis.specificEnergyKwhPerUnit} kWh/unit
                    </span>
                    <span className="text-[10px] text-emerald-700 block">↓ 16.0% efficiency</span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                    <span className="text-[10px] text-slate-500 block font-sans">Production Output</span>
                    <span className="text-base font-bold text-industrial-950">
                      {kpis.todayProductionUnits.toLocaleString()} units
                    </span>
                    <span className="text-[10px] text-slate-500 block">Target: 3,000 units</span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                    <span className="text-[10px] text-slate-500 block font-sans">Carbon Footprint</span>
                    <span className="text-base font-bold text-industrial-950">
                      {kpis.todayCo2Tonnes} tonnes
                    </span>
                    <span className="text-[10px] text-slate-500 block">CEA factor 0.71</span>
                  </div>
                </div>
              </div>

              {/* Machine Fleet Telemetry Summary */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-2">
                  2. Asset Health & Anomaly Summary
                </h4>
                <div className="border border-slate-200 rounded overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-600">
                      <tr>
                        <th className="p-2">Asset</th>
                        <th className="p-2">Power</th>
                        <th className="p-2">Baseline</th>
                        <th className="p-2">Variance</th>
                        <th className="p-2">Temp</th>
                        <th className="p-2">Vibration</th>
                        <th className="p-2">Score</th>
                        <th className="p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                      {machines.map(m => (
                        <tr key={m.id}>
                          <td className="p-2 font-semibold font-sans text-industrial-900">{m.name}</td>
                          <td className="p-2">{m.currentPowerKw.toFixed(1)} kW</td>
                          <td className="p-2">{m.expectedBaselineKw.toFixed(1)} kW</td>
                          <td className={`p-2 font-bold ${m.deviationPct > 15 ? 'text-rose-600' : 'text-slate-700'}`}>
                            {m.deviationPct > 0 ? `+${m.deviationPct}%` : `${m.deviationPct}%`}
                          </td>
                          <td className="p-2">{m.temperatureC}°C</td>
                          <td className="p-2">{m.vibrationMmS} mm/s</td>
                          <td className="p-2 font-bold">{m.healthScore}/100</td>
                          <td className="p-2 capitalize font-sans">{m.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Actionable Recommendations */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-2">
                  3. Key Energy & Maintenance Recommendations
                </h4>
                <div className="space-y-2 text-xs">
                  {insights.map(i => (
                    <div key={i.id} className="p-3 bg-slate-50 border border-slate-200 rounded">
                      <div className="flex justify-between font-bold text-industrial-950 mb-1">
                        <span>{i.title}</span>
                        <span className="font-mono text-emerald-800">
                          Opp: ₹{i.potentialImpactMonthly.inr.toLocaleString()}/mo
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px] mb-1 leading-relaxed">
                        {i.likelyExplanation}
                      </p>
                      <div className="text-[11px] font-medium text-amber-900 bg-amber-50 px-2 py-1 rounded">
                        Action: {i.recommendedAction}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sign-off Block */}
              <div className="pt-6 border-t border-slate-200 flex justify-between text-xs text-slate-500 font-mono">
                <div>
                  <p>Certified Plant Auditor / Energy Manager</p>
                  <p className="font-bold text-industrial-900 mt-4">Rajesh Varma</p>
                  <p className="text-[10px]">Shakti Textiles Pvt. Ltd., Surat</p>
                </div>
                <div className="text-right">
                  <p>System Generated via</p>
                  <p className="font-bold text-forest-800 mt-4">ENERGYGUARD AI v1.0</p>
                  <p className="text-[10px]">Decision Support Engine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

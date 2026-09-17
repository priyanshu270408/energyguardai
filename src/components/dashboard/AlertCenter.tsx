import React from 'react';
import { AlertTriangle, Clock, ArrowRight, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { useFactory } from '../../store/factoryContext';

export const AlertCenter: React.FC = () => {
  const { alerts, resolveAlert, setSelectedMachineId, setActiveTab } = useFactory();

  const unresolvedAlerts = alerts.filter(a => !a.resolved);

  const handleAction = (alert: any) => {
    if (alert.actionTarget.startsWith('machine-')) {
      const machineId = alert.actionTarget.replace('machine-', '');
      setSelectedMachineId(machineId);
      setActiveTab('machines');
    } else if (alert.actionTarget === 'optimization') {
      setActiveTab('optimization');
    } else {
      setActiveTab('insights');
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 h-full flex flex-col">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-industrial-950 tracking-tight">
            Needs Attention
          </h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-mono font-bold">
            {unresolvedAlerts.length}
          </span>
        </div>
        <button
          onClick={() => setActiveTab('insights')}
          className="text-xs text-forest-700 hover:text-forest-900 font-semibold"
        >
          View all insights →
        </button>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto">
        {unresolvedAlerts.length === 0 ? (
          <div className="p-6 text-center text-slate-500 my-auto">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <p className="text-xs font-medium text-slate-700">No active plant anomalies</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              All machines operating within baseline thresholds.
            </p>
          </div>
        ) : (
          unresolvedAlerts.map(alert => {
            const isCritical = alert.severity === 'critical';
            const isWarning = alert.severity === 'warning';
            const isOpportunity = alert.severity === 'opportunity';

            const borderClass = isCritical
              ? 'border-l-4 border-l-rose-600 bg-rose-50/30'
              : isWarning
              ? 'border-l-4 border-l-amber-500 bg-amber-50/30'
              : 'border-l-4 border-l-sky-500 bg-sky-50/30';

            const badgeColor = isCritical
              ? 'bg-rose-100 text-rose-800'
              : isWarning
              ? 'bg-amber-100 text-amber-800'
              : 'bg-sky-100 text-sky-800';

            return (
              <div
                key={alert.id}
                className={`p-3 rounded-r-md border border-slate-200 ${borderClass} transition-all hover:shadow-xs`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded ${badgeColor}`}>
                      {alert.severity}
                    </span>
                    <span className="text-xs font-semibold text-industrial-950">
                      {alert.machineName}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono shrink-0 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {alert.timeAgo}
                  </span>
                </div>

                <p className="text-xs text-slate-700 mb-2 leading-relaxed">
                  {alert.message}
                </p>

                {alert.potentialSavingInr && (
                  <div className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded mb-2 font-mono flex items-center justify-between border border-emerald-200/60">
                    <span className="font-sans text-slate-600">Potential Opportunity:</span>
                    <span className="font-bold">
                      ₹{alert.potentialSavingInr.toLocaleString()}/day
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 text-xs">
                  <button
                    onClick={() => resolveAlert(alert.id)}
                    className="text-slate-400 hover:text-slate-600 text-[11px]"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => handleAction(alert)}
                    className="font-medium text-forest-700 hover:text-forest-900 inline-flex items-center gap-1 text-xs"
                  >
                    {alert.actionLabel} <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

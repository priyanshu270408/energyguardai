import React from 'react';
import { MachineStatus, MaintenanceRisk } from '../../types/factory';

interface StatusBadgeProps {
  status?: MachineStatus;
  risk?: MaintenanceRisk;
  label?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, risk, label, size = 'md' }) => {
  let colorClass = 'bg-slate-100 text-slate-700 border-slate-300';
  let dotClass = 'bg-slate-400';
  let displayText = label || status || risk || 'Normal';

  if (status === 'normal' || risk === 'Low') {
    colorClass = 'bg-emerald-50 text-emerald-800 border-emerald-300';
    dotClass = 'bg-emerald-500';
    displayText = label || (status === 'normal' ? 'Normal' : 'Low Risk');
  } else if (status === 'warning' || risk === 'Medium') {
    colorClass = 'bg-amber-50 text-amber-800 border-amber-300';
    dotClass = 'bg-amber-500';
    displayText = label || (status === 'warning' ? 'Warning' : 'Medium Risk');
  } else if (status === 'critical' || risk === 'High' || risk === 'Critical') {
    colorClass = 'bg-rose-50 text-rose-800 border-rose-300';
    dotClass = 'bg-rose-500 animate-pulse';
    displayText = label || (status === 'critical' ? 'Critical' : `${risk} Risk`);
  } else if (status === 'offline') {
    colorClass = 'bg-slate-100 text-slate-600 border-slate-300';
    dotClass = 'bg-slate-400';
    displayText = 'Offline';
  }

  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded border ${sizeClass} ${colorClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`}></span>
      <span className="capitalize">{displayText}</span>
    </span>
  );
};

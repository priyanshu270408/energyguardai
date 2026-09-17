import React from 'react';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  comparisonText: string;
  deltaPct?: number; // e.g. -8.4
  deltaDirection?: 'positive-is-good' | 'negative-is-good' | 'neutral';
  secondaryLabel?: string;
  secondaryValue?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  isHighlighted?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  comparisonText,
  deltaPct,
  deltaDirection = 'negative-is-good', // For energy/cost/emissions, reduction is good
  secondaryLabel,
  secondaryValue,
  icon,
  onClick,
  isHighlighted = false,
}) => {
  const isNegative = deltaPct !== undefined && deltaPct < 0;
  const isPositive = deltaPct !== undefined && deltaPct > 0;

  let deltaColorClass = 'text-slate-600 bg-slate-100';
  let DeltaIcon = Minus;

  if (deltaDirection === 'negative-is-good') {
    if (isNegative) {
      deltaColorClass = 'text-emerald-700 bg-emerald-50 border-emerald-200';
      DeltaIcon = ArrowDownRight;
    } else if (isPositive) {
      deltaColorClass = 'text-rose-700 bg-rose-50 border-rose-200';
      DeltaIcon = ArrowUpRight;
    }
  } else if (deltaDirection === 'positive-is-good') {
    if (isPositive) {
      deltaColorClass = 'text-emerald-700 bg-emerald-50 border-emerald-200';
      DeltaIcon = ArrowUpRight;
    } else if (isNegative) {
      deltaColorClass = 'text-rose-700 bg-rose-50 border-rose-200';
      DeltaIcon = ArrowDownRight;
    }
  }

  return (
    <div
      onClick={onClick}
      className={`relative bg-white border rounded-lg p-4 transition-all ${
        isHighlighted
          ? 'border-forest-600 ring-2 ring-forest-500/20 shadow-sm'
          : 'border-slate-200 hover:border-slate-300 shadow-sm'
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-medium text-slate-500 tracking-wide uppercase">{title}</span>
        {icon && <span className="text-slate-400">{icon}</span>}
      </div>

      <div className="flex items-baseline gap-1.5 mb-2.5">
        <span className="text-2xl font-bold tracking-tight text-industrial-900 font-mono">
          {value}
        </span>
        {unit && <span className="text-sm font-medium text-slate-500">{unit}</span>}
      </div>

      <div className="flex items-center justify-between gap-2 text-xs pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5 flex-wrap">
          {deltaPct !== undefined && (
            <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border text-[11px] font-semibold font-mono ${deltaColorClass}`}>
              <DeltaIcon className="w-3 h-3" />
              {Math.abs(deltaPct)}%
            </span>
          )}
          <span className="text-slate-500">{comparisonText}</span>
        </div>

        {secondaryLabel && (
          <span className="text-slate-500 text-[11px]">
            {secondaryLabel}: <span className="font-semibold text-industrial-800">{secondaryValue}</span>
          </span>
        )}
      </div>
    </div>
  );
};

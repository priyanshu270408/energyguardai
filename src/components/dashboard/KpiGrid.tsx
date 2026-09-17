import React from 'react';
import { Zap, IndianRupee, Leaf, Gauge, PackageCheck } from 'lucide-react';
import { MetricCard } from '../common/MetricCard';
import { useFactory } from '../../store/factoryContext';

export const KpiGrid: React.FC = () => {
  const { kpis, setActiveTab } = useFactory();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 mb-6">
      {/* 1. Today's Energy */}
      <MetricCard
        title="Today's Energy"
        value={kpis.todayEnergyKwh.toLocaleString()}
        unit="kWh"
        comparisonText="vs baseline (2,714)"
        deltaPct={kpis.energyDeltaPct}
        deltaDirection="negative-is-good"
        icon={<Zap className="w-4 h-4" />}
        onClick={() => setActiveTab('energy')}
      />

      {/* 2. Energy Cost */}
      <MetricCard
        title="Energy Cost"
        value={`₹${kpis.todayCostInr.toLocaleString()}`}
        comparisonText="vs yesterday (₹20,938)"
        deltaPct={kpis.costDeltaPct}
        deltaDirection="negative-is-good"
        icon={<IndianRupee className="w-4 h-4" />}
        onClick={() => setActiveTab('financial')}
      />

      {/* 3. CO₂ Emissions */}
      <MetricCard
        title="CO₂ Emissions"
        value={kpis.todayCo2Tonnes.toFixed(2)}
        unit="tonnes"
        comparisonText="vs baseline (1.95 t)"
        deltaPct={kpis.co2DeltaPct}
        deltaDirection="negative-is-good"
        secondaryLabel="Factor"
        secondaryValue="0.71"
        icon={<Leaf className="w-4 h-4" />}
        onClick={() => setActiveTab('carbon')}
      />

      {/* 4. Specific Energy Consumption */}
      <MetricCard
        title="Specific Energy"
        value={kpis.specificEnergyKwhPerUnit.toFixed(2)}
        unit="kWh/unit"
        comparisonText="vs baseline (1.00)"
        deltaPct={kpis.specificEnergyDeltaPct}
        deltaDirection="negative-is-good"
        isHighlighted={true}
        icon={<Gauge className="w-4 h-4 text-emerald-600" />}
        onClick={() => setActiveTab('energy')}
      />

      {/* 5. Production Output */}
      <MetricCard
        title="Today's Production"
        value={kpis.todayProductionUnits.toLocaleString()}
        unit="units"
        comparisonText="Target: 3,000"
        deltaPct={-1.3}
        deltaDirection="positive-is-good"
        secondaryLabel="Quality"
        secondaryValue="99.4% In-Spec"
        icon={<PackageCheck className="w-4 h-4" />}
        onClick={() => setActiveTab('optimization')}
      />
    </div>
  );
};

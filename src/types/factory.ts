export type MachineType = 'loom' | 'compressor' | 'hvac' | 'meter';

export type MachineStatus = 'normal' | 'warning' | 'critical' | 'offline';

export type MaintenanceRisk = 'Low' | 'Medium' | 'High' | 'Critical';

export type AlertSeverity = 'critical' | 'warning' | 'opportunity' | 'info';

export interface Machine {
  id: string;
  name: string;
  type: MachineType;
  area: 'Production Floor A' | 'Utilities' | 'Energy System';
  ratedPowerKw: number;
  status: MachineStatus;
  currentPowerKw: number;
  expectedBaselineKw: number;
  deviationPct: number; // e.g. +21.1%
  temperatureC: number;
  vibrationMmS: number;
  voltageV: number;
  currentA: number;
  healthScore: number; // 0 - 100
  maintenanceRisk: MaintenanceRisk;
  operatingHours: number;
  productionUnits: number;
  anomalyCount: number;
  description: string;
  makeModel: string;
  installYear: number;
}

export interface SensorReading {
  timestamp: string; // HH:mm or ISO
  timeOffsetHours: number;
  machineId: string;
  powerKw: number;
  energyKwh: number;
  voltage: number;
  current: number;
  temperature: number;
  vibration: number;
  productionUnits: number;
  status: MachineStatus;
}

export interface AlertEvidence {
  metric: string;
  change: string;
  current: string;
  baseline: string;
}

export interface FactoryAlert {
  id: string;
  severity: AlertSeverity;
  machineId: string;
  machineName: string;
  title: string;
  message: string;
  timestamp: string;
  timeAgo: string;
  potentialSavingInr?: number;
  resolved: boolean;
  actionLabel: string;
  actionTarget: string;
  evidence?: AlertEvidence[];
}

export interface AIInsight {
  id: string;
  title: string;
  category: 'anomaly' | 'waste' | 'maintenance' | 'process' | 'resolved';
  machineId: string;
  machineName: string;
  problem: string;
  evidence: {
    label: string;
    value: string;
    delta: string;
  }[];
  likelyExplanation: string;
  recommendedAction: string;
  potentialImpactDaily: {
    kwh: number;
    inr: number;
  };
  potentialImpactMonthly: {
    kwh: number;
    inr: number;
  };
  confidenceScore: number; // e.g. 88%
  status: 'active' | 'in_progress' | 'resolved';
}

export interface OptimizationScheduleItem {
  id: string;
  machineId: string;
  machineName: string;
  process: string;
  currentSlot: string;
  optimizedSlot: string;
  currentTariffType: 'Peak' | 'Off-Peak' | 'Normal';
  optimizedTariffType: 'Peak' | 'Off-Peak' | 'Normal';
  currentCostInr: number;
  optimizedCostInr: number;
  savingsInr: number;
  productionImpact: string;
  flexibility: 'High' | 'Medium' | 'Low';
}

export interface EnergyTimeSeriesPoint {
  time: string;
  hour: number;
  actualEnergyKwh: number;
  expectedBaselineKwh: number;
  productionUnits: number;
  specificEnergy: number;
  costInr: number;
  isAnomaly?: boolean;
  anomalyNote?: string;
  machineBreakdown: {
    loom01: number;
    loom02: number;
    loom03: number;
    compressor01: number;
    hvac01: number;
  };
}

export interface FactoryKPIs {
  todayEnergyKwh: number;
  baselineEnergyKwh: number;
  energyDeltaPct: number;
  todayCostInr: number;
  yesterdayCostInr: number;
  costDeltaPct: number;
  todayCo2Tonnes: number;
  co2BaselineTonnes: number;
  co2DeltaPct: number;
  specificEnergyKwhPerUnit: number;
  specificEnergyBaseline: number;
  specificEnergyDeltaPct: number;
  todayProductionUnits: number;
  targetProductionUnits: number;
  dataQuality: 'Good' | 'Moderate' | 'Sensor Degraded';
  lastUpdatedSecondsAgo: number;
  systemsOnline: boolean;
}

export interface FactorySettings {
  factoryName: string;
  location: string;
  industry: string;
  normalTariffInr: number; // ₹7.50 / kWh
  peakTariffInr: number;   // ₹11.50 / kWh
  offPeakTariffInr: number;// ₹6.20 / kWh
  gridEmissionFactorKgPerKwh: number; // 0.71 kg CO2/kWh (Indian Central Electricity Authority avg)
  alertDeviationThresholdPct: number; // 15%
  dataRefreshSeconds: number;
  currencySymbol: string;
}

export interface DemoStep {
  stepNumber: number;
  title: string;
  timestamp: string;
  description: string;
  narratorScript: string;
  activeView: string;
  highlightedMachineId?: string;
  keyMetricHighlight?: string;
}

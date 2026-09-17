import { EnergyTimeSeriesPoint, FactoryAlert, AIInsight, OptimizationScheduleItem } from '../types/factory';

export const HOURLY_ENERGY_SERIES_24H: EnergyTimeSeriesPoint[] = [
  { time: '00:00', hour: 0, actualEnergyKwh: 68.2, expectedBaselineKwh: 71.0, productionUnits: 95, specificEnergy: 0.72, costInr: 422.8, machineBreakdown: { loom01: 18.2, loom02: 18.0, loom03: 18.0, compressor01: 8.0, hvac01: 6.0 } },
  { time: '02:00', hour: 2, actualEnergyKwh: 69.4, expectedBaselineKwh: 70.5, productionUnits: 98, specificEnergy: 0.71, costInr: 430.3, machineBreakdown: { loom01: 18.4, loom02: 18.5, loom03: 18.2, compressor01: 8.1, hvac01: 6.2 } },
  { time: '04:00', hour: 4, actualEnergyKwh: 71.1, expectedBaselineKwh: 72.0, productionUnits: 102, specificEnergy: 0.70, costInr: 440.8, machineBreakdown: { loom01: 19.0, loom02: 19.2, loom03: 18.8, compressor01: 8.0, hvac01: 6.1 } },
  { time: '06:00', hour: 6, actualEnergyKwh: 88.5, expectedBaselineKwh: 89.0, productionUnits: 118, specificEnergy: 0.75, costInr: 699.2, machineBreakdown: { loom01: 21.0, loom02: 21.2, loom03: 20.8, compressor01: 15.0, hvac01: 10.5 } },
  { time: '08:00', hour: 8, actualEnergyKwh: 114.2, expectedBaselineKwh: 116.0, productionUnits: 145, specificEnergy: 0.79, costInr: 902.2, machineBreakdown: { loom01: 21.4, loom02: 22.0, loom03: 21.8, compressor01: 30.5, hvac01: 18.5 } },
  { time: '10:00', hour: 10, actualEnergyKwh: 122.8, expectedBaselineKwh: 125.0, productionUnits: 155, specificEnergy: 0.79, costInr: 970.1, machineBreakdown: { loom01: 21.6, loom02: 22.8, loom03: 22.0, compressor01: 33.2, hvac01: 23.2 } },
  { time: '12:00', hour: 12, actualEnergyKwh: 118.4, expectedBaselineKwh: 122.0, productionUnits: 150, specificEnergy: 0.79, costInr: 935.4, machineBreakdown: { loom01: 21.2, loom02: 22.1, loom03: 21.9, compressor01: 31.8, hvac01: 21.4 } },
  { time: '13:00', hour: 13, actualEnergyKwh: 119.5, expectedBaselineKwh: 120.0, productionUnits: 148, specificEnergy: 0.81, costInr: 944.1, machineBreakdown: { loom01: 21.3, loom02: 22.4, loom03: 22.0, compressor01: 32.1, hvac01: 21.7 } },
  {
    time: '14:00',
    hour: 14,
    actualEnergyKwh: 138.6,
    expectedBaselineKwh: 118.0,
    productionUnits: 152,
    specificEnergy: 0.91,
    costInr: 1593.9, // Peak tariff ₹11.50
    isAnomaly: true,
    anomalyNote: 'Compressor-01 unexpected power surge (+21.1% above operating baseline)',
    machineBreakdown: { loom01: 21.4, loom02: 26.8, loom03: 22.1, compressor01: 43.8, hvac01: 24.5 }
  },
  {
    time: '15:00',
    hour: 15,
    actualEnergyKwh: 141.2,
    expectedBaselineKwh: 119.5,
    productionUnits: 151,
    specificEnergy: 0.93,
    costInr: 1623.8, // Peak tariff
    isAnomaly: true,
    anomalyNote: 'Elevated intake restriction on Compressor-01 with stable output',
    machineBreakdown: { loom01: 21.5, loom02: 27.0, loom03: 22.0, compressor01: 45.2, hvac01: 25.5 }
  },
  { time: '16:00', hour: 16, actualEnergyKwh: 136.0, expectedBaselineKwh: 119.0, productionUnits: 150, specificEnergy: 0.91, costInr: 1564.0, isAnomaly: true, anomalyNote: 'Ongoing compressor pneumatic cycle inefficiency', machineBreakdown: { loom01: 21.4, loom02: 26.5, loom03: 22.1, compressor01: 41.5, hvac01: 24.5 } },
  { time: '18:00', hour: 18, actualEnergyKwh: 115.0, expectedBaselineKwh: 114.0, productionUnits: 142, specificEnergy: 0.81, costInr: 908.5, machineBreakdown: { loom01: 21.0, loom02: 24.2, loom03: 21.8, compressor01: 31.0, hvac01: 17.0 } },
  { time: '20:00', hour: 20, actualEnergyKwh: 98.4, expectedBaselineKwh: 102.0, productionUnits: 125, specificEnergy: 0.79, costInr: 610.1, machineBreakdown: { loom01: 20.5, loom02: 22.1, loom03: 21.2, compressor01: 22.4, hvac01: 12.2 } },
  { time: '22:00', hour: 22, actualEnergyKwh: 76.2, expectedBaselineKwh: 78.0, productionUnits: 100, specificEnergy: 0.76, costInr: 472.4, machineBreakdown: { loom01: 19.2, loom02: 19.8, loom03: 19.2, compressor01: 10.5, hvac01: 7.5 } },
];

export const INITIAL_ALERTS: FactoryAlert[] = [
  {
    id: 'alt-001',
    severity: 'critical',
    machineId: 'compressor-01',
    machineName: 'Compressor-01',
    title: 'Excess Energy Consumption (+21% vs Baseline)',
    message: 'Compressor-01 is consuming 38.4 kW versus expected baseline of 31.7 kW (+21.1%) while plant air demand remains steady.',
    timestamp: '14:02:18',
    timeAgo: '2 minutes ago',
    potentialSavingInr: 336,
    resolved: false,
    actionLabel: 'View Analysis',
    actionTarget: 'machine-compressor-01',
    evidence: [
      { metric: 'Active Power', change: '+21.1%', current: '38.4 kW', baseline: '31.7 kW' },
      { metric: 'Motor Temp', change: '+9.0 °C', current: '78.0 °C', baseline: '69.0 °C' },
      { metric: 'Vibration RMS', change: '+38.5%', current: '7.2 mm/s', baseline: '5.2 mm/s' },
      { metric: 'Production Rate', change: '+0.8%', current: '152 units/h', baseline: '151 units/h' }
    ]
  },
  {
    id: 'alt-002',
    severity: 'warning',
    machineId: 'loom-02',
    machineName: 'Loom-02',
    title: 'Vibration Acceleration Drift Detected',
    message: 'Drive-end bearing vibration has steadily increased for 3 consecutive hours (5.2 mm/s vs ISO limit 4.5 mm/s).',
    timestamp: '13:46:00',
    timeAgo: '18 minutes ago',
    potentialSavingInr: 120,
    resolved: false,
    actionLabel: 'Inspect Machine',
    actionTarget: 'machine-loom-02',
    evidence: [
      { metric: 'Vibration RMS', change: '+44.4%', current: '5.2 mm/s', baseline: '3.6 mm/s' },
      { metric: 'Motor Temp', change: '+6.0 °C', current: '61.0 °C', baseline: '55.0 °C' },
      { metric: 'Power Deviation', change: '+12.4%', current: '26.8 kW', baseline: '23.8 kW' }
    ]
  },
  {
    id: 'alt-003',
    severity: 'opportunity',
    machineId: 'hvac-01',
    machineName: 'HVAC-01',
    title: 'Schedule & Setpoint Optimization Detected',
    message: 'Ambient outdoor wet-bulb temp dropped to 24°C in Surat. Chiller chilled-water setpoint can be reset by +1.5°C without compromising weaving humidity specs.',
    timestamp: '12:30:00',
    timeAgo: '1.5 hours ago',
    potentialSavingInr: 2400,
    resolved: false,
    actionLabel: 'View Opportunity',
    actionTarget: 'optimization',
    evidence: [
      { metric: 'Chilled Water Delta', change: '-1.5 °C setpoint', current: '7.0 °C', baseline: '8.5 °C rec.' },
      { metric: 'Auxiliary Power', change: '-8.2%', current: '24.5 kW', baseline: '22.5 kW' }
    ]
  }
];

export const INITIAL_AI_INSIGHTS: AIInsight[] = [
  {
    id: 'ins-001',
    title: 'Compressor-01 Operating Above Baseline',
    category: 'anomaly',
    machineId: 'compressor-01',
    machineName: 'Compressor-01',
    problem: 'Compressor-01 is consuming 21% more energy than expected for its current production load.',
    evidence: [
      { label: 'Active Power', value: '38.4 kW', delta: '+21%' },
      { label: 'Operating Temp', value: '78.0 °C', delta: '+9 °C' },
      { label: 'Vibration (RMS)', value: '7.2 mm/s', delta: '+38%' },
      { label: 'Production Output', value: '152 units/h', delta: '+1%' },
    ],
    likelyExplanation: 'The combination of elevated power (+21%), temperature (+9°C) and vibration (+38%) with nearly unchanged production may indicate reduced compressor volumetric efficiency, restricted intake filtration, or pneumatic distribution leakage in the weaving shed line.',
    recommendedAction: 'Inspect compressor air intake filter, verify interstage pressure ratio, check motor drive belts, and scan manifold couplings for compressed-air leakage.',
    potentialImpactDaily: {
      kwh: 42,
      inr: 336,
    },
    potentialImpactMonthly: {
      kwh: 1260,
      inr: 10080,
    },
    confidenceScore: 88,
    status: 'active'
  },
  {
    id: 'ins-002',
    title: 'Loom-02 Bearing Mechanical Degradation Warning',
    category: 'maintenance',
    machineId: 'loom-02',
    machineName: 'Loom-02',
    problem: 'Loom-02 drive-end shaft vibration exceeds ISO 10816 class II threshold (5.2 mm/s).',
    evidence: [
      { label: 'Vibration Velocity', value: '5.2 mm/s', delta: '+44%' },
      { label: 'Bearing Housing Temp', value: '61.0 °C', delta: '+6 °C' },
      { label: 'Electrical Power', value: '26.8 kW', delta: '+12.4%' },
    ],
    likelyExplanation: 'Persistent harmonic vibration signatures combined with mild temperature rise indicate early stage inner-raceway fatigue or inadequate lubrication on the main crankshaft bearings.',
    recommendedAction: 'Apply high-temperature lithium-complex grease during the shift changeover. If vibration remains >5.0 mm/s, schedule bearing replacement before the weekend run.',
    potentialImpactDaily: {
      kwh: 15,
      inr: 120,
    },
    potentialImpactMonthly: {
      kwh: 450,
      inr: 3600,
    },
    confidenceScore: 84,
    status: 'active'
  },
  {
    id: 'ins-003',
    title: 'Time-of-Day (ToD) Tariff Load Shifting Opportunity',
    category: 'waste',
    machineId: 'compressor-01',
    machineName: 'Compressed Air System',
    problem: 'Compressor receiver charging and non-critical textile yarn sizing runs overlap peak tariff window (14:00 - 18:00).',
    evidence: [
      { label: 'Peak Tariff Rate', value: '₹11.50 / kWh', delta: '+45% vs normal' },
      { label: 'Off-Peak Tariff Rate', value: '₹6.20 / kWh', delta: '-21% vs normal' },
      { label: 'Flexible Utility Load', value: '35 kW', delta: 'Shiftable' },
    ],
    likelyExplanation: 'Operating energy-intensive air pressure build-up during peak hours incurs the highest utility tariff with no benefit to overall throughput.',
    recommendedAction: 'Shift pre-charging cycles and non-continuous auxiliary runs to off-peak night shift (20:00 - 22:00) using automated timer or SOP shift instructions.',
    potentialImpactDaily: {
      kwh: 0,
      inr: 3700,
    },
    potentialImpactMonthly: {
      kwh: 0,
      inr: 96200,
    },
    confidenceScore: 92,
    status: 'active'
  }
];

export const OPTIMIZATION_SCHEDULES: OptimizationScheduleItem[] = [
  {
    id: 'opt-01',
    machineId: 'compressor-01',
    machineName: 'Compressor-01 Receiver Charge',
    process: 'Auxiliary High-Pressure Air Reservoir Charging',
    currentSlot: '14:00 – 16:00',
    optimizedSlot: '20:00 – 22:00',
    currentTariffType: 'Peak',
    optimizedTariffType: 'Off-Peak',
    currentCostInr: 42600,
    optimizedCostInr: 38900,
    savingsInr: 3700,
    productionImpact: 'Zero impact (Yarn tensioners utilize 1000L receiver buffer)',
    flexibility: 'High'
  },
  {
    id: 'opt-02',
    machineId: 'hvac-01',
    machineName: 'HVAC-01 Pre-Cooling Cycle',
    process: 'Thermal Mass Weaving Shed Pre-cooling',
    currentSlot: '13:00 – 15:00',
    optimizedSlot: '05:00 – 07:00',
    currentTariffType: 'Peak',
    optimizedTariffType: 'Off-Peak',
    currentCostInr: 18400,
    optimizedCostInr: 15900,
    savingsInr: 2500,
    productionImpact: 'Maintains required 65% relative humidity and 28°C dry bulb',
    flexibility: 'Medium'
  }
];

export const SAVINGS_OPPORTUNITIES = [
  { category: 'Compressed Air Inefficiency & Leaks', monthlyInr: 12400, annualInr: 148800, percentage: 41, color: '#dc2626', icon: 'Wind' },
  { category: 'HVAC Setpoint & Schedule Optimization', monthlyInr: 7800, annualInr: 93600, percentage: 26, color: '#d97706', icon: 'Thermometer' },
  { category: 'Time-of-Day (ToD) Load Shifting', monthlyInr: 5200, annualInr: 62400, percentage: 17, color: '#0284c7', icon: 'Clock' },
  { category: 'Loom Motor Lubrication & IE3 Upgrades', monthlyInr: 4800, annualInr: 57600, percentage: 16, color: '#059669', icon: 'Gauge' }
];

export const TOP_ENERGY_CONSUMERS = [
  { name: 'Compressor-01', sharePct: 31, powerKw: 38.4, area: 'Utilities', color: '#164e3f' },
  { name: 'HVAC-01', sharePct: 19, powerKw: 24.5, area: 'Utilities', color: '#2d6a4f' },
  { name: 'Loom-02', sharePct: 17, powerKw: 26.8, area: 'Production Floor A', color: '#40916c' },
  { name: 'Loom-01', sharePct: 16, powerKw: 21.4, area: 'Production Floor A', color: '#52b788' },
  { name: 'Loom-03', sharePct: 17, powerKw: 22.1, area: 'Production Floor A', color: '#74c69d' }
];

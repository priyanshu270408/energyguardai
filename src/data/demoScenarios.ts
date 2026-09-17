import { DemoStep } from '../types/factory';

export const DEMO_SCENARIO_STEPS: DemoStep[] = [
  {
    stepNumber: 1,
    title: 'Normal Plant Operation',
    timestamp: '09:00 AM',
    description: 'All factory systems operating within baseline parameters. Baseline power consumption is ~116 kW.',
    narratorScript: 'This is Shakti Textiles, our simulated SME manufacturing plant in Surat, Gujarat. All 5 machines are online and operating smoothly within expected baseline limits.',
    activeView: 'overview',
    keyMetricHighlight: 'Specific Energy: 0.84 kWh/unit (Target: 1.00)'
  },
  {
    stepNumber: 2,
    title: 'Compressor Load Deviation Begins',
    timestamp: '13:30 PM',
    description: 'Compressor-01 power draw creeps upward from 31.7 kW baseline to 38.4 kW (+21.1%) due to pneumatic line pressure drop.',
    narratorScript: 'At 13:30, Compressor-01 begins drawing excessive current. While baseline is 31.7 kW, real-time demand reaches 38.4 kW—a 21% spike without any increase in yarn production.',
    activeView: 'overview',
    highlightedMachineId: 'compressor-01',
    keyMetricHighlight: 'Compressor-01 Deviation: +21.1%'
  },
  {
    stepNumber: 3,
    title: 'Thermal & Vibration Signature Rise',
    timestamp: '13:45 PM',
    description: 'Multivariate sensor correlation: Temperature rises to 78°C (+9°C delta) and drive vibration accelerates to 7.2 mm/s.',
    narratorScript: 'EnergyGuard does not look at power in isolation. Temperature jumps by 9°C to 78°C and vibration climbs to 7.2 mm/s, indicating mechanical or intake distress.',
    activeView: 'machines',
    highlightedMachineId: 'compressor-01',
    keyMetricHighlight: 'Temp: 78°C (↑9°C) | Vibration: 7.2 mm/s (↑38%)'
  },
  {
    stepNumber: 4,
    title: 'AI Anomaly Detection Triggered',
    timestamp: '14:00 PM',
    description: 'Isolation forest & baseline variance model flags multivariate anomaly with 88% confidence score.',
    narratorScript: 'EnergyGuard identifies this pattern as a high-severity anomaly. Production remains flat at 152 units/hour, but energy intensity has surged.',
    activeView: 'overview',
    highlightedMachineId: 'compressor-01',
    keyMetricHighlight: 'Anomaly Confidence: 88% | Severity: High'
  },
  {
    stepNumber: 5,
    title: 'Actionable Alert Logged',
    timestamp: '14:02 PM',
    description: 'Critical alert dispatched to plant manager with quantified daily loss rate: ₹336/day (42 kWh/day).',
    narratorScript: 'Notice the alert center. It does not just send a raw alarm—it quantifies the financial bleed: ₹336 per day in wasted electricity.',
    activeView: 'overview',
    keyMetricHighlight: 'Alert: Compressor-01 +21% Above Baseline'
  },
  {
    stepNumber: 6,
    title: 'AI Root-Cause Explanation',
    timestamp: '14:05 PM',
    description: 'Probabilistic diagnostic: Pattern indicates reduced compressor efficiency or manifold air leakage rather than process demand.',
    narratorScript: 'Clicking into the AI Insight, the system provides a calm, technically credible explanation without fake 100% certainty. It attributes the issue to intake restriction or air leakage.',
    activeView: 'insights',
    keyMetricHighlight: 'Insight: Compressed-Air Volumetric Degradation'
  },
  {
    stepNumber: 7,
    title: 'Preventive Maintenance Recommendation',
    timestamp: '14:10 PM',
    description: 'Actionable maintenance checklist: Inspect intake filter, test interstage pressure, examine manifold couplings.',
    narratorScript: 'Instead of an expensive Industry 4.0 consulting fee, the SME floor supervisor receives a clear 3-point checklist to inspect before catastrophic failure.',
    activeView: 'insights',
    keyMetricHighlight: 'Action: Inspect intake filter & air lines'
  },
  {
    stepNumber: 8,
    title: 'Tariff-Aware Optimization Identified',
    timestamp: '16:00 PM',
    description: 'Production & Energy Optimization identifies peak tariff window (14:00-18:00 @ ₹11.50/kWh) vs off-peak window (20:00-22:00 @ ₹6.20/kWh).',
    narratorScript: 'Next, EnergyGuard analyzes production schedules against Gujarat Time-of-Day tariffs. Shifting flexible auxiliary receiver charging from 14:00 peak to 20:00 off-peak cuts costs immediately.',
    activeView: 'optimization',
    keyMetricHighlight: 'Peak Tariff (₹11.50) vs Off-Peak (₹6.20)'
  },
  {
    stepNumber: 9,
    title: 'Financial Savings Quantified',
    timestamp: '16:15 PM',
    description: 'Load shifting saves ₹3,700/day. Cumulative plant energy waste reduction identifies ₹30,200/month opportunity with 3-month payback.',
    narratorScript: 'Here is the business value for the SME owner: ₹3,700 saved every single day on scheduling, and an identified ₹30,200 monthly opportunity with a 3-month payback.',
    activeView: 'financial',
    keyMetricHighlight: 'Identified Savings: ₹30,200 / month'
  },
  {
    stepNumber: 10,
    title: 'Optimized State: 16% Energy Intensity Drop',
    timestamp: '18:00 PM',
    description: 'Specific Energy Consumption drops from 1.00 baseline to 0.84 kWh/unit (-16%) while maintaining 2,960/3,000 unit production output.',
    narratorScript: 'The loop is closed: Monitor, Understand, Act, and Measure. Energy intensity drops by 16%, carbon emissions fall by 11.8%, and production throughput is 100% preserved.',
    activeView: 'overview',
    keyMetricHighlight: 'SEC: 0.84 kWh/unit (↓16% vs Baseline)'
  }
];

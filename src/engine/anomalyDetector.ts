import { Machine, FactoryAlert, AlertSeverity } from '../types/factory';

export interface AnomalyReport {
  machineId: string;
  hasAnomaly: boolean;
  severity: AlertSeverity;
  confidenceScore: number; // 0-100%
  findings: string[];
}

export function evaluateMachineAnomaly(machine: Machine, plantAirDemandStable = true): AnomalyReport {
  const findings: string[] = [];
  let severity: AlertSeverity = 'info';
  let hasAnomaly = false;
  let confidence = 75;

  // 1. Power Deviation Check
  if (machine.deviationPct > 15) {
    hasAnomaly = true;
    severity = 'critical';
    confidence += 10;
    findings.push(`Power draw is +${machine.deviationPct}% above baseline without corresponding work increase.`);
  } else if (machine.deviationPct > 8) {
    hasAnomaly = true;
    severity = 'warning';
    confidence += 5;
    findings.push(`Moderate positive deviation of +${machine.deviationPct}% noted.`);
  }

  // 2. Vibration Check (ISO 10816)
  if (machine.vibrationMmS > 6.0) {
    hasAnomaly = true;
    severity = 'critical';
    confidence += 5;
    findings.push(`High vibration level (${machine.vibrationMmS} mm/s) exceeds recommended ISO threshold.`);
  } else if (machine.vibrationMmS > 4.5) {
    if (severity !== 'critical') severity = 'warning';
    hasAnomaly = true;
    findings.push(`Elevated vibration (${machine.vibrationMmS} mm/s) indicates potential mechanical wear or imbalance.`);
  }

  // 3. Thermal Check
  if (machine.temperatureC > 75) {
    hasAnomaly = true;
    severity = 'critical';
    findings.push(`Elevated operating temperature (${machine.temperatureC}°C) suggests cooling restriction or motor overloading.`);
  } else if (machine.temperatureC > 60) {
    if (severity !== 'critical') severity = 'warning';
    findings.push(`Temperature at ${machine.temperatureC}°C is above typical 55°C operating baseline.`);
  }

  return {
    machineId: machine.id,
    hasAnomaly,
    severity,
    confidenceScore: Math.min(94, Math.max(60, confidence)),
    findings,
  };
}

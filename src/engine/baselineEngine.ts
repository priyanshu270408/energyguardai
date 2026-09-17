import { Machine, MaintenanceRisk } from '../types/factory';

/**
 * Baseline engine for calculating expected consumption, variances,
 * specific energy consumption (SEC), cost, and carbon emissions.
 */

export function calculateDeviationPct(actual: number, baseline: number): number {
  if (baseline === 0) return 0;
  const dev = ((actual - baseline) / baseline) * 100;
  return Number(dev.toFixed(1));
}

export function calculateSpecificEnergyConsumption(totalKwh: number, productionUnits: number): number {
  if (productionUnits <= 0) return 0;
  return Number((totalKwh / productionUnits).toFixed(2));
}

export function calculateCarbonEmissionsTonnes(kwh: number, emissionFactorKgPerKwh = 0.71): number {
  const kg = kwh * emissionFactorKgPerKwh;
  return Number((kg / 1000).toFixed(2));
}

export function getTariffForHour(hour: number, normal = 7.90, peak = 11.50, offPeak = 6.20): { rate: number; type: 'Peak' | 'Off-Peak' | 'Normal' } {
  // Surat/Gujarat Industrial ToD Tariff:
  // Peak: 14:00 - 18:00
  // Off-Peak: 20:00 - 06:00
  // Normal: 06:00 - 14:00 and 18:00 - 20:00
  if (hour >= 14 && hour < 18) {
    return { rate: peak, type: 'Peak' };
  } else if (hour >= 20 || hour < 6) {
    return { rate: offPeak, type: 'Off-Peak' };
  }
  return { rate: normal, type: 'Normal' };
}

export function calculateHealthScore(
  temperatureC: number,
  vibrationMmS: number,
  deviationPct: number,
  operatingHours: number
): { healthScore: number; risk: MaintenanceRisk } {
  let score = 100;

  // Temperature penalties
  if (temperatureC > 75) {
    score -= (temperatureC - 75) * 2.5;
  } else if (temperatureC > 65) {
    score -= (temperatureC - 65) * 1.0;
  }

  // Vibration penalties (ISO 10816 baseline standard)
  if (vibrationMmS > 7.0) {
    score -= 22;
  } else if (vibrationMmS > 4.5) {
    score -= (vibrationMmS - 4.5) * 6;
  }

  // Energy deviation penalty
  const absDev = Math.abs(deviationPct);
  if (absDev > 20) {
    score -= 15;
  } else if (absDev > 10) {
    score -= 7;
  }

  // Aging factor (gentle decay past 6000 hours)
  if (operatingHours > 6000) {
    score -= Math.min(8, (operatingHours - 6000) / 500);
  }

  const finalScore = Math.max(10, Math.min(100, Math.round(score)));

  let risk: MaintenanceRisk = 'Low';
  if (finalScore < 70) {
    risk = 'High';
  } else if (finalScore < 80) {
    risk = 'Medium';
  }
  if (finalScore < 50) {
    risk = 'Critical';
  }

  return { healthScore: finalScore, risk };
}

export function calculateSimplePaybackMonths(implementationCostInr: number, monthlySavingsInr: number): number {
  if (monthlySavingsInr <= 0) return 0;
  return Number((implementationCostInr / monthlySavingsInr).toFixed(1));
}

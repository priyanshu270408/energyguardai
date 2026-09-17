import { Machine, AIInsight } from '../types/factory';

export interface RecommendationOutput {
  title: string;
  reason: string;
  action: string;
  estimatedDailySavingInr: number;
  estimatedMonthlySavingInr: number;
  confidencePct: number;
}

export function generateMachineRecommendations(machine: Machine): RecommendationOutput[] {
  const recommendations: RecommendationOutput[] = [];

  // Rule 1: High Energy Deviation with Flat Output
  if (machine.deviationPct > 15) {
    if (machine.type === 'compressor') {
      recommendations.push({
        title: 'Inspect Intake Filter & Pneumatic Line Losses',
        reason: `${machine.name} is consuming ${machine.deviationPct}% more energy than operating baseline while air delivery demand is unchanged.`,
        action: 'Clean/replace inlet air filters, check minimum pressure valve, and conduct acoustic ultrasonic sweep for line leaks along Floor A distribution.',
        estimatedDailySavingInr: 336,
        estimatedMonthlySavingInr: 10080,
        confidencePct: 88,
      });
    } else {
      recommendations.push({
        title: 'Check Electrical Sump & Motor Loading',
        reason: `${machine.name} power consumption is +${machine.deviationPct}% above learned baseline without corresponding output change.`,
        action: 'Check three-phase current balance and mechanical drive drag.',
        estimatedDailySavingInr: 150,
        estimatedMonthlySavingInr: 4500,
        confidencePct: 82,
      });
    }
  }

  // Rule 2: Vibration Exceeding Standard
  if (machine.vibrationMmS > 5.0) {
    recommendations.push({
      title: 'Schedule Bearing Lubrication & Alignment Check',
      reason: `Vibration velocity reached ${machine.vibrationMmS} mm/s (exceeding ISO 10816 threshold of 4.5 mm/s).`,
      action: 'Apply EP2 synthetic grease during the next shift break. Check drive belt tension and shaft coupling alignment.',
      estimatedDailySavingInr: 120,
      estimatedMonthlySavingInr: 3600,
      confidencePct: 85,
    });
  }

  // Rule 3: High Operating Temperature
  if (machine.temperatureC > 72) {
    recommendations.push({
      title: 'Inspect Heat Exchanger / Radiator Fins',
      reason: `Operating temperature is ${machine.temperatureC}°C, which is +${machine.temperatureC - 65}°C above nominal operating band.`,
      action: 'Blow down cooling radiator with low-pressure air and verify fan motor operation.',
      estimatedDailySavingInr: 90,
      estimatedMonthlySavingInr: 2700,
      confidencePct: 80,
    });
  }

  return recommendations;
}

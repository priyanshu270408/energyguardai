import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Machine,
  FactorySettings,
  FactoryAlert,
  AIInsight,
  FactoryKPIs,
  EnergyTimeSeriesPoint,
  DemoStep
} from '../types/factory';
import { INITIAL_MACHINES, DEFAULT_FACTORY_SETTINGS } from '../data/factoryConfig';
import {
  HOURLY_ENERGY_SERIES_24H,
  INITIAL_ALERTS,
  INITIAL_AI_INSIGHTS,
} from '../data/baselineProfiles';
import { DEMO_SCENARIO_STEPS } from '../data/demoScenarios';
import { calculateDeviationPct, calculateHealthScore, calculateSpecificEnergyConsumption } from '../engine/baselineEngine';

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  relatedAction?: {
    label: string;
    targetTab: string;
  };
}

interface FactoryContextType {
  settings: FactorySettings;
  updateSettings: (newSettings: Partial<FactorySettings>) => void;
  machines: Machine[];
  kpis: FactoryKPIs;
  timeSeries: EnergyTimeSeriesPoint[];
  alerts: FactoryAlert[];
  insights: AIInsight[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedMachineId: string | null;
  setSelectedMachineId: (id: string | null) => void;
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  // Demo Mode
  isDemoMode: boolean;
  currentDemoStep: number; // 0 to 9
  demoSteps: DemoStep[];
  startDemoScenario: () => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  jumpToDemoStep: (stepIndex: number) => void;
  exitDemoMode: () => void;
  // Alerts & Actions
  resolveAlert: (alertId: string) => void;
  updateInsightStatus: (insightId: string, status: 'active' | 'in_progress' | 'resolved') => void;
  // Copilot
  copilotMessages: CopilotMessage[];
  sendCopilotMessage: (question: string) => void;
}

const FactoryContext = createContext<FactoryContextType | undefined>(undefined);

export const FactoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<FactorySettings>(DEFAULT_FACTORY_SETTINGS);
  const [machines, setMachines] = useState<Machine[]>(INITIAL_MACHINES);
  const [timeSeries, setTimeSeries] = useState<EnergyTimeSeriesPoint[]>(HOURLY_ENERGY_SERIES_24H);
  const [alerts, setAlerts] = useState<FactoryAlert[]>(INITIAL_ALERTS);
  const [insights, setInsights] = useState<AIInsight[]>(INITIAL_AI_INSIGHTS);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(null);
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Demo Mode State
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [currentDemoStep, setCurrentDemoStep] = useState<number>(0);

  // Seconds elapsed since last live data pulse
  const [lastUpdatedSecondsAgo, setLastUpdatedSecondsAgo] = useState<number>(12);

  // KPIs
  const [kpis, setKpis] = useState<FactoryKPIs>({
    todayEnergyKwh: 2486,
    baselineEnergyKwh: 2714,
    energyDeltaPct: -8.4,
    todayCostInr: 19640,
    yesterdayCostInr: 20938,
    costDeltaPct: -6.2,
    todayCo2Tonnes: 1.72,
    co2BaselineTonnes: 1.95,
    co2DeltaPct: -11.8,
    specificEnergyKwhPerUnit: 0.84,
    specificEnergyBaseline: 1.00,
    specificEnergyDeltaPct: -16.0,
    todayProductionUnits: 2960,
    targetProductionUnits: 3000,
    dataQuality: 'Good',
    lastUpdatedSecondsAgo: 12,
    systemsOnline: true,
  });

  // Copilot messages
  const [copilotMessages, setCopilotMessages] = useState<CopilotMessage[]>([
    {
      id: 'msg-init-1',
      sender: 'assistant',
      text: "Namaste! I am your EnergyGuard Copilot for Shakti Textiles. I monitor real-time sensor streams across your 3 looms, compressor, and chiller. Ask me about current anomalies, energy spikes, or tariff opportunities.",
      timestamp: '09:00 AM'
    }
  ]);

  // Subtle live sensor fluctuation simulation (every 5 seconds) when not manually overridden
  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdatedSecondsAgo(prev => (prev > 25 ? 2 : prev + 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Micro-fluctuation sensor tick every 6 seconds to show genuine living telemetry
  useEffect(() => {
    if (isDemoMode) return; // Do not drift during deterministic demo mode

    const interval = setInterval(() => {
      setMachines(prevMachines =>
        prevMachines.map(m => {
          // Slight micro-noise on power (+/- 0.4%)
          const noiseFactor = 1 + (Math.random() * 0.008 - 0.004);
          const newPower = Number((m.currentPowerKw * noiseFactor).toFixed(1));
          const dev = calculateDeviationPct(newPower, m.expectedBaselineKw);
          const { healthScore, risk } = calculateHealthScore(m.temperatureC, m.vibrationMmS, dev, m.operatingHours);

          return {
            ...m,
            currentPowerKw: newPower,
            deviationPct: dev,
            healthScore,
            maintenanceRisk: risk,
          };
        })
      );
      setLastUpdatedSecondsAgo(1);
    }, 6000);

    return () => clearInterval(interval);
  }, [isDemoMode]);

  const updateSettings = useCallback((newSettings: Partial<FactorySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const resolveAlert = useCallback((alertId: string) => {
    setAlerts(prev =>
      prev.map(a => (a.id === alertId ? { ...a, resolved: true } : a))
    );
  }, []);

  const updateInsightStatus = useCallback((insightId: string, status: 'active' | 'in_progress' | 'resolved') => {
    setInsights(prev =>
      prev.map(i => (i.id === insightId ? { ...i, status } : i))
    );
  }, []);

  // Demo step synchronization
  const applyDemoStep = useCallback((stepIdx: number) => {
    const step = DEMO_SCENARIO_STEPS[stepIdx];
    if (!step) return;

    setCurrentDemoStep(stepIdx);
    setActiveTab(step.activeView);
    if (step.highlightedMachineId) {
      setSelectedMachineId(step.highlightedMachineId);
    } else {
      setSelectedMachineId(null);
    }

    // Step-specific simulated adjustments
    if (stepIdx === 0) {
      // Step 1: Normal
      setMachines(prev =>
        prev.map(m => (m.id === 'compressor-01' ? { ...m, currentPowerKw: 31.9, deviationPct: 0.6, temperatureC: 69, vibrationMmS: 5.2, healthScore: 89, status: 'normal', maintenanceRisk: 'Low' } : m))
      );
    } else if (stepIdx >= 1 && stepIdx <= 7) {
      // Steps 2-8: Compressor Anomaly active
      setMachines(prev =>
        prev.map(m => (m.id === 'compressor-01' ? { ...m, currentPowerKw: 38.4, deviationPct: 21.1, temperatureC: 78, vibrationMmS: 7.2, healthScore: 68, status: 'critical', maintenanceRisk: 'High' } : m))
      );
    } else if (stepIdx >= 8) {
      // Steps 9-10: Post-optimization
      setMachines(prev =>
        prev.map(m => (m.id === 'compressor-01' ? { ...m, currentPowerKw: 32.2, deviationPct: 1.5, temperatureC: 70, vibrationMmS: 5.3, healthScore: 88, status: 'normal', maintenanceRisk: 'Low' } : m))
      );
      setKpis(prev => ({
        ...prev,
        specificEnergyKwhPerUnit: 0.84,
        energyDeltaPct: -16.0,
      }));
    }
  }, []);

  const startDemoScenario = useCallback(() => {
    setIsDemoMode(true);
    applyDemoStep(0);
  }, [applyDemoStep]);

  const nextDemoStep = useCallback(() => {
    if (currentDemoStep < DEMO_SCENARIO_STEPS.length - 1) {
      applyDemoStep(currentDemoStep + 1);
    }
  }, [currentDemoStep, applyDemoStep]);

  const prevDemoStep = useCallback(() => {
    if (currentDemoStep > 0) {
      applyDemoStep(currentDemoStep - 1);
    }
  }, [currentDemoStep, applyDemoStep]);

  const jumpToDemoStep = useCallback((stepIdx: number) => {
    if (stepIdx >= 0 && stepIdx < DEMO_SCENARIO_STEPS.length) {
      applyDemoStep(stepIdx);
    }
  }, [applyDemoStep]);

  const exitDemoMode = useCallback(() => {
    setIsDemoMode(false);
    // Reset to realistic state
    setMachines(INITIAL_MACHINES);
    setSelectedMachineId(null);
  }, []);

  // Grounded Copilot response generation
  const sendCopilotMessage = useCallback((question: string) => {
    const userMsg: CopilotMessage = {
      id: `msg-u-${Date.now()}`,
      sender: 'user',
      text: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setCopilotMessages(prev => [...prev, userMsg]);

    // Generate grounded industrial response based on question keywords
    setTimeout(() => {
      let reply = "";
      let action: { label: string; targetTab: string } | undefined;

      const q = question.toLowerCase();

      if (q.includes("why did energy consumption increase") || q.includes("energy increase") || q.includes("spike")) {
        reply = "Total plant energy consumption increased by 12.7% between 14:00 and 16:00. Compressor-01 accounted for 64% of this increase (surging to 38.4 kW, +21.1% over baseline), while weaving production changed by only +0.8%. This pattern indicates compressor volumetric degradation or compressed-air line leakage rather than extra production demand.";
        action = { label: "Inspect Compressor-01", targetTab: "machines" };
      } else if (q.includes("wasting the most") || q.includes("highest energy") || q.includes("top consumer")) {
        reply = "Currently, Compressor-01 is the largest source of avoidable energy waste. It accounts for 31% of total factory power and is operating 21.1% above its operating baseline. Rectifying its intake filtration and coupling leaks offers an immediate potential saving of ₹336/day (₹10,080/month).";
        action = { label: "View Energy Monitor", targetTab: "energy" };
      } else if (q.includes("what should i inspect first") || q.includes("inspect first") || q.includes("maintenance")) {
        reply = "We recommend inspecting Compressor-01 first: (1) Check for restricted air intake filters, (2) inspect manifold pneumatic connectors for audible leaks in Floor A, and (3) verify drive belt alignment. Secondarily, inspect Loom-02 drive-end bearing due to rising vibration (5.2 mm/s).";
        action = { label: "View AI Insights", targetTab: "insights" };
      } else if (q.includes("how much could we potentially save") || q.includes("save") || q.includes("savings")) {
        reply = "EnergyGuard has identified ₹30,200/month in total potential savings: ₹12,400 from compressed air leak rectification, ₹7,800 from HVAC setpoint optimization, ₹5,200 from peak-to-off-peak load shifting, and ₹4,800 from motor servicing. For a typical ₹60,000 implementation, estimated payback is 3.0 months.";
        action = { label: "View Financial Impact", targetTab: "financial" };
      } else if (q.includes("compressor-01") || q.includes("compressor")) {
        reply = "Compressor-01 is currently flagged Critical (Health: 68/100). Operating power is 38.4 kW (+21.1% vs baseline 31.7 kW), discharge temp is 78.0°C (↑9°C), and vibration is 7.2 mm/s (↑38%). Inspecting the intake filter and sealing pneumatic line leaks can eliminate an estimated ₹336/day of waste.";
        action = { label: "Open Compressor-01 Details", targetTab: "machines" };
      } else if (q.includes("carbon") || q.includes("emission") || q.includes("co2")) {
        reply = "Today's factory emissions stand at 1.72 tonnes CO₂, which is 11.8% lower than the historical baseline. This calculation uses the Central Electricity Authority (CEA) grid factor of 0.71 kg CO₂/kWh. Addressing current compressor leaks would reduce monthly emissions by another 895 kg CO₂.";
        action = { label: "View Carbon Dashboard", targetTab: "carbon" };
      } else {
        reply = "Based on current telemetry across Shakti Textiles: Factory load is 133.2 kW across 5 units. Overall plant specific energy is 0.84 kWh/unit (16% better than baseline). However, Compressor-01 (+21.1% power deviation) and Loom-02 (5.2 mm/s vibration) require prompt maintenance attention to avoid unbudgeted downtime.";
        action = { label: "View Plant Overview", targetTab: "overview" };
      }

      const botMsg: CopilotMessage = {
        id: `msg-b-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        relatedAction: action
      };

      setCopilotMessages(prev => [...prev, botMsg]);
    }, 450);
  }, []);

  return (
    <FactoryContext.Provider
      value={{
        settings,
        updateSettings,
        machines,
        kpis,
        timeSeries,
        alerts,
        insights,
        activeTab,
        setActiveTab,
        selectedMachineId,
        setSelectedMachineId,
        isCopilotOpen,
        setIsCopilotOpen,
        isSettingsOpen,
        setIsSettingsOpen,
        isDemoMode,
        currentDemoStep,
        demoSteps: DEMO_SCENARIO_STEPS,
        startDemoScenario,
        nextDemoStep,
        prevDemoStep,
        jumpToDemoStep,
        exitDemoMode,
        resolveAlert,
        updateInsightStatus,
        copilotMessages,
        sendCopilotMessage,
      }}
    >
      {children}
    </FactoryContext.Provider>
  );
};

export const useFactory = (): FactoryContextType => {
  const context = useContext(FactoryContext);
  if (!context) {
    throw new Error('useFactory must be used within a FactoryProvider');
  }
  return context;
};

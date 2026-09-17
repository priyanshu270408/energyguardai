import React, { useState } from 'react';
import {
  Network,
  Cpu,
  Server,
  Cloud,
  Layers,
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap,
  Radio,
  Sliders,
  DollarSign,
  TrendingUp,
  Info
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const [architectureMode, setArchitectureMode] = useState<'prototype' | 'deployment'>('deployment');

  const hardwareComponents = [
    {
      name: 'Non-Invasive Split-Core CT Clamps',
      type: 'Current Sensing',
      specs: '100A/5A, Class 0.5 accuracy, 0-100A AC',
      costEst: '₹1,200 – ₹1,800 per machine',
      install: 'Clips over live 3-phase feeder cable. Zero production downtime or wire cutting required.',
    },
    {
      name: 'PT100 / Thermocouple Contact Sensors',
      type: 'Thermal Telemetry',
      specs: 'Class A, -50°C to +250°C, RTD 3-wire',
      costEst: '₹600 – ₹900 per machine',
      install: 'Magnetic surface mount on motor casing and compressor cylinder head.',
    },
    {
      name: '3-Axis MEMS Vibration Accelerometers',
      type: 'Mechanical Vibration',
      specs: '±16g range, 10 Hz – 10 kHz bandwidth (ISO 10816 RMS)',
      costEst: '₹1,500 – ₹2,500 per machine',
      install: 'Stud or magnetic mount on drive-end bearing housing.',
    },
    {
      name: 'ESP32 / Industrial RS-485 Modbus Gateway',
      type: 'Edge Microcontroller',
      specs: 'Dual-core 240 MHz, Wi-Fi 802.11 b/g/n, RS-485 transceiver, MQTT over TLS',
      costEst: '₹2,800 – ₹4,500 per 5 machines',
      install: 'DIN-rail mounted inside plant local sub-distribution board with 24V DC auxiliary supply.',
    },
  ];

  const pricingTiers = [
    {
      tier: 'Starter Pilot',
      tagline: 'Ideal for single weaving shed or utility audit',
      machines: 'Up to 5 Machines',
      hardwareEst: '~₹18,000 one-time hardware capex',
      softwarePrice: '₹3,500 / month',
      features: [
        'Real-time sub-metering & power telemetry',
        'Specific Energy Consumption (SEC) tracking',
        'Basic threshold alert center (SMS & WhatsApp)',
        'Standard plant dashboard (Desktop & Mobile)',
        'Exportable shift energy reports',
      ],
      recommended: false,
    },
    {
      tier: 'Growth AI',
      tagline: 'Comprehensive energy intelligence for SME plant owners',
      machines: 'Up to 20 Machines',
      hardwareEst: '~₹65,000 one-time hardware capex',
      softwarePrice: '₹9,800 / month',
      features: [
        'Everything in Starter Pilot',
        'Multivariate AI anomaly detection engine',
        'Vibration & thermal condition monitoring',
        'Gujarat ToD tariff load-shifting scheduler',
        'Scope 2 carbon accounting & CEA compliance',
        'EnergyGuard AI Copilot interactive assistant',
      ],
      recommended: true,
    },
    {
      tier: 'Enterprise Plant',
      tagline: 'Multi-shed, multi-boiler textile mill complexes',
      machines: 'Unlimited / Multi-Plant',
      hardwareEst: 'Custom hardware survey & integration',
      softwarePrice: 'Custom annual subscription',
      features: [
        'Everything in Growth AI',
        'Custom PLC / SCADA Modbus TCP & BACnet integration',
        'Captive Solar PV & Genset hybrid balance optimization',
        'Dedicated energy consultant monthly audit sign-off',
        'On-premise edge appliance fallback',
      ],
      recommended: false,
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-industrial-950">
            System Architecture & SME Deployment Story
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Technical pipeline from industrial shop floor sensors to actionable cloud decision support
          </p>
        </div>

        {/* Architecture Mode Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setArchitectureMode('deployment')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              architectureMode === 'deployment'
                ? 'bg-forest-800 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-industrial-900'
            }`}
          >
            Proposed Industrial Deployment
          </button>
          <button
            onClick={() => setArchitectureMode('prototype')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              architectureMode === 'prototype'
                ? 'bg-white text-industrial-950 font-bold shadow-xs'
                : 'text-slate-600 hover:text-industrial-900'
            }`}
          >
            Prototype Architecture
          </button>
        </div>
      </div>

      {/* Interactive System Pipeline Flow */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
        <div className="pb-3 mb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-industrial-950 tracking-tight">
              {architectureMode === 'deployment'
                ? 'End-to-End Industrial Edge-to-Cloud Pipeline'
                : 'Current Hackathon Software Prototype Pipeline'}
            </h2>
            <span className="text-xs text-slate-500">
              {architectureMode === 'deployment'
                ? 'Physical IoT sensors connected to local gateway via RS-485 and secure MQTT to FastAPI & Cloud'
                : 'Deterministic industrial telemetry generator driving reactive React store and calculation engines'}
            </span>
          </div>

          <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700">
            {architectureMode === 'deployment' ? 'Proposed Spec' : 'Live Prototype'}
          </span>
        </div>

        {architectureMode === 'deployment' ? (
          /* Proposed Deployment Pipeline Diagram */
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center">
            {/* Step 1 */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-800 mb-2">
                <Radio className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-industrial-950 block">1. Shop Floor Sensors</span>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Split-core CT clamps, PT voltage meters, PT100 temp, 3-axis vibration.
              </p>
              <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded mt-2">
                Analog / 4-20mA
              </span>
            </div>

            {/* Step 2 */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-industrial-800 mb-2">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-industrial-950 block">2. Industrial Edge Gateway</span>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                ESP32 / Modbus RTU gateway with edge noise filtering & local buffer.
              </p>
              <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded mt-2">
                RS-485 / 115200 baud
              </span>
            </div>

            {/* Step 3 */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-800 mb-2">
                <Network className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-industrial-950 block">3. MQTT Message Broker</span>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Encrypted MQTT over TLS (Port 8883) via local Wi-Fi / 4G SIM fallback.
              </p>
              <span className="text-[10px] font-mono bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded mt-2">
                MQTT JSON Payload
              </span>
            </div>

            {/* Step 4 */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-800 mb-2">
                <Server className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-industrial-950 block">4. Backend & AI Models</span>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                FastAPI, TimescaleDB / PostgreSQL, Isolation Forest & ToD tariff solver.
              </p>
              <span className="text-[10px] font-mono bg-forest-100 text-forest-800 px-1.5 py-0.5 rounded mt-2">
                FastAPI + ML
              </span>
            </div>

            {/* Step 5 */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 mb-2">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-industrial-950 block">5. EnergyGuard App</span>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Next.js / React dashboard, real-time alerts, copilot, and audit reports.
              </p>
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded mt-2">
                WebSockets / HTTPS
              </span>
            </div>
          </div>
        ) : (
          /* Prototype Mode Pipeline */
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-xs font-bold text-industrial-950 block">1. Sensor Simulator Engine</span>
              <p className="text-[11px] text-slate-500 mt-1">
                Simulates 5 machine streams with physical noise, load curves, and thermal delay.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-xs font-bold text-industrial-950 block">2. In-Memory State & API Layer</span>
              <p className="text-[11px] text-slate-500 mt-1">
                Centralized reactive store tracking factory KPIs, machine objects, and time-series.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-xs font-bold text-industrial-950 block">3. Analytics & Anomaly Rules</span>
              <p className="text-[11px] text-slate-500 mt-1">
                Executes baseline deviation, ISO 10816 vibration checks, and ToD schedule optimization.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-xs font-bold text-industrial-950 block">4. EnergyGuard UI</span>
              <p className="text-[11px] text-slate-500 mt-1">
                Production-grade responsive interface with guided 10-step hackathon demo runner.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Hardware Bill of Materials (Section 29) */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
        <div className="pb-3 mb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-industrial-950 tracking-tight">
              Proposed Hardware Deployment Architecture (No Disruption to Machines)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Low-cost, retrofit-friendly industrial components that avoid expensive Industry 4.0 rip-and-replace
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            * Proposed Architecture (Not physical hardware)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {hardwareComponents.map((hw, i) => (
            <div key={i} className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-industrial-950 text-sm">{hw.name}</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                    {hw.type}
                  </span>
                </div>
                <p className="text-slate-600 mb-2 font-mono text-[11px]">{hw.specs}</p>
                <div className="p-2 bg-white rounded border border-slate-200 text-slate-600 mb-2 leading-relaxed">
                  <strong>Installation:</strong> {hw.install}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between font-mono">
                <span className="text-slate-500 font-sans">Estimated Unit Cost:</span>
                <span className="font-bold text-forest-800">{hw.costEst}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SME Business & Commercial Model (Section 30 & 31) */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
        <div className="pb-3 mb-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-industrial-950 tracking-tight">
            SME Commercial & Subscription Model (Illustrative Pricing)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Designed specifically for Indian manufacturing SMEs with low upfront capex and modular expansion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-lg border flex flex-col justify-between ${
                tier.recommended
                  ? 'border-forest-700 bg-forest-50/30 ring-2 ring-forest-500/20'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="font-bold text-base text-industrial-950 tracking-tight">
                    {tier.tier}
                  </span>
                  {tier.recommended && (
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-forest-800 text-white font-bold">
                      Most Popular
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 mb-3">{tier.tagline}</p>

                <div className="mb-3 font-mono">
                  <div className="text-2xl font-bold text-industrial-950">
                    {tier.softwarePrice}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 font-sans">
                    Hardware: <strong className="text-industrial-900">{tier.hardwareEst}</strong>
                  </div>
                  <div className="text-[11px] text-forest-800 font-bold font-sans mt-0.5">
                    Scale: {tier.machines}
                  </div>
                </div>

                <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                  {tier.features.map((f, fi) => (
                    <div key={fi} className="flex items-start gap-2 text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 text-center">
                <span className="text-[11px] text-slate-400">
                  * Illustrative SME deployment model.
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

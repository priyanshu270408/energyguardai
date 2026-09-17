# ENERGYGUARD AI
> **"Predict Energy Waste. Optimize Production. Reduce Emissions."**  
> *Cleaner Industry • Brighter Tomorrow*

[![React](https://img.shields.io/badge/Frontend-React%2018%20%7C%20TypeScript-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Bundler-Vite%205-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**ENERGYGUARD AI** is an authentic, production-grade industrial energy intelligence platform tailored specifically for Indian manufacturing SMEs (such as textile mills, foundries, ceramics, chemicals, and fabrication shops) and technology hackathons.

Designed with the restraint and functional clarity of modern industrial control rooms and enterprise SaaS, EnergyGuard AI bridges the gap between expensive Industry 4.0 systems and the capital-constrained reality of Indian manufacturing.

---

## 1. Core Philosophy: Turn Data into Action

Traditional energy monitors only show raw data:
> ❌ *"Compressor energy: 38.4 kW"*

EnergyGuard AI moves from **Data → Context → Insight → Action → Impact**:
> ✅ *"Compressor-01 is consuming 21% more energy than baseline (+21.1%) while plant air demand remains steady. The pattern may indicate reduced compressor volumetric efficiency or distribution leakage. Inspect the filter and manifold couplings. **Estimated opportunity: ₹336/day (₹10,080/month).**"*

---

## 2. Default Factory Context

- **Facility Name:** Shakti Textiles Pvt. Ltd.
- **Location:** Surat, Gujarat
- **Industry Sector:** Textile Manufacturing (Weaving & Finishing)
- **Facility Size:** SME / Mid-sized manufacturing facility
- **Plant Hierarchy:**
  ```
  Factory: Shakti Textiles Pvt. Ltd.
  │
  ├── Production Floor A
  │   ├── Loom-01 (High-speed Rapier Weaving Loom #1)
  │   ├── Loom-02 (Rapier Weaving Loom #2 - Bearing Drift Warning)
  │   └── Loom-03 (High-speed Rapier Weaving Loom #3)
  │
  ├── Utilities
  │   ├── Compressor-01 (Rotary Screw Compressor - Critical Power Surge)
  │   └── HVAC-01 (Chilled Water Plant & Weaving Humidity Unit)
  │
  └── Energy System
      └── Main Sub-Station Meter
  ```

---

## 3. Platform Modules & Features

### 📊 1. Plant Overview (Executive Dashboard)
- **Top 5 KPIs:**
  - *Today's Energy:* **2,486 kWh** (↓8.4% vs baseline)
  - *Energy Cost:* **₹19,640** (↓6.2% vs yesterday)
  - *CO₂ Emissions:* **1.72 tonnes** (↓11.8% vs baseline)
  - *Specific Energy (SEC):* **0.84 kWh/unit** (↓16.0% efficiency gain)
  - *Production Output:* **2,960 units** (Target: 3,000 units • Quality: 99.4% In-Spec)
- **Interactive Energy Chart:** 24h, 7d, and 30d time-series comparing actual load against the learned baseline envelope, highlighting the 14:00 compressor anomaly.
- **Machine Fleet Status Table:** Real-time power, temperature, vibration (ISO 10816), health score (/100), and baseline deviation. Fully responsive with automatic card layout on mobile.
- **Alert Center ("Needs Attention"):** Prioritized alert stream (Critical, Warning, Opportunity) with time elapsed and direct inspection links.
- **AI Insight Card:** Correlated sensor evidence (+21% power, +9°C temp, +38% vibration, +1% output), probabilistic explanation, recommended checklist, and quantified daily loss rate (₹336/day).

### ⚡ 2. Energy Monitor & SEC Decoupling
- **Specific Energy Consumption (SEC):** Demonstrates decoupling of energy from throughput (**0.84 kWh/unit** vs 1.00 baseline), proving efficiency was achieved without reducing textile production.
- **Sub-Metering Breakdown:** Area splits between Production Floor A (54.8%) and Utilities (45.2%).
- **Top Energy Consumers Ranking:** `Compressor-01` (31%), `HVAC-01` (19%), `Loom-02` (17%), `Loom-03` (17%), `Loom-01` (16%).

### ⚙️ 3. Machine Health & Condition Monitoring
- **Transparent Health Scoring (0–100):** Combines temperature drift, vibration velocity against ISO 10816, power variance from 30-day baseline, and operating hours.
- **Detailed Machine Modal:** 3 synchronized trend lines (Power, Temperature, Vibration) and 4 human-readable diagnostic sections: *What is happening?*, *Why it matters*, *Recommended inspection steps*, and *Quantified potential impact*.

### 🧠 4. AI Insights & Diagnostic Center
- Categorized insight stream: Active Anomalies, Energy Waste Opportunities, Predictive Maintenance Risks, and Process Adjustments.
- Probability-calibrated, grounded explanations without fake "100% certainty" claims.

### 🕒 5. Production & Energy Optimization (Load Shifting)
- **Surat Time-of-Day (ToD) Tariff Scheduler:**
  - Peak Window: 14:00 – 18:00 (@ ₹11.50/kWh)
  - Normal Window: 06:00 – 14:00 & 18:00 – 20:00 (@ ₹7.90/kWh)
  - Off-Peak Window: 20:00 – 06:00 (@ ₹6.20/kWh)
- **Load Shifting Simulation:** Shifts auxiliary air charging from peak 14:00 to off-peak 20:00, saving **₹3,700/day** while preserving 100% of production.
- **Before vs After Systematic Benchmark:** Verifies 16% lower energy intensity with identical output.

### 🍃 6. Carbon Accounting & Decarbonization
- Daily Scope 2 emissions tracking (1.72 t CO₂) and monthly projections (51.6 t CO₂).
- **Configurable Grid Emission Factor:** Interactive slider adjusting the Central Electricity Authority (CEA) baseline from 0.40 to 0.95 kg CO₂/kWh (default: 0.71).
- 4 quantified decarbonization levers: Pneumatic leak elimination, HVAC setpoint calibration, motor lubrication/IE3 upgrades, and 50 kWp rooftop solar PV modeling.

### 💰 7. Financial Impact & SME Payback Calculator
- **"Where Can We Save?" Breakdown:** Identified **₹30,200/month (₹3,62,400/year)** across compressed air (₹12,400), HVAC (₹7,800), load shifting (₹5,200), and motors (₹4,800).
- **Interactive SME Payback Calculator:** Adjust monthly bill, targeted efficiency %, and implementation capex to calculate simple payback (e.g. ₹60,000 capex ÷ ₹20,000/mo = **3.0 months payback**).

### 📑 8. Plant Reports & Audits
- 4 operational reports: Monthly Plant Energy Audit, Shift Log, Scope 2 Carbon Disclosure, and Machine Condition Report.
- One-click print and PDF export with standardized audit letterheads.

### 🔌 9. System Architecture & Hardware Story
- **Interactive Flow Toggle:** Live Prototype vs Proposed Industrial Edge Deployment.
- **Retrofit Hardware BOM:** Non-invasive split-core CT clamps, PT100 contact sensors, 3-axis MEMS accelerometers, and ESP32 / Modbus RTU gateways.
- **SME Commercial Model:** Starter Pilot (up to 5 machines), Growth AI (up to 20 machines), and Enterprise Plant tiers.

### 🤖 10. AI Copilot (Side Drawer)
- Interactive industrial assistant with grounded factory telemetry answers and one-click suggested questions.

### 🎬 11. Guided 10-Step Hackathon Demo Runner
- Top orchestrator banner with presenter script, step counter (1–10), auto-play, forward/back controls, and deterministic state synchronization.

---

## 4. Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS (Custom industrial palette with deep forest green, graphite, and slate)
- **Icons:** Lucide React
- **Data Visualization:** Recharts (Responsive Area, Line, Bar, and Donut charts)
- **Proposed Industrial Backend:** Python FastAPI, TimescaleDB / Supabase PostgreSQL, MQTT Broker, Isolation Forest ML models

---

## 5. Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation & Local Run
```bash
# 1. Clone or navigate to the project directory
cd energyguard-ai

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Local URL: http://localhost:3000
```

### Production Build
```bash
# Type check and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 6. Hackathon Live Demo Script (3-Minute Tour)

1. **Open Dashboard (`/overview`)**:
   - Introduce factory: *"This is Shakti Textiles Pvt. Ltd., our simulated SME manufacturing facility in Surat, Gujarat."*
   - Point out top metrics: **2,486 kWh**, **₹19,640**, **1.72 t CO₂**, and **0.84 kWh/unit**.
2. **Demonstrate Baseline Tracking**:
   - Review 24h chart: *"EnergyGuard continuously compares actual sensor telemetry against the learned operating baseline envelope."*
3. **Inspect Compressor-01 Surge**:
   - Click `Compressor-01` in the fleet table to inspect the +21.1% power surge, 78°C temp, and 7.2 mm/s vibration while production remained flat at 152 units/hour.
4. **Show AI Decision Support**:
   - Open `AI Insights`: *"Instead of sending a cryptic alarm, EnergyGuard provides a 3-point inspection checklist and quantifies the daily loss: ₹336/day."*
5. **Optimize Production Schedule**:
   - Open `Optimization`: Show the ToD tariff shift from peak (₹11.50/kWh) to off-peak (₹6.20/kWh) to save **₹3,700/day**.
6. **Quantify Financial & Carbon Return**:
   - Open `Financial Impact` and `Carbon`: Show the **₹30,200/month** identified savings and **3.0-month simple payback**.
7. **Conclude**:
   - *"Monitor. Understand. Act. Measure. EnergyGuard turns invisible energy waste into immediate savings for Indian manufacturing SMEs."*

---

## 7. Data Transparency Disclaimer

*All sensor values, equipment names, and telemetry streams shown in this application are simulated for demonstration based on realistic operating envelopes for SME manufacturing facilities in Surat, Gujarat. EnergyGuard AI provides decision-support indicators rather than autonomous control over physical factory assets.*

---

## 8. License

MIT License. Developed for industrial SME energy efficiency and hackathon demonstration.

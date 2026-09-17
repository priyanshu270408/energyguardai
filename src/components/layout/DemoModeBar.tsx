import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Clock,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useFactory } from '../../store/factoryContext';

export const DemoModeBar: React.FC = () => {
  const {
    isDemoMode,
    currentDemoStep,
    demoSteps,
    nextDemoStep,
    prevDemoStep,
    jumpToDemoStep,
    exitDemoMode,
  } = useFactory();

  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isDemoMode && isAutoPlaying) {
      interval = setInterval(() => {
        if (currentDemoStep < demoSteps.length - 1) {
          nextDemoStep();
        } else {
          setIsAutoPlaying(false);
        }
      }, 5500);
    }
    return () => clearInterval(interval);
  }, [isDemoMode, isAutoPlaying, currentDemoStep, demoSteps.length, nextDemoStep]);

  if (!isDemoMode) return null;

  const currentStep = demoSteps[currentDemoStep];

  return (
    <div className="bg-forest-950 text-white border-b border-forest-800 shadow-md px-4 py-3 sticky top-16 z-20 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Left: Step indicator and Title */}
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-forest-800 border border-forest-600 text-forest-200 font-mono text-xs font-bold shrink-0">
            {currentDemoStep + 1}/10
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-forest-900 border border-forest-700 text-emerald-400 font-semibold">
                Demo Step {currentDemoStep + 1}
              </span>
              <span className="text-xs text-forest-300 font-mono flex items-center gap-1">
                <Clock className="w-3 h-3 text-forest-400" />
                {currentStep.timestamp}
              </span>
              <h3 className="text-sm font-bold text-white tracking-tight">
                {currentStep.title}
              </h3>
            </div>
            <p className="text-xs text-forest-200 mt-1 max-w-2xl leading-relaxed italic bg-forest-900/60 px-2.5 py-1 rounded border border-forest-800/80">
              "{currentStep.narratorScript}"
            </p>
          </div>
        </div>

        {/* Right: Step controls, jump buttons, autoplay, exit */}
        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
          {/* Jump step buttons for quick navigation */}
          <div className="hidden lg:flex items-center gap-1 bg-forest-900/80 p-1 rounded border border-forest-800">
            {demoSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => jumpToDemoStep(idx)}
                className={`w-6 h-6 rounded text-[11px] font-mono font-medium transition-colors ${
                  currentDemoStep === idx
                    ? 'bg-emerald-500 text-industrial-950 font-bold'
                    : 'text-forest-300 hover:text-white hover:bg-forest-800'
                }`}
                title={`Jump to step ${idx + 1}: ${step.title}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {/* Autoplay button */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`p-1.5 rounded text-xs font-medium border flex items-center gap-1 transition-colors ${
              isAutoPlaying
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-forest-900 text-forest-200 border-forest-700 hover:bg-forest-800'
            }`}
            title={isAutoPlaying ? 'Pause automatic slideshow' : 'Auto play all steps'}
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isAutoPlaying ? 'Pause' : 'Auto'}</span>
          </button>

          {/* Prev/Next Buttons */}
          <button
            onClick={prevDemoStep}
            disabled={currentDemoStep === 0}
            className="p-1.5 rounded bg-forest-900 border border-forest-700 text-forest-200 hover:bg-forest-800 disabled:opacity-40 disabled:cursor-not-allowed"
            title="Previous Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextDemoStep}
            disabled={currentDemoStep === demoSteps.length - 1}
            className="p-1.5 rounded bg-forest-800 border border-forest-600 text-white hover:bg-forest-700 disabled:opacity-40 disabled:cursor-not-allowed"
            title="Next Step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Exit Demo Mode */}
          <button
            onClick={exitDemoMode}
            className="p-1.5 rounded bg-rose-950/40 border border-rose-800/60 text-rose-300 hover:bg-rose-900/60 text-xs ml-1"
            title="Exit Demo Mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

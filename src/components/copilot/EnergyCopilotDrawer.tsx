import React, { useState } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Clock,
  User
} from 'lucide-react';
import { useFactory } from '../../store/factoryContext';

export const EnergyCopilotDrawer: React.FC = () => {
  const {
    isCopilotOpen,
    setIsCopilotOpen,
    copilotMessages,
    sendCopilotMessage,
    setActiveTab,
    setSelectedMachineId,
  } = useFactory();

  const [inputQuestion, setInputQuestion] = useState('');

  if (!isCopilotOpen) return null;

  const suggestedQuestions = [
    'Why did energy consumption increase today?',
    'Which machine is wasting the most energy?',
    'What should I inspect first?',
    'How much could we potentially save?',
    'Why is Compressor-01 showing a warning?',
  ];

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputQuestion.trim()) return;
    sendCopilotMessage(inputQuestion.trim());
    setInputQuestion('');
  };

  const handleSelectSuggested = (q: string) => {
    sendCopilotMessage(q);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCopilotOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-4 bg-industrial-900 text-white flex items-center justify-between border-b border-industrial-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-forest-800 border border-forest-600 flex items-center justify-center text-forest-200">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-white">
                    EnergyGuard Copilot
                  </h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-forest-900 text-forest-200 border border-forest-700">
                    Decision Support
                  </span>
                </div>
                <span className="text-xs text-industrial-400">
                  Grounded on Shakti Textiles Telemetry
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCopilotOpen(false)}
              className="p-1 rounded text-industrial-400 hover:text-white hover:bg-industrial-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Suggested Quick Questions */}
          <div className="p-3 bg-slate-50 border-b border-slate-200">
            <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-500 block mb-1.5">
              Suggested Plant Manager Questions
            </span>
            <div className="flex flex-wrap gap-1.5">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectSuggested(q)}
                  className="text-[11px] bg-white hover:bg-forest-50 hover:text-forest-900 hover:border-forest-300 border border-slate-200 text-slate-700 px-2 py-1 rounded transition-colors text-left font-medium"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {copilotMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-forest-800 text-white rounded-br-none shadow-xs'
                      : 'bg-slate-100 text-industrial-900 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>

                  {msg.relatedAction && (
                    <div className="mt-2 pt-2 border-t border-slate-200">
                      <button
                        onClick={() => {
                          setIsCopilotOpen(false);
                          setActiveTab(msg.relatedAction!.targetTab);
                        }}
                        className="inline-flex items-center gap-1 font-semibold text-forest-700 hover:text-forest-900 text-xs"
                      >
                        {msg.relatedAction.label} <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 font-mono mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputQuestion}
              onChange={e => setInputQuestion(e.target.value)}
              placeholder="Ask about machine waste, tariffs, or anomalies..."
              className="flex-1 bg-slate-50 border border-slate-300 focus:border-forest-700 rounded-md px-3 py-2 text-xs text-industrial-900 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputQuestion.trim()}
              className="p-2 rounded-md bg-forest-800 hover:bg-forest-900 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

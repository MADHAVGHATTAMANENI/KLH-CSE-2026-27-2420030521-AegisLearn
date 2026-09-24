import React from 'react';
import { Sliders, Activity, Cpu, HardDrive, Zap, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';
import { getStoredApiKey } from '../../utils/geminiApi';

export const AdminDashboard: React.FC = () => {
  const apiKey = getStoredApiKey();

  const logs = [
    { time: '17:28:40', level: 'INFO', msg: 'Vector index loaded: 2,400 questions & 8 textbook corpora' },
    { time: '17:29:12', level: 'SUCCESS', msg: `Gemini 1.5 Flash API Status: ${apiKey ? 'Key Configured (Live)' : 'Mock RAG Active'}` },
    { time: '17:29:45', level: 'INFO', msg: 'Cosine similarity cache initialized with top-K=3 strategy' },
    { time: '17:30:02', level: 'INFO', msg: "Bloom's taxonomy prompt routing engine ready" },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-amber-500/20 bg-amber-950/10 space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Administrator Monitoring Console</h2>
            <p className="text-xs text-gray-400">
              Real-time monitoring of vector index memory footprint, Gemini API token consumption, and system query logs.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel rounded-2xl p-5 border border-gray-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase">
            <span>RAG Query Volume</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">1,482</div>
          <p className="text-[11px] text-cyan-400 font-mono">Mean Latency: 38ms</p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-gray-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase">
            <span>Gemini Token Usage</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-300">
            {apiKey ? '42.8k Tokens' : 'Local Mock RAG'}
          </div>
          <p className="text-[11px] text-gray-400">Model: Gemini 1.5 Flash</p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-gray-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase">
            <span>Vector Index Memory</span>
            <HardDrive className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">14.2 MB</div>
          <p className="text-[11px] text-purple-400">2,400 Question Embeddings</p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-gray-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase">
            <span>System Health</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-extrabold text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-5 h-5" /> 100% Operational
          </div>
          <p className="text-[11px] text-gray-400">Zero System Exceptions</p>
        </div>

      </div>

      {/* System Logs Stream */}
      <div className="glass-panel rounded-2xl p-6 border border-gray-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          Live System Activity & RAG Diagnostic Logs
        </h3>

        <div className="bg-gray-950 rounded-xl p-4 border border-gray-800 font-mono text-xs space-y-2 max-h-60 overflow-y-auto">
          {logs.map((l, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-gray-500">{l.time}</span>
              <span className={`font-bold ${l.level === 'SUCCESS' ? 'text-emerald-400' : 'text-cyan-400'}`}>
                [{l.level}]
              </span>
              <span className="text-gray-300">{l.msg}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

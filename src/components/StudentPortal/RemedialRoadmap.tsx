import React, { useState } from 'react';
import { Target, CheckCircle2, ArrowRight, BookOpen, Brain, Clock, ShieldAlert, Sparkles } from 'lucide-react';
import { RemedialItem, BloomsLevel } from '../../types';
import { BLOOMS_LEVELS } from '../../data/bloomsMeta';

interface RemedialRoadmapProps {
  onStudyTopic: (topic: string, bloomsLevel: BloomsLevel) => void;
}

export const RemedialRoadmap: React.FC<RemedialRoadmapProps> = ({ onStudyTopic }) => {
  const [items, setItems] = useState<RemedialItem[]>([
    {
      id: 'rem-01',
      topic: 'Computer Networks',
      bloomsLevel: 'analyze',
      issueSummary: 'Sniffing visibility at intermediate routers under Session Layer Encryption',
      suggestedAction: 'Review OSI session vs network layer header exposure in Tanenbaum Ch. 5',
      recommendedChunks: [],
      estimatedMinutes: 15,
      completed: false,
    },
    {
      id: 'rem-02',
      topic: 'Operating System',
      bloomsLevel: 'apply',
      issueSummary: 'TLB Effective Access Time (EAT) multi-level page table memory access calculation',
      suggestedAction: 'Practice 3 TLB hit vs miss numerical problems from Silberschatz Ch. 8',
      recommendedChunks: [],
      estimatedMinutes: 20,
      completed: false,
    },
    {
      id: 'rem-03',
      topic: 'Programming and Data Structure',
      bloomsLevel: 'evaluating' as any,
      issueSummary: 'Self-balancing AVL Tree height rotational properties (LL, RR, LR, RL)',
      suggestedAction: 'Inspect AVL insertion step-by-step trace and re-test with interactive quiz',
      recommendedChunks: [],
      estimatedMinutes: 25,
      completed: true,
    }
  ]);

  const toggleComplete = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-amber-500/20 bg-amber-950/10 space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Adaptive Remedial Roadmap</h2>
            <p className="text-xs text-gray-400">
              Personalized re-study recommendations automatically generated based on low quiz mastery scores.
            </p>
          </div>
        </div>
      </div>

      {/* Roadmap Items List */}
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`glass-panel rounded-2xl p-5 border transition-all space-y-4 ${
              item.completed
                ? 'border-emerald-500/30 bg-emerald-950/10 opacity-75'
                : 'border-gray-800 hover:border-amber-500/40'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleComplete(item.id)}
                  className={`mt-0.5 p-1 rounded-full border transition-all ${
                    item.completed
                      ? 'bg-emerald-500 text-black border-emerald-400'
                      : 'border-gray-600 text-transparent hover:border-gray-400'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5 fill-current" />
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-white">Step {idx + 1}: {item.topic}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${BLOOMS_LEVELS[item.bloomsLevel]?.badge || 'bg-amber-500 text-black'}`}>
                      {BLOOMS_LEVELS[item.bloomsLevel]?.name || 'Target Area'}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-amber-300 mt-0.5">{item.issueSummary}</h4>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-xs text-gray-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  ~{item.estimatedMinutes} mins
                </span>

                <button
                  onClick={() => onStudyTopic(item.topic, item.bloomsLevel)}
                  className="px-3.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Re-Study Topic
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gray-950/80 border border-gray-800 text-xs text-gray-300 leading-relaxed flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Action Plan: </span>
                {item.suggestedAction}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

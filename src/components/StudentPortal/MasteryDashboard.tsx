import React from 'react';
import { Award, Brain, BarChart3, TrendingUp, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { StudentProgress, BloomsLevel } from '../../types';
import { BLOOMS_LEVELS } from '../../data/bloomsMeta';

interface MasteryDashboardProps {
  progress: StudentProgress;
}

export const MasteryDashboard: React.FC<MasteryDashboardProps> = ({ progress }) => {
  return (
    <div className="space-y-6">
      
      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Overall Mastery</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">
            {progress.overallMastery}%
          </div>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3.5 h-3.5" /> +5.2% improvement this week
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-purple-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Quizzes Attempted</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Brain className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">
            {progress.completedQuizzes.length}
          </div>
          <p className="text-[11px] text-gray-400">Across 8 CS Subject Corpora</p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-amber-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Weak Areas Identified</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-300">
            {progress.weaknessAreas.length}
          </div>
          <p className="text-[11px] text-amber-400">Requires Remedial Re-Study</p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-emerald-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Top Cognitive Level</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-white">
            Understanding
          </div>
          <p className="text-[11px] text-emerald-400 font-semibold">92% Precision Score</p>
        </div>

      </div>

      {/* Main Breakdown: Bloom's Cognitive Levels (Left 6 cols) & Topic Mastery (Right 6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Bloom's Cognitive Levels Mastery */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-gray-800 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              Bloom's Taxonomy Cognitive Level Mastery
            </h3>
            <span className="text-xs text-gray-400">Target: &gt;75%</span>
          </div>

          <div className="space-y-4">
            {(Object.keys(BLOOMS_LEVELS) as BloomsLevel[]).map((levelKey) => {
              const meta = BLOOMS_LEVELS[levelKey];
              const scoreVal = progress.bloomsMastery[levelKey] || 70;

              return (
                <div key={levelKey} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full`} style={{ backgroundColor: meta.color }} />
                      <span className="font-bold text-white">{meta.name}</span>
                      <span className="text-gray-500 text-[10px]">({meta.verb})</span>
                    </div>
                    <span className="font-bold text-gray-200">{scoreVal}%</span>
                  </div>

                  <div className="w-full bg-gray-900 h-2.5 rounded-full overflow-hidden border border-gray-800">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${scoreVal}%`,
                        backgroundColor: meta.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Topic-Wise Proficiency */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-gray-800 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              Topic-Wise Academic Proficiency
            </h3>
            <span className="text-xs text-gray-400">8 CS Subjects</span>
          </div>

          <div className="space-y-4">
            {Object.entries(progress.topicMastery).map(([topicName, topicScore]) => (
              <div key={topicName} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-200">{topicName}</span>
                  <span className={`font-bold ${topicScore < 60 ? 'text-amber-400' : 'text-cyan-400'}`}>
                    {topicScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-900 h-2.5 rounded-full overflow-hidden border border-gray-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      topicScore < 60 ? 'bg-amber-500' : 'bg-gradient-to-r from-cyan-500 to-purple-500'
                    }`}
                    style={{ width: `${topicScore}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quiz History Log */}
      <div className="glass-panel rounded-2xl p-6 border border-gray-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Recent Interactive Quiz History
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-gray-900/80 text-gray-400 uppercase font-bold text-[10px] border-b border-gray-800">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Topic Corpus</th>
                <th className="p-3">Questions</th>
                <th className="p-3">Score %</th>
                <th className="p-3">Cognitive Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {progress.completedQuizzes.map((q) => (
                <tr key={q.id} className="hover:bg-gray-800/30 transition-all">
                  <td className="p-3 font-mono text-gray-400">{q.date}</td>
                  <td className="p-3 font-semibold text-white">{q.topic}</td>
                  <td className="p-3">{q.totalQuestions} Questions</td>
                  <td className="p-3 font-bold text-cyan-400">{q.score}%</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      q.score >= 75 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {q.score >= 75 ? 'Proficient' : 'Needs Practice'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { Shield, BookOpen, User, Key, CheckCircle, Sparkles, Sliders, Database, Activity, BarChart2 } from 'lucide-react';
import { getStoredApiKey, setStoredApiKey } from '../utils/geminiApi';

interface NavbarProps {
  activePortal: 'student' | 'educator' | 'admin' | 'evaluation';
  setActivePortal: (portal: 'student' | 'educator' | 'admin' | 'evaluation') => void;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
  availableTopics: string[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activePortal,
  setActivePortal,
  selectedTopic,
  setSelectedTopic,
  availableTopics
}) => {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(getStoredApiKey());
  const [hasKey, setHasKey] = useState(!!getStoredApiKey());

  const handleSaveKey = () => {
    setStoredApiKey(apiKeyInput);
    setHasKey(!!apiKeyInput.trim());
    setShowKeyModal(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 glass-panel border-b border-gray-800 bg-[#0b0f19]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="h-full w-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
                <Shield className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
                  AegisLearn
                </span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                  v1.5 Flash RAG
                </span>
              </div>
              <p className="text-xs text-gray-400 hidden sm:block">Generative AI Framework for Personalised Learning</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-gray-900/60 p-1 rounded-xl border border-gray-800">
            <button
              onClick={() => setActivePortal('student')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activePortal === 'student'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`}
            >
              <User className="w-4 h-4" />
              Student Portal
            </button>

            <button
              onClick={() => setActivePortal('educator')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activePortal === 'educator'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm shadow-purple-500/10'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Educator Portal
            </button>

            <button
              onClick={() => setActivePortal('admin')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activePortal === 'admin'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`}
            >
              <Sliders className="w-4 h-4" />
              Admin Console
            </button>

            <button
              onClick={() => setActivePortal('evaluation')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activePortal === 'evaluation'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              RAG Lab
            </button>
          </nav>

          {/* Right actions: Topic Selector & API Key Button */}
          <div className="flex items-center gap-3">
            {/* Topic Select */}
            <div className="relative hidden lg:block">
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="bg-gray-900 border border-gray-700 text-xs rounded-lg px-3 py-1.5 text-cyan-300 focus:ring-1 focus:ring-cyan-500 focus:outline-none cursor-pointer"
              >
                {availableTopics.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Gemini API Key Status Button */}
            <button
              onClick={() => setShowKeyModal(true)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                hasKey
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              {hasKey ? 'Gemini 1.5 Active' : 'Gemini Key (Mock RAG Active)'}
            </button>
          </div>

        </div>

        {/* Mobile Portal Navigation Bar */}
        <div className="md:hidden flex overflow-x-auto border-t border-gray-800 px-2 py-1.5 gap-2 text-xs">
          <button
            onClick={() => setActivePortal('student')}
            className={`px-3 py-1 rounded-md flex items-center gap-1 whitespace-nowrap ${activePortal === 'student' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400'}`}
          >
            <User className="w-3 h-3" /> Student
          </button>
          <button
            onClick={() => setActivePortal('educator')}
            className={`px-3 py-1 rounded-md flex items-center gap-1 whitespace-nowrap ${activePortal === 'educator' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-400'}`}
          >
            <BookOpen className="w-3 h-3" /> Educator
          </button>
          <button
            onClick={() => setActivePortal('admin')}
            className={`px-3 py-1 rounded-md flex items-center gap-1 whitespace-nowrap ${activePortal === 'admin' ? 'bg-amber-500/20 text-amber-300' : 'text-gray-400'}`}
          >
            <Sliders className="w-3 h-3" /> Admin
          </button>
          <button
            onClick={() => setActivePortal('evaluation')}
            className={`px-3 py-1 rounded-md flex items-center gap-1 whitespace-nowrap ${activePortal === 'evaluation' ? 'bg-emerald-500/20 text-emerald-300' : 'text-gray-400'}`}
          >
            <BarChart2 className="w-3 h-3" /> RAG Lab
          </button>
        </div>
      </header>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Key className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Google Gemini API Key</h3>
                <p className="text-xs text-gray-400">Enable live Gemini 1.5 Flash generation</p>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              Provide your Google Gemini API key to enable live Generative AI study guide notes & quiz explanations. If omitted, AegisLearn will run using its local grounded RAG synthesizer.
            </p>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">API Key</label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveKey}
                className="px-4 py-2 text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all shadow-md shadow-cyan-500/20"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

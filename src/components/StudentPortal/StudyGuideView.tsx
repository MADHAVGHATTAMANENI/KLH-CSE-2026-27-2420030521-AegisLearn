import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Volume2, Copy, Download, Brain, FileText, CheckCircle2, ChevronRight, Layers, ExternalLink } from 'lucide-react';
import { BloomsLevel, RAGSearchResult, TextbookChunk } from '../../types';
import { BLOOMS_LEVELS } from '../../data/bloomsMeta';
import { performVectorSearch } from '../../utils/ragEngine';
import { generatePersonalizedNotes } from '../../utils/geminiApi';

interface StudyGuideViewProps {
  selectedTopic: string;
  allChunks: TextbookChunk[];
  onStartQuiz: (topic: string, bloomsLevel: BloomsLevel) => void;
}

export const StudyGuideView: React.FC<StudyGuideViewProps> = ({
  selectedTopic,
  allChunks,
  onStartQuiz,
}) => {
  const [searchQuery, setSearchQuery] = useState('OSI Layer Encryption and Header Visibility');
  const [activeBloomsLevel, setActiveBloomsLevel] = useState<BloomsLevel>('understand');
  const [retrievedChunks, setRetrievedChunks] = useState<RAGSearchResult[]>([]);
  const [notes, setNotes] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLiveAi, setIsLiveAi] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Filter chunks by topic if available
  const currentCorpusChunks = allChunks.filter(
    c => c.topic === selectedTopic || selectedTopic === 'All Topics' || selectedTopic === 'Computer Networks'
  );

  const handleSearchAndGenerate = async () => {
    if (!searchQuery.trim()) return;
    setIsGenerating(true);

    // 1. Vector Similarity Top-K Retrieval
    const searchResults = performVectorSearch(searchQuery, currentCorpusChunks.length > 0 ? currentCorpusChunks : allChunks, 3);
    setRetrievedChunks(searchResults);

    // 2. Synthesize Study Guide Notes
    const { notes: generatedText, isLiveAi: liveFlag } = await generatePersonalizedNotes(
      searchQuery,
      activeBloomsLevel,
      searchResults
    );

    setNotes(generatedText);
    setIsLiveAi(liveFlag);
    setIsGenerating(false);
  };

  useEffect(() => {
    handleSearchAndGenerate();
  }, [selectedTopic, activeBloomsLevel]);

  const handleCopy = () => {
    navigator.clipboard.writeText(notes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }

      // Strip markdown syntax for natural reading
      const cleanText = notes
        .replace(/[#*`>|-]/g, '')
        .replace(/\[.*?\]\(.*?\)/g, '');

      const utterance = new SpeechSynthesisUtterance(cleanText.slice(0, 500));
      utterance.rate = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Search & RAG Input Banner */}
      <div className="gradient-border">
        <div className="gradient-border-inner p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Textbook-Grounded Personalised Study Notes
              </h2>
              <p className="text-xs text-gray-400">
                Retrieves relevant textbook vectors and synthesizes notes adapted to Bloom's Taxonomy cognitive level.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                Corpus: {selectedTopic}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search topic or concept (e.g. OSI Encryption, Deadlock Avoidance, AVL Trees)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchAndGenerate()}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-500"
              />
            </div>
            <button
              onClick={handleSearchAndGenerate}
              disabled={isGenerating}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Retrieving Chunks...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4" />
                  Generate Notes
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bloom's Taxonomy Cognitive Level Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            Select Bloom's Taxonomy Cognitive Level:
          </h3>
          <span className="text-xs text-gray-500 font-mono">Higher cognitive levels generate deeper analytical synthesis</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {(Object.keys(BLOOMS_LEVELS) as BloomsLevel[]).map((levelKey) => {
            const meta = BLOOMS_LEVELS[levelKey];
            const isSelected = activeBloomsLevel === levelKey;

            return (
              <button
                key={levelKey}
                onClick={() => setActiveBloomsLevel(levelKey)}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? `${meta.bgColor} ${meta.borderColor} ring-1 ring-white/20 shadow-lg`
                    : 'bg-gray-900/60 border-gray-800 hover:bg-gray-800/40 text-gray-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${meta.badge}`}>
                    {meta.name}
                  </span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
                <p className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                  {meta.verb}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Top-K Vector Chunks (Left) & Generated Notes (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Top-K Vector Retrieval Inspector (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel rounded-2xl p-4 border border-gray-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-cyan-400" />
                Retrieved Context Chunks (Top-3)
              </h4>
              <span className="text-[10px] font-mono text-cyan-400">Cosine Similarity</span>
            </div>

            {retrievedChunks.length === 0 ? (
              <div className="text-center py-6 text-xs text-gray-500">
                No vector search executed yet. Click Generate Notes to inspect matched chunks.
              </div>
            ) : (
              <div className="space-y-3">
                {retrievedChunks.map((res, i) => (
                  <div
                    key={res.chunk.id}
                    className="bg-gray-950/80 border border-gray-800 rounded-xl p-3 space-y-2 hover:border-cyan-500/30 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="text-xs font-bold text-white line-clamp-1">
                        #{i + 1} {res.chunk.title}
                      </h5>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60 whitespace-nowrap">
                        {Math.round(res.similarityScore * 100)}% Match
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-400 line-clamp-3 leading-relaxed">
                      "{res.chunk.content}"
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-gray-500 pt-1 border-t border-gray-900">
                      <span>Source: {res.chunk.source}</span>
                      <span>Page {res.chunk.page || 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Quiz Callout */}
          <div className="glass-card rounded-2xl p-4 border border-purple-500/20 bg-purple-950/20 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              <div>
                <h5 className="text-xs font-bold text-white">Test Knowledge Mastery</h5>
                <p className="text-[11px] text-gray-400">Quiz grounded on {BLOOMS_LEVELS[activeBloomsLevel].name} level</p>
              </div>
            </div>
            <button
              onClick={() => onStartQuiz(selectedTopic, activeBloomsLevel)}
              className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/20"
            >
              Start Quiz on {selectedTopic}
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Synthesized Personalised Study Notes Display (8 cols) */}
        <div className="lg:col-span-8">
          <div className="glass-panel rounded-2xl border border-gray-800 p-6 space-y-4 min-h-[500px]">
            
            {/* Header Toolbar */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${BLOOMS_LEVELS[activeBloomsLevel].badge}`}>
                  {BLOOMS_LEVELS[activeBloomsLevel].name} Notes
                </span>
                <span className="text-xs text-gray-400">
                  {isLiveAi ? '⚡ Live Gemini 1.5 Flash' : '🔒 Grounded RAG Generator'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleTextToSpeech}
                  className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                    isPlayingAudio ? 'bg-cyan-500 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  title="Audio Read Aloud"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  {isPlayingAudio ? 'Stop' : 'Listen'}
                </button>

                <button
                  onClick={handleCopy}
                  className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
                  title="Copy Markdown"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Markdown Rendered Content */}
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-3">
                <div className="w-8 h-8 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-cyan-400 font-mono">Synthesizing textbook content across Bloom's vectors...</p>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none text-xs sm:text-sm leading-relaxed text-gray-200 whitespace-pre-line font-sans space-y-4">
                {notes}
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};

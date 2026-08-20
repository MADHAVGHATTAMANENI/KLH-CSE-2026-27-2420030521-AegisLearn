import React, { useState } from 'react';
import { Upload, Database, Layers, Search, FileText, CheckCircle2, Sliders, Sparkles } from 'lucide-react';
import { TextbookChunk, CorpusDoc } from '../../types';
import { chunkUploadedText, performVectorSearch } from '../../utils/ragEngine';

interface CorpusUploaderProps {
  onAddChunks: (chunks: TextbookChunk[]) => void;
  allChunks: TextbookChunk[];
}

export const CorpusUploader: React.FC<CorpusUploaderProps> = ({ onAddChunks, allChunks }) => {
  const [corpusTitle, setCorpusTitle] = useState('');
  const [corpusTopic, setCorpusTopic] = useState('Computer Networks');
  const [inputText, setInputText] = useState('');
  const [chunkSize, setChunkSize] = useState(300);
  const [chunkOverlap, setChunkOverlap] = useState(50);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Similarity Search Tester state
  const [testQuery, setTestQuery] = useState('TCP IP Framing and Error Control');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleProcessAndIndex = () => {
    if (!corpusTitle.trim() || !inputText.trim()) return;
    setIsProcessing(true);

    setTimeout(() => {
      const generatedChunks = chunkUploadedText(inputText, corpusTitle, corpusTopic);
      onAddChunks(generatedChunks);
      setIsProcessing(false);
      setSuccessMsg(`Successfully chunked and vector-indexed ${generatedChunks.length} chunks!`);
      setInputText('');
      setCorpusTitle('');
      setTimeout(() => setSuccessMsg(''), 4000);
    }, 1000);
  };

  const handleRunSimilarityTest = () => {
    if (!testQuery.trim()) return;
    const res = performVectorSearch(testQuery, allChunks, 3);
    setSearchResults(res);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-purple-500/20 bg-purple-950/10 space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Educator Corpus & Syllabus Indexing Console</h2>
            <p className="text-xs text-gray-400">
              Upload textbook material, configure chunking strategies, inspect vector embeddings, and test similarity matching.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Upload & Chunk Config (Left 6 cols) & Vector Similarity Tester (Right 6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Upload & Chunking Form */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-gray-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-gray-800 pb-3">
            <Upload className="w-4 h-4 text-purple-400" />
            Upload New Textbook Corpus / Syllabus
          </h3>

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {successMsg}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Document Title</label>
              <input
                type="text"
                placeholder="e.g. Kurose Ross Networking Ch. 4"
                value={corpusTitle}
                onChange={(e) => setCorpusTitle(e.target.value)}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-1 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Subject Topic</label>
              <select
                value={corpusTopic}
                onChange={(e) => setCorpusTopic(e.target.value)}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl px-3 py-2 text-xs text-purple-300 focus:outline-none"
              >
                <option value="Computer Networks">Computer Networks</option>
                <option value="Operating System">Operating System</option>
                <option value="Programming and Data Structure">Data Structures</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Computer Organization and Architecture">COA</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Chunk Size (Words)</label>
              <input
                type="number"
                value={chunkSize}
                onChange={(e) => setChunkSize(Number(e.target.value))}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Chunk Overlap (Words)</label>
              <input
                type="number"
                value={chunkOverlap}
                onChange={(e) => setChunkOverlap(Number(e.target.value))}
                className="w-full bg-gray-950 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Raw Text / Academic Material</label>
            <textarea
              rows={6}
              placeholder="Paste raw textbook chapters, lecture notes, or syllabus content..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl p-3 text-xs text-white focus:ring-1 focus:ring-purple-500 focus:outline-none font-mono"
            />
          </div>

          <button
            onClick={handleProcessAndIndex}
            disabled={isProcessing || !corpusTitle.trim() || !inputText.trim()}
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-purple-600/20 disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isProcessing ? 'Processing Chunking & Vectors...' : 'Chunk & Index Corpus'}
          </button>
        </div>

        {/* Vector Similarity Test Bench */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-gray-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-gray-800 pb-3">
            <Sliders className="w-4 h-4 text-cyan-400" />
            Vector Similarity Search Test Bench
          </h3>

          <p className="text-xs text-gray-400">
            Test how queries match indexed textbook chunks using term frequency and cosine similarity metrics.
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter test query..."
              value={testQuery}
              onChange={(e) => setTestQuery(e.target.value)}
              className="flex-1 bg-gray-950 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            />
            <button
              onClick={handleRunSimilarityTest}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl flex items-center gap-1"
            >
              <Search className="w-3.5 h-3.5" /> Test
            </button>
          </div>

          <div className="space-y-3 pt-2">
            {searchResults.map((res, i) => (
              <div key={i} className="p-3 rounded-xl bg-gray-950 border border-gray-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-400">Match #{i + 1}: {res.chunk.title}</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {(res.similarityScore * 100).toFixed(1)}% Sim Score
                  </span>
                </div>
                <p className="text-gray-300 line-clamp-2">{res.chunk.content}</p>
                <div className="flex gap-1 text-[10px] text-gray-500">
                  <span>Matched: {res.matchedKeywords.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Active Indexed Corpora Table */}
      <div className="glass-panel rounded-2xl p-6 border border-gray-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-400" />
          Active Vector Indexed Academic Corpora ({allChunks.length} Total Chunks)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-gray-900/80 text-gray-400 uppercase font-bold text-[10px] border-b border-gray-800">
              <tr>
                <th className="p-3">Chunk ID</th>
                <th className="p-3">Title</th>
                <th className="p-3">Topic</th>
                <th className="p-3">Source Reference</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {allChunks.slice(0, 6).map((c) => (
                <tr key={c.id} className="hover:bg-gray-800/30">
                  <td className="p-3 font-mono text-cyan-400">{c.id}</td>
                  <td className="p-3 font-semibold text-white">{c.title}</td>
                  <td className="p-3">{c.topic}</td>
                  <td className="p-3 text-gray-400">{c.source}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Indexed
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

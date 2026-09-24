import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { StudyGuideView } from './components/StudentPortal/StudyGuideView';
import { QuizView } from './components/StudentPortal/QuizView';
import { MasteryDashboard } from './components/StudentPortal/MasteryDashboard';
import { RemedialRoadmap } from './components/StudentPortal/RemedialRoadmap';
import { CorpusUploader } from './components/EducatorPortal/CorpusUploader';
import { AdminDashboard } from './components/AdminConsole/AdminDashboard';
import { EvaluationLab } from './components/RagLab/EvaluationLab';

import { SAMPLE_TEXTBOOK_CHUNKS } from './data/textbookCorpus';
import { SAMPLE_QUESTIONS } from './data/questionBank';
import { BloomsLevel, QuizAttempt, StudentProgress, TextbookChunk } from './types';
import { BookOpen, Brain, Award, Target } from 'lucide-react';

export function App() {
  const [activePortal, setActivePortal] = useState<'student' | 'educator' | 'admin' | 'evaluation'>('student');
  const [studentTab, setStudentTab] = useState<'study' | 'quiz' | 'mastery' | 'remedial'>('study');
  
  const [selectedTopic, setSelectedTopic] = useState<string>('Computer Networks');
  const [quizBloomsTarget, setQuizBloomsTarget] = useState<BloomsLevel>('understand');
  
  const [allChunks, setAllChunks] = useState<TextbookChunk[]>(SAMPLE_TEXTBOOK_CHUNKS);
  const [questions, setQuestions] = useState(SAMPLE_QUESTIONS);

  const [studentProgress, setStudentProgress] = useState<StudentProgress>({
    studentId: 'std-2420030521',
    name: 'Madhav Ghattamaneni',
    overallMastery: 78,
    bloomsMastery: {
      remember: 88,
      understand: 92,
      apply: 74,
      analyze: 68,
      evaluate: 70,
      create: 65,
    },
    topicMastery: {
      'Computer Networks': 82,
      'Operating System': 75,
      'Programming and Data Structure': 85,
      'Mathematics': 70,
      'Computer Organization and Architecture': 72,
      'Digital Logic': 80,
      'Theory of Computation': 68,
      'General Aptitude': 90,
    },
    completedQuizzes: [
      {
        id: 'quiz-prev-01',
        date: '2026-08-19',
        topic: 'Computer Networks',
        score: 80,
        totalQuestions: 5,
        bloomsBreakdown: {
          remember: { correct: 2, total: 2 },
          understand: { correct: 1, total: 1 },
          apply: { correct: 1, total: 1 },
          analyze: { correct: 0, total: 1 },
          evaluate: { correct: 0, total: 0 },
          create: { correct: 0, total: 0 },
        }
      }
    ],
    weaknessAreas: [
      'Session Layer EncryptionSniffing Visibility',
      'TLB Memory Access Effective Access Time',
      'AVL Tree Height Balance Rotations'
    ]
  });

  const availableTopics = [
    'Computer Networks',
    'Operating System',
    'Programming and Data Structure',
    'Mathematics',
    'Computer Organization and Architecture',
    'Digital Logic',
    'Theory of Computation',
    'General Aptitude'
  ];

  const handleStartQuizFromGuide = (topic: string, bloomsLevel: BloomsLevel) => {
    setSelectedTopic(topic);
    setQuizBloomsTarget(bloomsLevel);
    setStudentTab('quiz');
  };

  const handleCompleteQuiz = (attempt: QuizAttempt) => {
    setStudentProgress(prev => {
      const updatedQuizzes = [attempt, ...prev.completedQuizzes];
      const newScore = Math.round(
        updatedQuizzes.reduce((acc, q) => acc + q.score, 0) / updatedQuizzes.length
      );

      return {
        ...prev,
        overallMastery: newScore,
        completedQuizzes: updatedQuizzes
      };
    });
  };

  const handleAddCorpusChunks = (newChunks: TextbookChunk[]) => {
    setAllChunks(prev => [...newChunks, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        activePortal={activePortal}
        setActivePortal={setActivePortal}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        availableTopics={availableTopics}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* STUDENT PORTAL */}
        {activePortal === 'student' && (
          <div className="space-y-6">
            
            {/* Student Portal Sub-Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-gray-800 pb-3 overflow-x-auto">
              <button
                onClick={() => setStudentTab('study')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  studentTab === 'study'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/40'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Personalised Study Guide
              </button>

              <button
                onClick={() => setStudentTab('quiz')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  studentTab === 'quiz'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm shadow-purple-500/10'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/40'
                }`}
              >
                <Brain className="w-4 h-4" />
                Interactive Quiz
              </button>

              <button
                onClick={() => setStudentTab('mastery')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  studentTab === 'mastery'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/40'
                }`}
              >
                <Award className="w-4 h-4" />
                Mastery Dashboard
              </button>

              <button
                onClick={() => setStudentTab('remedial')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  studentTab === 'remedial'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/40'
                }`}
              >
                <Target className="w-4 h-4" />
                Remedial Roadmap
              </button>
            </div>

            {/* Active Sub-Tab View */}
            {studentTab === 'study' && (
              <StudyGuideView
                selectedTopic={selectedTopic}
                allChunks={allChunks}
                onStartQuiz={handleStartQuizFromGuide}
              />
            )}

            {studentTab === 'quiz' && (
              <QuizView
                initialTopic={selectedTopic}
                initialBloomsLevel={quizBloomsTarget}
                questionBank={questions}
                onCompleteQuiz={handleCompleteQuiz}
              />
            )}

            {studentTab === 'mastery' && (
              <MasteryDashboard progress={studentProgress} />
            )}

            {studentTab === 'remedial' && (
              <RemedialRoadmap
                onStudyTopic={(top, lvl) => {
                  setSelectedTopic(top);
                  setStudentTab('study');
                }}
              />
            )}
          </div>
        )}

        {/* EDUCATOR PORTAL */}
        {activePortal === 'educator' && (
          <CorpusUploader onAddChunks={handleAddCorpusChunks} allChunks={allChunks} />
        )}

        {/* ADMIN CONSOLE */}
        {activePortal === 'admin' && (
          <AdminDashboard />
        )}

        {/* RAG EVALUATION LAB */}
        {activePortal === 'evaluation' && (
          <EvaluationLab />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-[#0b0f19] py-4 text-center text-xs text-gray-500 space-y-1">
        <p>AegisLearn Framework &copy; 2026 | KL University CSE Research Project</p>
        <p className="text-[11px] text-gray-600">
          Developed by Madhav Ghattamaneni, Avinash Yarukala, Masuma Fathema, K V S Jaswanth | Supervised by Dr. K. Swanthana
        </p>
      </footer>

    </div>
  );
}

export default App;

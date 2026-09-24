import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Clock, Award, RotateCcw, Brain, ArrowRight, HelpCircle, BookOpen } from 'lucide-react';
import { Question, BloomsLevel, QuizAttempt } from '../../types';
import { BLOOMS_LEVELS } from '../../data/bloomsMeta';

interface QuizViewProps {
  initialTopic: string;
  initialBloomsLevel?: BloomsLevel;
  questionBank: Question[];
  onCompleteQuiz: (attempt: QuizAttempt) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  initialTopic,
  initialBloomsLevel = 'understand',
  questionBank,
  onCompleteQuiz,
}) => {
  const [quizTopic, setQuizTopic] = useState(initialTopic);
  const [quizBlooms, setQuizBlooms] = useState<BloomsLevel>(initialBloomsLevel);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [answersHistory, setAnswersHistory] = useState<{ questionId: string; isCorrect: boolean; level: BloomsLevel }[]>([]);

  // Filter questions for current configuration
  const startQuiz = () => {
    let filtered = questionBank.filter(q => q.topic === quizTopic || quizTopic === 'All Topics');
    if (filtered.length === 0) {
      filtered = questionBank;
    }

    // Shuffle and pick 5 questions
    const shuffled = [...filtered].sort(() => Math.random() - 0.5).slice(0, 5);
    setActiveQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
    setTimeLeft(180);
    setAnswersHistory([]);
  };

  useEffect(() => {
    startQuiz();
  }, [quizTopic, quizBlooms]);

  // Timer countdown
  useEffect(() => {
    if (quizCompleted || activeQuestions.length === 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizCompleted, activeQuestions]);

  const currentQ = activeQuestions[currentIndex];

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted || !currentQ) return;

    const isCorrect = selectedOption === currentQ.correctAnswer;
    if (isCorrect) setScore(prev => prev + 1);

    setAnswersHistory(prev => [
      ...prev,
      { questionId: currentQ.id, isCorrect, level: currentQ.bloomsLevel }
    ]);
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizCompleted(true);
    
    // Trigger confetti celebration if score >= 60%
    if (score >= Math.ceil(activeQuestions.length * 0.6)) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    // Record quiz attempt metadata
    const breakdown: Record<BloomsLevel, { correct: number; total: number }> = {
      remember: { correct: 0, total: 0 },
      understand: { correct: 0, total: 0 },
      apply: { correct: 0, total: 0 },
      analyze: { correct: 0, total: 0 },
      evaluate: { correct: 0, total: 0 },
      create: { correct: 0, total: 0 },
    };

    answersHistory.forEach(a => {
      if (breakdown[a.level]) {
        breakdown[a.level].total += 1;
        if (a.isCorrect) breakdown[a.level].correct += 1;
      }
    });

    onCompleteQuiz({
      id: `quiz-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      topic: quizTopic,
      score: Math.round((score / Math.max(1, activeQuestions.length)) * 100),
      totalQuestions: activeQuestions.length,
      bloomsBreakdown: breakdown
    });
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Quiz Controls Header */}
      <div className="glass-panel rounded-2xl p-4 border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-cyan-400" />
            Interactive Adaptive Quiz Engine
          </h2>
          <p className="text-xs text-gray-400">Questions derived from textbook corpus & GATE/OpenStax question banks</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={quizTopic}
            onChange={(e) => setQuizTopic(e.target.value)}
            className="bg-gray-900 border border-gray-700 text-xs rounded-lg px-3 py-1.5 text-cyan-300 focus:outline-none"
          >
            <option value="Computer Networks">Computer Networks</option>
            <option value="Operating System">Operating System</option>
            <option value="Programming and Data Structure">Data Structures</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Computer Organization and Architecture">COA</option>
            <option value="Digital Logic">Digital Logic</option>
            <option value="Theory of Computation">Theory of Computation</option>
          </select>

          <button
            onClick={startQuiz}
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-200 rounded-lg flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restart
          </button>
        </div>
      </div>

      {!quizCompleted && currentQ && (
        <div className="glass-panel rounded-2xl p-6 border border-gray-800 space-y-6">
          
          {/* Progress & Timer Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-cyan-400">Question {currentIndex + 1} of {activeQuestions.length}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${BLOOMS_LEVELS[currentQ.bloomsLevel]?.badge}`}>
                {BLOOMS_LEVELS[currentQ.bloomsLevel]?.name} Level
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
              <Clock className="w-3.5 h-3.5" />
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed whitespace-pre-line">
              {currentQ.question}
            </h3>
          </div>

          {/* Option Buttons */}
          <div className="space-y-3">
            {currentQ.options.map((optionText, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isCorrect = optIdx === currentQ.correctAnswer;
              
              let style = 'bg-gray-900/80 border-gray-800 hover:border-cyan-500/40 text-gray-200';
              if (isAnswerSubmitted) {
                if (isCorrect) {
                  style = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-medium';
                } else if (isSelected) {
                  style = 'bg-rose-950/80 border-rose-500 text-rose-200';
                }
              } else if (isSelected) {
                style = 'bg-cyan-950/80 border-cyan-500 text-white font-medium ring-1 ring-cyan-500';
              }

              return (
                <button
                  key={optIdx}
                  disabled={isAnswerSubmitted}
                  onClick={() => setSelectedOption(optIdx)}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start justify-between gap-3 ${style}`}
                >
                  <span className="flex-1">{optionText}</span>
                  {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                  {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Instant RAG Explanation Panel */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                <BookOpen className="w-4 h-4" />
                Textbook Grounded RAG Explanation
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Submit / Next Action Bar */}
          <div className="flex items-center justify-end gap-3 pt-2">
            {!isAnswerSubmitted ? (
              <button
                disabled={selectedOption === null}
                onClick={handleSubmitAnswer}
                className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 text-black font-bold text-xs rounded-xl transition-all shadow-md shadow-cyan-500/20"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-purple-500/20 flex items-center gap-1.5"
              >
                {currentIndex + 1 < activeQuestions.length ? 'Next Question' : 'View Results'}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      )}

      {/* Completion Summary Card */}
      {quizCompleted && (
        <div className="glass-panel rounded-2xl p-8 border border-gray-800 text-center space-y-6 max-w-xl mx-auto">
          <div className="inline-flex p-4 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-white">Quiz Completed!</h3>
            <p className="text-xs text-gray-400 mt-1">Topic: {quizTopic}</p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-950 border border-gray-800 space-y-2">
            <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              {Math.round((score / Math.max(1, activeQuestions.length)) * 100)}%
            </div>
            <p className="text-xs font-semibold text-gray-300">
              You answered {score} out of {activeQuestions.length} questions correctly.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={startQuiz}
              className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Retake Quiz
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

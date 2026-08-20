export type BloomsLevel = 
  | 'remember' 
  | 'understand' 
  | 'apply' 
  | 'analyze' 
  | 'evaluate' 
  | 'create';

export interface BloomsMeta {
  id: BloomsLevel;
  name: string;
  verb: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  badge: string;
}

export interface TextbookChunk {
  id: string;
  title: string;
  topic: string;
  content: string;
  source: string;
  page?: number;
  bloomsTarget?: BloomsLevel[];
  tags: string[];
}

export interface Question {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-based index
  bloomsLevel: BloomsLevel;
  explanation: string;
  contextChunkId?: string;
}

export interface RAGSearchResult {
  chunk: TextbookChunk;
  similarityScore: number; // 0.0 to 1.0
  matchedKeywords: string[];
}

export interface QuizAttempt {
  id: string;
  date: string;
  topic: string;
  score: number;
  totalQuestions: number;
  bloomsBreakdown: Record<BloomsLevel, { correct: number; total: number }>;
}

export interface StudentProgress {
  studentId: string;
  name: string;
  overallMastery: number; // 0 to 100
  bloomsMastery: Record<BloomsLevel, number>; // 0 to 100
  topicMastery: Record<string, number>;
  completedQuizzes: QuizAttempt[];
  weaknessAreas: string[];
}

export interface RemedialItem {
  id: string;
  topic: string;
  bloomsLevel: BloomsLevel;
  issueSummary: string;
  suggestedAction: string;
  recommendedChunks: TextbookChunk[];
  estimatedMinutes: number;
  completed: boolean;
}

export interface CorpusDoc {
  id: string;
  title: string;
  topic: string;
  source: string;
  totalChunks: number;
  totalWords: number;
  uploadDate: string;
  status: 'indexed' | 'processing' | 'failed';
  sampleChunks: TextbookChunk[];
}

export interface RAGEvaluation {
  query: string;
  retrievedChunkCount: number;
  faithfulnessScore: number; // 0-100%
  answerRelevanceScore: number; // 0-100%
  precisionAtK: number; // 0-1.0
  recallAtK: number; // 0-1.0
  groundedAnswer: string;
  nonRagAnswer: string;
}

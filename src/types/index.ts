import type { ExamType, EducationLevel } from '../constants/examTypes';

export interface User {
  id: string;
  name: string;
  email?: string;
  educationLevel?: EducationLevel;
  examType: ExamType;
  targetScore: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  solution: string;
  explanation: string;
}

export interface TestResult {
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  emptyCount: number;
  score: number;
  answers: AnswerResult[];
  subjects: Record<string, { correct: number; total: number }>;
}

export interface AnswerResult {
  questionId: string;
  selectedAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  question: string;
  solution: string;
  explanation: string;
}

export interface StudyPlan {
  weeklyPlan: string;
  dailyGoals: string;
  questionTargets: string;
  focusAreas: string[];
  estimatedDuration: string;
}

export interface UserProfile extends User {
  lastAssessment?: TestResult;
  weakAreas?: string[];
  lastAnalysis?: string;
  studyPlan?: StudyPlan;
}

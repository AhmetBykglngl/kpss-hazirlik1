import Constants from 'expo-constants';
import type { Question, TestResult, StudyPlan } from '../types';
import type { ExamType } from '../constants/examTypes';

// API adresi – .env'deki EXPO_PUBLIC_API_URL veya varsayılan 3002
const API_URL =
  (process.env.EXPO_PUBLIC_API_URL || Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3002')
    .toString()
    .trim()
    .replace(/\/$/, '') || 'http://localhost:3002';

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  let res: Response;
  try {
    res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Bağlantı hatası';
    const isNetwork = msg.includes('fetch') || msg.includes('Failed') || msg.includes('Network');
    const isLocal = typeof window !== 'undefined' && /localhost|127\.0\.0\.1/.test(window.location?.origin || '');
    const apiMessage = isLocal
      ? 'API\'ya ulaşılamıyor. Lütfen "npm run api" veya "npm run dev" ile API\'yı başlatın.'
      : 'Soru bankası ve testler canlı sitede çalışması için API yayında olmalı. Render.com\'da API\'yi yayınlayıp Vercel\'de EXPO_PUBLIC_API_URL ekleyin (proje DEPLOY.md).';
    throw new Error(isNetwork ? apiMessage : msg);
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = (err as { message?: string })?.message || `API Hatası: ${res.status}`;
    throw new Error(
      res.status === 404
        ? `API endpoint bulunamadı (404). API'yı yeniden başlatın: npm run api`
        : msg
    );
  }
  return res.json();
}

export async function generateAssessmentTest(
  examType: ExamType,
  questionCount: number = 10
): Promise<Question[]> {
  return fetchAPI<Question[]>('/api/assessment-test', {
    method: 'POST',
    body: JSON.stringify({ examType, questionCount }),
  });
}

export async function generateDenemeTest(
  year: number,
  examType: ExamType,
  questionCount: number = 120,
  sessionSeed?: number,
  tier?: 'normal' | 'zor' | 'cokZor'
): Promise<Question[]> {
  return fetchAPI<Question[]>('/api/deneme-test', {
    method: 'POST',
    body: JSON.stringify({
      year,
      examType,
      questionCount,
      sessionSeed: sessionSeed ?? Date.now(),
      tier: tier ?? 'normal',
    }),
  });
}

export async function generatePracticeTest(
  examType: ExamType,
  weakAreas: string[],
  questionCount: number = 10
): Promise<Question[]> {
  return fetchAPI<Question[]>('/api/practice-test', {
    method: 'POST',
    body: JSON.stringify({ examType, weakAreas, questionCount }),
  });
}

export async function analyzeResults(
  examType: ExamType,
  targetScore: string,
  result: TestResult
): Promise<{
  analysis: string;
  weakAreas: string[];
  recommendations: string[];
}> {
  return fetchAPI<{
    analysis: string;
    weakAreas: string[];
    recommendations: string[];
  }>('/api/analyze-results', {
    method: 'POST',
    body: JSON.stringify({ examType, targetScore, result }),
  });
}

export async function getQuestionsBySubjectTopic(
  subject: string,
  topic: string,
  examType: ExamType,
  startFrom: number,
  sessionSeed?: number
): Promise<Question[]> {
  try {
    return await fetchAPI<Question[]>('/api/questions-by-subject-topic', {
      method: 'POST',
      body: JSON.stringify({
        subject,
        topic,
        examType,
        startFrom,
        sessionSeed: sessionSeed ?? Date.now(),
      }),
    });
  } catch {
    const { getQuestionsBySubjectTopicFallback } = await import('../data/questionsFallback');
    return getQuestionsBySubjectTopicFallback(subject, topic, startFrom);
  }
}

export async function getKpssPdfs(): Promise<{ name: string; url: string }[]> {
  return fetchAPI<{ name: string; url: string }[]>('/api/kpss-pdfs', { method: 'GET' });
}

export async function getKpssNotlar(): Promise<{ name: string; url: string }[]> {
  return fetchAPI<{ name: string; url: string }[]>('/api/kpss-notlar', { method: 'GET' });
}

export function getPdfFullUrl(relativeUrl: string): string {
  return `${API_URL.replace(/\/$/, '')}${relativeUrl}`;
}

export async function generateStudyPlan(
  examType: ExamType,
  targetScore: string,
  weakAreas: string[],
  analysis: string
): Promise<StudyPlan> {
  return fetchAPI<StudyPlan>('/api/study-plan', {
    method: 'POST',
    body: JSON.stringify({
      examType,
      targetScore,
      weakAreas,
      analysis,
    }),
  });
}

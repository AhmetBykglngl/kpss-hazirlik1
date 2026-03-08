import Constants from 'expo-constants';
import type { Question, TestResult, StudyPlan } from '../types';
import type { ExamType } from '../constants/examTypes';
import { getQuestionsBySubjectTopicFallback, QUESTIONS_FALLBACK } from '../data/questionsFallback';
import { NOTLAR_FALLBACK, PDFS_FALLBACK } from '../data/staticPdfLists';

// API adresi – .env'deki EXPO_PUBLIC_API_URL veya varsayılan 3002
const API_URL =
  (process.env.EXPO_PUBLIC_API_URL || Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3002')
    .toString()
    .trim()
    .replace(/\/$/, '') || 'http://localhost:3002';

/** Canlı API yanıt süresi (Render cold start dahil). Bu süre aşılınca fallback kullanılır. */
const API_TIMEOUT_MS = 20000;

function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeout?: number } = {}
): Promise<Response> {
  const { timeout = API_TIMEOUT_MS, ...fetchOptions } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  return fetch(url, {
    ...fetchOptions,
    signal: controller.signal,
  }).finally(() => clearTimeout(id));
}

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  let res: Response;
  try {
    res = await fetchWithTimeout(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Bağlantı hatası';
    const isAbort = msg.includes('abort') || (e instanceof Error && e.name === 'AbortError');
    const isNetwork =
      isAbort || msg.includes('fetch') || msg.includes('Failed') || msg.includes('Network');
    const isLocal =
      typeof window !== 'undefined' &&
      /localhost|127\.0\.0\.1/.test(window.location?.origin || '');
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
  try {
    return await fetchAPI<Question[]>('/api/assessment-test', {
      method: 'POST',
      body: JSON.stringify({ examType, questionCount }),
    });
  } catch {
    const count = Math.min(questionCount, QUESTIONS_FALLBACK.length);
    return QUESTIONS_FALLBACK.slice(0, count).map((q, i) => ({ ...q, id: `assess-fb-${i}` }));
  }
}

export async function generateDenemeTest(
  year: number,
  examType: ExamType,
  questionCount: number = 120,
  sessionSeed?: number,
  tier?: 'normal' | 'zor' | 'cokZor'
): Promise<Question[]> {
  try {
    return await fetchAPI<Question[]>('/api/deneme-test', {
      method: 'POST',
      body: JSON.stringify({
        year,
        examType,
        questionCount,
        sessionSeed: sessionSeed ?? Date.now(),
        tier: tier ?? 'normal',
      }),
    });
  } catch {
    const count = Math.min(questionCount, QUESTIONS_FALLBACK.length);
    return QUESTIONS_FALLBACK.slice(0, count).map((q, i) => ({ ...q, id: `deneme-fb-${year}-${i}` }));
  }
}

export async function generatePracticeTest(
  examType: ExamType,
  weakAreas: string[],
  questionCount: number = 10
): Promise<Question[]> {
  try {
    return await fetchAPI<Question[]>('/api/practice-test', {
      method: 'POST',
      body: JSON.stringify({ examType, weakAreas, questionCount }),
    });
  } catch {
    const count = Math.min(questionCount, QUESTIONS_FALLBACK.length);
    return QUESTIONS_FALLBACK.slice(0, count).map((q, i) => ({ ...q, id: `practice-fb-${i}` }));
  }
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
  try {
    return await fetchAPI<{
      analysis: string;
      weakAreas: string[];
      recommendations: string[];
    }>('/api/analyze-results', {
      method: 'POST',
      body: JSON.stringify({ examType, targetScore, result }),
    });
  } catch {
    const { correctCount, totalQuestions, subjects } = result;
    const puan = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const weakAreas = subjects
      ? Object.entries(subjects)
          .filter(([, d]) => d.total > 0 && d.correct / d.total < 0.5)
          .map(([s]) => s)
      : [];
    if (weakAreas.length === 0 && subjects) {
      const worst = Object.entries(subjects).sort(
        (a, b) =>
          (a[1].total > 0 ? a[1].correct / a[1].total : 1) -
          (b[1].total > 0 ? b[1].correct / b[1].total : 1)
      )[0];
      if (worst) weakAreas.push(worst[0]);
    }
    return {
      analysis: `Seviye testi sonucunuz: ${puan} puan (${correctCount}/${totalQuestions}). Hedef: ${targetScore}. ${weakAreas.length > 0 ? `Zayıf alanlar: ${weakAreas.join(', ')}.` : 'Tüm derslere dengeli çalışmaya devam edin.'}`,
      weakAreas: weakAreas.length > 0 ? weakAreas : ['Türkçe'],
      recommendations: [
        'Her gün düzenli soru çözün.',
        'Yanlış soruları mutlaka inceleyin.',
        weakAreas.length > 0 ? `${weakAreas.join(' ve ')} konularına ekstra zaman ayırın.` : 'Konu tekrarı yapın.',
      ],
    };
  }
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
    return getQuestionsBySubjectTopicFallback(subject, topic, startFrom);
  }
}

export async function getKpssPdfs(): Promise<{ name: string; url: string }[]> {
  try {
    return await fetchAPI<{ name: string; url: string }[]>('/api/kpss-pdfs', { method: 'GET' });
  } catch {
    return PDFS_FALLBACK;
  }
}

export async function getKpssNotlar(): Promise<{ name: string; url: string }[]> {
  try {
    return await fetchAPI<{ name: string; url: string }[]>('/api/kpss-notlar', { method: 'GET' });
  } catch {
    return NOTLAR_FALLBACK;
  }
}

/** PDF/not linki: canlıda uygulama origin'inden (Vercel), yoksa API URL'inden. */
export function getPdfFullUrl(relativeUrl: string): string {
  const base =
    typeof window !== 'undefined' ? window.location.origin : API_URL.replace(/\/$/, '');
  const path = relativeUrl.startsWith('/') ? relativeUrl : `/${relativeUrl}`;
  return `${base}${path}`;
}

export async function generateStudyPlan(
  examType: ExamType,
  targetScore: string,
  weakAreas: string[],
  _analysis: string
): Promise<StudyPlan> {
  try {
    return await fetchAPI<StudyPlan>('/api/study-plan', {
      method: 'POST',
      body: JSON.stringify({
        examType,
        targetScore,
        weakAreas,
        analysis: _analysis,
      }),
    });
  } catch {
    const focus = weakAreas.length > 0 ? weakAreas : ['Türkçe', 'Matematik', 'Tarih', 'Coğrafya', 'Vatandaşlık', 'Güncel Bilgiler'];
    return {
      weeklyPlan: `Haftalık program: ${focus.join(', ')}. Her gün en az 2 dersten çalışın. Hafta sonu genel tekrar.`,
      dailyGoals: `Günde en az 2 farklı ders; konu + soru. Akşam yanlışların incelenmesi.`,
      questionTargets: 'Günde en az 50 soru, haftada 1 soru seti çözün.',
      focusAreas: focus,
      estimatedDuration: '4-6 ay düzenli çalışma',
    };
  }
}

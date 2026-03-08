/**
 * API yokken soru bankasında gösterilecek 120 soruluk fallback (canlı site).
 * API Render'da yayınlanınca tam soru bankası kullanılır.
 * Güncellemek: node scripts/export-fallback-questions.js
 */
import type { Question } from '../types';
import questionsFallback120 from './questionsFallback120.json';

export const QUESTIONS_FALLBACK: Question[] = questionsFallback120 as Question[];

function shuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  let m = out.length;
  while (m) {
    const i = Math.floor(seed % m);
    m--;
    [out[m], out[i]] = [out[i], out[m]];
    seed = Math.floor(seed / 257) || 1;
  }
  return out;
}

export function getQuestionsBySubjectTopicFallback(
  subject: string,
  _topic: string,
  startFrom: number
): Question[] {
  const pool = QUESTIONS_FALLBACK.filter((q) => q.subject === subject);
  if (pool.length === 0) return QUESTIONS_FALLBACK.slice(0, 5);
  const seed = (subject + String(startFrom)).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const shuffled = shuffle(pool, seed);
  const startIdx = Math.max(0, Math.min(startFrom - 1, shuffled.length - 1));
  return shuffled.slice(startIdx).map((q, i) => ({
    ...q,
    id: `fb-${startIdx + i}-${q.id}`,
  }));
}

/**
 * API yokken soru bankasında gösterilecek az sayıda soru (canlı site fallback).
 * API Render'da yayınlanınca tam soru bankası kullanılır.
 */
import type { Question } from '../types';

export const QUESTIONS_FALLBACK: Question[] = [
  {
    id: 'fb-turkce-1',
    question: '"Bu konuda seninle aynı fikirdeyim" cümlesindeki "seninle" sözcüğünün türü nedir?',
    options: ['Zamir', 'Sıfat', 'Zarf', 'Edat'],
    correctAnswer: 0,
    subject: 'Türkçe',
    solution: '"Seninle" sözcüğü sen zamirine "-le" eki getirilerek oluşturulmuştur.',
    explanation: 'Kişi zamirleri: ben, sen, o. "Seninle" = sen + ile birleşik yazım.',
  },
  {
    id: 'fb-matematik-1',
    question: 'Bir sayının 3 katının 5 fazlası 23 ise bu sayı kaçtır?',
    options: ['4', '5', '6', '7'],
    correctAnswer: 2,
    subject: 'Matematik',
    solution: 'Sayı x olsun: 3x + 5 = 23 → 3x = 18 → x = 6',
    explanation: '3·6 + 5 = 23 ✓',
  },
  {
    id: 'fb-tarih-1',
    question: 'Türkiye Cumhuriyeti hangi yılda ilan edilmiştir?',
    options: ['1920', '1921', '1922', '1923'],
    correctAnswer: 3,
    subject: 'Tarih',
    solution: 'Türkiye Cumhuriyeti 29 Ekim 1923 tarihinde ilan edilmiştir.',
    explanation: 'Cumhuriyet 29 Ekim 1923\'te ilan edildi.',
  },
  {
    id: 'fb-cografya-1',
    question: 'Türkiye\'nin en uzun nehri hangisidir?',
    options: ['Sakarya', 'Kızılırmak', 'Fırat', 'Dicle'],
    correctAnswer: 1,
    subject: 'Coğrafya',
    solution: 'Kızılırmak 1355 km ile Türkiye\'nin en uzun nehridir.',
    explanation: 'Kızılırmak tamamen Türkiye sınırları içindedir.',
  },
  {
    id: 'fb-vatandaslik-1',
    question: 'Türkiye Cumhuriyeti Anayasası\'na göre egemenlik kayıtsız şartsız kime aittir?',
    options: ['TBMM\'ye', 'Cumhurbaşkanına', 'Milletine', 'Hükûmete'],
    correctAnswer: 2,
    subject: 'Vatandaşlık',
    solution: 'Anayasa md. 6: Egemenlik kayıtsız şartsız Milletindir.',
    explanation: 'Millet, egemenliği seçtiği temsilciler aracılığıyla kullanır.',
  },
  {
    id: 'fb-guncel-1',
    question: 'Türkiye\'de 2024 yılı itibarıyla nüfus sayımı hangi kurum tarafından yapılmaktadır?',
    options: ['TÜİK', 'İçişleri Bakanlığı', 'Nüfus Müdürlüğü', 'Belediyeler'],
    correctAnswer: 0,
    subject: 'Güncel Bilgiler',
    solution: 'TÜİK (Türkiye İstatistik Kurumu) nüfus ve demografi verilerini yayımlar.',
    explanation: 'TÜİK, Adrese Dayalı Nüfus Kayıt Sistemi (ADNKS) verilerini kullanır.',
  },
];

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

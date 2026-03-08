// KPSS Sınav Türleri ve Yapıları
export type ExamType = 'kpss-a' | 'kpss-b' | 'kpss-ogretmenlik';

export type EducationLevel = 'ortaogretim' | 'onlisans' | 'lisans';

export interface EducationOption {
  id: EducationLevel;
  name: string;
  description: string;
}

export const EDUCATION_LEVELS: EducationOption[] = [
  {
    id: 'ortaogretim',
    name: 'Ortaöğretim',
    description: 'Lise mezunu – Memur kadroları',
  },
  {
    id: 'onlisans',
    name: 'Önlisans',
    description: '2 yıllık yüksekokul – Memur ve teknik kadrolar',
  },
  {
    id: 'lisans',
    name: 'Lisans',
    description: '4 yıllık üniversite – Tüm KPSS kadroları',
  },
];

export interface ExamOption {
  id: ExamType;
  name: string;
  description: string;
  subjects: string[];
}

// 2025 KPSS güncel konular - Genel Yetenek: Türkçe+Matematik, Genel Kültür: Tarih+Coğrafya+Vatandaşlık+Güncel
export const EXAM_TYPES: ExamOption[] = [
  {
    id: 'kpss-a',
    name: 'KPSS A Grubu',
    description: 'Uzmanlık kadroları (Müfettiş, Uzman Yardımcısı, Kaymakam Adayı vb.)',
    subjects: ['Türkçe', 'Matematik', 'Tarih', 'Coğrafya', 'Vatandaşlık', 'Güncel Bilgiler'],
  },
  {
    id: 'kpss-b',
    name: 'KPSS B Grubu',
    description: 'Memur kadroları (Belediye, Üniversite, Valilik vb.)',
    subjects: ['Türkçe', 'Matematik', 'Tarih', 'Coğrafya', 'Vatandaşlık', 'Güncel Bilgiler'],
  },
  {
    id: 'kpss-ogretmenlik',
    name: 'KPSS Öğretmenlik',
    description: 'Öğretmen atamaları',
    subjects: ['Türkçe', 'Matematik', 'Tarih', 'Coğrafya', 'Vatandaşlık', 'Güncel Bilgiler'],
  },
];

// Hedef Net/Puan seçenekleri
export interface TargetOption {
  id: string;
  label: string;
  netRange?: string;
  puanRange?: string;
}

// Geçmiş KPSS yılları - deneme sınavları
export const DENEME_YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019] as const;
export type DenemeYear = (typeof DENEME_YEARS)[number];

// ÖSYM KPSS ders ve konu yapısı
export const SUBJECTS = ['Türkçe', 'Matematik', 'Tarih', 'Coğrafya', 'Vatandaşlık', 'Güncel Bilgiler'] as const;

export const TOPICS_BY_SUBJECT: Record<string, string[]> = {
  Türkçe: ['Tümü', 'Sözcük Bilgisi', 'Dil Bilgisi', 'Anlatım / Paragraf', 'Yazım ve Noktalama'],
  Matematik: ['Tümü', 'Sayılar ve İşlemler', 'Problemler', 'Geometri', 'Oran-Orantı', 'Olasılık'],
  Tarih: ['Tümü', 'Osmanlı Devleti', 'İnkılap Tarihi', 'Çağdaş Türk ve Dünya Tarihi'],
  Coğrafya: ['Tümü', 'Fiziki Coğrafya', 'Beşerî Coğrafya', 'Ekonomik Coğrafya'],
  Vatandaşlık: ['Tümü', 'Anayasa', 'Devlet Yapısı', 'Temel Haklar'],
  'Güncel Bilgiler': ['Tümü', 'Kurumlar', 'Ekonomi', 'Uluslararası İlişkiler'],
};

export const TARGET_OPTIONS: TargetOption[] = [
  { id: '70-75', label: '70-75 Puan', puanRange: '70-75' },
  { id: '75-80', label: '75-80 Puan', puanRange: '75-80' },
  { id: '80-85', label: '80-85 Puan', puanRange: '80-85' },
  { id: '85-90', label: '85-90 Puan', puanRange: '85-90' },
  { id: '90+', label: '90 ve üzeri Puan', puanRange: '90+' },
];

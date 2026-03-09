/**
 * API yokken (canlı site) KPSS notları ve PDF listesi.
 * public/kpss-notlar ve public/kpss-pdfs içine eklenen dosyaları
 * buraya da ekleyin; API yayında değilse bu listeler kullanılır.
 */
export const NOTLAR_FALLBACK: { name: string; url: string }[] = [
  { name: 'Kpss-Cografya-Kodlamalari.pdf', url: '/kpss-notlar/Kpss-Cografya-Kodlamalari.pdf' },
];

export const PDFS_FALLBACK: { name: string; url: string }[] = [
  // public/kpss-pdfs içindeki dosyalar buraya eklenebilir
  // Coğrafya kodlamaları hem "Notlar" hem "Çıkmış sorular" altında görünsün:
  { name: 'Kpss-Cografya-Kodlamalari.pdf', url: '/kpss-notlar/Kpss-Cografya-Kodlamalari.pdf' },
];

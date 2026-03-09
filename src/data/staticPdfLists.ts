/**
 * API yokken (canlı site) KPSS notları ve PDF listesi.
 * public/kpss-notlar ve public/kpss-pdfs içine eklenen dosyaları
 * buraya da ekleyin; API yayında değilse bu listeler kullanılır.
 */
export const NOTLAR_FALLBACK: { name: string; url: string }[] = [
  // Sadece istenen 4 not dosyası (public/kpss-notlar altında olmalı)
  { name: 'Tarih Ders Notu', url: '/kpss-notlar/22152510_tarh_ders_notu.pdf' },
  { name: 'KPSS Coğrafya Kodlamaları (PDF)', url: '/kpss-notlar/Kpss-Coğrafya-Kodlamaları-Pdf.pdf' },
  {
    name: 'KPSS Tarih-Coğrafya-Yurttaşlık Kodlamaları',
    url: '/kpss-notlar/Kpss-Tarih-Cografya-Yurttaslik-Bilgisi-Kodlamalar-.pdf',
  },
  {
    name: 'Ramazan YETGİN - KPSS Tarih Notları',
    url: '/kpss-notlar/Ramazan YETGİN - KPSS Tarih Notları.pdf',
  },
];

export const PDFS_FALLBACK: { name: string; url: string }[] = [
  // Çıkmış sorular (Önlisans) – Vercel'de public/kpss-pdfs altında olmalı
  { name: '2006 KPSS Önlisans Genel Kültür', url: '/kpss-pdfs/2006kpss2onlisgenkul.pdf' },
  { name: '2006 KPSS Önlisans Genel Kültür Cevap Anahtarı', url: '/kpss-pdfs/2006kpss2onlisgenkulcevapanahtari.pdf' },
  { name: '2006 KPSS Önlisans Genel Yetenek', url: '/kpss-pdfs/2006kpss2onlisgenyet.pdf' },
  { name: '2006 KPSS Önlisans Genel Yetenek Cevap Anahtarı', url: '/kpss-pdfs/2006kpss2onlisgenyetcevapanahtari.pdf' },
  { name: '2008 KPSS Önlisans Genel Kültür', url: '/kpss-pdfs/2008kpssonlisgenkul.pdf' },
  { name: '2008 KPSS Önlisans Genel Yetenek', url: '/kpss-pdfs/2008kpssonlisgenyet.pdf' },
  { name: '2012 KPSS Önlisans', url: '/kpss-pdfs/1696,kpss2onlisanspdf.pdf' },
  { name: '2014 KPSS Önlisans', url: '/kpss-pdfs/2014KPSSOnlisans.pdf' },
  { name: '2016 KPSS Önlisans', url: '/kpss-pdfs/2016KPSSOnLisansDuzeyiTemel16102016.pdf' },
  { name: '2018 KPSS Önlisans', url: '/kpss-pdfs/2018-KPSS-OnLisans12112019.pdf' },
  { name: '2020 KPSS Önlisans', url: '/kpss-pdfs/2020_KPSS_Onlisans.pdf' },
];

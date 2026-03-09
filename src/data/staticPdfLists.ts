/**
 * API yokken (canlı site) KPSS notları ve PDF listesi.
 * public/kpss-notlar ve public/kpss-pdfs içine eklenen dosyaları
 * buraya da ekleyin; API yayında değilse bu listeler kullanılır.
 */
export const NOTLAR_FALLBACK: { name: string; url: string }[] = [
  // Coğrafya kodlamaları (public klasöründe)
  { name: 'KPSS Coğrafya Kodlamaları', url: '/kpss-notlar/Kpss-Cografya-Kodlamalari.pdf' },
  // Repo kökünde notlar/ klasöründeki PDF'ler
  { name: 'Tarih Ders Notu', url: '/notlar/22152510_tarh_ders_notu.pdf' },
  { name: 'KPSS Coğrafya Kodlamaları (PDF)', url: '/notlar/Kpss-Coğrafya-Kodlamaları-Pdf.pdf' },
  {
    name: 'KPSS Tarih-Coğrafya-Yurttaşlık Kodlamaları',
    url: '/notlar/Kpss-Tarih-Cografya-Yurttaslik-Bilgisi-Kodlamalar-.pdf',
  },
  {
    name: 'Ramazan YETGİN - KPSS Tarih Notları',
    url: '/notlar/Ramazan YETGİN - KPSS Tarih Notları.pdf',
  },
];

export const PDFS_FALLBACK: { name: string; url: string }[] = [
  // Çıkmış sorular (Önlisans) – API yokken gösterilecek PDF'ler
  // Dosyalar repo kökünde Kpss/.. klasörlerinde duruyor.
  { name: '2006 KPSS Önlisans Genel Kültür', url: '/Kpss/06/2006kpss2onlisgenkul.pdf' },
  { name: '2006 KPSS Önlisans Genel Kültür Cevap Anahtarı', url: '/Kpss/06/2006kpss2onlisgenkulcevapanahtari.pdf' },
  { name: '2006 KPSS Önlisans Genel Yetenek', url: '/Kpss/06/2006kpss2onlisgenyet.pdf' },
  { name: '2006 KPSS Önlisans Genel Yetenek Cevap Anahtarı', url: '/Kpss/06/2006kpss2onlisgenyetcevapanahtari.pdf' },
  { name: '2008 KPSS Önlisans Genel Kültür', url: '/Kpss/08/2008kpssonlisgenkul.pdf' },
  { name: '2008 KPSS Önlisans Genel Yetenek', url: '/Kpss/08/2008kpssonlisgenyet.pdf' },
  { name: '2012 KPSS Önlisans', url: '/Kpss/12/1696,kpss2onlisanspdf.pdf' },
  { name: '2014 KPSS Önlisans', url: '/Kpss/14/2014KPSSOnlisans.pdf' },
  { name: '2016 KPSS Önlisans', url: '/Kpss/16/2016KPSSOnLisansDuzeyiTemel16102016.pdf' },
  { name: '2018 KPSS Önlisans', url: '/Kpss/18/2018-KPSS-OnLisans12112019.pdf' },
  { name: '2020 KPSS Önlisans', url: '/Kpss/20/2020_KPSS_Onlisans.pdf' },
];

/**
 * KPSS 2025 Güncel Soru Bankası
 * Konular: Türkçe, Matematik, Tarih, Coğrafya, Vatandaşlık, Güncel Bilgiler
 */

const QUESTIONS_BANK = [
  // Türkçe - Dil bilgisi, sözcük türleri, paragraf
  {
    subject: 'Türkçe',
    difficulty: 'kolay',
    question: '"Bu konuda seninle aynı fikirdeyim" cümlesindeki altı çizili sözcüğün türü nedir?',
    options: ['Zamir', 'Sıfat', 'Zarf', 'Edat'],
    correctAnswer: 0,
    solution: '"Seninle" sözcüğü sen zamirine "-le" eki getirilerek oluşturulmuştur. Zamir, ismin yerini tutan sözcüklerdir.',
    explanation: 'Kişi zamirleri: ben, sen, o, biz, siz, onlar. "Seninle" = sen + ile birleşik yazım.',
  },
  {
    subject: 'Türkçe',
    difficulty: 'orta',
    question: 'Aşağıdaki cümlelerin hangisinde noktalama yanlışı vardır?',
    options: [
      'Türkiye\'de nüfus, her yıl artmaktadır.',
      'Yarın okula gideceğim, dedi.',
      'Ali, Veli ve Ayşe dışarıda oynuyor.',
      'Bu kitabı okudun mu?',
    ],
    correctAnswer: 1,
    solution: '"Dedi" ve benzeri sözleri tırnak dışında virgül kullanılır: "Yarın okula gideceğim," dedi.',
    explanation: 'Tırnak içindeki cümlenin sonunda virgül, tırnak işaretinin içinde olmalıdır.',
  },
  {
    subject: 'Türkçe',
    difficulty: 'orta',
    question: 'Aşağıdaki sözcüklerden hangisi büyük ünlü uyumuna uymaz?',
    options: ['Kalem', 'Kitap', 'Telefon', 'Defter'],
    correctAnswer: 2,
    solution: '"Telefon" sözcüğünde kalın ünlü (e) ile ince ünlü (o) birlikte bulunur. Büyük ünlü uyumuna uymaz.',
    explanation: 'Türkçede bir sözcükte kalın ünlüler (a, ı, o, u) veya ince ünlüler (e, i, ö, ü) birlikte bulunmalıdır.',
  },
  {
    subject: 'Türkçe',
    difficulty: 'orta',
    question: '"Yazar bu romanında toplumsal bir konuyu ele almış." cümlesinde "ele almak" deyiminin anlamı nedir?',
    options: ['İncelemek, konu etmek', 'Uzaklaştırmak', 'Elden çıkarmak', 'Yakalamak'],
    correctAnswer: 0,
    solution: '"Ele almak" deyimi bir konuyu işlemek, incelemek, üzerinde durmak anlamında kullanılır.',
    explanation: 'Deyimler kalıplaşmış sözlerdir ve genellikle gerçek anlamlarından farklı kullanılır.',
  },
  {
    subject: 'Türkçe',
    difficulty: 'zor',
    question: 'Aşağıdakilerden hangisi birleşik fiil değildir?',
    options: ['Yapabilmek', 'Görebilmek', 'Okumak', 'Edememek'],
    correctAnswer: 2,
    solution: '"Okumak" basit bir fiildir. "Yapabilmek", "görebilmek", "edememek" ise yardımcı fiille kurulmuş birleşik fiillerdir.',
    explanation: 'Birleşik fiiller: isim + etmek/olmak (terk etmek), fiil + fiil (yapabilmek) şeklinde oluşur.',
  },
  // Matematik - Problem çözme, sayılar, yüzdeler
  {
    subject: 'Matematik',
    difficulty: 'kolay',
    question: 'Bir sayının 3 katının 5 fazlası 23 ise bu sayı kaçtır?',
    options: ['4', '5', '6', '7'],
    correctAnswer: 2,
    solution: 'Sayı x olsun: 3x + 5 = 23 → 3x = 18 → x = 6',
    explanation: 'Denklem kurarak çözdük. 3·6 + 5 = 23 ✓',
  },
  {
    subject: 'Matematik',
    difficulty: 'kolay',
    question: '12 sayısının %25\'i kaçtır?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1,
    solution: '12 · 25/100 = 12 · 1/4 = 3',
    explanation: '%25 = 1/4 demektir. 12\'nin çeyreği 3\'tür.',
  },
  {
    subject: 'Matematik',
    difficulty: 'orta',
    question: '2, 4, 6, 8, ... dizisinin 10. terimi kaçtır?',
    options: ['18', '20', '22', '24'],
    correctAnswer: 1,
    solution: 'Aritmetik dizi: an = a1 + (n-1)·d = 2 + (10-1)·2 = 2 + 18 = 20',
    explanation: 'Ortak fark 2, ilk terim 2. 10. terim = 2 + 9·2 = 20',
  },
  {
    subject: 'Matematik',
    difficulty: 'orta',
    question: 'Bir sınıfta 24 öğrenci vardır. Kızların sayısı erkeklerin 2 katı ise kaç kız vardır?',
    options: ['8', '12', '16', '18'],
    correctAnswer: 2,
    solution: 'Erkek x, kız 2x. x + 2x = 24 → 3x = 24 → x = 8. Kızlar = 2·8 = 16',
    explanation: 'Erkek 8, kız 16. Toplam 24. Kızlar erkeklerin 2 katı ✓',
  },
  {
    subject: 'Matematik',
    difficulty: 'kolay',
    question: '3² + 4² işleminin sonucu kaçtır?',
    options: ['25', '20', '18', '12'],
    correctAnswer: 0,
    solution: '3² = 9, 4² = 16. 9 + 16 = 25',
    explanation: '3-4-5 üçgeni: 3²+4²=5². Yani 9+16=25.',
  },
  // Tarih - Türkiye Cumhuriyeti İnkılap Tarihi ve Atatürkçülük
  {
    subject: 'Tarih',
    difficulty: 'kolay',
    question: 'Osmanlı Devleti\'nin kurucusu kimdir?',
    options: ['Orhan Gazi', 'Osman Bey', 'I. Murad', 'I. Bayezid'],
    correctAnswer: 1,
    solution: 'Osmanlı Devleti 1299 yılında Osman Bey tarafından Söğüt ve çevresinde kurulmuştur.',
    explanation: 'Osman Gazi veya Osman Bey olarak bilinir. Beylikten devlete geçişin temellerini atmıştır.',
  },
  {
    subject: 'Tarih',
    difficulty: 'kolay',
    question: 'Türkiye Cumhuriyeti hangi yılda ilan edilmiştir?',
    options: ['1920', '1921', '1922', '1923'],
    correctAnswer: 3,
    solution: 'Türkiye Cumhuriyeti 29 Ekim 1923 tarihinde ilan edilmiştir.',
    explanation: 'Cumhuriyet\'in ilanı, Lozan Antlaşması\'ndan sonra gerçekleşmiştir.',
  },
  {
    subject: 'Tarih',
    difficulty: 'orta',
    question: 'İlk Türk alfabesi hangisidir?',
    options: ['Göktürk alfabesi', 'Uygur alfabesi', 'Arap alfabesi', 'Latin alfabesi'],
    correctAnswer: 0,
    solution: 'Göktürk (Orhun) alfabesi, bilinen ilk Türk alfabesidir. Orhun Kitabeleri bu alfabeyle yazılmıştır.',
    explanation: '38 harften oluşur. Orhun Yazıtları 8. yüzyılda bu alfabeyle yazılmıştır.',
  },
  {
    subject: 'Tarih',
    difficulty: 'orta',
    question: 'Kurtuluş Savaşı\'nın başlangıç tarihi kabul edilen kongre hangisidir?',
    options: ['Erzurum Kongresi', 'Sivas Kongresi', 'Samsun\'a çıkış', 'Amasya Genelgesi'],
    correctAnswer: 2,
    solution: '19 Mayıs 1919\'da Mustafa Kemal\'in Samsun\'a çıkışı, Kurtuluş Savaşı\'nın başlangıcı kabul edilir.',
    explanation: 'Milli Mücadele\'nin fiilen başladığı tarih 19 Mayıs 1919\'dur.',
  },
  {
    subject: 'Tarih',
    difficulty: 'orta',
    question: 'Lozan Antlaşması hangi tarihte imzalanmıştır?',
    options: ['24 Temmuz 1922', '24 Temmuz 1923', '29 Ekim 1923', '3 Mart 1924'],
    correctAnswer: 1,
    solution: 'Lozan Barış Antlaşması 24 Temmuz 1923 tarihinde İsviçre\'nin Lozan kentinde imzalanmıştır.',
    explanation: 'TBMM adına İsmet İnönü başkanlığındaki heyet imzalamıştır. Yeni Türkiye\'nin uluslararası tanınmasını sağlamıştır.',
  },
  // Coğrafya - Türk ve Dünya Coğrafyası
  {
    subject: 'Coğrafya',
    difficulty: 'kolay',
    question: 'Türkiye\'nin en büyük gölü hangisidir?',
    options: ['Tuz Gölü', 'Van Gölü', 'Eğirdir Gölü', 'Beyşehir Gölü'],
    correctAnswer: 1,
    solution: 'Van Gölü yaklaşık 3.713 km² alanıyla Türkiye\'nin en büyük gölüdür.',
    explanation: 'Aynı zamanda dünyanın en büyük sodyum karbonatlı gölüdür.',
  },
  {
    subject: 'Coğrafya',
    difficulty: 'kolay',
    question: 'Türkiye\'de en fazla nüfusa sahip il hangisidir?',
    options: ['Ankara', 'İzmir', 'İstanbul', 'Bursa'],
    correctAnswer: 2,
    solution: 'İstanbul, Türkiye\'nin en kalabalık ilidir ve nüfusun önemli bir bölümünü barındırır.',
    explanation: 'Hem nüfus hem de yüz ölçümü açısından Türkiye\'nin en büyük metropolüdür.',
  },
  {
    subject: 'Coğrafya',
    difficulty: 'orta',
    question: 'Karadeniz Bölgesi\'nin en önemli geçim kaynağı nedir?',
    options: ['Sanayi', 'Madencilik', 'Tarım ve balıkçılık', 'Turizm'],
    correctAnswer: 2,
    solution: 'Karadeniz Bölgesi\'nde çay, fındık, mısır gibi tarım ürünleri ve balıkçılık önemli geçim kaynaklarıdır.',
    explanation: 'Özellikle Doğu Karadeniz\'de çay, Orta Karadeniz\'de fındık yetiştiriciliği yaygındır.',
  },
  {
    subject: 'Coğrafya',
    difficulty: 'orta',
    question: 'Türkiye\'nin başkenti hangi iklim tipine sahiptir?',
    options: ['Akdeniz', 'Karadeniz', 'Karasal', 'Step'],
    correctAnswer: 2,
    solution: 'Ankara ve İç Anadolu Bölgesi karasal iklim özellikleri gösterir: kışlar soğuk, yazlar sıcak ve kurak.',
    explanation: 'İç Anadolu\'da yıllık yağış az, sıcaklık farkları fazladır.',
  },
  {
    subject: 'Coğrafya',
    difficulty: 'orta',
    question: 'Marmara Denizi hangi boğazlarla Ege ve Karadeniz\'e bağlanır?',
    options: [
      'İstanbul ve Çanakkale Boğazları',
      'Sadece İstanbul Boğazı',
      'Sadece Çanakkale Boğazı',
      'Kerç Boğazı',
    ],
    correctAnswer: 0,
    solution: 'İstanbul Boğazı Marmara\'yı Karadeniz\'e, Çanakkale Boğazı ise Ege Denizi\'ne bağlar.',
    explanation: 'İstanbul Boğazı Karadeniz-Marmara, Çanakkale Boğazı Marmara-Ege bağlantısını sağlar.',
  },
  // Vatandaşlık - Temel Yurttaşlık Bilgisi
  {
    subject: 'Vatandaşlık',
    difficulty: 'kolay',
    question: 'Türkiye\'de yasama yetkisi kime aittir?',
    options: ['Cumhurbaşkanına', 'TBMM\'ye', 'Bakanlar Kuruluna', 'Yargıya'],
    correctAnswer: 1,
    solution: '1982 Anayasası\'na göre yasama yetkisi Türkiye Büyük Millet Meclisi\'ne aittir.',
    explanation: 'Kuvvetler ayrılığı: Yasama TBMM, Yürütme Cumhurbaşkanı ve Bakanlar, Yargı mahkemeler.',
  },
  {
    subject: 'Vatandaşlık',
    difficulty: 'orta',
    question: 'Anayasa Mahkemesi\'nin kaç üyesi vardır?',
    options: ['11', '13', '15', '17'],
    correctAnswer: 2,
    solution: 'Anayasa Mahkemesi 15 asıl ve 5 yedek üyeden oluşur.',
    explanation: 'Üyeler Cumhurbaşkanı tarafından belirli kurumların önerdiği adaylar arasından seçilir.',
  },
  {
    subject: 'Vatandaşlık',
    difficulty: 'zor',
    question: 'Türk vatandaşlığının kazanılma yollarından biri aşağıdakilerden hangisi değildir?',
    options: ['Doğumla', 'Evlat edinmeyle', 'Seçimle', 'Yetkili makam kararıyla'],
    correctAnswer: 2,
    solution: 'Seçimle vatandaşlık kazanılmaz. Doğum, evlat edinme ve yetkili makam kararıyla kazanılabilir.',
    explanation: 'Türk vatandaşlığı kanunla düzenlenir. Yabancılar özel kararla vatandaşlığa alınabilir.',
  },
  {
    subject: 'Vatandaşlık',
    difficulty: 'orta',
    question: 'Cumhurbaşkanı seçilebilmek için en az kaç yaşında olmak gerekir?',
    options: ['35', '40', '45', '50'],
    correctAnswer: 1,
    solution: '1982 Anayasası\'na göre Cumhurbaşkanı seçilebilmek için 40 yaşını doldurmuş olmak gerekir.',
    explanation: 'Ayrıca yükseköğrenim yapmış olma ve milletvekili seçilebilme koşullarını taşıma şartı vardır.',
  },
  {
    subject: 'Vatandaşlık',
    difficulty: 'orta',
    question: 'TBMM genel seçimleri kaç yılda bir yapılır?',
    options: ['4 yıl', '5 yıl', '6 yıl', '7 yıl'],
    correctAnswer: 1,
    solution: 'Anayasa\'ya göre TBMM seçimleri 5 yılda bir yapılır. Cumhurbaşkanı seçimi de 5 yılda birdir.',
    explanation: '2017 anayasa değişikliğiyle Cumhurbaşkanı ve TBMM seçimleri aynı gün yapılır.',
  },
  // Güncel Bilgiler - 2025 KPSS müfredatında yer alan alan (6 soru)
  {
    subject: 'Güncel Bilgiler',
    difficulty: 'orta',
    question: 'Türkiye\'nin resmi para birimi aşağıdakilerden hangisidir?',
    options: ['Euro', 'Dolar', 'Türk Lirası', 'Sterlin'],
    correctAnswer: 2,
    solution: 'Türkiye\'nin resmi para birimi Türk Lirası\'dır (₺). TCMB tarafından yönetilir.',
    explanation: '2024 itibarıyla Türk Lirası ulusal para birimidir.',
  },
  {
    subject: 'Güncel Bilgiler',
    difficulty: 'kolay',
    question: 'Türkiye hangi uluslararası kuruluşa üyedir?',
    options: ['Avrupa Birliği', 'NATO', 'ASEAN', 'OPEC'],
    correctAnswer: 1,
    solution: 'Türkiye 1952 yılında NATO\'ya üye olmuştur.',
    explanation: 'Türkiye NATO\'nun kurucu üyelerinden sonra katılan ilk ülkedir.',
  },
  {
    subject: 'Güncel Bilgiler',
    difficulty: 'orta',
    question: 'Türkiye\'nin nüfusu yaklaşık kaç milyondur?',
    options: ['65 milyon', '75 milyon', '85 milyon', '95 milyon'],
    correctAnswer: 2,
    solution: 'TÜİK verilerine göre Türkiye nüfusu 85 milyon civarındadır.',
    explanation: 'Türkiye, nüfus açısından Avrupa\'nın en kalabalık ülkelerinden biridir.',
  },
  {
    subject: 'Güncel Bilgiler',
    difficulty: 'kolay',
    question: 'Türkiye\'nin başkenti hangi şehirdir?',
    options: ['İstanbul', 'İzmir', 'Ankara', 'Bursa'],
    correctAnswer: 2,
    solution: 'Türkiye Cumhuriyeti\'nin başkenti 13 Ekim 1923\'ten itibaren Ankara\'dır.',
    explanation: 'Kurtuluş Savaşı\'nda stratejik konumu nedeniyle başkent seçilmiştir.',
  },
  {
    subject: 'Güncel Bilgiler',
    difficulty: 'orta',
    question: 'Türkiye\'de merkez bankasının adı nedir?',
    options: ['Halkbank', 'Ziraat Bankası', 'TCMB', 'BDDK'],
    correctAnswer: 2,
    solution: 'Türkiye Cumhuriyet Merkez Bankası (TCMB) para politikasını yönetir.',
    explanation: 'TCMB 1930\'da kurulmuştur, merkezi Ankara\'dadır.',
  },
  // Ek sorular - denemeler için çeşitlilik
  { subject: 'Türkçe', difficulty: 'orta', question: 'Aşağıdaki cümlelerin hangisinde özne eksiktir?', options: ['Yağmur yağıyor.', 'Çocuklar bahçede oynuyor.', 'Kitap okuyor.', 'Kuşlar uçuyor.'], correctAnswer: 2, solution: '"Kitap okuyor" cümlesinde özne belirtilmemiş. Kim okuyor?', explanation: 'Özne cümlede işi yapan öğedir.' },
  { subject: 'Türkçe', difficulty: 'kolay', question: '"Güzel" sözcüğünün eş anlamlısı aşağıdakilerden hangisidir?', options: ['Çirkin', 'Hoş', 'Kötü', 'Fena'], correctAnswer: 1, solution: '"Hoş" sözcüğü "güzel" ile eş anlamlı kullanılabilir.', explanation: 'Eş anlamlı sözcükler aynı kavramı farklı ifade eder.' },
  { subject: 'Matematik', difficulty: 'orta', question: '5! (5 faktöriyel) kaça eşittir?', options: ['15', '25', '120', '720'], correctAnswer: 2, solution: '5! = 5×4×3×2×1 = 120', explanation: 'n! = n×(n-1)×...×1' },
  { subject: 'Matematik', difficulty: 'kolay', question: '√81 kaça eşittir?', options: ['7', '8', '9', '10'], correctAnswer: 2, solution: '9² = 81, dolayısıyla √81 = 9', explanation: 'Karekök, bir sayının hangi sayının karesi olduğunu bulmaktır.' },
  { subject: 'Matematik', difficulty: 'orta', question: 'Bir dikdörtgenin alanı 48 cm², kısa kenarı 6 cm ise uzun kenarı kaç cm\'dir?', options: ['6', '8', '10', '12'], correctAnswer: 1, solution: 'Alan = kısa × uzun → 48 = 6 × uzun → uzun = 8', explanation: 'Dikdörtgen alanı = uzunluk × genişlik' },
  { subject: 'Tarih', difficulty: 'orta', question: 'Samsun\'a çıkış hangi tarihte gerçekleşmiştir?', options: ['16 Mayıs 1919', '19 Mayıs 1919', '23 Nisan 1920', '29 Ekim 1923'], correctAnswer: 1, solution: 'Mustafa Kemal 19 Mayıs 1919\'da Samsun\'a çıkarak Kurtuluş Savaşı\'nı başlattı.', explanation: '19 Mayıs Atatürk\'ü Anma, Gençlik ve Spor Bayramı olarak kutlanır.' },
  { subject: 'Tarih', difficulty: 'orta', question: 'TBMM hangi tarihte açılmıştır?', options: ['19 Mayıs 1919', '23 Nisan 1920', '29 Ekim 1923', '1 Kasım 1922'], correctAnswer: 1, solution: 'TBMM 23 Nisan 1920\'de Ankara\'da açılmıştır.', explanation: '23 Nisan Ulusal Egemenlik ve Çocuk Bayramı\'dır.' },
  { subject: 'Tarih', difficulty: 'kolay', question: 'Cumhuriyetin ilanından sonra ilk Cumhurbaşkanı kim olmuştur?', options: ['İsmet İnönü', 'Mustafa Kemal Atatürk', 'Fevzi Çakmak', 'Kâzım Karabekir'], correctAnswer: 1, solution: 'Mustafa Kemal Atatürk 29 Ekim 1923\'te ilk Cumhurbaşkanı seçildi.', explanation: 'Atatürk 1938\'e kadar cumhurbaşkanlığı yapmıştır.' },
  { subject: 'Coğrafya', difficulty: 'orta', question: 'Türkiye\'nin en uzun nehri hangisidir?', options: ['Sakarya', 'Kızılırmak', 'Fırat', 'Dicle'], correctAnswer: 1, solution: 'Kızılırmak 1355 km ile Türkiye\'nin en uzun nehridir.', explanation: 'Kızılırmak Karadeniz\'e dökülür.' },
  { subject: 'Coğrafya', difficulty: 'kolay', question: 'Marmara Bölgesi\'ndeki illerden hangisi en kalabalıktır?', options: ['Bursa', 'Tekirdağ', 'İstanbul', 'Balıkesir'], correctAnswer: 2, solution: 'İstanbul Marmara Bölgesi\'nde ve Türkiye\'nin en kalabalık ilidir.', explanation: 'İstanbul aynı zamanda metropol bir kenttir.' },
  { subject: 'Vatandaşlık', difficulty: 'orta', question: 'Türkiye\'de bakanlar hangi makam tarafından atanır?', options: ['TBMM', 'Cumhurbaşkanı', 'Başbakan', 'Anayasa Mahkemesi'], correctAnswer: 1, solution: '2017 değişikliğiyle Cumhurbaşkanı bakanları atar.', explanation: 'Cumhurbaşkanlığı hükümet sistemi uygulanmaktadır.' },
  { subject: 'Vatandaşlık', difficulty: 'kolay', question: 'Türkiye\'nin yargıtayı nerede bulunur?', options: ['İstanbul', 'Ankara', 'İzmir', 'Bursa'], correctAnswer: 1, solution: 'Yargıtay Türkiye\'nin en yüksek temyiz mahkemesidir, merkezi Ankara\'dadır.', explanation: 'Yargıtay ceza ve hukuk davalarında temyiz merciidir.' },
  // Genişletilmiş Türkçe - paragraf, sözel mantık, dil bilgisi
  { subject: 'Türkçe', difficulty: 'orta', question: '"Sanat, toplumun aynasıdır." cümlesinde hangi söz sanatı kullanılmıştır?', options: ['Benzetme', 'Kişileştirme', 'Abartma', 'Konuşturma'], correctAnswer: 0, solution: 'Benzetme: Sanat ayna gibi düşünülmüş. Toplumun yansıması anlamında.', explanation: 'Benzetmede bir kavram başka bir kavrama benzetilir.' },
  { subject: 'Türkçe', difficulty: 'orta', question: 'Aşağıdaki cümlelerin hangisinde "de/da" yanlış yazılmıştır?', options: ['O da gelecek.', 'Kitapta yazıyor.', 'Sen de mi Brütüs?', 'Evde kalıyorum.'], correctAnswer: 1, solution: '"Kitapta" bitişik yazılır çünkü bulunma halidir (-de eki). "Orada da" ayrı (bağlaç).', explanation: '-de eki bitişik, "de" bağlacı ayrı yazılır.' },
  { subject: 'Türkçe', difficulty: 'kolay', question: '"Yolculuk" sözcüğünün kökü nedir?', options: ['Yolcu', 'Yol', 'Yolcul', 'Yolc'], correctAnswer: 1, solution: 'Yol-cul-uk: yol (kök) + -cul (yapım eki) + -uk (yapım eki).', explanation: 'Kök, sözcüğün anlam taşıyan temel parçasıdır.' },
  { subject: 'Türkçe', difficulty: 'orta', question: 'Aşağıdakilerden hangisi öznel bir yargı içerir?', options: ['Türkiye\'nin başkenti Ankara\'dır.', 'Su 100°C\'de kaynar.', 'Bu kitap çok sıkıcı.', 'Dünya Güneş etrafında döner.'], correctAnswer: 2, solution: '"Sıkıcı" kişisel yorumdur. Diğerleri nesnel, ölçülebilir bilgiler.', explanation: 'Öznel = kişisel görüş. Nesnel = herkese göre aynı.' },
  { subject: 'Türkçe', difficulty: 'orta', question: '"Başım ağrıyor." cümlesinde "baş" sözcüğü hangi anlamda kullanılmıştır?', options: ['Mecaz', 'Gerçek', 'Terim', 'Deyim'], correctAnswer: 1, solution: 'Gerçek anlam: fiziksel baş (kafa). Mecaz olsaydı "başım şişti" gibi soyut kullanım olurdu.', explanation: 'Gerçek anlam sözcüğün ilk, sözlük anlamıdır.' },
  { subject: 'Türkçe', difficulty: 'orta', question: 'Hangi cümlede virgülün kaldırılması anlamı değiştirir?', options: ['Ali, Veli\'yi gördü.', 'Yarın, maça gideceğiz.', 'Çocuk, ağlayarak eve döndü.', 'Kitabı, masaya bıraktı.'], correctAnswer: 0, solution: '"Ali Veli\'yi gördü" ile "Ali, Veli\'yi gördü" farklı. İlkinde Ali özne; virgül Veli\'yi vurgular.', explanation: 'Virgül bazen özne-yüklem ayırımı yapar.' },
  { subject: 'Türkçe', difficulty: 'zor', question: '"Ne kadar çalışırsan çalış, başarı garantili değildir." cümlesindeki "ne... ne" yapısı ne türdendir?', options: ['Bağlama', 'Pekiştirme', 'Koşul', 'Sebep'], correctAnswer: 2, solution: 'Koşul anlamı taşıyor: "çalışırsan" koşula bağlı. Başarı koşula bağlı değil.', explanation: 'Koşul cümlelerinde eylem bir şarta bağlıdır.' },
  { subject: 'Türkçe', difficulty: 'orta', question: 'Aşağıdaki sözcüklerden hangisi türemiş sözcüktür?', options: ['Ev', 'Evli', 'Kapı', 'Su'], correctAnswer: 1, solution: 'Ev-li: ev (kök) + -li (yapım eki). Diğerleri basit sözcük.', explanation: 'Türemiş = kök + yapım eki ile oluşan sözcük.' },
  // Genişletilmiş Matematik - problem, oran, olasılık, geometri
  { subject: 'Matematik', difficulty: 'orta', question: 'Bir işi A 12 günde, B 6 günde yapıyor. Birlikte kaç günde bitirirler?', options: ['3', '4', '6', '9'], correctAnswer: 1, solution: '1/12 + 1/6 = 1/12 + 2/12 = 3/12 = 1/4. Birlikte 4 günde biter.', explanation: 'İş birlikte yapılırsa hızlar toplanır.' },
  { subject: 'Matematik', difficulty: 'orta', question: 'a:b = 3:4 ve b:c = 2:5 ise a:c oranı kaçtır?', options: ['3:10', '3:5', '5:3', '6:20'], correctAnswer: 0, solution: 'b\'yi eşitleyelim: a:b=3:4, b:c=2:5 → b=4k ve 2m. b=4 ise a=3, b=4 için c=10. a:c=3:10.', explanation: 'Oran zincirinde ortak terim eşitlenir.' },
  { subject: 'Matematik', difficulty: 'kolay', question: 'Bir kutuda 4 kırmızı, 6 mavi top var. Rastgele 1 top çekilirse kırmızı gelme olasılığı?', options: ['1/4', '2/5', '3/5', '2/3'], correctAnswer: 1, solution: 'P = 4/(4+6) = 4/10 = 2/5', explanation: 'Olasılık = istenen / toplam.' },
  { subject: 'Matematik', difficulty: 'orta', question: 'Bir sayıya %20 eklenip sonuçtan %20 çıkarılırsa sayı nasıl değişir?', options: ['%4 artar', '%4 azalır', 'Değişmez', '%20 azalır'], correctAnswer: 1, solution: 'x·1,20·0,80 = x·0,96. Yani %4 azalır.', explanation: 'Önce artış sonra azalış uygulanır.' },
  { subject: 'Matematik', difficulty: 'orta', question: 'Bir üçgenin iç açıları 2, 3, 4 ile orantılı. En büyük açı kaç derecedir?', options: ['60', '80', '90', '100'], correctAnswer: 1, solution: '2k+3k+4k=180 → 9k=180 → k=20. En büyük: 4·20=80°', explanation: 'Üçgen iç açıları toplamı 180°.' },
  { subject: 'Matematik', difficulty: 'kolay', question: '2³ · 2⁴ işleminin sonucu nedir?', options: ['2⁷', '2¹²', '4⁷', '4¹²'], correctAnswer: 0, solution: 'Aynı tabanda üsler toplanır: 2³⁺⁴ = 2⁷', explanation: 'aⁿ·aᵐ = aⁿ⁺ᵐ' },
  { subject: 'Matematik', difficulty: 'orta', question: 'Saatte 80 km giden araç 240 km\'yi kaç saatte alır?', options: ['2', '3', '4', '5'], correctAnswer: 1, solution: 'Zaman = Yol / Hız = 240 / 80 = 3 saat', explanation: 'Yol = Hız × Zaman formülü.' },
  { subject: 'Matematik', difficulty: 'zor', question: 'x² - 5x + 6 = 0 denkleminin kökleri çarpımı kaçtır?', options: ['5', '6', '-5', '-6'], correctAnswer: 1, solution: 'ax²+bx+c=0 için kökler çarpımı c/a = 6/1 = 6', explanation: 'Vieta formülleri: x₁·x₂ = c/a' },
  // Genişletilmiş Tarih - Kurtuluş Savaşı, Osmanlı, Selçuklu
  { subject: 'Tarih', difficulty: 'orta', question: 'Amasya Genelgesi hangi yılda yayınlanmıştır?', options: ['1919', '1920', '1921', '1922'], correctAnswer: 0, solution: 'Amasya Genelgesi 22 Haziran 1919\'da ilan edildi. "Milletin istiklalini yine milletin azim ve kararı kurtaracaktır."', explanation: 'Kurtuluş Savaşı\'nın programı niteliğindedir.' },
  { subject: 'Tarih', difficulty: 'orta', question: 'Lozan Antlaşması hangi tarihte imzalanmıştır?', options: ['24 Temmuz 1922', '24 Temmuz 1923', '29 Ekim 1923', '3 Mart 1924'], correctAnswer: 1, solution: 'Lozan Barış Antlaşması 24 Temmuz 1923\'te imzalandı.', explanation: 'Türkiye\'nin uluslararası alanda tanınmasını sağlamıştır.' },
  { subject: 'Tarih', difficulty: 'orta', question: 'Malazgirt Meydan Muharebesi hangi yılda yapılmıştır?', options: ['1070', '1071', '1171', '1081'], correctAnswer: 1, solution: '1071 Malazgirt Savaşı: Alp Arslan, Bizans\'ı yenerek Anadolu\'nun kapılarını açtı.', explanation: 'Türklerin Anadolu\'ya yerleşmesinin başlangıcı.' },
  { subject: 'Tarih', difficulty: 'orta', question: 'Saltanat hangi tarihte kaldırılmıştır?', options: ['29 Ekim 1922', '1 Kasım 1922', '29 Ekim 1923', '3 Mart 1924'], correctAnswer: 1, solution: '1 Kasım 1922\'de TBMM saltanatı kaldırdı. Son padişah VI. Mehmet Vahdettin.', explanation: 'Cumhuriyet yolunda önemli adım.' },
  { subject: 'Tarih', difficulty: 'kolay', question: 'Harf Devrimi hangi yılda yapılmıştır?', options: ['1926', '1928', '1930', '1932'], correctAnswer: 1, solution: '1 Kasım 1928\'de Latin alfabesine geçildi.', explanation: 'Atatürk Devrimleri\'nden biridir.' },
  { subject: 'Tarih', difficulty: 'orta', question: 'Mondros Ateşkes Antlaşması hangi yılda imzalanmıştır?', options: ['1917', '1918', '1919', '1920'], correctAnswer: 1, solution: '30 Ekim 1918\'de Mondros Mütarekesi imzalandı. I. Dünya Savaşı sonrası.', explanation: 'Osmanlı\'nın fiilen teslimiyeti.' },
  { subject: 'Tarih', difficulty: 'orta', question: 'Büyük Taarruz hangi tarihte başlamıştır?', options: ['26 Ağustos 1921', '26 Ağustos 1922', '30 Ağustos 1922', '9 Eylül 1922'], correctAnswer: 1, solution: '26 Ağustos 1922\'de Büyük Taarruz başladı. 30 Ağustos Zafer Bayramı\'dır.', explanation: 'Yunan ordusunun Anadolu\'dan atılması.' },
  { subject: 'Tarih', difficulty: 'orta', question: 'Ankara hangi tarihte başkent olmuştur?', options: ['13 Ekim 1922', '13 Ekim 1923', '29 Ekim 1923', '6 Ekim 1923'], correctAnswer: 1, solution: '13 Ekim 1923\'te Ankara başkent ilan edildi.', explanation: 'TBMM kararı ile.' },
  // Genişletilmiş Coğrafya - bölgeler, iklim, ekonomi
  { subject: 'Coğrafya', difficulty: 'orta', question: 'Türkiye\'nin en yüksek dağı hangisidir?', options: ['Erciyes', 'Uludağ', 'Ağrı Dağı', 'Süphan Dağı'], correctAnswer: 2, solution: 'Ağrı Dağı 5137 m ile Türkiye\'nin ve Avrupa\'nın en yüksek dağıdır.', explanation: 'Doğu Anadolu Bölgesi\'nde, İran sınırında.' },
  { subject: 'Coğrafya', difficulty: 'orta', question: 'Van Gölü hangi bölgemizdedir?', options: ['İç Anadolu', 'Doğu Anadolu', 'Güneydoğu Anadolu', 'Karadeniz'], correctAnswer: 1, solution: 'Van Gölü Doğu Anadolu Bölgesi\'nde, Türkiye\'nin en büyük gölüdür.', explanation: 'Sodalı, tuzlu bir göldür.' },
  { subject: 'Coğrafya', difficulty: 'kolay', question: 'Türkiye kaç coğrafi bölgeye ayrılır?', options: ['5', '6', '7', '8'], correctAnswer: 2, solution: '7 coğrafi bölge: Marmara, Ege, Akdeniz, İç Anadolu, Karadeniz, Doğu Anadolu, Güneydoğu Anadolu.', explanation: '1941\'de I. Coğrafya Kongresi ile belirlendi.' },
  { subject: 'Coğrafya', difficulty: 'orta', question: 'Çukurova hangi bölgededir?', options: ['Marmara', 'Ege', 'Akdeniz', 'İç Anadolu'], correctAnswer: 2, solution: 'Çukurova Akdeniz Bölgesi\'nde, Adana-Mersin arasında. Verimli delta ovası.', explanation: 'Pamuk üretiminde önemli.' },
  { subject: 'Coğrafya', difficulty: 'orta', question: 'Türkiye\'de en fazla yağış alan bölge hangisidir?', options: ['Marmara', 'Ege', 'Karadeniz', 'Akdeniz'], correctAnswer: 2, solution: 'Karadeniz Bölgesi\'nde özellikle Rize yöresi en fazla yağış alır.', explanation: 'Ilıman okyanus iklimi etkisi.' },
  { subject: 'Coğrafya', difficulty: 'orta', question: 'Zonguldak hangi madenle ünlüdür?', options: ['Demir', 'Bakır', 'Taş kömürü', 'Bor'], correctAnswer: 2, solution: 'Zonguldak taş kömürü (maden kömürü) havzası ile ünlüdür.', explanation: 'Türkiye\'nin tek taş kömürü havzası.' },
  { subject: 'Coğrafya', difficulty: 'kolay', question: 'Türkiye hangi kıtalar arasında yer alır?', options: ['Avrupa-Asya', 'Asya-Afrika', 'Avrupa-Afrika', 'Asya-Avrupa-Afrika'], correctAnswer: 0, solution: 'Avrasya: Avrupa ve Asya arasında. Boğazlar bu iki kıtayı ayırır.', explanation: 'Stratejik konum bu nedenle önemlidir.' },
  { subject: 'Coğrafya', difficulty: 'orta', question: 'GAP projesi hangi bölgemizi kapsar?', options: ['Doğu Anadolu', 'Güneydoğu Anadolu', 'İkisi de', 'Akdeniz'], correctAnswer: 2, solution: 'GAP (Güneydoğu Anadolu Projesi) Fırat-Dicle havzasında. Güneydoğu ve Doğu Anadolu\'yu kapsar.', explanation: 'Sulama ve hidroelektrik amaçlı.' },
  // Genişletilmiş Vatandaşlık - anayasa, devlet
  { subject: 'Vatandaşlık', difficulty: 'orta', question: 'TBMM kaç milletvekilinden oluşur?', options: ['400', '550', '600', '650'], correctAnswer: 2, solution: '2022 değişikliğiyle TBMM 600 milletvekilinden oluşur.', explanation: 'Seçimler 5 yılda bir yapılır.' },
  { subject: 'Vatandaşlık', difficulty: 'orta', question: 'Türkiye Cumhuriyeti Anayasası kaç yılındadır?', options: ['1961', '1982', '1995', '2010'], correctAnswer: 1, solution: '1982 Anayasası hâlen yürürlükte. Birçok kez değiştirilmiştir.', explanation: '12 Eylül sonrası hazırlanmıştır.' },
  { subject: 'Vatandaşlık', difficulty: 'kolay', question: 'Yasama organı hangisidir?', options: ['Cumhurbaşkanı', 'TBMM', 'Bakanlar Kurulu', 'Mahkemeler'], correctAnswer: 1, solution: 'Yasama = kanun yapma. TBMM yasama organıdır.', explanation: 'Kuvvetler ayrılığı: Yasama, Yürütme, Yargı.' },
  { subject: 'Vatandaşlık', difficulty: 'orta', question: 'Cumhurbaşkanının görev süresi kaç yıldır?', options: ['4', '5', '6', '7'], correctAnswer: 1, solution: '2017 değişikliğiyle Cumhurbaşkanı 5 yıllık süreyle seçilir, en fazla 2 dönem.', explanation: 'Cumhurbaşkanlığı hükümet sistemi.' },
  { subject: 'Vatandaşlık', difficulty: 'orta', question: 'İnsan Hakları Evrensel Beyannamesi hangi yılda kabul edilmiştir?', options: ['1945', '1948', '1950', '1960'], correctAnswer: 1, solution: '10 Aralık 1948\'de BM Genel Kurulu\'nda kabul edildi.', explanation: 'İnsan haklarının temel belgesi.' },
  { subject: 'Vatandaşlık', difficulty: 'orta', question: 'Anayasa Mahkemesi üye sayısı kaçtır?', options: ['11', '15', '17', '20'], correctAnswer: 2, solution: 'AYM 15 asıl, 5 yedek üyeden oluşur (2017 sonrası değişikliklerle).', explanation: 'Anayasal denetim yapar.' },
  { subject: 'Vatandaşlık', difficulty: 'kolay', question: 'Seçme ve seçilme hakkı kaç yaşında kazanılır?', options: ['16', '18', '20', '21'], correctAnswer: 1, solution: '18 yaşını dolduran her Türk vatandaşı seçme, 25 yaş milletvekili seçilme hakkına sahiptir.', explanation: '1982 Anayasası md. 67.' },
  { subject: 'Vatandaşlık', difficulty: 'orta', question: 'Danıştay\'ın görevi nedir?', options: ['Ceza davaları', 'İdari davalarda son inceleme', 'Anayasa denetimi', 'Seçim denetimi'], correctAnswer: 1, solution: 'Danıştay idare mahkemelerinin verdiği kararlara karşı temyiz merciidir.', explanation: 'İdari yargının en yüksek mahkemesi.' },
  // Genişletilmiş Güncel Bilgiler
  { subject: 'Güncel Bilgiler', difficulty: 'orta', question: 'TÜİK\'in açılımı nedir?', options: ['Türkiye İstatistik Kurumu', 'Türkiye İhracat Kurumu', 'Türkiye İmar Kurumu', 'Türkiye İş Kurumu'], correctAnswer: 0, solution: 'Türkiye İstatistik Kurumu (TÜİK) resmi istatistikleri üretir.', explanation: 'Merkezi Ankara\'da.' },
  { subject: 'Güncel Bilgiler', difficulty: 'orta', question: 'Türkiye\'nin BM\'ye üyeliği hangi yıldadır?', options: ['1945', '1946', '1948', '1950'], correctAnswer: 0, solution: 'Türkiye BM\'nin kurucu üyelerinden biridir. 24 Ekim 1945.', explanation: 'BM 51 kurucu üyeyle kuruldu.' },
  { subject: 'Güncel Bilgiler', difficulty: 'kolay', question: 'Avrupa Birliği\'ne tam üyelik müzakereleri kaç yılında başlamıştır?', options: ['1999', '2005', '2010', '2015'], correctAnswer: 1, solution: '3 Ekim 2005\'te AB ile tam üyelik müzakereleri başladı.', explanation: 'Kopenhag Kriterleri sonrası.' },
  { subject: 'Güncel Bilgiler', difficulty: 'orta', question: 'Dünya ticaret örgütü kısaca nasıl yazılır?', options: ['IMF', 'WTO', 'OECD', 'GATT'], correctAnswer: 1, solution: 'WTO = World Trade Organization. Dünya Ticaret Örgütü.', explanation: 'GATT\'ın devamı olarak 1995\'te kuruldu.' },
  { subject: 'Güncel Bilgiler', difficulty: 'orta', question: 'Türkiye\'de en fazla ihracat yapılan sektör hangisidir?', options: ['Tarım', 'Otomotiv', 'Tekstil', 'Otomotiv ve motorlu taşıtlar'], correctAnswer: 3, solution: 'Otomotiv ve motorlu taşıtlar Türkiye\'nin en büyük ihracat kalemidir.', explanation: 'Son yıllarda otomotiv sektörü öne çıkmaktadır.' },
  { subject: 'Güncel Bilgiler', difficulty: 'orta', question: 'İŞKUR\'un tam adı nedir?', options: ['İş ve İşçi Bulma Kurumu', 'Türkiye İş Kurumu', 'İstihdam Kurumu', 'Sosyal Güvenlik Kurumu'], correctAnswer: 1, solution: 'Türkiye İş Kurumu (İŞKUR) işsizlik sigortası ve istihdam hizmetleri sunar.', explanation: 'Çalışma ve Sosyal Güvenlik Bakanlığı\'na bağlı.' },
];

// ÖSYM resmi GK-GY soru dağılımı (2019-2025 aynı): Türkçe 30, Matematik 30, Tarih 27, Coğrafya 18, Vatandaşlık 9, Güncel 6 = 120 soru
const DENEME_DISTRIBUTION = {
  Türkçe: 30,
  Matematik: 30,
  Tarih: 27,
  Coğrafya: 18,
  Vatandaşlık: 9,
  'Güncel Bilgiler': 6,
};

function shuffle(arr, seed) {
  const a = [...arr];
  const random = (seed != null && typeof seed === 'number') ? seededRandom(seed) : () => Math.random();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function seededRandom(seed) {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

// Sınav tipine göre zorluk seçimi (KPSS A zor, B orta, Öğretmenlik orta-zor)
const DIFFICULTY_BY_EXAM = {
  'kpss-b': ['kolay', 'orta'],
  'kpss-a': ['orta', 'zor'],
  'kpss-ogretmenlik': ['orta', 'zor'],
};

function getQuestions(examType, count = 10, weakAreas = []) {
  const allowedDiff = DIFFICULTY_BY_EXAM[examType] || ['kolay', 'orta'];
  let pool = QUESTIONS_BANK.filter((q) => allowedDiff.includes(q.difficulty || 'orta'));

  if (pool.length < count) pool = QUESTIONS_BANK;

  if (weakAreas.length > 0) {
    const weakPool = pool.filter((q) => weakAreas.includes(q.subject));
    const otherPool = pool.filter((q) => !weakAreas.includes(q.subject));
    const weakCount = Math.min(Math.ceil(count * 0.6), weakPool.length);
    const otherCount = count - weakCount;
    pool = [...shuffle(weakPool, null).slice(0, weakCount), ...shuffle(otherPool, null).slice(0, otherCount)];
    if (pool.length < count) pool = shuffle(QUESTIONS_BANK, null).slice(0, count);
  } else {
    pool = shuffle(pool, null).slice(0, count);
  }

  return pool.map((q, i) => ({
    id: `q-${i}`,
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    subject: q.subject,
    solution: q.solution,
    explanation: q.explanation,
  }));
}

// Seviye: 'normal' | 'zor' | 'cokZor' - tamamlandıkça açılır
const TIER_DIFFICULTY = {
  normal: ['kolay', 'orta'],
  zor: ['orta', 'zor'],
  cokZor: ['zor'],
};

function getDenemeQuestions(year, examType, count = 120, sessionSeed = null, tier = 'normal') {
  const subjects = Object.keys(DENEME_DISTRIBUTION);
  const bank = QUESTIONS_BANK.filter((q) => subjects.includes(q.subject));
  const allowedDiff = TIER_DIFFICULTY[tier] || TIER_DIFFICULTY.normal;
  const pool = bank.filter((q) => allowedDiff.includes(q.difficulty || 'orta'));
  const basePool = pool.length > 0 ? pool : bank;

  const result = [];
  let idx = 0;
  const seed = sessionSeed != null ? sessionSeed : year * 1000 + 42 + (tier === 'zor' ? 777 : tier === 'cokZor' ? 999 : 0);

  for (const subj of subjects) {
    const needed = DENEME_DISTRIBUTION[subj];
    const subjPool = basePool.filter((q) => q.subject === subj);
    if (subjPool.length === 0) continue;
    const shuffled = shuffle(subjPool, seed + subj.charCodeAt(0) * 7);
    for (let i = 0; i < needed; i++) {
      const q = shuffled[i % shuffled.length];
      result.push({
        id: `d-${year}-${idx}`,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        subject: q.subject,
        solution: q.solution,
        explanation: q.explanation,
      });
      idx++;
    }
  }

  return result.slice(0, Math.min(count, result.length));
}

// Ders + konu bazlı soru getir (soru bankası konu çalışması)
function getQuestionsBySubjectTopic(subject, topic, examType, startFrom = 1, sessionSeed = null) {
  const allowedDiff = DIFFICULTY_BY_EXAM[examType] || ['kolay', 'orta'];
  let pool = QUESTIONS_BANK.filter(
    (q) => q.subject === subject && allowedDiff.includes(q.difficulty || 'orta')
  );
  if (topic && topic !== 'Tümü') {
    pool = pool.filter((q) => (q.topic || 'Tümü') === topic);
  }
  if (pool.length === 0) pool = QUESTIONS_BANK.filter((q) => q.subject === subject);
  const baseSeed = (subject + (topic || '')).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const seed = sessionSeed != null ? sessionSeed + baseSeed : baseSeed;
  const shuffled = shuffle(pool, seed);
  const startIdx = Math.max(0, Math.min(startFrom - 1, shuffled.length - 1));
  const selected = shuffled.slice(startIdx);
  return selected.map((q, i) => ({
    id: `sb-${startIdx + i}`,
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    subject: q.subject,
    solution: q.solution,
    explanation: q.explanation,
  }));
}

module.exports = {
  getQuestions,
  getDenemeQuestions,
  getQuestionsBySubjectTopic,
  QUESTIONS_BANK,
};

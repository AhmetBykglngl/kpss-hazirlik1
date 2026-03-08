# KPSS Hazırlık Uygulaması

KPSS sınavına hazırlanan adaylar için web ve mobilde çalışan, yapay zeka destekli hazırlık uygulaması.

## Özellikler

- **Sınav Seçimi**: KPSS A Grubu, KPSS B Grubu veya KPSS Öğretmenlik
- **Hedef Puan**: 70-75, 75-80, 80-85, 85-90 veya 90+ puan seçenekleri
- **Seviye Belirleme Testi**: AI ile oluşturulan test ile mevcut seviyeni öğren
- **Detaylı Analiz**: Sonuçlara göre zayıf alanların ve önerilerin
- **Kişiselleştirilmiş Çalışma Programı**: Hedefine ve seviyene göre haftalık program, günlük soru hedefi
- **Eksik Odaklı Pratik Testler**: Zayıf alanlarına yönelik öğretici testler
- **Çözüm Açıklamaları**: Her soruda (doğru/yanlış) çözüm ve açıklama

## Kurulum

### 1. Bağımlılıklar

```bash
cd kpss-hazirlik
npm install
```

### 2. API Sunucusu

**Ücretsiz mod** – OpenAI gerekmez. Yerel soru bankası kullanılır.

```bash
npm run api
```

API sunucusu `http://localhost:3001` adresinde çalışacak.

### 3. Uygulamayı Çalıştır

**Web:**
```bash
npm run web
```

**Android:**
```bash
npm run android
```

**iOS:**
```bash
npm run ios
```

### Mobil Cihazda Test Etmek

Mobil cihazda test ederken API sunucusunun aynı ağda erişilebilir olması gerekir. `.env` veya `app.config.js` içinde:

```
EXPO_PUBLIC_API_URL=http://BILGISAYAR_IP:3001
```

Bilgisayarın yerel IP adresini yaz (örn. `192.168.1.10`).

## Proje Yapısı

```
kpss-hazirlik/
├── api/              # Node.js API sunucusu (OpenAI entegrasyonu)
├── src/
│   ├── constants/    # Sınav türleri, hedef seçenekleri
│   ├── context/     # AuthContext (kullanıcı durumu)
│   ├── screens/     # Ekranlar
│   ├── services/    # API çağrıları
│   └── types/       # TypeScript tipleri
├── App.tsx
└── package.json
```

## Ekranlar

1. **Hoş Geldin**: Ad, sınav türü, hedef puan seçimi
2. **Ana Sayfa**: Seviye testi / analiz / program / pratik test
3. **Seviye Testi**: AI ile oluşturulan 10 soruluk test
4. **Sonuçlar**: Puan, analiz, zayıf alanlar, öneriler
5. **Çalışma Programı**: Haftalık plan, soru hedefleri
6. **Pratik Test**: Eksik odaklı, tüm cevaplarda çözüm açıklaması

## Teknolojiler

- **Expo** (React Native) - Web + iOS + Android
- **TypeScript**
- **AsyncStorage** - Yerel veri
- **Yerel soru bankası** - Ücretsiz, OpenAI gerektirmez

## GitHub ve Yayınlama

Projeyi GitHub'a yükleyip canlı linke çevirmek için **[DEPLOY.md](./DEPLOY.md)** dosyasındaki adımları izleyin:

1. **GitHub** – Kodu depoya yükle
2. **Render** – API'yi ücretsiz host et
3. **Vercel** – Web arayüzünü ücretsiz yayınla

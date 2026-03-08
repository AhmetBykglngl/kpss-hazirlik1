# GitHub ve Yayınlama Rehberi

Bu rehber, projeyi GitHub'a yüklemenizi ve canlı linke çevirmenizi adım adım anlatır.

---

## 1. GitHub'a Yükleme

### Git kurulu değilse
[Git indir](https://git-scm.com/download/win)

### Proje klasöründe sırayla:

```powershell
cd "F:\Yapay zeka\kpss-hazirlik"

# Git başlat (henüz yoksa)
git init

# Tüm dosyaları ekle
git add .

# İlk commit
git commit -m "KPSS Hazırlık - ilk sürüm"
```

### GitHub'da repo oluştur
1. [github.com](https://github.com) → Giriş yap
2. Sağ üst **+** → **New repository**
3. İsim: `kpss-hazirlik` (veya istediğiniz)
4. **Create repository** tıklayın

### Projeyi GitHub'a bağla ve gönder

```powershell
git remote add origin https://github.com/KULLANICI_ADINIZ/kpss-hazirlik.git
git branch -M main
git push -u origin main
```

> `KULLANICI_ADINIZ` yerine kendi GitHub kullanıcı adınızı yazın.

---

## 2. Canlı Link (Yayınlama)

Uygulama iki parçadan oluşur: **API** ve **Web arayüzü**. İkisini de ücretsiz yayınlamak için:

### A) API – Render.com (Ücretsiz)

1. [render.com](https://render.com) → **Sign Up** (GitHub ile giriş)
2. **New** → **Web Service**
3. **Connect account** ile GitHub reponuzu bağlayın
4. `kpss-hazirlik` reposunu seçin
5. Ayarlar:
   - **Name:** `kpss-api`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node api/index.js`
   - **Instance Type:** Free
6. **Create Web Service**

Deploy bitince örneğin şöyle bir URL alırsınız:
`https://kpss-api-xxxx.onrender.com`

Bu adresi not edin; frontend’te kullanacağız.

> Not: Ücretsiz planlarda ilk istek ~30 saniye sürebilir (uyku modu).

---

### B) Web Arayüzü – Vercel (Ücretsiz)

1. [vercel.com](https://vercel.com) → **Sign Up** (GitHub ile)
2. **Add New** → **Project**
3. `kpss-hazirlik` reposunu import edin
4. **Environment Variables** bölümünde ekleyin:
   - **Key:** `EXPO_PUBLIC_API_URL`
   - **Value:** `https://kpss-api-xxxx.onrender.com` (Render’daki API URL’iniz)
5. **Deploy** tıklayın

Birkaç dakika sonra şöyle bir adres alırsınız:
`https://kpss-hazirlik-xxx.vercel.app`

Bu link, uygulamanızın canlı adresidir.

---

## 3. Özet

| Servis      | Platform | Ücretsiz URL örneği                    |
|-------------|----------|-----------------------------------------|
| API         | Render   | `https://kpss-api-xxx.onrender.com`     |
| Web arayüzü | Vercel   | `https://kpss-hazirlik-xxx.vercel.app`  |

---

## 4. Sorun Giderme

- **API 404 hatası:** Render’da deploy tamamlanmış olmalı. Vercel’deki `EXPO_PUBLIC_API_URL` Render adresine doğru ayarlı mı kontrol edin.
- **Yavaş ilk yükleme:** Render ücretsiz planında uygulama uykuya geçer; ilk istek 30–60 sn sürebilir.

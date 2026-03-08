# Soru Bankası Canlı Sitede Çalışsın (5 adım)

Vercel’deki sitede “Yüklenemedi – API yayında olmalı” hatasını kaldırmak için API’yi Render’da yayınlayıp Vercel’e bağlayın.

---

## 1. Render’da API’yi aç

1. **[render.com](https://render.com)** → GitHub ile giriş yap.
2. **New** → **Web Service**.
3. **Connect account** ile GitHub’ı bağla, **kpss-hazirlik1** reposunu seç.
4. Ayarlar:
   - **Name:** `kpss-api`
   - **Build Command:** `npm install`
   - **Start Command:** `node api/index.js`
   - **Instance Type:** Free
5. **Create Web Service** de, deploy’un bitmesini bekle.
6. Üstte çıkan adresi kopyala (örn. `https://kpss-api-xxxx.onrender.com`).

---

## 2. Vercel’de environment variable ekle

1. **[vercel.com](https://vercel.com)** → **kpss-hazirlik1** projesini aç.
2. **Settings** → **Environment Variables**.
3. **Add**:
   - **Key:** `EXPO_PUBLIC_API_URL`
   - **Value:** (Render’dan kopyaladığın adres, örn. `https://kpss-api-xxxx.onrender.com`)
   - **Environment:** Production (ve istersen Preview)
4. **Save** de.

---

## 3. Vercel’i yeniden deploy et

1. **Deployments** sekmesine geç.
2. En üstteki deployment’ın sağındaki **⋯** → **Redeploy**.
3. **Redeploy** onayla.

Birkaç dakika sonra canlı site soru bankası ve testleri API’ye bağlı çalışır. (Render ücretsiz planda ilk istek ~30 sn sürebilir.)

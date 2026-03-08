# GitHub Pages ile Uygulama Linki

Uygulama, **main** dalına her push’ta otomatik olarak GitHub Pages’e deploy edilir. Link tamamen **GitHub üzerinden** çalışır.

## Tek seferlik ayar

1. GitHub’da **kpss-hazirlik1** repoya git.
2. **Settings** → sol menüden **Pages**.
3. **Build and deployment** bölümünde:
   - **Source:** **GitHub Actions** seçin.
4. Kaydetmene gerek yok; sadece Source’u seçmen yeterli.

## Uygulama linki

Deploy bittikten sonra (ilk push’tan birkaç dakika sürebilir):

**https://AhmetBykgIngl.github.io/kpss-hazirlik1/**

Bu linke tıklayan herkes uygulamayı açar. Repo sayfasında da görünsün istersen:

- Repo ana sayfasında sağda **About** → kalem ikonu.
- **Website** alanına yukarıdaki linki yapıştır → **Save changes**.

## API (isteğe bağlı)

Uygulama varsayılan olarak canlı bir API olmadan çalışır (yerel soru bankası kullanır). API’yi Render’da host edip bağlamak istersen:

1. Repo **Settings** → **Secrets and variables** → **Actions**.
2. **New repository secret** → Name: `EXPO_PUBLIC_API_URL`, Value: `https://kpss-api-xxxx.onrender.com` (kendi Render API adresin).
3. Sonraki deploy’da uygulama bu API’yi kullanır.

## Sorun giderme

- **404:** Pages’te Source olarak **GitHub Actions** seçili mi kontrol et. En az bir kez **main**’e push yapılmış olmalı.
- **Sayfa boş / asset yüklenmiyor:** Workflow’un (Actions sekmesi) hatasız bittiğinden emin ol. Gerekirse **Re-run all jobs** dene.

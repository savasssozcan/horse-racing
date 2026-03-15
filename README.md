# Horse Racing — Microfrontend

Vue 3 + Vuex 4 + Vite ile at yarışı simülasyonu, **Module Federation** ile microfrontend mimarisinde.

## Live (Vercel)

| App | URL |
|-----|-----|
| **Main** (host, tüm uygulama) | https://horse-racing-eta.vercel.app/ |
| **Panels** (standalone: Horse List + Program & Results) | https://horse-racing-panels.vercel.app/ |
| **Race track** (standalone: yarış ekranı) | https://horse-racing-race-track.vercel.app/ |

## Architecture

| Uygulama    | Port | İçerik |
|------------|------|--------|
| **host**   | 5000 | Shell: Header (GENERATE PROGRAM / START-PAUSE), layout, Vuex store, yarış döngüsü |
| **panels** | 5001 | Horse List + Program & Results (tek remote) |
| **race-track** | 5002 | Yarış ekranı (şeritler, atlar, FINISH) |

- **panels** ve **race-track** remotes olarak host tarafından yüklenir; Vue ve Vuex singleton paylaşılır, state host’taki store’da tutulur.

## Setup

```bash
cd horse-racing

# Tüm uygulamalara bağımlılıkları kur
npm install
npm install --prefix host
npm install --prefix panels
npm install --prefix race-track
```

## How to Run

**Önemli:** Vite dev modunda `remoteEntry.js` üretilmez; sadece build sonrası oluşur. Bu yüzden **panels** ve **race-track** `vite build` + `vite preview` ile çalışır (ilk build biter, sonra preview sunar). Host ise normal `vite` dev server ile çalışır.

Üç uygulamanın da aynı anda çalışması gerekir. **Önce remotes’ları başlatın, ilk build bitip “Local: http://localhost:5001” (ve 5002) görünene kadar bekleyin, ardından host’u başlatın.**

```bash
# Tek komutla (önce panels ve race-track build olur, sonra hepsi birlikte çalışır)
npm run dev
```

Veya üç ayrı terminalde (önerilen: remotes’ların build’i bitsin, sonra host):

```bash
# Terminal 1 — panels (build + watch + preview)
npm run dev:panels

# Terminal 2 — race-track (build + watch + preview)
npm run dev:race-track

# Terminal 3 — panels ve race-track "preview" çıktısını verdikten sonra
npm run dev:host
```

Tarayıcıda **http://localhost:5000** adresini açın.

## Build

```bash
npm run build
npm run preview   # host'u production build ile önizle (remotes için build URL'leri güncellenmeli)
```

## Deploy (Vercel)

Deploy host, panels ve race-track’i **ayrı Vercel projeleri** olarak yayınlayın (monorepo: her biri için Root Directory sırasıyla `host`, `panels`, `race-track`; Build Command `npm run build`, Output/Root `dist` veya Vite default).

**Host** build’inde remotes’ların production URL’lerini kullanması için Vercel’de **Environment Variables** ekleyin:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_REMOTE_PANELS_URL` | Panels remote entry (build sonrası) | `https://horse-racing-panels.vercel.app/assets/remoteEntry.js` |
| `VITE_REMOTE_RACE_TRACK_URL` | Race-track remote entry | `https://horse-racing-race-track.vercel.app/assets/remoteEntry.js` |

- Önce **panels** ve **race-track**’i deploy edin, sonra her birinin `https://<proje>.vercel.app/assets/remoteEntry.js` adresini kopyalayıp host projesinde yukarıdaki env değişkenlerine yapıştırın.
- Host’u deploy ederken bu iki env tanımlı olmalı; yoksa host localhost URL’lerini kullanır (production’da çalışmaz).
- Örnek: `.env.example` dosyasına bakın.

## Test

Unit testler **Vitest** ve **@vue/test-utils** ile yazılmıştır.

```bash
# Tüm uygulamalarda testleri çalıştır (host, panels, race-track)
npm run test

# Tek uygulama
npm run test --prefix host
npm run test --prefix panels
npm run test --prefix race-track

# Watch modunda (değişiklikte tekrar çalıştır)
npm run test:watch --prefix host
```

Test dosyaları her bileşenin yanında veya `__tests__` klasöründe `*.spec.js` adıyla bulunur.

### Coverage

Test coverage **@vitest/coverage-v8** ile hesaplanır. Raporlar her uygulamanın `coverage/` klasörüne yazılır.

```bash
# Tüm uygulamalarda coverage üret
npm run test:coverage

# Tek uygulama
cd host && npm run test:coverage
cd panels && npm run test:coverage
cd race-track && npm run test:coverage
```

- **Terminal**: `text` ve `text-summary` — satır/branch/fonksiyon yüzdeleri konsola yazılır.
- **HTML**: `coverage/index.html` — tarayıcıda açıp satır satır kapsamı inceleyebilirsin.
- **LCOV**: `coverage/lcov.info` — CI veya harici araçlarla kullanım için.

### E2E (Playwright)

Uçtan uca testler **Playwright** ile çalışır. Testler uygulamanın tamamını (host + remotes) ayağa kaldırıp tarayıcıda senaryoları çalıştırır.

```bash
# E2E testleri çalıştır (tarayıcı arka planda, gerekirse sunucuyu başlatır)
npm run e2e

# Tarayıcı penceresi açık çalıştır — testleri izlemek için
npm run e2e:headed

# UI modunda (adım adım izleme, hata ayıklama)
npm run e2e:ui
```

**İlk kurulum:** Playwright tarayıcılarının bir kez yüklenmesi gerekir: `npx playwright install`

**Not:** İlk çalıştırmada panels ve race-track build edileceği için `npm run e2e` birkaç dakika sürebilir. Sunucu zaten çalışıyorsa (`npm run dev`) mevcut sunucu kullanılır.

Senaryolar: sayfa yükleme, GENERATE PROGRAM ile at listesi ve program oluşturma, START ile yarışı başlatma ve sonuçların görünmesi, PAUSE / START ile duraklatma ve devam.

## Project structure

```
horse-racing/
├── e2e/                  # Playwright E2E testleri
│   └── app.spec.js
├── host/                 # Shell uygulaması
│   ├── src/
│   │   ├── App.vue       # Panels + RaceTrack remote'larını yükler, yarış döngüsü
│   │   ├── store/        # Vuex store (tüm state burada)
│   │   └── components/Header.vue
│   └── vite.config.js    # Federation host, remotes: panels, raceTrack
├── panels/               # Horse List + Program Results
│   ├── src/App.vue       # HorseList + ProgramResults
│   └── vite.config.js   # Federation remote, exposes ./App
├── race-track/           # Yarış ekranı
│   ├── src/App.vue       # RaceTrack
│   └── vite.config.js    # Federation remote, exposes ./App
└── package.json
```

## Tech stack

| Category | Technologies |
|----------|--------------|
| **Framework** | Vue 3, Vuex 4 |
| **Build** | Vite 5 |
| **Microfrontend** | @originjs/vite-plugin-federation (Module Federation) |
| **Unit tests** | Vitest, @vue/test-utils, jsdom |
| **Coverage** | @vitest/coverage-v8 |
| **E2E** | Playwright |

## AI Usage

Bu projede Vue ekosistemi ile daha önce doğrudan çalışmadığım için geliştirme sırasında Cursor gibi yapay zekâ araçlarından Vue sözdizimi ve component yapıları konusunda destek aldım. 

Bununla birlikte projenin mimari tasarımı, microfrontend yapısı, state yönetimi ve uygulama akışı tarafımdan belirlenmiş ve uygulanmıştır.

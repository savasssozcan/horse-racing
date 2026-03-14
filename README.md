# Horse Racing (Vue.js)

Vue 3 + Vuex 4 + Vite ile at yarışı simülasyonu.

## Kurulum

```bash
cd horse-racing
npm install
npm run dev
```

## Özellikler

- **20 at**: Benzersiz isim, condition (1–100), renk
- **6 round program**: Her round 10 at, mesafeler 1200–2200 m
- **GENERATE PROGRAM**: At listesi ve 6 round programı oluşturur
- **START / PAUSE**: Yarışı başlatır veya duraklatır
- **Race Track**: 10 şerit, at ilerleme animasyonu, FINISH çizgisi
- **Program & Results**: Round programı ve sonuç tabloları (Position, Name)

## Proje yapısı

- `src/store/modules/game.js` — Vuex state (horses, program, results, progress)
- `src/components/` — Header, HorseList, RaceTrack, ProgramResults
- `src/App.vue` — Layout ve yarış döngüsü (tick, sıralama, sonuç yazma)

Proje **bağımsız** bir dizinde (`tys/horse-racing`), courier-management veya hj-react içinde değildir.

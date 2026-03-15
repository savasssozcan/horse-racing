<template>
  <div class="app">
    <Header @start-race="startRace" />
    <div class="main">
      <div class="main__horse-list">
        <HorseList />
      </div>
      <div class="main__track">
        <RaceTrack />
      </div>
      <div class="main__program-results">
        <ProgramResults />
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent, nextTick } from 'vue';
import Header from './components/Header.vue';

const RACE_DURATION_MS = 8000;
const TICK_MS = 80;

export default {
  name: 'App',
  components: {
    Header,
    HorseList: defineAsyncComponent(() => import('panels/HorseList')),
    RaceTrack: defineAsyncComponent(() => import('raceTrack/App')),
    ProgramResults: defineAsyncComponent(() => import('panels/ProgramResults')),
  },
  data() {
    return {
      raceInterval: null,
      animationFrame: null,
    };
  },
  beforeUnmount() {
    this.stopRaceLoop();
  },
  methods: {
    startRace() {
      const program = this.$store.getters['program/items'];
      if (!program.length) return;
      let roundIndex = this.$store.getters['program/currentRoundIndex'];
      if (roundIndex < 0) roundIndex = 0;
      this.$store.dispatch('program/setCurrentRound', roundIndex);
      this.runRaceLoop();
    },
    runRaceLoop() {
      const run = () => {
        if (this.$store.getters['race/isPaused']) {
          this.animationFrame = requestAnimationFrame(run);
          return;
        }
        const program = this.$store.getters['program/items'];
        const currentRoundIndex = this.$store.getters['program/currentRoundIndex'];
        if (currentRoundIndex >= program.length) {
          this.$store.dispatch('race/setRacing', false);
          this.$store.dispatch('program/setCurrentRound', -1);
          return;
        }
        const round = program[currentRoundIndex];
        const elapsed = this.$store.getters['race/raceElapsedMs'] || 0;
        const nextElapsed = elapsed + TICK_MS;
        const progress = {};
        round.horses.forEach((horse) => {
          const factor = horse.condition / 100;
          const pct = Math.min(100, (nextElapsed / RACE_DURATION_MS) * 100 * (0.7 + factor * 0.6));
          progress[horse.id] = pct;
        });
        this.$store.dispatch('race/setProgress', progress);
        this.$store.dispatch('race/setElapsedMs', nextElapsed);

        const allFinished = round.horses.every((h) => (progress[h.id] ?? 0) >= 100);
        if (allFinished) {
          const positions = [...round.horses]
            .sort((a, b) => {
              const pa = progress[a.id] ?? 0;
              const pb = progress[b.id] ?? 0;
              if (pb !== pa) return pb - pa;
              return (b.condition - a.condition) || String(a.id).localeCompare(b.id);
            })
            .map((h) => ({ name: h.name }));
          this.$store.dispatch('race/appendResult', {
            roundIndex: round.roundIndex,
            distance: round.distance,
            positions,
          });
          this.$store.dispatch('program/setCurrentRound', currentRoundIndex + 1);
          nextTick(() => this.$store.dispatch('race/setProgress', {}));
          if (currentRoundIndex + 1 >= program.length) {
            this.$store.dispatch('race/setRacing', false);
            this.$store.dispatch('program/setCurrentRound', -1);
            return;
          }
          this.animationFrame = requestAnimationFrame(run);
          return;
        }
        this.raceInterval = setTimeout(run, TICK_MS);
      };
      this.raceInterval = setTimeout(run, TICK_MS);
    },
    stopRaceLoop() {
      if (this.raceInterval) clearTimeout(this.raceInterval);
      if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
      this.raceInterval = null;
      this.animationFrame = null;
    },
  },
};
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main {
  flex: 1;
  display: flex;
  gap: 16px;
  padding: 16px;
  min-height: 0;
}
.main__horse-list {
  flex: 0 0 280px;
  width: 280px;
  min-width: 280px;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.main__horse-list > :deep(*) {
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
}
.main__track {
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
}
.main__program-results {
  flex: 0 0 536px;
  width: 536px;
  min-width: 536px;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.main__program-results > :deep(*) {
  flex: 1 1 0;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: row;
}
</style>

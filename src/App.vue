<template>
  <div class="app">
    <Header @start-race="startRace" />
    <div class="main">
      <HorseList />
      <RaceTrack />
      <ProgramResults />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import HorseList from './components/HorseList.vue';
import RaceTrack from './components/RaceTrack.vue';
import ProgramResults from './components/ProgramResults.vue';

const RACE_DURATION_MS = 8000;
const TICK_MS = 80;

export default {
  name: 'App',
  components: {
    Header,
    HorseList,
    RaceTrack,
    ProgramResults,
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
      const program = this.$store.state.game.program;
      if (!program.length) return;
      let roundIndex = this.$store.state.game.currentRoundIndex;
      if (roundIndex < 0) roundIndex = 0;
      this.$store.dispatch('game/setCurrentRound', roundIndex);
      this.runRaceLoop();
    },
    runRaceLoop() {
      const run = () => {
        if (this.$store.state.game.isPaused) {
          this.animationFrame = requestAnimationFrame(run);
          return;
        }
        const program = this.$store.state.game.program;
        const currentRoundIndex = this.$store.state.game.currentRoundIndex;
        if (currentRoundIndex >= program.length) {
          this.$store.dispatch('game/setRacing', false);
          this.$store.dispatch('game/setCurrentRound', -1);
          return;
        }
        const round = program[currentRoundIndex];
        const elapsed = this.$store.state.game.raceElapsedMs || 0;
        const nextElapsed = elapsed + TICK_MS;
        const progress = {};
        round.horses.forEach((horse) => {
          const factor = horse.condition / 100;
          const pct = Math.min(100, (nextElapsed / RACE_DURATION_MS) * 100 * (0.7 + factor * 0.6));
          progress[horse.id] = pct;
        });
        this.$store.dispatch('game/setProgress', progress);
        if (nextElapsed >= RACE_DURATION_MS) {
          const positions = [...round.horses]
            .sort((a, b) => (progress[b.id] ?? 0) - (progress[a.id] ?? 0))
            .map((h) => ({ name: h.name }));
          this.$store.dispatch('game/appendResult', {
            roundIndex: round.roundIndex,
            distance: round.distance,
            positions,
          });
          this.$store.dispatch('game/setCurrentRound', currentRoundIndex + 1);
          this.$store.commit('game/SET_PROGRESS', {});
          if (currentRoundIndex + 1 >= program.length) {
            this.$store.dispatch('game/setRacing', false);
            this.$store.dispatch('game/setCurrentRound', -1);
            return;
          }
          this.animationFrame = requestAnimationFrame(run);
          return;
        }
        this.$store.commit('game/SET_RACE_ELAPSED', nextElapsed);
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
</style>

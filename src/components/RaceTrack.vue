<template>
  <section class="race-track">
    <h2 class="track-title">Race Track</h2>
    <div class="track-wrapper">
      <div class="lanes">
        <div
          v-for="lane in 10"
          :key="lane"
          class="lane"
          :class="{ active: currentRound && currentRound.horses.some((h) => h.lane === lane) }"
        >
          <div class="lane-number">{{ lane }}</div>
          <div class="lane-strip">
            <div
              v-for="h in horsesInLane(lane)"
              :key="h.id"
              class="horse-runner"
              :style="runnerStyle(h)"
            >
              <span class="horse-icon">🐴</span>
              <span class="horse-name">{{ h.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="finish-line">FINISH</div>
    </div>
    <div v-if="currentRound" class="lap-info">
      Round {{ currentRound.roundIndex }} — {{ currentRound.distance }} m
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
const COLOR_MAP = {
  Red: '#e74c3c',
  Blue: '#3498db',
  Yellow: '#f1c40f',
  Green: '#27ae60',
  Orange: '#e67e22',
  Purple: '#9b59b6',
  Pink: '#e91e8c',
  Cyan: '#00bcd4',
  Brown: '#795548',
  Magenta: '#e91e63',
  Lime: '#cddc39',
  Teal: '#009688',
  Navy: '#1976d2',
  Maroon: '#7b1fa2',
  Olive: '#808000',
  Coral: '#ff7f50',
  Indigo: '#3f51b5',
  Crimson: '#dc143c',
  Gold: '#ffd700',
  Silver: '#c0c0c0',
};
export default {
  name: 'RaceTrack',
  computed: {
    ...mapGetters('game', ['currentRound', 'progress']),
  },
  methods: {
    horsesInLane(lane) {
      if (!this.currentRound) return [];
      return this.currentRound.horses.filter((h) => h.lane === lane);
    },
    runnerStyle(horse) {
      const pct = this.progress[horse.id] != null ? this.progress[horse.id] : 0;
      const color = COLOR_MAP[horse.color] || '#888';
      return {
        left: `${Math.min(pct, 100)}%`,
        borderColor: color,
      };
    },
  },
};
</script>

<style scoped>
.race-track {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: #0f3460;
  padding: 16px;
  border-radius: 8px;
}
.track-title {
  margin: 0 0 12px;
  font-size: 1.1rem;
  color: #fff;
}
.track-wrapper {
  position: relative;
  flex: 1;
  min-height: 320px;
}
.lanes {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.lane {
  display: flex;
  align-items: center;
  height: 36px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 4px;
}
.lane.active {
  background: rgba(255, 255, 255, 0.1);
}
.lane-number {
  width: 28px;
  flex-shrink: 0;
  text-align: center;
  font-weight: bold;
  color: #888;
}
.lane-strip {
  flex: 1;
  height: 100%;
  position: relative;
  border-radius: 4px;
}
.horse-runner {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: left 0.15s linear;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px 8px;
  border-radius: 6px;
  border: 2px solid;
  background: rgba(0, 0, 0, 0.4);
  white-space: nowrap;
}
.horse-icon {
  font-size: 1.2rem;
}
.horse-name {
  font-size: 0.75rem;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.finish-line {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 48px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #fff;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  letter-spacing: 2px;
}
.lap-info {
  margin-top: 12px;
  color: #aaa;
  font-size: 0.9rem;
}
</style>

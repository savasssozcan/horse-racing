<template>
  <section class="race-track">
    <div class="race-track__wrapper">
      <div class="race-track__lanes">
        <Lane
          v-for="laneNum in LANE_COUNT"
          :key="laneNum"
          :lane-number="laneNum"
          :horses="currentRound?.horses ?? []"
          :progress="progress"
        />
      </div>
      <FinishLine />
    </div>
    <div class="race-track__footer">
      <LapInfo :round="currentRound" />
    </div>
  </section>
</template>

<script>
import Lane from './track/Lane.vue';
import FinishLine from './track/FinishLine.vue';
import LapInfo from './track/LapInfo.vue';
import { useRaceStore } from '../composables/useRaceStore';
import { LANE_COUNT } from '../constants/track';

export default {
  name: 'RaceTrack',
  components: {
    Lane,
    FinishLine,
    LapInfo,
  },
  setup() {
    const { currentRound, progress } = useRaceStore();
    return {
      currentRound,
      progress,
      LANE_COUNT,
    };
  },
};
</script>

<style scoped>
.race-track {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: #16213e;
  padding: 16px;
  border-radius: 8px;
  height: 100%;
}
.race-track__wrapper {
  position: relative;
  flex: 1;
  min-height: 0;
  background: #1e3a5f;
  border-radius: 4px;
  overflow: hidden;
}
.race-track__lanes {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.race-track__footer {
  flex-shrink: 0;
  margin-top: 12px;
  min-height: 1.5rem;
  text-align: center;
}
</style>

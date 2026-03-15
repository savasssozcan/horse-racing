<template>
  <div class="lane">
    <div class="lane__number">{{ laneNumber }}</div>
    <div class="lane__strip">
      <HorseRunner
        v-for="horse in horsesInLane"
        :key="horse.id"
        :horse="horse"
        :progress-pct="getProgress(horse.id)"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import HorseRunner from './HorseRunner.vue';

export default {
  name: 'Lane',
  components: { HorseRunner },
  props: {
    laneNumber: {
      type: Number,
      required: true,
    },
    horses: {
      type: Array,
      default: () => [],
    },
    progress: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const horsesInLane = computed(() =>
      props.horses.filter((h) => h.lane === props.laneNumber)
    );
    const getProgress = (horseId) => props.progress[horseId] ?? 0;
    return {
      horsesInLane,
      getProgress,
    };
  },
};
</script>

<style scoped>
.lane {
  display: flex;
  align-items: stretch;
  flex: 1;
  min-height: 32px;
  border-bottom: 2px dashed rgba(255, 255, 255, 0.15);
}
.lane:last-child {
  border-bottom: none;
}
.lane__number {
  width: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f3460;
  color: #7eb8da;
  font-weight: bold;
  font-size: 0.95rem;
}
.lane__strip {
  flex: 1;
  position: relative;
  background: rgba(255, 255, 255, 0.04);
}
</style>

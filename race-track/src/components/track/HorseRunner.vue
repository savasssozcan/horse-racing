<template>
  <div
    class="horse-runner"
    :style="runnerStyle"
  >
    <span class="horse-runner__name">{{ horse.name }}</span>
    <HorseIcon class="horse-runner__icon" :color="horseColor" />
  </div>
</template>

<script>
import { computed } from 'vue';
import { getColorHex } from '../../utils/colors';
import HorseIcon from './HorseIcon.vue';

export default {
  name: 'HorseRunner',
  components: { HorseIcon },
  props: {
    horse: {
      type: Object,
      required: true,
    },
    progressPct: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const horseColor = computed(() => getColorHex(props.horse.color));
    const runnerStyle = computed(() => {
      const pct = Math.min(100, props.progressPct);
      return {
        left: `${pct}%`,
        borderColor: horseColor.value,
      };
    });
    return { horseColor, runnerStyle };
  },
};
</script>

<style scoped>
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
.horse-runner__icon {
  flex-shrink: 0;
}
.horse-runner__name {
  font-size: 0.75rem;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

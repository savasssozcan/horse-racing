<template>
  <div class="lap-info">
    {{ lapLabel }}
  </div>
</template>

<script>
function ordinalSuffix(n) {
  if (n % 10 === 1 && n % 100 !== 11) return 'ST';
  if (n % 10 === 2 && n % 100 !== 12) return 'ND';
  if (n % 10 === 3 && n % 100 !== 13) return 'RD';
  return 'TH';
}

export default {
  name: 'LapInfo',
  props: {
    round: {
      type: Object,
      default: null,
    },
  },
  computed: {
    lapLabel() {
      if (!this.round) return '';
      const n = this.round.roundIndex;
      const ord = ordinalSuffix(n);
      return `${n}${ord} Lap ${this.round.distance}m`;
    },
  },
};
</script>

<style scoped>
.lap-info {
  min-height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7eb8da;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
}
</style>

<template>
  <div class="program-round" :class="{ 'program-round--active': isActive }">
    <strong>{{ roundTitle }}</strong>
    <ul class="program-round__list">
      <li
        v-for="horse in round.horses"
        :key="horse.id"
        class="program-round__item"
      >
        Lane {{ horse.lane }}: {{ horse.name }}
      </li>
    </ul>
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
  name: 'ProgramRoundItem',
  props: {
    round: {
      type: Object,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    roundTitle() {
      const n = this.round.roundIndex;
      const ord = ordinalSuffix(n);
      return `${n}${ord} Lap - ${this.round.distance}m`;
    },
  },
};
</script>

<style scoped>
.program-round {
  margin-bottom: 16px;
}
.program-round__list {
  margin: 4px 0 0;
  padding-left: 20px;
}
.program-round__item {
  margin: 2px 0;
}
.program-round--active {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px;
  border-radius: 6px;
}
</style>

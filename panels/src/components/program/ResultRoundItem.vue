<template>
  <div class="result-round">
    <strong>{{ roundTitle }}</strong>
    <DataTable
      :columns="positionColumns"
      :data="round.positions"
      :row-key="rowKey"
      compact
    />
  </div>
</template>

<script>
import DataTable from '../ui/DataTable.vue';

function ordinalSuffix(n) {
  if (n % 10 === 1 && n % 100 !== 11) return 'ST';
  if (n % 10 === 2 && n % 100 !== 12) return 'ND';
  if (n % 10 === 3 && n % 100 !== 13) return 'RD';
  return 'TH';
}

const POSITION_COLUMNS = [
  { key: 'position', label: 'Position', formatter: (_, __, index) => index + 1 },
  { key: 'name', label: 'Name' },
];

export default {
  name: 'ResultRoundItem',
  components: { DataTable },
  props: {
    round: {
      type: Object,
      required: true,
    },
  },
  computed: {
    roundTitle() {
      const n = this.round.roundIndex;
      const ord = ordinalSuffix(n);
      return `${n}${ord} Lap - ${this.round.distance}m`;
    },
  },
  setup() {
    return {
      positionColumns: POSITION_COLUMNS,
      rowKey: (row, index) => `pos-${index}-${row.name}`,
    };
  },
};
</script>

<style scoped>
.result-round {
  margin-bottom: 16px;
}
.result-round .data-table {
  margin-top: 6px;
}
</style>

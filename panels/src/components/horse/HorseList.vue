<template>
  <Panel class="horse-list" title="Horse List">
    <DataTable
      v-if="horses.length"
      :columns="columns"
      :data="horses"
      row-key="id"
    >
      <template #color="{ value }">
        <ColorBadge :color-name="value" />
      </template>
    </DataTable>
    <p v-else class="horse-list__empty">{{ emptyMessage }}</p>
  </Panel>
</template>

<script>
import { computed } from 'vue';
import Panel from '../ui/Panel.vue';
import DataTable from '../ui/DataTable.vue';
import ColorBadge from '../ui/ColorBadge.vue';
import { useGameStore } from '../../composables/useGameStore';
import { EMPTY_MESSAGES } from '../../constants/messages';

export default {
  name: 'HorseList',
  components: {
    Panel,
    DataTable,
    ColorBadge,
  },
  setup() {
    const { horses } = useGameStore();
    const emptyMessage = computed(() => EMPTY_MESSAGES.horseList);

    const columns = [
      { key: 'index', label: '#', formatter: (_, __, index) => index + 1 },
      { key: 'name', label: 'Name' },
      { key: 'condition', label: 'Condition' },
      { key: 'color', label: 'Color' },
    ];

    return {
      horses,
      columns,
      emptyMessage,
    };
  },
};
</script>

<style scoped>
.horse-list {
  width: 100%;
  min-width: 0;
}
.horse-list__empty {
  color: #888;
  font-size: 0.9rem;
  margin: 0;
}
</style>

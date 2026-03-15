<template>
  <table class="data-table" :class="{ 'data-table--compact': compact }">
    <thead class="data-table__head">
      <tr>
        <th
          v-for="col in columns"
          :key="col.key"
          class="data-table__th"
        >
          {{ col.label }}
        </th>
      </tr>
    </thead>
    <tbody class="data-table__body">
      <tr v-for="(row, rowIndex) in data" :key="getRowKey(row, rowIndex)" class="data-table__row">
        <td
          v-for="col in columns"
          :key="col.key"
          class="data-table__td"
        >
          <slot
            v-if="$slots[col.key]"
            :name="col.key"
            :row="row"
            :value="formatCell(row, col, rowIndex)"
            :index="rowIndex"
          />
          <template v-else>
            {{ formatCell(row, col, rowIndex) }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      default: () => [],
    },
    rowKey: {
      type: [String, Function],
      default: 'id',
    },
    compact: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getRowKey(row, index) {
      return typeof this.rowKey === 'function'
        ? this.rowKey(row, index)
        : row[this.rowKey];
    },
    getCellValue(row, col) {
      const val = row[col.key];
      return col.formatter ? col.formatter(val, row, -1) : val;
    },
    formatCell(row, col, rowIndex) {
      const val = row[col.key];
      return col.formatter ? col.formatter(val, row, rowIndex) : val;
    },
  },
};
</script>

<style scoped>
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}
.data-table__th,
.data-table__td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}
.data-table__th {
  color: #aaa;
  font-weight: 600;
}
.data-table--compact .data-table__th,
.data-table--compact .data-table__td {
  padding: 4px 8px;
  font-size: 0.8rem;
}
</style>

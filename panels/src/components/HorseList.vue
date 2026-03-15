<template>
  <aside class="horse-list">
    <h2 class="panel-title">Horse List</h2>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Condition</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(horse, i) in horses" :key="horse.id">
          <td>{{ i + 1 }}</td>
          <td>{{ horse.name }}</td>
          <td>{{ horse.condition }}</td>
          <td>
            <span
              class="color-dot"
              :style="{ backgroundColor: colorToHex(horse.color) }"
            />
            {{ horse.color }}
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="!horses.length" class="empty">Click GENERATE PROGRAM to create horses and program.</p>
  </aside>
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
  name: 'HorseList',
  computed: {
    ...mapGetters('game', ['horses']),
  },
  methods: {
    colorToHex(name) {
      return COLOR_MAP[name] || '#888';
    },
  },
};
</script>

<style scoped>
.horse-list {
  width: 280px;
  min-width: 280px;
  background: #16213e;
  padding: 16px;
  border-radius: 8px;
  overflow: auto;
}
.panel-title {
  margin: 0 0 12px;
  font-size: 1.1rem;
  color: #fff;
}
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}
.table th,
.table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #2a2a4a;
}
.table th {
  color: #aaa;
  font-weight: 600;
}
.color-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 6px;
  vertical-align: middle;
}
.empty {
  color: #888;
  font-size: 0.9rem;
}
</style>

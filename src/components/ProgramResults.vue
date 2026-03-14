<template>
  <aside class="program-results">
    <div class="panel program-panel">
      <h2 class="panel-title program-title">Program</h2>
      <div class="program-list">
        <div
          v-for="(round, i) in program"
          :key="i"
          class="program-round"
          :class="{ active: currentRoundIndex === i }"
        >
          <strong>Round {{ round.roundIndex }}</strong> — {{ round.distance }} m
          <ul>
            <li v-for="h in round.horses" :key="h.id">
              Lane {{ h.lane }}: {{ h.name }} ({{ h.condition }})
            </li>
          </ul>
        </div>
      </div>
      <p v-if="!program.length" class="empty">Generate program first.</p>
    </div>
    <div class="panel results-panel">
      <h2 class="panel-title results-title">Results</h2>
      <div class="results-list">
        <div
          v-for="(round, i) in results"
          :key="i"
          class="result-round"
        >
          <strong>Round {{ round.roundIndex }} — {{ round.distance }} m</strong>
          <table class="result-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, pos) in round.positions" :key="pos">
                <td>{{ pos + 1 }}</td>
                <td>{{ row.name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p v-if="!results.length" class="empty">No results yet.</p>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ProgramResults',
  computed: {
    ...mapGetters('game', ['program', 'results', 'currentRoundIndex']),
  },
};
</script>

<style scoped>
.program-results {
  width: 320px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: auto;
}
.panel {
  padding: 16px;
  border-radius: 8px;
  overflow: auto;
}
.program-panel {
  background: #1e3a5f;
}
.results-panel {
  background: #1a472a;
}
.panel-title {
  margin: 0 0 12px;
  font-size: 1.1rem;
  color: #fff;
}
.program-title {
  color: #7eb8da;
}
.results-title {
  color: #7dce82;
}
.program-list,
.results-list {
  font-size: 0.85rem;
}
.program-round,
.result-round {
  margin-bottom: 16px;
}
.program-round ul,
.result-round ul {
  margin: 4px 0 0;
  padding-left: 20px;
}
.program-round li {
  margin: 2px 0;
}
.program-round.active {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px;
  border-radius: 6px;
}
.result-table {
  width: 100%;
  margin-top: 6px;
  border-collapse: collapse;
  font-size: 0.8rem;
}
.result-table th,
.result-table td {
  padding: 4px 8px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.result-table th {
  color: #aaa;
}
.empty {
  color: #888;
  font-size: 0.9rem;
  margin: 0;
}
</style>

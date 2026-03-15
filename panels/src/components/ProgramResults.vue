<template>
  <aside class="program-results">
    <Panel variant="program" title="Program">
      <template v-if="program.length">
        <ProgramRoundItem
          v-for="(round, i) in program"
          :key="roundKey(round, i)"
          :round="round"
          :is-active="currentRoundIndex === i"
        />
      </template>
      <p v-else class="program-results__empty">{{ emptyMessages.program }}</p>
    </Panel>
    <Panel variant="results" title="Results">
      <template v-if="results.length">
        <ResultRoundItem
          v-for="(round, i) in results"
          :key="resultRoundKey(round, i)"
          :round="round"
        />
      </template>
      <p v-else class="program-results__empty">{{ emptyMessages.results }}</p>
    </Panel>
  </aside>
</template>

<script>
import { computed } from 'vue';
import Panel from './ui/Panel.vue';
import ProgramRoundItem from './program/ProgramRoundItem.vue';
import ResultRoundItem from './program/ResultRoundItem.vue';
import { useGameStore } from '../composables/useGameStore';
import { EMPTY_MESSAGES } from '../constants/messages';

export default {
  name: 'ProgramResults',
  components: {
    Panel,
    ProgramRoundItem,
    ResultRoundItem,
  },
  setup() {
    const { program, results, currentRoundIndex } = useGameStore();

    const emptyMessages = computed(() => ({
      program: EMPTY_MESSAGES.program,
      results: EMPTY_MESSAGES.results,
    }));

    const roundKey = (round, i) => `program-${i}-${round.roundIndex}-${round.distance}`;
    const resultRoundKey = (round, i) => `result-${i}-${round.roundIndex}`;

    return {
      program,
      results,
      currentRoundIndex,
      emptyMessages,
      roundKey,
      resultRoundKey,
    };
  },
};
</script>

<style scoped>
.program-results {
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}
.program-results > :deep(.panel) {
  flex: 1 1 0;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}
.program-results__empty {
  color: #888;
  font-size: 0.9rem;
  margin: 0;
}
</style>
import { computed } from 'vue';
import { useStore } from 'vuex';

export function useRaceStore() {
  const store = useStore();

  return {
    currentRound: computed(() => store.getters['program/currentRound'] ?? null),
    progress: computed(() => store.getters['race/progress'] ?? {}),
  };
}

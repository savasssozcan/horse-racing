import { computed } from 'vue';
import { useStore } from 'vuex';

export function useGameStore() {
  const store = useStore();

  return {
    horses: computed(() => store.getters['horses/list'] ?? []),
    program: computed(() => store.getters['program/items'] ?? []),
    results: computed(() => store.getters['results/items'] ?? []),
    currentRoundIndex: computed(() => store.getters['program/currentRoundIndex'] ?? -1),
  };
}

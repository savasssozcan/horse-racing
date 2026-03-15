import { createStore } from 'vuex';

export function createTestStore(initialState = {}) {
  const horses = initialState.horses ?? {};
  const program = initialState.program ?? {};
  const results = initialState.results ?? {};
  return createStore({
    state: {
      horses: { list: horses.list ?? [] },
      program: {
        items: program.items ?? [],
        currentRoundIndex: program.currentRoundIndex ?? -1,
      },
      results: { items: Array.isArray(results) ? results : (results.items ?? []) },
    },
    getters: {
      'horses/list': (s) => s.horses?.list ?? [],
      'program/items': (s) => s.program?.items ?? [],
      'program/currentRoundIndex': (s) => s.program?.currentRoundIndex ?? -1,
      'results/items': (s) => s.results?.items ?? [],
    },
  });
}

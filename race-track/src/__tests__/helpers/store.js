import { createStore } from 'vuex';

export function createRaceTestStore(initialState = {}) {
  const program = initialState.program ?? {};
  const race = initialState.race ?? {};
  return createStore({
    state: {
      program: {
        items: program.items ?? [],
        currentRoundIndex: program.currentRoundIndex ?? -1,
        currentRound: program.currentRound ?? null,
      },
      race: {
        progress: race.progress ?? {},
      },
    },
    getters: {
      'program/currentRound': (s) => {
        const p = s.program;
        if (p?.currentRound !== undefined) return p.currentRound;
        const idx = p?.currentRoundIndex ?? -1;
        const items = p?.items ?? [];
        return idx >= 0 && items[idx] ? items[idx] : null;
      },
      'race/progress': (s) => s.race?.progress ?? {},
    },
  });
}

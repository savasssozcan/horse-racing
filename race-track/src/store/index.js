import { createStore } from 'vuex';
import game from './modules/game';

export default createStore({
  modules: {
    game,
  },
  getters: {
    'program/currentRound': (s) => {
      const g = s.game;
      if (!g || g.currentRoundIndex < 0 || !g.program?.length) return null;
      return g.program[g.currentRoundIndex] ?? null;
    },
    'race/progress': (s) => s.game?.progress ?? {},
  },
});

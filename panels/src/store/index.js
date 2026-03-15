import { createStore } from 'vuex';
import game from './modules/game';
import { getStandaloneMockData } from '../mock/standaloneData';

const standaloneMock = getStandaloneMockData();
const gameWithInitialState = {
  ...game,
  state: () => ({
    horses: standaloneMock.horses,
    program: standaloneMock.program,
    results: standaloneMock.results,
    currentRoundIndex: standaloneMock.currentRoundIndex,
  }),
};

export default createStore({
  modules: {
    game: gameWithInitialState,
  },
  getters: {
    'horses/list': (s) => s.game?.horses ?? [],
    'program/items': (s) => s.game?.program ?? [],
    'program/currentRoundIndex': (s) => s.game?.currentRoundIndex ?? -1,
    'results/items': (s) => s.game?.results ?? [],
  },
});

import { PROGRAM, PROGRAM_ACTIONS, RACE_ACTIONS, RESULTS_ACTIONS } from '../constants';
import { ROUND_DISTANCES, shuffle } from '../config';

const state = () => ({
  items: [],
  currentRoundIndex: -1,
});

const getters = {
  items: (s) => s.items,
  currentRoundIndex: (s) => s.currentRoundIndex,
  currentRound(state) {
    const i = state.currentRoundIndex;
    return i >= 0 && state.items[i] ? state.items[i] : null;
  },
  canGenerate: (state) => state.items.length === 0,
  canReset: (state) => state.items.length > 0,
};

const mutations = {
  [PROGRAM.SET_ITEMS](state, items) {
    state.items = items;
    state.currentRoundIndex = -1;
  },
  [PROGRAM.SET_CURRENT_ROUND_INDEX](state, index) {
    state.currentRoundIndex = index;
  },
};

const actions = {
  async generate({ rootState, commit, dispatch }) {
    await dispatch('horses/generate', null, { root: true });
    const horses = rootState.horses.list ?? [];
    if (horses.length !== 20) return;

    const program = ROUND_DISTANCES.map((distance, index) => {
      const shuffled = shuffle(horses);
      const selected = shuffled.slice(0, 10).map((h, pos) => ({
        ...h,
        lane: pos + 1,
      }));
      return {
        roundIndex: index + 1,
        distance,
        horses: selected,
      };
    });

    commit(PROGRAM.SET_ITEMS, program);
    dispatch(RESULTS_ACTIONS.CLEAR, null, { root: true });
  },

  async setCurrentRound({ commit, dispatch }, index) {
    commit(PROGRAM.SET_CURRENT_ROUND_INDEX, index);
    await dispatch(RACE_ACTIONS.RESET_PROGRESS, null, { root: true });
  },

  reset({ commit, dispatch }) {
    commit(PROGRAM.SET_ITEMS, []);
    dispatch('horses/clear', null, { root: true });
    dispatch(RESULTS_ACTIONS.CLEAR, null, { root: true });
    dispatch('race/reset', null, { root: true });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

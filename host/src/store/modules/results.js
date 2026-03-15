import { RESULTS, RESULTS_ACTIONS } from '../constants';

const state = () => ({
  items: [],
});

const getters = {
  items: (s) => s.items,
};

const mutations = {
  [RESULTS.APPEND](state, roundResult) {
    state.items = [...state.items, roundResult];
  },
  [RESULTS.CLEAR](state) {
    state.items = [];
  },
};

const actions = {
  append({ commit }, roundResult) {
    commit(RESULTS.APPEND, roundResult);
  },
  clear({ commit }) {
    commit(RESULTS.CLEAR);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

import { RACE } from '../constants';

const state = () => ({
  isRacing: false,
  isPaused: false,
  progress: {},
  raceElapsedMs: 0,
});

const getters = {
  isRacing: (s) => s.isRacing,
  isPaused: (s) => s.isPaused,
  progress: (s) => s.progress,
  raceElapsedMs: (s) => s.raceElapsedMs ?? 0,
  canStart(state, getters, rootState) {
    const program = rootState.program?.items ?? [];
    return program.length === 6 && !state.isRacing;
  },
};

const mutations = {
  [RACE.SET_RACING](state, value) {
    state.isRacing = value;
  },
  [RACE.SET_PAUSED](state, value) {
    state.isPaused = value;
  },
  [RACE.SET_PROGRESS](state, payload) {
    state.progress = { ...state.progress, ...payload };
  },
  [RACE.RESET_PROGRESS](state) {
    state.progress = {};
    state.raceElapsedMs = 0;
  },
  [RACE.SET_ELAPSED_MS](state, value) {
    state.raceElapsedMs = value;
  },
};

const actions = {
  setProgress({ commit }, progress) {
    commit(RACE.SET_PROGRESS, progress);
  },
  setRacing({ commit }, value) {
    commit(RACE.SET_RACING, value);
  },
  setPaused({ commit }, value) {
    commit(RACE.SET_PAUSED, value);
  },
  resetProgress({ commit }) {
    commit(RACE.RESET_PROGRESS);
  },
  setElapsedMs({ commit }, value) {
    commit(RACE.SET_ELAPSED_MS, value);
  },
  appendResult({ dispatch }, roundResult) {
    return dispatch('results/append', roundResult, { root: true });
  },
  reset({ commit }) {
    commit(RACE.SET_RACING, false);
    commit(RACE.SET_PAUSED, false);
    commit(RACE.RESET_PROGRESS);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

import { HORSES } from '../constants';
import {
  HORSE_NAMES,
  HORSE_COLORS,
  createHorse,
  randomCondition,
} from '../config';

const state = () => ({
  list: [],
});

const getters = {
  list: (s) => s.list,
};

const mutations = {
  [HORSES.SET_LIST](state, list) {
    state.list = list;
  },
};

const actions = {
  clear({ commit }) {
    commit(HORSES.SET_LIST, []);
  },
  generate({ commit }) {
    const usedColors = new Set();
    const list = HORSE_NAMES.map((name, i) => {
      let color = HORSE_COLORS[i];
      if (usedColors.has(color)) {
        const left = HORSE_COLORS.filter((c) => !usedColors.has(c));
        color = left[Math.floor(Math.random() * left.length)];
      }
      usedColors.add(color);
      return createHorse(`horse-${i + 1}`, name, randomCondition(), color);
    });
    commit(HORSES.SET_LIST, list);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

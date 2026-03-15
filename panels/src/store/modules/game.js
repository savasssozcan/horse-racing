export default {
  namespaced: true,
  state: () => ({
    horses: [],
    program: [],
    results: [],
    currentRoundIndex: -1,
  }),
  getters: {
    horses: (s) => s.horses,
    program: (s) => s.program,
    results: (s) => s.results,
    currentRoundIndex: (s) => s.currentRoundIndex,
  },
  mutations: {
    SET_STANDALONE_MOCK(state, { horses, program, results, currentRoundIndex }) {
      if (horses != null) state.horses = horses;
      if (program != null) state.program = program;
      if (results != null) state.results = results;
      if (currentRoundIndex != null) state.currentRoundIndex = currentRoundIndex;
    },
  },
};

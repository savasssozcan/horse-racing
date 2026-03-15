export default {
  namespaced: true,
  state: () => ({
    currentRoundIndex: -1,
    program: [],
    progress: {},
  }),
  getters: {
    currentRoundIndex: (s) => s.currentRoundIndex,
    currentRound: (s) =>
      s.currentRoundIndex >= 0 && s.program[s.currentRoundIndex]
        ? s.program[s.currentRoundIndex]
        : null,
    progress: (s) => s.progress,
  },
  mutations: {
    SET_STANDALONE_MOCK(state, { program, currentRoundIndex, progress }) {
      if (program != null) state.program = program;
      if (currentRoundIndex != null) state.currentRoundIndex = currentRoundIndex;
      if (progress != null) state.progress = progress;
    },
  },
};

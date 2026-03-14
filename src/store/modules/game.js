const ROUND_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200];
const HORSE_NAMES = [
  'Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton', 'Joan Clarke',
  'Katherine Johnson', 'Hedy Lamarr', 'Barbara Liskov', 'Frances Allen',
  'Carol Shaw', 'Radia Perlman', 'Jean Sammet', 'Mary Wilkes',
  'Adele Goldberg', 'Sister Mary Keller', 'Elizabeth Feinler', 'Anita Borg',
  'Karen Spärck Jones', 'Shafi Goldwasser', 'Laura Haas', 'Ruzena Bajcsy',
];
const HORSE_COLORS = [
  'Red', 'Blue', 'Yellow', 'Green', 'Orange', 'Purple', 'Pink', 'Cyan',
  'Brown', 'Magenta', 'Lime', 'Teal', 'Navy', 'Maroon', 'Olive', 'Coral',
  'Indigo', 'Crimson', 'Gold', 'Silver',
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default {
  namespaced: true,
  state: () => ({
    horses: [],
    program: [],
    results: [],
    currentRoundIndex: -1,
    isRacing: false,
    isPaused: false,
    progress: {},
    raceDurationMs: 8000,
    raceElapsedMs: 0,
  }),
  getters: {
    horses: (s) => s.horses,
    program: (s) => s.program,
    results: (s) => s.results,
    currentRoundIndex: (s) => s.currentRoundIndex,
    currentRound: (s) =>
      s.currentRoundIndex >= 0 && s.program[s.currentRoundIndex]
        ? s.program[s.currentRoundIndex]
        : null,
    isRacing: (s) => s.isRacing,
    isPaused: (s) => s.isPaused,
    progress: (s) => s.progress,
    canGenerate: () => true,
    canStart: (s) => s.program.length === 6 && !s.isRacing,
  },
  mutations: {
    SET_HORSES(state, list) {
      state.horses = list;
    },
    SET_PROGRAM(state, program) {
      state.program = program;
      state.results = [];
      state.currentRoundIndex = -1;
      state.progress = {};
    },
    SET_RESULTS(state, results) {
      state.results = results;
    },
    APPEND_RESULT(state, roundResult) {
      state.results = [...state.results, roundResult];
    },
    SET_CURRENT_ROUND(state, index) {
      state.currentRoundIndex = index;
      state.progress = {};
    },
    SET_PROGRESS(state, payload) {
      state.progress = { ...state.progress, ...payload };
    },
    SET_RACING(state, value) {
      state.isRacing = value;
    },
    SET_PAUSED(state, value) {
      state.isPaused = value;
    },
    SET_RACE_ELAPSED(state, value) {
      state.raceElapsedMs = value;
    },
  },
  actions: {
    generateHorses({ commit }) {
      const usedColors = new Set();
      const list = HORSE_NAMES.map((name, i) => {
        let color = HORSE_COLORS[i];
        if (usedColors.has(color)) {
          const left = HORSE_COLORS.filter((c) => !usedColors.has(c));
          color = left[Math.floor(Math.random() * left.length)];
        }
        usedColors.add(color);
        return {
          id: `horse-${i + 1}`,
          name,
          condition: randomInt(1, 100),
          color,
        };
      });
      commit('SET_HORSES', list);
      commit('SET_PROGRAM', []);
      commit('SET_RESULTS', []);
    },
    async generateProgram({ state, dispatch, commit }) {
      if (state.horses.length !== 20) {
        await dispatch('generateHorses');
      }
      const horses = state.horses;
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
      commit('SET_PROGRAM', program);
    },
    setProgress({ commit }, progress) {
      commit('SET_PROGRESS', progress);
    },
    appendResult({ commit }, roundResult) {
      commit('APPEND_RESULT', roundResult);
    },
    setCurrentRound({ commit }, index) {
      commit('SET_CURRENT_ROUND', index);
      commit('SET_RACE_ELAPSED', 0);
    },
    setRacing({ commit }, value) {
      commit('SET_RACING', value);
    },
    setPaused({ commit }, value) {
      commit('SET_PAUSED', value);
    },
  },
};

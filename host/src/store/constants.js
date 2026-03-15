export const HORSES = {
  SET_LIST: 'horses/SET_LIST',
};
export const HORSES_ACTIONS = {
  GENERATE: 'horses/generate',
};

export const PROGRAM = {
  SET_ITEMS: 'program/SET_ITEMS',
  SET_CURRENT_ROUND_INDEX: 'program/SET_CURRENT_ROUND_INDEX',
};
export const PROGRAM_ACTIONS = {
  GENERATE: 'program/generate',
  SET_CURRENT_ROUND: 'program/setCurrentRound',
};

export const RACE = {
  SET_RACING: 'race/SET_RACING',
  SET_PAUSED: 'race/SET_PAUSED',
  SET_PROGRESS: 'race/SET_PROGRESS',
  RESET_PROGRESS: 'race/RESET_PROGRESS',
  SET_ELAPSED_MS: 'race/SET_ELAPSED_MS',
};
export const RACE_ACTIONS = {
  SET_PROGRESS: 'race/setProgress',
  SET_RACING: 'race/setRacing',
  SET_PAUSED: 'race/setPaused',
  RESET_PROGRESS: 'race/resetProgress',
  SET_ELAPSED_MS: 'race/setElapsedMs',
  APPEND_RESULT: 'race/appendResult',
};

export const RESULTS = {
  APPEND: 'results/APPEND',
  CLEAR: 'results/CLEAR',
};
export const RESULTS_ACTIONS = {
  APPEND: 'results/append',
  CLEAR: 'results/clear',
};

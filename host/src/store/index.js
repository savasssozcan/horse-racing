import { createStore } from 'vuex';
import horses from './modules/horses';
import program from './modules/program';
import race from './modules/race';
import results from './modules/results';

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    horses,
    program,
    race,
    results,
  },
});

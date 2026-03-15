import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import { getStandaloneMockData } from './mock/standaloneData';
import './styles/main.css';

store.commit('game/SET_STANDALONE_MOCK', getStandaloneMockData());

createApp(App).use(store).mount('#app');

import Vue from 'vue';
import Vuex from 'vuex';

import { ipcToStore } from './ipc-to-store';
import { userModule } from './user';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    user: userModule
  }
});

ipcToStore(store);

export default store;

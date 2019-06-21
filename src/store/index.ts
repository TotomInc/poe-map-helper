import Vue from 'vue';
import Vuex from 'vuex';

import { userModule } from './user';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    user: userModule
  }
});

export default store;

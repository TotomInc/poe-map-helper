import Vue from 'vue';
import Vuex from 'vuex';

import { ipcToStore } from './ipc-to-store';

import { userModule } from './user';
import { mapModule } from './map';
import { leagueModule } from './league';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    user: userModule,
    map: mapModule,
    league: leagueModule
  }
});

ipcToStore(store);

export default store;

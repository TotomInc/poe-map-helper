import Vue from 'vue';
import Vuex from 'vuex';

import { ipcToStore } from './ipc-to-store';
import { localstorage } from './persist';

import { RootState } from './state';
import { userModule } from './user';
import { mapModule } from './map';
import { rateModule } from './rate';
import { stashModule } from './stash';

Vue.use(Vuex);

const store = new Vuex.Store<RootState>({
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    user: userModule,
    map: mapModule,
    rate: rateModule,
    stash: stashModule,
  },

  plugins: [localstorage.plugin],
});

ipcToStore(store);

export default store;

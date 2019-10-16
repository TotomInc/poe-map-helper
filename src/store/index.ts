import Vue from 'vue';
import Vuex from 'vuex';
import isElectron from 'is-electron';

import { localstorage } from './persist';

import { RootState } from './state';
import { userModule } from './user';
import { mapModule } from './map';
import { rateModule } from './rate';
import { stashModule } from './stash';
import { shareModule } from './share';

Vue.use(Vuex);

const store = new Vuex.Store<RootState>({
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    user: userModule,
    map: mapModule,
    rate: rateModule,
    stash: stashModule,
    share: shareModule,
  },

  plugins: [localstorage.plugin],
});

if (isElectron()) {
  import('./ipc-to-store').then((module) => {
    module.ipcToStore(store);
  });
}

export default store;

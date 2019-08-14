import VuexPersistence from 'vuex-persist';

import { RootState } from './state';

/**
 * Saves a part of the store state into the localStorage.
 */
export const localstorage = new VuexPersistence<RootState>({
  key: 'vuex-state',
  storage: window.localStorage,

  reducer: (state) => ({
    map: {
      mapsHistory: state.map.mapsHistory
    }
  })
});

import { MutationTree } from 'vuex';

import { POEWatchCurrency } from '@/models/POEWatch';
import { RateState } from './rate.state';
import { rateMutations } from './rate.consts';

export const mutations: MutationTree<RateState> = {
  [rateMutations.setLoading](state, payload: void) {
    state.loading = true;
  },

  [rateMutations.removeLoading](state, payload: void) {
    state.loading = false;
  },

  [rateMutations.setCurrenciesRate](state, payload: POEWatchCurrency[]) {
    state.currencies = payload;
  },

  [rateMutations.removeCurrenciesRate](state, payload: void) {
    state.currencies = [];
  },
};

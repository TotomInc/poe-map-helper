import { MutationTree } from 'vuex';

import { POEWatchCurrency } from '@/models/PathOfExile';
import { RateState } from './rate.state';

export const rateMutations = {
  setLoading: 'Set rate loading',
  removeLoading: 'Remove rate loading',

  setCurrenciesRate: 'Set currencies rate',
  removeCurrenciesRate: 'Remove currencies rate'
};

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
  }
};

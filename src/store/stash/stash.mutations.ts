import { MutationTree } from 'vuex';

import { POEStashItem, POEPricedStashItem } from '@/models/PathOfExile';
import { StashState } from './stash.state';
import { stashMutations } from './stash.consts';

export const mutations: MutationTree<StashState> = {
  [stashMutations.setLoading](state, payload: void) {
    state.loading = true;
  },

  [stashMutations.removeLoading](state, payload: void) {
    state.loading = false;
  },

  [stashMutations.setItems](state, payload: POEStashItem[]) {
    state.items = payload;
  },

  [stashMutations.removeItems](state, payload: void) {
    state.items = [];
  },

  [stashMutations.setItemsDiff](state, payload: POEStashItem[]) {
    state.itemsDiff = payload;
  },

  [stashMutations.removeItemsDiff](state, payload: void) {
    state.itemsDiff = [];
  },

  [stashMutations.setItemsDiffIncome](state, payload: POEPricedStashItem[]) {
    state.itemsDiffIncome = payload;
  },

  [stashMutations.removeItemsDiffIncome](state, payload: void) {
    state.itemsDiffIncome = [];
  }
};

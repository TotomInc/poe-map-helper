import { MutationTree } from 'vuex';

import { POEStashItem, POEPricedStashItem } from '@/models/PathOfExile';
import { StashState } from './stash.state';

export const stashMutations = {
  setLoading: 'Set stash loading',
  removeLoading: 'Remove stash loading',

  setItems: 'Set stash items',
  removeItems: 'Remove stash items',

  setItemsDiff: 'Set items diff',
  removeItemsDiff: 'Remove items diff',

  setItemsDiffIncome: 'Set items diff income',
  removeItemsDiffIncome: 'Remove items diff income'
};

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

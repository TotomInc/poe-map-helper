import { MutationTree } from 'vuex';

import { POEStashItem, POEPricedStashItem, POEStashTab } from '@/models/PathOfExile';
import { StashState } from './stash.state';
import { stashMutations } from './stash.consts';

export const mutations: MutationTree<StashState> = {
  [stashMutations.setLoading](state, payload: void) {
    state.loading = true;
  },

  [stashMutations.removeLoading](state, payload: void) {
    state.loading = false;
  },

  [stashMutations.setInitialLoad](state, payload: void) {
    state.initialLoad = true;
  },

  [stashMutations.removeInitialLoad](state, payload: void) {
    state.initialLoad = false;
  },

  [stashMutations.setStashTabs](state, payload: POEStashTab[]) {
    state.stashTabs = payload;
  },

  [stashMutations.removeStashTabs](state, payload: void) {
    state.stashTabs = [];
  },

  [stashMutations.selectStashTab](state, payload: string) {
    state.selectedStashTab = payload;
  },

  [stashMutations.unselectStashTab](state, payload: void) {
    state.selectedStashTab = undefined;
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
  },
};

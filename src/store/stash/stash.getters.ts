import { GetterTree } from 'vuex';

import { RootState } from '../state';
import { StashState } from './stash.state';
import { stashGetters } from './stash.consts';

export const getters: GetterTree<StashState, RootState> = {
  [stashGetters.getTotalItemsDiffIncome](state): { chaos: number; exalt: number } {
    const totalItemsDiffIncome = {
      chaos: 0,
      exalt: 0
    };

    state.itemsDiffIncome.forEach((item) => {
      totalItemsDiffIncome.chaos += item.chaos;
      totalItemsDiffIncome.exalt += item.exalt;

      totalItemsDiffIncome.chaos = Math.round(totalItemsDiffIncome.chaos * 100) / 100;
      totalItemsDiffIncome.exalt = Math.round(totalItemsDiffIncome.exalt * 1000) / 1000;
    });

    return totalItemsDiffIncome;
  },

  [stashGetters.getStashTabIndex](state): number {
    return state.stashTabs.findIndex((tab) => tab.id === state.selectedStashTab);
  }
};

import { Module } from 'vuex';

import { RootState } from '../state';
import { LeagueState, state } from './league.state';
import { actions } from './league.actions';
import { mutations } from './league.mutations';

export const leagueModule: Module<LeagueState, RootState> = {
  state,
  actions,
  mutations
};

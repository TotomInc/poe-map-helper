import { MutationTree } from 'vuex';

import { POELeague } from '@/models/PathOfExileAPI';
import { LeagueState } from './league.state';

export const leagueMutations = {
  setLoading: 'Set league loading',
  removeLoading: 'Remove league loading',

  setLeagues: 'Set leagues',
  removeLeagues: 'Empty leagues array'
};

export const mutations: MutationTree<LeagueState> = {
  [leagueMutations.setLoading](state, payload: void) {
    state.loading = true;
  },

  [leagueMutations.removeLoading](state, payload: void) {
    state.loading = false;
  },

  [leagueMutations.setLeagues](state, payload: POELeague[]) {
    state.leagues = payload;
  },

  [leagueMutations.removeLeagues](state, payload: void) {
    state.leagues = [];
  }
};

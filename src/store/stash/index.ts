import { Module } from 'vuex';

import { RootState } from '../state';
import { StashState, state } from './stash.state';
import { actions } from './stash.actions';
import { mutations } from './stash.mutations';
import { getters } from './stash.getters';

export const stashModule: Module<StashState, RootState> = {
  state,
  actions,
  mutations,
  getters
};

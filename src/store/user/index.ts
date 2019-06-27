import { Module } from 'vuex';

import { RootState } from '../state';
import { UserState, state } from './user.state';
import { actions } from './user.actions';
import { mutations } from './user.mutations';
import { getters } from './user.getters';

export const userModule: Module<UserState, RootState> = {
  state,
  actions,
  mutations,
  getters
};

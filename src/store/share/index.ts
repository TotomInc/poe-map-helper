import { Module } from 'vuex';

import { RootState } from '../state';
import { ShareState, state } from './share.state';
import { actions } from './share.actions';
import { mutations } from './share.mutations';
import { getters } from './share.getters';

export const shareModule: Module<ShareState, RootState> = {
  state,
  actions,
  mutations,
  getters,
};

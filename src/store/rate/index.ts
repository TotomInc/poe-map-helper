import { Module } from 'vuex';

import { RootState } from '../state';
import { RateState, state } from './rate.state';
import { actions } from './rate.actions';
import { mutations } from './rate.mutations';

export const rateModule: Module<RateState, RootState> = {
  state,
  actions,
  mutations,
};

import { Module } from 'vuex';

import { RootState } from '../state';
import { MapState, state } from './map.state';
import { actions } from './map.actions';
import { mutations } from './map.mutations';

export const mapModule: Module<MapState, RootState> = {
  state,
  actions,
  mutations
};

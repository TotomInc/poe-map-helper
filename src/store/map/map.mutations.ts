import { MutationTree } from 'vuex';

import { POEMapItem, POEStashItem } from '@/models/PathOfExile';
import { MapState } from './map.state';

export const mapMutations = {
  setQueuedMap: 'Set queued map',
  removeQueuedMap: 'Remove queued map',

  setCurrentMap: 'Set current map as queued map',
  removeCurrentMap: 'Remove current map',

  setLatestMap: 'Set latest map as queued map',
  removeLatestMap: 'Remove latest map',

  setLatestMapIncomeCalculated: 'Set latest map income calculated',
  removeLatestMapIncomeCalculated: 'Remove latest map income calculated',

  addMapDone: 'Add a map done',

  enterMap: 'Set in-map',
  leaveMap: 'Remove in-map'
};

export const mutations: MutationTree<MapState> = {
  [mapMutations.setQueuedMap](state, payload: POEMapItem) {
    state.queuedMap = payload;
  },

  [mapMutations.removeQueuedMap](state, payload: void) {
    state.queuedMap = undefined;
  },

  [mapMutations.setCurrentMap](state, payload: POEMapItem) {
    state.currentMap = payload;
  },

  [mapMutations.removeCurrentMap](state, payload: void) {
    state.currentMap = undefined;
  },

  [mapMutations.setLatestMap](state, payload: POEMapItem) {
    state.latestMap = payload;
  },

  [mapMutations.removeLatestMap](state, payload: void) {
    state.latestMap = undefined;
  },

  [mapMutations.setLatestMapIncomeCalculated](state, payload: void) {
    state.latestMapIncomeCalculated = true;
  },

  [mapMutations.removeLatestMapIncomeCalculated](state, payload: void) {
    state.latestMapIncomeCalculated = false;
  },

  [mapMutations.addMapDone](state, payload: { map: POEMapItem; items: POEStashItem[] }) {
    state.mapsHistory.unshift(payload);
  },

  [mapMutations.enterMap](state, payload: void) {
    state.inMap = true;
  },

  [mapMutations.leaveMap](state, payload: void) {
    state.inMap = false;
  }
};

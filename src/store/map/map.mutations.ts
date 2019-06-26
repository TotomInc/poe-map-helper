import { MutationTree } from 'vuex';

import { POEMapItem } from '@/models/PathOfExile';
import { MapState } from './map.state';

export const mapMutations = {
  setQueuedMap: 'Set queued map',
  removedQueuedMap: 'Remove queued map',

  setCurrentMap: 'Set current map as queued map',
  removeCurrentMap: 'Remove current map',

  addMapDone: 'Add a map done',

  enterMap: 'Set in-map',
  leaveMap: 'Remove in-map'
};

export const mutations: MutationTree<MapState> = {
  [mapMutations.setQueuedMap](state, payload: POEMapItem) {
    state.queuedMap = payload;
  },

  [mapMutations.removedQueuedMap](state, payload: void) {
    state.queuedMap = undefined;
  },

  [mapMutations.setCurrentMap](state, payload: POEMapItem) {
    state.currentMap = payload;
  },

  [mapMutations.removeCurrentMap](state, payload: void) {
    state.currentMap = undefined;
  },

  [mapMutations.addMapDone](state, payload: POEMapItem) {
    state.mapsDone.unshift(payload);
  },

  [mapMutations.enterMap](state, payload: void) {
    state.inMap = true;
  },

  [mapMutations.leaveMap](state, payload: void) {
    state.inMap = false;
  }
};

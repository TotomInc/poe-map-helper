import { MutationTree } from 'vuex';

import { POEMapItem, POEMapHistory } from '@/models/PathOfExile';
import { MapState } from './map.state';
import { mapMutations } from './map.consts';

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

  [mapMutations.setMapsHistoryShared](state, payload: POEMapHistory[]) {
    state.mapsHistoryShared = payload;
  },

  [mapMutations.removeMapsHistoryShared](state, payload: void) {
    state.mapsHistoryShared = [];
  },

  [mapMutations.setMapStartedTime](state, payload: number) {
    state.mapStartedTime = payload;
  },

  [mapMutations.addMapDone](state, payload: POEMapHistory) {
    state.mapsHistory.unshift(payload);
  },

  [mapMutations.enterMap](state, payload: void) {
    state.inMap = true;
  },

  [mapMutations.leaveMap](state, payload: void) {
    state.inMap = false;
  },
};

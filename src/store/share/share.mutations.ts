import { MutationTree } from 'vuex';

import { POECharacter, POEMapHistory } from '@/models/PathOfExile';
import { ShareState } from './share.state';
import { shareMutations } from './share.consts';

export const mutations: MutationTree<ShareState> = {
  [shareMutations.setLoading](state, payload: void) {
    state.loading = true;
  },

  [shareMutations.removeLoading](state, payload: void) {
    state.loading = false;
  },

  [shareMutations.setBinID](state, payload: string) {
    state.binID = payload;
  },

  [shareMutations.removeBinID](state, payload: void) {
    state.binID = undefined;
  },

  [shareMutations.setCharacter](state, payload: POECharacter) {
    state.character = payload;
  },

  [shareMutations.removeCharacter](state, payload: void) {
    state.character = undefined;
  },

  [shareMutations.setMaps](state, payload: POEMapHistory[]) {
    state.mapsHistory = payload;
  },

  [shareMutations.removeMaps](state, payload: void) {
    state.mapsHistory = [];
  },
};

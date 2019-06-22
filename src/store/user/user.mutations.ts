import { MutationTree } from 'vuex';

import { POECharacter } from '@/models/PathOfExileAPI';
import { UserState } from './user.state';

export const userMutations = {
  setLoading: 'Set user loading',
  removeLoading: 'Remove user loading',

  setLogged: 'Set user logged',
  removeLogged: 'Remove user logged',

  setPOESESSID: 'Set user POESESSID',

  setCharacters: 'Set user characters',
  removeCharacters: 'Remove user characters'
};

export const mutations: MutationTree<UserState> = {
  [userMutations.setLoading](state, payload: void) {
    state.loading = true;
  },

  [userMutations.removeLoading](state, payload: void) {
    state.loading = false;
  },

  [userMutations.setLogged](state, payload: void) {
    state.logged = true;
  },

  [userMutations.removeLogged](state, payload: void) {
    state.logged = false;
  },

  [userMutations.setPOESESSID](state, payload: string) {
    state.poesessid = payload;
  },

  [userMutations.setCharacters](state, payload: POECharacter[]) {
    state.characters = payload;
  },

  [userMutations.removeCharacters](state, payload: void) {
    state.characters = [];
  }
};

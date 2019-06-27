import { MutationTree } from 'vuex';

import { POECharacter } from '@/models/PathOfExile';
import { UserState } from './user.state';

export const userMutations = {
  setLoading: 'Set user loading',
  removeLoading: 'Remove user loading',

  setLogged: 'Set user logged',
  removeLogged: 'Remove user logged',

  setPOESESSID: 'Set user POESESSID',

  setCharacters: 'Set user characters',
  removeCharacters: 'Remove user characters',

  setSelectedCharacter: 'Set user selected character',
  removeSelectedCharacter: 'Remove user selected character',

  setAccountName: 'Set user account name',
  removeAccountName: 'Remove user account name'
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
  },

  [userMutations.setSelectedCharacter](state, payload: string) {
    state.selectedCharacter = payload;
  },

  [userMutations.removeSelectedCharacter](state, payload: void) {
    state.selectedCharacter = undefined;
  },

  [userMutations.setAccountName](state, payload: string) {
    state.accountName = payload;
  },

  [userMutations.removeAccountName](state, payload: void) {
    state.accountName = undefined;
  }
};

import { ActionTree } from 'vuex';

import { RootState } from '@/store/state';
import { UserState } from './user.state';
import { userMutations } from './user.mutations';

export const userActions = {
  COOKIE_LOGIN: 'COOKIE_LOGIN',
  COOKIE_LOGIN_SUCCESS: 'COOKIE_LOGIN_SUCCESS',
  COOKIE_LOGIN_FAILED: 'COOKIE_LOGIN_FAILED',

  LOAD_CHARACTERS: 'LOAD_CHARACTERS',
  LOAD_CHARACTERS_SUCCESS: 'LOAD_CHARACTERS_SUCCESS',
  LOAD_CHARACTERS_FAILED: 'LOAD_CHARACTERS_FAILED',

  LOGOUT: 'LOGOUT'
};

export const actions: ActionTree<UserState, RootState> = {
  [userActions.COOKIE_LOGIN](context, payload: string) {
    context.commit(userMutations.setLoading);
    context.commit(userMutations.setPOESESSID, payload);
  },

  [userActions.COOKIE_LOGIN_FAILED](context, payload: void) {
    context.commit(userMutations.removeLoading);
  },

  [userActions.COOKIE_LOGIN_SUCCESS](context, payload: void) {
    context.commit(userMutations.removeLoading);
    context.commit(userMutations.setLogged);
  },

  [userActions.LOAD_CHARACTERS](context, payload: void) {
    context.commit(userMutations.setLoading);
  },

  [userActions.LOAD_CHARACTERS_FAILED](context, payload: void) {
    context.commit(userMutations.removeLoading);
  },

  [userActions.LOAD_CHARACTERS_SUCCESS](context, payload: any[]) {
    context.commit(userMutations.removeLoading);
    context.commit(userMutations.setCharacters);
  },

  [userActions.LOGOUT](context, payload: void) {
    context.commit(userMutations.removeCharacters);
    context.commit(userMutations.removeLogged);
  }
};

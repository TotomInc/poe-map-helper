import { ActionTree } from 'vuex';
import { ipcRenderer } from 'electron';

import { IpcHttpRequestOption } from '@/models/IpcHttp';
import { POECharacter } from '@/models/PathOfExileAPI';
import { RootState } from '@/store/state';
import { ipcHttpRequest } from '@/store/ipc-to-store';
import { UserState } from './user.state';
import { userMutations } from './user.mutations';

export const userActions = {
  COOKIE_LOGIN: 'COOKIE_LOGIN',
  COOKIE_LOGIN_SUCCESS: 'COOKIE_LOGIN_SUCCESS',
  COOKIE_LOGIN_FAILED: 'COOKIE_LOGIN_FAILED',

  LOAD_CHARACTERS: 'LOAD_CHARACTERS',
  LOAD_CHARACTERS_SUCCESS: 'LOAD_CHARACTERS_SUCCESS',
  LOAD_CHARACTERS_FAILED: 'LOAD_CHARACTERS_FAILED',

  FINISH_SETUP: 'FINISH_SETUP',

  LOGOUT: 'LOGOUT'
};

export const actions: ActionTree<UserState, RootState> = {
  [userActions.COOKIE_LOGIN](context, payload: string) {
    const requestPayload: IpcHttpRequestOption = {
      url: 'https://www.pathofexile.com/my-account',
      onSuccessIpc: userActions.COOKIE_LOGIN_SUCCESS,
      onFailIpc: userActions.COOKIE_LOGIN_FAILED,
      axiosOptions: {
        method: 'GET',
        maxRedirects: 0,
        headers: {
          Cookie: `POESESSID=${payload}`
        }
      }
    };

    context.commit(userMutations.setLoading);
    context.commit(userMutations.setPOESESSID, payload);

    ipcHttpRequest(requestPayload);
  },

  [userActions.COOKIE_LOGIN_FAILED](context, payload: void) {
    context.commit(userMutations.removeLoading);
  },

  [userActions.COOKIE_LOGIN_SUCCESS](context, payload: void) {
    context.commit(userMutations.removeLoading);
    context.commit(userMutations.setLogged);
  },

  [userActions.LOAD_CHARACTERS](context, payload: void) {
    const requestPayload: IpcHttpRequestOption = {
      url: 'https://www.pathofexile.com/character-window/get-characters',
      onSuccessIpc: userActions.LOAD_CHARACTERS_SUCCESS,
      onFailIpc: userActions.LOAD_CHARACTERS_FAILED,
      axiosOptions: {
        method: 'GET',
        maxRedirects: 0,
        headers: {
          Cookie: `POESESSID=${context.state.poesessid}`
        }
      }
    };

    context.commit(userMutations.setLoading);

    ipcHttpRequest(requestPayload);
  },

  [userActions.LOAD_CHARACTERS_FAILED](context, payload: void) {
    context.commit(userMutations.removeLoading);
  },

  [userActions.LOAD_CHARACTERS_SUCCESS](context, payload: POECharacter[]) {
    context.commit(userMutations.removeLoading);
    context.commit(userMutations.setCharacters, payload);
  },

  [userActions.FINISH_SETUP](
    context,
    payload: {
      selectedCharacter: string;
      logfilePath: string;
    }
  ) {
    context.commit(userMutations.setSelectedCharacter, payload.selectedCharacter);

    ipcRenderer.send('LOGFILE_PATH', payload.logfilePath);
  },

  [userActions.LOGOUT](context, payload: void) {
    context.commit(userMutations.removeCharacters);
    context.commit(userMutations.removeLogged);
  }
};

import { ActionTree } from 'vuex';
import { ipcRenderer } from 'electron';

import { IpcHttpRequestOption } from '@/models/IpcHttp';
import { POECharacter } from '@/models/PathOfExile';
import { RootState } from '@/store/state';
import { ipcHttpRequest } from '@/store/ipc-to-store';
import { UserState } from './user.state';
import { userActions, userMutations } from './user.consts';
import { LOGFILE_PATH_RECEIVED } from '../../consts/ipc-events';

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

  [userActions.COOKIE_LOGIN_SUCCESS](context, payload: string) {
    // Verify for the account name, if not present send a failed action
    const accountNameRegex = /\/account\/view-profile\/(.*?)"/;
    const accountName = payload.match(accountNameRegex);

    if (accountName && accountName[1]) {
      context.commit(userMutations.setAccountName, accountName[1]);
      context.commit(userMutations.setLogged);
      context.commit(userMutations.removeLoading);
    } else {
      context.dispatch(userActions.COOKIE_LOGIN_FAILED);
    }
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

    ipcRenderer.send(LOGFILE_PATH_RECEIVED, payload.logfilePath);
  },

  [userActions.LOGOUT](context, payload: void) {
    context.commit(userMutations.removeCharacters);
    context.commit(userMutations.removeLogged);
  }
};

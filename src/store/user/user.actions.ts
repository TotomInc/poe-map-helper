import { ActionTree } from 'vuex';
import { ipcRenderer } from 'electron';
import to from 'await-to-js';

import { IpcHttpRequestOption } from '@/models/IpcHttp';
import { POECharacter } from '@/models/PathOfExile';
import { GoogleAnalyticsPayload } from '@/models/Analytics';
import { RootState } from '@/store/state';
import { ipcHttpRequest } from '@/store/ipc-to-store';
import { UserState } from './user.state';
import { userActions, userMutations } from './user.consts';
import { LOGFILE_PATH_RECEIVED, ANALYTICS_TRACKING } from '../../consts/ipc-events';

export const actions: ActionTree<UserState, RootState> = {
  async [userActions.COOKIE_LOGIN](context, payload: string) {
    const [err, homepage] = await to<string>(
      new Promise((resolve, reject) => {
        const requestPayload: IpcHttpRequestOption = {
          url: 'https://www.pathofexile.com/my-account',
          onSuccessIpc: userActions.COOKIE_LOGIN_SUCCESS,
          onFailIpc: userActions.COOKIE_LOGIN_FAILED,
          axiosOptions: {
            method: 'GET',
            maxRedirects: 0,
            headers: {
              Cookie: `POESESSID=${payload}`,
            },
          },
        };

        context.commit(userMutations.setLoading);
        context.commit(userMutations.setPOESESSID, payload);

        ipcHttpRequest(requestPayload);

        ipcRenderer.once(userActions.COOKIE_LOGIN_SUCCESS, (ipcPayload: string) => resolve(ipcPayload));
        ipcRenderer.once(userActions.COOKIE_LOGIN_FAILED, (ipcPayload: any) => reject(ipcPayload));

        context.dispatch(userActions.ANALYTICS_TRACKING, {
          category: 'Login',
          action: 'Login',
          label: 'Try to login',
        });
      }),
    );

    ipcRenderer.removeAllListeners(userActions.COOKIE_LOGIN_SUCCESS);
    ipcRenderer.removeAllListeners(userActions.COOKIE_LOGIN_FAILED);

    if (err || !homepage) {
      context.dispatch(userActions.COOKIE_LOGIN_FAILED, err);
    } else {
      context.dispatch(userActions.COOKIE_LOGIN_SUCCESS, homepage);
    }

    return err || homepage;
  },

  [userActions.COOKIE_LOGIN_FAILED](context, payload: void) {
    context.dispatch(userActions.ANALYTICS_TRACKING, {
      category: 'Login',
      action: 'Login failed',
      label: 'Login failed',
    });

    context.commit(userMutations.removeLoading);
  },

  [userActions.COOKIE_LOGIN_SUCCESS](context, payload: string) {
    // Verify for the account name, if not present send a failed action
    const accountNameRegex = /\/account\/view-profile\/(.*?)"/;
    const accountName = payload.match(accountNameRegex);

    if (accountName && accountName[1]) {
      context.dispatch(userActions.ANALYTICS_TRACKING, {
        category: 'Login',
        action: 'Login success',
        label: 'Login success',
      });

      context.commit(userMutations.setAccountName, accountName[1]);
      context.commit(userMutations.setLogged);
      context.commit(userMutations.removeLoading);
    } else {
      context.dispatch(userActions.COOKIE_LOGIN_FAILED);
    }
  },

  async [userActions.LOAD_CHARACTERS](context, payload: void) {
    const [err, characters] = await to<POECharacter[]>(
      new Promise((resolve, reject) => {
        const requestPayload: IpcHttpRequestOption = {
          url: 'https://www.pathofexile.com/character-window/get-characters',
          onSuccessIpc: userActions.LOAD_CHARACTERS_SUCCESS,
          onFailIpc: userActions.LOAD_CHARACTERS_FAILED,
          axiosOptions: {
            method: 'GET',
            maxRedirects: 0,
            headers: {
              Cookie: `POESESSID=${context.state.poesessid}`,
            },
          },
        };

        context.commit(userMutations.setLoading);

        ipcHttpRequest(requestPayload);

        ipcRenderer.once(userActions.LOAD_CHARACTERS_SUCCESS, (ipcPayload: POECharacter[]) => resolve(ipcPayload));
        ipcRenderer.once(userActions.LOAD_CHARACTERS_FAILED, (ipcPayload: any) => reject(ipcPayload));

        context.dispatch(userActions.ANALYTICS_TRACKING, {
          category: 'Login',
          action: 'Load characters',
          label: 'Load user characters',
        });
      }),
    );

    ipcRenderer.removeAllListeners(userActions.LOAD_CHARACTERS_SUCCESS);
    ipcRenderer.removeAllListeners(userActions.LOAD_CHARACTERS_FAILED);

    if (err || !characters) {
      context.dispatch(userActions.LOAD_CHARACTERS_FAILED, err);
    } else {
      context.dispatch(userActions.LOAD_CHARACTERS_SUCCESS, characters);
    }

    return err || characters;
  },

  [userActions.LOAD_CHARACTERS_FAILED](context, payload: void) {
    context.dispatch(userActions.ANALYTICS_TRACKING, {
      category: 'Login',
      action: 'Load characters failed',
      label: 'Load user characters failed',
    });

    context.commit(userMutations.removeLoading);
  },

  [userActions.LOAD_CHARACTERS_SUCCESS](context, payload: POECharacter[]) {
    context.dispatch(userActions.ANALYTICS_TRACKING, {
      category: 'Login',
      action: 'Load characters success',
      label: 'Load user characters success',
    });

    context.commit(userMutations.removeLoading);
    context.commit(userMutations.setCharacters, payload);
  },

  async [userActions.UPDATE_CHARACTER](context, payload: void) {
    await context.dispatch(userActions.LOAD_CHARACTERS);
  },

  [userActions.FINISH_SETUP](
    context,
    payload: {
      selectedCharacter: string;
      logfilePath: string;
    },
  ) {
    context.dispatch(userActions.ANALYTICS_TRACKING, {
      category: 'Login',
      action: 'Finish setup',
      label: 'User finish setup',
    });

    context.commit(userMutations.setSelectedCharacter, payload.selectedCharacter);

    ipcRenderer.send(LOGFILE_PATH_RECEIVED, payload.logfilePath);
  },

  [userActions.LOGOUT](context, payload: void) {
    context.commit(userMutations.removeCharacters);
    context.commit(userMutations.removeLogged);
  },

  [userActions.ANALYTICS_TRACKING](context, payload: GoogleAnalyticsPayload) {
    ipcRenderer.emit(ANALYTICS_TRACKING, payload);
  },
};

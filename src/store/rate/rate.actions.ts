import { ActionTree } from 'vuex';

import { POEWatchCurrency } from '@/models/POEWatch';
import { IpcHttpRequestOption } from '@/models/IpcHttp';
import { ipcHttpRequest } from '@/store/ipc-to-store';
import { RootState } from '../state';
import { RateState } from './rate.state';
import { rateMutations } from './rate.mutations';

export const rateActions = {
  LOAD_CURRENCIES_RATE: 'LOAD_CURRENCIES_RATE',
  LOAD_CURRENCIES_RATE_SUCCESS: 'LOAD_CURRENCIES_RATE_SUCCESS',
  LOAD_CURRENCIES_RATE_FAILED: 'LOAD_CURRENCIES_RATE_FAILED'
};

export const actions: ActionTree<RateState, RootState> = {
  [rateActions.LOAD_CURRENCIES_RATE](context, payload: void) {
    const { selectedCharacter } = context.rootState.user;
    const poeSelectedCharacter = context.rootState.user.characters.find((char) => char.name === selectedCharacter);

    if (poeSelectedCharacter) {
      const requestPayload: IpcHttpRequestOption = {
        url: `https://api.poe.watch/get?league=${poeSelectedCharacter.league}&category=currency`,
        onSuccessIpc: rateActions.LOAD_CURRENCIES_RATE_SUCCESS,
        onFailIpc: rateActions.LOAD_CURRENCIES_RATE_FAILED,
        axiosOptions: {
          method: 'GET'
        }
      };

      context.commit(rateMutations.setLoading);

      ipcHttpRequest(requestPayload);
    }
  },

  [rateActions.LOAD_CURRENCIES_RATE_SUCCESS](context, payload: POEWatchCurrency[]) {
    context.commit(rateMutations.setCurrenciesRate, payload);
    context.commit(rateMutations.removeLoading);
  },

  [rateActions.LOAD_CURRENCIES_RATE_FAILED](context, payload: void) {
    context.commit(rateMutations.removeLoading);
  }
};

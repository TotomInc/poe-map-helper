import { ActionTree } from 'vuex';
import { ipcRenderer } from 'electron';
import to from 'await-to-js';

import { POEWatchCurrency } from '@/models/POEWatch';
import { IpcHttpRequestOption } from '@/models/IpcHttp';
import { ipcHttpRequest } from '@/store/ipc-to-store';
import { RootState } from '../state';
import { RateState } from './rate.state';
import { rateActions, rateMutations } from './rate.consts';

export const actions: ActionTree<RateState, RootState> = {
  async [rateActions.LOAD_CURRENCIES_RATE](context, payload: void) {
    const [err, currencyRates] = await to<POEWatchCurrency[]>(
      new Promise((resolve, reject) => {
        const { selectedCharacter } = context.rootState.user;
        const poeSelectedCharacter = context.rootState.user.characters.find((char) => char.name === selectedCharacter);

        if (poeSelectedCharacter) {
          const requestPayload: IpcHttpRequestOption = {
            url: `https://api.poe.watch/get?league=${poeSelectedCharacter.league}&category=currency`,
            onSuccessIpc: rateActions.LOAD_CURRENCIES_RATE_SUCCESS,
            onFailIpc: rateActions.LOAD_CURRENCIES_RATE_FAILED,
            axiosOptions: {
              method: 'GET',
            },
          };

          context.commit(rateMutations.setLoading);

          ipcHttpRequest(requestPayload);
        } else {
          reject();
        }

        ipcRenderer.once(rateActions.LOAD_CURRENCIES_RATE_SUCCESS, (ipcPayload: POEWatchCurrency[]) =>
          resolve(ipcPayload),
        );

        ipcRenderer.once(rateActions.LOAD_CURRENCIES_RATE_FAILED, (ipcPayload: any) => reject(ipcPayload));
      }),
    );

    ipcRenderer.removeAllListeners(rateActions.LOAD_CURRENCIES_RATE_SUCCESS);
    ipcRenderer.removeAllListeners(rateActions.LOAD_CURRENCIES_RATE_FAILED);

    if (err || !currencyRates) {
      context.dispatch(rateActions.LOAD_CURRENCIES_RATE_FAILED, err);
    } else {
      context.dispatch(rateActions.LOAD_CURRENCIES_RATE_SUCCESS, currencyRates);
    }

    return err || currencyRates;
  },

  [rateActions.LOAD_CURRENCIES_RATE_SUCCESS](context, payload: POEWatchCurrency[]) {
    const exaltRate = payload.find((rate) => rate.name === 'Exalted Orb')!;

    const chaosRate: POEWatchCurrency = {
      id: -1,
      name: 'Chaos Orb',
      category: 'currency',
      group: 'currency',
      frame: 5,
      icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png',
      daily: 1,
      mean: 1,
      median: 1,
      mode: -1,
      min: 1,
      max: 1,
      exalted: 1 / exaltRate.median,
      total: 1,
      current: 1,
      accepted: -1,
      stackSize: 10,
      history: [1, 1, 1, 1, 1, 1],
    };

    context.commit(rateMutations.setCurrenciesRate, [...payload, chaosRate]);
    context.commit(rateMutations.removeLoading);
  },

  [rateActions.LOAD_CURRENCIES_RATE_FAILED](context, payload: void) {
    context.commit(rateMutations.removeLoading);
  },
};

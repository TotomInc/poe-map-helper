import { ActionTree } from 'vuex';
import { ipcRenderer } from 'electron';
import to from 'await-to-js';

import { POECharacter, POEStashItem, POEPricedStashItem, POEStashTab } from '@/models/PathOfExile';
import { IpcHttpRequestOption } from '@/models/IpcHttp';
import { ipcHttpRequest } from '../ipc-to-store';
import { RootState } from '../state';
import { StashState } from './stash.state';
import { userGetters } from '../user/user.consts';
import { stashActions, stashMutations, stashGetters } from './stash.consts';
import { mapMutations } from '../map/map.consts';

export const actions: ActionTree<StashState, RootState> = {
  /**
   * Load all available stash-tabs of a specific league.
   */
  async [stashActions.GET_STASH_TABS](context, payload: void) {
    const [err, stashTabs] = await to<POEStashTab[]>(
      new Promise((resolve, reject) => {
        const selectedCharacter: POECharacter | undefined = context.rootGetters[userGetters.poeSelectedCharacter];
        const { accountName, poesessid } = context.rootState.user;

        if (selectedCharacter && accountName && poesessid) {
          const { league } = selectedCharacter;

          const requestPayload: IpcHttpRequestOption = {
            url: `https://www.pathofexile.com/character-window/get-stash-items?accountName=${accountName}&realm=pc&league=${league}&tabs=1&tabIndex=0&public=false`,
            onSuccessIpc: stashActions.GET_STASH_TABS_SUCCESS,
            onFailIpc: stashActions.GET_STASH_TABS_FAILED,
            axiosOptions: {
              method: 'GET',
              maxRedirects: 0,
              headers: {
                Cookie: `POESESSID=${poesessid}`,
              },
            },
          };

          context.commit(stashMutations.setLoading);

          ipcHttpRequest(requestPayload);

          ipcRenderer.once(stashActions.GET_STASH_TABS_SUCCESS, (ipcPayload: POEStashTab[]) => resolve(ipcPayload));
          ipcRenderer.once(stashActions.GET_STASH_TABS_FAILED, (ipcPayload: any) => reject(ipcPayload));
        } else {
          reject();
        }
      }),
    );

    ipcRenderer.removeAllListeners(stashActions.GET_STASH_TABS_SUCCESS);
    ipcRenderer.removeAllListeners(stashActions.GET_STASH_TABS_FAILED);

    if (err || !stashTabs) {
      context.dispatch(stashActions.GET_STASH_TABS_FAILED, err);
    } else {
      context.dispatch(stashActions.GET_STASH_TABS_SUCCESS, stashTabs);
    }

    return err || stashTabs;
  },

  [stashActions.GET_STASH_TABS_SUCCESS](context, payload: { tabs: POEStashTab[] }) {
    context.commit(stashMutations.setStashTabs, payload.tabs);
    context.commit(stashMutations.removeLoading);
  },

  [stashActions.GET_STASH_TABS_FAILED](context, payload: POEStashTab[]) {
    context.commit(stashMutations.removeLoading);
  },

  /**
   * Load all items from the selected stash-tab.
   */
  async [stashActions.GET_STASH_ITEMS](context, payload: void) {
    const [err, stashItems] = await to<POEStashItem[]>(
      new Promise((resolve, reject) => {
        const { accountName, poesessid } = context.rootState.user;
        const selectedCharacter: POECharacter | undefined = context.rootGetters[userGetters.poeSelectedCharacter];
        const stashTabIndex = context.rootGetters[stashGetters.getStashTabIndex];

        if (selectedCharacter && accountName && poesessid && stashTabIndex > -1) {
          const { league } = selectedCharacter;

          const requestPayload: IpcHttpRequestOption = {
            url: `https://www.pathofexile.com/character-window/get-stash-items?accountName=${accountName}&realm=pc&league=${league}&tabs=0&tabIndex=${stashTabIndex}&public=false`,
            onSuccessIpc: stashActions.GET_STASH_ITEMS_SUCCESS,
            onFailIpc: stashActions.GET_STASH_ITEMS_FAILED,
            axiosOptions: {
              method: 'GET',
              maxRedirects: 0,
              headers: {
                Cookie: `POESESSID=${poesessid}`,
              },
            },
          };

          context.commit(stashMutations.setLoading);

          ipcHttpRequest(requestPayload);

          ipcRenderer.once(stashActions.GET_STASH_ITEMS_SUCCESS, (ipcPayload: POEStashItem[]) => resolve(ipcPayload));
          ipcRenderer.once(stashActions.GET_STASH_ITEMS_FAILED, (ipcPayload: any) => reject(ipcPayload));
        } else {
          reject();
        }
      }),
    );

    ipcRenderer.removeAllListeners(stashActions.GET_STASH_ITEMS_SUCCESS);
    ipcRenderer.removeAllListeners(stashActions.GET_STASH_ITEMS_FAILED);

    if (err || !stashItems) {
      context.dispatch(stashActions.GET_STASH_ITEMS_FAILED, err);
    } else {
      context.dispatch(stashActions.GET_STASH_ITEMS_SUCCESS, stashItems);
    }

    return err || stashItems;
  },

  /**
   * If there are already items stored, calculated the diff, otherwise store
   * stash items.
   */
  [stashActions.GET_STASH_ITEMS_SUCCESS](context, payload: { items: POEStashItem[] }) {
    if (context.state.items.length <= 0) {
      context.commit(stashMutations.setItems, payload.items);
      context.commit(stashMutations.setInitialLoad);
    }

    context.commit(stashMutations.removeLoading);
  },

  [stashActions.GET_STASH_ITEMS_FAILED](context, payload: void) {
    context.commit(stashMutations.removeLoading);
  },

  /**
   * Find new items and old-items with a new stack-size count in this order:
   *
   * 1. filter new items (compare new items from the `payload` with actual
   *    items `state.items`).
   * 2. find old items with a new stack-size count but make sure to update
   *    their stack-size count to diff of them.
   */
  [stashActions.CALCULATE_STASH_DIFF](context, payload: POEStashItem[]) {
    // This array contains new items and items with a different stack-size
    const itemsDiff: POEStashItem[] = payload.filter((newItem) => {
      return !context.state.items.find((item) => item.id === newItem.id);
    });

    context.state.items.forEach((item) => {
      const newStacksizeItem = payload.find((el) => el.id === item.id);

      if (
        newStacksizeItem &&
        newStacksizeItem.stackSize &&
        item.stackSize &&
        newStacksizeItem.stackSize > item.stackSize
      ) {
        itemsDiff.push({
          ...newStacksizeItem,
          stackSize: newStacksizeItem.stackSize - item.stackSize,
        });
      }
    });

    const itemsDiffPayload = itemsDiff.map((item) => JSON.parse(JSON.stringify(item)));

    context.commit(stashMutations.setItems, payload);
    context.commit(stashMutations.setItemsDiff, itemsDiffPayload);
  },

  /**
   * Loop on all `itemsDiff` and try to calculate the income of each single
   * item. Actually it only works for generic items (with the `typeLine`
   * property) like currencies.
   */
  [stashActions.CALCULATE_ITEMS_DIFF_INCOME](context, payload: void) {
    const { itemsDiff } = context.state;
    const { currencies } = context.rootState.rate;

    const itemsDiffIncomePayload: POEPricedStashItem[] = [];

    itemsDiff.forEach((item) => {
      const itemCurrency = currencies.find((currency) => currency.name === item.typeLine);

      if (itemCurrency) {
        const itemAmount = item.stackSize ? item.stackSize : 1;

        const itemDiffIncome: POEPricedStashItem = {
          ...item,
          chaos: Math.round(itemCurrency.mean * itemAmount * 100) / 100,
          exalt: Math.round(itemCurrency.exalted * itemAmount * 1000) / 1000,
        };

        itemsDiffIncomePayload.push(itemDiffIncome);
      }
    });

    context.commit(stashMutations.setItemsDiffIncome, itemsDiffIncomePayload);
  },
};

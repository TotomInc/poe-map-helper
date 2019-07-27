import { ActionTree } from 'vuex';

import { POECharacter, POEStashItem, POEPricedStashItem, POEStashTab } from '@/models/PathOfExile';
import { IpcHttpRequestOption } from '@/models/IpcHttp';
import { ipcHttpRequest } from '../ipc-to-store';
import { RootState } from '../state';
import { StashState } from './stash.state';
import { userGetters } from '../user/user.consts';
import { stashActions, stashMutations } from './stash.consts';

export const actions: ActionTree<StashState, RootState> = {
  /**
   * Load all available stash-tabs of a specific league.
   */
  [stashActions.GET_STASH_TABS](context, payload: void) {
    const selectedCharacter: POECharacter | undefined = context.rootGetters[userGetters.poeSelectedCharacter];

    const { accountName, poesessid } = context.rootState.user;

    if (selectedCharacter && accountName && poesessid) {
      const { league } = selectedCharacter;

      const requestPayload: IpcHttpRequestOption = {
        url: `https://www.pathofexile.com/character-window/get-stash-items?accountName=${accountName}&realm=pc&league=${league}&tabs=1&tabIndex=0&public=false`,
        onSuccessIpc: stashActions.GET_STASH_ITEMS_SUCCESS,
        onFailIpc: stashActions.GET_STASH_ITEMS_FAILED,
        axiosOptions: {
          method: 'GET',
          maxRedirects: 0,
          headers: {
            Cookie: `POESESSID=${poesessid}`
          }
        }
      };

      context.commit(stashMutations.setLoading);

      ipcHttpRequest(requestPayload);
    }
  },

  [stashActions.GET_STASH_TABS_SUCCESS](context, payload: POEStashTab[]) {
    context.commit(stashMutations.setStashTabs, payload);
    context.commit(stashMutations.removeLoading);
  },

  [stashActions.GET_STASH_TABS_FAILED](context, payload: POEStashTab[]) {
    context.commit(stashMutations.removeLoading);
  },

  /**
   * Load all items from the selected stash-tab.
   */
  [stashActions.GET_STASH_ITEMS](context, payload: void) {
    const selectedCharacter: POECharacter | undefined = context.rootGetters[userGetters.poeSelectedCharacter];

    const { accountName, poesessid } = context.rootState.user;
    const { selectedStashTab } = context.state;

    if (selectedCharacter && accountName && poesessid && selectedStashTab) {
      const { league } = selectedCharacter;

      const requestPayload: IpcHttpRequestOption = {
        url: `https://www.pathofexile.com/character-window/get-stash-items?accountName=${accountName}&realm=pc&league=${league}&tabs=0&tabIndex=${selectedStashTab}&public=false`,
        onSuccessIpc: stashActions.GET_STASH_ITEMS_SUCCESS,
        onFailIpc: stashActions.GET_STASH_ITEMS_FAILED,
        axiosOptions: {
          method: 'GET',
          maxRedirects: 0,
          headers: {
            Cookie: `POESESSID=${poesessid}`
          }
        }
      };

      context.commit(stashMutations.setLoading);

      ipcHttpRequest(requestPayload);
    }
  },

  /**
   * If there are already items stored, calculated the diff, otherwise store
   * stash items.
   */
  [stashActions.GET_STASH_ITEMS_SUCCESS](context, payload: { items: POEStashItem[] }) {
    if (context.state.items.length > 0) {
      context.dispatch(stashActions.CALCULATE_STASH_DIFF, payload.items);
    } else {
      context.commit(stashMutations.setItems, payload.items);
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
    /**
     * This array contains new items and items with a different stack-size.
     */
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
          stackSize: newStacksizeItem.stackSize - item.stackSize
        });
      }
    });

    // Make sure our objects from `itemsDiff` array are frozen
    const itemsDiffPayload = itemsDiff.map((item) => Object.freeze(item));

    context.commit(stashMutations.setItems, payload);
    context.commit(stashMutations.setItemsDiff, itemsDiffPayload);

    context.dispatch(stashActions.CALCULATE_ITEMS_DIFF_INCOME);
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
        const itemDiffIncome: POEPricedStashItem = {
          ...item,
          chaos: itemCurrency.mean,
          exalt: itemCurrency.exalted
        };

        itemsDiffIncomePayload.push(itemDiffIncome);
      }
    });

    context.commit(stashMutations.setItemsDiffIncome, itemsDiffIncomePayload);
  }
};

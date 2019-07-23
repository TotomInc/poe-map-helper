import { ActionTree } from 'vuex';

import { POECharacter, POEStashItem } from '@/models/PathOfExile';
import { IpcHttpRequestOption } from '@/models/IpcHttp';
import { ipcHttpRequest } from '../ipc-to-store';
import { RootState } from '../state';
import { StashState } from './stash.state';
import { userGetters } from '../user/user.getters';
import { stashMutations } from './stash.mutations';

export const stashActions = {
  GET_STASH_ITEMS: 'GET_STASH_ITEMS',
  GET_STASH_ITEMS_SUCCESS: 'GET_STASH_ITEMS_SUCCESS',
  GET_STASH_ITEMS_FAILED: 'GET_STASH_ITEMS_FAILED',

  CALCULATE_STASH_DIFF: 'CALCULATE_STASH_DIFF'
};

export const actions: ActionTree<StashState, RootState> = {
  [stashActions.GET_STASH_ITEMS](context, payload: void) {
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

  [stashActions.GET_STASH_ITEMS_SUCCESS](context, payload: POEStashItem[]) {
    context.commit(stashMutations.removeLoading);

    if (context.state.items.length > 0) {
      context.dispatch(stashActions.CALCULATE_STASH_DIFF, payload);
    } else {
      context.commit(stashMutations.setItems, payload);
    }
  },

  [stashActions.GET_STASH_ITEMS_FAILED](context, payload: void) {
    context.commit(stashMutations.removeLoading);
  },

  [stashActions.CALCULATE_STASH_DIFF](context, payload: POEStashItem[]) {
    /**
     * This array contains new items and items with a different stack-size:
     *
     * 1. filter new items
     * 2. find old items with a new stack-size, make sure to update their
     *    stack-size count.
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
  }
};

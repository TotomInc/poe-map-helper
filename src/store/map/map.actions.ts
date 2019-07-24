import { ActionTree } from 'vuex';

import { POEMapItem } from '@/models/PathOfExile';
import { RootState } from '@/store/state';
import { MapState } from './map.state';
import { mapActions, mapMutations } from './map.consts';
import { stashActions } from '../stash/stash.consts';

export const actions: ActionTree<MapState, RootState> = {
  [mapActions.MAP_ITEM_COPIED](context, payload: POEMapItem) {
    // Set a new queued map and set the current map as the latest map
    if (!context.state.inMap) {
      context.commit(mapMutations.setQueuedMap, payload);

      if (context.state.currentMap) {
        const latestMapPayload = Object.freeze(context.state.currentMap);

        context.commit(mapMutations.setLatestMap, latestMapPayload);
        context.commit(mapMutations.removeCurrentMap);
      }
    }
  },

  [mapActions.ENTER_MAP](context, payload: void) {
    // Set the current map only if there is a queued map
    if (context.state.queuedMap) {
      const currentMapPayload = Object.freeze(context.state.queuedMap);

      context.commit(mapMutations.setCurrentMap, currentMapPayload);
      context.commit(mapMutations.removeQueuedMap);

      if (!context.state.latestMapIncomeCalculated) {
        context.dispatch(stashActions.GET_STASH_ITEMS);

        context.commit(mapMutations.setLatestMapIncomeCalculated);
      }
    }

    context.commit(mapMutations.enterMap);
  },

  [mapActions.LEAVE_MAP](context, payload: void) {
    context.commit(mapMutations.leaveMap);
  }
};

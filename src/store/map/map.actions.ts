import { ActionTree } from 'vuex';

import { POEMapItem } from '@/models/PathOfExile';
import { RootState } from '@/store/state';
import { MapState } from './map.state';
import { mapMutations } from './map.mutations';

export const mapActions = {
  MAP_ITEM_COPIED: 'MAP_ITEM_COPIED',

  ENTER_MAP: 'ENTER_MAP',
  LEAVE_MAP: 'LEAVE_MAP'
};

export const actions: ActionTree<MapState, RootState> = {
  [mapActions.MAP_ITEM_COPIED](context, payload: POEMapItem) {
    // Set a new queued map and set the current map as the latest map
    if (!context.state.inMap) {
      const latestMapPayload = Object.freeze(context.state.currentMap);

      context.commit(mapMutations.setQueuedMap, payload);
      context.commit(mapMutations.setLatestMap, latestMapPayload);
    }
  },

  [mapActions.ENTER_MAP](context, payload: void) {
    // Set the current map only if there is a queued map
    if (context.state.queuedMap) {
      const currentMapPayload = Object.freeze(context.state.queuedMap);

      context.commit(mapMutations.setCurrentMap, currentMapPayload);
      context.commit(mapMutations.removeQueuedMap);
    }

    context.commit(mapMutations.enterMap);
  },

  [mapActions.LEAVE_MAP](context, payload: void) {
    context.commit(mapMutations.leaveMap);
  }
};

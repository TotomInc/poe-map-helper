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
    // A map can only be queued when not in map
    if (!context.state.inMap) {
      context.commit(mapMutations.setQueuedMap, payload);
    }
  },

  [mapActions.ENTER_MAP](context, payload: void) {
    // Set the current map only if there is a queued map
    if (context.state.queuedMap) {
      const currentMapPayload = Object.freeze(context.state.queuedMap);

      context.commit(mapMutations.setCurrentMap, currentMapPayload);
      context.commit(mapMutations.removedQueuedMap);
    }

    context.commit(mapMutations.enterMap);
  },

  [mapActions.LEAVE_MAP](context, payload: void) {
    context.commit(mapMutations.leaveMap);
  }
};

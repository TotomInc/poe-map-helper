import { ActionTree } from 'vuex';

import { POEMapItem, POEStashItem, POEMapHistory } from '@/models/PathOfExile';
import { RootState } from '@/store/state';
import { MapState } from './map.state';
import { mapActions, mapMutations } from './map.consts';
import { stashActions, stashGetters } from '../stash/stash.consts';
import { userActions } from '../user/user.consts';

export const actions: ActionTree<MapState, RootState> = {
  [mapActions.MAP_ITEM_COPIED](context, payload: POEMapItem) {
    // Set a new queued map and set the current map as the latest map
    if (!context.state.inMap) {
      context.commit(mapMutations.setQueuedMap, payload);
    }
  },

  /**
   * When player enter a map and it's a new map:
   *
   * - Retrieve stash-items in order to calculate items diff with the most recent map-run
   * - Move current-map to latest-map
   * - Move queued-map to current-map
   * - Calculate stash-items diff and the diff items income
   * - Add the latest-map to the `mapsHistory` array
   */
  async [mapActions.ENTER_MAP](context, payload: void) {
    if (context.state.queuedMap) {
      const stashItems: { items: POEStashItem[] } | undefined = await context.dispatch(stashActions.GET_STASH_ITEMS);

      const frozenCurrentMap = JSON.parse(JSON.stringify(context.state.currentMap));
      const frozenQueuedMap = JSON.parse(JSON.stringify(context.state.queuedMap));

      // If there is a current map, move it to the latest-map state
      if (context.state.currentMap) {
        context.commit(mapMutations.setLatestMap, frozenCurrentMap);
        context.commit(mapMutations.removeCurrentMap);
      }

      context.commit(mapMutations.setCurrentMap, frozenQueuedMap);
      context.commit(mapMutations.removeQueuedMap);

      if (stashItems && stashItems.items) {
        await context.dispatch(stashActions.CALCULATE_STASH_DIFF, stashItems.items);
        await context.dispatch(stashActions.CALCULATE_ITEMS_DIFF_INCOME);
      }

      if (frozenCurrentMap) {
        const mapDonePayload: POEMapHistory = {
          map: frozenCurrentMap,
          items: JSON.parse(JSON.stringify(context.rootState.stash.itemsDiffIncome)),
          startTime: context.state.mapStartedTime ? context.state.mapStartedTime : Date.now(),
          endTime: Date.now(),
          income: {
            chaos: context.rootGetters[stashGetters.getTotalItemsDiffIncome].chaos,
            exalt: context.rootGetters[stashGetters.getTotalItemsDiffIncome].exalt
          }
        };

        context.commit(mapMutations.addMapDone, mapDonePayload);
      }

      context.commit(mapMutations.setMapStartedTime, Date.now());

      context.dispatch(userActions.UPDATE_CHARACTER);
    }

    if (!context.state.inMap) {
      context.commit(mapMutations.enterMap);
    }
  },

  [mapActions.LEAVE_MAP](context, payload: void) {
    if (context.state.inMap) {
      context.commit(mapMutations.leaveMap);
    }
  }
};

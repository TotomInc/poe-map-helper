import { ActionTree } from 'vuex';

import { POEMapItem, POEStashItem, POEMapHistory, POEMapZone } from '@/models/PathOfExile';
import { RootState } from '@/store/state';
import { MapState } from './map.state';
import { mapActions, mapMutations } from './map.consts';
import { stashActions, stashGetters } from '../stash/stash.consts';
import { userActions } from '../user/user.consts';
import { maps } from '../../consts/zones';

export const actions: ActionTree<MapState, RootState> = {
  [mapActions.MAP_ITEM_COPIED](context, payload: POEMapItem) {
    // Set a new queued map and set the current map as the latest map
    if (!context.state.inMap) {
      context.dispatch(userActions.ANALYTICS_TRACKING, {
        category: 'Map',
        action: 'Register map-item',
        label: 'Register a map-item as a queued map',
      });

      context.commit(mapMutations.setQueuedMap, payload);
    }
  },

  /**
   * 1. Retrieve stash-items in order to calculate items diff with the most recent map-run
   * 2. Move current-map to latest-map
   * 3. Move map zone from logs to current-map
   * 4. Calculate stash-items diff and the diff items income
   * 5. Add the latest-map to the `mapsHistory` array
   */
  async [mapActions.AUTOMATIC_MAP_ACTIONS](context, payload: POEMapZone) {
    const mapDetails = maps.find((map) => map.name.toLowerCase().includes(payload.name.toLowerCase()));

    if (mapDetails) {
      const stashItems: { items: POEStashItem[] } | undefined = await context.dispatch(stashActions.GET_STASH_ITEMS);

      const frozenCurrentMap: POEMapItem | undefined = JSON.parse(JSON.stringify(context.state.currentMap));

      // Create a `POEMapItem` from the `POEMapZone`
      const newMap: POEMapItem = JSON.parse(
        JSON.stringify({
          name: mapDetails.name,
          rarity: -1,
          modifiers: [],
          itemLevel: 67 + mapDetails.tier,
          tier: mapDetails.tier,
          iq: -1,
          ir: -1,
          mps: -1,
        }),
      );

      // If there is a current map, move it to the latest-map state
      if (context.state.currentMap) {
        context.commit(mapMutations.setLatestMap, frozenCurrentMap);
        context.commit(mapMutations.removeCurrentMap);
      }

      context.commit(mapMutations.setCurrentMap, newMap);
      context.commit(mapMutations.removeQueuedMap);

      // Now it's time to calculate stash tab items diff and items diff income
      if (stashItems && stashItems.items) {
        await context.dispatch(stashActions.CALCULATE_STASH_DIFF, stashItems.items);
        await context.dispatch(stashActions.CALCULATE_ITEMS_DIFF_INCOME);
      }

      // If we have a current-map, add it to our mapping-history
      if (frozenCurrentMap) {
        const mapDonePayload: POEMapHistory = {
          map: frozenCurrentMap,
          items: Object.freeze(context.rootState.stash.itemsDiffIncome),
          startTime: context.state.mapStartedTime ? context.state.mapStartedTime : Date.now(),
          endTime: Date.now(),
          income: {
            chaos: context.rootGetters[stashGetters.getTotalItemsDiffIncome].chaos,
            exalt: context.rootGetters[stashGetters.getTotalItemsDiffIncome].exalt,
          },
        };

        context.commit(mapMutations.addMapDone, mapDonePayload);
      }

      context.commit(mapMutations.setMapStartedTime, Date.now());

      context.dispatch(userActions.UPDATE_CHARACTER);
    }
  },

  /**
   * 1. Retrieve stash-items in order to calculate items diff with the most recent map-run
   * 2. Move current-map to latest-map
   * 3. Move queued-map to current-map
   * 4. Calculate stash-items diff and the diff items income
   * 5. Add the latest-map to the `mapsHistory` array
   */
  async [mapActions.MANUAL_MAP_ACTIONS](context, payload: void) {
    if (context.state.queuedMap) {
      const stashItems: { items: POEStashItem[] } | undefined = await context.dispatch(stashActions.GET_STASH_ITEMS);

      const frozenCurrentMap: POEMapItem | undefined = JSON.parse(JSON.stringify(context.state.currentMap));
      const frozenQueuedMap: POEMapItem | undefined = JSON.parse(JSON.stringify(context.state.queuedMap));

      // If there is a current map, move it to the latest-map state
      if (context.state.currentMap) {
        context.commit(mapMutations.setLatestMap, frozenCurrentMap);
        context.commit(mapMutations.removeCurrentMap);
      }

      context.commit(mapMutations.setCurrentMap, frozenQueuedMap);
      context.commit(mapMutations.removeQueuedMap);

      // Now it's time to calculate stash tab items diff and items diff income
      if (stashItems && stashItems.items) {
        await context.dispatch(stashActions.CALCULATE_STASH_DIFF, stashItems.items);
        await context.dispatch(stashActions.CALCULATE_ITEMS_DIFF_INCOME);
      }

      // If we have a current-map, add it to our mapping-history
      if (frozenCurrentMap) {
        const mapDonePayload: POEMapHistory = {
          map: frozenCurrentMap,
          items: JSON.parse(JSON.stringify(context.rootState.stash.itemsDiffIncome)),
          startTime: context.state.mapStartedTime ? context.state.mapStartedTime : Date.now(),
          endTime: Date.now(),
          income: {
            chaos: context.rootGetters[stashGetters.getTotalItemsDiffIncome].chaos,
            exalt: context.rootGetters[stashGetters.getTotalItemsDiffIncome].exalt,
          },
        };

        context.commit(mapMutations.addMapDone, mapDonePayload);
      }

      context.commit(mapMutations.setMapStartedTime, Date.now());

      context.dispatch(userActions.UPDATE_CHARACTER);
    }
  },

  [mapActions.ENTER_MAP](context, payload: POEMapZone) {
    if (context.state.automaticMode) {
      context.dispatch(mapActions.AUTOMATIC_MAP_ACTIONS, payload);
    } else {
      context.dispatch(mapActions.MANUAL_MAP_ACTIONS);
    }

    if (!context.state.inMap) {
      context.commit(mapMutations.enterMap);
    }
  },

  [mapActions.LEAVE_MAP](context, payload: void) {
    if (context.state.inMap) {
      context.commit(mapMutations.leaveMap);
    }
  },
};

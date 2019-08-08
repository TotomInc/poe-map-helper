import { GetterTree } from 'vuex';

import { POEMapHistoryDate } from '@/models/PathOfExile';
import { RootState } from '../state';
import { MapState } from './map.state';
import { mapGetters } from './map.consts';

export const getters: GetterTree<MapState, RootState> = {
  [mapGetters.mapsHistoryDate](state): POEMapHistoryDate[] {
    return state.mapsHistory.map((map) => {
      const mapHistoryDate: POEMapHistoryDate = {
        ...map,
        startDate: new Date(map.startTime),
        endDate: new Date(map.endTime),
        duration: Math.ceil((map.endTime - map.startTime) / 1000)
      };

      return mapHistoryDate;
    });
  }
};

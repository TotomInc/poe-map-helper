import { POEMapItem, POEMapHistory } from '@/models/PathOfExile';

export interface MapState {
  currentMap: POEMapItem | undefined;
  queuedMap: POEMapItem | undefined;
  latestMap: POEMapItem | undefined;
  inMap: boolean;
  mapStartedTime: number | undefined;

  /** Ordered by the most recent map at 0-index */
  mapsHistory: POEMapHistory[];

  /** Map history of a shared user */
  mapsHistoryShared: POEMapHistory[];
}

export const state: MapState = {
  currentMap: undefined,
  queuedMap: undefined,
  latestMap: undefined,
  inMap: false,
  mapStartedTime: undefined,
  mapsHistory: [],
  mapsHistoryShared: [],
};

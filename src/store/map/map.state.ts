import { POEMapItem, POEStashItem } from '@/models/PathOfExile';

export interface MapState {
  currentMap: POEMapItem | undefined;
  queuedMap: POEMapItem | undefined;
  latestMap: POEMapItem | undefined;
  inMap: boolean;

  /** Ordered by the most recent map at 0-index */
  mapsHistory: {
    map: POEMapItem;
    items: POEStashItem[];
  }[];
}

export const state: MapState = {
  currentMap: undefined,
  queuedMap: undefined,
  latestMap: undefined,
  inMap: false,
  mapsHistory: []
};

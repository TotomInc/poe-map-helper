import { POEMapItem } from '@/models/PathOfExile';

export interface MapState {
  currentMap: POEMapItem | undefined;
  queuedMap: POEMapItem | undefined;
  inMap: boolean;
  /** Ordered by the most recent map at 0-index */
  mapsDone: POEMapItem[];
}

export const state: MapState = {
  currentMap: undefined,
  queuedMap: undefined,
  inMap: false,
  mapsDone: []
};

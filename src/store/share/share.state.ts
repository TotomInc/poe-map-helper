import { POECharacter, POEMapHistory } from '@/models/PathOfExile';

export interface ShareState {
  loading: boolean;
  character: POECharacter | undefined;
  mapsHistory: POEMapHistory[];
}

export const state: ShareState = {
  loading: false,
  character: undefined,
  mapsHistory: [],
};

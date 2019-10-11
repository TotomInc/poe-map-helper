import { POECharacter, POEMapHistory } from '@/models/PathOfExile';

export interface ShareState {
  loading: boolean
  binID: string | undefined;
  character: POECharacter | undefined;
  mapsHistory: POEMapHistory[];
}

export const state: ShareState = {
  loading: false,
  binID: undefined,
  character: undefined,
  mapsHistory: [],
};

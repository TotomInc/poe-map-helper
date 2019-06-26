import { POECharacter } from '@/models/PathOfExile';

export interface UserState {
  logged: boolean;
  poesessid: string | undefined;
  loading: boolean;
  characters: POECharacter[];
  selectedCharacter: string | undefined;
}

export const state: UserState = {
  logged: false,
  poesessid: undefined,
  loading: false,
  characters: [],
  selectedCharacter: undefined
};
